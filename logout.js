// Change user handler for navigation
document.addEventListener("DOMContentLoaded", () => {
  const changeUserLink = document.getElementById("changeUserLink");
  const adminLink = document.getElementById("adminLink");
  
  // Check if user is logged in and is admin
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
  
  if (loggedInUser && loggedInUser.role === "admin" && adminLink) {
    adminLink.style.display = "inline-block";
  }
  
  if (changeUserLink) {
    changeUserLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});
