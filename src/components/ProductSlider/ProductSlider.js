import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="product__slider__arrow"
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="product__slider__arrow product__slider__arrow_left"
      onClick={onClick}
    />
  );
}


const ProductSlider = ({productImgs}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: dots => (
      <div>
        <ul id='product__slider-dots-list' className="product__slider__dots-list">{dots}</ul>
      </div>
    ),
    customPaging: index => (
      <div className="product__slider__dot">
        <img className="product__slider__dot__img" src={productImgs[index].url} alt="" />
      </div>
    )
  };

  return (
    <div className="product__slider">
      <Slider {...settings}>
        {productImgs.map(img => 
          <div key={img.id}>
            <div className="product__slider__slide">
              <img src={img.url} alt="img" className="product__slider__slide__img"/>
            </div>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default ProductSlider