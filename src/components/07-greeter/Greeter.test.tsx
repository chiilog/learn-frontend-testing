import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greeter from './Greeter';

const mockOnGreet = jest.fn();

describe('Greeter', () => {
  beforeEach(() => {
    mockOnGreet.mockClear();
  });

  it('テキスト入力欄と「送信」ボタンがある', () => {
    // Arrange
    render(<Greeter onGreet={mockOnGreet} />);

    // Act
    const input = screen.getByRole('textbox', { name: 'あいさつ' });
    const button = screen.getByRole('button', { name: '送信' });

    // Assert
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('テキスト入力後ボタンをクリックするとonGreetが呼ばれる', async () => {
    // Arrange
    render(<Greeter onGreet={mockOnGreet} />);

    // Act
    const input = screen.getByRole('textbox', { name: 'あいさつ' });
    const button = screen.getByRole('button', { name: '送信' });
    await userEvent.type(input, 'Hello');
    await userEvent.click(button);

    // Assert
    expect(mockOnGreet).toHaveBeenCalledWith('Hello');
    expect(mockOnGreet).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('');
  });
});
