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

            // ری‌اجرای توابع هدر
            if (typeof initHeaderScripts === 'function') {
                initHeaderScripts();
            } else {
                // اگر تابع وجود نداشت، یک بار منو رو مقداردهی کن
                setTimeout(() => {
                    const mobileToggle = document.getElementById('mobileMenuToggle');
                    if (mobileToggle) {
                        mobileToggle.addEventListener('click', () => {
                            const panel = document.getElementById('mobileMenuPanel');
                            const overlay = document.getElementById('mobileMenuOverlay');
                            panel?.classList.add('active');
                            overlay?.classList.add('active');
                            document.body.style.overflow = 'hidden';
                        });
                    }
                    const closeBtn = document.getElementById('closeMobileMenu');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => {
                            const panel = document.getElementById('mobileMenuPanel');
                            const overlay = document.getElementById('mobileMenuOverlay');
                            panel?.classList.remove('active');
                            overlay?.classList.remove('active');
                            document.body.style.overflow = '';
                        });
                    }
                }, 100);
            }

            // فعال کردن دکمه فعال در منو
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            setTimeout(() => {
                document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                        link.classList.remove('active');
                        if (href === currentPage || (currentPage === 'contact.html' && href === 'contact.html')) {
                            link.classList.add('active');
                        }
                    }
                });
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

document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    Swal.fire({
        icon: 'success',
        title: 'پیام شما ارسال شد',
        text: 'کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت',
        confirmButtonText: 'متوجه شدم',
        confirmButtonColor: '#f9ae13'
    });
    this.reset();
});