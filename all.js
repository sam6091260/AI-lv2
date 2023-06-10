$(function () {
  $("#BackTop").click(function () {
    $("html, body").scrollTop(0);
  });
});

const hbgBtn = document.querySelector(".hbgIcon");
const nav = document.querySelector("ul");
hbgBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});
