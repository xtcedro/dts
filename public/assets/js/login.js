export async function handleAdminLogin(formSelector, usernameSelector, passwordSelector, messageSelector) {
  const form = document.querySelector(formSelector);
  const usernameInput = document.querySelector(usernameSelector);
  const passwordInput = document.querySelector(passwordSelector);
  const messageBox = document.querySelector(messageSelector);

  if (!form || !usernameInput || !passwordInput || !messageBox) {
    console.warn("Login form elements not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

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

      localStorage.setItem("adminToken", data.token);
      messageBox.textContent = "✅ Login successful. Redirecting...";

      setTimeout(() => {
        window.location.href = "/admin-dashboard.html";
      }, 1200);
    } catch (err) {
      messageBox.textContent = `❌ ${err.message}`;
    }
  });
}