import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToggleMessage from './ToggleMessage';

describe('ToggleMessage', () => {
  it('ボタンがあり、テキストが表示されていない', () => {
    // Arrange
    render(<ToggleMessage text="こんにちは" />);

    // Act
    const button = screen.getByRole('button', { name: '表示する' });
    const message = screen.queryByText('こんにちは');

    // Assert
    expect(button).toBeInTheDocument();
    expect(message).not.toBeInTheDocument();
  });

  it('ボタンをクリックすると、テキストが表示される', async () => {
    // Arrange
    render(<ToggleMessage text="こんにちは" />);

    // Act
    const button = screen.getByRole('button', { name: '表示する' });
    await userEvent.click(button);
    const message = screen.getByText('こんにちは');

    // Assert
    expect(message).toBeInTheDocument();
    expect(button.textContent).toBe('隠す');
  });

  it('テキストがないときはdisabledになっている', () => {
    // Arrange
    render(<ToggleMessage />);

    // Act
    const button = screen.getByRole('button', { name: '表示する' });

    // Assert
    expect(button).toBeDisabled();
  });
});
