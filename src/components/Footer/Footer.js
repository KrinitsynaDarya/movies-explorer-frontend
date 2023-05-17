import PageContainer from "../PageContainer/PageContainer";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <PageContainer>
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>

        <div className="footer__menu">
          <p className="footer__year">©2020</p>
          <ul className="footer__links">
            <li className="footer__link-container">
              <a
                href="https://practicum.yandex.ru/"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__link-container">
              <a
                href="https://github.com/"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </PageContainer>
    </footer>
  );
}

export default Footer;
