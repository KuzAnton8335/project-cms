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
		const id = row.querySelector('.table__cell').value;
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

	const name = modalForm.name.value;
	const category = modalForm.category.value;
	const units = modalForm.units.value;
	const count = modalForm.count.value;
	const price = modalForm.price.value;

	const newRow = document.createElement('tr');
	newRow.classList.add('table__row');
	newRow.innerHTML = `
	<td class="table__cell">${tableBody.children.length + 1}</td>
	<td class="table__cell table__cell_left table__cell_name">
		<span class="table__cell-id">id: ${generateRandomId()}</span>
		${name}
 	</td>
	 <td class="table__cell table__cell_left">${category}</td>
    <td class="table__cell">${units}</td>
    <td class="table__cell">${count}</td>
    <td class="table__cell">$${price}</td>
    <td class="table__cell">$${count * price}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>`;

	tableBody.appendChild(newRow);
	modalForm.reset();
});

const generateRandomId = () => {
	return Math.floor(Math.random() * 10000000000000);
}
const vendorCodeIdSpan = document.querySelector('.vendor-code__id');
vendorCodeIdSpan.textContent = generateRandomId();




const countInput = document.querySelector('#count');
const priceInput = document.querySelector('#price');
const totalPriceOutput = document.querySelector('.modal__total-price');

let calculateTotalPrice = () => {
	const count = parseInt(countInput.value);
	const price = parseFloat(priceInput.value);
	const totalPrice = count * price;
	totalPriceOutput.textContent = `$ ${totalPrice.toFixed(2)}`;
}
countInput.addEventListener('change', calculateTotalPrice);
priceInput.addEventListener('change', calculateTotalPrice);



const tableRows = document.querySelectorAll('.table__body tr');
let totalPrice = 0;
tableRows.forEach((row) => {

	const price = parseFloat(row.querySelector('.table__cell:nth-child(6)').textContent.replace('$', ''));
	const quantity = parseInt(row.querySelector('.table__cell:nth-child(5)').textContent);
	const subtotal = price * quantity;
	totalPrice += subtotal;
});
const totalPriceElement = document.querySelector('.cms__total-price');
totalPriceElement.textContent = `$ ${totalPrice.toFixed(2)}`;