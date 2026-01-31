// Loading Animation
window.addEventListener("load", () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  setTimeout(() => {
    loadingOverlay.classList.add("hidden");
  }, 600);
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollProgress = document.querySelector(".scroll-progress");
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
});

// Header Scroll Effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Back to Top Button
const backToTopBtn = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Copy Functionality
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    const promptText = this.getAttribute("data-prompt");

    try {
      await navigator.clipboard.writeText(promptText);

      // Visual feedback
      const originalText = this.textContent;
      this.textContent = "Copied!";
      this.classList.add("copied");

      setTimeout(() => {
        this.textContent = originalText;
        this.classList.remove("copied");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      this.textContent = "Error";
      setTimeout(() => {
        this.textContent = "Copy";
      }, 2000);
    }
  });
});

// Section Animation on Scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});
