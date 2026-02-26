const form = document.getElementById("registrationForm");
const downloadDocButton = document.getElementById("downloadDoc");
const sendEmailLink = document.getElementById("sendEmail");

function getFormData() {
  const formData = new FormData(form);
  return {
    companyName: formData.get("companyName")?.toString().trim() || "",
    contactPerson: formData.get("contactPerson")?.toString().trim() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    serviceType: formData.get("serviceType")?.toString().trim() || "",
    cargoDetails: formData.get("cargoDetails")?.toString().trim() || "",
    monthlyVolume: formData.get("monthlyVolume")?.toString().trim() || "",
    coverageArea: formData.get("coverageArea")?.toString().trim() || "",
  };
}

function validateForm() {
  if (!form.reportValidity()) {
    return false;
  }

  return true;
}

function buildDocumentHtml(data) {
  const submittedAt = new Date().toLocaleString();

  return `
  <html xmlns:o='urn:schemas-microsoft-com:office:office'
        xmlns:w='urn:schemas-microsoft-com:office:word'
        xmlns='http://www.w3.org/TR/REC-html40'>
  <head><meta charset='utf-8'><title>Eco Stream Registration</title></head>
  <body>
    <h1>Eco Stream Logistics - Service Registration</h1>
    <p><strong>Submitted At:</strong> ${submittedAt}</p>
    <p><strong>Company Name:</strong> ${data.companyName}</p>
    <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
    <p><strong>Phone Number:</strong> ${data.phone}</p>
    <p><strong>Business Email:</strong> ${data.email}</p>
    <p><strong>Service Type:</strong> ${data.serviceType}</p>
    <p><strong>Cargo Details:</strong> ${data.cargoDetails}</p>
    <p><strong>Estimated Monthly Volume:</strong> ${data.monthlyVolume}</p>
    <p><strong>Coverage Area / Routes:</strong> ${data.coverageArea}</p>
  </body>
  </html>
  `;
}

function downloadWordDocument() {
  if (!validateForm()) {
    return;
  }

  const data = getFormData();
  const documentHtml = buildDocumentHtml(data);
  const blob = new Blob([documentHtml], { type: "application/msword" });

  const safeCompanyName = data.companyName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const fileName = `eco_stream_registration_${safeCompanyName || "client"}.doc`;

  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

function prepareEmailLink(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const data = getFormData();
  const subject = encodeURIComponent(`Service Registration - ${data.companyName}`);
  const body = encodeURIComponent(
    `Hello Eco Stream Logistics,%0D%0A%0D%0APlease find our registration details attached as a Word document.%0D%0A%0D%0ACompany: ${data.companyName}%0D%0AContact: ${data.contactPerson}%0D%0APhone: ${data.phone}%0D%0AEmail: ${data.email}%0D%0AService Type: ${data.serviceType}%0D%0A%0D%0ARegards.`
  );

  const mailto = `mailto:bigwielvis@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  downloadWordDocument();
});

downloadDocButton.addEventListener("click", (event) => {
  event.preventDefault();
  downloadWordDocument();
});
sendEmailLink.addEventListener("click", prepareEmailLink);