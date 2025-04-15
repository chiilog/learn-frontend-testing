import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useTodoContext } from './useTodoContext';
import { Todo } from './TodoContext';

type TodoListProps = {
  initialTodos?: Todo[];
};

export default function TodoList({ initialTodos }: TodoListProps) {
  const { todos, setTodos, filter } = useTodoContext();

  // initialTodosが渡された場合、それを使用する
  useEffect(() => {
    if (initialTodos) {
      setTodos(initialTodos);
    }
  }, [initialTodos, setTodos]);

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return todo.status === 'active';
    if (filter === 'completed') return todo.status === 'completed';
  });

  return (
    <>
      {visibleTodos.length > 0 ? (
        <ul>
          {visibleTodos.map((todo) => (
            <li key={todo.todo}>
              <div className="flex gap-4 justify-between items-center py-2 border-0 border-b border-gray-200">
                <div className="flex flex-col gap-2 text-left">
                  <span className="text-lg font-bold">{todo.todo}</span>
                  <span className="text-sm text-gray-500">
                    ステータス：{todo.status === 'active' ? '未完了' : '完了'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const newStatus =
                      todo.status === 'active' ? 'completed' : 'active';
                    setTodos(
                      todos.map((t) =>
                        t.todo === todo.todo ? { ...t, status: newStatus } : t
                      )
                    );
                  }}
                >
                  {todo.status === 'active' ? '完了' : '未完了に戻す'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>まだTODOがありません</p>
      )}
    </>
  );
}
