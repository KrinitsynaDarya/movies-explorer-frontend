import React from "react";
import "./MoviesCard.css";
//import CurrentUserContext from "../contexts/CurrentUserContext";

function MoviesCard({
  card,
  handleSaveMovie,
  handleDeleteMovie,
  isSavedPage,
  // savedCards,
  savedMovies,
}) {
  // const currentUser = React.useContext(CurrentUserContext);
  //const isOwn = card.owner._id === currentUser._id;
  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}ч ${minutes}м`;
  }

  function handleLikeClick() {
    handleSaveMovie(card);
  }

  //const isLiked = savedCards.some((i) => i.id === card.id);
  const isLiked = savedMovies
    ? savedMovies.some((i) => i.movieId === card.id)
    : false;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  return (
    <div className="card">
      <div className="card__info">
        <div className="card__info-text">
          <h2 className="card__title">{card.nameRU}</h2>
          <h2 className="card__subtitle">{toHoursAndMinutes(card.duration)}</h2>
        </div>
        {isSavedPage ? (
          <button
            type="button"
            className="card__delete-button"
            /* onClick={handleDeleteMovie}*/
          />
        ) : (
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
        )}
      </div>
      <a
        href={card.trailerLink}
        target="_blank"
        className="card__trailer-link"
        rel="noreferrer"
      >
        <img
          className="card__photo"
          alt={`Постер фильма ${card.nameRU}`}
          src={`https://api.nomoreparties.co/${card.image.url}`}
        />
      </a>
    </div>
  );
}
export default MoviesCard;
