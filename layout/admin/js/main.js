'use strict'
const modal = document.getElementById('modal'),
  form = document.querySelector('form'),
  modalHeader = modal.querySelector('.modal__header'),
  inputs = form.querySelectorAll('input'),
  saveBtn = document.querySelector('.button-ui_firm');    

// редирект на страницу авторизации если куки пустые
const redirect = () => {
  if (document.cookie === '') window.location.href = './index.html'
}
redirect();

// прогрузка данных из базы
const showTable = () => {
  const getData = () => fetch('http://localhost:3000/api/items');

  const getDataTypes = (data) => {
    let typesArr = [];

    data.forEach(item => typesArr.push(item.type));

    typesArr = typesArr.filter((item, pos) => typesArr.indexOf(item) == pos);
    return typesArr;
  };
  const showData = (data, typeArr) => {
    const typeSelect = document.getElementById('typeItem'),
      tbody = document.getElementById('tbody');

    // список селект
    typeArr.forEach(item => {
      typeSelect.insertAdjacentHTML('beforeend', `
      <option value="${item}">${item}</option>
      `);
    })

    // верстка таблицы 
    const tbodyLayout = (item) => {
      tbody.insertAdjacentHTML('beforeend', `
        <tr class="table__row">
          <td class="table__id table__cell">${item.id}</td>
          <td class="table-type table__cell">${item.type}</td>
          <td class="table-name table__cell">${item.name}</td>
          <td class="table-units table__cell">${item.units}</td>
          <td class="table-cost table__cell">${item.cost}</td>
          <td>
            <div class="table__actions table__cell">
              <button class="button action-change">
                <span class="svg_ui"
                  ><svg class="action-icon_change">
                    <use
                      xlink:href="./img/sprite.svg#change"
                    ></use></svg></span
                ><span>Изменить</span>
              </button>
              <button class="button action-remove">
                <span class="svg_ui"
                  ><svg class="action-icon_remove">
                    <use
                      xlink:href="./img/sprite.svg#remove"
                    ></use></svg></span
                ><span>Удалить</span>
              </button>
            </div>
            </td>
        </tr>
      `);
    }
    // данные в таблице
    data.forEach(item => tbodyLayout(item));

    // фильтрация по селекту
    typeSelect.addEventListener('change', () => {
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
      data.forEach(item => {
        if (item.type === typeSelect.value) tbodyLayout(item);
      });
    })
  }

  getData()
    .then(resolve => resolve.json())
    .then(data => {
      let typeArr = getDataTypes(data);
      showData(data, typeArr);
    });
};
showTable();

//  открытие/закрытие модального окна
const togglePopup = (title) => {
  const addBtn = document.querySelector('.btn-addItem'),
    closeBtn = document.querySelector('.button__close'),
    cancelBtn = document.querySelector('.cancel-button');

  //  открытие и закрытие  модального окна
  addBtn.addEventListener('click', () => {
    modalHeader.textContent = title;
    modal.style.display = 'flex';
  });
  const closePopup = () => {
    event.preventDefault();
    modal.style.display = 'none'
  }
  closeBtn.addEventListener('click',  closePopup);
  cancelBtn.addEventListener('click', closePopup);
};
togglePopup('Добавление новой услуги');

// добавление нового товара в базу данных
const addNewItem = () => {  
  
  form.addEventListener('submit', () => {      
    event.preventDefault();      

      let body = {};
      inputs.forEach((input) => {
        if(input.id === 'type') body['type'] = input.value;
        if(input.id === 'name') body['name'] = input.value;
        if(input.id === 'units') body['units'] = input.value;
        if(input.id === 'cost') body['cost'] = input.value;        
      });
      
      // вызов функции отправки
      postData(body)
        .then(resolve => {
         
          inputs.forEach(input => input.value = '');
        })
        .catch(err => console.error(err))
    
  })
  // функция отправки данных
  const postData = (body) => {
    return fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };
 
};
addNewItem();

