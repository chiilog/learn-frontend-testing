# 🧪 レベル4：条件付きレンダリングのテスト

このディレクトリでは、UIコンポーネントが「状態によって異なる表示をする」パターンを題材にテストを練習します。

---

## 📘 問題：`UserInfo` コンポーネント

次のようなコンポーネントがあるとします。

```tsx
// UserInfo.tsx
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
```

このコンポーネントの挙動をテストしてください。

---

## ✅ 要件

- `user` が渡された場合、名前と年齢が表示される
- `user` が渡されない場合、「ログインしてください」と表示される

---

## 🎯 目標

- [ ] 条件付きレンダリングをテストで確認する
- [ ] `getByText()` や `queryByText()` の使い分けに慣れる
- [ ] 表示される or 表示されないパターンを明確にする

---

## 💡 チャレンジ（できたら）

- `describe('userが存在するとき')` / `describe('userがいないとき')` に分ける
- `screen.queryByText()` を使って「表示されていないこと」も確認してみる
