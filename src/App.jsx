import { Link, Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  

  return (
    <div className="app">
      <div className="navbar">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create New Post</Link>
        </nav>
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
