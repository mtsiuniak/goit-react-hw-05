import { useEffect, useState } from "react";
import { getTrendMovies } from "../../movies-api";
import css from "./HomePage.module.css";
import MoviesList from "../../components/MoviesList/MoviesList"

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    async function fetchTrendMovies() {
      try {
        setLoading(true);
        const data = await getTrendMovies();
        setMovies(data);
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchTrendMovies();
  }, [])

  return (
    <div>
      <h1 className={css.tittle}>Trending today</h1>
      {loading && <b>Loading movies</b>}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
}