import React from "react";
import "./MoviesCard.css";
//import CurrentUserContext from "../contexts/CurrentUserContext";

function MoviesCard({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  isSavedPage,
  savedCards,
}) {
  // const currentUser = React.useContext(CurrentUserContext);
  //const isOwn = card.owner._id === currentUser._id;

  const isLiked = savedCards.some((i) => i.id === card.id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  return (
    <div className="card">
      <div className="card__info">
        <div className="card__info-text">
          <h2 className="card__title">{card.name}</h2>
          <h2 className="card__subtitle">{card.duration}</h2>
        </div>
        {isSavedPage ? (
          <button type="button" className="card__delete-button" />
        ) : (
          <button type="button" className={cardLikeButtonClassName} />
        )}
      </div>
      <img
        className="card__photo"
        alt={`Постер фильма ${card.name}`}
        src={card.link}
      />
    </div>
  );
}
export default MoviesCard;
