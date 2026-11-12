// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const mainNavigation = document.getElementById("main-navigation");

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", function () {
    mainNavigation.classList.toggle("active");

    const isOpen = mainNavigation.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu after selecting a link
  mainNavigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNavigation.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ACTIVE NAVIGATION LINK

function normalizePath(path) {
  if (path.endsWith("/")) {
    return path + "index.html";
  }

  return path;
}

function updateActiveLink() {
  const currentURL = new URL(window.location.href);
  const currentPath = normalizePath(currentURL.pathname);

  const navLinks = document.querySelectorAll(".main-nav a");

  navLinks.forEach(function (link) {
    const targetURL = new URL(link.href);
    const targetPath = normalizePath(targetURL.pathname);

    const samePage = targetPath === currentPath;

    const sameSection =
      !targetURL.hash || targetURL.hash === currentURL.hash;

    const isActive = samePage && sameSection;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

updateActiveLink();

window.addEventListener("hashchange", updateActiveLink);