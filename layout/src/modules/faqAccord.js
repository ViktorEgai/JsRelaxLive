const faqAccord = () => {
  const faqBlock = document.getElementById('faq'),
    question = faqBlock.querySelectorAll('.title_block');

  faq.addEventListener('click', event => {
    const target = event.target;
    question.forEach(item => {
      if(item === target) {
        item.classList.toggle('msg-active');
      } else {
        item.classList.remove('msg-active');
      }
    })
  })
    
};
export default faqAccord;