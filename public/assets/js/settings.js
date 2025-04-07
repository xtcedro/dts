document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector(".settings-form");

  // Prefill form with current settings
  try {
    const res = await fetch("/api/settings");
    const data = await res.json();

    form.siteTitle.value = data.siteTitle;
    form.contactEmail.value = data.contactEmail;
    form.businessPhone.value = data.businessPhone;
    form.homepageBanner.value = data.homepageBanner;
  } catch (err) {
    alert("⚠️ Failed to load settings.");
  }

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedSettings = {
      siteTitle: form.siteTitle.value,
      contactEmail: form.contactEmail.value,
      businessPhone: form.businessPhone.value,
      homepageBanner: form.homepageBanner.value
    };

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSettings)
      });

      const data = await res.json();
      alert("✅ Settings saved successfully.");
    } catch (err) {
      alert("❌ Failed to save settings.");
    }
  });
});
