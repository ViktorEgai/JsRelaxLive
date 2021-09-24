const serviceSlider = () => {
  const slider = document.querySelector('.services-slider'),
    slide = document.querySelectorAll('.services-slider__slide');

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

    const autoPlay= (time)=> {
      setInterval(()=> {
         prevSlide(currentSlide);
         currentSlide++;
         if (currentSlide >= slide.length) currentSlide = 0;
         nextSlide(currentSlide);
      }, time)

    }
    autoPlay(3000);
 

};
export default serviceSlider;