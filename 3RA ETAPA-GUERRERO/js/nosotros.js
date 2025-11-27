document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach(item => {
    item.querySelector(".accordion-header").addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
});
