const sendForm = () => {
  const popupThank = document.querySelector('.popup-thank');
  const forms = document.querySelectorAll('form'); 
  const statusMessage = document.createElement('div');
  
  // инпут номера телефона
  const phoneInput = document.querySelectorAll('input[name="phone"]');
  phoneInput.forEach(input => {
    input.addEventListener('input', (event)=> {
      let form = event.target.closest('form');
      if(input.value.length < 18) {
         form.querySelector('button').disabled = true;      
      } else {
        form.querySelector('button').disabled = false; 
      }
    })
  })
  // обработчик для всех форм
  forms.forEach((form) => {
    form.querySelector('button').disabled = true;    
    // чекбокс 
    const checkbox = form.querySelector('.checkbox__input');
    checkbox.addEventListener('change', () => {     
      if (form.querySelector('button').disabled) {
        form.querySelector('button').disabled = false;
      } else {
        form.querySelector('button').disabled = true;
      }
    })
    
    // событие сабмит
    form.addEventListener('submit', (event) => {
      statusMessage.innerHTML = `
        <div class='sk-double-bounce'>
          <div class='sk-child sk-double-bounce-1'></div>
          <div class='sk-child sk-double-bounce-2'></div>
        </div>
				`;
      animStyle();
      event.preventDefault();

      const formData = new FormData(form);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      // вызов функции postData
      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('status network not 200')
          }
          popupThank.style.visibility = 'visible';
          document.querySelector('.sk-double-bounce').style.display = 'none';
        })
        .catch((error) => {          
          console.error(error);
        });
      // очистка инпутов после отправки
      [...form].forEach((input) => {
        input.value = '';        
        if(input.type === 'checkbox') input.checked = false;
      });
      form.querySelector('button').disabled = true; 
    });
  });

  // стили для анимации 
  const animStyle = () => {
    const style = document.createElement('style');
    style.textContent = `
.sk-double-bounce {
  width: 50px;
  height: 50px;
  position: fixed;
  margin: auto;  
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
  
}
.sk-child {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fdab16;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: sk-double-bounce 2s infinite ease-in-out;
  }
  .sk-double-bounce-2 {
    animation-delay: -1s;
  }
@keyframes sk-double-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
		`;
    document.head.appendChild(style);

  };

  // отправка данных на сервер
  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };

  popupThank.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('close')) {
      popupThank.style.visibility = 'hidden';
    }
  })
};

export default sendForm;