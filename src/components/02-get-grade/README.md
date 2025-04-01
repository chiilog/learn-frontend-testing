# 🧪 レベル2：条件分岐を含む関数のテスト

このディレクトリでは、条件分岐を含む `getGrade` 関数を題材に、テストケースの分岐・異常系処理のテストを練習します。

---

## 📘 問題

以下の `getGrade(score: number)` 関数をテストしてください。

```ts
// grade.ts
export function getGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  if (score >= 0) return 'F';
  throw new Error('Invalid score');
}
```

---

## ✅ 要件

- `getGrade(95)` は `'A'` を返す
- `getGrade(85)` は `'B'` を返す
- `getGrade(75)` は `'C'` を返す
- `getGrade(65)` は `'D'` を返す
- `getGrade(40)` は `'F'` を返す
- `getGrade(-10)` はエラーをスローする

---

## 🎯 目標

- [ ] 条件分岐がある関数のテストパターンに慣れる
- [ ] 通常系と異常系の両方をテストに含める
- [ ] `toThrow()` の使い方を復習する

---

## 💡 チャレンジ（できたらでOK！）

- `test.each()` を使って通常系のテストをまとめて書く
- `describe()` ブロックで通常系と異常系を分けて整理する
