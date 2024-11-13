import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

const App = () => {
  
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="app">
      <div className="navbar">
        <h3>ScienceHub</h3>
        <input type="text" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/create">Create New Post</Link>
        </nav>
      </div>
      <div className="outlet-container">
        <Outlet context={[searchInput, setSearchInput]} />
      </div>
    </div>
  );
};

export default App;
