// ==================== دیتابیس محصولات تونا تولز (دستی) ====================
// می‌توانید هر محصول جدید را به این لیست اضافه کنید
const productsDatabase = [
    // بست کمربندی
    { model: "BT-10025", name: "بست کمربندی مشکی سایز 100*2.5 mm", price: "استعلام قیمت", image: "assets/image/bast-img.jpg", category: "بست کمربندی" },
    { model: "BT-15025", name: "بست کمربندی سفید سایز 150*2.5 mm", price: "استعلام قیمت", image: "assets/image/bast-img.jpg", category: "بست کمربندی" },
    { model: "BT-20048", name: "بست کمربندی مشکی سایز 200*4.8 mm", price: "استعلام قیمت", image: "assets/image/bast-img.jpg", category: "بست کمربندی" },
    { model: "BT-25025S", name: "بست کمربندی استیل 304 سایز 250*2.5", price: "245,000 تومان", image: "assets/image/bast-img.jpg", category: "بست کمربندی" },
    { model: "BT-30048", name: "بست کمربندی سفید سایز 300×4.8 mm", price: "298,000 تومان", image: "assets/image/bast-img.jpg", category: "بست کمربندی" },
    { model: "BT-55076", name: "بست کمربندی مشکی سایز 550×7.6 mm", price: "520,000 تومان", image: "assets/image/bast-img.jpg", category: "بست کمربندی" },
    { model: "BT-72090", name: "بست کمربندی سفید سایز 720×9 mm", price: "780,000 تومان", image: "assets/image/bast-img.jpg", category: "بست کمربندی" },
    { model: "BT-102090", name: "بست کمربندی سفید سایز 1020×9 mm", price: "1,250,000 تومان", image: "assets/image/bast-img.jpg", category: "بست کمربندی" },

    // ابزار صنعتی
    { model: "YQK-300A", name: "پرس کابلشو هیدرولیک ۱۶-۳۰۰ مدل YQK-300A", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },
    { model: "YQ-70", name: "پرس کابلشو هیدرولیک ۶-۷۰ مدل YQ-70", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },
    { model: "ZCO-300", name: "پرس هیدرولیک با محافظ ۱۶-۳۰۰ مدل ZCO-300", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },
    { model: "ZCO-400", name: "هیدرولیک با محافظ ۵۰-۳۰۰ مدل ZCO-400", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },
    { model: "CPC-85", name: "قیچی هیدرولیک مدل CPC-85", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },
    { model: "CH-60", name: "پانچ هیدرولیک با پمپ CH-60", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },
    { model: "CH-70", name: "پانچ هیدرولیک با پمپ مدل CH-70", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },
    { model: "HS-35WF", name: "پرس وایر شو اتوماتیک ساده ۱۰-۳۵ مدل HS-35WF", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },
    { model: "HX-50D", name: "پرس کابلشو دستی ۶ تا ۵۰ مدل HX-50D", price: "استعلام قیمت", image: "assets/image/abzar-img.jpg", category: "ابزار صنعتی" },

    // وایر شو
    { model: "E-0508", name: "وایر شو مدل E 0508", price: "45,000 تومان", image: "assets/image/vayer-img.jpg", category: "وایر شو" },
    { model: "E-7508", name: "وایر شو مدل E 7508", price: "52,000 تومان", image: "assets/image/vayer-img.jpg", category: "وایر شو" },
    { model: "E-1008", name: "وایر شو مدل E 1008", price: "58,000 تومان", image: "assets/image/vayer-img.jpg", category: "وایر شو" },
    { model: "E-1508", name: "وایر شو مدل E 1508", price: "67,000 تومان", image: "assets/image/vayer-img.jpg", category: "وایر شو" },
    { model: "TE-0508", name: "وایر شو مدل TE 0508", price: "48,000 تومان", image: "assets/image/vayer-img.jpg", category: "وایر شو" },
    { model: "TE-7508", name: "وایر شو مدل TE 7508", price: "55,000 تومان", image: "assets/image/vayer-img.jpg", category: "وایر شو" },
    { model: "TE-4010", name: "وایر شو مدل TE 4010", price: "125,000 تومان", image: "assets/image/vayer-img.jpg", category: "وایر شو" },

    // نوار چسب
    { model: "TP-001", name: "نوار چسب مشکی سایز 0.13MM * 18MM * 10Y کیفیت A", price: "140,000 تومان", image: "assets/image/chasb-img.jpg", category: "نوار چسب" },
    { model: "TP-002", name: "نوار چسب مشکی سایز 0.13MM * 18MM * 10Y کیفیت B", price: "110,000 تومان", image: "assets/image/chasb-img.jpg", category: "نوار چسب" },
    { model: "TP-005", name: "نوار چسب سفید سایز 0.13MM * 24MM * 10Y کیفیت A", price: "165,000 تومان", image: "assets/image/chasb-img.jpg", category: "نوار چسب" },
    { model: "TP-008", name: "نوار چسب دابل فیس سفید 10MM عرض - بسته 10 عددی", price: "89,000 تومان", image: "assets/image/chasb-img.jpg", category: "نوار چسب" },
    { model: "TP-010", name: "نوار چسب عایق برق وینیل مشکی 19MM * 10M", price: "45,000 تومان", image: "assets/image/chasb-img.jpg", category: "نوار چسب" }
];

