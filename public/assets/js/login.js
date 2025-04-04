document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageBox = document.getElementById("login-message");

  if (!username || !password) {
    messageBox.textContent = "❌ Please enter both username and password.";
    return;
  }

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      messageBox.textContent = `❌ ${data.error || "Login failed"}`;
      return;
    }

    // Save token to localStorage/sessionStorage
    localStorage.setItem("adminToken", data.token);
    messageBox.textContent = "✅ Login successful. Redirecting...";

    // Redirect to dashboard or admin page
    setTimeout(() => {
      window.location.href = "/admin-dashboard.html"; // Update if needed
    }, 1200);
  } catch (err) {
    messageBox.textContent = `❌ ${err.message}`;
  }
});