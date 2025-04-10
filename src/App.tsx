import './App.css';
import Greeter from './components/07-greeter/Greeter';

function App() {
  return (
    <>
      <Greeter
        onGreet={() => {
          console.log('Hello');
        }}
      />
    </>
  );
}

export default App;
