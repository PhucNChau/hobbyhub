import { Link, Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  

  return (
    <div className="app">
      <div className="navbar">
        <h3>ScienceHub</h3>
        <input type="text" placeholder="Search" />
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
