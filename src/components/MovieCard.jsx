import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext();
  const favourite = isFavourite(movie.id); //checking if the movie favourite

  const toggleFavourite = () => {
    if (favourite) { //if yes-> remove it
      removeFromFavourites(movie.id);
    } else {  //if no-> add it
      addToFavourites(movie);
    }
  };

  return (
    <div className="p-2 sm:p-3 md:p-4 flex flex-col justify-between hover:bg-zinc-800/50 rounded-xl transition-colors duration-200">
      {/* Poster */}
      <div className="relative w-full aspect-[2/3] flex items-center justify-center mb-4">
        <img
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Heart Icon */}
        <button
          className="absolute top-1 right-1 sm:top-2 sm:right-2 p-2 rounded-lg hover:bg-white/10 transition text-lg sm:text-2xl cursor-pointer"
          onClick={(e) => {
            e.preventDefault(); // Prevent default button behavior
            e.stopPropagation(); // Prevent event from bubbling up to parent div
            toggleFavourite();
          }}
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
        <p className="text-xs sm:text-sm text-gray-400 mb-2">{movie.release_date?.split("-")[0]}</p>
        <p className="text-xs sm:text-sm text-amber-400 font-semibold">{movie.vote_average.toFixed(1)} ⭐</p>
      </div>
    </div>
  );
}

export default MovieCard;
