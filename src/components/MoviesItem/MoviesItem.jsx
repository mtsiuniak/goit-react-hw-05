import { Link } from "react-router-dom";
import css from "./MoviesItem.module.css";



export default function MovieItem ({movie: {id,title}})  {
  
  return <div className={css.item}>
    <Link to={`/movies/${id}`}>{title}</Link>
  </div>
}

