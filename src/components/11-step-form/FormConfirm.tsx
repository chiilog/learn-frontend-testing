import { Button } from '../ui/button';
import { useStepContext } from './useStepContext';

export default function FormConfirm() {
  const { name, setCurrentStep } = useStepContext();

  const handleBack = () => {
    setCurrentStep('input');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentStep('complete');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">StepForm</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <p>名前</p>
          <p>{name}</p>
        </div>

        <div className="mt-5 flex gap-4 items-center justify-center">
          <Button type="button" variant="outline" onClick={handleBack}>
            戻る
          </Button>
          <Button type="submit">送信</Button>
        </div>
      </form>
    </div>
  );
}
