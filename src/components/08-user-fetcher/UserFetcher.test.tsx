import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserFetcher from './UserFetcher';

const fetchUser = jest.fn();

describe('UserFetcher', () => {
  beforeEach(() => {
    fetchUser.mockClear();
  });

  it('ユーザー取得ボタンが表示されている', () => {
    // Arrange
    render(<UserFetcher fetchUser={fetchUser} />);
    const button = screen.getByRole('button', { name: 'ユーザー取得' });

    // Assert
    expect(button).toBeInTheDocument();
  });

  it('ボタンを複数回クリックしても、処理は1度しか走らない', async () => {
    // Arrange
    fetchUser.mockImplementation(() => {
      return new Promise((resolve) => {
        // テストのために遅延させたい
        setTimeout(() => resolve([]), 100);
      });
    });
    render(<UserFetcher fetchUser={fetchUser} />);
    const button = screen.getByRole('button', { name: 'ユーザー取得' });

    // Act
    await userEvent.click(button);
    await userEvent.click(button);

    // Assert
    await waitFor(() => {
      expect(fetchUser).toHaveBeenCalledTimes(1);
    });
  });

  it('ユーザーが空の場合は、「ユーザーがみつかりません」と表示される', async () => {
    // Arrange
    fetchUser.mockImplementation(() => {
      // 今回は処理中のテストやらないからPromise.resolveで返す
      return Promise.resolve([]);
    });
    render(<UserFetcher fetchUser={fetchUser} />);
    const button = screen.getByRole('button', { name: 'ユーザー取得' });

    // Act
    await userEvent.click(button);

    // Assert
    await expect(
      screen.findByText('ユーザーがみつかりません')
    ).resolves.toBeInTheDocument();
  });

  it('ユーザーが取得できた場合は、ユーザー名が表示される', async () => {
    // Arrange
    fetchUser.mockImplementation(() => {
      return Promise.resolve(['John Doe', 'Jane Doe']);
    });
    render(<UserFetcher fetchUser={fetchUser} />);
    const button = screen.getByRole('button', { name: 'ユーザー取得' });

    // Act
    await userEvent.click(button);

    // Assert
    await expect(
      screen.findByText('ユーザー名: John Doe')
    ).resolves.toBeInTheDocument();
    await expect(
      screen.findByText('ユーザー名: Jane Doe')
    ).resolves.toBeInTheDocument();
  });

  it('ユーザーが取得できなかった場合は、「ユーザーが取得できませんでした」と表示される', async () => {
    // Arrange
    fetchUser.mockRejectedValue(new Error('ユーザーが取得できませんでした'));
    render(<UserFetcher fetchUser={fetchUser} />);
    const button = screen.getByRole('button', { name: 'ユーザー取得' });

    // Act
    await userEvent.click(button);

    // Assert
    await expect(
      screen.findByText('ユーザーが取得できませんでした')
    ).resolves.toBeInTheDocument();
  });

  it('取得中はボタンが非活性になり、「読み込み中...」と表示される', async () => {
    // Arrange
    fetchUser.mockImplementation(() => {
      // テストのために遅延させたい
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(['John Doe', 'Jane Doe']);
        }, 1000); // 1秒で十分っぽい。長すぎるとテスト失敗する
      });
    });
    render(<UserFetcher fetchUser={fetchUser} />);
    const button = screen.getByRole('button', { name: 'ユーザー取得' });

    // Act
    await userEvent.click(button);

    // Assert
    expect(button).toBeDisabled();
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();

    // 条件を複数確認するからwaitForを使う
    await waitFor(
      () => {
        expect(button).toBeEnabled();
        expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
