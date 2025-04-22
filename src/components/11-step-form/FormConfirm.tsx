import { Button } from '../ui/button';
import { useStepContext } from './useStepContext';

export default function FormConfirm({
  onSubmit,
}: {
  onSubmit: (data: { name: string }) => Promise<void>;
}) {
  const { name, setCurrentStep, error, setError } = useStepContext();

  const handleBack = () => {
    setCurrentStep('input');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await onSubmit({ name });
      setCurrentStep('complete');
    } catch {
      setError('送信に失敗しました');
    }
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

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
