import React from "react";
import "../index.css"; // Optional: for separate styling
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
