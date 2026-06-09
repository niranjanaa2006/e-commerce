const cartContainer = document.getElementById("cartContainer");
const totalPrice = document.getElementById("totalPrice");

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    cartContainer.innerHTML = "";

    let total = 0;

    // Empty Cart
    if (cart.length === 0) {

        cartContainer.innerHTML = "<h2>Your Cart Is Empty</h2>";

        totalPrice.innerText = "";

        return;
    }

    // Loop cart items
    cart.forEach((item) => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `

            <img src="${item.image}" width="150">

            <h2>${item.title}</h2>

            <p>Price: $${item.price}</p>

            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>

            <div class="quantity-box">

                <button onclick="decreaseQuantity(${item.id})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${item.id})">
                    +
                </button>

            </div>

        `;

        cartContainer.appendChild(div);

    });

    totalPrice.innerText = `Grand Total: $${total.toFixed(2)}`;
}

// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(id) {

    const product = cart.find((item) => item.id === id);

    product.quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(id) {

    const product = cart.find((item) => item.id === id);

    if (product.quantity > 1) {

        product.quantity--;

    } else {

        cart = cart.filter((item) => item.id !== id);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}
// ===============================
// PROTECTED CHECKOUT
// ===============================

function goToCheckout(){

    const isLoggedIn =
        localStorage.getItem("loggedIn");

    // NOT LOGGED IN
    if(!isLoggedIn){

        alert("Please Login First 🔐");

        window.location.href =
            "login.html";

        return;
    }

    // LOGGED IN
    window.location.href =
        "checkout.html";

}

// ===============================
// INITIAL CALL
// ===============================

displayCart();