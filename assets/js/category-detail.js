
// ==================== لود هدر و فوتر ====================
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

// ==================== صفحه جزییات دسته‌بندی ====================
document.addEventListener('DOMContentLoaded', function () {

    // نقشه دسته‌بندی
    const categoryMap = {
        '1': { id: 1, name: 'بست کمربندی', nameEn: 'belt' },
        '2': { id: 2, name: 'نوار چسب', nameEn: 'tape' },
        '3': { id: 3, name: 'ابزار', nameEn: 'tools' },
        '4': { id: 4, name: 'وایر شو', nameEn: 'wire' }
    };

    // دریافت categoryId از URL
    const urlParams = new URLSearchParams(window.location.search);
    let categoryId = urlParams.get('id');
    const categoryNameParam = urlParams.get('category');

    // اگر categoryName داشتیم، id را پیدا کن
    if (!categoryId && categoryNameParam) {
        for (const key in categoryMap) {
            if (categoryMap[key].name === categoryNameParam) {
                categoryId = key;
                break;
            }
        }
    }

    // اگر هنوز id نداریم، از localStorage یا پیش‌فرض استفاده کن
    if (!categoryId) {
        categoryId = localStorage.getItem('selectedCategoryId') || '1';
    }

    // ذخیره در localStorage برای صفحات دیگر
    localStorage.setItem('selectedCategoryId', categoryId);

    const currentCategory = categoryMap[categoryId];

    // به‌روزرسانی عنوان صفحه
    if (currentCategory) {
        document.title = `محصولات ${currentCategory.name} | TonaTools - توزیع‌کننده پیشرو تجهیزات صنعتی`;

        // به‌روزرسانی breadcrumb - مهم: بررسی وجود المنت
        const breadcrumbLast = document.querySelector('.breadcrumb a:last-child');
        if (breadcrumbLast) {
            breadcrumbLast.textContent = currentCategory.name;
            breadcrumbLast.style.color = 'var(--main-color-one)';
        }

        // به‌روزرسانی متا دیسکریپشن
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', `خرید انواع ${currentCategory.name} با بهترین قیمت و ضمانت اصالت کالا`);
        }
    }

    let currentPage = 1;
    let totalPages = 1;
    let allProducts = [];

    // تابع لود محصولات از API
    async function loadCategoryProducts(page = 1) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) {
            console.error('productsGrid پیدا نشد');
            return;
        }

        productsGrid.innerHTML = '<div class="loading-products"><i class="fas fa-spinner fa-pulse" style="font-size:40px; color:#f9ae13;"></i><p>در حال بارگذاری محصولات...</p></div>';

        try {
            const response = await fetch(`http://192.168.1.158:5064/api/v1/Api/category-products/${categoryId}?page=${page}&pageSize=12`, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('پاسخ API:', result);

            if (result.success && result.data) {
                const products = result.data.products || [];
                const pagination = result.data.pagination;
                const categoryInfo = result.data.categoryInfo;

                totalPages = pagination?.totalPages || 1;
                currentPage = pagination?.currentPage || 1;
                allProducts = products;

                if (products.length > 0) {
                    let productsHtml = '';

                    products.forEach(product => {
                        const productTitle = product.nameFa || product.nameEn || 'محصول';
                        let productPrice = 'استعلام قیمت';

                        if (product.hasPrice && product.finalPrice) {
                            productPrice = product.finalPrice.toLocaleString() + ' تومان';
                        }

                        let imageUrl = product.imageUrl || 'assets/image/placeholder.jpg';
                        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('assets')) {
                            imageUrl = `http://192.168.1.158:5064${imageUrl}`;
                        }

                        productsHtml += `
                            <div class="product-card" data-product-id="${product.id}">
                                <div class="product-image">
                                    <img src="${imageUrl}" alt="${productTitle}" onerror="this.src='assets/image/placeholder.jpg'">
                                </div>
                                <div class="product-info">
                                    <div class="product-title">${escapeHtml(productTitle)}</div>
                                    <div class="product-model">کد: ${product.productCode || product.id}</div>
                                    <div class="product-price">${productPrice}</div>
                                    <div class="product-actions">
                                        <button class="product-btn detail-btn" data-id="${product.id}">جزئیات</button>
                                        <button class="product-btn inquiry-btn">استعلام</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    });

                    productsGrid.innerHTML = productsHtml;

                    // رویداد کلیک برای دکمه جزئیات
                    document.querySelectorAll('.detail-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const productId = btn.dataset.id;
                            window.location.href = `product-detail.html?id=${productId}`;
                        });
                    });

                    // رویداد کلیک برای کارت محصول
                    document.querySelectorAll('.product-card').forEach(card => {
                        card.addEventListener('click', (e) => {
                            if (e.target.closest('.detail-btn') || e.target.closest('.inquiry-btn')) return;
                            const productId = card.dataset.productId;
                            if (productId) {
                                window.location.href = `product-detail.html?id=${productId}`;
                            }
                        });
                    });

                    // رویداد کلیک برای دکمه استعلام
                    document.querySelectorAll('.inquiry-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            if (typeof Swal !== 'undefined') {
                                Swal.fire({
                                    icon: 'info',
                                    title: 'استعلام قیمت',
                                    text: 'برای استعلام قیمت با شماره 021-38024 تماس بگیرید',
                                    confirmButtonText: 'متوجه شدم',
                                    confirmButtonColor: '#f9ae13'
                                });
                            } else {
                                alert('برای استعلام قیمت با شماره 021-38024 تماس بگیرید');
                            }
                        });
                    });

                    // ساخت صفحه‌بندی
                    buildPagination();

                    // به‌روزرسانی توضیحات دسته‌بندی
                    if (categoryInfo) {
                        const descDiv = document.getElementById('categoryDescription');
                        if (descDiv) {
                            const categoryDesc = getCategoryDescription(categoryInfo.name);
                            descDiv.innerHTML = `
                                <h3>درباره ${categoryInfo.name} های تونا تولز</h3>
                                <p>${categoryDesc}</p>
                                <p style="margin-top: 15px;">برای استعلام قیمت و مشاوره خرید، با کارشناسان ما تماس بگیرید یا از منشی هوشمند تونا تولز استفاده کنید.</p>
                            `;
                        }
                    }

                } else {
                    productsGrid.innerHTML = '<div class="loading-products"><p>هیچ محصولی در این دسته‌بندی یافت نشد</p></div>';
                }
            } else {
                productsGrid.innerHTML = '<div class="loading-products"><p>خطا در بارگذاری محصولات</p></div>';
            }

        } catch (error) {
            console.error('خطا:', error);
            productsGrid.innerHTML = '<div class="loading-products"><p>خطا در ارتباط با سرور</p><button onclick="location.reload()" style="margin-top:15px; padding:8px 20px; background:#f9ae13; border:none; border-radius:20px;">تلاش مجدد</button></div>';
        }
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getCategoryDescription(categoryName) {
        const descriptions = {
            'بست کمربندی': 'بست‌های کمربندی تونا تولز با بالاترین کیفیت و استانداردهای روز دنیا تولید می‌شوند. محصولات ما شامل بست‌های فولادی گالوانیزه، استیل 304 و 316، و بست‌های پلاستیکی مرغوب در سایزهای مختلف هستند.',
            'ابزار': 'ابزارآلات صنعتی تونا تولز با بهترین مواد اولیه و با دوام بالا تولید می‌شوند. مجموعه ما شامل پرس‌های هیدرولیک، آچارهای صنعتی، دستگاه‌های کابل‌کش و ابزار دقیق می‌باشد.',
            'نوار چسب': 'نوار چسب‌های صنعتی تونا تولز با چسبندگی عالی و مقاومت بالا در برابر حرارت و رطوبت. مناسب برای مصارف برق، ساختمان و صنایع مختلف.',
            'وایر شو': 'اتصالات کابلی و وایر شوهای تونا تولز با رسانایی عالی و مقاومت در برابر اکسیداسیون. مناسب برای تابلوهای برق و صنایع کابلی.'
        };
        return descriptions[categoryName] || 'محصولات تونا تولز با بالاترین کیفیت و استانداردهای روز دنیا تولید می‌شوند. تمام محصولات دارای گارانتی اصالت کالا و ضمانت کیفیت می‌باشند.';
    }

    function buildPagination() {
        const paginationDiv = document.getElementById('pagination');
        if (!paginationDiv) return;

        if (totalPages <= 1) {
            paginationDiv.innerHTML = '';
            return;
        }

        let paginationHtml = '';

        // صفحه قبلی
        if (currentPage > 1) {
            paginationHtml += `<a href="#" class="page-link" data-page="${currentPage - 1}"><i class="fas fa-chevron-right"></i></a>`;
        }

        // شماره صفحات
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHtml += `<a href="#" class="page-link active" data-page="${i}">${i}</a>`;
            } else {
                paginationHtml += `<a href="#" class="page-link" data-page="${i}">${i}</a>`;
            }
        }

        // صفحه بعدی
        if (currentPage < totalPages) {
            paginationHtml += `<a href="#" class="page-link" data-page="${currentPage + 1}"><i class="fas fa-chevron-left"></i></a>`;
        }

        paginationDiv.innerHTML = paginationHtml;

        // رویداد کلیک برای صفحه‌بندی
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(link.dataset.page);
                if (page && page !== currentPage) {
                    currentPage = page;
                    loadCategoryProducts(currentPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    // فیلتر موبایل
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const filterSidebar = document.getElementById('filterSidebar');

    if (mobileFilterBtn && window.innerWidth <= 992) {
        mobileFilterBtn.style.display = 'flex';
        mobileFilterBtn.addEventListener('click', () => {
            filterSidebar?.classList.toggle('active');
        });
    }

    // مرتب‌سازی
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            let sortedProducts = [...allProducts];

            if (sortValue === 'price_asc') {
                sortedProducts.sort((a, b) => (a.finalPrice || 0) - (b.finalPrice || 0));
            } else if (sortValue === 'price_desc') {
                sortedProducts.sort((a, b) => (b.finalPrice || 0) - (a.finalPrice || 0));
            } else if (sortValue === 'newest') {
                sortedProducts.sort((a, b) => new Date(b.create) - new Date(a.create));
            }

            updateProductsGrid(sortedProducts);
        });
    }

    function updateProductsGrid(products) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        if (products.length === 0) {
            productsGrid.innerHTML = '<div class="loading-products"><p>هیچ محصولی یافت نشد</p></div>';
            return;
        }

        let productsHtml = '';
        products.forEach(product => {
            const productTitle = product.nameFa || product.nameEn || 'محصول';
            let productPrice = 'استعلام قیمت';

            if (product.hasPrice && product.finalPrice) {
                productPrice = product.finalPrice.toLocaleString() + ' تومان';
            }

            let imageUrl = product.imageUrl || 'assets/image/placeholder.jpg';
            if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('assets')) {
                imageUrl = `http://192.168.1.158:5064${imageUrl}`;
            }

            productsHtml += `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-image">
                        <img src="${imageUrl}" alt="${productTitle}" onerror="this.src='assets/image/placeholder.jpg'">
                    </div>
                    <div class="product-info">
                        <div class="product-title">${escapeHtml(productTitle)}</div>
                        <div class="product-model">کد: ${product.productCode || product.id}</div>
                        <div class="product-price">${productPrice}</div>
                        <div class="product-actions">
                            <button class="product-btn detail-btn" data-id="${product.id}">جزئیات</button>
                            <button class="product-btn inquiry-btn">استعلام</button>
                        </div>
                    </div>
                </div>
            `;
        });

        productsGrid.innerHTML = productsHtml;

        document.querySelectorAll('.detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = `product-detail.html?id=${btn.dataset.id}`;
            });
        });

        document.querySelectorAll('.inquiry-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof Swal !== 'undefined') {
                    Swal.fire({ icon: 'info', title: 'استعلام قیمت', text: 'برای استعلام قیمت با شماره 021-38024 تماس بگیرید', confirmButtonText: 'متوجه شدم', confirmButtonColor: '#f9ae13' });
                } else {
                    alert('برای استعلام قیمت با شماره 021-38024 تماس بگیرید');
                }
            });
        });
    }

    // بارگذاری اولیه
    loadCategoryProducts();

});