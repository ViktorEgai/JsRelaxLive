const showTips = () => {
 const formulaItemIcon  = document.querySelectorAll('.formula-item__icon');

formulaItemIcon.forEach( item => {
 
  item.addEventListener('mouseover', () => {
    const tip = item.querySelector('.formula-item-popup');        
    tip.style.visibility = 'visible';
    tip.style.opacity = 1;
    tip.style.transition = 'opacity 0.2s';  
    item.parentElement.style.opacity = 0.8;
    if (tip.getBoundingClientRect().y < 0 ) {
      tip.style.transform = 'translateY(310px)';
      tip.classList.add('formula-item-popup--before');
    }  
  })
  item.addEventListener('mouseout', () => {
    const tip = item.querySelector('.formula-item-popup');
    tip.style.visibility = 'hidden';
    tip.style.opacity = 0;
    tip.style.transition = 'opacity 0.2s';
    tip.style.transform = 'translateY(0)';
    tip.classList.remove('formula-item-popup--before'); 
    

  });
})

};
export default showTips;