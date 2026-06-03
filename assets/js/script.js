
// ==================== اسکریپت یکپارچه تونا تولز ====================
(function () {
    'use strict';

    // ==================== فعال کردن دکمه فعال در منو ====================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        const allNavLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
        allNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                link.classList.remove('active');
                if (href === currentPage ||
                    (currentPage === 'index.html' && href === 'index.html') ||
                    (currentPage === '' && href === 'index.html')) {
                    link.classList.add('active');
                }
            }
        });
    }

    // ==================== منوی موبایل ====================
    function initMobileMenu() {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mobilePanel = document.getElementById('mobileMenuPanel');
        const mobileOverlay = document.getElementById('mobileMenuOverlay');
        const closeMobile = document.getElementById('closeMobileMenu');

        if (!mobileToggle || !mobilePanel || !mobileOverlay) {
            setTimeout(initMobileMenu, 100);
            return;
        }

        function openMobileMenu() {
            mobilePanel.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            mobilePanel.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        mobileToggle.removeEventListener('click', openMobileMenu);
        mobileToggle.addEventListener('click', openMobileMenu);

        if (closeMobile) {
            closeMobile.removeEventListener('click', closeMobileMenu);
            closeMobile.addEventListener('click', closeMobileMenu);
        }

        mobileOverlay.removeEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);

        document.querySelectorAll('.mobile-nav-link, .mobile-submenu li a').forEach(link => {
            link.removeEventListener('click', closeMobileMenu);
            link.addEventListener('click', closeMobileMenu);
        });
    }

    function handleCategoryClick(e) {
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
    }

    // ==================== مودال جستجو ====================
    function initSearchModal() {
        const searchTrigger = document.getElementById('searchTrigger');
        const searchOverlayElem = document.getElementById('searchOverlay');
        const closeSearchBtn = document.getElementById('closeSearchBtn');
        const searchInputElem = document.getElementById('searchInput');

        if (!searchTrigger) return;

        function openSearchModal() {
            searchOverlayElem?.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInputElem?.focus(), 300);
        }

        function closeSearchModal() {
            searchOverlayElem?.classList.remove('active');
            document.body.style.overflow = '';
        }

        searchTrigger.removeEventListener('click', openSearchModal);
        searchTrigger.addEventListener('click', openSearchModal);

        if (closeSearchBtn) {
            closeSearchBtn.removeEventListener('click', closeSearchModal);
            closeSearchBtn.addEventListener('click', closeSearchModal);
        }

        if (searchOverlayElem) {
            searchOverlayElem.removeEventListener('click', function (e) {
                if (e.target === searchOverlayElem) closeSearchModal();
            });
            searchOverlayElem.addEventListener('click', function (e) {
                if (e.target === searchOverlayElem) closeSearchModal();
            });
        }

        document.removeEventListener('keydown', closeSearchOnEsc);
        document.addEventListener('keydown', closeSearchOnEsc);

        function closeSearchOnEsc(e) {
            if (e.key === 'Escape' && searchOverlayElem?.classList.contains('active')) {
                closeSearchModal();
            }
        }
    }

    // ==================== ابتدا تابع initHomeSlider رو تعریف کن ====================
    function initHomeSlider() {
        if (typeof Swiper === 'undefined') {
            setTimeout(initHomeSlider, 200);
            return;
        }

        const homeSlider = document.getElementById('homeSlider');
        if (homeSlider) {
            if (window.homeSwiper) {
                window.homeSwiper.destroy(true, true);
            }

            const slidesCount = document.querySelectorAll('#homeSlider .swiper-slide').length;
            console.log(`تعداد اسلایدها: ${slidesCount}`);

            window.homeSwiper = new Swiper('#homeSlider', {
                loop: slidesCount > 1,
                autoplay: slidesCount > 1 ? { delay: 5000, disableOnInteraction: false } : false,
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                speed: 800,
            });
            console.log('اسلایدر مقداردهی شد');
        }
    }

    // ==================== سپس تابع loadSliders رو تعریف کن ====================

    async function loadSliders() {
        if (typeof Swiper === 'undefined') {
            setTimeout(loadSliders, 200);
            return;
        }

        const swiperWrapper = document.querySelector('#homeSlider .swiper-wrapper');
        if (!swiperWrapper) return;

        swiperWrapper.innerHTML = `<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:400px;">در حال بارگذاری...</div></div>`;

        try {
            const response = await fetch('https://192.168.1.158:7260/api/v1/Api/slider?id=1', {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const result = await response.json();

            if (result.success && result.data && result.data.length > 0) {
                const slidesHtml = result.data.map(slide => `
                <div class="swiper-slide">
                    <a href="${slide.link || '#'}">
                        <img src="https://192.168.1.158:7260${slide.imageUrl}" alt="${slide.title || 'اسلایدر'}" style="width:100%; height:400px; object-fit:cover;">
                    </a>
                </div>
            `).join('');

                swiperWrapper.innerHTML = slidesHtml;
                console.log(`${result.data.length} اسلایدر لود شد`);
            }

            initHomeSlider();

        } catch (error) {
            console.error('خطا:', error);
            initHomeSlider();
        }
    }

    // ==================== اسلایدرهای محصولات ====================
    function initProductSliders() {
        if (typeof Swiper === 'undefined') {
            setTimeout(initProductSliders, 200);
            return;
        }

        console.log('ساخت اسلایدرهای محصولات...');

        // محصولات بست کمربندی
        if (document.getElementById('beltProductsSwiper')) {
            if (window.beltSwiper) window.beltSwiper.destroy(true, true);
            window.beltSwiper = new Swiper('#beltProductsSwiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                autoplay: { delay: 4000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }
            });
            console.log('اسلایدر بست کمربندی ساخته شد');
        }

        // محصولات وایر شو
        if (document.getElementById('wireShaProductsSwiper')) {
            if (window.wireSwiper) window.wireSwiper.destroy(true, true);
            window.wireSwiper = new Swiper('#wireShaProductsSwiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                autoplay: { delay: 4000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }
            });
            console.log('اسلایدر وایر شو ساخته شد');
        }

        // محصولات ابزار
        if (document.getElementById('toolsProductsSwiper')) {
            if (window.toolsSwiper) window.toolsSwiper.destroy(true, true);
            window.toolsSwiper = new Swiper('#toolsProductsSwiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                autoplay: { delay: 4000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }
            });
            console.log('اسلایدر ابزار ساخته شد');
        }

        // محصولات نوار چسب
        if (document.getElementById('tapeProductsSwiper')) {
            if (window.tapeSwiper) window.tapeSwiper.destroy(true, true);
            window.tapeSwiper = new Swiper('#tapeProductsSwiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                autoplay: { delay: 4000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }
            });
            console.log('اسلایدر نوار چسب ساخته شد');
        }
    }

    // ==================== دسته‌بندی محصولات (با تصاویر از دیتابیس) ====================
    // ==================== دسته‌بندی محصولات (با حلقه forEach) ====================
    async function loadCategories() {
        console.log('loadCategories شروع شد');

        const categoryGrid = document.getElementById('categoryGrid');
        if (!categoryGrid) {
            console.error('categoryGrid پیدا نشد!');
            return;
        }

        // نمایش لودینگ
        categoryGrid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:50px;">
            <i class="fas fa-spinner fa-pulse" style="font-size:40px; color:#f9ae13;"></i>
            <p style="margin-top:15px;">در حال بارگذاری دسته‌بندی‌ها...</p>
        </div>
    `;

        try {
            const response = await fetch('https://192.168.1.158:7260/api/v1/Api/categories', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('پاسخ API دسته‌بندی:', result);

            let categories = [];
            if (result.success && result.data && Array.isArray(result.data)) {
                categories = result.data;
            }

            console.log('تعداد دسته‌بندی‌ها:', categories.length);

            if (categories.length > 0) {
                let categoriesHtml = '';

                // حلقه forEach برای ساخت HTML هر دسته‌بندی
                categories.forEach(cat => {
                    const categoryName = cat.name || cat.title || 'دسته‌بندی';
                    const categoryLink = `category-detail.html?category=${encodeURIComponent(categoryName)}&id=${cat.id}`;

                    let imageUrl = cat.imageUrl || '';
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = `https://192.168.1.158:7260${imageUrl}`;
                    }

                    let imageHtml = '';
                    if (imageUrl) {
                        imageHtml = `<img src="${imageUrl}" alt="${categoryName}" class="category-image" 
                                    style="width:100%; height:140px; object-fit:contain;"
                                    onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\'width:100%; height:140px; background:#f8f9fc; display:flex; align-items:center; justify-content:center; border-radius:16px;\'><i class=\'fas fa-image\' style=\'font-size:50px; color:#f9ae13;\'></i></div>'">`;
                    } else {
                        imageHtml = `<div style="width:100%; height:140px; background:#f8f9fc; display:flex; align-items:center; justify-content:center; border-radius:16px;">
                                    <i class="fas fa-image" style="font-size:50px; color:#f9ae13;"></i>
                                </div>`;
                    }

                    categoriesHtml += `
                    <div class="category-card" data-category-id="${cat.id}">
                        <div class="card-bg-pattern"></div>
                        <div class="card-image-wrapper">
                            ${imageHtml}
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">${escapeHtml(categoryName)}</h3>
                            <a href="${categoryLink}" class="card-link">
                                <span>مشاهده محصولات</span>
                                <i class="fas fa-arrow-left"></i>
                            </a>
                        </div>
                    </div>
                `;
                });

                categoryGrid.innerHTML = categoriesHtml;
                console.log(`${categories.length} دسته‌بندی با موفقیت لود شد`);
            } else {
                console.warn('هیچ دسته‌بندی از API دریافت نشد');
                categoryGrid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:50px;">
                    <i class="fas fa-info-circle" style="font-size:40px; color:#f9ae13;"></i>
                    <p>هیچ دسته‌بندی یافت نشد</p>
                </div>
            `;
            }

        } catch (error) {
            console.error('خطا در لود دسته‌بندی:', error);
            categoryGrid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:50px;">
                <i class="fas fa-exclamation-triangle" style="font-size:40px; color:#ef4444;"></i>
                <p>خطا در بارگذاری دسته‌بندی‌ها</p>
                <button onclick="loadCategories()" style="margin-top:15px; padding:8px 20px; background:#f9ae13; border:none; border-radius:20px; cursor:pointer;">تلاش مجدد</button>
            </div>
        `;
        }
    }

    // تابع کمکی برای جلوگیری از XSS
    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/[&<>]/g, function (m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    // تابع کمکی برای جلوگیری از XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // تابع آپدیت و ریفرش اسلایدر
    function updateSwiper(swiperId) {
        let swiperInstance = null;

        // شناسایی اسلایدر مناسب
        if (swiperId === 'beltProductsSwiper') swiperInstance = window.beltSwiper;
        else if (swiperId === 'wireShaProductsSwiper') swiperInstance = window.wireSwiper;
        else if (swiperId === 'toolsProductsSwiper') swiperInstance = window.toolsSwiper;
        else if (swiperId === 'tapeProductsSwiper') swiperInstance = window.tapeSwiper;

        if (swiperInstance) {
            // آپدیت اسلایدر
            swiperInstance.update();
            swiperInstance.updateSlides();
            swiperInstance.updateSlidesClasses();
            swiperInstance.updateSize();
            console.log('اسلایدر ' + swiperId + ' آپدیت شد');
        } else {
            console.log('اسلایدر ' + swiperId + ' پیدا نشد، شاید هنوز ساخته نشده');
        }
    }

    // ==================== لود محصولات بر اساس دسته‌بندی ====================
    async function loadProductsByCategory(categoryId, containerId, swiperId, categoryName) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log('کانتینر ' + containerId + ' پیدا نشد');
            return;
        }

        // نمایش لودینگ
        container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><i class="fas fa-spinner fa-pulse" style="font-size:30px; color:#f9ae13;"></i><span style="margin-right:10px;">در حال بارگذاری...</span></div></div>';

        try {
            const response = await fetch('https://192.168.1.158:7260/api/v1/Api/home-products?categoryid=3', {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const result = await response.json();
            let products = (result.success && result.data) ? result.data : [];

            if (products.length > 0) {
                let productsHtml = '';

                for (let i = 0; i < products.length; i++) {
                    const product = products[i];
                    const productName = product.name || product.title || 'محصول';
                    const productModel = product.model || product.sku || '';
                    const productPrice = product.price || 'استعلام قیمت';
                    const productBadge = (productPrice === 'استعلام قیمت') ? 'استعلام قیمت' : 'موجود';

                    let imageUrl = product.imageUrl || product.image || 'assets/image/placeholder.jpg';
                    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('assets')) {
                        imageUrl = 'https://192.168.1.158:7260' + imageUrl;
                    }

                    productsHtml += `
                    <div class="swiper-slide">
                        <div class="product-card" data-product-id="${product.id}">
                            <div class="product-actions">
                                <button class="action-btn" title="مقایسه"><i class="fas fa-chart-simple"></i></button>
                                <button class="action-btn" title="علاقه‌مندی"><i class="far fa-heart"></i></button>
                                <button class="action-btn" title="مشاهده سریع"><i class="far fa-eye"></i></button>
                            </div>
                            <div class="product-image">
                                <img src="${imageUrl}" alt="${productName}">
                                <div class="product-badge">${productBadge}</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${productName}</h3>
                                <div class="product-meta">
                                    <span class="brand">برند: تونا تولز</span>
                                    <span class="model">مدل: ${productModel}</span>
                                </div>
                                <div class="product-divider"></div>
                                <div class="product-footer">
                                    <div class="price-status">
                                        <i class="fas fa-phone-alt"></i>
                                        <span>${productPrice}</span>
                                    </div>
                                    <button class="inquiry-btn"><i class="fas fa-info-circle"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }

                container.innerHTML = productsHtml;
                console.log(categoryName + ': ' + products.length + ' محصول لود شد');

                // آپدیت اسلایدر بعد از لود محصولات
                setTimeout(function () {
                    updateSwiper(swiperId);
                }, 200);

            } else {
                container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><p>هیچ محصولی یافت نشد</p></div></div>';
                setTimeout(function () {
                    updateSwiper(swiperId);
                }, 100);
            }

        } catch (error) {
            console.error('خطا در لود محصولات ' + categoryName + ':', error);
            container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><p>خطا در بارگذاری</p></div></div>';
            setTimeout(function () {
                updateSwiper(swiperId);
            }, 100);
        }
    }

    async function loadProductsByCategoryw(categoryId, containerId, swiperId, categoryName) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log('کانتینر ' + containerId + ' پیدا نشد');
            return;
        }

        // نمایش لودینگ
        container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><i class="fas fa-spinner fa-pulse" style="font-size:30px; color:#f9ae13;"></i><span style="margin-right:10px;">در حال بارگذاری...</span></div></div>';

        try {
            const response = await fetch('https://192.168.1.158:7260/api/v1/Api/home-products?categoryid=4', {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const result = await response.json();
            let products = (result.success && result.data) ? result.data : [];

            if (products.length > 0) {
                let productsHtml = '';

                for (let i = 0; i < products.length; i++) {
                    const product = products[i];
                    const productName = product.name || product.title || 'محصول';
                    const productModel = product.model || product.sku || '';
                    const productPrice = product.price || 'استعلام قیمت';
                    const productBadge = (productPrice === 'استعلام قیمت') ? 'استعلام قیمت' : 'موجود';

                    let imageUrl = product.imageUrl || product.image || 'assets/image/placeholder.jpg';
                    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('assets')) {
                        imageUrl = 'https://192.168.1.158:7260' + imageUrl;
                    }

                    productsHtml += `
                    <div class="swiper-slide">
                        <div class="product-card">
                            <div class="product-actions">
                                <button class="action-btn" title="مقایسه"><i class="fas fa-chart-simple"></i></button>
                                <button class="action-btn" title="علاقه‌مندی"><i class="far fa-heart"></i></button>
                                <button class="action-btn" title="مشاهده سریع"><i class="far fa-eye"></i></button>
                            </div>
                            <div class="product-image">
                                <img src="${imageUrl}" alt="${productName}">
                                <div class="product-badge">${productBadge}</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${productName}</h3>
                                <div class="product-meta">
                                    <span class="brand">برند: تونا تولز</span>
                                    <span class="model">مدل: ${productModel}</span>
                                </div>
                                <div class="product-divider"></div>
                                <div class="product-footer">
                                    <div class="price-status">
                                        <i class="fas fa-phone-alt"></i>
                                        <span>${productPrice}</span>
                                    </div>
                                    <button class="inquiry-btn"><i class="fas fa-info-circle"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }

                container.innerHTML = productsHtml;
                console.log(categoryName + ': ' + products.length + ' محصول لود شد');

                // آپدیت اسلایدر بعد از لود محصولات
                setTimeout(function () {
                    updateSwiper(swiperId);
                }, 200);

            } else {
                container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><p>هیچ محصولی یافت نشد</p></div></div>';
                setTimeout(function () {
                    updateSwiper(swiperId);
                }, 100);
            }

        } catch (error) {
            console.error('خطا در لود محصولات ' + categoryName + ':', error);
            container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><p>خطا در بارگذاری</p></div></div>';
            setTimeout(function () {
                updateSwiper(swiperId);
            }, 100);
        }
    }

    async function loadProductsByCategoryb(categoryId, containerId, swiperId, categoryName) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log('کانتینر ' + containerId + ' پیدا نشد');
            return;
        }

        // نمایش لودینگ
        container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><i class="fas fa-spinner fa-pulse" style="font-size:30px; color:#f9ae13;"></i><span style="margin-right:10px;">در حال بارگذاری...</span></div></div>';

        try {
            const response = await fetch('https://192.168.1.158:7260/api/v1/Api/home-products?categoryid=1', {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const result = await response.json();
            let products = (result.success && result.data) ? result.data : [];

            if (products.length > 0) {
                let productsHtml = '';

                for (let i = 0; i < products.length; i++) {
                    const product = products[i];
                    const productName = product.name || product.title || 'محصول';
                    const productModel = product.model || product.sku || '';
                    const productPrice = product.price || 'استعلام قیمت';
                    const productBadge = (productPrice === 'استعلام قیمت') ? 'استعلام قیمت' : 'موجود';

                    let imageUrl = product.imageUrl || product.image || 'assets/image/placeholder.jpg';
                    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('assets')) {
                        imageUrl = 'https://192.168.1.158:7260' + imageUrl;
                    }

                    productsHtml += `
                    <div class="swiper-slide">
                        <div class="product-card">
                            <div class="product-actions">
                                <button class="action-btn" title="مقایسه"><i class="fas fa-chart-simple"></i></button>
                                <button class="action-btn" title="علاقه‌مندی"><i class="far fa-heart"></i></button>
                                <button class="action-btn" title="مشاهده سریع"><i class="far fa-eye"></i></button>
                            </div>
                            <div class="product-image">
                                <img src="${imageUrl}" alt="${productName}">
                                <div class="product-badge">${productBadge}</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${productName}</h3>
                                <div class="product-meta">
                                    <span class="brand">برند: تونا تولز</span>
                                    <span class="model">مدل: ${productModel}</span>
                                </div>
                                <div class="product-divider"></div>
                                <div class="product-footer">
                                    <div class="price-status">
                                        <i class="fas fa-phone-alt"></i>
                                        <span>${productPrice}</span>
                                    </div>
                                    <button class="inquiry-btn"><i class="fas fa-info-circle"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }

                container.innerHTML = productsHtml;
                console.log(categoryName + ': ' + products.length + ' محصول لود شد');

                // آپدیت اسلایدر بعد از لود محصولات
                setTimeout(function () {
                    updateSwiper(swiperId);
                }, 200);

            } else {
                container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><p>هیچ محصولی یافت نشد</p></div></div>';
                setTimeout(function () {
                    updateSwiper(swiperId);
                }, 100);
            }

        } catch (error) {
            console.error('خطا در لود محصولات ' + categoryName + ':', error);
            container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><p>خطا در بارگذاری</p></div></div>';
            setTimeout(function () {
                updateSwiper(swiperId);
            }, 100);
        }
    }

    async function loadProductsByCategoryc(categoryId, containerId, swiperId, categoryName) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log('کانتینر ' + containerId + ' پیدا نشد');
            return;
        }

        // نمایش لودینگ
        container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><i class="fas fa-spinner fa-pulse" style="font-size:30px; color:#f9ae13;"></i><span style="margin-right:10px;">در حال بارگذاری...</span></div></div>';

        try {
            const response = await fetch('https://192.168.1.158:7260/api/v1/Api/home-products?categoryid=2', {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            const result = await response.json();
            let products = (result.success && result.data) ? result.data : [];

            if (products.length > 0) {
                let productsHtml = '';

                for (let i = 0; i < products.length; i++) {
                    const product = products[i];
                    const productName = product.name || product.title || 'محصول';
                    const productModel = product.model || product.sku || '';
                    const productPrice = product.price || 'استعلام قیمت';
                    const productBadge = (productPrice === 'استعلام قیمت') ? 'استعلام قیمت' : 'موجود';

                    let imageUrl = product.imageUrl || product.image || 'assets/image/placeholder.jpg';
                    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('assets')) {
                        imageUrl = 'https://192.168.1.158:7260' + imageUrl;
                    }

                    productsHtml += `
                    <div class="swiper-slide">
                        <div class="product-card">
                            <div class="product-actions">
                                <button class="action-btn" title="مقایسه"><i class="fas fa-chart-simple"></i></button>
                                <button class="action-btn" title="علاقه‌مندی"><i class="far fa-heart"></i></button>
                                <button class="action-btn" title="مشاهده سریع"><i class="far fa-eye"></i></button>
                            </div>
                            <div class="product-image">
                                <img src="${imageUrl}" alt="${productName}">
                                <div class="product-badge">${productBadge}</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${productName}</h3>
                                <div class="product-meta">
                                    <span class="brand">برند: تونا تولز</span>
                                    <span class="model">مدل: ${productModel}</span>
                                </div>
                                <div class="product-divider"></div>
                                <div class="product-footer">
                                    <div class="price-status">
                                        <i class="fas fa-phone-alt"></i>
                                        <span>${productPrice}</span>
                                    </div>
                                    <button class="inquiry-btn"><i class="fas fa-info-circle"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }

                container.innerHTML = productsHtml;
                console.log(categoryName + ': ' + products.length + ' محصول لود شد');

                // آپدیت اسلایدر بعد از لود محصولات
                setTimeout(function () {
                    updateSwiper(swiperId);
                }, 200);

            } else {
                container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><p>هیچ محصولی یافت نشد</p></div></div>';
                setTimeout(function () {
                    updateSwiper(swiperId);
                }, 100);
            }

        } catch (error) {
            console.error('خطا در لود محصولات ' + categoryName + ':', error);
            container.innerHTML = '<div class="swiper-slide"><div style="display:flex; justify-content:center; align-items:center; height:300px;"><p>خطا در بارگذاری</p></div></div>';
            setTimeout(function () {
                updateSwiper(swiperId);
            }, 100);
        }
    }

    // ==================== کنترل پخش ویدیو ====================
    function initVideoPlayer() {
        const aboutVideo = document.getElementById('aboutVideo');
        const videoPlayBtn = document.getElementById('videoPlayBtn');

        if (aboutVideo && videoPlayBtn) {
            videoPlayBtn.addEventListener('click', function () {
                if (aboutVideo.paused) {
                    aboutVideo.play();
                    videoPlayBtn.classList.add('hide');
                } else {
                    aboutVideo.pause();
                    videoPlayBtn.classList.remove('hide');
                }
            });
            aboutVideo.addEventListener('ended', () => videoPlayBtn.classList.remove('hide'));
            aboutVideo.addEventListener('play', () => videoPlayBtn.classList.add('hide'));
        }
    }

    // ==================== مودال محصول (داینامیک با API) ====================
    let currentImageIndex = 0;
    let currentImages = [];

    // تابع دریافت اطلاعات محصول از API با id
    async function fetchProductDetails(productId) {
        try {
            const response = await fetch(`https://192.168.1.158:7260/api/v1/Api/product-quick/${productId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('پاسخ API محصول:', result);

            if (result.success && result.data) {
                return result.data;
            } else {
                throw new Error('داده‌ای یافت نشد');
            }

        } catch (error) {
            console.error('خطا در دریافت اطلاعات محصول:', error);
            return null;
        }
    }

    // تابع ساخت آدرس کامل تصویر
    function getFullImageUrl(imageUrl) {
        if (!imageUrl) return 'assets/image/placeholder.jpg';
        if (imageUrl.startsWith('http')) return imageUrl;
        if (imageUrl.startsWith('assets')) return imageUrl;
        return `https://192.168.1.158:7260${imageUrl}`;
    }

    // تابع ساخت گالری تصاویر از API
    function buildGalleryImages(productData) {
        let images = [];

        // اضافه کردن تصویر اصلی
        if (productData.imageUrl) {
            images.push(getFullImageUrl(productData.imageUrl));
        }

        // اضافه کردن تصاویر گالری
        if (productData.gallery && productData.gallery.length > 0) {
            productData.gallery.forEach(img => {
                if (img.imageUrl) {
                    images.push(getFullImageUrl(img.imageUrl));
                }
            });
        }

        // اگر هیچ تصویری نبود، از تصویر پیش‌فرض استفاده کن
        if (images.length === 0) {
            images = ['assets/image/placeholder.jpg'];
        }

        return images;
    }

    // تابع دریافت نام دسته‌بندی برای badge
    function getCategoryBadge(categoryName) {
        const categoryMap = {
            'بست کمربندی': 'بست کمربندی',
            'ابزار صنعتی': 'ابزار صنعتی',
            'نوار چسب': 'نوار چسب',
            'وایرشو': 'وایر شو',
            'وایر شو': 'وایر شو'
        };
        return categoryMap[categoryName] || 'محصولات';
    }

    // تابع دریافت وضعیت موجودی و قیمت
    function getPriceStatus(price, hasPrice, stock) {
        if (hasPrice === false || price === null || price === 0) {
            return {
                type: 'inquiry',
                html: `<div class="price-box">
                        <i class="fas fa-phone-alt"></i>
                        <div class="price-text">
                            <span class="price-label">استعلام قیمت</span>
                            <span class="price-note">برای اطلاع از قیمت تماس بگیرید</span>
                        </div>
                    </div>`
            };
        } else {
            const priceFormatted = price.toLocaleString() + ' تومان';
            return {
                type: 'price',
                html: `<div class="price-box">
                        <i class="fas fa-tag"></i>
                        <div class="price-text">
                            <span class="price-label">${priceFormatted}</span>
                            <span class="price-note">قیمت شامل ۹% مالیات</span>
                        </div>
                    </div>`
            };
        }
    }

    // تابع دریافت مشخصات فنی (از روی محصول یا پیش‌فرض)
    function getProductSpecs(productData) {
        const specs = [
            { label: 'برند', value: 'تونا تولز' },
            { label: 'مدل', value: productData.productCode || 'نامشخص' },
            { label: 'دسته‌بندی', value: productData.categoryName || 'محصولات' },
            { label: 'گارانتی', value: '۱۸ ماهه' }
        ];
        return specs;
    }

    function updateMainImage() {
        const mainImg = document.getElementById('modalProductImage');
        if (mainImg && currentImages.length) {
            mainImg.src = currentImages[currentImageIndex];
        }
        document.querySelectorAll('.modal-thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentImageIndex);
        });
    }

    function nextImage() {
        if (currentImages.length <= 1) return;
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        updateMainImage();
    }

    function prevImage() {
        if (currentImages.length <= 1) return;
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        updateMainImage();
    }

    function buildThumbnails(images) {
        const container = document.getElementById('modalThumbnails');
        if (!container) return;
        container.innerHTML = images.map((img, idx) => `
        <div class="modal-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
            <img src="${img}" alt="تصویر محصول">
        </div>
    `).join('');
        document.querySelectorAll('.modal-thumb').forEach(thumb => {
            thumb.removeEventListener('click', handleThumbClick);
            thumb.addEventListener('click', handleThumbClick);
        });
    }

    function handleThumbClick() {
        currentImageIndex = parseInt(this.dataset.index);
        updateMainImage();
    }

    async function openModal(productId) {
        const modalOverlayElem = document.getElementById('productModalOverlay');
        if (!modalOverlayElem) return;

        // نمایش لودینگ در مودال
        document.getElementById('modalProductTitle').innerHTML = 'در حال بارگذاری...';
        document.getElementById('modalProductCategory').innerHTML = '...';

        modalOverlayElem.style.display = 'flex';
        setTimeout(() => modalOverlayElem.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';

        // دریافت اطلاعات محصول از API
        const productData = await fetchProductDetails(productId);

        if (!productData) {
            // اگر خطا رخ داد
            document.getElementById('modalProductTitle').innerHTML = 'خطا در بارگذاری اطلاعات';
            document.getElementById('modalProductDescription').innerHTML = 'لطفاً مجدداً تلاش کنید';
            return;
        }

        console.log('اطلاعات محصول:', productData);

        // تنظیم اطلاعات در مودال
        const categoryName = productData.categoryName || 'محصولات';
        const productTitle = productData.nameFa || productData.nameEn || 'محصول';
        const productCode = productData.productCode || `TONA-${productData.id}`;
        const productUrl = productData.urlShow || `product-detail.html?id=${productData.id}`;

        // تنظیم badge
        const categoryBadge = getCategoryBadge(categoryName);
        document.getElementById('modalProductCategory').innerHTML = categoryBadge;

        // تنظیم عنوان
        document.getElementById('modalProductTitle').innerHTML = productTitle;

        // تنظیم برند و مدل
        document.getElementById('modalProductBrand').innerHTML = 'تونا تولز';
        document.getElementById('modalProductModel').innerHTML = productCode;
        document.getElementById('modalProductCode').innerHTML = productCode;

        // تنظیم توضیحات
        const description = productData.shortdescription || `محصول ${productTitle} از برند تونا تولز با کیفیت بالا و گارانتی معتبر. مناسب برای مصارف صنعتی و حرفه‌ای.`;
        document.getElementById('modalProductDescription').innerHTML = description;

        // تنظیم badge محصول
        const hasPrice = productData.hasPrice === true && productData.price > 0;
        const productBadge = hasPrice ? 'موجود' : 'استعلام قیمت';
        document.getElementById('modalProductBadge').innerHTML = productBadge;

        // تنظیم قیمت
        const priceStatus = getPriceStatus(productData.price, productData.hasPrice, productData.stock);
        document.getElementById('modalPriceStatus').innerHTML = priceStatus.html;

        // تنظیم مشخصات فنی
        const specs = getProductSpecs(productData);
        const specsHtml = specs.map(spec => `
        <div class="spec-item">
            <span class="spec-label">${spec.label}:</span>
            <span class="spec-value">${spec.value}</span>
        </div>
    `).join('');
        document.getElementById('modalSpecs').innerHTML = specsHtml;

        // تنظیم دکمه جزییات بیشتر
        const detailBtn = document.getElementById('modalCompareBtn');
        if (detailBtn) {
            detailBtn.href = productUrl;
        }

        // تنظیم گالری تصاویر
        currentImages = buildGalleryImages(productData);
        currentImageIndex = 0;

        const mainImg = document.getElementById('modalProductImage');
        if (mainImg && currentImages.length) {
            mainImg.src = currentImages[0];
        }
        buildThumbnails(currentImages);

        // دکمه‌های گالری
        const prevBtn = document.getElementById('galleryPrev');
        const nextBtn = document.getElementById('galleryNext');
        if (prevBtn) {
            prevBtn.removeEventListener('click', prevImage);
            prevBtn.addEventListener('click', prevImage);
        }
        if (nextBtn) {
            nextBtn.removeEventListener('click', nextImage);
            nextBtn.addEventListener('click', nextImage);
        }
    }

    function closeModalFunc() {
        const modalOverlayElem = document.getElementById('productModalOverlay');
        if (!modalOverlayElem) return;
        modalOverlayElem.classList.remove('active');
        setTimeout(() => {
            modalOverlayElem.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
        currentImages = [];
        currentImageIndex = 0;
    }

    function initModal() {
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const modalOverlayElem = document.getElementById('productModalOverlay');

        if (modalCloseBtn) {
            modalCloseBtn.removeEventListener('click', closeModalFunc);
            modalCloseBtn.addEventListener('click', closeModalFunc);
        }
        if (modalOverlayElem) {
            modalOverlayElem.removeEventListener('click', (e) => {
                if (e.target === modalOverlayElem) closeModalFunc();
            });
            modalOverlayElem.addEventListener('click', (e) => {
                if (e.target === modalOverlayElem) closeModalFunc();
            });
        }
        document.removeEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlayElem?.classList.contains('active')) closeModalFunc();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlayElem?.classList.contains('active')) closeModalFunc();
        });

        // کلیک روی کارت‌های محصول
        setTimeout(() => {
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.cursor = 'pointer';
                card.removeEventListener('click', handleProductClick);
                card.addEventListener('click', handleProductClick);
            });
        }, 500);
    }

    function handleProductClick(e) {
        if (e.target.closest('.action-btn') || e.target.closest('.inquiry-btn')) return;

        const card = e.currentTarget;
        // گرفتن productId از data-product-id
        const productId = card.dataset.productId;

        if (productId) {
            openModal(productId);
        } else {
            console.error('productId یافت نشد');
        }
    }

    // ==================== انیمیشن کلیک ====================
    function initClickAnimation() {
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('click', function () {
                if (this.classList.contains('no-click-effect')) return;
                this.style.transform = 'scale(0.98)';
                setTimeout(() => { this.style.transform = ''; }, 150);
            });
        });
    }

    // ==================== اسکرول نرم ====================
    function initSmoothScroll() {
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
    }

    // ==================== لود دسته‌بندی‌های مگامنو از API ====================
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

                // لود مگامنو بعد از اینکه هدر اضافه شد
                await loadMegaMenuCategories();

            } catch (error) {
                console.error('خطا در لود هدر و فوتر:', error);
            }
        }

        // ==================== لود دسته‌بندی‌های مگامنو از API ====================
        async function loadMegaMenuCategories() {
            const megaMenuGrid = document.getElementById('megaMenuGrid');
            if (!megaMenuGrid) {
                console.log('megaMenuGrid پیدا نشد');
                return;
            }

            // دیتای محلی برای Fallback
            const fallbackCategories = [
                { id: 1, name: 'بست کمربندی', desc: 'بست‌های فولادی، استیل، گالوانیزه', icon: 'fas fa-link' },
                { id: 2, name: 'نوار چسب', desc: 'نوار عایق ، چسب ، نوار حرارتی', icon: 'fas fa-tape' },
                { id: 3, name: 'ابزار صنعتی', desc: 'پرس هیدرولیک، آچار، ابزار', icon: 'fas fa-tools' },
                { id: 4, name: 'وایر شو', desc: 'کابلشو مسی، آلومینیومی، سرسیم', icon: 'fas fa-plug' }
            ];

            try {
                const response = await fetch('https://192.168.1.158:7260/api/v1/Api/categories', {
                    method: 'GET',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('پاسخ API دسته‌بندی مگامنو:', result);

                let categories = [];
                if (result.success && result.data && Array.isArray(result.data)) {
                    categories = result.data;
                }

                if (categories.length === 0) {
                    console.warn('API داده‌ای ندارد، استفاده از دیتای محلی');
                    categories = fallbackCategories;
                }

                renderMegaMenuCategories(categories, megaMenuGrid);

            } catch (error) {
                console.error('خطا در لود دسته‌بندی مگامنو:', error);
                renderMegaMenuCategories(fallbackCategories, megaMenuGrid);
            }
        }

        function renderMegaMenuCategories(categories, megaMenuGrid) {
            let categoriesHtml = '';

            categories.forEach(cat => {
                const categoryName = cat.name || cat.title || 'دسته‌بندی';
                const categoryLink = `category-detail.html?category=${encodeURIComponent(categoryName)}&id=${cat.id}`;
                const categoryDesc = cat.description || getCategoryDescText(categoryName);
                const iconClass = getCategoryIconClass(categoryName);

                categoriesHtml += `
            <div class="mega-col">
                <div class="mega-category">
                    <div class="cat-icon"><i class="${iconClass}"></i></div>
                    <div class="cat-content">
                        <h4>${categoryName}</h4>
                        <p>${categoryDesc}</p>
                        <a href="${categoryLink}">مشاهده محصولات <i class="fas fa-arrow-left"></i></a>
                    </div>
                </div>
            </div>
        `;
            });

            megaMenuGrid.innerHTML = categoriesHtml;
            console.log(`${categories.length} دسته‌بندی مگامنو لود شد`);
        }

        function getCategoryIconClass(categoryName) {
            if (categoryName.includes('بست')) return 'fas fa-link';
            if (categoryName.includes('ابزار')) return 'fas fa-tools';
            if (categoryName.includes('نوار') || categoryName.includes('چسب')) return 'fas fa-tape';
            if (categoryName.includes('وایر')) return 'fas fa-plug';
            return 'fas fa-folder-open';
        }

        function getCategoryDescText(categoryName) {
            if (categoryName.includes('بست')) return 'بست‌های فولادی، استیل، گالوانیزه';
            if (categoryName.includes('ابزار')) return 'پرس هیدرولیک، آچار، ابزار صنعتی';
            if (categoryName.includes('نوار') || categoryName.includes('چسب')) return 'نوار عایق، چسب، نوار حرارتی';
            if (categoryName.includes('وایر')) return 'کابلشو مسی، آلومینیومی، سرسیم';
            return 'مشاهده محصولات';
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

    function handleMegaMenuClick(e) {
        if (e.target.closest('.dropdown-toggle')) {
            e.preventDefault();
            const megaMenuDiv = document.getElementById('categoryDropdownMenu');
            megaMenuDiv?.classList.toggle('active');
        }
    }

    // ==================== هدایت به صفحه جزییات محصول ====================
    function initProductDetailLinks() {
        const productBtns = document.querySelectorAll('.product-btn');
        productBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const productCard = btn.closest('.product-card');
                if (!productCard) return;

                const productTitle = productCard.querySelector('.product-title')?.textContent || 'محصول';
                const productModel = productCard.querySelector('.product-model')?.textContent?.replace('مدل: ', '') || '';
                const productPrice = productCard.querySelector('.product-price')?.textContent || 'استعلام قیمت';
                const productImage = productCard.querySelector('.product-image img')?.src || 'assets/image/placeholder.jpg';
                const productBadge = productCard.querySelector('.product-badge')?.textContent || '';

                let category = 'محصولات';
                if (productTitle.includes('بست')) category = 'بست کمربندی';
                else if (productTitle.includes('وایر')) category = 'وایر شو';
                else if (productTitle.includes('پرس') || productTitle.includes('هیدرولیک')) category = 'ابزار صنعتی';
                else if (productTitle.includes('نوار') || productTitle.includes('چسب')) category = 'نوار چسب';

                const params = new URLSearchParams();
                params.set('id', productModel || productTitle.replace(/\s/g, '_').substring(0, 30));
                params.set('name', productTitle);
                params.set('model', productModel);
                params.set('price', productPrice);
                params.set('image', productImage);
                params.set('category', category);
                params.set('badge', productBadge);

                window.location.href = `product-detail.html?${params.toString()}`;
            });
        });
    }

    // ==================== مگامنو در موبایل ====================
