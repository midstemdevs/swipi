import React from 'react';
import { useSlider } from './useSlider';
import { SliderProps } from './types';
import CarouselWrapper from '../UI/CarouselWrapper';
import SliderContainer from '../UI/SliderContainer';
import SliderButton from '../UI/SliderButton';
import SlidesWrapper from '../UI/SlidesWrapper';
import SlidesContainer from '../UI/SlidesContainer';
import { Slide } from '../UI/Slide';

import { isSlidesAnimation, returnSlidesAnimation } from './helpers';

const Slider = ({
  slidesNumber = 3,
  spaceBetweenSlides = 0,
  nextButton = 'ᐳ',
  prevButton = 'ᐸ',
  children = [],
  config = [],
  showDots,
  customDot,
  customActiveDot,
  dotColor,
  activeDotColor,
  sizeForDefaultDot,
  sizeForDefaultActiveDot = 13,
  autoplay = false,
  autoplaySpeed = 4000,
  dotsAnimation = 'default',
  animationSpeed = 300,
  slidesAnimation = 'default'
}: SliderProps) => {
  const {
    animation,
    transform,
    slideWidth,
    slidesWrapperRef,
    slides,
    isButton,
    spaceBetween,
    slideIndex,
    Dots,
    handleDotClick,
    nextImg,
    prevImg,
    endTouchScreen,
    returnDots,
    moveTouchScreen,
    startTouchByScreen,
    visibleCountSlides
  } = useSlider(
    children,
    config,
    customActiveDot,
    customDot,
    slidesNumber,
    spaceBetweenSlides,
    autoplay,
    autoplaySpeed,
    dotsAnimation,
    dotColor,
    activeDotColor
  );

  return (
    <CarouselWrapper>
      <SliderContainer>
        <SliderButton onClick={prevImg} className="right-button">
          {isButton && prevButton}
        </SliderButton>
        <SlidesWrapper
          slidesWrapperRef={slidesWrapperRef}
          startTouchByScreen={startTouchByScreen}
          moveTouchScreen={moveTouchScreen}
          endTouchScreen={endTouchScreen}
        >
          <SlidesContainer
            animation={animation}
            transform={transform}
            animationSpeed={animationSpeed}
          >
            {slides?.map(({ id, key }, index) => (
              <Slide
                key={id}
                isAnimation={isSlidesAnimation(visibleCountSlides)}
                slideWidth={slideWidth}
                spaceBetween={spaceBetween}
                animation={returnSlidesAnimation(
                  slidesAnimation,
                  key === slideIndex
                )}
              >
                {slides[index]}
              </Slide>
            ))}
          </SlidesContainer>
        </SlidesWrapper>
        <SliderButton onClick={nextImg} className="left-button">
          {isButton && nextButton}
        </SliderButton>
      </SliderContainer>
      {showDots && (
        <Dots
          children={children}
          customDot={customDot}
          customActiveDot={customActiveDot}
          slideIndex={slideIndex}
          sizeForDefaultDot={sizeForDefaultDot}
          sizeForDefaultActiveDot={sizeForDefaultActiveDot}
          activeDotColor={activeDotColor}
          dotColor={dotColor}
          animationSpeed={animationSpeed}
          handleDotClick={handleDotClick}
          returnDots={returnDots}
        />
      )}
    </CarouselWrapper>
  );
};

export default Slider;
