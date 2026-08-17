const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");
const closeMenu = $("#closeMenu");
const scrim = $("#scrim");

function openMenu(){
  mobileMenu.classList.add("open");
  scrim.classList.add("open");
  mobileMenu.setAttribute("aria-hidden","false");
  menuBtn.setAttribute("aria-expanded","true");
}
function closeMenuFn(){
  mobileMenu.classList.remove("open");
  scrim.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden","true");
  menuBtn.setAttribute("aria-expanded","false");
}
menuBtn.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeMenuFn);
scrim.addEventListener("click", closeMenuFn);
$$(".mobile-menu a").forEach(a => a.addEventListener("click", closeMenuFn));

window.addEventListener("scroll", () => {
  const d = document.documentElement;
  const pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
  $("#progressBar").style.width = `${Math.max(0, Math.min(100, pct))}%`;
});

const modal = $("#demoModal");
const modalTitle = $("#modalTitle");
const modalClose = $("#modalClose");
$$("[data-demo]").forEach(btn => {
  btn.addEventListener("click", () => {
    modalTitle.textContent = btn.dataset.demo;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  });
});
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape"){ closeModal(); closeMenuFn(); } });

const toast = $("#toast");
$$("[data-download]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2400);
  });
});

$$("details").forEach(d => {
  d.addEventListener("toggle", () => {
    if(d.open){
      $$("details").filter(x => x !== d).forEach(x => x.removeAttribute("open"));
    }
  });
});

// Small reveal effect using IntersectionObserver.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:0, transform:"translateY(18px)"},{opacity:1, transform:"translateY(0)"}],
        {duration:650, easing:"cubic-bezier(.2,.8,.2,1)", fill:"forwards"}
      );
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});
$$(".lux-card,.section-label,.intro-grid > *").forEach(el => observer.observe(el));
