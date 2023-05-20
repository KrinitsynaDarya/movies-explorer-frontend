import React, { useMemo, useState, useCallback } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Layout from "../Layout/Layout";
import SearchForm from "../SearchForm/SearchForm";
import PageContainer from "../PageContainer/PageContainer";
import apiMovies from "../../utils/MoviesApi";

function Movies({
  loggedIn,
  isMenuOpen,
  toggleMenu,
  handleCheckbox,
  isShortFilm,
}) {
  const [movies, setMovies] = useState();
  const [search, setSearch] = useState();
  const [filterString, setFilterString] = useState();
  const [isShort, setIsShort] = useState();
  const [page, setPage] = useState();
  const [screenWidth, setScreenWidth] = useState();

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

  const fetchMovies = useCallback(() => {
    const savedMovies = localStorage.getItem("movies");

    if (!savedMovies) {
      apiMovies
        .getInitialCards()
        .then((initialMovies) => {
          localStorage.setItem("movies", JSON.stringify(initialMovies));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {});
    }
  }, []);

  React.useEffect(() => {
    fetchMovies();
    const savedsSearch = localStorage.getItem("search", filterString);
    const savedIsShort = localStorage.getItem("isShort", String(isShort));

    if (savedsSearch) {
      setSearch(savedsSearch);
      setFilterString(savedsSearch);
    }

    if (savedIsShort) {
      setIsShort(savedIsShort);
    }
  });

  React.useEffect(() => {
    const savedsSearch = localStorage.getItem("search", filterString);
    const savedIsShort = localStorage.getItem("isShort", String(isShort));

    if (savedsSearch) {
      setSearch(savedsSearch);
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
      const nameRu = movie.nameRu.toUpperCase();
      if (!isShort && movies.duration < 40) {
        return false;
      }
      return nameRu.includes(filterString.toUpperCase());
    });

    localStorage.setItem("search", filterString);
    localStorage.setItem("isShort", String(isShort));
    localStorage.setItem("movies", JSON.stringify(filtered));

    return filtered;
  }, [filterString, movies, isShort]);

  const filmsToRender = useMemo(() => {
    const filmsCount = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;
    return filteredFilms.slice(0, filmsCount * page);
  }, [filteredFilms, page, screenWidth]);

  return (
    <Layout loggedIn={loggedIn} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}>
      <section className="movies">
        <PageContainer>
          <SearchForm
            handleCheckbox={handleCheckbox}
            isShortFilm={isShortFilm}
          />
          <MoviesCardList
            isSavedPage={false}
            isShortFilm={isShortFilm}
            filmsToRender={filmsToRender}
          />
          <div className="movies__more-container">
            {filmsToRender < filteredFilms && (
              <button className="movies__more-button">Ещё</button>
            )}
          </div>
        </PageContainer>
      </section>
    </Layout>
  );
}

export default Movies;
