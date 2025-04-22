import './App.css';
import { StepProvider } from './components/11-step-form/StepProvider';
import StepForm from './components/11-step-form/StepForm';

function App() {
  return (
    <>
      <StepProvider>
        <StepForm />
      </StepProvider>
    </>
  );
}

export default App;
