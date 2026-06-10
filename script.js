const productsContainer =
    document.getElementById("productsContainer");

let products = [];

// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(productArray = products) {

    productsContainer.innerHTML = "";

    productArray.forEach((product) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <img src="${product.image}"
                 alt="${product.title}">

            <h3>${product.title}</h3>

           <p>⭐ ${product.rating.rate || product.rating}</p>

            <h4>$${Number(product.price).toFixed(2)}</h4>

            <div class="button-row">

                <button onclick="goToDetails(${product.id})">
                    Details
                </button>

                <button onclick="addToCart(${product.id})">
                    Add To Cart
                </button>

                <span class="wishlist-heart"
                      onclick="addToWishlist(${product.id})">

                    ❤️

                </span>

            </div>

        `;

        productsContainer.appendChild(card);

    });

}

// ===============================
// GO TO DETAILS PAGE
// ===============================

function goToDetails(id) {

    window.location.href =
        `details.html?id=${id}`;

}

// ===============================
// ADD TO CART
// ===============================

function addToCart(id){

    const product =
        products.find(
            (item) => item.id === id
        );

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const existingProduct =
        cart.find(
            (item) => item.id === id
        );

    // PRODUCT EXISTS
    if(existingProduct){

        existingProduct.quantity += 1;

    }

    // NEW PRODUCT
    else{

        cart.push({

            id: product.id,

            title: product.title,

            price: product.price,

            image: product.image,

            rating: product.rating.rate,

            quantity: 1

        });

    }

    // SAVE CART
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    // UPDATE CART COUNT
    updateCartCount();

    // NOTIFICATION
    showNotification();

}
// ===============================
// ADD TO WISHLIST
// ===============================

function addToWishlist(id) {

    const product =
        products.find((item) => item.id === id);

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const existingProduct =
        wishlist.find((item) => item.id === id);

    // PREVENT DUPLICATES
    if (!existingProduct) {

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        showWishlistNotification();

    }

    else {

        alert("Already In Wishlist");

    }

}

// ===============================
// PRODUCT ADDED NOTIFICATION
// ===============================

function showNotification() {

    const notification =
        document.createElement("div");

    notification.innerText =
        "Product Added 🛒";

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
// WISHLIST NOTIFICATION
// ===============================

function showWishlistNotification() {

    const notification =
        document.createElement("div");

    notification.innerText =
        "Added To Wishlist ❤️";

    notification.style.position = "fixed";

    notification.style.top = "20px";

    notification.style.right = "20px";

    notification.style.background = "crimson";

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
// SEARCH PRODUCTS
// ===============================

const searchInput =
    document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const searchValue =
        searchInput.value.toLowerCase();

    const filteredProducts =
        products.filter((product) =>

            product.title
                   .toLowerCase()
                   .includes(searchValue)

        );

    displayProducts(filteredProducts);

});

// ===============================
// SLIDER
// ===============================

let slideIndex = 0;

showSlides();

function showSlides() {

    const slides =
        document.getElementsByClassName("slides");

    // HIDE ALL
    for (let i = 0; i < slides.length; i++) {

        slides[i].style.display = "none";

    }

    slideIndex++;

    if (slideIndex > slides.length) {

        slideIndex = 1;

    }

    slides[slideIndex - 1].style.display =
        "block";

    setTimeout(showSlides, 3000);

}

// ===============================
// SHOW USERNAME
// ===============================

const username =
    localStorage.getItem("username");

const usernameElement =
    document.getElementById("username");

if (usernameElement && username) {

    usernameElement.innerText =
        `Hi, ${username} 👋`;

}
// ===============================
// CART COUNT
// ===============================

function updateCartCount(){

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let totalCount = 0;

    cart.forEach((item) => {

        totalCount += item.quantity;

    });

    const cartCount =
        document.getElementById("cartCount");

    if(cartCount){

        cartCount.innerText = totalCount;

    }

}

// INITIAL CART COUNT
updateCartCount();
const sortSelect =
    document.getElementById("sortSelect");

sortSelect.addEventListener("change", () => {

    let sortedProducts = [...products];

    const value = sortSelect.value;

    // LOW TO HIGH
    if(value === "low-high"){

        sortedProducts.sort(
            (a, b) => a.price - b.price
        );

    }

    // HIGH TO LOW
    else if(value === "high-low"){

        sortedProducts.sort(
            (a, b) => b.price - a.price
        );

    }

    // RATING
    else if(value === "rating"){

        sortedProducts.sort(
            (a, b) => b.rating - a.rating
        );

    }

    // NAME
    else if(value === "az"){

        sortedProducts.sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );

    }

    displayProducts(sortedProducts);

});
// ===============================
// FETCH PRODUCTS FROM API
// ===============================

async function fetchProducts(){

    try{

        const response =
            await fetch(
                "https://fakestoreapi.com/products"
            );

        products = await response.json();

        displayProducts(products);

    }

    catch(error){

        console.log(
            "Error Fetching Products",
            error
        );

    }

}

fetchProducts();

// ===============================
// INITIAL CALL
// ===============================

