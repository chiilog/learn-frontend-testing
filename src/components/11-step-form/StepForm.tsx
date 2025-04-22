import FormInput from './FormInput';
import FormConfirm from './FormConfirm';
import FormComplete from './FormComplete';
import { useStepContext } from './useStepContext';

export default function StepForm() {
  const { currentStep } = useStepContext();

  if (currentStep === 'confirm') {
    return <FormConfirm />;
  }

  if (currentStep === 'complete') {
    return <FormComplete />;
  }

  return <FormInput />;
}
