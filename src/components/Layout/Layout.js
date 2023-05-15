import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
const Layout = (props) => {
  const {
    loggedIn,
    hasHeader = true,
    hasFooter = true,
    children,
    isMenuOpen,
    toggleMenu,
  } = props;

  return (
    <div className="layout">
      <div className="content">
        {hasHeader && (
          <Header
            loggedIn={loggedIn}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
          />
        )}
        {children}
      </div>
      {hasFooter && <Footer />}
    </div>
  );
};

export default Layout;
/*
 */
