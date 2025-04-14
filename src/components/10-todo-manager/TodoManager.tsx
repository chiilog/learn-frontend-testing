import { Button } from '@/components/ui/button';

import { useTodoContext } from './useTodoContext';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export default function TodoManager() {
  const { setFilter } = useTodoContext();

  return (
    <div className="max-w-md mx-auto">
      <TodoInput />

      <div className="my-5">
        <h1 className="text-2xl font-bold mb-3">Todo Manager</h1>

        <div className="flex gap-2 items-center mb-5">
          <p className="text-sm font-bold">フィルター:</p>
          <Button variant="link" onClick={() => setFilter('all')}>
            すべて
          </Button>
          <Button variant="link" onClick={() => setFilter('active')}>
            未完了のみ
          </Button>
          <Button variant="link" onClick={() => setFilter('completed')}>
            完了のみ
          </Button>
        </div>

        <TodoList />
      </div>
    </div>
  );
}
