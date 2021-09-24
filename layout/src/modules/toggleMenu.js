const toggleMenu = () => {

  const menuBtn = document.getElementById('menuBtn'),
    popupDialogMenu = document.querySelector('.popup-dialog-menu'),
    closeMenu = document.querySelector('.close-menu');

  menuBtn.addEventListener('click', () => {
    popupDialogMenu.style.transform = 'translate3d(0,0,0)';

  })

  closeMenu.addEventListener('click', () => {
    if (document.documentElement.clientWidth > 576) {
      popupDialogMenu.style.transform = 'translate3d(645px,0,0)';
    } else {
      popupDialogMenu.style.transform = 'translate3d(0,-300vh,0)';
    }


  })

  document.addEventListener('click', event => {
    const target = event.target;
    if (!target.closest('.popup-dialog-menu') &&
      !target.closest('#menuBtn')) {
      if (document.documentElement.clientWidth > 576) {
        popupDialogMenu.style.transform = 'translate3d(645px,0,0)';
      } else {
        popupDialogMenu.style.transform = 'translate3d(0,-300vh,0)';
      }
    }
  })


};
export default toggleMenu;
