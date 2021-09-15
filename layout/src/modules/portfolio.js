'use strict';
const portfolio = () => {
  const portfolioBlock = document.getElementById('portfolio'),
    desktopPortfolioSlider = portfolioBlock.querySelector('.portfolio-slider'),
    popupPortfolio = document.querySelector('.popup-portfolio'),
    slideFrames = desktopPortfolioSlider.querySelectorAll('.portfolio-slider__slide-frame'),
    mobileWrap = portfolioBlock.querySelector('.portfolio-slider-wrap'),
    mobSlider = mobileWrap.querySelector('.portfolio-slider-mobile'),
    mobSlide = mobSlider.querySelectorAll('.portfolio-slider__slide-frame');

  // десктоп версия 
  const desktopPortfolio = () => {
    const arrowLeft = document.getElementById('portfolio-arrow_left'),
      arrowRight = document.getElementById('portfolio-arrow_right'),
      slideWidth = desktopPortfolioSlider.querySelector('.portfolio-slider__slide').offsetWidth;


    let transformCount = 0;
    portfolioBlock.addEventListener('click', event => {
      let target = event.target;

      if (target.closest('.slider-arrow_right-portfolio')) {
        if (document.documentElement.clientWidth < 900) {
          if (transformCount < (slideWidth * 4)) transformCount += slideWidth;
          if (transformCount > (slideWidth * 3)) arrowRight.style.display = 'none';
        } else if (document.documentElement.clientWidth < 1008) {
          if (transformCount < (slideWidth * 3)) transformCount += slideWidth;
          if (transformCount > (slideWidth * 2)) arrowRight.style.display = 'none';
        } else {
          if (transformCount < (slideWidth * 2)) transformCount += slideWidth;
          if (transformCount > (slideWidth * 1)) arrowRight.style.display = 'none';
        }
        arrowLeft.style.display = 'flex';
      } else if (target.closest('.slider-arrow_left-portfolio')) {

        if (transformCount > 0) transformCount -= slideWidth;
        if (transformCount === 0) arrowLeft.style.display = 'none';

        arrowRight.style.display = 'flex';
      } else {
        return
      }
      desktopPortfolioSlider.style.transform = `translateX(-${transformCount}px)`
      desktopPortfolioSlider.style.transition = 'transform 0.4s';
    })
  };
  desktopPortfolio();

  // мобильная версия портфолио
  const mobilePortfolio = () => {
    const mobCounter = mobileWrap.querySelector('.slider-counter-responsive'),
      currentCounter = mobCounter.querySelector('.slider-counter-content__current'),
      totalCounter = mobCounter.querySelector('.slider-counter-content__total');

    const mobileSlider = () => {
      totalCounter.textContent = mobSlide.length;

      let currentSlide = 0;

      const slides = (index) => {
        mobSlide.forEach((item, i) => {
          if (index === i) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        })
        currentCounter.textContent = index + 1;
      };
      slides(currentSlide);

      const prevSlide = index => {
        slides(index);
      };
      const nextSlide = index => {
        slides(index);
      };

      mobileWrap.addEventListener('click', event => {
        event.preventDefault();
        const target = event.target;

        prevSlide(currentSlide);

        if (target.closest('.slider-arrow-tablet-mobile_right')) {
          currentSlide++;
        } else if (target.closest('.slider-arrow-tablet-mobile_left')) {
          currentSlide--;
        } else {
          return
        }
        if (currentSlide >= mobSlide.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = mobSlide.length - 1;

        nextSlide(currentSlide);
      });
    }

    mobileSlider();


  };
  mobilePortfolio();

  // popup портфолио
  const showPopupPortfolio = (sliderItems) => {
    sliderItems.forEach((frame, index) => {
      frame.addEventListener('click', () => {
        popupPortfolio.style.visibility = 'visible';
        popupSlider(index);
      })
    })
  };
  showPopupPortfolio(slideFrames);
  showPopupPortfolio(mobSlide);
	// popup слайдер
  const popupSlider = (currentFrame) => {
    const slide = popupPortfolio.querySelectorAll('.popup-portfolio-slider__slide'),
      slideText = popupPortfolio.querySelectorAll('.popup-portfolio-text'),
      currentCounter = popupPortfolio.querySelector('.slider-counter-content__current'),
      totalCounter = popupPortfolio.querySelector('.slider-counter-content__total');

    totalCounter.textContent = slide.length;

    let currentSlide = currentFrame;
    const slides = (index) => {
      slide.forEach((item, i) => {
        if (index === i) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      })
      slideText.forEach((item, i) => {
        if (index === i) {
          if (document.documentElement.clientWidth < 1008 &&
            document.documentElement.clientWidth > 558) {
            item.style.cssText = `display: flex;
																		justify-content: space-around; 
																		flex-direction: row;`;
          } else {
            item.style.display = 'flex';

          }
        } else {
          item.style.display = 'none';
        }
      })
      currentCounter.textContent = index + 1;

    };
    slides(currentSlide);

    const prevSlide = index => {
      slides(index);
    };
    const nextSlide = index => {
      slides(index);
    };

    popupPortfolio.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;
      // закрытие слайдера
      if (target.classList.contains('close')) popupPortfolio.style.visibility = 'hidden';

      prevSlide(currentSlide);

      if (target.id === popup_portfolio_right || target.tagName === 'svg') {
        currentSlide++;
      } else if (target.id === popup_portfolio_left || target.tagName === 'svg') {
        currentSlide--;
      } else {
        return
      }
      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;

      nextSlide(currentSlide);


    });

  };
}
export default portfolio;
