import "./Main.css";
import Promo from "../../components/Promo/Promo";
import NavTab from "../../components/NavTab/NavTab";
import AboutProject from "../../components/AboutProject/AboutProject";
import Techs from "../../components/Techs/Techs";
import AboutMe from "../../components/AboutMe/AboutMe";
import Layout from "../Layout/Layout";
import PageContainer from "../PageContainer/PageContainer";

function Main({ loggedIn, isMenuOpen, toggleMenu }) {
  return (
    <Layout loggedIn={false} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}>
      <main className="main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
    </Layout>
  );
}

export default Main; /*  */
