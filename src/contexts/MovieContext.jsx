import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favourites,setFavourites] = useState([])

    // Load old favourites from localStorage
    useEffect(()=> {
        const storedFavs = localStorage.getItem("favourites")
        if(storedFavs) setFavourites(JSON.parse(storedFavs))
    },[])

    //Save favourites to localStorage
    useEffect(() => {
        localStorage.setItem("favourites",JSON.stringify(favourites))
    },[favourites])

    const addToFavourites = (movie) => {
        setFavourites(prev => [...prev,movie])
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
        isFavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}

// React se kuch important cheezein import kar rahe hain
// createContext -> context banata hai (global data box)
// useContext -> context se data nikalta hai
// useEffect -> automatically code chalata hai jab component load ho ya data change ho
// useState -> variable banata hai jisme data store hota hai
// import { createContext, useContext, useEffect, useState } from "react";

// // 1️⃣ Ek naya context (global data box) bana rahe hain
// const MovieContext = createContext();

// // 2️⃣ Ek custom hook bana rahe hain taaki hum easily MovieContext ka data use kar sakein
// // ⚠️ Tumhare original code mein yahan galti thi (context pass nahi kiya tha)
// // Correct version niche hai 👇
// export const useMovieContext = () => useContext(MovieContext);

// // 3️⃣ Ye MovieProvider ek component hai jo app ke saare parts ko data provide karega
// export const MovieProvider = ({ children }) => {

//     // 4️⃣ favourites naam ka ek state (variable) bana rahe hain jisme hum favourite movies store karenge
//     // setfavourites ek function hai jisse hum list ko update kar sakte hain
//     const [favourites, setfavourites] = useState([]);

//     // 5️⃣ Ye useEffect tab chalega jab component first time load hoga
//     // Ye localStorage se old favourites list nikaalta hai (agar pehle se save ho)
//     useEffect(() => {
//         const storedFavs = localStorage.getItem("favourites"); // localStorage se data lena
//         if (storedFavs) setfavourites(JSON.parse(storedFavs)); // agar data mila to usse favourites mein daal do
//     }, []); // empty array [] matlab ye sirf ek baar chalega (jab component mount ho) 

//     // 6️⃣ Ye useEffect tab chalega jab favourites list change hogi
//     // Iska kaam hai nayi favourites list ko localStorage mein save karna
//     useEffect(() => {
//         localStorage.setItem("favourites", JSON.stringify(favourites)); // list ko string bana kar save kar do
//     }, [favourites]); // jab bhi favourites badle, ye code chalega

//     // 7️⃣ Ab hum apne children components ko data denge (context ke through)
//     // ⚠️ Tumhare code mein yahan 'value' missing thi, usse fix kiya hai 👇
//     return (
//         <MovieContext.Provider value={{ favourites, setfavourites }}>
//             {children}
//         </MovieContext.Provider>
//     );
// };
