import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import purplePhone from '../../img/purple-iphone.png';
import purpleLine from '../../img/purple-line.svg'
import appleLogo from '../../img/apple-icon.png'
import appleLogoo from '../../img/apple-icon24.png'

function SampleNextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="slider__arrow"
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="slider__arrow slider__arrow_left"
      onClick={onClick}
    />
  );
}


const settings = {
  dots: true,
  infinite: true,
  speed: 750,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  appendDots: dots => (
    <div style={{bottom: 0}} >
      <ul className="slider__dots-list"> {dots} </ul>
    </div>
  ),
  customPaging: index => (
    <div className="slider__dot"></div>
  )

};

const sliderData = [
  {
    title: "iPhone 12",
    text: "Теперь в фиолетовом",
    price: "от 23 897",
    btnText: "Узнать больше",
    productImg: purplePhone,
    lineImg: purpleLine,
  },
  {
    title: "iPhone 12",
    text: "Теперь в фиолетовом",
    price: "от 23 897",
    btnText: "Узнать больше",
    productImg: purplePhone,
    lineImg: purpleLine,
  },
  {
    title: "iPhone 12",
    text: "Теперь в фиолетовом",
    price: "от 23 897",
    btnText: "Узнать больше",
    productImg: purplePhone,
    lineImg: purpleLine,
  },
  {
    title: "iPhone 12",
    text: "Теперь в фиолетовом",
    price: "от 23 897",
    btnText: "Узнать больше",
    productImg: purplePhone,
    lineImg: purpleLine,
  }
]

const CustomSlider = () => {
    return (
      <div className="slider">
        <Slider {...settings}>
          {sliderData.map(slide => 
            <div key={slide.title}>
              <div style={{backgroundImage: `url(${slide.lineImg})`}} className="slider__slide">
                <div className="slider__slide__text-container">
                  <img src={appleLogo} alt="" />
                  <img src={appleLogoo} alt="" />
                  <h4 className="slider__slide__title">{slide.title}</h4>
                  <h4 className="slider__slide__text">{slide.text}</h4>
                  <h5 className="slider__slide__price">{slide.price}</h5>
                  <button className="slider__slide__button">{slide.btnText}</button>
                </div>
                <img src={slide.productImg} alt="img" className="slider__slide__img"/>
              </div>
            </div>
          )}
        </Slider>
      </div>
    );
}

export default CustomSlider