import searchLogo from "../../images/search-logo.svg";
import profileLogo from "../../images/profile-logo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./FilterCheckbox.css";
import { useNavigate } from "react-router-dom";

function FilterCheckbox({ handleCheckbox, isShortFilm }) {
  const location = useLocation();
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/sign-in", { replace: true });
  };
  const onLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="filter">
      <label className="filter__tumbler">
        <input
          type="checkbox"
          className="filter__checkbox"
          checked={isShortFilm}
          onChange={handleCheckbox}
        ></input>
        <span className="filter__slider"></span>
      </label>
      <span className="filter__label-text">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
