import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Promo.css";
import PageContainer from "../PageContainer/PageContainer";

function Promo({ loggedIn, email, onLogout }) {
  const location = useLocation();
  return (
    <section className="promo">
      <PageContainer>
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </PageContainer>
    </section>
  );
}

export default Promo;
