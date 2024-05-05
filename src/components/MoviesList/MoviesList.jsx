import MoviesItem from "../MoviesItem/MoviesItem"

export default function MoviesList  ({movies})  {
  return (
    
      <ul >
      {movies.map((movie) => (
        <li key={movie.id}>
          <MoviesItem movie={movie} />
        </li>  
        ))}
      </ul>
    
  );
}