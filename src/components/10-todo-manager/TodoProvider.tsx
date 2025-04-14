import { useState } from 'react';
import { Todo, TodoContext } from './TodoContext';

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState<string>('all');
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider value={{ filter, setFilter, todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
