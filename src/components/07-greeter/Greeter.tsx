import { useState } from 'react';

import { FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type GreeterProps = {
  onGreet: (greeting: string) => void;
};

export default function Greeter({ onGreet }: GreeterProps) {
  const [greeting, setGreeting] = useState('');

  const handleSubmit = () => {
    onGreet(greeting);
    setGreeting('');
  };

  return (
    <>
      <div className="w-1/3 mx-auto">
        <form>
          <FormItem className="mb-5">
            <Label htmlFor="greet-input">あいさつ</Label>
            <Input
              id="greet-input"
              type="text"
              name="greeting"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
            />
          </FormItem>
          <Button type="button" onClick={handleSubmit}>
            送信
          </Button>
        </form>
      </div>
    </>
  );
}
