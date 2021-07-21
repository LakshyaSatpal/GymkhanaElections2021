const scrollTop = document.querySelector(".scroll-top");
const sidenav = document.querySelector(".side-nav");
const downBtn = document.querySelector("li.active .down-btn");

downBtn.addEventListener("click", () => {
  sidenav.classList.toggle("open-mobile");
});

scrollTop.addEventListener("click", () => {
  window.scrollY = 0;
});
