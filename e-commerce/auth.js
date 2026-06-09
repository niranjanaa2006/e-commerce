// ===============================
// SIGNUP
// ===============================

function signup(){

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;

    const password =
        document.getElementById("signupPassword").value;

    // VALIDATION
    if(
        name === "" ||
        email === "" ||
        password === ""
    ){

        alert("Fill All Fields");

        return;
    }

    // USER OBJECT
    const user = {

        name,
        email,
        password

    };

    // SAVE USER
    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Signup Successful 🎉");

    // REDIRECT
    window.location.href = "login.html";

}

// ===============================
// LOGIN
// ===============================

function login(){

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    // GET USER
    const savedUser =
        JSON.parse(localStorage.getItem("user"));

    // CHECK USER
    if(
        savedUser &&
        email === savedUser.email &&
        password === savedUser.password
    ){

        // LOGIN SESSION
        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "username",
            savedUser.name
        );

        alert("Login Successful 🔥");

        // REDIRECT
        window.location.href = "index.html";

    }

    else{

        alert("Invalid Email or Password");

    }

}

// ===============================
// LOGOUT
// ===============================

function logout(){

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("username");

    alert("Logged Out");

    window.location.href = "login.html";

}