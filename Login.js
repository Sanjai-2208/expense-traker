// New user check - no account = go to signup
var savedUser = localStorage.getItem('user');
if (!savedUser) {
    window.location.href = 'signup.html';
}

function login() {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    // Get saved user from localStorage
    var savedUser = localStorage.getItem('user');
    var user = JSON.parse(savedUser);

    // Check credentials
    if (username === user.username && password === user.password) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'expence.html';
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}