import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getMoviesDetailsById } from "../../movies-api";
import MovieCastItem from "../MovieCastItem/MovieCastItem"

export default function MovieCast() {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [cast, setCast] = useState([])
    

    useEffect(() => {
    const handelClick = async () => {
      try {
        setLoading(true);
        setCast([]);
        const data = await getMoviesDetailsById(movieId, '/credits');
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    handelClick();
  }, [movieId]);
  return (
    <section >
      {loading && <p>Loading information</p>}
      {cast && (
        <ul >
          {cast.map(cast => (
            <li  key={cast.id}>
              <MovieCastItem data={cast} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

