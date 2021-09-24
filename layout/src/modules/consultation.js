const consultation = () => {
  const consultBtn = document.querySelectorAll('.button_wide'),
    consultPopup = document.querySelector('.popup-consultation');
    
    // открытие popup
    consultBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        consultPopup.style.visibility = 'visible';
      });
    });

    // закрытие popup
    consultPopup.addEventListener('click', event => {
      const target = event.target;
      if(target.closest('.close-consultation')) {
        consultPopup.style.visibility = 'hidden';
      } else {
        return;
      }
    })
};
export default consultation;