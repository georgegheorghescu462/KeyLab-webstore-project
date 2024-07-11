document.addEventListener('DOMContentLoaded', displayAllProducts);

const mainContainer = document.querySelector('.main');

function getAllProducts() {
	const url = 'https://668d7a4f099db4c579f31763.mockapi.io/products';
	return fetch(url).then((response) => response.json());
}

function displayAllProducts() {
	getAllProducts().then(
		(products) =>
			(mainContainer.innerHTML = products
				.map(
					(product) =>
						`
        <div class="product-card flex-column gap-20 items-center justify-between">
            <h3 class="card-title">${product.name}</h3>
            <img src="${product.imageUrl}" width="200px"/>
            <p class="card-price">$${product.price}</p>
        </div>
        `
				)
				.join(''))
	);
}
