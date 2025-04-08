import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ToggleMessage({ text }: { text?: string }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Button onClick={() => setIsShow(!isShow)} disabled={!text}>
        {isShow ? '隠す' : '表示する'}
      </Button>
      {isShow && <p className="message">{text}</p>}
    </>
  );
}
