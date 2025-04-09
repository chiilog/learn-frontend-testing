import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

type NameFormProps = {
  onSubmit: () => void;
};

export default function NameForm({ onSubmit }: NameFormProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    onSubmit();
    setUsername('');
  };

  return (
    <>
      <div className="w-1/3 mx-auto">
        <form>
          <FormItem className="mb-5">
            <Label htmlFor="name-input">名前</Label>
            <Input
              id="name-input"
              type="text"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormItem>
          <Button type="button" disabled={!username} onClick={handleSubmit}>
            送信
          </Button>
        </form>
      </div>
    </>
  );
}
