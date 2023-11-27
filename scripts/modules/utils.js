export const generateRandomId = () => {
	return Math.floor(Math.random() * 10000000000000);
}

export const calculateTotalPrice = (count, price) => {
	const totalPrice = count * price;
	return `$ ${totalPrice.toFixed(2)}`;
};