import React, { useMemo, useState, useCallback } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import Layout from "../Layout/Layout";
import SearchForm from "../SearchForm/SearchForm";
import PageContainer from "../PageContainer/PageContainer";
import "./SavedMovies.css";
import mainApi from "../../utils/MainApi";

function SavedMovies({ loggedIn, isMenuOpen, toggleMenu }) {
  const [inputString, setInputString] = useState("");
  const [filterString, setFilterString] = useState(null);
  const [isShort, setIsShort] = useState(true);
  const [serverError, setServerError] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);

  function handleCheckbox() {
    setIsShort(!isShort);
  }

  const fetchSavedMovies = useCallback(() => {
    mainApi
      .getSavedMovies()
      .then((movies) => {
        localStorage.setItem("moviesSaved", JSON.stringify(movies));
        setSavedMovies(JSON.parse(localStorage.getItem("moviesSaved")));
      })
      .catch((err) => {
        setServerError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {});
  }, []);

  React.useEffect(() => {
    fetchSavedMovies();
    const savedsSearch = localStorage.getItem("searchSaved");
    const savedIsShort = localStorage.getItem("isShortSaved");

    if (savedsSearch) {
      setInputString(savedsSearch);
      setFilterString(savedsSearch);
    }

    if (savedIsShort) {
      setIsShort(savedIsShort === "true");
    }
  }, []);

  const filteredFilms = useMemo(() => {
    if (!filterString) {
      return savedMovies;
    }
    const filtered = savedMovies.filter((movie) => {
      const nameRU = movie.nameRU.toUpperCase();
      if (isShort && movie.duration > 40) {
        return false;
      }
      return nameRU.includes(filterString.toUpperCase());
    });

    localStorage.setItem("searchSaved", filterString);
    localStorage.setItem("isShortSaved", String(isShort));

    return filtered;
  }, [filterString, savedMovies, isShort]);

  const filmsToRender = useMemo(() => {
    return filteredFilms;
  }, [filteredFilms]);

  const handleSubmit = (inputString) => {
    setFilterString(inputString);
  };

  function handleDeleteMovie(movie) {
    mainApi
      .removeMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((i) => i._id !== movie._id));
        //throw new Error("");
      })
      .catch((err) => {
        setServerError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {});
  }

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
          {serverError ? (
            <p className="movies__server-error">{serverError}</p>
          ) : filmsToRender.length === 0 ? (
            <p class="movies__not-found">Ничего не найдено</p>
          ) : (
            <>
              <MoviesCardList
                handleDeleteMovie={handleDeleteMovie}
                isSavedPage={true}
                isShort={isShort}
                filmsToRender={filmsToRender}
              />
            </>
          )}
        </PageContainer>
      </section>
    </Layout>
  );
}

export default SavedMovies;
