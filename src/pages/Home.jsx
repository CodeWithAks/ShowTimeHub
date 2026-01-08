import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import { getPopularmovies, searchMovies, getMovieTrailer } from "../services/api";
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
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Load popular movies
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popular = await getPopularmovies();
        setMovies(popular);
      } catch {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // Trailer
  useEffect(() => {
    if (!selectedMovie) return;

    const fetchTrailer = async () => {
      try {
        const trailerData = await getMovieTrailer(selectedMovie.id);
        setTrailer(trailerData || null);
      } catch {
        setTrailer(null);
      }
    };

    fetchTrailer();
  }, [selectedMovie]);

  // Search movies
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setIsSearching(true);

    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch {
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  // Clear search
  const clearSearch = async () => {
    setSearchQuery("");
    setIsSearching(false);
    setLoading(true);

    const popular = await getPopularmovies();
    setMovies(popular);
    setLoading(false);
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

    if (genreMap[filter]) {
      return movie.genre_ids.includes(genreMap[filter]);
    }

    return true;
  });

  return (
    <div
      className={`min-h-screen w-full p-4 sm:p-6 relative transition-colors duration-300 ${
        darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-8"
      >
        <input
          className="px-4 py-2 rounded-xl text-white w-full sm:w-96 placeholder-zinc-400 bg-zinc-700"
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-amber-500 px-4 py-2 rounded-xl hover:bg-amber-600 w-full sm:w-auto"
        >
          Search
        </button>
      </form>

      {error && <div className="text-center text-red-400">{error}</div>}

      {/* Movies Grid */}
      {loading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedMovie(null);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl p-4 md:p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl z-10"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Poster */}
              <div className="md:w-1/3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="md:w-2/3 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {selectedMovie.title}
                  </h2>

                  {/* Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-400 mb-4">
                    <span>{selectedMovie.release_date?.split("-")[0]}</span>
                    <span className="text-amber-400 font-semibold">
                      ⭐ {selectedMovie.vote_average}
                    </span>
                    <span>🔥 {Math.round(selectedMovie.popularity)}</span>
                  </div>

                  {/* Overview */}
                  <p className="text-gray-300 leading-relaxed">
                    {selectedMovie.overview || "No description available."}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                  {trailer && (
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-lg font-semibold w-full sm:w-auto"
                    >
                      ▶ Watch Trailer
                    </button>
                  )}

                  <button className="border border-white/30 hover:border-white px-5 py-2 rounded-lg text-white w-full sm:w-auto">
                    Add to Favourites
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {showTrailer && trailer && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-2"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowTrailer(false);
          }}
        >
          <div className="w-full sm:w-[90%] max-w-4xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Movie Trailer"
              className="w-full h-full rounded-xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
