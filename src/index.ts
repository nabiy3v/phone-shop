import { modalTitle, modalPrice, modalImage, modal, header, cartButton, buyButtons, goCartButton, storeButton, images } from "./elements";

type Product = {
  title: string;
  price: number;
  img: string;
};

let selectedProduct: Product | null = null;

function handleBuyClick(event: Event) {
  const button = event.target as HTMLButtonElement;
  const productCard = button.closest('.bg-white') as HTMLDivElement;
  if (!productCard) return;

  const title = productCard.querySelector('h2')?.innerText!;
  const priceText = productCard.querySelector('p')?.innerText!;
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  const img = (productCard.querySelector('img') as HTMLImageElement).src;

  selectedProduct = { title, price, img };

  modalTitle.innerText = title;
  modalPrice.innerText = `$${price.toFixed(2)}`;
  modalImage.src = img;
  modal.classList.remove('hidden');
}

function updateCart(cartDiv: HTMLDivElement, quantity: number, unitPrice: number) {
  const quantitySpan = cartDiv.querySelector('.quantity-value') as HTMLSpanElement;
  const totalCell = cartDiv.querySelector('.total-price') as HTMLTableCellElement;
  const subTotal = cartDiv.querySelector('.sub-total') as HTMLParagraphElement;
  const lastTotal = cartDiv.querySelector('.last-total') as HTMLParagraphElement;
  if (!quantitySpan || !totalCell) return;

  quantitySpan.innerText = quantity.toString();
  const totalPrice = unitPrice * quantity;
  totalCell.innerText = `$${totalPrice.toFixed(2)}`;
  subTotal.innerText = `Sub Total: $${totalPrice.toFixed(2)}`;
  lastTotal.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

function handleCartClick() {
  if (!selectedProduct) {
    header.innerHTML = `<h1 class="text-center text-3xl font-bold">Your <span class="text-green-600">Cart</span></h1>
        <p class="text-center text-gray-500">Your cart is empty</p>`;
    return;
  }
  cartButton.disabled = true;
  const product = selectedProduct;
  let quantity = 1;
  let soliq = product.price % 20;

  header.innerHTML = `<h1 class="text-center text-3xl font-bold">Your <span class="text-green-600">Cart</span></h1>`;
  modal.classList.add('hidden');

  const cartDiv = document.createElement('div');
  cartDiv.innerHTML = `
        <div class="cart-container text-center mt-4">
          <table class="w-full border-collapse border-gray-300 text-center">
            <thead>
              <tr class="border-b font-bold">
                <th>PRODUCT</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>REMOVE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr class="cart-item border-b">
                <td><img src="${product.img}" width="100" class="mx-auto" /></td>
                <td>${product.title}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                  <button class="decrement px-2">-</button>
                  <span class="quantity-value mx-2">${quantity}</span>
                  <button class="increment px-2">+</button>
                </td>
                <td><button class="remove-item text-red-500">🗑</button></td>
                <td class="total-price">$${product.price.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div style="text-align: center; margin-top: 20px;">
          <button class="clearAll" style="border: 1px solid red; background-color: white; color: red; padding: 10px;">
              Clear Cart
          </button>
          <p style="color: blue;" class="sub-total">Sub Total: ${product.price}</p>
          <p style="color: blue;">Tax: $${soliq}</p>
          <p style="color: blue; font-weight: bold;" class="last-total">Total: <b>$${product.price + soliq}</b></p>
      </div>
        </div>`;

  document.body.append(cartDiv);
  const decrementBtn = cartDiv.querySelector('.decrement') as HTMLButtonElement;
  const incrementBtn = cartDiv.querySelector('.increment') as HTMLButtonElement;
  const removeBtn = cartDiv.querySelector('.remove-item') as HTMLButtonElement;

  decrementBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateCart(cartDiv, quantity, product.price);
    }
  });

  incrementBtn.addEventListener('click', () => {
    quantity++;
    updateCart(cartDiv, quantity, product.price);
  });

  removeBtn.addEventListener('click', () => {
    cartDiv.remove();
    cartButton.disabled = false;
    selectedProduct = null;
  });

  document.querySelector('.clearAll')?.addEventListener('click', () => {
    cartDiv.remove();
    cartButton.disabled = false;
    selectedProduct = null;
  })
}

function handleImgClick(e: MouseEvent) {
  header.innerHTML = '';
  let target = e.target as HTMLImageElement;
  let imgSrc = target.src;
  header.style.position = 'absolute';
  header.style.left = '50%';
  header.style.top = '50%';
  header.style.transform = 'translate(-50%, -50%)';
  let model = target.nextElementSibling?.children[0].innerHTML;
  let price = target.nextElementSibling?.children[1].innerHTML;

  header.innerHTML = `
  <div class="bg-white p-6 rounded-lg flex flex-col md:flex-row items-center max-w-4xl">
      <div class="md:w-1/3">
          <img src="${imgSrc}" alt="Google Pixel - Black" class="w-full rounded">
      </div>
      <div class="md:w-2/3 md:ml-6 text-gray-700">
          <h2 class="text-2xl font-semibold text-gray-900">${model}</h2>
          <p class="mt-2"><strong>Model:</strong> ${model}</p>
          <p><strong>Made By:</strong> GOOGLE</p>
          <p class="mt-2 text-lg font-bold text-teal-600">Price: ${price}</p>
          <p class="mt-2 font-semibold">Some Info About Product:</p>
          <p class="text-sm text-gray-600">Lorem Ipsum Dolor Amet Offal Butcher Quinoa Sustainable Gastropub, Echo Park Actually Green Juice Sriracha Paleo.</p>
          <div class="mt-4 flex gap-2">
              <button class="back px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Back To Products</button>
              <button class="AddToCart px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add To Cart</button>
          </div>
      </div>
  </div>
`;

header.querySelector('.back')?.addEventListener('click', () => {
  location.reload();
})

header.querySelector('.AddToCart')?.addEventListener('click', () => {
    handleCartClick();
})

}

images.forEach(img => img.addEventListener('click', handleImgClick));
cartButton.addEventListener('click', handleCartClick);
buyButtons.forEach(buy => buy.addEventListener('click', handleBuyClick));
goCartButton.addEventListener('click', handleCartClick);
storeButton.addEventListener('click', () => modal.classList.add('hidden'));