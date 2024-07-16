//Load products in table on page load

const url = 'https://668d7a4f099db4c579f31763.mockapi.io/products';
document.addEventListener('DOMContentLoaded', displayAllProducts);

const productsTableBody = document
	.getElementById('products-table')
	.querySelector('tbody');

function getAllProducts() {
	return fetch(url).then((response) => response.json());
}

function displayAllProducts() {
	getAllProducts().then((products) => {
		productsTableBody.innerHTML = products
			.map(
				(product) => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>
                        <img src="${product.imageUrl}" width="50px" />
                    </td>
                    <td>
                        <button>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    <td>
                        <button>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
                `
			)
			.join('');
	});
}

//Adding new products

const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('image-url');
const detailsInput = document.getElementById('details');

const saveProductButton = document.getElementById('save-btn');
saveProductButton.addEventListener('click', saveProduct);

function saveProduct(event) {
	event.preventDefault();

	const product = {
		name: nameInput.value,
		price: Number(priceInput.value),
		imageUrl: imageUrlInput.value,
		details: detailsInput.value,
	};

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(product),
	}).then(() => {
		form.reset();
		displayAllProducts();
	});
}
