export function add(a: number, b: number): number {
  if (isNaN(a) || isNaN(b)) {
    throw new Error('引数は数値で入力してください');
  }

  if (a === Infinity || b === Infinity) {
    throw new Error('引数は数値で入力してください');
  }

  return a + b;
}
