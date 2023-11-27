import {
	modalForm,
	modalCheckbox,
	modalInputDiscount,
	overlay,
	panelAddGoods,
	tableBody,
} from "./elements.js";
import { goods } from './data.js';
import { renderGoods } from './table.js';
import { generateRandomId } from './utils.js';

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

const init = () => {
	renderGoods(goods);

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
}

init();