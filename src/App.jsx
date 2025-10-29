import { Routes,Route } from 'react-router';
import './App.css';
import MovieCard from './components/MovieCard';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Navbar from './components/Navbar';
import { MovieProvider } from './contexts/MovieContext';

function App() {
  return (
    <MovieProvider>
    <div>
    <Navbar />
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/favourites" element={<Favourites/>} />
      </Routes>
    </div>
    </div>
    </MovieProvider>
  )
}

export default App
