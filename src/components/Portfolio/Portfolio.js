import portfoliolink from "../../images/portfolio-link.svg";
import { useLocation } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <p className="portfolio__title">Портфолио</p>
        <ul className="portfolio__list">
          <li className="portfolio__project">
            <p className="portfolio__project-name">Статичный сайт</p>
            <a
              href="https://github.com/KrinitsynaDarya/how-to-learn.git"
              className=""
            >
              <img
                alt="Статичный сайт"
                src={portfoliolink}
                className="portfolio__link"
              />
            </a>
          </li>
          <li className="portfolio__project">
            <p className="portfolio__project-name">Адаптивный сайт</p>
            <a
              href="https://github.com/KrinitsynaDarya/russian-travel.git"
              className=""
            >
              <img
                alt="Адаптивный сайт"
                src={portfoliolink}
                className="portfolio__link"
              />
            </a>
          </li>
          <li className="portfolio__project">
            <p className="portfolio__project-name">Одностраничное приложение</p>
            <a
              href="https://github.com/KrinitsynaDarya/react-mesto-api-full-gha.git"
              className=""
            >
              <img
                alt="Одностраничное приложение"
                src={portfoliolink}
                className="portfolio__link"
              />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Portfolio;
