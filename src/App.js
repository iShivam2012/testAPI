import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const FetchMovieHandler = () => {
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const Movies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           release: movieData.release_date,
  //           openingText: movieData.opening_crawl,
  //         };
  //       });
  //       setMovies(Movies);
  //     });
  // };

  const FetchMovieHandler = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        const error = new Error("Something went wrong!");
        throw error;
      }
      const data = await response.json();
      const Movies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          release: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(Movies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length === 0 && <p>No Movies Found!</p>}
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && !error && <p>Loading...</p>}
        {error && <p>{error} </p>}
      </section>
    </React.Fragment>
  );
}

export default App;
