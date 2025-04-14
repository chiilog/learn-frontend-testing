import { useRef, useState } from 'react';
import { Button } from '../ui/button';

// jsonplaceholderの記事の型
type Article = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type ArticleLoaderProps = {
  fetchArticles: () => Promise<Article[]>;
};

export const ArticleLoader = ({ fetchArticles }: ArticleLoaderProps) => {
  const ref = useRef<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleClick = async () => {
    setLoaded(false);
    setIsLoading(true);

    if (ref.current) {
      return;
    }

    ref.current = true;
    try {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'エラーが発生しました');
    }

    setIsLoading(false);
    setLoaded(true);

    ref.current = false;
  };

  return (
    <div>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? '読み込み中...' : '記事を読み込む'}
      </Button>

      {error && <p className="text-center mt-8">{error}</p>}

      {loaded && (
        <>
          {articles.length > 0 ? (
            <div className="text-left mt-8">
              <h2 className="text-2xl font-bold text-center">記事一覧</h2>
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="my-6 border-0 border-b border-black border-solid pb-6"
                >
                  <h2 className="text-xl font-bold">{article.title}</h2>
                  <p className="text-sm mt-2">{article.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-8">記事がありません</p>
          )}
        </>
      )}
    </div>
  );
};
