import './App.css';
import { TodoProvider } from './components/10-todo-manager/TodoProvider';
import TodoManager from './components/10-todo-manager/TodoManager';
function App() {
  return (
    <>
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    </>
  );
}

export default App;
