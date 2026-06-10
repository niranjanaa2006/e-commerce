const ordersContainer = document.getElementById("ordersContainer");

// GET ORDERS
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// DISPLAY ORDERS
function displayOrders() {

    ordersContainer.innerHTML = "";

    // EMPTY
    if (orders.length === 0) {

        ordersContainer.innerHTML = `
            <h2 style="text-align:center; margin-top:50px;">
                No Orders Yet 📦
            </h2>
        `;

        return;
    }

    // LATEST FIRST
    const reversedOrders = [...orders].reverse();

    reversedOrders.forEach((order) => {

        const card = document.createElement("div");

        card.classList.add("order-card");

        let productsHTML = "";

        order.items.forEach((item) => {

            productsHTML += `

                <div class="order-product">

                    <img src="${item.image}">

                    <div>

                        <h3>${item.title}</h3>

                        <p>Quantity: ${item.quantity}</p>

                        <p>$${item.price}</p>

                    </div>

                </div>

            `;

        });

        card.innerHTML = `

            <h2>Order ID: ${order.id}</h2>

            <p><strong>Date:</strong> ${order.orderDate}</p>

            <p><strong>Payment:</strong> ${order.payment}</p>

            <p>
                <strong>Status:</strong>
                <span class="status">
                    ${order.status}
                </span>
            </p>

            ${productsHTML}

            <button onclick="trackOrder(${order.id})">
                Track Order
            </button>

        `;

        ordersContainer.appendChild(card);

    });

}

// TRACK ORDER
function trackOrder(id) {

    const order = orders.find((item) => item.id === id);

    alert(`Order Status: ${order.status}`);

}

// UPDATE STATUS
function updateOrderStatus() {

    orders.forEach((order) => {

        if (order.status === "Processing") {

            order.status = "Shipped";

        } else if (order.status === "Shipped") {

            order.status = "Out For Delivery";

        } else if (order.status === "Out For Delivery") {

            order.status = "Delivered";

        }

    });

    localStorage.setItem("orders", JSON.stringify(orders));

}

// AUTO UPDATE EVERY 10 SEC
setInterval(() => {

    updateOrderStatus();

    displayOrders();

}, 10000);

// INITIAL
displayOrders();