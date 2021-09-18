'use strict'
class AdminPanel {
  constructor() {
    this.modal = document.getElementById('modal');
    this.form = this.modal.querySelector('form');
    this.modalHeader = modal.querySelector('.modal__header');
    this.inputs = this.form.querySelectorAll('input');
    this.saveBtn = document.querySelector('.button-ui_firm');
    this.addBtn = document.querySelector('.btn-addItem');
    this.closeBtn = document.querySelector('.button__close');
    this.cancelBtn = document.querySelector('.cancel-button');
    this.thead = document.querySelector('thead');
    this.tbody = document.getElementById('tbody');
    this.typeSelect = document.getElementById('typeItem');
  }

  // инициализиция
  init() {
    this.getData()
      .then(response => response.json())
      .then(data => {
        this.showTable(data);
        let typeArr = this.getDataTypes(data);
        this.showSelect(typeArr);
        this.filterBySelect(data);
        this.sortTable(data);
        this.editData(data);
        this.events(data);
      });
    
  }

  // редирект на страницу авторизации если куки пустые
  redirect() {
    if (document.cookie === '') window.location.href = './index.html';
  }

  // очистка тела таблицы
  cleanTbody() {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  // запрос на сервер
  getData() {
    return fetch('http://localhost:3000/api/items');
  }  

  // получения массива с типами услуг
  getDataTypes(data) {
    let arr = [];
    data.forEach(item => arr.push(item.type));
    arr = arr.filter((item, pos) => arr.indexOf(item) == pos);
    return arr;
  };

  // верстка таблицы 
  tbodyLayout(item) {
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

  // отображение селекта
  showSelect(typeArr) {
    // очистка селекта
    while (this.typeSelect.firstChild) {
      this.typeSelect.removeChild(this.typeSelect.firstChild);
    };

    // "все типы" в селекте
    this.typeSelect.insertAdjacentHTML('beforeend', `
      <option value="Все типы">Все типы</option>
      `);

    // список селект
    typeArr.forEach(item => {
      this.typeSelect.insertAdjacentHTML('beforeend', `
      <option value="${item}">${item}</option>
      `);
    })
  }

  // фильтрация по селекту
  filterBySelect(data) {
    this.typeSelect.addEventListener('change', () => {
     
      this.cleanTbody();
      // при выборе "Все типы" отображать всю таблицу
      if (this.typeSelect.value === 'Все типы') this.showTable(data);
      let filteredArr = [];
      data.forEach(item => {
        if (item.type === this.typeSelect.value) {
          this.tbodyLayout(item);
          filteredArr.push(item);
          this.sortTable(filteredArr);          
        }
      });
      this.editData(data);

    })
  }

  // отобржание всей таблицы
  showTable(data) {
    this.cleanTbody();
    // данные в таблице
    data.forEach(item => this.tbodyLayout(item));
  }

  // сортировка таблицы
  sortTable(currentData) {
    let sort;
    this.thead.addEventListener('click', event => {
      const target = event.target;     

      if (target.closest('.th-id')) {
        this.cleanTbody();
        const arrow = target.closest('.th-id').querySelector('.icon-sort');
        if (!arrow.hasAttribute('style') || arrow.style.transform === 'rotate(0deg)') {
          arrow.style.transform = 'rotate(180deg)';
          sort = currentData.sort((a, b) => a.id - b.id);
          sort.forEach(item => this.tbodyLayout(item));
        } else {
          arrow.style.transform = 'rotate(0)';
          sort = currentData.sort((a, b) => b.id - a.id);
          sort.forEach(item => this.tbodyLayout(item));
        }
      }
      if (target.closest('.th-type')) {
        this.cleanTbody();
        const arrow = target.closest('.th-type').querySelector('.icon-sort');
        if (!arrow.hasAttribute('style') || arrow.style.transform === 'rotate(0deg)') {
          arrow.style.transform = 'rotate(180deg)';
          sort = currentData.sort((a, b) => a.type.localeCompare(b.type));
          sort.forEach(item => this.tbodyLayout(item));
        } else {
          arrow.style.transform = 'rotate(0)';
          sort = currentData.sort((a, b) => b.type.localeCompare(a.type));
          sort.forEach(item => this.tbodyLayout(item));
        }
      }
      if (target.closest('.th-name')) {
        this.cleanTbody();
        const arrow = target.closest('.th-name').querySelector('.icon-sort');
        if (!arrow.hasAttribute('style') || arrow.style.transform === 'rotate(0deg)') {
          arrow.style.transform = 'rotate(180deg)';
          sort = currentData.sort((a, b) => a.name.localeCompare(b.name));
          sort.forEach(item => this.tbodyLayout(item));
        } else {
          arrow.style.transform = 'rotate(0)';
          sort = currentData.sort((a, b) => b.name.localeCompare(a.name));

          sort.forEach(item => this.tbodyLayout(item));
        }
      }
      if (target.closest('.th-units')) {
        this.cleanTbody();
        const arrow = target.closest('.th-units').querySelector('.icon-sort');
        if (!arrow.hasAttribute('style') || arrow.style.transform === 'rotate(0deg)') {
          arrow.style.transform = 'rotate(180deg)';
          sort = currentData.sort((a, b) => a.units.localeCompare(b.units));
          sort.forEach(item => this.tbodyLayout(item));
        } else {
          arrow.style.transform = 'rotate(0)';
          sort = currentData.sort((a, b) => b.units.localeCompare(a.units));

          sort.forEach(item => this.tbodyLayout(item));
        }
      }
    })
  };

  //  открытие/закрытие модального окна
  openPopup(title = 'Добавление новой услуги') {
    this.modalHeader.textContent = title;
    this.modal.style.display = 'flex';
  };
  closePopup() {
    this.modal.style.display = 'none';
  };
  
  // функция отправки данных
  postData(body){  
    return fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }); 
  };
  
