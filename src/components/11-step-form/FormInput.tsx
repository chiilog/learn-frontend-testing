import { Button } from '../ui/button';
import { FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useStepContext } from './useStepContext';

export default function FormInput() {
  const { name, setName, setCurrentStep } = useStepContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNext = () => {
    setCurrentStep('confirm');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">StepForm</h1>

      <div className="mt-5">
        <form>
          <FormItem className="mb-5 w-full">
            <Label htmlFor="user-name">名前</Label>
            <Input
              type="text"
              id="user-name"
              name="user-name"
              onChange={handleChange}
              value={name}
            />
          </FormItem>

          <Button type="button" onClick={handleNext} disabled={!name}>
            次へ
          </Button>
        </form>
      </div>
    </div>
  );
}
