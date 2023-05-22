import React, { useMemo, useState, useCallback } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import Layout from "../Layout/Layout";
import SearchForm from "../SearchForm/SearchForm";
import PageContainer from "../PageContainer/PageContainer";
import "./SavedMovies.css";
import mainApi from "../../utils/MainApi";

function SavedMovies({
  loggedIn,
  isMenuOpen,
  toggleMenu,
  // handleCheckbox,
  isShortFilm,
}) {
  const [movies, setMovies] = useState([]);
  const [inputString, setInputString] = useState("");
  const [filterString, setFilterString] = useState("");
  const [isShort, setIsShort] = useState(true);
  const [serverError, setServerError] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);

  function handleCheckbox() {
    setIsShort(!isShort);
  }
  React.useEffect(() => {
    //запрашиваем с сервера свежие сохраненные фильмы
    mainApi
      .getSavedMovies()
      .then((movies) => {
        //localStorage.setItem("movies", JSON.stringify(movies));
        setSavedMovies(movies);
        console.log(savedMovies);
        //throw new Error("");
      })
      .catch((err) => {
        setServerError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {});
  }, []);

  React.useEffect(() => {
    const savedsSearch = localStorage.getItem("searchSaved");
    const savedIsShort =
      JSON.parse(localStorage.getItem("isShortSaved")) === true;

    if (savedsSearch) {
      setInputString(savedsSearch);
      setFilterString(savedsSearch);
    }

    if (savedIsShort) {
      setIsShort(savedIsShort);
    }
  }, []);

  const filteredFilms = useMemo(() => {
    if (!filterString) {
      return [];
    }
    const filtered = savedMovies.filter((movie) => {
      const nameRU = savedMovies.nameRU.toUpperCase();
      if (isShort && savedMovies.duration > 40) {
        return false;
      }
      return nameRU.includes(filterString.toUpperCase());
    });

    localStorage.setItem("searchSaved", filterString);
    localStorage.setItem("isShortSaved", String(isShort));
    //localStorage.setItem("movies", JSON.stringify(filtered));

    return filtered;
  }, [filterString, savedMovies, isShort]);

  const filmsToRender = useMemo(() => {
    return filteredFilms;
  }, [filteredFilms]);

  const handleSubmit = (inputString) => {
    setFilterString(inputString);
  };

  return (
    <Layout loggedIn={loggedIn} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}>
      <section className="movies">
        <PageContainer>
          <SearchForm
            handleCheckbox={handleCheckbox}
            isShort={isShort}
            setIsShort={setIsShort}
            onSubmit={handleSubmit}
            inputString={inputString}
            setInputString={setInputString}
          />
          {serverError !== "" ? (
            <p className="movies__server-error">{serverError}</p>
          ) : filmsToRender.length === 0 ? (
            <p class="movies__not-found">Ничего не найдено</p>
          ) : (
            <>
              <MoviesCardList
                isSavedPage={false}
                isShort={isShort}
                filmsToRender={filmsToRender}
              />
            </>
          )}
        </PageContainer>
      </section>
    </Layout>
  );
  /*return (
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
  );*/
}

export default SavedMovies;
