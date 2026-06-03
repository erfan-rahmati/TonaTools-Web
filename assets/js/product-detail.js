(function () {
    if (window.headerFooterLoaded) return;
    window.headerFooterLoaded = true;

    async function loadHeaderFooter() {
        try {
            const response = await fetch('index.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const header = doc.querySelector('.site-header');
            if (header && !document.querySelector('.site-header')) {
                document.body.insertAdjacentHTML('afterbegin', header.outerHTML);
            }

            const footer = doc.querySelector('.footer-custom');
            if (footer && !document.querySelector('.footer-custom')) {
                document.body.insertAdjacentHTML('beforeend', footer.outerHTML);
            }

            setTimeout(() => {
                const mobileToggle = document.getElementById('mobileMenuToggle');
                const mobilePanel = document.getElementById('mobileMenuPanel');
                const mobileOverlay = document.getElementById('mobileMenuOverlay');
                const closeMobile = document.getElementById('closeMobileMenu');

                if (mobileToggle) {
                    mobileToggle.addEventListener('click', () => {
                        mobilePanel?.classList.add('active');
                        mobileOverlay?.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });
                }
                if (closeMobile) {
                    closeMobile.addEventListener('click', () => {
                        mobilePanel?.classList.remove('active');
                        mobileOverlay?.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                }
                if (mobileOverlay) {
                    mobileOverlay.addEventListener('click', () => {
                        mobilePanel?.classList.remove('active');
                        mobileOverlay?.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                }
            }, 100);

        } catch (error) {
            console.error('خطا:', error);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeaderFooter);
    } else {
        loadHeaderFooter();
    }
})();

// گالری تصاویر
const thumbnails = document.querySelectorAll('.thumbnail-item');
const mainImage = document.querySelector('#mainImage img');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const imgSrc = thumb.dataset.img;
        mainImage.src = imgSrc;

        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});

// تغییر تعداد
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const quantityInput = document.getElementById('quantityInput');
let quantity = 1;

qtyMinus.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
});

qtyPlus.addEventListener('click', () => {
    quantity++;
    quantityInput.value = quantity;
});

// تب‌ها
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`tab-${tabId}`).classList.add('active');
    });
});

// دکمه‌ها
document.getElementById('addToCartBtn')?.addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'افزودن به سبد خرید',
        text: 'محصول با موفقیت به سبد خرید اضافه شد',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#f9ae13'
    });
});

document.getElementById('inquiryBtn')?.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'استعلام قیمت عمده',
        text: 'برای استعلام قیمت عمده با شماره 021-38024 تماس بگیرید',
        confirmButtonText: 'متوجه شدم',
        confirmButtonColor: '#f9ae13'
    });
});

document.getElementById('compareBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        icon: 'success',
        title: 'افزودن به مقایسه',
        text: 'محصول به لیست مقایسه اضافه شد',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#f9ae13'
    });
});

document.getElementById('wishlistBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        icon: 'success',
        title: 'علاقه‌مندی',
        text: 'محصول به لیست علاقه‌مندی‌ها اضافه شد',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#f9ae13'
    });
});

document.getElementById('shareBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        icon: 'info',
        title: 'اشتراک‌گذاری',
        text: 'لینک محصول کپی شد',
        confirmButtonText: 'باشه',
        confirmButtonColor: '#f9ae13'
    });
});

// انتخاب سایز و جنس
const specOptions = document.querySelectorAll('.spec-option');
specOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        const parent = opt.parentElement;
        parent.querySelectorAll('.spec-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
    });
});