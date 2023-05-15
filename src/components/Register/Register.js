import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Layout from "../Layout/Layout";
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../App/useForm";

const Register = ({ onRegister }) => {
  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = values;
    onRegister(name, email, password);
  }

  const { values, handleChange, resetFrom, errors, isValid, setValues } =
    useFormWithValidation();

  return (
    <Layout hasHeader={false} hasFooter={false}>
      <div className="register">
        <Logo />
        <p className="register__title">Добро пожаловать!</p>
        <form onSubmit={handleSubmit} className="register__form">
          <fieldset className="register__input-list">
            <div className="register__input-container">
              <label className="register__label">Имя</label>
              <input
                className={`register__input-value ${
                  errors.name && "register__input-value_type_error"
                }`}
                id="name"
                name="name"
                type="text"
                minLength={2}
                maxLength={10}
                required
                value={values.name || ""}
                onChange={handleChange}
                placeholder=""
              />
              <span className="register__input-error">{errors.name}</span>
            </div>
            <div className="register__input-container">
              <label className="register__label">E-mail</label>
              <input
                className={`register__input-value ${
                  errors.email && "register__input-value_type_error"
                }`}
                id="email"
                name="email"
                type="email"
                required
                value={values.email || ""}
                onChange={handleChange}
                placeholder=""
              />
              <span className="register__input-error">{errors.email}</span>
            </div>
            <div className="register__input-container">
              <label className="register__label">Пароль</label>
              <input
                className={`register__input-value ${
                  errors.password && "register__input-value_type_error"
                }`}
                id="password"
                name="password"
                type="password"
                minLength={8}
                required
                value={values.password}
                onChange={handleChange}
                placeholder=""
              />
              <span className="register__input-error">{errors.password}</span>
            </div>
          </fieldset>
          <div className="register__button-container">
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="register__button"
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
            <div className="register__signin">
              <p className="register__login-text">
                Уже зарегистрированы?
                <Link to="/signin" className="register__login-link">
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
