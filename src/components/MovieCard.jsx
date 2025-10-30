import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext();
  const favourite = isFavourite(movie.id);

  const toggleFavourite = () => {
    if (favourite) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between ml-8 transition-transform duration-300 hover:scale-105">
      {/* Poster */}
      <div className="relative h-120 w-80 bg-zinc-700 rounded flex items-center justify-center mb-4">
        <img
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Heart Icon */}
        <button
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={toggleFavourite}
        >
          <i
            className={`fa-solid fa-heart transition-colors duration-200 ${
              favourite ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
          ></i>
        </button>
      </div>

      {/* Movie Info */}
      <div>
        <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
        <p className="text-sm text-gray-400 mb-2">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
