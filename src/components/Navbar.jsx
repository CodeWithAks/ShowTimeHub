import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div>
       <div className="bg-zinc-950 text-white px-6 py-4 flex justify-between items-center shadow-md">
       {/* <div className='bg-zinc-900 text-white px-6 py-4 flex items-center justify-between'> */}


        {/* Logo */}
        <div className="nav-brand text-2xl font-bold">
          <Link to="/" className="hover:text-amber-200 transition-colors duration-200 ml-10">
            🎬 ShowTimeHub
          </Link>
        </div>

        {/* Links */}
        <div className="nav-links space-x-10 text-lg">
          <Link to="/" className="hover:text-amber-400 transition-colors duration-200">Home</Link>
          <Link to="/favourites" className="hover:text-amber-400 transition-colors duration-200 mr-20">Favourites</Link>
        </div>

      </div>
    </div>
  )
}

export default Navbar

// https://api.themoviedb.org/3/movie/popular?api_key=183928bab7fc630ed0449e4f66ec21bd 