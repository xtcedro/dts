// change-password.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("changePasswordForm");
  const messageBox = document.getElementById("changePasswordMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      messageBox.textContent = "❌ All fields are required.";
      return;
    }

    if (newPassword !== confirmPassword) {
      messageBox.textContent = "❌ Passwords do not match.";
      return;
    }

    const token = localStorage.getItem("adminToken");

    if (!token) {
      messageBox.textContent = "❌ You are not logged in.";
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        messageBox.textContent = "✅ Password changed successfully.";
        form.reset();
      } else {
        messageBox.textContent = `❌ ${data.error || "Password change failed."}`;
      }
    } catch (err) {
      console.error("Change Password Error:", err.message);
      messageBox.textContent = "❌ Something went wrong.";
    }
  });
});