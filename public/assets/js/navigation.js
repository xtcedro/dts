export function setupNavigation() {
  const navbar = document.querySelector(".navbar");

  navbar.innerHTML = `
    <div class="nav-left">
        <button class="hamburger-menu" id="menu-toggle" aria-label="Open navigation">
            ☰
        </button>
        <span class="nav-title">Dominguez Tech Solutions</span>
    </div>
    <div class="menu-container">
        <div class="sidebar hidden" id="sidebar-menu">
            <div class="sidebar-header">
                <h2>📌 Menu</h2>
                <button class="close-menu" id="close-menu" aria-label="Close navigation">✖</button>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">🏠 Home</a></li>
                <li><a href="blogs.html">📝 Blogs</a></li>
                <li><a href="about.html">🧑‍💻 About Us</a></li>
                <li><a href="services.html">🛠️ Services</a></li>
                <li><a href="appointment-booker.html">🗓️ Book an Appointment</a></li>
                <li><a href="chatbot.html">🤖 AI Chatbot</a></li>
                <li><a href="contact.html">📬 Contact</a></li>
                <li><a href="login.html">🫅 Admin Login</a></li>
            </ul>
            <div class="cta-container">
                <a href="payment.html" class="cta-button">💳 Make a Payment</a>
            </div>
        </div>
        <div class="overlay hidden" id="menu-overlay"></div>
    </div>
  `;

  const menuButton = document.getElementById("menu-toggle");
  const sidebarMenu = document.getElementById("sidebar-menu");
  const closeButton = document.getElementById("close-menu");
  const overlay = document.getElementById("menu-overlay");

  function openMenu() {
    sidebarMenu.classList.add("visible");
    sidebarMenu.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    sidebarMenu.classList.remove("visible");
    sidebarMenu.classList.add("hidden");
    overlay.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  }

  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebarMenu.classList.contains("visible")) {
      closeMenu();
    }
  });

  const currentPath = window.location.pathname.split("/").pop();
  const links = sidebarMenu.querySelectorAll(".nav-links a");

  links.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}