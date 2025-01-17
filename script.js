// Store user data
const users = [
    {
        name: "John Doe",
        username: "johndoe",
        password: "password123",
        balance: 1000
    }
];

// Signup function
document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    // Check if username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        document.getElementById("signup-error").style.display = "block";
        document.getElementById("signup-success").style.display = "none";
    } else {
        users.push({ name, username, password, balance: 0 });
        document.getElementById("signup-error").style.display = "none";
        document.getElementById("signup-success").style.display = "block";

        // Clear signup fields
        document.getElementById("signup-name").value = "";
        document.getElementById("signup-username").value = "";
        document.getElementById("signup-password").value = "";
    }
});

// Login function
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Authenticate user
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("account-page").style.display = "block";
        document.getElementById("account-name").innerText = user.name;
        document.getElementById("account-balance").innerText = user.balance;
        sessionStorage.setItem("loggedInUser", JSON.stringify(user)); // Save session
    } else {
        document.getElementById("login-error").style.display = "block";
    }
});

// Deposit function
function deposit() {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const depositAmount = parseFloat(document.getElementById("deposit-amount").value);
    if (depositAmount > 0) {
        user.balance += depositAmount;
        document.getElementById("account-balance").innerText = user.balance;
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Deposit successful!");
    } else {
        alert("Please enter a valid amount.");
    }
}

// Withdraw function
function withdraw() {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);
    if (withdrawAmount > 0 && withdrawAmount <= user.balance) {
        user.balance -= withdrawAmount;
        document.getElementById("account-balance").innerText = user.balance;
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Withdrawal successful!");
    } else if (withdrawAmount > user.balance) {
        alert("Insufficient funds.");
    } else {
        alert("Please enter a valid amount.");
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem("loggedInUser");
    document.getElementById("account-page").style.display = "none";
    document.getElementById("auth-container").style.display = "flex";
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("login-error").style.display = "none";
}
