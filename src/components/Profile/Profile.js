import React from "react";
import "./Profile.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Layout from "../Layout/Layout";
import { useFormWithValidation } from "../../UserHooks/useForm";

const Profile = ({
  loggedIn,
  onUpdateUser,
  onLogout,
  isMenuOpen,
  toggleMenu,
  errorMessage,
  setErrorMessage,
  infoMessage,
  setInfoMessage,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();
  React.useEffect(() => {
    setInfoMessage("");
  }, []);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser]);

  React.useEffect(() => {
    setErrorMessage(null);
  }, [setErrorMessage]);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = values;
    onUpdateUser({ name, email });
  }

  return (
    <Layout
      loggedIn={loggedIn}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      hasFooter={false}
    >
      <div className="profile">
        <p className="profile__title">Привет, {currentUser.name}!</p>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__input-list">
            <div className="profile__input-container">
              <label className="profile__input-name">Имя</label>
              <input
                name="name"
                type="text"
                className={`profile__input-value ${
                  errors.name && "profile__input-value_type_error"
                }`}
                value={values.name || ""}
                minLength={2}
                maxLength={10}
                required
                onChange={handleChange}
              ></input>
            </div>
            {errors.name && (
              <span className="profile__input-error">{errors.name}</span>
            )}
            <div className="profile__input-container">
              <label className="profile__input-name">E-mail</label>
              <input
                name="email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                className={`profile__input-value ${
                  errors.email && "profile__input-value_type_error"
                }`}
                value={values.email || ""}
                onChange={handleChange}
              ></input>
            </div>
            {errors.email && (
              <span className="profile__input-error">{errors.email}</span>
            )}
          </fieldset>
          <div className="profile__buttons">
            {(errorMessage || infoMessage) && (
              <span className="profile__submit-error">
                {errorMessage || infoMessage}
              </span>
            )}
            <button
              type="submit"
              className="profile__button"
              disabled={
                !(
                  isValid &&
                  (values.name !== currentUser.name ||
                    values.email !== currentUser.email)
                )
              }
            >
              Редактировать
            </button>
            <button
              onClick={onLogout}
              className="profile__button profile__button_color_red"
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
