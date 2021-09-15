import getRepairData from "./modules/getRepairData";

import showPhone from "./modules/showPhone";
import toggleMenu from "./modules/toggleMenu";
import smoothScroll from "./modules/smoothScroll";
// import popupRepairTypes from "./modules/popupRepairTypes";
import phoneMask from "./modules/phoneMask";
import sendForm from "./modules/sendForm";
import privatPolicy from "./modules/privatPolicy";
import showTips from "./modules/showTips";
import showTipsMobile from "./modules/showTipsMobile";
import repairTypesSlider from "./modules/repairTypesSlider";
import portfolio from "./modules/portfolio";
import transparency from "./modules/transparency";
import consultation from "./modules/consultation";
import reviewSlider from "./modules/reviewSlider";
import faqAccord from "./modules/faqAccord";
document.addEventListener('DOMContentLoaded', () => {
  getRepairData();
  showPhone();
  toggleMenu();
  smoothScroll();
  // popupRepairTypes();
  phoneMask();
  sendForm();
  privatPolicy();
  showTips();
  showTipsMobile();
  repairTypesSlider();
  portfolio();
  transparency();
  consultation();
  reviewSlider();
  faqAccord();
})