const smoothScroll = () => {
  const popupDialogMenu = document.querySelector('.popup-dialog-menu'),
    anchors = popupDialogMenu.querySelectorAll('.menu-link'),
    buttonFooter = document.querySelector('.button-footer a');

  anchors.forEach(item => {

    item.addEventListener('click', event => {

      if (item.classList.contains('no-overflow')) {
        if (document.documentElement.clientWidth > 576) {
          popupDialogMenu.style.transform = 'translate3d(635px,0,0)';
        } else {
          popupDialogMenu.style.transform = 'translate3d(0,-300vh,0)';
        }
        return;
      } else {
        event.preventDefault();
        const blockID = item.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      if (document.documentElement.clientWidth > 576) {
        popupDialogMenu.style.transform = 'translate3d(635px,0,0)';
      } else {
        popupDialogMenu.style.transform = 'translate3d(0,-300vh,0)';
      }
    })
  });
  buttonFooter.addEventListener('click', event => {
    event.preventDefault();
    const blockID = buttonFooter.getAttribute('href').substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  })
};

export default smoothScroll;
