import portfoliolink from "../../images/portfolio-link.svg";
import "./Portfolio.css";

function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <p className="portfolio__title">Портфолио</p>
        <ul className="portfolio__list">
          <li className="portfolio__project">
            <a
              href="https://github.com/KrinitsynaDarya/how-to-learn.git"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__project-name">Статичный сайт</p>
              <img
                alt="Статичный сайт"
                src={portfoliolink}
                className="portfolio__link-logo"
              />
            </a>
          </li>
          <li className="portfolio__project">
            <a
              href="https://github.com/KrinitsynaDarya/russian-travel.git"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__project-name">Адаптивный сайт</p>
              <img
                alt="Адаптивный сайт"
                src={portfoliolink}
                className="portfolio__link-logo"
              />
            </a>
          </li>
          <li className="portfolio__project">
            <a
              href="https://github.com/KrinitsynaDarya/react-mesto-api-full-gha.git"
              className="portfolio__link"
              target="_blank"
              rel="noreferrer"
            >
              <p className="portfolio__project-name">
                Одностраничное приложение
              </p>
              <img
                alt="Одностраничное приложение"
                src={portfoliolink}
                className="portfolio__link-logo"
              />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Portfolio;
