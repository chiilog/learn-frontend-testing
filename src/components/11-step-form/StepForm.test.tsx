import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StepProvider } from './StepProvider';
import StepForm from './StepForm';

describe('StepForm', () => {
  it('フォームが存在している', () => {
    // Arrange
    render(
      <StepProvider>
        <StepForm />
      </StepProvider>
    );
    const nameInput = screen.getByRole('textbox', { name: '名前' });
    const nextButton = screen.getByRole('button', { name: '次へ' });

    // Assert
    expect(nameInput).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('名前の入力がないと次へボタンが押せない', async () => {
    // Arrange
    render(
      <StepProvider>
        <StepForm />
      </StepProvider>
    );
    const nextButton = screen.getByRole('button', { name: '次へ' });

    // Act
    userEvent.click(nextButton);

    // Assert
    expect(nextButton).toBeDisabled();
  });

  it('名前を入力して次へボタンをクリックすると、次のステップに遷移する', async () => {
    // Arrange
    render(
      <StepProvider>
        <StepForm />
      </StepProvider>
    );
    const nameInput = screen.getByRole('textbox', { name: '名前' });
    const nextButton = screen.getByRole('button', { name: '次へ' });

    // Act
    await userEvent.type(nameInput, '山田太郎');
    userEvent.click(nextButton);

    // Assert
    expect(await screen.findByText('山田太郎')).toBeInTheDocument();
  });

  it('戻るボタンをクリックすると、前のステップに遷移する', async () => {
    // Arrange
    render(
      <StepProvider>
        <StepForm />
      </StepProvider>
    );
    const nameInput = screen.getByRole('textbox', { name: '名前' });
    const nextButton = screen.getByRole('button', { name: '次へ' });

    // Act
    await userEvent.type(nameInput, '山田太郎');
    userEvent.click(nextButton);

    // Assert
    expect(await screen.findByText('山田太郎')).toBeInTheDocument();
    const backButton = screen.getByRole('button', { name: '戻る' });
    userEvent.click(backButton);
    expect(await screen.findByRole('textbox', { name: '名前' })).toHaveValue(
      '山田太郎'
    );
  });

  it('送信ボタンをクリックすると、送信完了画面に遷移する', async () => {
    // Arrange
    render(
      <StepProvider>
        <StepForm />
      </StepProvider>
    );
    const nameInput = screen.getByRole('textbox', { name: '名前' });
    const nextButton = screen.getByRole('button', { name: '次へ' });

    // Act
    await userEvent.type(nameInput, '山田太郎');
    userEvent.click(nextButton);

    // Assert
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: '送信' });
      userEvent.click(submitButton);
    });

    expect(await screen.findByText('送信完了')).toBeInTheDocument();
  });
});
