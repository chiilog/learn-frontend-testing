import { useState } from 'react';

import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useTodoContext } from './useTodoContext';

export default function TodoInput() {
  const { todos, setTodos } = useTodoContext();
  const [todo, setTodo] = useState({ todo: '', status: 'active' });

  const addTodo = () => {
    if (todo.todo.trim() === '') {
      return;
    }
    if (todos.some((t) => t.todo === todo.todo)) {
      return;
    }
    setTodos([...todos, todo]);
    setTodo({ todo: '', status: 'active' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
      <FormItem className="mb-5 w-full">
        <Label htmlFor="todo-input">TODO</Label>
        <Input
          id="todo-input"
          type="text"
          name="todo"
          value={todo.todo}
          onChange={(e) => {
            if (e.target.value.trim() !== '') {
              setTodo({ ...todo, todo: e.target.value });
            }
          }}
        />
      </FormItem>
      <Button
        type="button"
        onClick={() => {
          addTodo();
        }}
      >
        追加
      </Button>
    </form>
  );
}
