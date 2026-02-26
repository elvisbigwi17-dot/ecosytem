const shipmentBody = document.getElementById("shipmentBody");
const statusFilter = document.getElementById("statusFilter");

const totalShipmentsEl = document.getElementById("totalShipments");
const inTransitCountEl = document.getElementById("inTransitCount");
const deliveredCountEl = document.getElementById("deliveredCount");
const delayedCountEl = document.getElementById("delayedCount");

const vanNameEls = [
  document.getElementById("vanName1"),
  document.getElementById("vanName2"),
  document.getElementById("vanName3"),
  document.getElementById("vanName4")
];

const vanNames = [
  "Van Alpha", "Van Beta", "Van Gamma", "Van Delta",
  "Van Echo", "Van Foxtrot", "Van Golf", "Van Hotel",
  "Van India", "Van Juliet", "Van Kilo", "Van Lima"
];

let shipments = [];

function getRandomVanName() {
  return vanNames[Math.floor(Math.random() * vanNames.length)];
}

function getRandomVanId() {
  return "VAN-" + String(Math.floor(Math.random() * 9000) + 1000);
}

function updateMetricsWithVans(rows) {
  totalShipmentsEl.textContent = rows.length;
  inTransitCountEl.textContent = rows.filter((item) => item.status === "In Transit").length;
  deliveredCountEl.textContent = rows.filter((item) => item.status === "Delivered").length;
  delayedCountEl.textContent = rows.filter((item) => item.status === "Delayed").length;
  
  vanNameEls.forEach((el) => {
    if (el) {
      el.textContent = `${getRandomVanName()} (${getRandomVanId()})`;
    }
  });
}

function toStatusClass(status) {
  return `status-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

function updateMetrics(rows) {
  updateMetricsWithVans(rows);
}

function renderTable(rows) {
  shipmentBody.innerHTML = rows
    .map(
      (row) => `
      <tr>
        <td>${row.id}</td>
        <td>${row.origin}</td>
        <td>${row.destination}</td>
        <td><span class="status ${toStatusClass(row.status)}">${row.status}</span></td>
        <td>${row.eta}</td>
      </tr>
    `
    )
    .join("");
}

function applyFilter() {
  const selected = statusFilter.value;
  const filtered =
    selected === "all" ? shipments : shipments.filter((item) => item.status === selected);

  updateMetrics(filtered);
  renderTable(filtered);
}

async function init() {
  try {
    const response = await fetch("shipments.json");
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status}`);
    }

    shipments = await response.json();
    applyFilter();
  } catch (error) {
    // Use demo data if fetch fails
    shipments = [
      { id: "ESL-1001", origin: "Lagos", destination: "Abuja", status: "In Transit", eta: "2026-02-27" },
      { id: "ESL-1002", origin: "Port Harcourt", destination: "Kano", status: "Delivered", eta: "2026-02-24" },
      { id: "ESL-1003", origin: "Ibadan", destination: "Enugu", status: "Delayed", eta: "2026-02-28" },
      { id: "ESL-1004", origin: "Kaduna", destination: "Onitsha", status: "In Transit", eta: "2026-03-01" },
      { id: "ESL-1005", origin: "Abeokuta", destination: "Jos", status: "Delivered", eta: "2026-02-25" },
      { id: "ESL-1006", origin: "Benin City", destination: "Maiduguri", status: "Delayed", eta: "2026-03-02" }
    ];
    applyFilter();
    console.warn("Loaded demo data (JSON fetch failed)");
  }
}

statusFilter.addEventListener("change", applyFilter);
document.addEventListener("DOMContentLoaded", init);