const categoryImages = {
    'بست کمربندی': ['assets/image/bast-img.jpg', 'assets/image/bast-img.jpg', 'assets/image/bast-img.jpg'],
    'ابزار صنعتی': ['assets/image/abzar-img.jpg', 'assets/image/abzar-img.jpg', 'assets/image/abzar-img.jpg'],
    'نوار چسب': ['assets/image/chasb-img.jpg', 'assets/image/chasb-img.jpg', 'assets/image/chasb-img.jpg'],
    'وایر شو': ['assets/image/vayer-img.jpg', 'assets/image/vayer-img.jpg', 'assets/image/vayer-img.jpg']
};

const brandIntro = `✨ **تونا‌بات | منشی هوشمند تونا تولز**\n\nسلام! 👋 من **تونا‌بات** هستم، دستیار هوشمند **تجهیزات صنعتی و ابزارآلات** تونا تولز.\n\n**حوزه‌های تخصصی من:**\n• 🔗 **بست کمربندی** (فولادی، استیل، گالوانیزه)\n• 🔧 **ابزار صنعتی** (پرس هیدرولیک، آچار، کابل‌کش)\n• 📼 **نوار چسب صنعتی** (عایق برق، آرماتور، حرارتی)\n• ⚡ **وایر شو** (مسی، آلومینیومی، کابلشو)\n\n**برای استعلام قیمت، کافی است مدل محصول را وارد کنید.**\nمثال: "قیمت BT-25025S" یا "قیمت وایر شو E-0508"`;

let currentProduct = null;
let currentImages = [];
let currentImageIndex = 0;

function getProductByModel(model) {
    const searchModel = model.toLowerCase().trim();
    return productsDatabase.find(p => p.model.toLowerCase() === searchModel || p.model.toLowerCase().includes(searchModel));
}

function formatProductCard(product, withClick = true) {
    const clickAttr = withClick ? `data-model="${product.model}" style="cursor:pointer;"` : '';
    return `<div class="product-card-inline" ${clickAttr} data-model="${product.model}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-model">مدل: ${product.model}</div>
                    <div class="product-price">💰 قیمت: ${product.price}</div>
                </div>
            </div>`;
}

function openProductModal(product) {
    currentProduct = product;
    currentImages = categoryImages[product.category] || [product.image];
    currentImageIndex = 0;

    document.getElementById('modalProductTitle').innerHTML = product.name;
    document.getElementById('modalProductPrice').innerHTML = `💰 قیمت: ${product.price}`;
    document.getElementById('modalProductImage').src = currentImages[0];
    document.getElementById('modalSpecs').innerHTML = (product.specs || ['گارانتی: ۱۸ ماهه', 'ارسال: ۲۴ ساعته']).map(s => `<div class="spec-item">${s}</div>`).join('');

    const thumbContainer = document.getElementById('modalThumbnails');
    thumbContainer.innerHTML = currentImages.map((img, idx) => `<div class="modal-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}"><img src="${img}"></div>`).join('');

    document.querySelectorAll('.modal-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            currentImageIndex = parseInt(thumb.dataset.index);
            document.getElementById('modalProductImage').src = currentImages[currentImageIndex];
            document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    document.getElementById('modalViewProduct').href = `index.html?product=${product.model}`;
    document.getElementById('productModalOverlay').style.display = 'flex';
    setTimeout(() => document.getElementById('productModalOverlay').classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModalOverlay');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = ''; }, 300);
}

async function getAIResponse(question) {
    const priceMatch = question.match(/(?:قیمت\s*)?(?:مدل\s*)?([A-Z0-9\-]{3,})/i);
    if (priceMatch && priceMatch[1]) {
        const product = getProductByModel(priceMatch[1]);
        if (product) {
            return `🔍 **نتیجه استعلام قیمت**\n\n${formatProductCard(product, true)}\n\n✅ برای خرید و اطلاعات بیشتر با شماره **021 38024** تماس بگیرید.\n\n💡 **نکته:** روی کارت محصول کلیک کنید تا تصاویر بیشتر و مشخصات کامل را ببینید.`;
        }
        return `❌ **محصول با مدل "${priceMatch[1]}" یافت نشد.**\n\n📋 لطفاً مدل صحیح را وارد کنید.`;
    }
    if (question.includes('بست کمربندی')) return "🔗 **بست کمربندی** محصولی برای اتصال و مهار کابل‌ها و لوله‌ها. انواع: فولادی گالوانیزه، استیل 304، پلاستیکی.\n\n📞 مشاوره: 021 38024";
    if (question.includes('وایر شو')) return "⚡ **وایر شو (کابلشو)** اتصالاتی برای کابل‌های برق. مدل‌های موجود: E-0508, E-7508, TE-0508, TE-4010\n\n📞 استعلام قیمت: 021 38024";
    if (question.includes('پرس هیدرولیک')) return "🔧 **پرس هیدرولیک** دستگاهی برای فشار دادن کابلشو به کابل. مدل‌ها: YQK-300A, YQ-70, ZCO-300\n\n📞 021 مشاوره: 38024";
    return `🤖 **سوال خوبی پرسیدید!**\n\nمن تونا‌بات هستم و می‌توانم:\n✅ استعلام قیمت (مدل محصول را وارد کنید)\n✅ مشاوره خرید تجهیزات صنعتی\n✅ معرفی انواع محصولات\n\n📞 برای اطلاعات بیشتر با 021 38024 تماس بگیرید.`;
}

// ==================== DOM Elements ====================
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const clearChatBtn = document.getElementById('clearChatBtn');
const scrollBottomBtn = document.getElementById('scrollBottomBtn');
const suggestionsToggleBtn = document.getElementById('suggestionsToggleBtn');
const suggestionsPanel = document.getElementById('suggestionsPanel');
const modalOverlay = document.getElementById('productModalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');

function formatText(text) { return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>'); }
function scrollToBottom() { chatContainer.scrollTop = chatContainer.scrollHeight; }
function showTyping() { typingIndicator.style.display = 'block'; scrollToBottom(); }
function hideTyping() { typingIndicator.style.display = 'none'; }

function addMessage(text, isUser, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    const avatarIcon = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    messageDiv.innerHTML = `<div class="message-avatar">${avatarIcon}</div><div class="message-bubble ${isError ? 'error' : ''}">${formatText(text)}</div>`;
    chatContainer.appendChild(messageDiv);
    scrollToBottom();

    // اضافه کردن رویداد کلیک به کارت‌های محصول
    messageDiv.querySelectorAll('.product-card-inline').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const model = card.dataset.model;
            const product = getProductByModel(model);
            if (product) openProductModal(product);
        });
    });
}

