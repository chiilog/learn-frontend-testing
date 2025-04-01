import { getGrade } from './grade';

describe('Get Grade: 点数が返ってくる', () => {
  it.each([
    { score: 90, grade: 'A' },
    { score: 80, grade: 'B' },
    { score: 70, grade: 'C' },
    { score: 60, grade: 'D' },
    { score: 0, grade: 'F' },
  ])(`点数が$scoreの場合は$gradeが返ってくる`, ({ score, grade }) => {
    const result = getGrade(score);
    expect(result).toBe(grade);
  });
});

describe('Get Grade: 点数が返ってこない', () => {
  it('点数が-10点のときはエラーが返ってくる', () => {
    expect(() => getGrade(-10)).toThrow('Invalid score');
  });
});
