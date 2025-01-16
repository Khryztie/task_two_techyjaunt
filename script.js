// Account holder information (this can be expanded for multiple users)
const account = {
    name: "Christiana Eke",
    username: "christyeke",
    password: "password123",
    balance: 1000
};

// Login function
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === account.username && password === account.password) {
        document.getElementById("login-page").style.display = "none";
        document.getElementById("account-page").style.display = "block";
        document.getElementById("account-name").innerText = account.name;
        document.getElementById("account-balance").innerText = account.balance;
    } else {
        document.getElementById("error-message").style.display = "block";
    }
});

// Deposit function
function deposit() {
    const depositAmount = parseFloat(document.getElementById("deposit-amount").value);
    if (depositAmount > 0) {
        account.balance += depositAmount;
        document.getElementById("account-balance").innerText = account.balance;
        alert("Deposit successful!");
    } else {
        alert("Please enter a valid amount.");
    }
}

// Withdraw function
function withdraw() {
    const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);
    if (withdrawAmount > 0 && withdrawAmount <= account.balance) {
        account.balance -= withdrawAmount;
        document.getElementById("account-balance").innerText = account.balance;
        alert("Withdrawal successful!");
    } else if (withdrawAmount > account.balance) {
        alert("Insufficient funds.");
    } else {
        alert("Please enter a valid amount.");
    }
}

// Logout function
function logout() {
    document.getElementById("account-page").style.display = "none";
    document.getElementById("login-page").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("error-message").style.display = "none";
}
