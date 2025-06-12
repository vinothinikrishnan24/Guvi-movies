import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTitle from './PageTitle.jsx';

const API_KEY = '8be4478c';
const BASE_URL = 'https://www.omdbapi.com/';

async function fetchMovieDetails(imdbID) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network error');
  }
  return await response.json();
}

function MovieDetails({ favorites, toggleFavorite }) {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const data = await fetchMovieDetails(imdbID);
        if (data.Response === 'True') {
          setMovie(data);
          setLoading(false);
        } else {
          setError(data.Error || 'Movie not found.');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch movie details.');
        setLoading(false);
      }
    }
    getMovieDetails();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="movie-details-container">
        <div className="loader">
          <div></div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details-container">
        <div className="button-container">
          <button className="btn" onClick={() => navigate(-1)} aria-label="Back to search">
            <i className="fas fa-arrow-left" aria-hidden="true"></i> Back
          </button>
        </div>
        <div className="error-message">{error || 'Movie not found.'}</div>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      <PageTitle title={`${movie.Title} - Movie Details`} />
      <div className="button-container">
        <button className="btn" onClick={() => navigate(-1)} aria-label="Back to search">
          <i className="fas fa-arrow-left" aria-hidden="true"></i> Back
        </button>
        <button
          className="btn"
          onClick={() => navigate('/favorites')}
          aria-label="View favorites"
        >
          <i className="fas fa-heart" aria-hidden="true"></i> Favorites
        </button>
      </div>
      <div className="details-header">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450?text=No+Image'}
          alt={`${movie.Title} Poster`}
          className="details-poster"
        />
        <div className="details-info">
          <h2>{movie.Title}</h2>
          <div className="details-meta">
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)</p>
          </div>
          <button
            className={`btn favorite-btn ${favorites.some((fav) => fav.imdbID === movie.imdbID) ? 'favorited' : ''}`}
            onClick={() => toggleFavorite(movie)}
            aria-label={favorites.some((fav) => fav.imdbID === movie.imdbID) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`fas fa-heart ${favorites.some((fav) => fav.imdbID === movie.imdbID) ? 'favorited' : ''}`} aria-hidden="true"></i>
            {favorites.some((fav) => fav.imdbID === movie.imdbID) ? ' Remove Favorite' : ' Add Favorite'}
          </button>
        </div>
      </div>
      <div className="details-content">
        <h3>Plot</h3>
        <p>{movie.Plot}</p>
        <h3>Additional Information</h3>
        <p><strong>Runtime:</strong> {movie.Runtime}</p>
        <p><strong>Language:</strong> {movie.Language}</p>
        <p><strong>Country:</strong> {movie.Country}</p>
        <p><strong>Awards:</strong> {movie.Awards}</p>
      </div>
    </div>
  );
}

export default MovieDetails;