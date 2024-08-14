document.addEventListener('DOMContentLoaded', showProductDetails);

const url = 'https://668d7a4f099db4c579f31763.mockapi.io/products';

async function showProductDetails() {
	const urlSearchParam = new URLSearchParams(window.location.search);
	const productId = urlSearchParam.get('id');

	const response = await fetch(`${url}/${productId}`);
	const product = await response.json();

	document.querySelector('.main').innerHTML = `
		<div class="flex justify-between">
			<div class="image-section"><img src="${product.imageUrl}"></div>
			<div class="cart-section flex-column gap-20">
				<h3>${product.name}</h3>
				<p>$${product.price}</p>
				<p>Stock: ${product.stock}</p>
				<button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.imageUrl}" data-stock="${product.stock}">Add to cart</button>
			</div>		
		</div>
		<div class="details-section">
			<h2>Details</h2>
			<p>${product.details}</p>
		</div>
	
	`;

	const addToCartButton = document.querySelector('.add-to-cart');

	addToCartButton.addEventListener('click', () => {
		const productId = addToCartButton.getAttribute('data-id');
		const name = addToCartButton.getAttribute('data-name');
		const price = addToCartButton.getAttribute('data-price');
		const imageUrl = addToCartButton.getAttribute('data-image');
		const stock = addToCartButton.getAttribute('data-stock');

		let cart = JSON.parse(localStorage.getItem('cart')) || {};
		if (cart[productId]) {
			if (cart[productId].quantity < Number(stock)) {
				cart[productId].quantity++;
			} else {
				addToCartButton.disabled = true;
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
}
