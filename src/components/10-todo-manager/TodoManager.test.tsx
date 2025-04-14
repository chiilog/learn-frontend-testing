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
        <TodoManager />
      </TodoProvider>
    );
    const formInput = screen.getByLabelText('TODO');

    // Act
    await userEvent.type(formInput, '洗濯をする{Enter}');
    const todo = await screen.findByText('洗濯をする');
    const completeButton = within(todo.closest('li')!).getByRole('button', {
      name: '完了',
    });
    await userEvent.click(completeButton);

    // Assert
    expect(await screen.findByText('ステータス：完了')).toBeInTheDocument();
  });

  it('ステータスが完了の場合、未完了に戻すボタンをクリックすると、ステータスが未完了になる', async () => {
    // Arrange
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    );
    const formInput = screen.getByLabelText('TODO');

    // Act
    await userEvent.type(formInput, '洗濯をする{Enter}');
    const todo = await screen.findByText('洗濯をする');
    const completeButton = within(todo.closest('li')!).getByRole('button', {
      name: '完了',
    });
    await userEvent.click(completeButton);
    const undoButton = within(todo.closest('li')!).getByRole('button', {
      name: '未完了に戻す',
    });
    await userEvent.click(undoButton);

    // Assert
    expect(await screen.findByText('ステータス：未完了')).toBeInTheDocument();
  });
});
