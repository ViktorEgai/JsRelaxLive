const showPhone = () => {
  const arrow = document.querySelector('.header-contacts__arrow img'),
    phoneNumAccord = document.querySelector('.header-contacts__phone-number-accord'),
    phoneNum = document.querySelector('.header-contacts__phone-number-accord a' );

  arrow.addEventListener('click', () => {    
    if(phoneNumAccord.hasAttribute('style') && phoneNum.hasAttribute('style')) {
      phoneNumAccord.removeAttribute('style');
      phoneNum.removeAttribute('style');
      arrow.style.transform = 'rotate(0)';
      arrow.style.transition = ' transform 0.2s';
    } else {
      phoneNumAccord.style.top = '20px';
      phoneNum.style.opacity = 1;
      arrow.style.transform = 'rotate(180deg)';
      arrow.style.transition = ' transform 0.2s';
    }
  });
};

export default showPhone;