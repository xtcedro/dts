export function requireAdminToken(redirectUrl = "login.html") {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    alert("❌ Access denied. Admin login required.");
    window.location.href = redirectUrl;
  }
}
