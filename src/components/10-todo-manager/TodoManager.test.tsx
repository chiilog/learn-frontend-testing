import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TodoManager from './TodoManager';
import { TodoProvider } from './TodoProvider';

describe('TodoManager', () => {
  it('入力欄と追加ボタンが表示されている', () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    );
    const formInput = screen.getByLabelText('TODO');
    const button = screen.getByRole('button', { name: '追加' });

    // Assert
    expect(formInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it.each([
    { status: '空白文字（半角）', input: ' ' },
    { status: '空白文字（全角）', input: '　' },
    { status: '改行文字', input: '\n' },
    { status: 'タブ文字', input: '\t' },
    { status: '復帰文字', input: '\r' },
    { status: 'フォームフィード', input: '\f' },
  ])('$statusだけの場合はTODOリストに追加されない', async ({ input }) => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    );
    const formInput = screen.getByLabelText('TODO');
    const button = screen.getByRole('button', { name: '追加' });

    // Act
    await userEvent.type(formInput, input);
    await userEvent.click(button);

    // Assert
    expect(screen.queryByText('まだTODOがありません')).toBeInTheDocument();
  });

  it('未入力でボタンをクリックしてもTODOリストに追加されない', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    );
    const formInput = screen.getByLabelText('TODO');
    const button = screen.getByRole('button', { name: '追加' });

    // Act
    await userEvent.clear(formInput);
    await userEvent.click(button);

    // Assert
    expect(screen.queryByText('まだTODOがありません')).toBeInTheDocument();
  });

  it('TODOを入力して追加ボタンをクリックすると、TODOリストに追加される', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    );
    const formInput = screen.getByLabelText('TODO');
    const button = screen.getByRole('button', { name: '追加' });

    // Act
    await userEvent.type(formInput, '洗濯をする');
    await userEvent.click(button);

    // Assert
    expect(screen.getByText('洗濯をする')).toBeInTheDocument();
  });

  it('同じTodoは登録しない', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    );
    const formInput = screen.getByLabelText('TODO');

    // Act
    await userEvent.type(formInput, '洗濯をする{Enter}');
    await userEvent.type(formInput, '洗濯をする{Enter}');

    // Assert
    expect(await screen.findAllByText('洗濯をする')).toHaveLength(1);
  });

  it('TODOを入力してEnterキーを押すと、TODOリストに追加される', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    );
    const formInput = screen.getByLabelText('TODO');

    // Act
    await userEvent.type(formInput, '洗濯をする{Enter}');

    // Assert
    expect(screen.getByText('洗濯をする')).toBeInTheDocument();
  });

  it('完了ボタンをクリックすると、ステータスが完了になる', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager
          initialTodos={[{ todo: '洗濯をする', status: 'active' }]}
        />
      </TodoProvider>
    );
    const todo = screen.getByText('洗濯をする');
    const completeButton = within(todo.closest('li')!).getByRole('button', {
      name: '完了',
    });

    // Act
    await userEvent.click(completeButton);

    // Assert
    expect(await screen.findByText('ステータス：完了')).toBeInTheDocument();
  });

  it('ステータスが完了の場合、未完了に戻すボタンをクリックすると、ステータスが未完了になる', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager
          initialTodos={[{ todo: '洗濯をする', status: 'active' }]}
        />
      </TodoProvider>
    );
    const todo = screen.getByText('洗濯をする');
    const completeButton = within(todo.closest('li')!).getByRole('button', {
      name: '完了',
    });

    // Act
    await userEvent.click(completeButton);
    const undoButton = within(todo.closest('li')!).getByRole('button', {
      name: '未完了に戻す',
    });
    await userEvent.click(undoButton);

    // Assert
    expect(await screen.findByText('ステータス：未完了')).toBeInTheDocument();
  });

  it('フィルターがすべての場合、すべてのTODOが表示される', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager
          initialTodos={[
            { todo: '洗濯をする', status: 'active' },
            { todo: '掃除をする', status: 'completed' },
            { todo: '買い物をする', status: 'active' },
          ]}
        />
      </TodoProvider>
    );

    // Act
    const filterButton = screen.getByRole('button', { name: 'すべて' });
    await userEvent.click(filterButton);

    // Assert
    expect(screen.getByText('洗濯をする')).toBeInTheDocument();
    expect(screen.getByText('掃除をする')).toBeInTheDocument();
    expect(screen.getByText('買い物をする')).toBeInTheDocument();
  });

  it('フィルターが未完了のみの場合、未完了のTODOが表示される', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager
          initialTodos={[
            { todo: '洗濯をする', status: 'active' },
            { todo: '掃除をする', status: 'completed' },
            { todo: '買い物をする', status: 'active' },
          ]}
        />
      </TodoProvider>
    );

    // Act
    const filterButton = screen.getByRole('button', { name: '未完了のみ' });
    await userEvent.click(filterButton);

    // Assert
    expect(await screen.findByText('洗濯をする')).toBeInTheDocument();
    expect(screen.queryByText('掃除をする')).not.toBeInTheDocument();
    expect(await screen.findByText('買い物をする')).toBeInTheDocument();
  });

  it('フィルターが完了の場合、完了のTODOが表示される', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager
          initialTodos={[
            { todo: '洗濯をする', status: 'active' },
            { todo: '掃除をする', status: 'completed' },
            { todo: '買い物をする', status: 'active' },
          ]}
        />
      </TodoProvider>
    );

    // Act
    const filterButton = screen.getByRole('button', { name: '完了のみ' });
    await userEvent.click(filterButton);

    // Assert
    expect(screen.queryByText('洗濯をする')).not.toBeInTheDocument();
    expect(await screen.findByText('掃除をする')).toBeInTheDocument();
    expect(screen.queryByText('買い物をする')).not.toBeInTheDocument();
  });
});
