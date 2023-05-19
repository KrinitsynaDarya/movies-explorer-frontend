import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Layout from "../Layout/Layout";
import SearchForm from "../SearchForm/SearchForm";
import PageContainer from "../PageContainer/PageContainer";

function Movies({
  loggedIn,
  isMenuOpen,
  toggleMenu,
  handleCheckbox,
  isShortFilm,
}) {
  return (
    <Layout loggedIn={loggedIn} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}>
      <section className="movies">
        <PageContainer>
          <SearchForm
            handleCheckbox={handleCheckbox}
            isShortFilm={isShortFilm}
          />
          <MoviesCardList isSavedPage={false} isShortFilm={isShortFilm} />
          <div className="movies__more-container">
            <button className="movies__more-button">Ещё</button>
          </div>
        </PageContainer>
      </section>
    </Layout>
  );
}

export default Movies;
/*         
             <SearchForm
            handleCheckbox={handleCheckbox}
            isShortFilm={isShortFilm}
          />
*/
