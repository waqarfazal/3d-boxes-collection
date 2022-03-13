import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
const Header = ({children}) => {
  return (
    <header
      id="header-area"
    >
      {children}
    </header>
  );
};

export default Header;
