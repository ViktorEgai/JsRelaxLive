'use strict'

// редирект на страницу авторизации если куки пустые
if(document.cookie === '') {
  window.location.href = './index.html';
}

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
    typeArr.forEach( item => {
      typeSelect.insertAdjacentHTML('beforeend', `
      <option value="${item}">${item}</option>
      `);
    })

    // верстка таблицы 
    const tbodyLayout = (item) => {
        tbody.insertAdjacentHTML('beforeend', `
        <tr class="table__row">
          <td class="table__id table__cell">1614040106349</td>
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