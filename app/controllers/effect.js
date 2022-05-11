const headerMenu = document.querySelector(".headerPhone");
const menuItems = headerMenu.querySelectorAll(".menu-link");

const menuType = document.querySelectorAll(".type-link");

menuType.forEach((e) => {
    e.addEventListener("click", () => {
        for (let type of menuType) {
            type.classList.remove("active");
        }
        e.classList.add("active");
    });
});

const swiperHeader = new Swiper(".swiper-header", {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

const swiperCarou = new Swiper(".swiperCarousel", {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 3800,
        disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

const swiperBrand = new Swiper(".swiperBrand", {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 3800,
        disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});


