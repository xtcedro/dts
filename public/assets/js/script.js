import { loadHeader, loadFooter } from './load-components.js';
import { setupNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initializeChatbot } from './chatbot.js';
import { fetchAppointments } from './public-appointments.js';
import { submitAppointments } from './appointment-booker.js';
import { initializeStripe, handleDonation } from './stripeHandler.js';
import { handleAdminLogin } from './login.js'; // ✅ Admin login module

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  loadHeader();
  loadFooter();
  setupNavigation();
  initAnimations();
  initializeChatbot();
  fetchAppointments();
  submitAppointments();

  // ✅ Admin login logic for login page
  if (path.endsWith("login.html")) {
    handleAdminLogin("#loginForm", "#username", "#password", "#loginMessage");
  }

  // ✅ Restrict access to public-appointments.html
  if (path.endsWith("public-appointments.html")) {
    requireAdminToken();
  }

  // ✅ Stripe logic only for payment page
  if (path.endsWith("payment.html")) {
    const stripeConfig = initializeStripe(
      "pk_live_51QsBMaB2ZF7d2k3EpiLM1QRwI3s2RL2PJl57Ctkl0tAxouh6kcP9F580Iyo3eW6qVTGix5f6eQdXNHmMgOxyO2Td00KiYFudmT", // ✅ Live Stripe Key
      "#card-element",
      "donation-amount",
      "donate-button",
      "payment-message"
    );
    handleDonation(stripeConfig);
  }
});
