# 📝 テスト添削コメント - 02-get-grade

## ✅ よかった点

### ✅ `describe` の使い方がしっかりできてる

- `"点数が返ってくる"` と `"返ってこない"` で分けたことで、**通常系と異常系が明確に分離**されていて見やすい👏

### ✅ `it.each()` を使ってテストをまとめている

- 反復ケース（90, 80, ...）が綺麗に書けていて、**メンテ性も高くてナイス！**

### ✅ 異常系のテストも漏れなく書かれている

- `toThrow('Invalid score')` を使っていて、**具体的なエラーメッセージまで確認しているのが◎！**

---

## 🛠 改善ポイント（あえて挙げるなら）

### 🔹 `describe` の日本語が少し曖昧

```ts
describe('Get Grade: 点数が返ってくる', () => { ... });
```

- `"点数が返ってくる"` だと少し意味が広いかも？
- **目的（＝評価が返る）を強調するとベター**

#### 🔁 改善例：

```ts
describe('Get Grade: スコアに応じた成績を返す', () => { ... });
describe('Get Grade: 無効なスコアはエラーを投げる', () => { ... });
```

---

### 🔹 異常系が1ケースだけなので、余裕があれば他のケースも加えてみても◎

- 例：100点を超えたときどうするか（仕様によるけど）

---

## ✨ チャレンジ要素としてのリファクタ案

```ts
describe('Get Grade: 無効なスコアはエラーを投げる', () => {
  it.each([-10, -1, -100])('getGrade(%i) はエラーを投げる', (score) => {
    expect(() => getGrade(score)).toThrow('Invalid score');
  });
});
```

---

## ✅ 添削まとめ

| 項目                   | 評価                                           |
| ---------------------- | ---------------------------------------------- |
| `describe` / `it` 構造 | ✅ 明確で整理されてる                          |
| 通常系の網羅           | ✅ 十分カバーされている                        |
| 異常系の扱い           | ✅ 最低限カバー＋拡張余地あり                  |
| 命名                   | ◯ もう少し具体的にできる余地あり（好みもある） |

---

## 💬 アドバイス

**「SETエンジニアとしての視点」がしっかり見えるテスト設計でした👏**  
次の一歩として、「どういう入力が“異常か”を自分で考えて増やしていく」方向にも進めそうです！
