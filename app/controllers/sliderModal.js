const modalSlide = () => {
    const swiper1 = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        loop: true,
        watchSlidesProgress: true,
    });

    const swiper2 = new Swiper(".mySwiper2", {
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".next2",
            prevEl: ".prev2",
        },
        thumbs: {
            swiper: swiper1,
        },
    });
}

export default modalSlide