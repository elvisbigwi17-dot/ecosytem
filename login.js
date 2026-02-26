const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

// Hardcoded credentials
const users = {
  admin: { password: "admin123", role: "admin", name: "Administrator" },
  user: { password: "user123", role: "user", name: "Guest User" }
};

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

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const authenticatedUser = authenticate(username, password);

  if (authenticatedUser) {
    // Store session data
    localStorage.setItem("loggedInUser", JSON.stringify(authenticatedUser));
    
    // Redirect based on role
    if (authenticatedUser.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
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
