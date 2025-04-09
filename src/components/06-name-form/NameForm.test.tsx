import { render, screen } from '@testing-library/react';
import NameForm from './NameForm';
import userEvent from '@testing-library/user-event';

const mockCallback = jest.fn();

describe('NameForm', () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });

  it('名前の入力欄と送信ボタンがある', () => {
    // Arrange
    render(<NameForm onSubmit={mockCallback} />);

    // Act
    const input = screen.getByRole('textbox', { name: '名前' });
    const button = screen.getByRole('button', { name: '送信' });

    // Assert
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('初期状態でボタンが無効になっている', () => {
    // Arrange
    render(<NameForm onSubmit={mockCallback} />);

    // Act
    const button = screen.getByRole('button', { name: '送信' });

    // Assert
    expect(button).toBeDisabled();
  });

  it('名前を入力するとボタンが有効になる', async () => {
    // Arrange
    render(<NameForm onSubmit={mockCallback} />);

    // Act
    const input = screen.getByRole('textbox', { name: '名前' });
    const button = screen.getByRole('button', { name: '送信' });

    // Assert
    await userEvent.type(input, 'test');
    expect(button).toBeEnabled();
  });

  it('送信後、入力欄が空になる', async () => {
    // Arrange
    render(<NameForm onSubmit={mockCallback} />);

    // Act
    const input = screen.getByRole('textbox', { name: '名前' });
    const button = screen.getByRole('button', { name: '送信' });
    await userEvent.type(input, 'test');
    await userEvent.click(button);

    // Assert
    expect(mockCallback).toHaveBeenCalled();
    expect(input).toHaveValue('');
  });
});
