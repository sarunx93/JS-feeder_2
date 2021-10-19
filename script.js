import { vdos, bandMembers } from "./data.js";
console.log(bandMembers);

//===================================
// select DOM element
//===================================
const toggleBtn = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");
const navbar = document.getElementById("nav");

const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
toggleBtn.addEventListener("click", function () {
  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

//===================================
// Modal
//===================================

// const song = document.querySelector('[data-id = "song"]');
const modals = document.querySelectorAll(".modal");
const members = document.querySelectorAll(".member");

members.forEach(function (mem) {
  mem.addEventListener("click", () => {
    const m = document.querySelector(`.${mem.dataset.id}-modal`);
    m.innerHTML = bandMembers
      .map((item) => {
        if (item.nickname === mem.dataset.id) {
          return `
        <button class="close-btn">
            <i class="fas fa-times"></i>
        </button>
        <div class="img-container">

            <img src="${item.src}" alt="" class="main-img">
        </div>
        <div class="modal-text">
            <h3 class="name">${item.realName}</h3>
            <h4>${item.position}</h4>
            <h4 class="dob">${item.dob}</h4>
        </div>
        `;
        }
      })
      .join("");
    console.log(mem.dataset.id);
    console.log(m);

    openModal(m);
    const closeBtns = document.querySelectorAll(".close-btn");
    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });
  });
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

function openModal(m) {
  m.classList.add("open");
}

function closeModal() {
  modals.forEach(function (m) {
    m.classList.remove("open");
  });
}

//===================================
// Performance Video : make it a slider
//===================================
const container = document.querySelector(".slide-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
container.innerHTML = vdos
  .map((item, i) => {
    const { src, title } = item;
    let position = "next";
    if (i === 0) {
      position = "active";
    }
    if (i === vdos.length - 1) {
      position = "last";
    }
    return `
  <article class="slide ${position}">
                <iframe width="300" height="200" src="${src}" class="vdo">
                </iframe>
                <div class='text-box'>
                  <h4 class="vdo-title">${title}</h4>
                </div>
            </article>
            
  `;
  })
  .join("");

function startSlider(type) {
  const active = document.querySelector(".active");
  const last = document.querySelector(".last");
  let next = active.nextElementSibling;

  if (!next) {
    next = container.firstElementChild;
  }
  active.classList.remove("active");
  last.classList.remove("last");
  next.classList.remove("next");

  if (type === "prev") {
    active.classList.add("next");
    last.classList.add("active");
    next.classList.add("last");
    return;
  }

  active.classList.add("last");
  next.classList.add("active");
  last.classList.add("next");
}

nextBtn.addEventListener("click", () => {
  startSlider();
});
prevBtn.addEventListener("click", () => {
  startSlider("prev");
});

//===================================
// Smooth Scrolling
//===================================
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop - 150;
    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth",
    });
  });
});

//===================================
// Fixed Nav
//===================================
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
});
