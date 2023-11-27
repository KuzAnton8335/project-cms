import { goods } from './data.js';
import { generateRandomId } from './utils.js';

export const createRow = (obj) => {
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

export const renderGoods = (goods) => {
	const table = document.querySelector('.table__body');
	goods.forEach((obj) => {
		const row = createRow(obj);
		table.appendChild(row);
	});
}