import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const HeaderCatalogColumn = ({ category }) => {
  const [activeOptionsWrapper, setActiveOptionsWrapper] = useState(false);

  const closeWrapper = () => {
    setActiveOptionsWrapper(false);
  };

  return (
    <div className="header__catalog__column">
      <div
        style={{ background: `${category.bg.color}` }}
        className="header__catalog__options__img-wrapper"
      >
        <img
          className="header__catalog__options__img"
          src={category.bg.img}
          alt=""
        />
      </div>
      <NavLink
        to={`/category/${category.header.toLowerCase()}`}
        className="header__catalog__options__header"
        activeClassName="header__catalog__options__text_active"
      >
        {category.header}
      </NavLink>
      <div
        className={`header__catalog__options__wrapper ${
          activeOptionsWrapper ? "header__catalog__options__wrapper_active" : ""
        }`}
      >
        {category.options.map((option, index) => (
          <NavLink
            key={index}
            className="header__catalog__options__text"
            activeClassName="header__catalog__options__text_active"
            to={option.link}
          >
            {option.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default HeaderCatalogColumn;
