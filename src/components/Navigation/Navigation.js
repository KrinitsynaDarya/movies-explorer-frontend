import { NavLink } from "react-router-dom";
import profileLogo from "../../images/profile-logo.svg";
import "./Navigation.css";

function Navigation({ isBurger, onClose }) {
  const linkClassList = `navigation__link ${
    isBurger && "navigation__link_type_burger"
  }`;

  const linkClassListActive = `navigation__link_type_active${
    isBurger ? "-burger" : ""
  }`;
  const linkClassListFull = `${linkClassList} ${linkClassListActive}`;

  return (
    <div className={`navigation ${isBurger ? "navigation_type_burger" : ""}`}>
      <ul
        className={`navigation__links ${
          isBurger ? "navigation__links_type_burger" : ""
        }`}
      >
        {isBurger && (
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? linkClassListFull : linkClassList
              }
              onClick={onClose}
            >
              Главная
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? linkClassListFull : linkClassList
            }
            onClick={onClose}
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={onClose}
            to="/saved-movies"
            className={({ isActive }) =>
              isActive ? linkClassListFull : linkClassList
            }
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <div className="navigation__profile">
        <NavLink to="/profile" className="navigation__profile-link">
          Аккаунт
        </NavLink>
        <img
          alt="Аккаунт"
          src={profileLogo}
          className="navigation__profile-logo"
        />
      </div>
    </div>
  );
}

export default Navigation;
