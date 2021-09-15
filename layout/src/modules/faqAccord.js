const faqAccord = () => {
  const faqBlock = document.getElementById('faq'),
    question = faqBlock.querySelectorAll('.title_block');

    question.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('msg-active');
      })
    });
};
export default faqAccord;