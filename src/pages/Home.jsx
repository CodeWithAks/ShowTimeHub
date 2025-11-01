import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import { getPopularmovies, searchMovies } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext"; 
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { filter } = useMovieContext(); 

  // Load popular movies
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popular = await getPopularmovies();
        setMovies(popular); //state update
      } catch {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  //Search movies
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; //blank input pe kuch na ho
    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch {
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic 
  const filteredMovies = movies.filter((movie) => {
    if (filter === "All") return true; 
    if (filter === "Top Rated") return movie.vote_average >= 8; 

    const genreMap = {
      Action: 28,
      Comedy: 35,
      Horror: 27,
      Romance: 10749,
      Thriller: 53,
    };

    // If the selected filter is a genre, check if the movie has that genre
    if (genreMap[filter]) {
      return movie.genre_ids.includes(genreMap[filter]);
    }

    return true; 
  });

  return (
    <div className={`min-h-screen w-full p-6 relative transition-colors duration-300 ${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          className="px-4 py-2 rounded-xl text-white w-92 placeholder-zinc-400 bg-zinc-700"
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-amber-500 px-4 py-2 rounded-xl hover:bg-amber-600 ml-2">Search</button>
      </form>

      {error && <div className="text-center text-red-400">{error}</div>}

      {/* Movies Grid */}
      {loading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className="cursor-pointer"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      {selectedMovie && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-md z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedMovie(null);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-zinc-800 rounded-lg shadow-xl flex flex-col sm:flex-row w-11/12 sm:w-[700px] relative"
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-3 text-gray-300 hover:text-white text-2xl"
            >
              ✕
            </button>

            {/* Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="w-full sm:w-1/2 h-64 sm:h-auto object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
            />

            {/* Info */}
            <div className="p-5 flex flex-col justify-center text-left">
              <h2 className="text-2xl font-bold text-amber-400 mb-2">
                {selectedMovie.title}
              </h2>
              <p className="text-gray-400 text-sm mb-1">
                {selectedMovie.release_date
                  ? `Release: ${selectedMovie.release_date}`
                  : ""}
              </p>
              <p className="text-gray-300 mb-3">{selectedMovie.overview}</p>
              <p className="text-amber-400 font-semibold">
                ⭐ Rating: {selectedMovie.vote_average}
              </p>
              <p className="text-gray-400 text-sm">
                🎬 Popularity: {selectedMovie.popularity}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
