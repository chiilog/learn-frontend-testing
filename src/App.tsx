import './App.css';
import { ArticleLoader } from './components/09-article-loader/ArticleLoader';

function App() {
  const fetchArticles = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const articles = await response.json();
    return articles;
  };

  return (
    <>
      <ArticleLoader fetchArticles={fetchArticles} />
    </>
  );
}

export default App;
