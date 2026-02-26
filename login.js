const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// Debug: Check if form elements are found
console.log("Login form found:", loginForm !== null);
console.log("Error message element found:", errorMessage !== null);

// Hardcoded credentials
const users = {
  admin: { password: "admin123", role: "admin", name: "Administrator" },
  user: { password: "user123", role: "user", name: "Guest User" }
};
console.log("User database loaded:", Object.keys(users));

function authenticate(username, password) {
  const user = users[username];
  if (user && user.password === password) {
    return { username, role: user.role, name: user.name };
  }
  return null;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 4000);
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Form submitted"); // Debug log

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  
  console.log("Username:", username); // Debug log
  console.log("Password entered:", password ? "Yes" : "No"); // Debug log

  const authenticatedUser = authenticate(username, password);

  if (authenticatedUser) {
    console.log("Authentication successful:", authenticatedUser); // Debug log
    // Store session data
    localStorage.setItem("loggedInUser", JSON.stringify(authenticatedUser));
    
    // Redirect based on role
    if (authenticatedUser.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
    console.log("Authentication failed"); // Debug log
    showError("Invalid username or password. Please try again.");
  }
});

// Check if already logged in
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  }
});
