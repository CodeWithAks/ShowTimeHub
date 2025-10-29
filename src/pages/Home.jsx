import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getPopularmovies, searchMovies } from '../services/api';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies,setMovies] = useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);

  // const movies = [
  //   { id: 1, title: "Jolly LLB 3", release_date: "2025" },
  //   { id: 2, title: "Caught Stealing", release_date: "2025" },
  //   { id: 3, title: "Homebound", release_date: "2025" },
  //   { id: 4, title: "The Smashing Machine", release_date: "2025" },
  // ];

  useEffect(() => {
    const loadPopularMovies = async () => {
      try{
        const popularMovies = await getPopularmovies();
        setMovies(popularMovies);
      } catch(error){
        console.log(error);
        setError("Failed to load movies .... ")
      } finally {
        setLoading(false)
      }
    }
    loadPopularMovies();
  },[]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) return;
    if(loading) return;
    // alert(searchQuery);
    // setSearchQuery("");

  setLoading(true)
  try {
    const searchResults = await searchMovies(searchQuery);
    setMovies(searchResults);
    setError(null);
  } catch (error) {
    console.log(error);
    setError("Failed to search movies....");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-zinc-800 min-h-screen w-full text-white p-6">

      {/* Search Box */}
      <form onSubmit={handleSearch} className="flex justify-center mb-8 ">
        <input
          className="px-4 py-2 rounded-l-md text-white w-100 placeholder-zinc-400 bg-zinc-700"
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-teal-500 px-4 py-2 rounded-md hover:bg-teal-600 cursor-pointer ml-5"
        >
          Search
        </button>
      </form>

      {/* error */}
      {error && <div>{error}</div>}

      {/* Movie Grid */}
      {loading? (<div className='loading'>Loading...</div>) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) =>
          movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
            <MovieCard movie={movie} key={movie.id} />
          )
        )}
      </div>
      )}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) =>
          movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
            <MovieCard movie={movie} key={movie.id} />
          )
        )}
      </div> */}
    </div>
  );
};

export default Home;
