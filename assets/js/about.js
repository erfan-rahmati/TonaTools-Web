
// انیمیشن کلیک
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', function (e) {
        if (this.classList.contains('no-click-effect')) return;
        this.style.transform = 'scale(0.98)';
        setTimeout(() => { this.style.transform = ''; }, 150);
    });
});

// اسلایدر گواهینامه‌ها
if (document.querySelector('.certificates-slider')) {
    new Swiper('.certificates-slider', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3000 },
        breakpoints: { 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 } }
    });
}

// اسکرول نرم
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href !== "") {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

