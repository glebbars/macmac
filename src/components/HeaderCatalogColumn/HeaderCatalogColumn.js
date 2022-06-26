import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      <Link
        to={`/category/${category.header.toLowerCase()}`}
        className="header__catalog__options__header"
      >
        {category.header}
      </Link>
      <div
        className={`header__catalog__options__wrapper ${
          activeOptionsWrapper ? "header__catalog__options__wrapper_active" : ""
        }`}
      >
        {category.options.map((option, index) => (
          <Link
            key={index}
            className="header__catalog__options__text"
            to={option.link}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeaderCatalogColumn;
