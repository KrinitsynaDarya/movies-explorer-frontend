import { useNavigate } from "react-router-dom";

import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }

  return (
    <section className="not-found-page">
      <div className="not-found-page__container">
        <h2 className="not-found-page__title">404</h2>
        <h3 className="not-found-page__subtitle">Страница не найдена</h3>
      </div>
      <button className="not-found-page__button" onClick={handleGoBack}>
        Назад
      </button>
    </section>
  );
}

export default NotFoundPage;
