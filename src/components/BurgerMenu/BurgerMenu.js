import Navigation from "../Navigation/Navigation";
import "./BurgerMenu.css";

function BurgerMenu({ isMenuOpen, onClose }) {
  return (
    <div className={`burger-menu ${isMenuOpen && "burger-menu_opened"}`}>
      <div className="burger-menu__content">
        <button
          type="button"
          className="burger-menu__close-button"
          onClick={onClose}
        />
        <Navigation isBurger={true} isMenuOpen={isMenuOpen} onClose={onClose} />
      </div>
    </div>
  );
}

export default BurgerMenu;
