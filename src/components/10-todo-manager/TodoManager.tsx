import { Button } from '@/components/ui/button';

import { useTodoContext } from './useTodoContext';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { Todo } from './TodoContext';

type TodoManagerProps = {
  initialTodos?: Todo[];
};

export default function TodoManager({ initialTodos }: TodoManagerProps) {
  const { filter, setFilter } = useTodoContext();

  const handleFilter = (status: string) => {
    setFilter(status);
  };

  return (
    <div className="max-w-md mx-auto">
      <TodoInput />

      <div className="my-5">
        <h1 className="text-2xl font-bold mb-3">Todo Manager</h1>

        <div className="flex gap-2 items-center mb-5">
          <p className="text-sm font-bold">フィルター:</p>
          <Button
            variant="link"
            onClick={() => handleFilter('all')}
            className={filter === 'all' ? 'text-blue-500' : ''}
          >
            すべて
          </Button>
          <Button
            variant="link"
            onClick={() => handleFilter('active')}
            className={filter === 'active' ? 'text-blue-500' : ''}
          >
            未完了のみ
          </Button>
          <Button
            variant="link"
            onClick={() => handleFilter('completed')}
            className={filter === 'completed' ? 'text-blue-500' : ''}
          >
            完了のみ
          </Button>
        </div>

        <TodoList initialTodos={initialTodos} />
      </div>
    </div>
  );
}
