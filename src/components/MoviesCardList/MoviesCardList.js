import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import ImgDesign from "../../images/33-words-design.jpg";
import ImgYearsDesign from "../../images/100-years-design.jpg";
import ImgBanksy from "../../images/chasing-banksy.jpg";
import ImgBaskiya from "../../images/baskiya-exploison-reality.jpg";
import ImgFreedom from "../../images/run-freedom.jpg";
//import ImgBooksellers from "../../images/book-sellers.jpg";
//import ImgGermany from "../../images/think-germany-night.jpg";

function MoviesCardList({
  onCardClick,
  onCardLike,
  onCardDelete,
  isSavedPage,
  isShortFilm,
}) {
  //const [isLoading, setisLoading] = React.useState(true);

  const cards = [
    {
      id: 1,
      name: "33 слова о дизайне",
      duration: "1ч 42м",
      link: ImgDesign,
      short: true,
    },
    {
      id: 2,
      name: "Киноальманах «100 лет дизайна»",
      duration: "1ч 42м",
      link: ImgYearsDesign,
      short: false,
    },
    {
      id: 3,
      name: "В погоне за Бенкси",
      duration: "1ч 42м",
      link: ImgBanksy,
      short: true,
    },
    {
      id: 4,
      name: "Баския: Взрыв реальности",
      duration: "1ч 42м",
      link: ImgBaskiya,
      short: true,
    },
    {
      id: 5,
      name: "Бег это свобода",
      duration: "1ч 42м",
      link: ImgFreedom,
      short: true,
    },
    /* {
      id: 6,
      name: "Книготорговцы",
      duration: "1ч 42м",
      link: ImgBooksellers,
      short: true,
    },
    {
      id: 7,
      name: "Когда я думаю о Германии ночью",
      duration: "1ч 42м",
      link: ImgGermany,
      short: true,
    },*/
  ];

  const savedCards = [
    {
      id: 1,
      name: "33 слова о дизайне",
      duration: "1ч 42м",
      link: ImgDesign,
      short: true,
    },
    {
      id: 2,
      name: "Киноальманах «100 лет дизайна»",
      duration: "1ч 42м",
      link: ImgYearsDesign,
      short: false,
    },
    /* {
      id: 3,
      name: "В погоне за Бенкси",
      duration: "1ч 42м",
      link: ImgBanksy,
      short: true,
    },*/
  ];

  return (
    <section className="movies-card-list">
      {!isSavedPage
        ? cards
            .filter((card) => {
              return card.short === isShortFilm;
            })
            .map((card) => {
              return (
                <MoviesCard
                  key={card.id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                  isSavedPage={isSavedPage}
                  savedCards={savedCards}
                />
              );
            })
        : savedCards
            .filter((card) => {
              return card.short === isShortFilm;
            })
            .map((card) => {
              return (
                <MoviesCard
                  key={card.id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                  isSavedPage={isSavedPage}
                  savedCards={savedCards}
                />
              );
            })}
    </section>
  );
}

export default MoviesCardList;
