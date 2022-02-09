import React from "react";

const CategoryDropDown = ({brand, options}) => {

  return(
    <div className="">
      <h4>{brand}</h4>
      <div>
        {options.map(option => <span>{option}</span>)}
      </div>
    </div>
  )
}

export default CategoryDropDown