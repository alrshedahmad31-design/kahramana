(function () {
    'use strict';

    const CONFIG = {
        storageKey: 'kahramana_cart_v5',
        lang: document.documentElement.lang || 'ar',
        isRTL: document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar',
        currency: 'BHD',
        currencySymbol: { ar: 'د.ب', en: 'BHD' }
    };

    const PRICE_CATALOG = Object.freeze({
        "kebab-rice": 3.500,
        "charcoal-chicken": 4.500,
        "lamb-kebab": 4.000,
        "lamb-ribs": 5.500,
        "mixed-grill": 7.000,
        "lentil-soup": 1.000,
        "kubba-soup": 1.500,
        "tomato-soup": 1.000,
        "fattoush": 1.200,
        "tabbouleh": 1.200,
        "hummus": 1.000,
        "chicken-mandi": 4.500,
        "lamb-mandi": 6.000,
        "masgouf": 7.000,
        "dolma": 3.500,
        "chicken-shawarma": 1.500,
        "sig-pizza": 3.000,
        "kebab-pizza": 3.000,
        "zaatar": 0.700,
        "lahm-biajeen": 1.000,
        "lemon-juice": 0.800,
        "mint-lemonade": 1.000,
        "laban": 0.500
    });

    const MAX_ITEM_QTY = 50;
    const SUBMIT_COOLDOWN = 30000;
    let _lastSubmit = 0;

    function escapeHTML(str) {
        const d = document.createElement('div');
        d.textContent = String(str);
        return d.innerHTML;
    }

    function sanitizeInput(str, maxLen) {
        maxLen = maxLen || 200;
        return String(str).replace(/[*_~`━═]/g, '').replace(/\n/g, ' ').trim().substring(0, maxLen);
    }

    const BRANCHES = [
        { id: 'riffa', name: { ar: 'الرفاع', en: 'Riffa' }, whatsapp: '97317131413' },
        { id: 'galali', name: { ar: 'قلالي', en: 'Galali' }, whatsapp: '97317131213' }
    ];

    const i18n = {
        ar: {
            cartTitle: 'سلة الطلبات',
            emptyCart: 'سلتك فارغة',
            itemsInCart: 'عناصر في السلة',
            total: 'المجموع',
            checkout: 'إتمام الطلب',
            close: 'إغلاق',
            addedToCart: 'تمت الإضافة للسلة ✓',
            removedFromCart: 'تمت الإزالة من السلة',
            customerInfo: 'معلومات الطلب',
            fullName: 'الاسم الكامل',
            addressLabel: 'العنوان أو رابط الموقع',
            detectLocation: 'تحديد موقعي',
            locationDetected: 'تم تحديد موقعك ✓',
            locationError: 'تعذر تحديد الموقع',
            selectBranch: 'اختر الفرع',
            branchPlaceholder: 'اختر الفرع...',
            orderType: 'نوع الطلب',
            delivery: 'توصيل',
            pickup: 'استلام',
            paymentMethod: 'طريقة الدفع',
            cash: 'نقدي',
            benefitPay: 'بنفت باي',
            notesPlaceholder: 'أي ملاحظات إضافية...',
            sendWhatsApp: 'أرسل الطلب عبر واتساب',
            fillRequired: 'الرجاء ملء جميع الحقول المطلوبة',
            selectBranchError: 'الرجاء اختيار الفرع',
            newOrder: 'طلب جديد من كهرمانة بغداد',
            thankYou: 'شكراً لاختياركم كهرمانة بغداد',
            itemNotes: 'ملاحظات الوجبة',
            orderNumber: 'رقم الطلب',
            time: 'الوقت',
            orderDetails: 'تفاصيل الطلب',
            clientData: 'بيانات العميل',
            finalPriceWarning: 'الأسعار النهائية يتم تأكيدها من قبل المطعم',
            brandSlogan: 'سفير المذاق البغدادي في البحرين',
            qtyLabel: 'الكمية'
        },
        en: {
            cartTitle: 'Shopping Cart',
            emptyCart: 'Your cart is empty',
            itemsInCart: 'items in cart',
            total: 'Total',
            checkout: 'Checkout',
            close: 'Close',
            addedToCart: 'Added to cart ✓',
            removedFromCart: 'Removed from cart',
            customerInfo: 'Order Information',
            fullName: 'Full Name',
            addressLabel: 'Address or Location Link',
            detectLocation: 'Detect My Location',
            locationDetected: 'Location detected ✓',
            locationError: 'Could not detect location',
            selectBranch: 'Select Branch',
            branchPlaceholder: 'Choose a branch...',
            orderType: 'Order Type',
            delivery: 'Delivery',
            pickup: 'Pickup',
            paymentMethod: 'Payment Method',
            cash: 'Cash',
            benefitPay: 'BenefitPay',
            notesPlaceholder: 'Any additional notes...',
            sendWhatsApp: 'Send Order via WhatsApp',
            fillRequired: 'Please fill all required fields',
            selectBranchError: 'Please select a branch',
            newOrder: 'New Order from Kahramana Baghdad',
            branch: 'Branch',
            thankYou: 'Thank you for choosing Kahramana Baghdad',
            itemNotes: 'Meal notes',
            orderNumber: 'Order ID',
            time: 'Time',
            orderDetails: 'Order Details',
            clientData: 'Client Info',
            finalPriceWarning: 'Final prices are confirmed by the restaurant',
            brandSlogan: 'Ambassador of Baghdadi Taste in Bahrain',
            qtyLabel: 'Qty'
        }
    };

    function t(key) { return (i18n[CONFIG.lang] || i18n.ar)[key] || key; }
    function getCurrency() { return CONFIG.currencySymbol[CONFIG.lang] || 'BHD'; }

    let cartItems = [];
    let isDrawerOpen = false;

    function loadCart() {
        try {
            const data = localStorage.getItem(CONFIG.storageKey);
            const raw = data ? JSON.parse(data) : [];
            // Relaxed filtering: allow items even if they aren't in the static PRICE_CATALOG
            cartItems = raw.map(item => ({
                ...item,
                price: item.price || PRICE_CATALOG[item.id] || 0,
                qty: Math.min(MAX_ITEM_QTY, Math.max(1, parseInt(item.qty) || 1)),
                notes: String(item.notes || '').substring(0, 300)
            }));
        } catch (e) { cartItems = []; }
    }

    function saveCart() { localStorage.setItem(CONFIG.storageKey, JSON.stringify(cartItems)); }
    function getItemCount() { return cartItems.reduce((sum, item) => sum + item.qty, 0); }
    function getTotal() { return cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0); }

    function addItem(id, name, price, image) {
        // Use passed price, or fallback to catalog, or 0
        const finalPrice = typeof price === 'number' ? price : (PRICE_CATALOG[id] || 0);

        const existing = cartItems.find(item => item.id === id);
        if (existing) existing.qty = Math.min(MAX_ITEM_QTY, existing.qty + 1);
        else cartItems.push({
            id,
            name,
            price: finalPrice,
            image: image || '/assets/brand/logo.webp',
            qty: 1,
            notes: ''
        });
        saveCart(); updateAllUI(); showToast(t('addedToCart'));
        if (navigator.vibrate) navigator.vibrate(15);
    }

    function removeItem(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        saveCart(); updateAllUI(); showToast(t('removedFromCart'));
    }

    function updateQty(id, delta) {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;
        item.qty = Math.min(MAX_ITEM_QTY, Math.max(0, item.qty + delta));
        if (item.qty <= 0) removeItem(id);
        else { saveCart(); updateAllUI(); }
    }

    // New helper for item-level notes
    window.cartUpdateItemNotes = function (id, notes) {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            item.notes = sanitizeInput(notes, 100);
            saveCart();
        }
    };

    function createFloatingBar() {
        if (document.getElementById('cart-floating-bar')) return;
        const bar = document.createElement('div');
        bar.id = 'cart-floating-bar';
        bar.innerHTML = `
            <div class="cfb-inner">
                <div class="cfb-count"><span id="cfb-count-num">0</span> <span class="cfb-count-label">${t('itemsInCart')}</span></div>
                <div class="cfb-total"><span id="cfb-total-amount">0.000 ${getCurrency()}</span></div>
                <button type="button" class="cfb-checkout-btn" onclick="window.openCart()">${t('checkout')}</button>
            </div>
        `;
        document.body.appendChild(bar);
    }

    function createDrawer() {
        if (document.getElementById('cart-drawer-overlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'cart-drawer-overlay';
        overlay.innerHTML = `
            <div class="cd-panel">
                <div class="cd-header">
                    <h2 class="cd-title">${t('cartTitle')}</h2>
                    <button type="button" class="cd-close" onclick="window.closeCart()">✕</button>
                </div>
                <div class="cd-items" id="cd-items-container"></div>
                
                <div class="cd-form" id="cd-form-container">
                    <!-- Client Info -->
                    <div class="cd-field"><input type="text" id="cd-name" placeholder="${t('fullName')}"></div>
                    <div class="cd-field gps-group">
                        <input type="text" id="cd-address" placeholder="${t('addressLabel')}">
                        <button type="button" onclick="window.cartDetectLocation()" class="gps-btn">📍</button>
                    </div>
                    <div class="cd-field">
                        <select id="cd-branch" class="custom-select">
                            <option value="">${t('branchPlaceholder')}</option>
                            ${BRANCHES.map(b => `<option value="${b.id}">${b.name[CONFIG.lang]}</option>`).join('')}
                        </select>
                    </div>

                    <!-- Order Type & Payment (New Grid) -->
                    <div class="cd-grid-selectors">
                        <div class="cd-selector-group">
                            <label class="cd-group-label">${t('orderType')}</label>
                            <div class="cd-toggle-box" id="order-type-toggle">
                                <button type="button" class="cd-toggle-item active" data-val="delivery">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M13 5H4v9h16V9l-3-4h-4z"/><path d="M13 5v9"/></svg>
                                    <span>${t('delivery')}</span>
                                </button>
                                <button type="button" class="cd-toggle-item" data-val="pickup">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                                    <span>${t('pickup')}</span>
                                </button>
                            </div>
                        </div>
                        <div class="cd-selector-group">
                            <label class="cd-group-label">${t('paymentMethod')}</label>
                            <div class="cd-toggle-box" id="payment-method-toggle">
                                <button type="button" class="cd-toggle-item active" data-val="cash">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                                    <span>${t('cash')}</span>
                                </button>
                                <button type="button" class="cd-toggle-item" data-val="benefit">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                                    <span>${t('benefitPay')}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Global Notes -->
                    <div class="cd-field">
                        <textarea id="cd-notes" placeholder="${t('notesPlaceholder')}" rows="2"></textarea>
                    </div>
                </div>

                <div class="cd-footer">
                    <div class="cd-total-row"><span>${t('total')}</span><span id="cd-total-display">0.000</span></div>
                    <button type="button" class="cd-submit-btn" onclick="window.cartSubmit()">${t('sendWhatsApp')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Toggle handlers
        document.querySelectorAll('.cd-toggle-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement;
                parent.querySelectorAll('.cd-toggle-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (navigator.vibrate) navigator.vibrate(10);
            });
        });

        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDrawer(); });
    }

    function updateAllUI() {
        const count = getItemCount();
        const total = getTotal();

        const countNum = document.getElementById('cfb-count-num');
        if (countNum) countNum.textContent = count;
        const totalAmt = document.getElementById('cfb-total-amount');
        if (totalAmt) totalAmt.textContent = `${total.toFixed(3)} ${getCurrency()}`;
        const bar = document.getElementById('cart-floating-bar');
        if (bar) bar.classList.toggle('visible', count > 0);

        const container = document.getElementById('cd-items-container');
        if (container) {
            if (cartItems.length === 0) container.innerHTML = `<div class="cd-empty">${t('emptyCart')}</div>`;
            else container.innerHTML = cartItems.map(item => `
                <div class="cd-item">
                    <img src="${item.image}" class="cd-item-img" onerror="this.src='/assets/brand/logo.webp'; this.classList.add('is-logo')">
                    <div class="cd-info">
                        <div class="cd-item-head">
                            <div class="cd-name">${item.name}</div>
                            <div class="cd-price">${item.price.toFixed(3)}</div>
                        </div>
                        <div class="cd-item-meta">
                            <input type="text" class="cd-item-notes-input" 
                                placeholder="${t('itemNotes')}..." 
                                value="${escapeHTML(item.notes)}"
                                onchange="window.cartUpdateItemNotes('${item.id}', this.value)">
                            <div class="cd-qty">
                                <button onclick="window.cartUpdateQty('${item.id}', -1)">−</button>
                                <span>${item.qty}</span>
                                <button onclick="window.cartUpdateQty('${item.id}', 1)">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        const totalDisp = document.getElementById('cd-total-display');
        if (totalDisp) totalDisp.textContent = `${total.toFixed(3)} ${getCurrency()}`;
    }

    function openDrawer() { document.getElementById('cart-drawer-overlay').classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeDrawer() { document.getElementById('cart-drawer-overlay').classList.remove('open'); document.body.style.overflow = ''; }

    function submitOrder() {
        const name = document.getElementById('cd-name').value;
        const address = document.getElementById('cd-address').value;
        const branchId = document.getElementById('cd-branch').value;
        const globalNotes = document.getElementById('cd-notes').value;

        const orderType = document.querySelector('#order-type-toggle .active').dataset.val;
        const payment = document.querySelector('#payment-method-toggle .active').dataset.val;

        if (cartItems.length === 0) { showToast(t('emptyCart')); return; }
        if (!name || !address) { showToast(t('fillRequired')); return; }
        if (!branchId) { showToast(t('selectBranchError')); return; }

        const branch = BRANCHES.find(b => b.id === branchId);
        const now = new Date();
        const dateStr = now.toLocaleDateString(CONFIG.lang === 'ar' ? 'ar-BH' : 'en-BH');
        const timeStr = now.toLocaleTimeString(CONFIG.lang === 'ar' ? 'ar-BH' : 'en-BH');

        // Generate Order ID (KH + YYMMDD + 4 digits)
        const orderId = `KH${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

        const sep = '━━━━━━━━━━━━━━━━━━━━━━━';

        let msg = `✨ *${t('newOrder')}* ✨\n\n`;
        msg += `🆔 *${t('orderNumber')}:* ${orderId}\n`;
        msg += `📍 *${t('branch')}:* ${branch.name[CONFIG.lang]}\n`;
        msg += `⏰ *${t('time')}:* ${dateStr} ${timeStr}\n`;
        msg += `${sep}\n\n`;

        msg += `🍴 *${t('orderDetails')}:*\n`;
        cartItems.forEach((i, index) => {
            msg += `${index + 1}. *${i.name}*\n`;
            msg += `   ${t('qtyLabel')}: ${i.qty} × ${i.price.toFixed(3)} = ${(i.price * i.qty).toFixed(3)} ${getCurrency()}\n`;
            if (i.notes) msg += `   └ 📝 _${i.notes}_\n`;
        });

        msg += `\n${sep}\n`;
        msg += `💰 *${t('total')}:* ${getTotal().toFixed(3)} ${getCurrency()}\n`;
        msg += `${sep}\n\n`;

        msg += `👤 *${t('clientData')}:*\n`;
        msg += `• الاسم: ${name}\n`;
        msg += `• العنوان: ${address}\n`;
        msg += `• النوع: ${orderType === 'delivery' ? '🚚 ' + t('delivery') : '🛍️ ' + t('pickup')}\n`;
        msg += `• الدفع: ${payment === 'cash' ? '💵 ' + t('cash') : '💳 ' + t('benefitPay')}\n`;

        if (globalNotes) msg += `• ملاحظات: ${globalNotes}\n`;

        msg += `${sep}\n\n`;
        msg += `📝 _${t('finalPriceWarning')}_\n`;
        msg += `🙏 ${t('thankYou')}\n`;
        msg += `🕌 *${t('brandSlogan')}*`;

        window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    }

    function showToast(m) {
        let t = document.getElementById('cart-toast');
        if (!t) { t = document.createElement('div'); t.id = 'cart-toast'; document.body.appendChild(t); }
        t.textContent = m; t.className = 'show';
        setTimeout(() => t.className = '', 3000);
    }

    function injectStyles() {
        const s = document.createElement('style');
        s.textContent = `
            /* Floating Bar */
            #cart-floating-bar { position: fixed; bottom: 85px; left: 16px; right: 16px; z-index: 99; transform: translateY(200%); transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
            #cart-floating-bar.visible { transform: translateY(0); }
            .cfb-inner { background: var(--bg-primary); color: var(--text-body); border-radius: 20px; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-subtle); box-shadow: 0 12px 40px rgba(0,0,0,0.6); backdrop-filter: blur(16px); }
            .cfb-checkout-btn { background: var(--brand-gold); color: var(--bg-primary); padding: 10px 24px; border-radius: 12px; font-weight: 800; font-size: 0.9rem; box-shadow: 0 4px 15px rgba(197,160,89,0.3); }

            #cart-drawer-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(69, 44, 35, 0.7); opacity: 0; visibility: hidden; transition: 0.4s; backdrop-filter: blur(10px); }
            #cart-drawer-overlay.open { opacity: 1; visibility: visible; }
            .cd-panel { position: absolute; top:0; bottom:0; width: 100%; max-width: 420px; background: var(--bg-primary); transform: translateX(-100%); transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); display: flex; flex-direction: column; box-shadow: -10px 0 40px rgba(0,0,0,0.4); }
            html[dir="rtl"] .cd-panel { right:0; transform: translateX(100%); }
            #cart-drawer-overlay.open .cd-panel { transform: translateX(0); }

            .cd-header { padding: 24px; border-bottom: 1px solid rgba(245, 235, 219, 0.1); display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); }
            .cd-title { font-weight: 800; color: var(--base-gold); font-size: 1.25rem; margin:0; }
            .cd-close { background: rgba(255,255,255,0.05); color: var(--base-lace); width:36px; height:36px; border-radius:50%; border:1px solid rgba(245,235,219,0.1); display:flex; align-items:center; justify-content:center; }

            .cd-items { flex: 1; overflow-y: auto; padding: 20px; background: rgba(0,0,0,0.1); }
            .cd-item { display:flex; gap:16px; margin-bottom:16px; background: rgba(255,255,255,0.04); padding:12px; border-radius:18px; border:1px solid rgba(245,235,219,0.08); }
            .cd-item-img { width:72px; height:72px; border-radius:12px; object-fit:cover; border:1px solid rgba(217,174,36,0.2); transition: 0.3s; }
            .cd-item-img.is-logo { filter: brightness(0) saturate(100%) invert(75%) sepia(35%) saturate(765%) hue-rotate(351deg) brightness(92%) contrast(85%); }
            .cd-info { flex:1; display:flex; flex-direction:column; }
            .cd-item-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; }
            .cd-name { font-weight:700; color: var(--base-lace); font-size: 0.95rem; }
            .cd-price { color: var(--base-gold); font-weight:800; font-size: 0.85rem; }
            .cd-item-meta { display:flex; flex-direction:column; gap:8px; }
            .cd-item-notes-input { background: rgba(0,0,0,0.2); border: 1px solid rgba(245,235,219,0.1); color: var(--base-lace); padding:6px 10px; border-radius:8px; font-size:0.75rem; width:100%; outline:none; }
            .cd-item-notes-input::placeholder { color: rgba(245,235,219,0.3); }
            .cd-qty { display:flex; gap:12px; align-items:center; }
            .cd-qty button { width:26px; height:26px; background:rgba(217,174,36,0.15); color:var(--base-gold); border-radius:50%; border:1px solid rgba(217,174,36,0.2); }
            .cd-qty span { font-weight:500; color: var(--base-lace); font-size:0.9rem; }

            .cd-form { padding:20px; border-top: 1px solid rgba(245, 235, 219, 0.1); background: rgba(255,255,255,0.02); }
            .cd-field { margin-bottom:12px; }
            .cd-field input, .cd-field select, .cd-field textarea { width:100%; padding:14px; border-radius:14px; background: rgba(0,0,0,0.2); border: 1px solid rgba(245, 235, 219, 0.15); color: var(--base-lace); outline:none; transition: 0.3s; font-family: inherit; accent-color: var(--brand-gold); }
            .cd-field ::selection { background: var(--brand-gold); color: var(--bg-primary); }
            .cd-field select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C5A059'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: left 12px center; padding-left: 40px; }
            html[dir="ltr"] .cd-field select { background-position: right 12px center; padding-right: 40px; }
            .cd-field select option { background: var(--base-walnut); color: var(--base-lace); }

            .cd-grid-selectors { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
            .cd-selector-group { display: flex; flex-direction: column; gap: 6px; }
            .cd-group-label { font-size: 0.75rem; font-weight: 700; color: var(--base-gold); text-align: center; }
            .cd-toggle-box { background: rgba(0,0,0,0.25); border-radius: 14px; padding: 4px; display: flex; gap: 4px; border: 1px solid rgba(245, 235, 219, 0.05); }
            .cd-toggle-item { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 10px 4px; border-radius: 10px; background: transparent; color: rgba(245, 235, 219, 0.4); transition: 0.3s; }
            .cd-toggle-item svg { width: 20px; height: 20px; opacity: 0.7; }
            .cd-toggle-item span { font-size: 0.7rem; font-weight: 600; }
            .cd-toggle-item.active { background: rgba(217, 174, 36, 0.12); color: var(--base-gold); border: 1px solid rgba(217,174,36,0.3); box-shadow: 0 0 15px rgba(217,174,36,0.15); }
            .cd-toggle-item.active svg { opacity: 1; }

            .gps-group { display:flex; gap:10px; }
            .gps-btn { background: rgba(217, 174, 36, 0.15); border: 1px solid var(--base-gold); color: var(--base-gold); border-radius:14px; padding: 0 14px; }

            .cd-footer { padding:20px; border-top: 1px solid var(--border-subtle); background: var(--bg-primary); }
            .cd-total-row { display:flex; justify-content:space-between; font-weight:800; margin-bottom:16px; font-size:1.25rem; color: var(--text-body); }
            #cd-total-display { color: var(--brand-gold); }
            .cd-submit-btn { width:100%; background: var(--brand-gold); color: var(--bg-primary); padding:16px; border-radius:16px; font-weight:900; box-shadow: 0 8px 25px rgba(197,160,89,0.3); }

            #cart-toast { position: fixed; bottom: 160px; left: 50%; transform: translateX(-50%); background: var(--brand-gold); color: var(--bg-primary); padding: 10px 24px; border-radius: 30px; opacity: 0; transition: 0.3s; z-index: 2001; font-weight: 800; box-shadow: 0 8px 30px rgba(0,0,0,0.4); font-size: 0.85rem; }
            #cart-toast.show { opacity: 1; }
        `;
        document.head.appendChild(s);
    }

    window.addToCart = addItem;
    window.cartUpdateQty = updateQty;
    window.openCart = openDrawer;
    window.closeCart = closeDrawer;
    window.cartSubmit = submitOrder;
    window.cartDetectLocation = function () {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(p => {
            document.getElementById('cd-address').value = `https://maps.google.com/?q=${p.coords.latitude},${p.coords.longitude}`;
            showToast(t('locationDetected'));
        });
    };

    injectStyles(); loadCart(); createFloatingBar(); createDrawer(); updateAllUI();
})();
