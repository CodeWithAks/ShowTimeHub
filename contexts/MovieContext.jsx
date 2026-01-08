import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favourites,setFavourites] = useState([]);
    const [filter,setFilter] = useState("All"); //for movie genre selection

    // first time load - purane favourites load hote h from localStorage
    useEffect(()=> {
        const storedFavs = localStorage.getItem("favourites")
        if(storedFavs) setFavourites(JSON.parse(storedFavs))
    },[])

    //favourites change - save to localStorage
    useEffect(() => {
        localStorage.setItem("favourites",JSON.stringify(favourites))
    },[favourites])


    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev,movie]) //purani list + nyi movie
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prev=>prev.filter(movie=>movie.id!==movieId))
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie=>movie.id === movieId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
        filter,
        setFilter,
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}

//ek shared memory(box) jisko koi bhi component access kr skta h by useMovieContext() hook