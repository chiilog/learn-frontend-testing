import FormInput from './FormInput';
import FormConfirm from './FormConfirm';
import FormComplete from './FormComplete';
import { useStepContext } from './useStepContext';

export default function StepForm({
  onSubmit,
}: {
  onSubmit: (data: { name: string }) => Promise<void>;
}) {
  const { currentStep } = useStepContext();

  if (currentStep === 'confirm') {
    return <FormConfirm onSubmit={onSubmit} />;
  }

  if (currentStep === 'complete') {
    return <FormComplete />;
  }

  return <FormInput />;
}
