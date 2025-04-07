// /components/navigation.js

export function setupNavigation() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const isAdmin = !!localStorage.getItem("adminToken");

  navbar.innerHTML = `
    <div class="nav-left">
      <button class="hamburger-menu" id="menu-toggle" aria-label="Open navigation">☰</button>
      <span class="nav-title">Dominguez Tech Solutions</span>
    </div>
    <div class="menu-container">
      <div class="sidebar hidden" id="sidebar-menu">
        <div class="sidebar-header">
          <h2>📌 Menu</h2>
          <button class="close-menu" id="close-menu" aria-label="Close navigation">✖</button>
        </div>
        <ul class="nav-links">
          ${isAdmin ? `
            <li><a href="admin-appointments.html">📋 Manage Appointments</a></li>
            <li><a href="transactions.html">💰 View Transactions</a></li>
            <li><a href="settings.html">✏️ Site Settings</a></li>
            <li><a href="#" id="logout-link">🚪 Logout</a></li>
          ` : `
            <li><a href="index.html">🏠 Home</a></li>
            <li><a href="blogs.html">📝 Blogs</a></li>
            <li><a href="about.html">🧑‍💻 About Us</a></li>
            <li><a href="services.html">🛠️ Services</a></li>
            <li><a href="appointment-booker.html">🗓️ Book an Appointment</a></li>
            <li><a href="chatbot.html">🤖 AI Chatbot</a></li>
            <li><a href="contact.html">📬 Contact</a></li>
            <li><a href="login.html" id="login-link">🫅 Admin Login</a></li>
          `}
        </ul>
        <div class="nav-container">
          <a href="payment.html" class="nav-button">💳 Make a Payment</a>
        </div>
      </div>
      <div class="overlay hidden" id="menu-overlay"></div>
    </div>
  `;

  const menuButton = document.getElementById("menu-toggle");
  const sidebarMenu = document.getElementById("sidebar-menu");
  const closeButton = document.getElementById("close-menu");
  const overlay = document.getElementById("menu-overlay");

  if (!menuButton || !sidebarMenu || !closeButton || !overlay) return;

  const openMenu = () => {
    sidebarMenu.classList.add("visible");
    sidebarMenu.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.body.classList.add("no-scroll");
  };

  const closeMenu = () => {
    sidebarMenu.classList.remove("visible");
    sidebarMenu.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  };

  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebarMenu.classList.contains("visible")) {
      closeMenu();
    }
  });

  const currentPath = window.location.pathname.split("/").pop();
  sidebarMenu.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href === currentPath) {
      link.classList.add("active");
    }
  });

  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("adminToken");
      location.href = "login.html";
    });
  }
} 
