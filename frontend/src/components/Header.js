import React from "react";

import logo from "../images/logo.svg";

function Header(props) {
  let { email } = props.userData || {};

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav className="header__login-container">
        <div style={{ color: "#FFFFFF" }} className="header__login-mail">
          {email}
        </div>
        <button
          type="button"
          className="header__login-registration"
          onClick={props.click}
        >
          {props.text}
        </button>
      </nav>
    </header>
  );
}

export default Header;
