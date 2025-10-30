import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

const Favourites = () => {
  const { favourites } = useMovieContext();

  return (
    <div className="bg-zinc-800 min-h-screen text-white p-6">
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
