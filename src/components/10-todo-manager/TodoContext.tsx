import { createContext } from 'react';

export type Todo = {
  todo: string;
  status: string;
};

type TodoContextType = {
  filter: string;
  setFilter: (filter: string) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);
