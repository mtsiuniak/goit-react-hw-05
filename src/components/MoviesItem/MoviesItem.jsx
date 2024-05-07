import { Link, useLocation } from "react-router-dom";
import css from "./MoviesItem.module.css";


export default function MovieItem ({movie: {id,title}})  {
  
  const location = useLocation();

  return <div className={css.item}>
    <Link to={`/movies/${id}`} state={location }>{title}</Link>
  </div>
}

