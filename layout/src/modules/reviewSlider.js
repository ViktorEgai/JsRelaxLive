const reviewSlider = () => {
  const wrap = document.querySelector('.reviews-slider-wrap'),
    slide = wrap.querySelectorAll('.reviews-slider__slide');

    let currentSlide = 0;

    const slides = (index) => {
      slide.forEach((item, i) => {
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

    wrap.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;

      prevSlide(currentSlide);

      if (target.closest('.slider-arrow_right')) {
        currentSlide++;
      } else if (target.closest('.slider-arrow_left')) {
        currentSlide--;
      } else {
        return
      }
      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;

      nextSlide(currentSlide);
    });
    
};
export default reviewSlider;