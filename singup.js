function signUp() {

    // Step 1: Get values from form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    // Step 2: Remove extra spaces
    username = username.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // Step 3: Hide messages first
    document.getElementById('error-msg').style.display = 'none';
    document.getElementById('success-msg').style.display = 'none';

    // Step 4: Check if fields are empty
    if (username === '' || password === '' || confirmPassword === '') {
        document.getElementById('error-msg').textContent = 'Please fill all fields!';
        document.getElementById('error-msg').style.display = 'block';
        return;
    }

    // Step 5: Check password length
    if (password.length < 4) {
        document.getElementById('error-msg').textContent = 'Password must be at least 4 characters!';
        document.getElementById('error-msg').style.display = 'block';
        return;
    }

    // Step 6: Check if passwords match
    if (password !== confirmPassword) {
        document.getElementById('error-msg').textContent = 'Passwords do not match!';
        document.getElementById('error-msg').style.display = 'block';
        return;
    }

    // Step 7: Save to localStorage
    var user = {
        username: username,
        password: password
    };
    localStorage.setItem('user', JSON.stringify(user));

    // Step 8: Show success message
    document.getElementById('success-msg').style.display = 'block';

    // Step 9: Go to login page after 1.5 seconds
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1500);

}