async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    addMessage(message, true);
    messageInput.value = '';
    messageInput.style.height = 'auto';
    showTyping();
    setTimeout(async () => {
        const response = await getAIResponse(message);
        hideTyping();
        addMessage(response, false);
    }, 300);
}

function clearChat() { chatContainer.innerHTML = ''; addMessage(brandIntro, false); }

// رویدادها
suggestionsToggleBtn.addEventListener('click', () => {
    suggestionsToggleBtn.classList.toggle('active');
    suggestionsPanel.classList.toggle('open');
});
document.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
        messageInput.value = item.dataset.question;
        sendMessage();
        suggestionsPanel.classList.remove('open');
        suggestionsToggleBtn.classList.remove('active');
    });
});
document.addEventListener('click', (e) => {
    if (!suggestionsToggleBtn.contains(e.target) && !suggestionsPanel.contains(e.target)) {
        suggestionsPanel.classList.remove('open');
        suggestionsToggleBtn.classList.remove('active');
    }
});
messageInput.addEventListener('input', function () { this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 120) + 'px'; });
messageInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
sendBtn.addEventListener('click', sendMessage);
clearChatBtn.addEventListener('click', clearChat);
scrollBottomBtn.addEventListener('click', scrollToBottom);
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

if (galleryPrev) galleryPrev.addEventListener('click', () => {
    if (currentImages.length) {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        document.getElementById('modalProductImage').src = currentImages[currentImageIndex];
        document.querySelectorAll('.modal-thumb').forEach((t, i) => t.classList.toggle('active', i === currentImageIndex));
    }
});
if (galleryNext) galleryNext.addEventListener('click', () => {
    if (currentImages.length) {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        document.getElementById('modalProductImage').src = currentImages[currentImageIndex];
        document.querySelectorAll('.modal-thumb').forEach((t, i) => t.classList.toggle('active', i === currentImageIndex));
    }
});

// تم روز/شب
function setTheme(theme) {
    if (theme === 'dark') { document.body.classList.remove('light'); document.body.classList.add('dark'); localStorage.setItem('theme', 'dark'); document.getElementById('themeIconAI').classList.remove('fa-moon'); document.getElementById('themeIconAI').classList.add('fa-sun'); }
    else { document.body.classList.remove('dark'); document.body.classList.add('light'); localStorage.setItem('theme', 'light'); document.getElementById('themeIconAI').classList.remove('fa-sun'); document.getElementById('themeIconAI').classList.add('fa-moon'); }
}
const savedTheme = localStorage.getItem('theme');
savedTheme === 'dark' ? setTheme('dark') : setTheme('light');
document.getElementById('themeToggleAI').addEventListener('click', () => setTheme(document.body.classList.contains('light') ? 'dark' : 'light'));

clearChat();
document.getElementById('apiStatus').innerHTML = 'آنلاین | مشاور صنعتی';