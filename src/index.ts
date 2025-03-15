const cart: HTMLButtonElement = document.querySelector('.cart')!;
const buys: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.buy');
const goCart: HTMLButtonElement = document.querySelector('.goCart')!;
const modal: HTMLDivElement = document.querySelector('#productModal')!;
const modalTitle: HTMLHeadingElement = document.querySelector('#modalTitle')!;
const modalPrice: HTMLParagraphElement = document.querySelector('#modalPrice')!;
const modalImage: HTMLImageElement = document.querySelector('#modalImage')!;
const store: HTMLButtonElement = document.querySelector('.store')!;
const header: HTMLDivElement = document.querySelector('.header')!;

let object = {
    title: '',
    price: '',
    img: '',
}

function handleBuyClick(e: MouseEvent) {
    let event = e.target as HTMLButtonElement;
    let dad = event.parentElement;

    let title = dad?.querySelector('h2')?.innerText || '';
    let price = dad?.querySelector('p')?.innerText || '';
    let img = dad?.querySelector('img')?.src || '';

    modalTitle.innerText = title;
    modalPrice.innerText = price;
    modalImage.src = img;

    modal.classList.remove('hidden');

    object = {title, price, img}

    return {
        title: title,
        price: price,
        img: img,
    }
}


function handleCartClick() {
    if (!object.title) {
        header.innerHTML = `
            <h1 style="font-size: 32px; font-weight: bold; text-align: center;">
                <span style="color: black;">Your</span> 
                <span style="color: green;">Cart</span>
            </h1>
            <p style="text-align: center; color: gray; font-size: 18px;">Your cart is empty</p>
        `;
        return;
    }

    let buy = object;
    let i = 1;
    let priceNum = parseFloat(buy.price.replace(/[^0-9.]/g, ""));
    let soliq = priceNum % 20;

    header.innerHTML = `
        <h1 style="font-size: 32px; font-weight: bold; text-align: center;">
            <span style="color: black;">Your</span> 
            <span style="color: green;">Cart</span>
        </h1>
    `;

    modal.classList.add('hidden');
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="cart-container" style="display: flex; justify-content: center; padding: 20px;">
            <table style="width: 90%; border-collapse: collapse; text-align: center;">
                <thead>
                    <tr style="border-bottom: 2px solid black; font-weight: bold;">
                        <th>PRODUCTS</th>
                        <th>NAME OF PRODUCTS</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>REMOVE</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid gray;">
                        <td><img src="${buy.img}" width="150" alt="Product" /></td>
                        <td>${buy.title}</td>
                        <td>${buy.price}</td>
                        <td>
                            <button style="padding: 5px;" onclick="i--">-</button>
                            <span>${i}</span>
                            <button style="padding: 5px;" onclick="i++">+</button>
                        </td>
                        <td>
                            <button class="remove-item" style="color: white; border: none; padding: 5px;">
                                🗑
                            </button>
                        </td>
                        <td>${buy.price}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <button class="clearAll" style="border: 1px solid red; background-color: white; color: red; padding: 10px;">
                Clear Cart
            </button>
            <p style="color: blue;">Sub Total: ${buy.price}</p>
            <p style="color: blue;">Tax: $${soliq}</p>
            <p style="color: blue; font-weight: bold;">Total: <b>$${soliq + priceNum}</b></p>
        </div>
    `;

    document.body.append(div);

    div.querySelector(".remove-item")!.addEventListener("click", () => {
        div.remove();
    });

    div.querySelector(".clearAll")!.addEventListener("click", () => {
        div.remove();
    });
}


cart.addEventListener('click', handleCartClick);


buys.forEach(buy => buy.addEventListener('click', handleBuyClick));
goCart.addEventListener('click', handleCartClick);

store.addEventListener('click', () => {
    modal.classList.add('hidden');
})
