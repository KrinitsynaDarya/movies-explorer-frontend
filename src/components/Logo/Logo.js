import "./Logo.css";
import projectLogo from "../../images/project-logo.svg";

function Logo({ loggedIn, email, onLogout }) {
  return <img alt="Логотип проекта" src={projectLogo} className="logo" />;
}

export default Logo;
