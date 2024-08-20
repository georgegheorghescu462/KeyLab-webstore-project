import { getProductById } from '../api/products.js';

document.addEventListener('DOMContentLoaded', () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	const cartItemsContainer = document.querySelector('.cart-items');
	const cartTotalContainer = document.querySelector('.cart-total');

	function updateCart() {
		cartItemsContainer.innerHTML = '';
		let total = 0;

		for (let id in cart) {
			const product = cart[id];

			const productCard = document.createElement('div');
			productCard.className =
				'flex justify-between items-center w-700 cart-item';
			const disabled = product.quantity === 1 ? 'disabled' : '';
			productCard.innerHTML = `
			<a href="../pages/details.html?id=${product.id}"><img width="50px" src="${
				product.imageUrl
			}"/></a>
            <div class="flex gap-20 w-400 h-40 justify-between items-center">
				<span>${product.name}</span>				
            	<div class="flex gap-10">
              		<button ${disabled} data-id="${id}" class="decrease">-</button>
               		<span>${product.quantity}</span>
               		<button data-id="${id}" ${
				Number(product.stock) <= product.quantity ? 'disabled' : ''
			} class="increase">+</button>
           		</div>
			</div>
			<span>$${product.price * product.quantity}</span>
			<button data-id="${id}" class="delete">X</button>
            `;
			total += product.price * product.quantity;
			cartItemsContainer.appendChild(productCard);
		}
		cartTotalContainer.innerHTML =
			total === 0 ? 'Empty cart' : `Total: $${total}`;
	}

	cartItemsContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('increase')) {
			const id = e.target.getAttribute('data-id');
			cart[id].quantity++;
		} else if (e.target.classList.contains('decrease')) {
			const id = e.target.getAttribute('data-id');
			cart[id].quantity--;
			if (cart[id].quantity <= 0) {
				delete cart[id];
			}
		} else if (e.target.classList.contains('delete')) {
			const id = e.target.getAttribute('data-id');
			delete cart[id];
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		updateCart();
	});

	updateCart();
});
