import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from './PageTitle.jsx';

const API_KEY = '8be4478c';
const BASE_URL = 'https://www.omdbapi.com/';

async function fetchMovies(query, type, page) {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}${type ? `&type=${type}` : ''}&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network error');
  }
  return await response.json();
}

function MovieSearch({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  currentPage,
  setCurrentPage,
  movies,
  setMovies,
  totalCount,
  setTotalCount,
  clearSearch,
  favorites,
  toggleFavorite,
}) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    await fetchMoviesData(searchQuery, searchType, 1);
  };

  const fetchMoviesData = async (query, type, page) => {
    if (!query) {
      setMovies([]);
      setTotalCount(0);
      setError(null);
      return;
    }

    try {
      const data = await fetchMovies(query, type, page);
      if (data.Response === 'True') {
        const validMovies = data.Search.filter(
          (movie) => movie && movie.imdbID && movie.Title
        );
        setMovies(validMovies);
        setTotalCount(parseInt(data.totalResults, 10));
        setError(null);
      } else {
        setMovies([]);
        setTotalCount(0);
        setError(data.Error || 'No movies found.');
      }
    } catch (err) {
      setMovies([]);
      setTotalCount(0);
      setError('Failed to fetch movies. Please try again.');
    }
  };

  useEffect(() => {
    fetchMoviesData(searchQuery, searchType, currentPage);
  }, [searchQuery, searchType, currentPage]);

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="movie-search-container">
      <PageTitle title="Movie Search" />
      <h2 className="search-title">Search for Movies</h2>
      <div className="search-form">
        <input
          type="text"
          className="input search-input"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search for a movie"
        />
        <select
          className="input search-type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          aria-label="Select movie type"
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button
          className="btn search-btn"
          onClick={handleSearch}
          disabled={!searchQuery}
          aria-label="Search movies"
        >
          <i className="fas fa-search" aria-hidden="true"></i> Search
        </button>
        <button
          className="btn clear-btn"
          onClick={clearSearch}
          disabled={!searchQuery && !searchType}
          aria-label="Clear search"
        >
          <i className="fas fa-times" aria-hidden="true"></i> Clear
        </button>
        <button
          className="btn favorites-btn"
          onClick={() => navigate('/favorites')}
          aria-label="View favorites"
        >
          <i className="fas fa-heart" aria-hidden="true"></i> Favorites
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {movies.length === 0 && searchQuery && !error ? (
        <div className="no-results">No movies found. Try a different search!</div>
      ) : (
        <>
          {searchQuery && totalCount > 0 && (
            <div className="total-movies">Found {totalCount} movies</div>
          )}
          <div className="movies-grid">
            {movies.map((movie) => {
              const isFavorited = favorites.some((fav) => fav.imdbID === movie.imdbID);
              return (
                <div key={movie.imdbID} className="movie-card">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450?text=No+Image'}
                    alt={`${movie.Title} poster`}
                    className="movie-poster"
                  />
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.Title}</h3>
                    <p className="movie-year">{movie.Year}</p>
                    <p className="movie-description">{movie.Type}</p>
                    <button
                      className="btn details-btn"
                      onClick={() => navigate(`/movie/${movie.imdbID}`)}
                      aria-label="View movie details"
                    >
                      <i className="fas fa-info-circle" aria-hidden="true"></i> Details
                    </button>
                    <button
                      className={`btn favorite-btn ${isFavorited ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite(movie)}
                      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <i className={`fas fa-heart ${isFavorited ? 'favorited' : ''}`} aria-hidden="true"></i>
                      {isFavorited ? ' Remove Favorite' : ' Add Favorite'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalCount > 10 && (
            <div className="pagination">
              <button
                className="btn pagination-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <i className="fas fa-chevron-left" aria-hidden="true"></i> Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                className="btn pagination-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next <i className="fas fa-chevron-right" aria-hidden="true"></i>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MovieSearch;
