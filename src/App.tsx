import './App.css';
import UserFetcher from './components/08-user-fetcher/UserFetcher';
function App() {
  return (
    <>
      <UserFetcher
        fetchUser={() => Promise.resolve(['John Doe', 'Jane Doe'])}
      />
    </>
  );
}

export default App;
