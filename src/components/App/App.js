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

import * as auth from "../../utils/Auth";
import mainApi from "../../utils/MainApi";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

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

  /*19.05.2023 start*/
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  //const [isInfoToolTipOpen, //setIsInfoToolTipOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState();
  const [isSucces, setIsSucces] = React.useState(false);

  React.useEffect(() => {
    tokenCheck();
  }, []);

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
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        // popupEditProfile.renderLoading(false);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    //setIsInfoToolTipOpen(false);
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setIsSucces(true);
          setErrorMessage(null);
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        // setIsSucces(false);
        setErrorMessage(err.message);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(() => {
        setErrorMessage(null);
        setLoggedIn(true);
        //setCurrentUser(email);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        //setIsSucces(false);
        //setIsInfoToolTipOpen(true);
        setErrorMessage(err.message);
      });
  }

  function handleLogout() {
    auth
      .logout()
      .then(() => {
        setLoggedIn(false);
        setUserEmail();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  /*19.05.2023 end*/
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
                handleCheckbox={handleCheckbox}
                isShortFilm={isShortFilm}
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
                handleCheckbox={handleCheckbox}
                isShortFilm={isShortFilm}
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
