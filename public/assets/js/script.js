import { loadHeader, loadFooter } from './load-components.js';
import { setupNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initializeChatbot } from './chatbot.js';
import { fetchAppointments } from './public-appointments.js';
import { submitAppointments } from './appointment-booker.js';
import { initializeStripe, handleDonation } from './stripeHandler.js';
import { handleAdminLogin } from './login.js';

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  loadHeader();
  loadFooter();
  setupNavigation();
  initAnimations();
  initializeChatbot();
  fetchAppointments();
  submitAppointments();
  handleAdminLogin();

  // ✅ Stripe logic only for payment page
  if (path.endsWith("payment.html")) {
    const stripeConfig = initializeStripe(
      "pk_live_51QsBMaB2ZF7d2k3EpiLM1QRwI3s2RL2PJl57Ctkl0tAxouh6kcP9F580Iyo3eW6qVTGix5f6eQdXNHmMgOxyO2Td00KiYFudmT",
      "#card-element",
      "donation-amount",
      "donate-button",
      "payment-message"
    );
    handleDonation(stripeConfig);
  }
});