  // функция изменения данных на сервере
  changeData(id, body){   
    console.log(id);
    return fetch('http://localhost:3000/api/items/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });      
  }

  // текушая таблица 
  currentTable() {       
    this.cleanTbody();     
    this.getData()
      .then(response => response.json())
      .then(data => {
        if(this.typeSelect.value === 'Все типы') this.showTable(data);
        let filteredArr = [];
        data.forEach(item => {
          if (item.type === this.typeSelect.value) {
            this.tbodyLayout(item);
            filteredArr.push(item);
            this.sortTable(filteredArr);
          }
        });
        this.editData();
      });
  }

  editData() {   
    const tablelist = this.tbody.querySelectorAll('.table__row');    
    tablelist.forEach(item => {
      item.addEventListener('click', event => {
        const target = event.target;

        const id = item.querySelector('.table__id').textContent,
          type = item.querySelector('.table-type').textContent,
          name = item.querySelector('.table-name').textContent,
          units = item.querySelector('.table-units').textContent,
          cost = item.querySelector('.table-cost').textContent;

        // кнопка изменить
        if (target.closest('.action-change')) {          
          this.form.id = 'editList';
          this.openPopup('Редактировать услугу');
          this.inputs.forEach((input) => {
            if (input.id === 'type') input.value = type;
            if (input.id === 'name') input.value = name;
            if (input.id === 'units') input.value = units;
            if (input.id === 'cost') input.value = cost;
          });
          this.saveBtnEvent(id);
        }
        // кнопка удалить
        if (target.closest('.action-remove')) {
          fetch('http://localhost:3000/api/items/' + id, {
              method: 'DELETE'
            })
            .then(res => {
              this.currentTable();
              this.editData();
            })
            .catch(err => console.error(err))
        }
      })
    })
  }

  // ивенты
  events() {
    this.addBtn.addEventListener('click', () => {
      this.form.id = 'newList';
      this.inputs.forEach(input => input.value = '');      
      this.openPopup();
      this.saveBtnEvent();
    });
    this.closeBtn.addEventListener('click', this.closePopup.bind(this));
    this.cancelBtn.addEventListener('click', this.closePopup.bind(this));    
  }

  // клик по кнопке сохранить
  saveBtnEvent(id) {
   
    if(this.form.id ==='newList') {
      this.saveBtn.addEventListener('click', (event) => {
      event.preventDefault();      
      let body = {};
      this.inputs.forEach((input) => {
        if (input.id === 'type') body['type'] = input.value;
        if (input.id === 'name') body['name'] = input.value;
        if (input.id === 'units') body['units'] = input.value;
        if (input.id === 'cost') body['cost'] = input.value;
      });      
      // вызов функции отправки
      this.postData(body)
        .then(response => {
          this.inputs.forEach(input => input.value = '');
        })
        .catch(err => console.error(err))      
      this.currentTable();
      })
    }
    if(this.form.id ==='editList') {
      this.saveBtn.addEventListener('click', () => {        
        event.preventDefault();
        let body = {};
        this.inputs.forEach((input) => {
          if (input.id === 'type') body['type'] = input.value;
          if (input.id === 'name') body['name'] = input.value;
          if (input.id === 'units') body['units'] = input.value;
          if (input.id === 'cost') body['cost'] = input.value;
        });  

        this.changeData(id, body)
        .then(response  => {         
          this.currentTable();
          this.editData();
        })     
        .catch(err => console.error(err));
      })
    }
  }
}


const panel = new AdminPanel();
panel.init();
