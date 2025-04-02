type Person = {
  name: string;
  age: number;
};

export function getAdults(people: Person[]): Person[] {
  return people.filter((person) => person.age >= 18);
}
