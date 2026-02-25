import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../services/api";
import { useTheme } from "../contexts/ThemeContext";


const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const { darkMode } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!movie) return;

    const shareData = {
      title: movie.title,
      text: `Check out ${movie.title}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // fallback: copy link
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        const trailerData = await getMovieTrailer(id);
        setTrailer(trailerData);
      } catch (error) {
        console.log("Error loading movie", error);
      }
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    console.log("Trailer value:", trailer);
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p className="text-lg">Loading movie...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p>Movie not found</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
        }`}
    >
      {/* Back Button */}
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className={`px-4 py-2 rounded transition ${darkMode
            ? "bg-zinc-800 hover:bg-zinc-700 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
        >
          ← Back
        </button>
      </div>


      <div className="max-w-6xl mx-auto px-6 pb-10 grid md:grid-cols-2 gap-8">

        {/* Poster */}
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-lg"
          />
        )}

        {/* Movie Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <p className="text-gray-400 mb-4">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>

          <p className="mb-6 leading-relaxed">
            {movie.overview}
          </p>

          <div className="flex gap-4 mb-6">
            {trailer ? (
              <button
                onClick={() => setShowTrailer(!showTrailer)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
              >
                {showTrailer ? "Hide Trailer" : "Watch Trailer"}
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-2 bg-gray-500 rounded font-semibold cursor-not-allowed opacity-70"
              >
                No Trailer Available
              </button>
            )}

            <button
              onClick={handleShare}
              className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded font-semibold transition"
            >
              Share
            </button>
          </div>

          <p className="text-sm text-gray-400">
            Release Date: {movie.release_date}
          </p>
        </div>
      </div>

      {/* Trailer Section  */}
      {showTrailer && trailer && (
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <button className="text-2xl font-semibold mb-4">Trailer</button>
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Movie Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {copied && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
          Link copied!
        </div>
      )}

    </div>
  )

};

export default MovieDetails;