import searchLogo from "../../images/search-logo.svg";

import "./SearchForm.css";
import { useNavigate } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ handleCheckbox, isShortFilm }) {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className="search-form">
      <form className="search-form__panel" onSubmit={onSubmit}>
        <div className="search-form__search-container">
          <div className="search-form__input-container">
            <img
              alt="Поиск фильма"
              src={searchLogo}
              className="search-form__logo"
            />
            <input
              type="text"
              className="search-form__input"
              placeholder="Фильм"
              required
            ></input>
          </div>
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </div>
        <FilterCheckbox
          handleCheckbox={handleCheckbox}
          isShortFilm={isShortFilm}
        />
      </form>
    </section>
  );
}

export default SearchForm;
