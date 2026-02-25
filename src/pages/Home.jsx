import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MovieCard from "../components/MovieCard";
import { getPopularmovies, searchMovies, getMovieTrailer, getTopRatedMovies, getMoviesByGenre } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import { useTheme } from "../contexts/ThemeContext";
import SkeletonCard from "../components/SkeletonCards.jsx";
import { useNavigate } from "react-router-dom";

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
  const [heroIndex, setHeroIndex] = useState(0);

  const navigate = useNavigate();

  // Fetch movies based on filter (only when not searching)
  useEffect(() => {
    if (isSearching) return; // Skip if user is searching

    const fetchMoviesByFilter = async () => {
      setLoading(true);
      try {
        let results;

        if (filter === "All") {
          results = await getPopularmovies();
        } else if (filter === "Top Rated") {
          results = await getTopRatedMovies();
        } else {
          // Genre-based fetch
          const genreMap = {
            Action: 28,
            Comedy: 35,
            Horror: 27,
            Romance: 10749,
            Thriller: 53,
          };

          results = genreMap[filter]
            ? await getMoviesByGenre(genreMap[filter])
            : await getPopularmovies();
        }

        setMovies(results);
        setError(null);
      } catch {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByFilter();
  }, [filter, isSearching]);

  //banner
  useEffect(() => {   //
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % Math.min(movies.length, 5));
    }, 6000); // change every 6 seconds

    return () => clearInterval(interval);
  }, [movies]);

  //debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

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


  const clearSearch = async () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  return (
    <div
      className={`min-h-screen w-full p-4 sm:p-6 relative overflow-hidden transition-colors duration-300 ${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
        }`}
    >
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px]" />


      {/* Hero Banner */}
      {movies.length > 0 && !isSearching && (
        <motion.div
          key={heroIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[60vh] sm:h-[70vh] rounded-3xl overflow-hidden mb-12 shadow-2xl"
        >
          {/* Bg image */}
          <img
            src={`https://image.tmdb.org/t/p/original${movies[heroIndex].backdrop_path}`}
            alt={movies[heroIndex].title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark/Light mode */}
          <div
            className={`absolute inset-0 ${darkMode
              ? "bg-gradient-to-r from-black via-black/60 to-transparent"
              : "bg-gradient-to-r from-white via-white/5 to-transparent"
              }`}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-10 max-w-2xl">
            <h1
              className={`text-3xl sm:text-5xl font-extrabold mb-3 ${darkMode ? "text-white" : "text-black"
                }`}
            >
              {movies[heroIndex].title}
            </h1>

            <p
              className={`text-sm sm:text-base line-clamp-3 mb-5 ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              {movies[heroIndex].overview}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedMovie(movies[heroIndex])}
                className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-3 rounded-xl font-semibold">
                ▶ Watch
              </button>

              <button
                className={`px-6 py-3 rounded-xl border transition ${darkMode
                  ? "border-white/30 hover:bg-white/10 text-white"
                  : "border-black/20 hover:bg-black/5 text-black"
                  }`}>
                + My List
              </button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 right-6 flex gap-2">
            {movies.slice(0, 5).map((_, index) => (
              <div
                key={index}
                className={`h-1 w-6 rounded-full transition ${index === heroIndex ? "bg-amber-500" : darkMode ? "bg-white/30" : "bg-black/30"}`} />
            ))}
          </div>
        </motion.div>
      )}


      {/* Search Bar*/}
      <form
        onSubmit={handleSearch}
        className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-3 mb-10 backdrop-blur-xl bg-white/5 p-4 rounded-2xl shadow-lg">
        <input
          className="px-4 py-3 rounded-xl w-full sm:w-96 bg-zinc-800/70 border border-white/10 placeholder-zinc-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 outline-none transition"
          type="text"
          placeholder="Search movies, actors, genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />


        <button type="submit" className="bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition w-full sm:w-auto" >
          Search
        </button>
      </form>

      {error && <div className="text-center text-red-400">{error}</div>}

      {/* Movies */}
      {loading ? (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer"
            >
              <MovieCard
                movie={movie}
                onCardClick={() => navigate(`/movie/${movie.id}`)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

