const getRepairData = () => {
  // попап 
  const popupRepairTypes = () => {
    const popupRepairTypesDialog = document.querySelector('.popup-repair-types'),
      repairTypesBtn = document.querySelectorAll('.link-list a');
console.log(popupRepairTypesDialog);
    const showPopup = () => {
      repairTypesBtn.forEach(item => {
        item.addEventListener('click', () => {
          popupRepairTypesDialog.style.display = 'flex';
        })
      })
    };
    showPopup();
   

    const repairTabs = () => {
      const repairTabContent = document.querySelectorAll('.popup-repair-types-content-table__list'),
      tabBtn = popupRepairTypesDialog.querySelectorAll('button'),
        title = popupRepairTypesDialog.querySelector('.popup-repair-types-content__head-title');    

      const toggleTabContent = index => {
        for (let i = 0; i < repairTabContent.length; i++) {
          if (index === i) {
            tabBtn[i].classList.add('active');
            repairTabContent[i].classList.remove('d-none');
          } else {
            tabBtn[i].classList.remove('active');
            repairTabContent[i].classList.add('d-none');
          }
        }
      }

      popupRepairTypesDialog.addEventListener('click', event => {
        let target = event.target;
        target = target.closest('.popup-repair-types-nav__item');

        if (target) {
          tabBtn.forEach((item, i) => {
            if (item === target) toggleTabContent(i);
          });
          title.textContent = target.textContent;
        }
      });
    };
    repairTabs();

    document.addEventListener('click', (event) => {

      let target = event.target;

      if (target.closest('.close') || target.tagName === 'svg') {
        popupRepairTypesDialog.style.display = 'none';

      }
    })
  };

  // получение данных с сервера
  const getData = () => fetch('../crm-backend/db.json');

  // получение массива с темами услуг
  const getDataTypes = (data) => {
    let typesArr = [];

    data.forEach(item => typesArr.push(item.type));

    typesArr = typesArr.filter((item, pos) => typesArr.indexOf(item) == pos);
    return typesArr;
  };

  // отображение тем услуг в виде табов на странице
  const showTypes = (types) => {
    const typeList = document.querySelector('.nav-list-popup-repair');
    types.forEach(type => {
      typeList.insertAdjacentHTML('beforeend', `
      <button class="button_o popup-repair-types-nav__item ">
        ${type}
      </button>
      `);
    });
  }

  // отображение списка услуг для каждого таба
  const showTypeContent = (data, types) => {
    const contentTable = document.querySelector('.popup-repair-types-content-table');

    for (let i = 0; i < types.length; i++) {
      const table = document.createElement('table');
      table.className = 'popup-repair-types-content-table__list d-none';
      const tbody = document.createElement('tbody');
      contentTable.appendChild(table);

      data.forEach(item => {
        if (types[i] === item.type) tbody.insertAdjacentHTML('beforeend', `
          <tr class="mobile-row">
            <td class="repair-types-name">
              ${item.name}
            </td>
            <td class="mobile-col-title tablet-hide desktop-hide">
              Ед.измерения
            </td>
            <td class="mobile-col-title tablet-hide desktop-hide">
              Цена за ед.
            </td>
            <td class="repair-types-value">${item.units}</td>
            <td class="repair-types-value">${item.cost}</td>
          </tr>
        `);
      })

      table.appendChild(tbody);
    }
    const tableList = contentTable.querySelectorAll('.popup-repair-types-content-table__list');
    tableList[0].classList.remove('d-none');
  }

  // слайдер для табов в мобильной версии
  const tabSlider = () => {
    if (document.documentElement.clientWidth < 1024) {
      const navWrap = document.querySelector('.popup-dialog-repair-types'),
      navListPopup = document.querySelector('.nav-list-popup-repair'),
      navPopupRepairTypes = document.querySelector('.nav-popup-repair-types'),
      btn = navPopupRepairTypes.querySelectorAll('.popup-repair-types-nav__item'),
      width = navPopupRepairTypes.offsetWidth,
      repairTypeList = document.querySelectorAll('.mobile-row');
     
      let counter = 0;
      // ширина кнопок табов
      btn.forEach(item => {
        if (document.documentElement.clientWidth > 578) {
          item.style.width = `${width/2}px`;
        } else {
          item.style.width = `${width}px`;
        }
      })

      if (document.documentElement.clientWidth < 578) {
        repairTypeList.forEach(item => item.classList.add('showHide'))
      }

      navWrap.addEventListener('click', (event) => {
        const target = event.target;        
        if(target.id ==='nav-arrow-popup-repair_left') counter -= width ;
        if(target.id ==='nav-arrow-popup-repair_right') {
          if (document.documentElement.clientWidth > 578) {
            if(counter < width * 1.5 ) counter += width;
          } else {
            if(counter < width * 5 ) counter += width;
          }
        }
        navListPopup.style.transform = `translateX(-${counter}px)`;
      })
    }
  };
  // запуск функции getData
  getData()
    .then(resolve => resolve.json())
    .then(data => {
      let types = getDataTypes(data);
      showTypes(types);
      showTypeContent(data, types);
      popupRepairTypes();
      tabSlider();
    })
    .catch(error => console.error(error));

};  
export default getRepairData;

