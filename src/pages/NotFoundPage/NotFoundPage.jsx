import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css"

export default function NotFoundPage() {
  return (
    <div>
      <p className={css.error}>Opps! Page not found! Sorry!</p>
      <p className={css.error}>Please visit out <Link to="/">home page</Link></p>
    </div>
  );
}