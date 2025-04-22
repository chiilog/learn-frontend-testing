import './App.css';
import { StepProvider } from './components/11-step-form/StepProvider';
import StepForm from './components/11-step-form/StepForm';

function App() {
  const handleSubmit = () => {
    console.log('送信完了');
  };

  return (
    <>
      <StepProvider>
        <StepForm onSubmit={handleSubmit} />
      </StepProvider>
    </>
  );
}

export default App;
