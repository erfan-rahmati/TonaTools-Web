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

            // فعال کردن دکمه فعال در منو
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

                // منوی موبایل
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

// فیلتر دسته‌بندی
const categoryBtns = document.querySelectorAll('.blog-cat-btn');
const blogCards = document.querySelectorAll('.blog-card');
const searchInput = document.getElementById('searchInput');

function filterPosts() {
    const activeCat = document.querySelector('.blog-cat-btn.active').dataset.cat;
    const searchTerm = searchInput?.value.toLowerCase() || '';

    blogCards.forEach(card => {
        const cardCat = card.dataset.category;
        const cardTitle = card.querySelector('h3 a')?.innerText.toLowerCase() || '';
        const cardExcerpt = card.querySelector('.post-excerpt')?.innerText.toLowerCase() || '';

        const matchesCat = activeCat === 'all' || cardCat === activeCat;
        const matchesSearch = searchTerm === '' || cardTitle.includes(searchTerm) || cardExcerpt.includes(searchTerm);

        card.style.display = matchesCat && matchesSearch ? 'block' : 'none';
    });
}

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterPosts();
    });
});

if (searchInput) {
    searchInput.addEventListener('input', filterPosts);
}