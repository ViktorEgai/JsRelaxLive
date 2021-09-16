"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatelayout"]("main",{

/***/ "./layout/src/modules/getRepairData.js":
/*!*********************************************!*\
  !*** ./layout/src/modules/getRepairData.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar getRepairData = function getRepairData() {\n  // попап \n  var popupRepairTypes = function popupRepairTypes() {\n    var popupRepairTypesDialog = document.querySelector('.popup-repair-types'),\n        repairTypesBtn = document.querySelectorAll('.link-list a');\n\n    var showPopup = function showPopup() {\n      repairTypesBtn.forEach(function (item) {\n        item.addEventListener('click', function () {\n          popupRepairTypesDialog.style.display = 'flex';\n        });\n      });\n    };\n\n    showPopup();\n\n    var repairTabs = function repairTabs() {\n      var repairTabContent = document.querySelectorAll('.popup-repair-types-content-table__list'),\n          tabBtn = popupRepairTypesDialog.querySelectorAll('button'),\n          title = popupRepairTypesDialog.querySelector('.popup-repair-types-content__head-title');\n\n      var toggleTabContent = function toggleTabContent(index) {\n        for (var i = 0; i < repairTabContent.length; i++) {\n          if (index === i) {\n            tabBtn[i].classList.add('active');\n            repairTabContent[i].classList.remove('d-none');\n          } else {\n            tabBtn[i].classList.remove('active');\n            repairTabContent[i].classList.add('d-none');\n          }\n        }\n      };\n\n      popupRepairTypesDialog.addEventListener('click', function (event) {\n        var target = event.target;\n        target = target.closest('.popup-repair-types-nav__item');\n\n        if (target) {\n          tabBtn.forEach(function (item, i) {\n            if (item === target) toggleTabContent(i);\n          });\n          title.textContent = target.textContent;\n        }\n      });\n    };\n\n    repairTabs();\n    document.addEventListener('click', function (event) {\n      var target = event.target;\n\n      if (target.closest('.close') || target.tagName === 'svg') {\n        popupRepairTypesDialog.style.display = 'none';\n      }\n    });\n  }; // получение данных с сервера\n\n\n  var getData = function getData() {\n    return fetch('../db.json');\n  }; // получение массива с темами услуг\n\n\n  var getDataTypes = function getDataTypes(data) {\n    var typesArr = [];\n    data.forEach(function (item) {\n      return typesArr.push(item.type);\n    });\n    typesArr = typesArr.filter(function (item, pos) {\n      return typesArr.indexOf(item) == pos;\n    });\n    return typesArr;\n  }; // отображение тем услуг в виде табов на странице\n\n\n  var showTypes = function showTypes(types) {\n    var typeList = document.querySelector('.nav-list-popup-repair');\n    types.forEach(function (type) {\n      typeList.insertAdjacentHTML('beforeend', \"\\n      <button class=\\\"button_o popup-repair-types-nav__item \\\">\\n        \".concat(type, \"\\n      </button>\\n      \"));\n    });\n  }; // отображение списка услуг для каждого таба\n\n\n  var showTypeContent = function showTypeContent(data, types) {\n    var contentTable = document.querySelector('.popup-repair-types-content-table');\n\n    var _loop = function _loop(i) {\n      var table = document.createElement('table');\n      table.className = 'popup-repair-types-content-table__list d-none';\n      var tbody = document.createElement('tbody');\n      contentTable.appendChild(table);\n      data.forEach(function (item) {\n        if (types[i] === item.type) tbody.insertAdjacentHTML('beforeend', \"\\n          <tr class=\\\"mobile-row\\\">\\n            <td class=\\\"repair-types-name\\\">\\n              \".concat(item.name, \"\\n            </td>\\n            <td class=\\\"mobile-col-title tablet-hide desktop-hide\\\">\\n              \\u0415\\u0434.\\u0438\\u0437\\u043C\\u0435\\u0440\\u0435\\u043D\\u0438\\u044F\\n            </td>\\n            <td class=\\\"mobile-col-title tablet-hide desktop-hide\\\">\\n              \\u0426\\u0435\\u043D\\u0430 \\u0437\\u0430 \\u0435\\u0434.\\n            </td>\\n            <td class=\\\"repair-types-value\\\">\").concat(item.units, \"</td>\\n            <td class=\\\"repair-types-value\\\">\").concat(item.cost, \"</td>\\n          </tr>\\n        \"));\n      });\n      table.appendChild(tbody);\n    };\n\n    for (var i = 0; i < types.length; i++) {\n      _loop(i);\n    }\n\n    var tableList = contentTable.querySelectorAll('.popup-repair-types-content-table__list');\n    tableList[0].classList.remove('d-none');\n  }; // слайдер для табов в мобильной версии\n\n\n  var tabSlider = function tabSlider() {\n    if (document.documentElement.clientWidth < 1024) {\n      var navWrap = document.querySelector('.popup-dialog-repair-types'),\n          navListPopup = document.querySelector('.nav-list-popup-repair'),\n          navPopupRepairTypes = document.querySelector('.nav-popup-repair-types'),\n          btn = navPopupRepairTypes.querySelectorAll('.popup-repair-types-nav__item'),\n          width = navPopupRepairTypes.offsetWidth,\n          repairTypeList = document.querySelectorAll('.mobile-row');\n      var counter = 0; // ширина кнопок табов\n\n      btn.forEach(function (item) {\n        if (document.documentElement.clientWidth > 578) {\n          item.style.width = \"\".concat(width / 2, \"px\");\n        } else {\n          item.style.width = \"\".concat(width, \"px\");\n        }\n      });\n\n      if (document.documentElement.clientWidth < 578) {\n        repairTypeList.forEach(function (item) {\n          return item.classList.add('showHide');\n        });\n      }\n\n      navWrap.addEventListener('click', function (event) {\n        var target = event.target;\n        if (target.id === 'nav-arrow-popup-repair_left') counter -= width;\n\n        if (target.id === 'nav-arrow-popup-repair_right') {\n          if (document.documentElement.clientWidth > 578) {\n            if (counter < width * 1.5) counter += width;\n          } else {\n            if (counter < width * 5) counter += width;\n          }\n        }\n\n        navListPopup.style.transform = \"translateX(-\".concat(counter, \"px)\");\n      });\n    }\n  }; // запуск функции getData\n\n\n  getData().then(function (resolve) {\n    return resolve.json();\n  }).then(function (data) {\n    var types = getDataTypes(data);\n    showTypes(types);\n    showTypeContent(data, types);\n    popupRepairTypes();\n    tabSlider();\n  })[\"catch\"](function (error) {\n    return console.error(error);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRepairData);\n\n//# sourceURL=webpack://layout/./layout/src/modules/getRepairData.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("87ed035abe533c41580a")
/******/ })();
/******/ 
/******/ }
);