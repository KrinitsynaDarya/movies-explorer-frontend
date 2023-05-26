import { Link } from "react-router-dom";
import "./Logo.css";
import projectLogo from "../../images/project-logo.svg";

function Logo() {
  return (
    <Link to="/">
      <img alt="Логотип проекта" src={projectLogo} className="logo" />
    </Link>
  );
}

export default Logo;
