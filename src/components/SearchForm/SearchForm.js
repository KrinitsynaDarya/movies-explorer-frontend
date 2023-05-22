import searchLogo from "../../images/search-logo.svg";
import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../UserHooks/useForm";

function SearchForm({
  handleCheckbox,
  isShort,
  setIsShort,
  onSubmit,
  inputString,
  setInputString,
}) {
  const [error, setError] = React.useState(null);
  const [isValid, setIsValid] = React.useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputString);
  };

  function handleSearchChange(e) {
    setError(e.target.validationMessage);
    setInputString(e.target.value);
    setIsValid(e.target.closest("form").checkValidity());
  }

  return (
    <section className="search-form">
      <form className="search-form__panel" onSubmit={handleSubmit}>
        <div className="search-form__search-container">
          <div className="search-form__input-container">
            <img
              alt="Поиск фильма"
              src={searchLogo}
              className="search-form__logo"
            />
            <input
              name="search"
              type="text"
              className="search-form__input"
              placeholder="Фильм"
              required
              onChange={handleSearchChange}
              value={inputString || ""}
            ></input>
            {error && (
              <p className="search-form__input-error">
                Нужно ввести ключевое слово
              </p>
            )}
          </div>
          <button
            type="submit"
            className="search-form__button"
            disabled={!isValid}
          >
            Найти
          </button>
        </div>

        <FilterCheckbox handleCheckbox={handleCheckbox} isShort={isShort} />
      </form>
    </section>
  );
}

export default SearchForm;
