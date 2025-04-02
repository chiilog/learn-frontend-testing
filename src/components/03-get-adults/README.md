# 🧪 レベル3：配列と条件分岐を扱うテスト

このディレクトリでは、配列の中から条件を満たす要素を抽出する `getAdults` 関数のテストを練習します。

---

## 📘 問題

以下の `getAdults(people: Person[])` 関数をテストしてください。

```ts
// people.ts
type Person = {
  name: string;
  age: number;
};

export function getAdults(people: Person[]): Person[] {
  return people.filter((person) => person.age >= 18);
}
```

---

## ✅ 要件

以下のケースをテストで確認してください：

- `[{ name: "Alice", age: 20 }, { name: "Bob", age: 17 }]` を渡すと、`[{ name: "Alice", age: 20 }]` を返す
- 18歳ちょうどは含まれる（成人として扱う）
- すべて未成年なら空配列を返す
- 空配列が渡されたら空配列を返す

---

## 🎯 目標

- [ ] 複数オブジェクトの配列に対する検証に慣れる
- [ ] エッジケース（空配列、境界値）のテストを意識する
- [ ] `toEqual()` を活用して配列の中身を検証する

---

## 💡 チャレンジ（できたら）

- `test.each()` を使って複数の入力パターンをまとめる
- 年齢の境界（17/18）を中心にテストケースを考えてみる
