import { render, screen } from '@testing-library/react';
import UserInfo from './UserInfo';

describe('userが存在するとき', () => {
  it('名前と年齢が表示される', () => {
    render(<UserInfo user={{ name: 'John', age: 20 }} />);
    expect(screen.getByText('名前: John')).toBeInTheDocument();
    expect(screen.getByText('年齢: 20')).toBeInTheDocument();
  });

  it('ログインしてくださいは表示されない', () => {
    render(<UserInfo user={{ name: 'John', age: 20 }} />);
    expect(screen.queryByText('ログインしてください')).not.toBeInTheDocument();
  });
});

describe('userがいないとき', () => {
  it('ログインしてくださいと表示される', () => {
    render(<UserInfo />);
    expect(screen.getByText('ログインしてください')).toBeInTheDocument();
  });

  it('名前と年齢は表示されない', () => {
    render(<UserInfo />);
    expect(screen.queryByText('名前: John')).not.toBeInTheDocument();
    expect(screen.queryByText('年齢: 20')).not.toBeInTheDocument();
  });
});
