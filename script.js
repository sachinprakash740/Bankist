'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// scroll To

const scrollTo = document.querySelector('.btn--scroll-to');

// scroll to for each links

const scrollToEach = document.querySelectorAll('.nav__link');

// section --  hidden

const sectionHidden = document.querySelectorAll('.section');

//  lazy loading

const lazyImg = document.querySelectorAll('.features__img');

// operation contents

const operationsTab = document.querySelectorAll('.operations__tab');
const contentTab = document.querySelectorAll('.operations__content');

// slider

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

// const openModal = function () {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});

btnCloseModal.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

overlay.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

// scroll TO

scrollTo.addEventListener('click', function () {
  document.querySelector('#section--1').scrollIntoView({ behavior: 'smooth' });
});

// scroll to each

scrollToEach.forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    let id = el.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

scrollToEach.forEach(el => {
  el.addEventListener('mouseover', function () {
    scrollToEach.forEach(el => {
      el.style.opacity = 0.5;
    });
    el.style.opacity = 1;
  });
  el.addEventListener('mouseout', function () {
    scrollToEach.forEach(el => {
      el.style.opacity = 1;
    });
  });
});

// sction-- hidden

sectionHidden.forEach(sec => {
  sec.classList.add('section--hidden');
  const sectionObserver = new IntersectionObserver(
    function (entries, unobserver) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        sec.classList.remove('section--hidden');
        unobserver.unobserve(sec);
      }
    },
    {
      root: null,
      threshold: 0.15,
    }
  );
  sectionObserver.observe(sec);
});

// lazy loading

lazyImg.forEach(img => {
  const imageObserver = new IntersectionObserver(
    function (entries, unobserver) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        img.src = img.dataset.src;

        img.addEventListener('load', function () {
          img.classList.remove('lazy-img');
        });
        unobserver.unobserve(img);
      }
    },
    {
      margin: null,
      threshold: 0.15,
    }
  );
  imageObserver.observe(img);
});

operationsTab.forEach(tab => {
  tab.addEventListener('click', function () {
    operationsTab.forEach(tab => {
      tab.classList.remove('operations__tab--active');
    });
    tab.classList.add('operations__tab--active');
    contentTab.forEach(con => {
      con.classList.remove('operations__content--active');
    });
    document
      .querySelector(`.operations__content--${tab.dataset.tab}`)
      .classList.add('operations__content--active');
  });
});

// slider

let mark = 0;
const sliderLength = slides.length;
// slider.style.scale = 0.3;
// slider.style.transform = 'translateX(-1200px)';
// slider.style.overflow = 'visible';

slides.forEach((sld, i) => {
  sld.style.transform = `translateX(${i * 100}%)`;
});

document
  .querySelector('.slider__btn--right')
  .addEventListener('click', function () {
    if (mark === slides.length - 1) mark = 0;
    else mark++;
    slides.forEach((sld, i) => {
      sld.style.transform = `translateX(${100 * (i - mark)}%)`;
    });
  });

document
  .querySelector('.slider__btn--left')
  .addEventListener('click', function () {
    if (mark === 0) mark = slides.length - 1;
    else mark--;
    slides.forEach((sld, i) => {
      sld.style.transform = `translateX(${100 * (i - mark)}%)`;
    });
  });
