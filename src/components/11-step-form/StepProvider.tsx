import { useState } from 'react';
import { StepContext } from './StepContext';
import { Step } from './type';

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<Step>('input');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  return (
    <StepContext.Provider
      value={{ currentStep, setCurrentStep, name, setName, error, setError }}
    >
      {children}
    </StepContext.Provider>
  );
};
