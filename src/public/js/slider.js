new Swiper(".swiper-container", {
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

