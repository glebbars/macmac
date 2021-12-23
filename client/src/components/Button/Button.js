import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, modalHandler, bg, clothId }) => {
  return (
    <button
      onClick={() => {
        modalHandler(clothId);
      }}
      className="btn"
      style={{ backgroundColor: bg }}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  modalHandler: PropTypes.func.isRequired,
  bg: PropTypes.string,
  clothId: PropTypes.string.isRequired
};

Button.defaultProps = {
  bg: "gray",
};

export default Button;
