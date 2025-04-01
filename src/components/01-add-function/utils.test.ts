import { add } from './utils';

describe('add function', () => {
  it('2つの数値を受け取って、合計を返す', () => {
    // Act
    expect(add(1, 2)).toBe(3);
  });

  it('`add(0, 0)` は `0` を返す', () => {
    // Act
    expect(add(0, 0)).toBe(0);
  });

  it('`add(-1, 5)` は `4` を返す', () => {
    // Act
    expect(add(-1, 5)).toBe(4);
  });

  it('両方NaNを入れたらエラーになる', () => {
    // Assert
    expect(() => add(NaN, NaN)).toThrow('引数は数値で入力してください');
  });

  it('Infinityを入れたらエラーになる', () => {
    // Assert
    expect(() => add(Infinity, Infinity)).toThrow(
      '引数は数値で入力してください'
    );
  });
});
