import { Button } from '@/components/ui/button';
import { useTodoContext } from './useTodoContext';

export default function TodoList() {
  const { todos, setTodos } = useTodoContext();

  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
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
