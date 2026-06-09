const summaryItems = document.getElementById("summaryItems");
const itemsTotal = document.getElementById("itemsTotal");
const shipping = document.getElementById("shipping");
const grandTotal = document.getElementById("grandTotal");

// PAYMENT SECTIONS
const paymentOptions = document.querySelectorAll(
    'input[name="payment"]'
);

const upiSection = document.getElementById("upiSection");

const cardSection = document.getElementById("cardSection");

// GET CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// DISPLAY ORDER SUMMARY
// ===============================

function displaySummary() {

    let total = 0;

    summaryItems.innerHTML = "";

    cart.forEach((item) => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.classList.add("summary-item");

        div.innerHTML = `

            <p>
                ${item.title} × ${item.quantity}
            </p>

            <p>
                $${(item.price * item.quantity).toFixed(2)}
            </p>

        `;

        summaryItems.appendChild(div);

    });

    const shippingCost = 10;

    const finalTotal = total + shippingCost;

    itemsTotal.innerText =
        `Items Total: $${total.toFixed(2)}`;

    shipping.innerText =
        `Shipping: $${shippingCost}`;

    grandTotal.innerText =
        `Grand Total: $${finalTotal.toFixed(2)}`;

}

// ===============================
// SHOW PAYMENT INPUTS
// ===============================

paymentOptions.forEach((option) => {

    option.addEventListener("change", () => {

        // HIDE ALL
        upiSection.style.display = "none";
        cardSection.style.display = "none";

        // SHOW UPI
        if (option.value === "UPI") {

            upiSection.style.display = "block";

        }

        // SHOW CARD
        if (option.value === "Card") {

            cardSection.style.display = "block";

        }

    });

});

// ===============================
// PLACE ORDER
// ===============================

function placeOrder() {

    const name =
        document.getElementById("name").value;

    const address =
        document.getElementById("address").value;

    const phone =
        document.getElementById("phone").value;

    const pincode =
        document.getElementById("pincode").value;

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    );

    // VALIDATION
    if (
        name === "" ||
        address === "" ||
        phone === "" ||
        pincode === ""
    ) {

        alert("Please Fill All Details");

        return;
    }

    // PAYMENT VALIDATION
    if (!payment) {

        alert("Select Payment Method");

        return;
    }

    // UPI VALIDATION
    if (payment.value === "UPI") {

        const upiId =
            document.getElementById("upiId").value;

        if (upiId === "") {

            alert("Enter UPI ID");

            return;
        }

    }

    // CARD VALIDATION
    if (payment.value === "Card") {

        const cardNumber =
            document.getElementById("cardNumber").value;

        const cardName =
            document.getElementById("cardName").value;

        const expiry =
            document.getElementById("expiry").value;

        const cvv =
            document.getElementById("cvv").value;

        if (
            cardNumber === "" ||
            cardName === "" ||
            expiry === "" ||
            cvv === ""
        ) {

            alert("Fill Card Details");

            return;
        }

    }

    // CREATE ORDER OBJECT
    const order = {

        id: Date.now(),

        items: cart,

        customer: {
            name,
            address,
            phone,
            pincode
        },

        payment: payment.value,

        status: "Processing",

        orderDate: new Date().toLocaleString()

    };

    // GET OLD ORDERS
    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    // ADD NEW ORDER
    orders.push(order);

    // SAVE ORDERS
    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    // SUCCESS
    alert("Order Placed Successfully 🎉");

    // CLEAR CART
    localStorage.removeItem("cart");

    // REDIRECT
    window.location.href = "orders.html";

}

// INITIAL
displaySummary();