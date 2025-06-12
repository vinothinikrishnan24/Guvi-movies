import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MovieSearch from './components/MovieSearch.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import Favorites from './components/Favorites.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage if available
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.imdbID === movie.imdbID);
      if (isFavorited) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        // Add to favorites
        return [...prevFavorites, movie];
      }
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchType('');
    setCurrentPage(1);
    setMovies([]);
    setTotalCount(0);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <MovieSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchType={searchType}
              setSearchType={setSearchType}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              movies={movies}
              setMovies={setMovies}
              totalCount={totalCount}
              setTotalCount={setTotalCount}
              clearSearch={clearSearch}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/movie/:imdbID"
          element={<MovieDetails favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />
      </Routes>
    </div>
  );
}

export default App;