function initMegaMenuMobile() {
    if (window.innerWidth <= 992) {
        const categoryLi = document.getElementById('categoryDropdownLi');
        const megaMenuDiv = document.getElementById('categoryDropdownMenu');
        if (categoryLi && megaMenuDiv) {
            categoryLi.removeEventListener('click', handleMegaMenuClick);
            categoryLi.addEventListener('click', handleMegaMenuClick);
        }
    }
}

function handleMegaMenuClick(e) {
    if (e.target.closest('.dropdown-toggle')) {
        e.preventDefault();
        const megaMenuDiv = document.getElementById('categoryDropdownMenu');
        megaMenuDiv?.classList.toggle('active');
    }
}

    // ==================== راه‌اندازی اولیه ====================
    function init() {
        setActiveNavLink();
        initMobileMenu();
        initSearchModal();
        loadSliders();
        loadCategories();
        //loadMegaMenuCategories();

        // ساخت اسلایدرها
        initProductSliders();
       // handleMegaMenuClick();
        // لود محصولات
        setTimeout(function () {
            loadProductsByCategoryb(1, 'beltProductsWrapper', 'beltProductsSwiper', 'بست کمربندی');
            loadProductsByCategoryc(2, 'tapeProductsWrapper', 'tapeProductsSwiper', 'نوار چسب');
            loadProductsByCategory(3, 'toolsProductsWrapper', 'toolsProductsSwiper', 'ابزار');
            loadProductsByCategoryw(4, 'wireShaProductsWrapper', 'wireShaProductsSwiper', 'وایر شو');
        }, 100);

        initVideoPlayer();
        initModal();
        initClickAnimation();
        initSmoothScroll();
        initMegaMenuMobile();
        initProductDetailLinks();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();