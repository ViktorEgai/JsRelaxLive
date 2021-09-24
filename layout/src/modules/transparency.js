const transparency = () => {
  const transparencyBlock = document.getElementById('transparency'),
    transparencyImg = transparencyBlock.querySelectorAll('.transparency-item__img'),
    popupTransparency = document.querySelector('.popup-transparency'),
    transparencyItem = transparencyBlock.querySelectorAll('.transparency-item');
  
  // открытие popup transparency
  transparencyImg.forEach((item, index )=> {
    item.addEventListener('click', () => {
      popupTransparency.style.visibility = 'visible';
      popupSlider(index);
    });
  });

  // слайдер попап
  const popupSlider = (index) => {
    const slide = popupTransparency.querySelectorAll('.popup-transparency-slider__slide'),    
      currentCounter = popupTransparency.querySelector('.slider-counter-content__current'),
      totalCounter = popupTransparency.querySelector('.slider-counter-content__total');

    totalCounter.textContent = slide.length;

    let currentSlide = index;
    const slides = (index) => {
      slide.forEach((item, i) => {
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

    popupTransparency.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;
      // закрытие слайдера
      if (target.classList.contains('close')) popupTransparency.style.visibility = 'hidden';

      prevSlide(currentSlide);

      if (target.closest('.popup-arrow_transparency_right') || target.tagName === 'svg') {
        currentSlide++;
      } else if (target.closest('.popup-arrow_transparency_left') || target.tagName === 'svg') {
        currentSlide--;
      } else {
        return
      }
      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;

      nextSlide(currentSlide);
    });

  };

  const mobileSlider = () => {
    if(document.documentElement.clientWidth < 1076) {
      let currentSlide = 0;
      const slides = (index) => {
        transparencyItem.forEach((item, i) => {
          if (index === i) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        })     
      };
      slides(currentSlide);

      const prevSlide = index => {
        slides(index);
      };
      const nextSlide = index => {
        slides(index);
      };

      transparencyBlock.addEventListener('click', event => {
        event.preventDefault();
        const target = event.target;

        prevSlide(currentSlide);

        if (target.closest('.slider-arrow slider-arrow_right') ||
            target.tagName === 'svg') {
          currentSlide++;
        } else if (target.closest('.slider-arrow slider-arrow_left') ||
            target.tagName === 'svg') {
          currentSlide--;
        } else {
          return;
        }
        if (currentSlide >= transparencyItem.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = transparencyItem.length - 1;

        nextSlide(currentSlide);
      });

    }
  };
  mobileSlider();
};
export default transparency;
