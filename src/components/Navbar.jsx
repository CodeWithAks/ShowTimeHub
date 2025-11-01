import React from 'react';
import { Link } from 'react-router';
import { useMovieContext } from '../contexts/MovieContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { filter, setFilter } = useMovieContext();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div>
      <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"} px-6 py-4 flex justify-between items-center shadow-md transition-colors duration-300`}>
        
        {/* Logo */}
        <div className="nav-brand text-2xl font-bold">
          <Link to="/" className={`${darkMode ? "hover:text-amber-200" : "hover:text-amber-600"} transition-colors duration-200 ml-10`}>
            🎬 ShowTimeHub
          </Link>
        </div>
        
        {/* Dropdown */}
        <div className={`ml-240 rounded-md px-1 py-1 ${darkMode ? "bg-zinc-700 text-white" : "bg-white text-black"}`}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`${darkMode ? "bg-zinc-700 text-white" : "bg-white text-black"} rounded-md px-2 py-1`}
          >
            <option value="All">All</option>
            <option value="Top Rated">Top Rated</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={toggleTheme} className="ml-4 text-xl" title="Toggle Dark/Light Mode">
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* Links */}
        <div className="nav-links space-x-10 text-lg">
          <Link to="/" className={`${darkMode ? "hover:text-amber-200" : "hover:text-amber-600"} transition-colors duration-200`}>Home</Link>
          <Link to="/favourites" className={`${darkMode ? "hover:text-amber-200" : "hover:text-amber-600"} transition-colors duration-200 mr-20`}>Favourites</Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
