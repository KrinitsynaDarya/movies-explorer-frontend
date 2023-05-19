import "./App.css";
import React, { useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Movies from "../../components/Movies/Movies";
import Main from "../../components/Main/Main";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import Profile from "../../components/Profile/Profile";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  //const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const [isShortFilm, setIsShortFilm] = React.useState(true);
  function handleCheckbox() {
    setIsShortFilm(!isShortFilm);
  }

  React.useEffect(() => {
    setCurrentUser({
      name: "Виталий",
      email: "pochta@yandex.ru",
      password: "12345678",
    });
  }, []);

  function handleRegister(email, password) {
    navigate("/signin", { replace: true });
  }

  function handleLogin(email, password) {
    setLoggedIn(true);
    navigate("/movies", { replace: true });
  }

  function handleLogout() {
    setLoggedIn(false);
    navigate("/", { replace: true });
  }

  function handleUpdateUser(userData) {
    setCurrentUser(userData);
  }

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
      if (window.innerWidth > 1279) setIsMenuOpen(false);
    }, 100),
    []
  );

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
            } /* страница с профилем пользователя */
          />
          <Route
            path="/movies"
            element={
              <Movies
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                handleCheckbox={handleCheckbox}
                isShortFilm={isShortFilm}
              />
            } /* страница «Фильмы» */
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                handleCheckbox={handleCheckbox}
                isShortFilm={isShortFilm}
              />
            } /* страница «Сохранённые фильмы» */
          />
          <Route
            path="/profile"
            element={
              <Profile
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                onLogout={handleLogout}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
              />
            } /* страница с профилем пользователя */
          />
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} />
            } /* страница регистрации */
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} />} /* страница авторизации */
          />
          <Route
            path="*"
            element={<NotFoundPage />} /* страница авторизации */
          />
        </Routes>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
