import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
const Header = ({children}) => {
  return (
    <header
      id="header-area"
    >
      <div className = "d-flex justify-content-end">
          {children}
      </div>
    </header>
  );
};

export default Header;
