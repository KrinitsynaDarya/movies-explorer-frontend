import author from "../../images/author.jpg";
import "./AboutMe.css";
import Portfolio from "../Portfolio/Portfolio";
import PageContainer from "../PageContainer/PageContainer";

function AboutMe() {
  return (
    <>
      <section className="author" id="author">
        <PageContainer>
          <h2 className="author__title section-title">Студент</h2>
          <div className="author__container">
            <div className="author__info">
              <h3 className="author__name">Дарья</h3>
              <p className="author__job">ETL-разработчик, 25 лет</p>
              <p className="author__description">
                Родилась и отучилась в Оренбурге. Окончила факультет математики
                и информационных технологий ОГУ, работаю в сфере ETL-разработки.
                Люблю плавание, прогулки, путешествия и котиков. После окончания
                обучения в Яндекс.Практикуме планирую попробовать себя в роли
                WEB-разработчика.
              </p>
              <a
                className="author__github"
                href="https://github.com/KrinitsynaDarya"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>
            <img alt="Автор проекта" src={author} className="author__photo" />
          </div>
          <Portfolio />
        </PageContainer>
      </section>
    </>
  );
}

export default AboutMe;
