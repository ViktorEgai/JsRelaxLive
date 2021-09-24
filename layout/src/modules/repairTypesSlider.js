const repairTypesSlider = () => {
  const repairTypes = document.getElementById('repair-types');
  const repairTypesSliderWrap = repairTypes.querySelector('.repair-types-slider-wrap');
  const repairTabs = document.querySelectorAll('.nav-list-repair button');
  const repairTabContent = document.querySelectorAll('.repair-types-slider div');
  const sliderCounterCurrent = repairTypes.querySelector('.slider-counter-content__current');
  const sliderCounterTotal = repairTypes.querySelector('.slider-counter-content__total');

  let sortedTabs = [];

  [...repairTabContent].forEach(item => {
    if (item.className.match(/^[types]/)) sortedTabs.push(item);
  });


  // слайдер
  const slider = (tabContent) => {
    const slide = tabContent.querySelectorAll('.repair-types-slider__slide');

    let currentSlide = 0;

    sliderCounterTotal.textContent = slide.length;
    sliderCounterCurrent.textContent = currentSlide + 1;

    // проверка стилей
    const checkStyle = () => {

      slide.forEach((item, index) => {
        if (item.classList.contains('d-block')) {
          sliderCounterCurrent.textContent = index;
        }
      });

    };
    checkStyle();

    // отображение слайда
    const slides = (index) => {
      slide.forEach((item, i) => {
        if (index === i) {
          item.classList.add('d-block');
          item.classList.remove('d-none');
          sliderCounterCurrent.textContent = index + 1;
        } else {
          item.classList.add('d-none');
          item.classList.remove('d-block');

        }
      })
    };
    slides(currentSlide);

    //  переключение слайда назад
    const prevSlide = index => {
      slides(index);
    };
    //  переключение слайда вперед
    const nextSlide = index => {
      slides(index);
    };

    repairTypesSliderWrap.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;
      prevSlide(currentSlide);

      if (target.matches('.slider-arrow_right') || target.tagName === 'svg') {
        currentSlide++;
      } else if (target.matches('.slider-arrow_left') || target.tagName === 'svg') {
        currentSlide--;
      } else {
        return
      }
      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;

      nextSlide(currentSlide);
    });
  };
  slider(sortedTabs[0]);

  // табы
  const tabs = () => {
    const toggleTabContent = index => {
      for (let i = 0; i < sortedTabs.length; i++) {
        if (index === i) {
          repairTabs[i].classList.add('active');
          sortedTabs[i].classList.remove('d-none');
          // подключение слайдера         
          slider(sortedTabs[i]);
        } else {
          repairTabs[i].classList.remove('active');
          sortedTabs[i].classList.add('d-none');

        }
      }
    };
    // toggleTabContent(0);     

    repairTypes.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('button.button_o');
      if (target) {
        repairTabs.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }

    });
  };
  tabs();

  // слайдер таба в мобильной версии
  const mobileTabSlider = () => {
    const navWrapRepair = repairTypes.querySelector('.nav-wrap-repair');
    const navListRepair = repairTypes.querySelector('.nav-list-repair');

    let transform = 0;

    navWrapRepair.addEventListener('click', (event) => {
      let target = event.target;
    
      if (target.id === 'nav-arrow-repair-left_base') {
        if (transform > 0) transform -= 20;
      } else if (target.id === 'nav-arrow-repair-right_base') {
        if (transform < 60) transform += 20;
      } else {
        return;
      }
      navListRepair.style.transform = `translateX(-${transform}%)`;

    });
  }
  mobileTabSlider();

};
export default repairTypesSlider;
