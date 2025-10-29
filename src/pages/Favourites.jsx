import React from 'react'

const Favourites = () => {
  return (
    <div className="bg-zinc-800 min-h-screen flex items-center justify-center text-white px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-400">No Favourite Movies Yet</h2>
        <p className="text-xl text-white">
          Start adding movies to your favourites and they will appear here.
        </p>
      </div>
    </div>
  )
}

export default Favourites
