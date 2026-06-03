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
                document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                        link.classList.remove('active');
                        if (href === 'blog.html') {
                            link.classList.add('active');
                        }
                    }
                });

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