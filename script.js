const navShell = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const scrollTopButton = document.getElementById("scrollTop");
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const reveals = document.querySelectorAll(".reveal");

menuToggle.addEventListener("click", () => {
    navShell.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
    navShell.classList.remove("menu-open");
    });
});

const sunIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3v2.2"></path>
    <path d="M12 18.8V21"></path>
    <path d="M4.9 4.9l1.5 1.5"></path>
    <path d="M17.6 17.6l1.5 1.5"></path>
    <path d="M3 12h2.2"></path>
    <path d="M18.8 12H21"></path>
    <path d="M4.9 19.1l1.5-1.5"></path>
    <path d="M17.6 6.4l1.5-1.5"></path>
    <circle cx="12" cy="12" r="4.2"></circle>
    </svg>`;

const moonIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2z"></path>
    </svg>`;

const syncThemeToggle = () => {
    const isLightMode = document.body.classList.contains("light-mode");
    themeToggle.innerHTML = isLightMode ? moonIcon : sunIcon;
    themeToggle.setAttribute("aria-label", isLightMode ? "Switch to dark mode" : "Switch to light mode");
    themeToggle.setAttribute("title", isLightMode ? "Dark mode" : "Light mode");
};

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    syncThemeToggle();
});

syncThemeToggle();

const updateActiveLink = () => {
    const offset = window.scrollY + 140;
    let currentId = sections[0]?.id;

    sections.forEach((section) => {
    if (offset >= section.offsetTop) {
        currentId = section.id;
    }
    });

    navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
};

const updateScrollTopState = () => {
    const visible = window.scrollY > 500;
    document.documentElement.style.setProperty("--scroll-top-opacity", visible ? "1" : "0");
    scrollTopButton.classList.toggle("visible", visible);
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
    }
    });
}, { threshold: 0.15 });

reveals.forEach((item) => revealObserver.observe(item));

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
    updateActiveLink();
    updateScrollTopState();
});

updateActiveLink();
updateScrollTopState();