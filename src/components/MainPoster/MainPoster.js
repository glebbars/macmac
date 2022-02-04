import React from "react";
import { Link } from "react-router-dom";

const MainPoster = ({header, text, btnText, modificator, link}) =>{

  return (
    <div className={`main__poster main__poster${modificator}`}>
        <div className={`main__poster__container main__poster__container${modificator}`}>
          <h3 className="main__poster__header">{header}</h3>
          <p className="main__poster__text">{text}</p>
          <Link className="main__poster__button" to={link}>{btnText}</Link>
        </div>
      </div>
  )
}

export default MainPoster