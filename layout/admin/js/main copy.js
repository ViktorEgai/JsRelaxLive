'use strict'
const modal = document.getElementById('modal'),
  form = document.querySelector('form'),
  modalHeader = modal.querySelector('.modal__header'),
  inputs = form.querySelectorAll('input'),
  saveBtn = document.querySelector('.button-ui_firm'),
  addBtn = document.querySelector('.btn-addItem'),
  closeBtn = document.querySelector('.button__close'),
  cancelBtn = document.querySelector('.cancel-button'),
  thead = document.querySelector('thead'),
  tbody = document.getElementById('tbody');

// редирект на страницу авторизации если куки пустые
const redirect = () => {
  if (document.cookie === '') window.location.href = './index.html'
}
redirect();

// редактирование списка
const editData = () => {
  const tablelist = tbody.querySelectorAll('.table__row');
 
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
        openPopup('Редактировать услугу');
        inputs.forEach((input) => {
          if (input.id === 'type') input.value = type;
          if (input.id === 'name') input.value = name;
          if (input.id === 'units') input.value = units;
          if (input.id === 'cost') input.value = cost;
        });
        form.id = 'editList';
        addNewItem(id);
      }

      // кнопка удалить
      if (target.closest('.action-remove')) {
        fetch('http://localhost:3000/api/items/' + id, {
            method: 'DELETE'
          })
          .then(res => res.json())
          .then(res => showTable());
      }
    })
  })

};

// прогрузка данных из базы
const showTable = () => {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  };

  const getData = () => fetch('http://localhost:3000/api/items');

  const getDataTypes = (data) => {
    let typesArr = [];
    data.forEach(item => typesArr.push(item.type));
    typesArr = typesArr.filter((item, pos) => typesArr.indexOf(item) == pos);
    return typesArr;
  };

  const showData = (data, typeArr) => {
    const typeSelect = document.getElementById('typeItem');
    // очистка селекта
    while (typeSelect.firstChild) {
      typeSelect.removeChild(typeSelect.firstChild);
    };

    // "все типы" в селекте
    typeSelect.insertAdjacentHTML('beforeend', `
      <option value="Все типы">Все типы</option>
      `);

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
      // при выборе "Все типы" отображать всю таблицу
      if(typeSelect.value === 'Все типы') showTable();
      let filteredArr = [];

      data.forEach(item => {
        if (item.type === typeSelect.value) {
          tbodyLayout(item);
          filteredArr.push(item);
          sortTable(filteredArr);
        }
      });
      editData();
    })

    // сортировка таблицы
    const sortTable = (currentData) => {
      let sort;
      thead.addEventListener('click', event => {
        const target = event.target;

        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        }

        if (target.closest('.th-id')) {
          const arrow = target.closest('.th-id').querySelector('.icon-sort');
          if (!arrow.hasAttribute('style') || arrow.style.transform === 'rotate(0deg)') {
            arrow.style.transform = 'rotate(180deg)';
            sort = currentData.sort((a, b) => a.id - b.id);
            sort.forEach(item => tbodyLayout(item));
          } else {
            arrow.style.transform = 'rotate(0)';
            sort = currentData.sort((a, b) => b.id - a.id);
            sort.forEach(item => tbodyLayout(item));
          }
        };
        if (target.closest('.th-type')) {
          const arrow = target.closest('.th-type').querySelector('.icon-sort');
          if (!arrow.hasAttribute('style') || arrow.style.transform === 'rotate(0deg)') {
            arrow.style.transform = 'rotate(180deg)';
            sort = currentData.sort((a, b) => a.type.localeCompare(b.type));
            sort.forEach(item => tbodyLayout(item));
          } else {
            arrow.style.transform = 'rotate(0)';
            sort = currentData.sort((a, b) => b.type.localeCompare(a.type));
            sort.forEach(item => tbodyLayout(item));
          }
        }
        if (target.closest('.th-name')) {
          const arrow = target.closest('.th-name').querySelector('.icon-sort');
          if (!arrow.hasAttribute('style') || arrow.style.transform === 'rotate(0deg)') {
            arrow.style.transform = 'rotate(180deg)';
            sort = currentData.sort((a, b) => a.name.localeCompare(b.name));
            sort.forEach(item => tbodyLayout(item));
          } else {
            arrow.style.transform = 'rotate(0)';
            sort = currentData.sort((a, b) => b.name.localeCompare(a.name));

            sort.forEach(item => tbodyLayout(item));
          }
        }
        if (target.closest('.th-units')) {
          const arrow = target.closest('.th-units').querySelector('.icon-sort');
          if (!arrow.hasAttribute('style') || arrow.style.transform === 'rotate(0deg)') {
            arrow.style.transform = 'rotate(180deg)';
            sort = currentData.sort((a, b) => a.units.localeCompare(b.units));
            sort.forEach(item => tbodyLayout(item));
          } else {
            arrow.style.transform = 'rotate(0)';
            sort = currentData.sort((a, b) => b.units.localeCompare(a.units));

            sort.forEach(item => tbodyLayout(item));
          }
        }
      })
    };
    sortTable(data);

   
  }

  getData()
    .then(response => response.json())
    .then(data => {
      let typeArr = getDataTypes(data);
      showData(data, typeArr);
      editData();
     

    });
};
showTable();

//  открытие/закрытие модального окна
const openPopup = (title = 'Добавление новой услуги') => {
  modalHeader.textContent = title;
  modal.style.display = 'flex';
};
const closePopup = () => {
  modal.style.display = 'none';
};



// ивенты
addBtn.addEventListener('click', () => {
  openPopup();
  form.id = 'newList';
  inputs.forEach(input => input.value = '');
  addNewItem();
});
closeBtn.addEventListener('click', closePopup);
cancelBtn.addEventListener('click', closePopup);


/*
 // поиск 
    const search = () => {
      const searchBtn = document.querySelector('#searchBtn');
      const search = document.querySelector('#search');
      const tablelist = document.querySelectorAll('.table__row');
      searchBtn.addEventListener('click', () => {

        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        };
        const searchVal = search.value;

        window.location.search = searchVal;
        const searchParam = new URLSearchParams(window.location.search);
        const querySearch = searchParam.get('search');
        const regExp = new RegExp(`[а-я\s:.\d]?(${querySearch})[а-я\s:.\d]?`, 'gi');
        console.log(regExp);

        data.forEach(item => {
          if (item.name.match(regExp)) {
            tbodyLayout(item);
          }
        })
      })
    };
    search()*/