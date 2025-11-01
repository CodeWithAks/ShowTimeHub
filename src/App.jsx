import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Navbar from './components/Navbar';
import { MovieProvider } from './contexts/MovieContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function AppWrapper() {
  const { darkMode } = useTheme(); // to take darkMode state

  return (
    <div className={`${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"} min-h-screen transition-colors duration-300`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

function App() { //root component jo saare providers ko wrap krta h
  return (
    <MovieProvider>
      <ThemeProvider>
        <AppWrapper /> {/* all children inside this div */}
      </ThemeProvider>
    </MovieProvider>
  );
}

export default App;
