import React from "react";

const Button = ({ text, addToTheBag }) => {
  return (
    <button
      onClick={addToTheBag}
      className="btn"
    >
      {text}
    </button>
  );
};

export default Button;
