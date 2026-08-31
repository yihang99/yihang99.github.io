(function () {
  const root = document.documentElement;
  const storageKey = "preferred-theme";
  const saved = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved === "dark" || (!saved && prefersDark)) {
    root.dataset.theme = "dark";
  }

  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next === "dark" ? "dark" : "";
    localStorage.setItem(storageKey, next);
  });

  const year = document.querySelector("#year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const videos = Array.from(document.querySelectorAll(".thumb video"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "180px 0px" }
    );
    videos.forEach((video) => observer.observe(video));
  } else {
    videos.forEach((video) => video.play().catch(() => {}));
  }
})();
