Movie Search App
Overview
A React-based web application that allows users to search for movies using the OMDB API, view detailed movie information, and manage a list of favorite movies stored in localStorage. The app features a responsive UI with search, pagination, and navigation between search results, movie details, and favorites.
Features

Search Movies: Search for movies, series, or episodes by title and type, with pagination.
Movie Details: View detailed information (e.g., plot, director, ratings) for a selected movie.
Favorites: Add or remove movies from a favorites list, persisted in localStorage.
Responsive Design: Mobile-friendly layout using CSS media queries.

Tech Stack

React: Frontend library for building the UI.
React Router: For client-side routing.
OMDB API: For fetching movie data.
Font Awesome: For icons (via CDN).
CSS: Custom styles for layout and responsiveness.
LocalStorage: For persisting favorite movies.

Setup

Clone the Repository:
git clone <repository-url>
cd movie-search-app


Install Dependencies:Ensure Node.js is installed, then run:
npm install


Run the Application:Start the development server (assumes Vite or Create React App):
npm run dev

Open http://localhost:5173 (or the specified port) in your browser.

Optional: Font Awesome:The app uses Font Awesome via a CDN in index.html. To install locally:
npm install @fortawesome/fontawesome-free

Add to src/main.jsx:
import '@fortawesome/fontawesome-free/css/all.min.css';



Usage

Search: On the homepage (/), enter a movie title and select a type (movie, series, episode) to search. Use pagination to navigate results.
View Details: Click "Details" on a movie card to view full details (/movie/:imdbID).
Manage Favorites: Click "Add Favorite" or "Remove Favorite" on search results or movie details. View favorites at /favorites.
Clear Search: Reset the search form using the "Clear" button.

Project Structure
src/
├── components/
│   ├── Favorites.jsx       # Displays list of favorite movies
│   ├── MovieDetails.jsx    # Shows detailed movie information
│   ├── MovieSearch.jsx     # Handles movie search and results display
│   ├── PageTitle.jsx       # Updates document title
├── App.jsx                 # Main app component with routing and state
├── index.css               # Global styles
├── main.jsx                # Entry point for React app

Notes

The app uses the OMDB API with an embedded API key (8be4478c). For production, secure the API key (e.g., via environment variables).
Favorites are stored in localStorage and persist across sessions.
All React-related code is in .jsx files for consistency.

License
MIT License
