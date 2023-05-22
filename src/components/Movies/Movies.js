import React, { useMemo, useState, useCallback } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Layout from "../Layout/Layout";
import SearchForm from "../SearchForm/SearchForm";
import PageContainer from "../PageContainer/PageContainer";
import apiMovies from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

function Movies({ loggedIn, isMenuOpen, toggleMenu }) {
  const [movies, setMovies] = useState([]);
  const [inputString, setInputString] = useState("");
  const [filterString, setFilterString] = useState("");
  const [isShort, setIsShort] = useState(true);
  const [page, setPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const [savedMovies, setSavedMovies] = useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    //запрашиваем с сервера свежие сохраненные фильмы
    mainApi
      .getSavedMovies()
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
        setSavedMovies(JSON.parse(localStorage.getItem("movies")));
        //throw new Error("");
      })
      .catch((err) => {
        setServerError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {});
  }, []);

  function handleSaveMovie(movie) {
    console.log("simple check");
    console.log(`https://api.nomoreparties.co${movie.image.url}`);
    const isLiked = savedMovies.some((i) => i.movieId === movie.id);
    /* if (!isLiked) {
      mainApi
        .saveMovie({
          country: movie.country, // страна создания фильма. Обязательное поле-строка.
          director: movie.director, // режиссёр фильма. Обязательное поле-строка.
          duration: movie.duration, // длительность фильма. Обязательное поле-число.
          year: movie.year, // год выпуска фильма. Обязательное поле-строка.
          description: movie.description, // описание фильма. Обязательное поле-строка.
          image: `https://api.nomoreparties.co${movie.image.url}`, // ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
          trailerLink: movie.trailerLink, // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
          thumbnail: `https://api.nomoreparties.co${movie.thumbnail.url}`, // миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
          owner: movie.owner, // _id пользователя, который сохранил фильм. Обязательное поле.
          movieId: movie.id, // id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
          nameRU: movie.nameRU, // название фильма на русском языке. Обязательное поле-строка.
          nameEN: movie.nameEN, // название фильма на английском языке. Обязательное поле-строка.
        })
        .then((savedMovie) => {
          setSavedMovies([savedMovie, ...savedMovies]);
          //throw new Error("");
        })
        .catch((err) => {
           setServerError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => {});
    } else {
      //
    }*/
  }
  function handleDeleteMovie() {}

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const handleResize = useCallback(
    debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 100),
    []
  );

  function handleCheckbox() {
    setIsShort(!isShort);
  }

  const fetchMovies = useCallback(() => {
    // const savedMovies = localStorage.getItem("movies");
    setIsLoading(true);
    apiMovies
      .getInitialCards()
      .then((initialMovies) => {
        localStorage.setItem("movies", JSON.stringify(initialMovies));
        setMovies(JSON.parse(localStorage.getItem("movies")));
        //throw new Error("");
      })
      .catch((err) => {
        setServerError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    fetchMovies();
    const savedsSearch = localStorage.getItem("search");
    const savedIsShort = JSON.parse(localStorage.getItem("isShort")) === true;

    if (savedsSearch) {
      setInputString(savedsSearch);
      setFilterString(savedsSearch);
    }

    if (savedIsShort) {
      setIsShort(savedIsShort);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const filteredFilms = useMemo(() => {
    if (!filterString) {
      return [];
    }
    const filtered = movies.filter((movie) => {
      const nameRU = movie.nameRU.toUpperCase();
      if (isShort && movie.duration > 40) {
        return false;
      }
      return nameRU.includes(filterString.toUpperCase());
    });

    localStorage.setItem("search", filterString);
    localStorage.setItem("isShort", String(isShort));
    //localStorage.setItem("movies", JSON.stringify(filtered));

    return filtered;
  }, [filterString, movies, isShort]);

  const filmsToRender = useMemo(() => {
    const filmsCount = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;
    return filteredFilms.slice(0, filmsCount * page);
  }, [filteredFilms, page, screenWidth]);

  const handleSubmit = (inputString) => {
    setServerError("");
    setFilterString(inputString);
  };

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

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
          {isLoading ? (
            <Preloader />
          ) : serverError !== "" ? (
            <p className="movies__server-error">{serverError}</p>
          ) : filmsToRender.length === 0 ? (
            <p class="movies__not-found">Ничего не найдено</p>
          ) : (
            <>
              <MoviesCardList
                handleSaveMovie={handleSaveMovie}
                isSavedPage={false}
                isShort={isShort}
                filmsToRender={filmsToRender}
                savedMovies={savedMovies}
              />
              <div className="movies__more-container">
                {filmsToRender < filteredFilms && (
                  <button
                    className="movies__more-button"
                    onClick={handleLoadMore}
                  >
                    Ещё
                  </button>
                )}
              </div>
            </>
          )}
        </PageContainer>
      </section>
    </Layout>
  );
}

export default Movies;
