const wishlistContainer = document.getElementById("wishlistContainer");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ===============================
// DISPLAY WISHLIST
// ===============================

function displayWishlist() {

    wishlistContainer.innerHTML = "";

    // Empty Wishlist
    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `
            <h2 style="text-align:center; margin-top:50px;">
                Wishlist Is Empty ❤️
            </h2>
        `;

        return;
    }

    // Display Products
    wishlist.forEach((product) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>⭐ ${product.rating.rate || product.rating}</p>

            <h4>$${product.price}</h4>

            <div class="wishlist-actions">

                <button onclick="addToCart(${product.id})">
                    Add To Cart
                </button>

                <span class="remove-heart"
                      onclick="removeWishlist(${product.id})">
                      ❌
                </span>

            </div>

        `;

        wishlistContainer.appendChild(card);

    });

}

// ===============================
// REMOVE FROM WISHLIST
// ===============================

function removeWishlist(id) {

    wishlist = wishlist.filter((item) => item.id !== id);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayWishlist();

}

// ===============================
// ADD TO CART
// ===============================

function addToCart(id) {

    const product = wishlist.find((item) => item.id === id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === id);

    // Increase Quantity
    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showCartNotification();

}

// ===============================
// CART NOTIFICATION
// ===============================

function showCartNotification() {

    const notification = document.createElement("div");

    notification.innerText = "Product Added To Cart";

    notification.style.position = "fixed";
    notification.style.top = "20px";
    notification.style.right = "20px";
    notification.style.background = "green";
    notification.style.color = "white";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "5px";
    notification.style.fontSize = "16px";
    notification.style.zIndex = "1000";

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.remove();

    }, 2000);

}

// ===============================
// INITIAL FUNCTION CALL
// ===============================

displayWishlist();