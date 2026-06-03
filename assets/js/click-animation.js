
(function () {
    const style = document.createElement('style');
    style.textContent = `
        /* حذف هایلایت آبی در تمام مرورگرها */
        button,
        a,
        div,
        [role="button"],
        .nav-btn,
        .icon-btn,
        .desktop-btn,
        .sidebar-btn,
        .close-sidebar,
        .close-search,
        [onclick],
        [tabindex]:not([tabindex="-1"]),
        input[type="submit"],
        input[type="button"],
        .btn-primary,
        .btn-outline-light,
        .theme-btn {
            -webkit-tap-highlight-color: transparent !important;
            -webkit-touch-callout: none !important;
            user-select: none !important;
            outline: none !important;
        }
        
        /* حذف outline در حالت focus برای المان‌های کلیک شونده */
        button:focus,
        a:focus,
        div:focus,
        [role="button"]:focus,
        .nav-btn:focus,
        .icon-btn:focus {
            outline: none !important;
            box-shadow: none !important;
        }
        
        /* حالت focus فقط برای کیبورد (دسترسی‌پذیری) */
        button:focus-visible,
        a:focus-visible,
        .nav-btn:focus-visible {
            outline: 2px solid #289672 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);

    // 2. اضافه کردن انیمیشن کلیک نرم و جذاب به المان‌های قابل کلیک
    const clickableSelectors = [
        'button',
        'a',
        '[role="button"]',
        '.nav-btn',
        '.icon-btn',
        '.desktop-btn',
        '.sidebar-btn',
        '.close-sidebar',
        '.close-search',
        '.theme-btn',
        '#searchToggleBtn',
        '#menuToggleBtn',
        '#mobileLoginBtn',
        '#searchExecBtn',
        '#desktopLoginBtn',
        '#desktopCartBtn',
        '#desktopPaymentBtn',
        '#desktopWaiterBtn',
        '#desktopThemeBtn',
        '#sidebarThemeBtn',
        '#sidebarLoginBtn',
        '#sidebarCartBtn',
        '#sidebarPaymentBtn',
        '#sidebarWaiterBtn',
        '#closeSidebarBtn',
        '#closeSearchBtn',
        '.btn-primary',
        '.btn-outline-light',
        'input[type="submit"]',
        'input[type="button"]',
        '[onclick]'
    ];

    // ترکیب سلکتورها
    const selector = clickableSelectors.join(',');

    // تابع انیمیشن کلیک
    function addClickAnimation(element) {
        // جلوگیری از اضافه شدن چندباره event listener
        if (element.hasAttribute('data-click-animation')) return;
        element.setAttribute('data-click-animation', 'true');

        element.addEventListener('click', function (e) {
            // فقط اگر المان disabled نباشد
            if (this.disabled) return;

            // ذخیره transform قبلی
            const originalTransform = this.style.transform;
            const originalTransition = this.style.transition;

            // اعمال انیمیشن نرم
            this.style.transition = 'transform 0.12s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
            this.style.transform = 'scale(0.94)';

            // بازگشت به حالت عادی
            setTimeout(() => {
                this.style.transform = originalTransform;
                // بعد از اتمام انیمیشن، transition رو به حالت قبل برگردون
                setTimeout(() => {
                    this.style.transition = originalTransition;
                }, 50);
            }, 120);

            // افکت ripple (موج) برای المان‌های خاص (اختیاری)
            if (this.classList.contains('nav-btn') || this.classList.contains('icon-btn') || this.classList.contains('desktop-btn')) {
                createRipple(e, this);
            }
        });
    }

    // تابع ایجاد افکت ripple
    function createRipple(event, element) {
        // حذف ripple قبلی اگر وجود داشته باشد
        const existingRipple = element.querySelector('.ripple-effect');
        if (existingRipple) existingRipple.remove();

        // ایجاد عنصر ripple
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';

        // محاسبه موقعیت کلیک نسبت به المان
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        // استایل ripple
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(64, 184, 140, 0.4) 0%, rgba(40, 150, 114, 0.2) 100%);
            pointer-events: none;
            transform: translate(${x}px, ${y}px) scale(0);
            transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1), opacity 0.3s ease;
            z-index: 999;
            opacity: 0.7;
        `;

        // اطمینان از position relative بودن المان والد
        const originalPosition = window.getComputedStyle(element).position;
        if (originalPosition === 'static') {
            element.style.position = 'relative';
        }
        element.style.overflow = 'hidden';

        element.appendChild(ripple);

        // اجرای انیمیشن
        requestAnimationFrame(() => {
            ripple.style.transform = `translate(${x}px, ${y}px) scale(1)`;
            ripple.style.opacity = '0';
        });

        // حذف ripple بعد از اتمام انیمیشن
        setTimeout(() => {
            if (ripple && ripple.remove) {
                ripple.remove();
            }
        }, 400);
    }

    // اعمال انیمیشن به المان‌های موجود
    function applyToCurrentElements() {
        const clickableElements = document.querySelectorAll(selector);
        clickableElements.forEach(element => {
            addClickAnimation(element);
        });
    }

    // برای المان‌هایی که بعداً به DOM اضافه می‌شوند (MutationObserver)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // عنصر HTML
                        if (node.matches && node.matches(selector)) {
                            addClickAnimation(node);
                        }
                        if (node.querySelectorAll) {
                            const children = node.querySelectorAll(selector);
                            children.forEach(child => addClickAnimation(child));
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // اجرای اولیه
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyToCurrentElements);
    } else {
        applyToCurrentElements();
    }

    // همچنین برای امنیت بیشتر، استایل رو دوباره چک میکنیم
    console.log('✅ انیمیشن کلیک فعال شد و هایلایت آبی حذف گردید.');
})();