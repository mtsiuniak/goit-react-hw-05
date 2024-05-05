import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesDetailsById } from "../../movies-api";
import MovieReviewItem from '../MovieReviewItem/MovieReviewItem';


export default function MovieReviews()  {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClick = async () => {
      try {
        setLoading(true);
        setReviews([]);
        const data = await getMoviesDetailsById(movieId, '/reviews');
        setReviews(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleClick();
  }, [movieId]);
  return (
    <div>
      {loading && <p>Loading information</p>}
      {!loading && reviews !== null && reviews.length === 0 && (
        <p
          
        >{"No reviews yet"}</p>
      )}
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <MovieReviewItem data={review} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

