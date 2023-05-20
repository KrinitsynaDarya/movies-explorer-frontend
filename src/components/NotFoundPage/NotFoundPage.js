import "./NotFoundPage.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-page__container">
        <h2 className="not-found-page__title">404</h2>
        <h3 className="not-found-page__subtitle">Страница не найдена</h3>
      </div>
      <Link to="/" className="not-found-page__link">
        Назад
      </Link>
    </section>
  );
}

export default NotFoundPage;
