import { useNavigate } from 'react-router-dom';
import PageTitle from './PageTitle.jsx';

function Favorites({ favorites }) {
  const navigate = useNavigate();

  return (
    <div className="movie-search-container">
      <PageTitle title="Favorites - Movie Search" />
      <h2 className="search-title">Your Favorite Movies</h2>
      <button
        className="btn"
        onClick={() => navigate('/')}
        aria-label="Back to search"
      >
        <i className="fas fa-arrow-left" aria-hidden="true"></i> Back to Search
      </button>
      {favorites.length === 0 ? (
        <div className="no-results">No favorite movies yet. Add some from the search page!</div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;