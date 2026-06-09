 const detailsContainer =
    document.getElementById("detailsContainer");

// GET PRODUCT ID
const params =
    new URLSearchParams(window.location.search);

const productId =
    params.get("id");

let product = {};

// ===============================
// FETCH PRODUCT DETAILS
// ===============================

async function fetchProductDetails(){

    try{

        const response =
            await fetch(
                `https://fakestoreapi.com/products/${productId}`
            );

        product = await response.json();

        // DISPLAY PRODUCT
        detailsContainer.innerHTML = `
  
            <div class="details-card">

                <div class="details-image">

                    <img src="${product.image}"
                         alt="${product.title}">

                </div>

                <div class="details-info">

                    <h1>${product.title}</h1>

                    <p>${product.description}</p>

                    <h3>
                        ⭐ ${product.rating.rate}
                    </h3>

                    <h2>
                        $${product.price}
                    </h2>

                    <button onclick="addToCart(${product.id})">

                        Add To Cart

                    </button>

                </div>

            </div>
        `;

        // LOAD REVIEWS
        displayReviews();

    }

    catch(error){

        console.log(
            "Error Fetching Product",
            error
        );

    }

}

// CALL FUNCTION
fetchProductDetails();

// ===============================
// ADD TO CART
// ===============================

function addToCart(id){

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const existingProduct =
        cart.find(
            (item) => item.id === id
        );

    if(existingProduct){

        existingProduct.quantity += 1;

    }

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

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Product Added 🛒");
}

// ===============================
// ADD REVIEW
// ===============================

function addReview(){

    const name =
        document.getElementById("reviewName").value;

    const text =
        document.getElementById("reviewText").value;

    const rating =
        document.getElementById("reviewRating").value;

    // VALIDATION
    if(name === "" || text === ""){

        alert("Fill All Fields");

        return;
    }

    // REVIEW OBJECT
    const review = {

        productId: product.id,

        name,

        text,

        rating

    };

    // GET REVIEWS
    let reviews =
        JSON.parse(
            localStorage.getItem("reviews")
        ) || [];

    // ADD REVIEW
    reviews.push(review);

    // SAVE
    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

    // REFRESH
    displayReviews();

    // CLEAR INPUTS
    document.getElementById("reviewName").value = "";

    document.getElementById("reviewText").value = "";

}

// ===============================
// DISPLAY REVIEWS
// ===============================

function displayReviews(){

    const reviewsContainer =
        document.getElementById("reviewsContainer");

    reviewsContainer.innerHTML = "";

    let reviews =
        JSON.parse(
            localStorage.getItem("reviews")
        ) || [];

    // FILTER PRODUCT REVIEWS
    const productReviews =
        reviews.filter(
            (item) =>
                item.productId === product.id
        );

    productReviews.forEach((review) => {

        const div =
            document.createElement("div");

        div.classList.add("review-card");

        div.innerHTML = `

            <h3>${review.name}</h3>

            <p>
                ${"⭐".repeat(review.rating)}
            </p>

            <p>${review.text}</p>

        `;

        reviewsContainer.appendChild(div);

    });

}