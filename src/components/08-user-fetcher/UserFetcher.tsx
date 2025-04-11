import { Button } from '../ui/button';
import { useRef, useState } from 'react';

type UserFetcherProps = {
  fetchUser: () => Promise<string[]>;
};

export default function UserFetcher({ fetchUser }: UserFetcherProps) {
  const ref = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<string[]>([]);

  const handleClick = async () => {
    if (ref.current) {
      return;
    }

    ref.current = true;
    setError(null);
    setIsLoading(true);
    try {
      const users = await fetchUser();
      setUsers(users);
      setIsLoading(false);
      setLoaded(true);
    } catch (e: unknown) {
      // https://typescriptbook.jp/reference/tsconfig/useunknownincatchvariables
      setError(e instanceof Error ? e.message : 'ユーザーの取得に失敗しました');
      setIsLoading(false);
    }
    ref.current = false;
  };

  return (
    <div>
      <Button disabled={isLoading} onClick={handleClick}>
        ユーザー取得
      </Button>

      <div className="mt-4">
        {isLoading && <p>読み込み中...</p>}
        {error ? (
          error
        ) : loaded ? (
          users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user}>ユーザー名: {user}</li>
              ))}
            </ul>
          ) : (
            <p>ユーザーがみつかりません</p>
          )
        ) : (
          <p>ここにユーザーが表示されます</p>
        )}
      </div>
    </div>
  );
}
