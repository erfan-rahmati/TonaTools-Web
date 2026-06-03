// ==================== لود هدر و فوتر از صفحه اصلی ====================
(function () {
    // فقط یک بار اجرا شود
    if (window.headerFooterLoaded) return;
    window.headerFooterLoaded = true;

    // تابع استخراج هدر از صفحه اصلی
    async function loadHeaderFooter() {
        try {
            const response = await fetch('index.html');
            const html = await response.text();

            // ایجاد یک المان موقت برای پردازش HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // استخراج هدر
            const header = doc.querySelector('.site-header');
            if (header && !document.querySelector('.site-header')) {
                document.body.insertAdjacentHTML('afterbegin', header.outerHTML);
            }

            // استخراج فوتر
            const footer = doc.querySelector('.footer-custom');
            if (footer && !document.querySelector('.footer-custom')) {
                document.body.insertAdjacentHTML('beforeend', footer.outerHTML);
            }

            // ری‌اجرای اسکریپت‌های هدر (منوی موبایل و...)
            initHeaderScripts();

        } catch (error) {
            console.error('خطا در لود هدر و فوتر:', error);
        }
    }

    // توابع مورد نیاز هدر
    function initHeaderScripts() {
        // منوی موبایل
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mobilePanel = document.getElementById('mobileMenuPanel');
        const mobileOverlay = document.getElementById('mobileMenuOverlay');
        const closeMobile = document.getElementById('closeMobileMenu');

        function openMobileMenu() {
            mobilePanel?.classList.add('active');
            mobileOverlay?.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobilePanel?.classList.remove('active');
            mobileOverlay?.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
        if (closeMobile) closeMobile.addEventListener('click', closeMobileMenu);
        if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

        // ساب‌منوی موبایل
        const mobileCategoryTrigger = document.querySelector('.mobile-category-trigger');
        if (mobileCategoryTrigger) {
            mobileCategoryTrigger.addEventListener('click', function (e) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                const icon = this.querySelector('.trigger-icon');
                submenu?.classList.toggle('active');
                this.classList.toggle('active');
                if (submenu?.classList.contains('active')) {
                    icon.style.transform = 'rotate(-90deg)';
                } else {
                    icon.style.transform = 'rotate(0)';
                }
            });
        }

        // مودال جستجو
        const searchTrigger = document.getElementById('searchTrigger');
        const searchOverlayElem = document.getElementById('searchOverlay');
        const closeSearchBtn = document.getElementById('closeSearchBtn');
        const searchInputElem = document.getElementById('searchInput');

        function openSearchModal() {
            searchOverlayElem?.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInputElem?.focus(), 300);
        }

        function closeSearchModal() {
            searchOverlayElem?.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (searchTrigger) searchTrigger.addEventListener('click', openSearchModal);
        if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearchModal);
        if (searchOverlayElem) {
            searchOverlayElem.addEventListener('click', (e) => {
                if (e.target === searchOverlayElem) closeSearchModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlayElem?.classList.contains('active')) {
                closeSearchModal();
            }
        });

        // مگامنو در موبایل
        if (window.innerWidth <= 992) {
            const categoryLi = document.getElementById('categoryDropdownLi');
            const megaMenuDiv = document.getElementById('categoryDropdownMenu');
            if (categoryLi) {
                categoryLi.addEventListener('click', (e) => {
                    if (e.target.closest('.dropdown-toggle')) {
                        e.preventDefault();
                        megaMenuDiv?.classList.toggle('active');
                    }
                });
            }
        }

        // انیمیشن کلیک
        document.querySelectorAll('.mobile-nav-link, .mobile-submenu li a, .dropdown-toggle, .search-trigger-modern, .ai-assistant-btn').forEach(el => {
            el.addEventListener('click', function (e) {
                if (this.classList.contains('no-click-effect')) return;
                this.style.transform = 'scale(0.98)';
                setTimeout(() => { this.style.transform = ''; }, 150);
            });
        });
    }

    // اجرا بعد از بارگذاری کامل صفحه
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeaderFooter);
    } else {
        loadHeaderFooter();
    }
})();

