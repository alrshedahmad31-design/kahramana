(function () {
    'use strict';
    // Initialization guard & throttling
    if (window.__KH_CART_LOADED__) return;
    window.__KH_CART_LOADED__ = true;

    const CONFIG = {
        storageKey: 'kahramana_cart_v2', // Maintained for continuity
        lang: document.documentElement.lang || 'ar',
        isRTL: document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar',
        currency: 'BHD',
        currencySymbol: { ar: 'د.ب', en: 'BHD' }
    };

    const PRICE_CATALOG = Object.freeze({
        "kebab-rice": 3.500, "charcoal-chicken": 4.500, "lamb-kebab": 4.000,
        "lamb-ribs": 5.500, "mixed-grill": 7.000, "lentil-soup": 1.000,
        "kubba-soup": 1.500, "tomato-soup": 1.000, "fattoush": 1.200,
        "tabbouleh": 1.200, "hummus": 1.000, "chicken-mandi": 4.500,
        "lamb-mandi": 6.000, "masgouf": 7.000, "dolma": 3.500,
        "chicken-shawarma": 1.500, "sig-pizza": 3.000, "kebab-pizza": 3.000,
        "zaatar": 0.700, "lahm-biajeen": 1.000, "lemon-juice": 0.800,
        "mint-lemonade": 1.000, "laban": 0.500
    });

    const MAX_ITEM_QTY = 50;
    let lastAddAt = 0;

    function escapeHTML(str) {
        const d = document.createElement('div');
        d.textContent = String(str);
        return d.innerHTML;
    }

    function sanitizeInput(str, maxLen = 200) {
        return String(str).replace(/[*_~`━═]/g, '').replace(/\n/g, ' ').trim().substring(0, maxLen);
    }

    const BRANCHES = [
        { id: 'riffa', name: { ar: 'الرفاع', en: 'Riffa' }, whatsapp: '97317131413' },
        { id: 'galali', name: { ar: 'قلالي', en: 'Galali' }, whatsapp: '97317131213' }
    ];

    const i18n = {
        ar: {
            cartTitle: 'سلة الطلبات', emptyCart: 'سلتك فارغة', itemsInCart: 'عناصر في السلة',
            total: 'المجموع', checkout: 'إتمام الطلب', close: 'إغلاق',
            addedToCart: 'تمت الإضافة للسلة ✓', removedFromCart: 'تمت الإزالة من السلة',
            customerInfo: 'معلومات الطلب', fullName: 'الاسم الكامل', addressLabel: 'العنوان أو رابط الموقع',
            detectLocation: 'تحديد موقعي', locationDetected: 'تم تحديد موقعك ✓', locationError: 'تعذر تحديد الموقع',
            selectBranch: 'اختر الفرع', branchPlaceholder: 'اختر الفرع...', orderType: 'نوع الطلب',
            delivery: 'توصيل', pickup: 'استلام', paymentMethod: 'طريقة الدفع',
            cash: 'نقدي', benefitPay: 'بنفت باي', notesPlaceholder: 'أي ملاحظات إضافية...',
            sendWhatsApp: 'أرسل الطلب عبر واتساب', fillRequired: 'الرجاء ملء جميع الحقول المطلوبة',
            selectBranchError: 'الرجاء اختيار الفرع', newOrder: 'طلب جديد من كهرمانة بغداد',
            thankYou: 'شكراً لاختياركم كهرمانة بغداد', itemNotes: 'ملاحظات الوجبة',
            orderNumber: 'رقم الطلب', time: 'الوقت', orderDetails: 'تفاصيل الطلب',
            clientData: 'بيانات العميل', finalPriceWarning: 'الأسعار النهائية يتم تأكيدها من قبل المطعم',
            brandSlogan: 'سفير المذاق البغدادي في البحرين', qtyLabel: 'الكمية'
        },
        en: {
            cartTitle: 'Shopping Cart', emptyCart: 'Your cart is empty', itemsInCart: 'items in cart',
            total: 'Total', checkout: 'Checkout', close: 'Close',
            addedToCart: 'Added to cart ✓', removedFromCart: 'Removed from cart',
            customerInfo: 'Order Information', fullName: 'Full Name', addressLabel: 'Address or Location Link',
            detectLocation: 'Detect My Location', locationDetected: 'Location detected ✓', locationError: 'Could not detect location',
            selectBranch: 'Select Branch', branchPlaceholder: 'Choose a branch...', orderType: 'Order Type',
            delivery: 'Delivery', pickup: 'Pickup', paymentMethod: 'Payment Method',
            cash: 'Cash', benefitPay: 'BenefitPay', notesPlaceholder: 'Any additional notes...',
            sendWhatsApp: 'Send Order via WhatsApp', fillRequired: 'Please fill all required fields',
            selectBranchError: 'Please select a branch', newOrder: 'New Order from Kahramana Baghdad',
            branch: 'Branch', thankYou: 'Thank you for choosing Kahramana Baghdad',
            itemNotes: 'Meal notes', orderNumber: 'Order ID', time: 'Time',
            orderDetails: 'Order Details', clientData: 'Client Info',
            finalPriceWarning: 'Final prices are confirmed by the restaurant',
            brandSlogan: 'Ambassador of Baghdadi Taste in Bahrain', qtyLabel: 'Qty'
        }
    };

    function t(key) { return (i18n[CONFIG.lang] || i18n.ar)[key] || key; }
    function getCurrency() { return CONFIG.currencySymbol[CONFIG.lang] || 'BHD'; }

    let cartItems = [];

    function loadCart() {
        try {
            const data = localStorage.getItem(CONFIG.storageKey);
            const raw = data ? JSON.parse(data) : { items: [] };
            const items = Array.isArray(raw) ? raw : (raw.items || []);
            cartItems = items.map(item => ({
                id: String(item.id),
                name: String(item.name || ''),
                price: Number(item.price || PRICE_CATALOG[item.id] || 0),
                qty: Math.min(MAX_ITEM_QTY, Math.max(1, parseInt(item.qty) || 1)),
                image: item.image || '/assets/brand/logo.webp',
                notes: String(item.notes || '').substring(0, 300)
            }));
        } catch (e) { cartItems = []; }
        emitChange();
    }

    function saveCart() {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify({ items: cartItems }));
        emitChange();
    }

    function emitChange() {
        const count = cartItems.reduce((sum, item) => sum + item.qty, 0);
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
        window.dispatchEvent(new CustomEvent('kahramana:cart', {
            detail: { qty: count, total: total, items: cartItems }
        }));
    }

    function addItem(id, name, price, image) {
        const now = Date.now();
        if (now - lastAddAt < 150) return;
        lastAddAt = now;

        const finalPrice = typeof price === 'number' ? price : (PRICE_CATALOG[id] || 0);
        const existing = cartItems.find(item => item.id === id);
        if (existing) {
            existing.qty = Math.min(MAX_ITEM_QTY, existing.qty + 1);
        } else {
            cartItems.push({
                id, name, price: finalPrice,
                image: image || '/assets/brand/logo.webp',
                qty: 1, notes: ''
            });
        }
        saveCart(); updateAllUI(); showToast(t('addedToCart'));
        if (navigator.vibrate) navigator.vibrate(15);
    }

    // New helper for item-level notes
    window.cartUpdateItemNotes = function (id, notes) {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            item.notes = sanitizeInput(notes, 100);
            saveCart();
        }
    };

    function updateQty(id, delta) {
        const item = cartItems.find(i => i.id === id);
        if (!item) return;
        item.qty = Math.min(MAX_ITEM_QTY, Math.max(0, item.qty + delta));
        if (item.qty <= 0) cartItems = cartItems.filter(i => i.id !== id);
        saveCart(); updateAllUI();
    }

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
                
                <div class="cd-form">
                    <div class="cd-field"><input type="text" id="cd-name" placeholder="${t('fullName')}"></div>
                    <div class="cd-field gps-group">
                        <input type="text" id="cd-address" placeholder="${t('addressLabel')}">
                        <button type="button" onclick="window.cartDetectLocation()" class="gps-btn">📍</button>
                    </div>
                    
                    <div class="cd-field">
                        <label class="cd-section-label">${t('selectBranch')}</label>
                        <div class="cd-branch-selector" id="branch-selector">
                            ${BRANCHES.map(b => `
                                <button type="button" class="cd-branch-item" data-val="${b.id}">
                                    <span class="cd-branch-dot"></span>
                                    <span class="cd-branch-name">${b.name[CONFIG.lang]}</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="cd-grid-selectors">
                        <div class="cd-selector-group">
                            <label class="cd-group-label">${t('orderType')}</label>
                            <div class="cd-toggle-box" id="order-type-toggle">
                                <button type="button" class="cd-toggle-item active" data-val="delivery"><span>${t('delivery')}</span></button>
                                <button type="button" class="cd-toggle-item" data-val="pickup"><span>${t('pickup')}</span></button>
                            </div>
                        </div>
                        <div class="cd-selector-group">
                            <label class="cd-group-label">${t('paymentMethod')}</label>
                            <div class="cd-toggle-box" id="payment-method-toggle">
                                <button type="button" class="cd-toggle-item active" data-val="cash"><span>${t('cash')}</span></button>
                                <button type="button" class="cd-toggle-item" data-val="benefit"><span>${t('benefitPay')}</span></button>
                            </div>
                        </div>
                    </div>

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

        // Branch Selection Toggle
        const branchBtns = document.querySelectorAll('.cd-branch-item');
        branchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                branchBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (navigator.vibrate) navigator.vibrate(10);
            });
        });

        // Toggle Selection Handler
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
        const count = cartItems.reduce((sum, item) => sum + item.qty, 0);
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

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
                    <img src="${item.image}" class="cd-item-img" onerror="this.src='/assets/brand/logo.webp'">
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

        // Sync badge in header
        const badges = document.querySelectorAll('.kh-cart-badge');
        badges.forEach(b => {
            b.textContent = count;
            b.style.display = count > 0 ? 'inline-flex' : 'none';
            b.classList.remove('bump');
            void b.offsetWidth;
            b.classList.add('bump');
        });
    }

    function openDrawer() { document.getElementById('cart-drawer-overlay').classList.add('open'); document.body.style.overflow = 'hidden'; updateAllUI(); }
    function closeDrawer() { document.getElementById('cart-drawer-overlay').classList.remove('open'); document.body.style.overflow = ''; }

    function submitOrder() {
        const name = document.getElementById('cd-name').value;
        const address = document.getElementById('cd-address').value;
        const globalNotes = document.getElementById('cd-notes').value;

        const activeBranch = document.querySelector('.cd-branch-item.active');
        const branchId = activeBranch ? activeBranch.dataset.val : null;

        const orderType = document.querySelector('#order-type-toggle .active').dataset.val;
        const payment = document.querySelector('#payment-method-toggle .active').dataset.val;

        if (cartItems.length === 0) { showToast(t('emptyCart')); return; }
        if (!name || !address) { showToast(t('fillRequired')); return; }
        if (!branchId) { showToast(t('selectBranchError')); return; }

        const branch = BRANCHES.find(b => b.id === branchId);
        const now = new Date();
        const orderId = `KH${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
        const sep = '━━━━━━━━━━━━━━━━━━━━━━━';

        let msg = `✨ *${t('newOrder')}* ✨\n\n🆔 *${t('orderNumber')}:* ${orderId}\n📍 *${t('branch')}:* ${branch.name[CONFIG.lang]}\n⏰ *${t('time')}:* ${now.toLocaleString(CONFIG.lang === 'ar' ? 'ar-BH' : 'en-BH')}\n${sep}\n\n🍴 *${t('orderDetails')}:*\n`;
        cartItems.forEach((i, idx) => {
            msg += `${idx + 1}. *${i.name}*\n   ${t('qtyLabel')}: ${i.qty} × ${i.price.toFixed(3)} = ${(i.price * i.qty).toFixed(3)} ${getCurrency()}\n`;
            if (i.notes) msg += `   └ 📝 _${i.notes}_\n`;
        });
        msg += `\n${sep}\n💰 *${t('total')}:* ${cartItems.reduce((s, i) => s + (i.price * i.qty), 0).toFixed(3)} ${getCurrency()}\n${sep}\n\n👤 *${t('clientData')}:*\n• الاسم: ${name}\n• العنوان: ${address}\n• النوع: ${orderType === 'delivery' ? '🚚 ' + t('delivery') : '🛍️ ' + t('pickup')}\n• الدفع: ${payment === 'cash' ? '💵 ' + t('cash') : '💳 ' + t('benefitPay')}\n`;
        if (globalNotes) msg += `• ملاحظات: ${globalNotes}\n`;
        msg += `${sep}\n\n📝 _${t('finalPriceWarning')}_\n🙏 ${t('thankYou')}\n🕌 *${t('brandSlogan')}*`;

        window.open(`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    }

    function showToast(m) {
        let t = document.getElementById('cart-toast');
        if (!t) { t = document.createElement('div'); t.id = 'cart-toast'; document.body.appendChild(t); }
        t.textContent = m; t.className = 'show';
        setTimeout(() => t.className = '', 3000);
    }

    function injectStyles() {
        if (document.getElementById('kh-cart-style')) return;
        const s = document.createElement('style');
        s.id = 'kh-cart-style';
        s.textContent = `
            #cart-floating-bar { position: fixed; bottom: 85px; left: 16px; right: 16px; z-index: var(--z-nav); transform: translateY(200%); transition: var(--dur-4) var(--ease-std); }
            #cart-floating-bar.visible { transform: translateY(0); }
            .cfb-inner { background: var(--bg-primary); color: var(--text-body); border-radius: var(--radius-2); padding: var(--space-3) var(--space-5); display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-3); backdrop-filter: blur(12px); }
            .cfb-checkout-btn { background: var(--color-gold); color: var(--bg-primary); padding: var(--space-2) var(--space-5); border-radius: var(--radius-1); font-weight: var(--fw-black); font-size: var(--fs-300); box-shadow: var(--glow-gold); cursor:pointer; }

            #cart-drawer-overlay { position: fixed; inset: 0; z-index: var(--z-modal); background: var(--modal-overlay-bg); opacity: 0; visibility: hidden; transition: var(--dur-3); backdrop-filter: blur(8px); }
            #cart-drawer-overlay.open { opacity: 1; visibility: visible; }
            .cd-panel { position: absolute; top:0; bottom:0; width: 100%; max-width: 420px; background: var(--bg-primary); transform: translateX(-100%); transition: var(--dur-4) var(--ease-std); display: flex; flex-direction: column; border-inline-end: 1px solid var(--border-subtle); box-shadow: 10px 0 30px rgba(0,0,0,0.4); }
            html[dir="rtl"] .cd-panel { right:0; transform: translateX(100%); left: auto; }
            #cart-drawer-overlay.open .cd-panel { transform: translateX(0); }

            .cd-header { padding: var(--space-5); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: linear-gradient(to bottom, var(--bg-white-low), transparent); }
            .cd-title { font-weight: var(--fw-black); color: var(--color-gold); font-size: var(--fs-700); margin:0; letter-spacing: -0.01em; }
            .cd-close { background: var(--bg-white-low); color: var(--text-body); width:44px; height:44px; border-radius:var(--radius-pill); border:1px solid var(--border-subtle); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size: 20px; transition: var(--dur-2); }
            .cd-close:hover { background: var(--bg-white-mid); color: var(--color-gold); }

            .cd-items { flex: 1; overflow-y: auto; padding: var(--space-4); background: rgba(0,0,0,0.12); }
            .cd-item { display:flex; gap:var(--space-4); margin-bottom:var(--space-3); background: var(--bg-white-low); padding:var(--space-3); border-radius:var(--radius-2); border:1px solid var(--border-subtle); transition: var(--dur-2); }
            .cd-item:hover { border-color: rgba(197, 160, 89, 0.3); background: var(--bg-white-mid); }
            .cd-item-img { width:64px; height:64px; border-radius:var(--radius-1); object-fit:cover; border: 1px solid var(--border-subtle); }
            .cd-info { flex:1; display:flex; flex-direction:column; }
            .cd-item-head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:var(--space-2); }
            .cd-name { font-weight:var(--fw-bold); color: var(--text-body); font-size: var(--fs-400); line-height: 1.2; }
            .cd-price { color: var(--color-gold); font-weight:var(--fw-black); font-size: var(--fs-300); }
            .cd-item-meta { display:flex; flex-direction:column; gap:var(--space-2); }
            .cd-item-notes-input { background: rgba(0,0,0,0.2); border: 1px solid var(--border-subtle); color: var(--text-body); padding:var(--space-1) var(--space-2); border-radius:var(--radius-1); font-size:var(--fs-200); width:100%; outline:none; transition: var(--dur-2); }
            .cd-item-notes-input:focus { border-color: var(--color-gold); background: rgba(0,0,0,0.4); }
            .cd-qty { display:flex; gap:var(--space-3); align-items:center; }
            .cd-qty button { width:28px; height:28px; background:var(--bg-white-mid); color:var(--color-gold); border-radius:var(--radius-pill); border:1px solid var(--border-subtle); cursor:pointer; font-weight: var(--fw-black); transition: var(--dur-2); }
            .cd-qty button:hover { background: var(--color-gold); color: var(--bg-primary); }
            .cd-qty span { font-weight:var(--fw-bold); color: var(--text-body); font-size:var(--fs-400); min-width: 16px; text-align: center; }

            .cd-form { padding:var(--space-4); border-top: 1px solid var(--border-subtle); background: var(--bg-white-low); display: flex; flex-direction: column; gap: var(--space-3); }
            .cd-section-label { font-size: var(--fs-100); font-weight: var(--fw-black); color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; display: block; }
            .cd-field input, .cd-field textarea { width:100%; padding:var(--space-3); border-radius:var(--radius-1); background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); color: var(--text-body); outline:none; font-family: inherit; font-size: var(--fs-400); transition: var(--dur-2); }
            .cd-field input:focus, .cd-field textarea:focus { border-color: var(--color-gold); background: rgba(0,0,0,0.5); box-shadow: 0 0 10px rgba(197, 160, 89, 0.1); }
            
            .cd-branch-selector { display: flex; flex-direction: column; gap: 8px; }
            .cd-branch-item { display: flex; align-items: center; gap: 12px; padding: var(--space-3); border-radius: var(--radius-1); background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); cursor:pointer; transition: var(--dur-2); text-align: start; }
            .cd-branch-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--color-gold); transition: var(--dur-2); flex-shrink: 0; }
            .cd-branch-name { color: var(--text-body); font-size: var(--fs-400); font-weight: var(--fw-bold); transition: var(--dur-2); }
            .cd-branch-item.active { background: rgba(197, 160, 89, 0.15); border-color: var(--color-gold); }
            .cd-branch-item.active .cd-branch-dot { background: var(--color-gold); box-shadow: 0 0 8px var(--color-gold); }
            .cd-branch-item.active .cd-branch-name { color: var(--color-gold); }

            .cd-grid-selectors { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
            .cd-selector-group { display: flex; flex-direction: column; gap: 6px; }
            .cd-group-label { font-size: var(--fs-100); font-weight: var(--fw-black); color: var(--color-gold); text-align: center; text-transform: uppercase; letter-spacing: 0.05em; }
            .cd-toggle-box { background: rgba(0,0,0,0.3); border-radius: var(--radius-1); padding: 4px; display: flex; gap: 4px; border: 1px solid var(--border-subtle); }
            .cd-toggle-item { flex: 1; padding: var(--space-2); border-radius: var(--radius-1); background: transparent; color: rgba(255,255,255,0.4); border:none; cursor:pointer; transition: var(--dur-2); font-size: var(--fs-200); font-weight: var(--fw-bold); text-align: center; }
            .cd-toggle-item.active { background: var(--color-gold); color: var(--bg-primary); font-weight: var(--fw-black); box-shadow: 0 4px 10px rgba(197, 160, 89, 0.2); }

            .gps-group { display:flex; gap:10px; }
            .gps-btn { background: var(--bg-white-mid); border: 1px solid var(--color-gold); color: var(--color-gold); border-radius:var(--radius-1); padding: 0 var(--space-3); cursor:pointer; transition: var(--dur-2); }
            .gps-btn:hover { background: var(--color-gold); color: var(--bg-primary); }

            .cd-footer { padding:var(--space-5); border-top: 1px solid var(--border-subtle); background: var(--bg-primary); }
            .cd-total-row { display:flex; justify-content:space-between; font-weight:var(--fw-black); margin-bottom:var(--space-4); font-size:var(--fs-700); color: var(--text-body); }
            #cd-total-display { color: var(--color-gold); }
            .cd-submit-btn { width:100%; background: var(--color-gold); color: var(--bg-primary); padding:var(--space-4); border-radius:var(--radius-1); font-weight:var(--fw-black); font-size: var(--fs-400); cursor:pointer; box-shadow: var(--glow-gold); transition: var(--dur-2); border: none; text-transform: uppercase; letter-spacing: 0.02em; }
            .cd-submit-btn:hover { filter: brightness(1.1); transform: translateY(-2px); }
            .cd-submit-btn:active { transform: scale(0.98); }

            #cart-toast { position: fixed; bottom: 160px; left: 50%; transform: translateX(-50%); background: var(--color-gold); color: var(--bg-primary); padding: var(--space-2) var(--space-6); border-radius: var(--radius-pill); opacity: 0; transition: var(--dur-3); z-index: var(--z-toast); font-weight: var(--fw-black); box-shadow: var(--shadow-3); font-size: var(--fs-300); pointer-events:none; border: 1px solid rgba(255,255,255,0.2); }
            #cart-toast.show { opacity: 1; transform: translateX(-50%) translateY(-10px); }
            
            .kh-cart-badge { position: absolute; top: -6px; right: -6px; min-width: 20px; height: 20px; padding: 0 5px; border-radius: var(--radius-pill); background: var(--color-gold); color: var(--bg-primary); font-weight: var(--fw-black); font-size: 11px; display: inline-flex; align-items: center; justify-content: center; box-shadow: var(--glow-gold); transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); pointer-events: none; }
            .kh-cart-badge.bump { transform: scale(1.4); }
            html[dir="rtl"] .kh-cart-badge { right: auto; left: -6px; }
        `;
        document.head.appendChild(s);
    }

    window.addToCart = addItem;
    window.cartUpdateQty = updateQty;
    window.openCart = openDrawer;
    window.closeCart = closeDrawer;
    window.cartSubmit = submitOrder;
    window.getCartItemQty = (id) => {
        const item = cartItems.find(i => i.id === id);
        return item ? item.qty : 0;
    };
    window.setCartQty = (id, qty) => {
        const q = parseInt(qty) || 0;
        const existing = cartItems.find(item => item.id === id);
        if (q <= 0) {
            cartItems = cartItems.filter(i => i.id !== id);
        } else if (existing) {
            existing.qty = Math.min(MAX_ITEM_QTY, q);
        } else {
            cartItems.push({ id, name: '', price: 0, qty: q, image: '' });
        }
        saveCart(); updateAllUI();
    };
    window.cartDetectLocation = function () {
        if (!navigator.geolocation) { showToast(t('locationError')); return; }
        navigator.geolocation.getCurrentPosition(p => {
            document.getElementById('cd-address').value = `https://maps.google.com/?q=${p.coords.latitude},${p.coords.longitude}`;
            showToast(t('locationDetected'));
        }, () => showToast(t('locationError')));
    };

    injectStyles(); loadCart(); createFloatingBar(); createDrawer(); updateAllUI();
})();
