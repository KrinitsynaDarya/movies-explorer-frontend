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
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import * as auth from "../../utils/Auth";
import mainApi from "../../utils/MainApi";
import { DESKTOP, SERVER_ERROR_MESSAGE } from "../../utils/ProjectConstants";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const { width: desktopWidth } = DESKTOP;
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  const [infoToolTipMessage, setInfoToolTipMessage] = React.useState("");

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn === false) return;
    mainApi
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        setIsInitialized(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [loggedIn]);

  const handleResize = useCallback(
    debounce(() => {
      if (window.innerWidth >= desktopWidth) setIsMenuOpen(false);
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
          setIsInitialized(true);
        } else if (res.authorized === true) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err.message || SERVER_ERROR_MESSAGE);
      })
      .finally(() => {});
  }

  function handleUpdateUser(userData) {
    mainApi
      .editUserInfo(userData)
      .then((userData) => {
        setErrorMessage("");
        setInfoMessage("Изменение данных профиля прошло успешно!");
        setCurrentUser(userData);
      })
      .catch((err) => {
        setErrorMessage(err.message || SERVER_ERROR_MESSAGE);
      })
      .finally(() => {});
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setErrorMessage("");
          handleLogin(email, password);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setErrorMessage(err.message || SERVER_ERROR_MESSAGE);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(() => {
        setErrorMessage("");
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setErrorMessage(err.message || SERVER_ERROR_MESSAGE);
      });
  }

  function handleLogout() {
    auth
      .logout()
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem("searchSaved");
        localStorage.removeItem("isShortSaved");
        localStorage.removeItem("search");
        localStorage.removeItem("isShort");
        localStorage.removeItem("movies");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  function closeInfoPopup() {
    setIsInfoToolTipOpen(false);
  }

  return !isInitialized ? null : (
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
                setIsInfoToolTipOpen={setIsInfoToolTipOpen}
                infoToolTipMessage={infoToolTipMessage}
                setInfoToolTipMessage={setInfoToolTipMessage}
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
                setIsInfoToolTipOpen={setIsInfoToolTipOpen}
                infoToolTipMessage={infoToolTipMessage}
                setInfoToolTipMessage={setInfoToolTipMessage}
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
                infoMessage={infoMessage}
                setInfoMessage={setInfoMessage}
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
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeInfoPopup}
          infoToolTipMessage={infoToolTipMessage}
          setInfoToolTipMessage={setInfoToolTipMessage}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
