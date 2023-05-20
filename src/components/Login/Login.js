import React from "react";
import "./Login.css";
import { useFormWithValidation } from "../App/useForm";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import Logo from "../Logo/Logo";

const Login = ({ onLogin, errorMessage, setErrorMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    const { email, password } = values;
    onLogin(email, password);
  };

  React.useEffect(() => {
    setErrorMessage(null);
  }, [setErrorMessage]);

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  return (
    <Layout hasHeader={false} hasFooter={false}>
      <div className="login">
        <div className="login__title-container">
          <Logo />
          <h2 className="login__title">Рады видеть!</h2>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <fieldset className="login__input-list">
            <div className="login__input-container">
              <label className="login__label">E-mail</label>
              <input
                className={`login__input-value ${
                  errors.email && "login__input-value_type_error"
                }`}
                required
                id="email"
                name="email"
                type="email"
                value={values.email || ""}
                onChange={handleChange}
                placeholder=""
              />
              <span className="login__input-error">{errors.email}</span>
            </div>
            <div className="login__input-container">
              <label className="login__label">Пароль</label>
              <input
                className={`login__input-value ${
                  errors.password && "login__input-value_type_error"
                }`}
                required
                id="password"
                name="password"
                type="password"
                minLength={8}
                value={values.password || ""}
                onChange={handleChange}
                placeholder=""
              />
              <span className="login__input-error">{errors.password}</span>
            </div>
          </fieldset>
          <div className="login__button-container">
            {errorMessage && (
              <span className="login__submit-error">{errorMessage}</span>
            )}
            <button type="submit" className="login__button" disabled={!isValid}>
              Войти
            </button>
            <div className="login__register">
              <p className="login__register-text">
                Ещё не зарегистрированы?
                <Link to="/signup" className="login__register-link">
                  Регистрация
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
