import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  // const {isfavourite,addToFavourites,removeFromFavourites} = useMovieContext()
  // const favourite = isFavourite(movie.id)
  
  function onlike() {
    alert("Clicked");
  }

  return (
    // card
    <div className="p-4 flex flex-col justify-between ml-8 transition-transform duration-300 hover:scale-105">
        
      {/* Poster  */}
      <div className="relative h-90 w-80 bg-zinc-700 rounded flex items-center justify-center mb-4">

        {/* img */}
        <img className="h-90 w-full object-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

      {/* Heart Icon */}
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-600 cursor-pointer"
          onClick={onlike}
        >
          <i className="fa-solid fa-heart"></i>
        </button>
      </div>


      {/* Movie Info */}
      <div>
        <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{movie.release_date?.split("-")[0]}</p>
        
      </div>
    </div>
  );
}

export default MovieCard;
