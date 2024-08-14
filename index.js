import { getAllProducts } from './api/products.js';
import { mapProductToCard } from './utils/layout.js';

document.addEventListener('DOMContentLoaded', displayAllProducts);

const mainContainer = document.querySelector('.main');

async function displayAllProducts() {
	const products = await getAllProducts();

	mainContainer.innerHTML = products.map(mapProductToCard).join('');

	const addToCartButtons = document.querySelectorAll('.add-to-cart');

	addToCartButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.getAttribute('data-id');
			const name = button.getAttribute('data-name');
			const price = button.getAttribute('data-price');
			const imageUrl = button.getAttribute('data-image');
			const stock = button.getAttribute('data-stock');

			let cart = JSON.parse(localStorage.getItem('cart')) || {};
			if (cart[productId]) {
				if (cart[productId].quantity < Number(stock)) {
					cart[productId].quantity++;
				} else {
					button.disabled = true;
				}
			} else {
				cart[productId] = {
					quantity: 1,
					name: name,
					price: price,
					imageUrl: imageUrl,
					id: productId,
					stock: stock,
				};
			}

			localStorage.setItem('cart', JSON.stringify(cart));
		});
	});
}
