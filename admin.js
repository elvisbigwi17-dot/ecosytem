// Check authentication
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

if (!loggedInUser || loggedInUser.role !== "admin") {
  window.location.href = "login.html";
}

document.getElementById("adminName").textContent = loggedInUser.name;

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

// Load shipments from localStorage
function getShipments() {
  const stored = localStorage.getItem("shipments");
  if (stored) {
    return JSON.parse(stored);
  }
  // Default shipments
  return [
    { id: "ESL-1001", origin: "Lagos", destination: "Abuja", status: "In Transit", eta: "2026-02-27" },
    { id: "ESL-1002", origin: "Port Harcourt", destination: "Kano", status: "Delivered", eta: "2026-02-24" },
    { id: "ESL-1003", origin: "Ibadan", destination: "Enugu", status: "Delayed", eta: "2026-02-28" },
    { id: "ESL-1004", origin: "Kaduna", destination: "Onitsha", status: "In Transit", eta: "2026-03-01" },
    { id: "ESL-1005", origin: "Abeokuta", destination: "Jos", status: "Delivered", eta: "2026-02-25" },
    { id: "ESL-1006", origin: "Benin City", destination: "Maiduguri", status: "Delayed", eta: "2026-03-02" }
  ];
}

function saveShipments(shipments) {
  localStorage.setItem("shipments", JSON.stringify(shipments));
}

function toStatusClass(status) {
  return `status-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

function renderShipments() {
  const shipments = getShipments();
  const tbody = document.getElementById("adminShipmentBody");
  
  tbody.innerHTML = shipments.map((shipment) => `
    <tr>
      <td>${shipment.id}</td>
      <td>${shipment.origin}</td>
      <td>${shipment.destination}</td>
      <td><span class="status ${toStatusClass(shipment.status)}">${shipment.status}</span></td>
      <td>${shipment.eta}</td>
      <td>
        <button class="btn-small btn-danger" onclick="deleteShipment('${shipment.id}')">Delete</button>
      </td>
    </tr>
  `).join("");
}

function deleteShipment(id) {
  if (confirm(`Are you sure you want to delete shipment ${id}?`)) {
    let shipments = getShipments();
    shipments = shipments.filter(s => s.id !== id);
    saveShipments(shipments);
    renderShipments();
  }
}

// Add shipment form
document.getElementById("addShipmentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const newShipment = {
    id: document.getElementById("shipmentId").value.trim(),
    origin: document.getElementById("origin").value.trim(),
    destination: document.getElementById("destination").value.trim(),
    status: document.getElementById("status").value,
    eta: document.getElementById("eta").value
  };

  const shipments = getShipments();
  
  // Check for duplicate ID
  if (shipments.some(s => s.id === newShipment.id)) {
    alert("Shipment ID already exists. Please use a unique ID.");
    return;
  }

  shipments.push(newShipment);
  saveShipments(shipments);
  renderShipments();
  
  document.getElementById("addShipmentForm").reset();
  alert("Shipment added successfully!");
});

// Clear form
document.getElementById("clearForm").addEventListener("click", () => {
  document.getElementById("addShipmentForm").reset();
});

// Initial render
renderShipments();
