const swiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 60,
  // loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    768: { 
      slidesPerView: 2,
    },  
    480: {
      slidesPerView: 1,
    },
  },  
});

const manager = new Swiper(".slider-manager", {
  slidesPerView: 2,
  spaceBetween: 20,
  navigation: {
    nextEl: ".slider-manager .swiper-button-next",
    prevEl: ".slider-manager .swiper-button-prev",
  },
  pagination: {        
    el: ".slider-manager .swiper-pagination",
    clickable: true,
  },
});

