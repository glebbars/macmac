import React from "react";
import { NavLink } from "react-router-dom";

const HeaderMenu = () => {
  return (
    <div className="header-menu">
      <NavLink
        exact
        data-item="Home"
        className="header-menu__link"
        to="/"
        activeClassName="header-menu__link_selected"
      >
        Home
      </NavLink>
      <NavLink
        exact
        data-item="Favourites"
        className="header-menu__link"
        to="/favourites"
        activeClassName="header-menu__link_selected"
      >
        Favourites
      </NavLink>
      <NavLink
        exact
        data-item="Bag"
        className="header-menu__link"
        to="/bag"
        activeClassName="header-menu__link_selected"
      >
        Bag
      </NavLink>
      <NavLink
        exact
        data-item="Admin"
        className="header-menu__link"
        to="/admin"
        activeClassName="header-menu__link_selected"
      >
        Admin
      </NavLink>
    </div>
  );
};

export default HeaderMenu;
