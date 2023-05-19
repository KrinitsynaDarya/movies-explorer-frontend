import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import Layout from "../Layout/Layout";
import SearchForm from "../SearchForm/SearchForm";
import PageContainer from "../PageContainer/PageContainer";

function SavedMovies({
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
          <MoviesCardList isSavedPage={true} isShortFilm={isShortFilm} />
          <div className="movies__more-container"></div>
        </PageContainer>
      </section>
    </Layout>
  );
}

export default SavedMovies;
