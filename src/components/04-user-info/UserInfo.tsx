type User = {
  name: string;
  age: number;
};

type Props = {
  user?: User;
};

export default function UserInfo({ user }: Props) {
  if (!user) {
    return <p>ログインしてください</p>;
  }

  return (
    <div>
      <p>名前: {user.name}</p>
      <p>年齢: {user.age}</p>
    </div>
  );
}
