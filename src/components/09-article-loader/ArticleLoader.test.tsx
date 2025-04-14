import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ArticleLoader } from './ArticleLoader';

const fetchArticles = jest.fn();

const sampleArticles = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
];

describe('ArticleLoader', () => {
  beforeEach(() => {
    fetchArticles.mockClear();
  });

  it('「記事を読み込む」ボタンが表示されている', () => {
    // Arrange
    render(<ArticleLoader fetchArticles={fetchArticles} />);
    const button = screen.getByRole('button', { name: '記事を読み込む' });

    // Assert
    expect(button).toBeInTheDocument();
  });

  it('ボタンを何度クリックしても処理は一度しか実行されない', async () => {
    // Arrange
    fetchArticles.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(sampleArticles);
          }, 200);
        })
    );
    render(<ArticleLoader fetchArticles={fetchArticles} />);
    const button = screen.getByRole('button', { name: '記事を読み込む' });

    // Act
    await userEvent.click(button);
    await userEvent.click(button);

    // Assert
    await waitFor(() => {
      expect(fetchArticles).toHaveBeenCalledTimes(1);
    });
  });

  it('ボタンクリック後、読み込み中の間ボタンが無効になる', async () => {
    // Arrange
    fetchArticles.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(sampleArticles);
          }, 200);
        })
    );
    render(<ArticleLoader fetchArticles={fetchArticles} />);
    const button = screen.getByRole('button', { name: '記事を読み込む' });

    // Act
    await userEvent.click(button);

    // Assert
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('読み込み中...');

    await waitFor(
      () => {
        expect(button).toBeEnabled();
        expect(button).toHaveTextContent('記事を読み込む');
      },
      { timeout: 300 }
    );
  });

  it('読み込み完了後、記事一覧が表示される', async () => {
    // Arrange
    fetchArticles.mockResolvedValue(sampleArticles);
    render(<ArticleLoader fetchArticles={fetchArticles} />);
    const button = screen.getByRole('button', { name: '記事を読み込む' });

    // Act
    await userEvent.click(button);

    // Assert
    expect(
      await screen.findByText(sampleArticles[0].title)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(sampleArticles[1].title)
    ).toBeInTheDocument();
  });

  it('空配列のときは、「記事がありません」と表示される', async () => {
    // Arrange
    fetchArticles.mockResolvedValue([]);
    render(<ArticleLoader fetchArticles={fetchArticles} />);
    const button = screen.getByRole('button', { name: '記事を読み込む' });

    // Act
    await userEvent.click(button);

    // Assert
    expect(await screen.findByText('記事がありません')).toBeInTheDocument();
  });

  it('エラーが発生したときは、エラーメッセージが表示される', async () => {
    // Arrange
    fetchArticles.mockRejectedValue(new Error('エラーが発生しました'));
    render(<ArticleLoader fetchArticles={fetchArticles} />);
    const button = screen.getByRole('button', { name: '記事を読み込む' });

    // Act
    await userEvent.click(button);

    // Assert
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
  });
});
