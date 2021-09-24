const showTipsMobile = () => {

  if (document.documentElement.clientWidth < 1008) {
    const formulaSlider = document.querySelector('.formula-slider-wrap'),
      formulaSlide = document.querySelectorAll('.formula-slider__slide');

    let currentSlide = 0;
    const slides = (index) => {
      formulaSlide.forEach((item, i) => {
        if (index === i) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      })
    };
    slides(currentSlide);

    const prevSlide =  index => {
      slides(index);
    };
    const nextSlide = index => {    
      slides(index);
    };


    formulaSlider.addEventListener('click', event => {

      event.preventDefault();

      const target = event.target;     
      
      prevSlide(currentSlide);
     
        if (target.matches('.slider-arrow_right-formula ') || target.tagName === 'svg') {
        currentSlide++;
      } else if (target.matches('.slider-arrow_left-formula') || target.tagName === 'svg') {
        currentSlide--;
      } else {
        return
      }
      if (currentSlide >= formulaSlide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = formulaSlide.length - 1;

      nextSlide(currentSlide);
    });
 
  }

};


export default showTipsMobile;
