document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("changePasswordForm");
  const messageBox = document.getElementById("changePasswordMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      messageBox.textContent = "❌ Passwords do not match.";
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        messageBox.textContent = "✅ Password changed successfully.";
        form.reset();
      } else {
        messageBox.textContent = `❌ ${data.error || "Failed to change password."}`;
      }
    } catch (err) {
      messageBox.textContent = "❌ An error occurred.";
      console.error("Error:", err.message);
    }
  });
});
