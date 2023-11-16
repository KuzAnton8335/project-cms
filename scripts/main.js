'use strict';

const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheckbox = document.querySelector('.modal__checkbox');
const modalInputDiscount = document.querySelector('.modal__input_discount');
const overlay = document.querySelector('.overlay');
const overlayModal = document.querySelector('.overlay__modal');
const panelAddGoods = document.querySelector('.panel__add-goods');
const modalClose = document.querySelector('.modal__close');
const tableBody = document.querySelector('.table__body');
const btnDel = document.querySelector('.table__btn_del');





const createRow = (obj) => {
	const row = document.createElement('tr');
	row.classList.add('table__row');
	row.innerHTML = `
	<td class="table__cell">${obj.id}</td>
      <td
      	class="table__cell table__cell_left table__cell_name"
            data-id="24601654816512">
                    <span class="table__cell-id"></span>
						  ${obj.title}
						  </td>
                  <td class="table__cell table__cell_left">${obj.category}</td>
                  <td class="table__cell">${obj.units}</td>
                  <td class="table__cell">${obj.count}</td>
                  <td class="table__cell">$${obj.price}</td>
                  <td class="table__cell">$${obj.price * obj.count}</td>
                  <td class="table__cell table__cell_btn-wrapper">
                    <button class="table__btn table__btn_pic"></button>
                    <button class="table__btn table__btn_edit"></button>
                    <button class="table__btn table__btn_del"></button>
                  </td>
	`
	return row;
}


const renderGoods = (goods) => {
	const table = document.querySelector('.table__body');
	goods.forEach((obj) => {
		const row = createRow(obj);
		table.appendChild(row);
	});
}



const goods = [
	{
		"id": 3,
		"title": "Смартфон Xiaomi 11T 8/128GB",
		"price": 27000,
		"description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
		"category": "mobile-phone",
		"discont": false,
		"count": 3,
		"units": "шт",
		"images": {
			"small": "img/smrtxiaomi11t-m.jpg",
			"big": "img/smrtxiaomi11t-b.jpg"
		}
	},
	{
		"id": 4,
		"title": "Радиоуправляемый автомобиль Cheetan",
		"price": 4000,
		"description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
		"category": "toys",
		"discont": 5,
		"count": 1,
		"units": "шт",
		"images": {
			"small": "img/cheetancar-m.jpg",
			"big": "img/cheetancar-b.jpg"
		}
	},
	{
		"id": 5,
		"title": "ТВ приставка MECOOL KI",
		"price": 12400,
		"description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
		"category": "tv-box",
		"discont": 15,
		"count": 4,
		"units": "шт",
		"images": {
			"small": "img/tvboxmecool-m.jpg",
			"big": "img/tvboxmecool-b.jpg"
		}
	},
	{
		"id": 6,
		"title": "Витая пара PROConnect 01-0043-3-25",
		"price": 22,
		"description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
		"category": "cables",
		"discont": false,
		"count": 420,
		"units": "v",
		"images": {
			"small": "img/lan_proconnect43-3-25.jpg",
			"big": "img/lan_proconnect43-3-25-b.jpg"
		}
	}
];

renderGoods(goods);

panelAddGoods.addEventListener('click', () => {
	overlay.classList.add('active');
});

overlay.addEventListener('click', (e) => {
	const target = e.target;
	if (target === overlay || target.closest('.modal__close')) {
		overlay.classList.remove('active');
	}
});


tableBody.addEventListener('click', (e) => {
	const target = e.target;
	if (target.closest('.table__btn_del')) {
		const row = target.closest('.table__row');
		const id = row.querySelector('.table__cell').textContent;
		row.remove();
		const index = goods.findIndex((obj) => obj.id === parseInt(id));
		if (index !== -1) {
			goods.splice(index, 1);
		}
		console.log(goods);
	}
});

modalCheckbox.addEventListener('change', () => {
	modalInputDiscount.disabled = !modalCheckbox.checked;
});

modalCheckbox.addEventListener('change', () => {
	if (!modalCheckbox.checked) {
		modalInputDiscount.value = '';
		modalInputDiscount.disabled = true;
	}
});

modalForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const id = Math.floor(Math.random() * 1000000);
	const title = modalTitle.value;
	const category = modalCategory.value;
	const units = modalUnits.value;
	const count = parseInt(modalCount.value);
	const price = parseFloat(modalPrice.value);

	const newProduct = {
		id,
		title,
		category,
		units,
		count,
		price
	};

	const newRow = createRow(newProduct);
	tableBody.appendChild(newRow);

	goods.push(newProduct);

	modalTitle.value = '';
	modalCategory.value = '';
	modalUnits.value = '';
	modalCount.value = '';
	modalPrice.value = '';

	overlay.classList.remove('active');

});


// <input type="text" class="modal__title" required>
{/* <input type="text" class="modal__category" required>
<input type="text" class="modal__units" required>
<input type="number" class="modal__count" required>
<input type="number" class="modal__price" required>
<input type="file" class="modal__image"> */}

// <input type="text" class="modal__title" required>
{/* <input type="text" class="modal__category" required>
<input type="text" class="modal__units" required>
<input type="number" class="modal__count" required>
<input type="number" class="modal__price" required>
<input type="file" class="modal__image"></input> */}

// panelAddGoods.addEventListener('click', () => {
// 	// Generate a random ID
// 	const randomId = Math.floor(Math.random() * 1000000);

// 	// Fill the span element with the random ID
// 	const spanElement = document.querySelector('.vendor-code__id');
// 	spanElement.textContent = randomId;

// 	// Open the modal
// 	overlay.classList.add('active');
//  });

// modalInputDiscount.addEventListener('change', () => {
// 	const count = parseInt(modalCount.value);
// 	const price = parseFloat(modalPrice.value);
// 	const discount = modalInputDiscount.value ? parseFloat(modalInputDiscount.value) : 0;

// 	const totalCost = (price * count) * (1 - discount / 100);

// 	// Update the total cost element in the modal
// 	const totalCostElement = document.querySelector('.modal__total-cost');
// 	totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
//  });

// const updateTotalCost = () => {
// 	const totalCost = goods.reduce((sum, product) => sum + (product.price * product.count), 0);

// 	// Update the total cost element above the table
// 	const totalCostElement = document.querySelector('.table__total-cost');
// 	totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
//  };

//  // Call the updateTotalCost function initially
//  updateTotalCost();

// const createRow = (obj) => {
//   const row = document.createElement('tr');
//   row.classList.add('table__row');
//   row.innerHTML = `
//     <td class="table__cell">${obj.id}</td>
//     <td class="table__cell table__cell_left table__cell_name" data-id="24601654816512">
//       <span class="table__cell-id"></span>
//       ${obj.title}
//     </td>
//     <td class="table__cell table__cell_left">${obj.category}</td>
//     <td class="table__cell">${obj.units}</td>
//     <td class="table__cell">${obj.count}</td>
//     <td class="table__cell">$${obj.price}</td>
//     <td class="table__cell">$${obj.price * obj.count}</td>
//     <td class="table__cell table__cell_btn-wrapper">
//       <button class="table__btn table__btn_pic"></button>
//       <button class="table__btn table__btn_edit"></button>
//       <button class="table__btn table__btn_del"></button>
//     </td>
//   `;

//   return row;
// };