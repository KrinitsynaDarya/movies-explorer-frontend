import "./AboutProject.css";
import PageContainer from "../PageContainer/PageContainer";

function AboutProject() {
  return (
    <section className="project" id="project">
      <PageContainer>
        <h2 className="project__title section-title">О проекте</h2>
        <ul className="project__info">
          <li className="project__info-item">
            <h3 className="project__info-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="project__info-description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>

          <li className="project__info-item">
            <h3 className="project__info-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project__info-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>

        <div className="project__steps">
          <p className="project__backend project__step">1 неделя</p>
          <p className="project__frontend project__step"> 4 недели</p>
          <p className="project__step">Back-end</p>
          <p className="project__step">Front-end</p>
        </div>
      </PageContainer>
    </section>
  );
}

export default AboutProject;
