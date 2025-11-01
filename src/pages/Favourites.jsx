import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useTheme } from "../contexts/ThemeContext";

const Favourites = () => {
  const { favourites } = useMovieContext();
  const {darkMode} = useTheme();

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>

      <h2 className="text-3xl font-bold mb-8 text-center">Your Favourites</h2>

      {favourites.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          No favourite movies yet. Go add some!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
