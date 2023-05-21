import "./App.css";
import React, { useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Movies from "../../components/Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Main from "../../components/Main/Main";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import Profile from "../../components/Profile/Profile";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

import * as auth from "../../utils/Auth";
import mainApi from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  //const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isShortFilm, setIsShortFilm] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn === false) return;
    mainApi
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [loggedIn]);

  const handleResize = useCallback(
    debounce(() => {
      if (window.innerWidth > 1279) setIsMenuOpen(false);
    }, 100),
    []
  );

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function tokenCheck() {
    auth
      .getContent()
      .then((res) => {
        if (res.authorized === false) {
          setLoggedIn(false);
        } else if (res.authorized === true) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err.message);
      });
  }

  function handleUpdateUser(userData) {
    mainApi
      .editUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {});
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setErrorMessage(null);
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(() => {
        setErrorMessage(null);
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  function handleLogout() {
    auth
      .logout()
      .then(() => {
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  loggedIn={loggedIn}
                  isMenuOpen={isMenuOpen}
                  toggleMenu={toggleMenu}
                />
              </>
            } /* главная страница */
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                // isShortFilm={isShortFilm}
              />
            } /* страница «Фильмы» */
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={SavedMovies}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                //  isShortFilm={isShortFilm}
              />
            } /* страница «Сохранённые фильмы» */
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Profile}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            } /* страница с профилем пользователя */
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            } /* страница регистрации */
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            } /* страница авторизации */
          />
          <Route
            path="*"
            element={<NotFoundPage />} /* страница не найдена */
          />
        </Routes>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
