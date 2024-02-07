

export const createRow = (obj) => {
  const url = "../../img/image-800x600.jpg";
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
                    <button class="table__btn table__btn_pic" data-pic=${url}></button>
                    <button class="table__btn table__btn_edit"></button>
                    <button class="table__btn table__btn_del"></button>
                  </td>
	`
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('table__btn_pic')) {
      const picUrl = e.target.getAttribute('data-pic');
      const windowWidth = 800;
      const windowHeight = 600;
      const leftPosition = (screen.width - windowWidth) / 2;
      const topPosition = (screen.height - windowHeight) / 2;
      window.open(picUrl, 'picWindow', 'width=' + windowWidth + ', height=' + windowHeight + ', top=' + topPosition + ', left=' + leftPosition);
    }
  });

  return row;
}

export const renderGoods = (goods) => {
  const table = document.querySelector('.table__body');
  goods.forEach((obj) => {
    const row = createRow(obj);
    table.appendChild(row);
  });
}
