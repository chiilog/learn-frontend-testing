import { getAdults } from './people';

describe('getAdults', () => {
  it.each([
    { name: 'Alice', age: 20 },
    { name: 'Charlie', age: 18 },
  ])(`$nameは$age歳なので成人として返す`, ({ name, age }) => {
    // Arrange
    const people = [{ name, age }];

    // Act
    const result = getAdults(people);

    // Assert
    expect(result).toEqual([{ name, age }]);
  });

  it('18歳以上の人の情報だけ返す', () => {
    // Arrange
    const people = [
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 17 },
      { name: 'Charlie', age: 18 },
    ];

    // Act
    const result = getAdults(people);

    // Assert
    expect(result).toEqual([
      { name: 'Alice', age: 20 },
      { name: 'Charlie', age: 18 },
    ]);
  });

  it('17歳以下の人は返さない', () => {
    // Arrange
    const people = [
      { name: 'Bob', age: 17 },
      { name: 'Diana', age: 16 },
    ];

    // Act
    const result = getAdults(people);

    // Assert
    expect(result).toEqual([]);
  });

  it('空の配列を渡したら空の配列を返す', () => {
    // Act
    const result = getAdults([]);

    // Assert
    expect(result).toEqual([]);
  });
});
