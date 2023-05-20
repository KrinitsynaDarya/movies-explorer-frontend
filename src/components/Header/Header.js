import burgerMenu from "../../images/burger-menu.svg";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import PageContainer from "../PageContainer/PageContainer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import React from "react";

function Header({ loggedIn, isMenuOpen, toggleMenu }) {
  const headerLogged = (
    <>
      <div className="header__navigation">
        <Navigation isBurger={false} />
      </div>
      <img
        alt="Открыть меню"
        src={burgerMenu}
        className="header__burger-menu-icon"
        onClick={toggleMenu}
      />
      <BurgerMenu isMenuOpen={isMenuOpen} onClose={toggleMenu}></BurgerMenu>
    </>
  );
  const headerNotLogged = (
    <div className="header__menu">
      <NavLink to="/signup" className="header__link header__link_type_signup">
        Регистрация
      </NavLink>
      <NavLink to="/signin" className="header__link header__link_type_signin">
        Войти
      </NavLink>
    </div>
  );

  return (
    <header className={`header ${!loggedIn ? "header_unlogged" : ""}`}>
      <PageContainer>
        <div className="header__container">
          <Logo></Logo>
          {loggedIn ? headerLogged : headerNotLogged}
        </div>
      </PageContainer>
    </header>
  );
}

export default Header;
