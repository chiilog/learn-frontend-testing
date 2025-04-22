import { createContext } from 'react';
import { Step } from './type';

type StepContextType = {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  name: string;
  setName: (name: string) => void;
  error: string;
  setError: (error: string) => void;
};

export const StepContext = createContext<StepContextType | null>(null);
