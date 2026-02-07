import React, { useState } from 'react'; // Added useState for mobile menu
import { Link } from 'react-router';
import { useMovieContext } from '../contexts/MovieContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const { filter, setFilter } = useMovieContext();
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls mobile menu

  const navBg = darkMode ? "bg-black text-white" : "bg-white text-black";
  const hoverColor = darkMode ? "hover:text-amber-200" : "hover:text-amber-600";

  return (
    <nav className={`${navBg} shadow-md transition-colors duration-300 sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={() => window.location.reload()} className={`text-xl md:text-2xl font-bold ${hoverColor} transition-colors duration-200`}>
              🎬 <span className="hidden sm:inline">ShowTimeHub</span>
            </Link>
          </div>

          {/* Desktop Controls (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Dropdown */}
            <div className={`rounded-md px-1 py-1 ${darkMode ? "bg-zinc-700" : "bg-gray-100"}`}>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent outline-none px-2 py-1 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Top Rated">Top Rated</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>

            <Link to="/" className={`${hoverColor} transition-colors`}>Home</Link>
            <Link to="/favourites" className={`${hoverColor} transition-colors`}>Favourites</Link>
            
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-2xl cursor-pointer">
              {darkMode ? <i className="fa-solid fa-toggle-on text-amber-400"></i> : <i className="fa-solid fa-toggle-off"></i>}
            </button>
          </div>

          {/* Mobile Right Side (Toggle + Menu Button) */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="text-xl">
              {darkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className={`md:hidden ${darkMode ? "bg-zinc-900" : "bg-gray-50"} border-t border-gray-700 p-4 space-y-4`}>
          <Link to="/" className="block py-2 text-lg">Home</Link>
          <Link to="/favourites" className="block py-2 text-lg">Favourites</Link>
          <div className="pt-2">
            <p className="text-xs uppercase mb-2 opacity-50">Filter by Genre</p>
            <select
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setIsMenuOpen(false); }}
                className={`w-full p-2 rounded ${darkMode ? "bg-zinc-700" : "bg-white border"}`}
              >
                <option value="All">All</option>
                <option value="Top Rated">Top Rated</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;