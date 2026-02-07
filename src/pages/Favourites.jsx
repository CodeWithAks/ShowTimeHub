import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useTheme } from "../contexts/ThemeContext";

const Favourites = () => {
  const { favourites } = useMovieContext();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen relative overflow-hidden p-4 sm:p-6 transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Subtle background glow */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-40 w-[350px] h-[350px] bg-purple-500/20 rounded-full blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2">
          Your Favourites
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Movies you’ve saved to watch later
        </p>
      </div>

      {/* Empty State */}
      {favourites.length === 0 ? (
        <div className="relative z-10 flex flex-col items-center justify-center mt-24 text-center">
          <div className="text-6xl mb-4">🍿</div>
          <p className="text-lg sm:text-xl font-semibold mb-2">
            No favourites yet
          </p>
          <p className="text-gray-400 max-w-sm">
            Start exploring movies and add the ones you love to your favourites.
          </p>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {favourites.map((movie) => (
            <div
              key={movie.id}
              className="transition-transform duration-300 hover:scale-105"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
