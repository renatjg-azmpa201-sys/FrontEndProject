// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();

    const user = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      alert("Login successful!");
      localStorage.setItem("loggedIn", "true");
      window.location.href = "home.html";
    } else {
      alert("Email or password is incorrect!");
    }
  });
}
