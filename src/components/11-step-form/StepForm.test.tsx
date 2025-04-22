import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StepProvider } from './StepProvider';
import StepForm from './StepForm';

const mockOnSubmit = jest.fn();

describe('StepForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('フォームが存在している', () => {
    // Arrange
    render(
      <StepProvider>
        <StepForm onSubmit={mockOnSubmit} />
      </StepProvider>
    );
    const nameInput = screen.getByRole('textbox', { name: '名前' });
    const nextButton = screen.getByRole('button', { name: '次へ' });

    // Assert
    expect(nameInput).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  describe('入力フォーム', () => {
    it('名前の入力がないと次へボタンが押せない', async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <StepProvider>
          <StepForm onSubmit={mockOnSubmit} />
        </StepProvider>
      );
      const nextButton = screen.getByRole('button', { name: '次へ' });

      // Act
      await user.click(nextButton);

      // Assert
      expect(nextButton).toBeDisabled();
    });

    it('名前を入力して次へボタンをクリックすると、次のステップに遷移する', async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <StepProvider>
          <StepForm onSubmit={mockOnSubmit} />
        </StepProvider>
      );
      const nameInput = screen.getByRole('textbox', { name: '名前' });
      const nextButton = screen.getByRole('button', { name: '次へ' });

      // Act
      await user.type(nameInput, '山田太郎');
      await user.click(nextButton);

      // Assert
      expect(await screen.findByText('山田太郎')).toBeInTheDocument();
    });
  });

  describe('確認フォーム', () => {
    it('戻るボタンをクリックすると、前のステップに遷移する', async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <StepProvider>
          <StepForm onSubmit={mockOnSubmit} />
        </StepProvider>
      );
      const nameInput = screen.getByRole('textbox', { name: '名前' });
      const nextButton = screen.getByRole('button', { name: '次へ' });

      // Act
      await user.type(nameInput, '山田太郎');
      await user.click(nextButton);

      // Assert
      expect(await screen.findByText('山田太郎')).toBeInTheDocument();
      const backButton = screen.getByRole('button', { name: '戻る' });
      await user.click(backButton);
      expect(await screen.findByRole('textbox', { name: '名前' })).toHaveValue(
        '山田太郎'
      );
    });

    it('送信が成功したら、送信完了画面に遷移する', async () => {
      // Arrange
      const user = userEvent.setup();
      mockOnSubmit.mockResolvedValue('山田太郎');
      render(
        <StepProvider>
          <StepForm onSubmit={mockOnSubmit} />
        </StepProvider>
      );
      const nameInput = screen.getByRole('textbox', { name: '名前' });
      const nextButton = screen.getByRole('button', { name: '次へ' });

      // Act
      await user.type(nameInput, '山田太郎');
      await user.click(nextButton);

      const submitButton = screen.getByRole('button', { name: '送信' });
      user.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({ name: '山田太郎' });
      });

      expect(await screen.findByText('送信完了')).toBeInTheDocument();
    });

    it('送信が失敗したら、エラーメッセージが表示される', async () => {
      // Arrange
      const user = userEvent.setup();
      mockOnSubmit.mockRejectedValue(new Error('送信が失敗しました'));
      render(
        <StepProvider>
          <StepForm onSubmit={mockOnSubmit} />
        </StepProvider>
      );
      const nameInput = screen.getByRole('textbox', { name: '名前' });
      const nextButton = screen.getByRole('button', { name: '次へ' });

      // Act
      await user.type(nameInput, '山田太郎');
      await user.click(nextButton);

      const submitButton = screen.getByRole('button', { name: '送信' });
      user.click(submitButton);

      // Assert
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });

      expect(await screen.findByText('送信に失敗しました')).toBeInTheDocument();
    });
  });
});
