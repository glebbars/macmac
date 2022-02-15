import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import purpleLine from '../../img/purple-line.svg'
import appleLogo from '../../img/apple-icon.png'
import purplePhone from '../../img/purple-iphone.svg';

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
      <ul id='slider-dots-list' className="slider__dots-list"> {dots} </ul>
    </div>
  ),
  customPaging: index => (
    <div className="slider__dot"></div>
  )

};

const sliderData = [
  {
    title: "iPhone 12",
    text: ["Теперь", "в фиолетовом"],
    price: "от 23 897",
    btnText: "Узнать больше",
    productImg: purplePhone,
    lineImg: purpleLine,
  },
  {
    title: "iPhone 12",
    text: ["Теперь", "в фиолетовом"],
    price: "от 23 897",
    btnText: "Узнать больше",
    productImg: purplePhone,
    lineImg: purpleLine,
  },
  {
    title: "iPhone 12",
    text: ["Теперь", "в фиолетовом"],
    price: "от 23 897",
    btnText: "Узнать больше",
    productImg: purplePhone,
    lineImg: purpleLine,
  },
  {
    title: "iPhone 12",
    text: ["Теперь", "в фиолетовом"],
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
                  <div className="slider__slide__title-icon-container">
                    <img className="slider__slide__icon" src={appleLogo} alt="" />
                    <span className="slider__slide__title">{slide.title}</span>
                  </div>
                  <span className="slider__slide__text">
                    {slide.text[0]}
                    <br/>
                    {slide.text[1]}
                  </span>
                  <span className="slider__slide__price">{slide.price}&#x20b4;</span>
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