import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMoviesDetailsById } from '../../movies-api.js';
import { Suspense, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css'


export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const backLinkURL = useRef(location.state ?? '/');
  

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.btnLink, isActive && css.moreInfoLinkActive);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMoviesDetailsById(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);
  
  const userScore = movie ? (Number(movie.vote_average) * 10).toFixed(0) : null;
  return (
    <section className={css.movieDetails}>
      <Link to={backLinkURL.current} className={css.btnLink}>
        Go back
      </Link>
      {loading && <p>Loading information...</p>}
      {movie && (
        <div className={css.movieDetailsSection}>
          <div className={css.movieDetailsThumb}>
            <img
              className={css.movieDetailsImg}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : <p>Not found</p>
              }
              alt={movie.original_title}
              width="350"
              height="500"
            />
            <div>
              <h2 className={css.movieDetailsTitle}>{movie.original_title}</h2>
              <p className={css.movieDetailsTagline}>{movie.tagline}</p>
              <p className={css.movieDetailsText}>
                <span className={css.spanAccent}>Release date:</span>{' '}
              </p>
              {userScore !== '0' && userScore !== null && (
                <div className={css.movieDetailsScore}>
                  <p className={css.movieDetailsText}>
                    <span className={css.spanAccent}>User Score:</span>{' '}
                    {userScore}&#37;
                  </p>{' '}
                </div>
              )}
              <h3 className={css.movieDetailsTitleFilm}>Overview</h3>
              <p className={`${css.movieDetailsText} ${css.forLaptop}`}>
                {movie.overview}
              </p>
              <h3 className={css.movieDetailsTitleFilm}>Genres</h3>
              <ul className={css.movieDetailsGenresList}>
                {movie.genres.map(genre => (
                  <li className={css.movieDetailsText} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <nav className={css.moreInfo}>
            <NavLink className={buildLinkClass} to={'cast'}>
              Cast
            </NavLink>
            <NavLink className={buildLinkClass} to={'reviews'}>
              Reviews
            </NavLink>
          </nav>
          <Suspense fallback={<div>Please wait loading page...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </section>
  );
}

