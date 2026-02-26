// Authentication check - redirects to login if not authenticated
(function() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  
  // If not logged in and not on login page, redirect to login
  if (!loggedInUser && !window.location.pathname.includes("login.html")) {
    window.location.href = "login.html";
  }
})();
