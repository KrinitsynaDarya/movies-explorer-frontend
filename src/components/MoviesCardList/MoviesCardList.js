import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  isSavedPage,
  filmsToRender,
  handleSaveMovie,
  savedMovies,
}) {
  console.log(`isSavedPage: ${isSavedPage}`);
  return (
    <section className="movies-card-list">
      {filmsToRender.map((card) => {
        return (
          <MoviesCard
            key={card.id}
            card={card}
            isSavedPage={isSavedPage}
            savedMovies={savedMovies}
            handleSaveMovie={handleSaveMovie}
          />
        );
      })}
    </section>
  );
}

export default MoviesCardList;
