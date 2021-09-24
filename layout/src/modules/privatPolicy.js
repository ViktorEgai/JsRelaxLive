const privatPolicy = () => {
  const linkPrivacy = document.querySelectorAll('.link-privacy'),
    popupPrivacy = document.querySelector('.popup-privacy');
  
  linkPrivacy.forEach(link => {
    link.addEventListener('click', ()=> {
      popupPrivacy.style.visibility = 'visible';
    })
  })

  popupPrivacy.addEventListener('click', (event) => {
    let target = event.target;
    if (target.closest('.close')) {
      target.parentNode.style.visibility = 'hidden';
    }
  });

};
export default privatPolicy;