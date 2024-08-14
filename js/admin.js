import {
	addNewProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
	getProductById,
} from '../api/products.js';
import { mapProductToAdminTableRow } from '../utils/layout.js';

//Load products in table on page load

document.addEventListener('DOMContentLoaded', displayAllProducts);

const productsTableBody = document
	.getElementById('products-table')
	.querySelector('tbody');

async function displayAllProducts() {
	const products = await getAllProducts();

	productsTableBody.innerHTML = products
		.map(mapProductToAdminTableRow)
		.join('');
}

//Adding new products

const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageUrlInput = document.getElementById('image-url');
const detailsInput = document.getElementById('details');

let editMode = false;
let currentEditableProductId;
const saveProductButton = document.getElementById('save-btn');
saveProductButton.addEventListener('click', saveProduct);

function validateForm(product) {
	const errorMessage = document.getElementById('error-message');

	if (
		product.name !== '' &&
		product.price !== 0 &&
		product.imageUrl !== '' &&
		product.details !== ''
	) {
		errorMessage.style.display = 'none';
		return true;
	} else {
		errorMessage.style.display = 'flex';
		errorMessage.innerHTML = `<i class="fa-solid fa-triangle-exclamation fa-shake"></i>Please fill out all fields`;
		return false;
	}
}

async function saveProduct(event) {
	event.preventDefault();

	const product = {
		name: nameInput.value,
		price: Number(priceInput.value),
		imageUrl: imageUrlInput.value,
		details: detailsInput.value,
	};

	if (validateForm(product)) {
		if (editMode) {
			const editedProduct = await updateProduct(
				product,
				currentEditableProductId
			);
			if (editedProduct !== null) {
				form.reset();
				displayAllProducts();
				editMode = false;
			}
		} else {
			const createdProduct = await addNewProduct(product);
			if (createdProduct !== null) {
				form.reset();
				displayAllProducts();
			}
		}
	}
}

//Editing and deleting products
productsTableBody.addEventListener('click', handleActions);

async function handleActions(event) {
	const className = event.target.parentElement.className;
	if (className.includes('edit')) {
		const productId = className.split('-')[1];
		editProduct(productId);
	} else if (className.includes('delete')) {
		const productId = className.split('-')[1];
		await deleteProduct(productId);
		await displayAllProducts();
	}
}

function editProduct(id) {
	getProductById(id).then((product) => {
		editMode = true;

		nameInput.value = product.name;
		priceInput.value = product.price;
		imageUrlInput.value = product.imageUrl;
		detailsInput.value = product.details;

		currentEditableProductId = product.id;
	});
}
