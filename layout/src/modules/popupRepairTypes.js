const popupRepairTypes = () => {
const popupRepairTypesDialog = document.querySelector('.popup-dialog-repair-types'),
	repairTypesBtn = document.querySelectorAll('.link-list a');

const showPopup = () => {
	repairTypesBtn.forEach(item => {
	item.addEventListener('click', () => {
		popupRepairTypesDialog.style.visibility = 'visible';
	})
})
};
showPopup();

const repairTabContent = document.querySelector('.popup-repair-types-content-table__list');

const repairTabs = () => {
	const tabBtn =  popupRepairTypesDialog.querySelectorAll('button'),		
		title = popupRepairTypesDialog.querySelector('.popup-repair-types-content__head-title');
	console.log(repairTabContent);

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
			tabBtn.forEach ((item, i) => {
				if (item === target) toggleTabContent(i);
			});
			title.textContent = target.textContent;
		}
		
	});
};
repairTabs();

document.addEventListener('click', (event) => {

	let target = event.target;	

	if(!target.closest('.popup-dialog-repair-types') && !target.closest('.link-list a')) {
		popupRepairTypesDialog.style.visibility = 'hidden';

	}
})


};

export default popupRepairTypes;
