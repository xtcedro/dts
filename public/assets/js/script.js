import { requireAdminToken } from './utils/auth.js';
import { loadHeader, loadFooter } from './load-components.js';
import { setupNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initializeChatbot } from './chatbot.js';
import { fetchAppointments } from './public-appointments.js';
import { submitAppointments } from './appointment-booker.js';
import { initializeStripe, handleDonation } from './stripeHandler.js';

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  loadHeader();
  loadFooter();
  setupNavigation();
  initAnimations();
  initializeChatbot();
  fetchAppointments();
  submitAppointments();

  // Restrict certain pages
  if (path.endsWith("public-appointments.html")) {
    requireAdminToken();
  }

  // Stripe only for payment pages
  if (path.endsWith("payment.html")) {
    const stripeConfig = initializeStripe(
      "pk_live_...", // Replace with real key
      "#card-element",
      "donation-amount",
      "donate-button",
      "payment-message"
    );
    handleDonation(stripeConfig);
  }
});