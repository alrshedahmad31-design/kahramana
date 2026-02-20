(function () {
    "use strict";

    var STORAGE_KEY = "kahramana_cart_v2";

    function safeParse(json, fallback) {
        try {
            var v = JSON.parse(json);
            return v && typeof v === "object" ? v : fallback;
        } catch (_e) {
            return fallback;
        }
    }

    function getConfig() {
        var cfg = window.__KH_CART_CONFIG__ || null;

        var brand = (cfg && cfg.brand) || {};
        var branches = (cfg && cfg.branches) || [];

        var whatsapp =
            brand.whatsapp ||
            (brand.whatsapp_url ? String(brand.whatsapp_url).replace("https://wa.me/", "") : "") ||
            "97317131413";

        var fallbackBranches = [
            { id: "riffa-hajiyat", name: { ar: "الرفاع (الحجيات)", en: "Riffa (Hajiyat)" } },
            { id: "muharraq-galali", name: { ar: "المحرق (قلالي)", en: "Muharraq (Galali)" } },
        ];

        return {
            whatsapp: String(whatsapp),
            branches: Array.isArray(branches) && branches.length ? branches : fallbackBranches,
            defaultBranchId:
                Array.isArray(branches) && branches[0] && branches[0].id ? branches[0].id : "riffa-hajiyat",
        };
    }

    function readCart() {
        var cfg = getConfig();
        if (!window.localStorage) return { items: [], branchId: cfg.defaultBranchId, notes: "" };

        var raw = window.localStorage.getItem(STORAGE_KEY) || "";
        var data = safeParse(raw, { items: [], branchId: cfg.defaultBranchId, notes: "" });

        if (!Array.isArray(data.items)) data.items = [];
        if (!data.branchId) data.branchId = cfg.defaultBranchId;
        if (typeof data.notes !== "string") data.notes = "";

        return data;
    }

    function writeCart(cart) {
        if (!window.localStorage) return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    function formatBhd(n) {
        var x = Number(n || 0);
        return x.toFixed(3);
    }

    function getTotals(cart) {
        var qty = 0;
        var total = 0;
        for (var i = 0; i < cart.items.length; i++) {
            var it = cart.items[i];
            qty += Number(it.qty || 0);
            total += Number(it.price || 0) * Number(it.qty || 0);
        }
        return { qty: qty, total: total };
    }

    function emitChange(cart) {
        try {
            var c = cart || readCart();
            var t = getTotals(c);
            window.dispatchEvent(
                new CustomEvent("kahramana:cart", {
                    detail: { qty: t.qty, total: t.total, items: c.items, branchId: c.branchId, notes: c.notes },
                })
            );
        } catch (_e) { }
    }

    function ensureStyles() {
        if (document.getElementById("kh-cart-style")) return;

        var style = document.createElement("style");
        style.id = "kh-cart-style";
        style.textContent =
            "" +
            ".kh-cart-overlay{position:fixed;inset:0;z-index:9999;display:none}" +
            ".kh-cart-overlay[data-open='1']{display:block}" +
            ".kh-cart-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(10px)}" +
            ".kh-cart-panel{position:absolute;top:0;bottom:0;width:min(420px,92vw);background:var(--bg-secondary);border:1px solid var(--border-subtle);box-shadow:var(--shadow-3);display:flex;flex-direction:column;overflow:hidden;transform:translateX(110%);transition:transform var(--motion-base) var(--ease-std)}" +
            "html[dir='rtl'] .kh-cart-panel{transform:translateX(-110%)}" +
            ".kh-cart-overlay[data-open='1'] .kh-cart-panel{transform:translateX(0)}" +
            ".kh-cart-header{display:flex;align-items:center;justify-content:space-between;padding:16px;border-bottom:1px solid var(--border-subtle)}" +
            ".kh-cart-title{font-weight:900;color:var(--text-primary);font-size:18px}" +
            ".kh-cart-close{width:48px;height:48px;border-radius:9999px;border:1px solid var(--border-subtle);background:rgba(255,255,255,.04);color:var(--text-on-dark);cursor:pointer}" +
            ".kh-cart-body{padding:12px;overflow:auto;flex:1}" +
            ".kh-cart-row{display:flex;gap:12px;align-items:flex-start;padding:12px;border-radius:24px;background:rgba(197,160,89,.06);border:1px solid var(--border-subtle);margin-bottom:10px}" +
            ".kh-cart-img{width:64px;height:64px;border-radius:16px;object-fit:cover;background:rgba(0,0,0,.2)}" +
            ".kh-cart-name{font-weight:800;color:var(--text-on-dark);font-size:14px;line-height:1.2}" +
            ".kh-cart-meta{color:var(--text-muted);font-size:12px;margin-top:6px}" +
            ".kh-cart-actions{margin-inline-start:auto;display:flex;flex-direction:column;align-items:flex-end;gap:10px}" +
            ".kh-cart-qty{display:flex;align-items:center;gap:8px}" +
            ".kh-cart-btn{width:36px;height:36px;border-radius:14px;border:1px solid var(--border-subtle);background:rgba(255,255,255,.04);color:var(--text-on-dark);cursor:pointer}" +
            ".kh-cart-qtynum{min-width:24px;text-align:center;font-weight:800;color:var(--text-on-dark)}" +
            ".kh-cart-remove{background:transparent;border:none;color:var(--color-destructive);cursor:pointer;font-weight:800;font-size:12px}" +
            ".kh-cart-footer{border-top:1px solid var(--border-subtle);padding:12px;display:flex;flex-direction:column;gap:10px}" +
            ".kh-cart-total{display:flex;align-items:center;justify-content:space-between;color:var(--text-on-dark);font-weight:900}" +
            ".kh-cart-select{height:48px;border-radius:16px;border:1px solid var(--border-subtle);background:rgba(0,0,0,.18);color:var(--text-on-dark);padding:0 12px;outline:none}" +
            ".kh-cart-notes{min-height:92px;resize:vertical;border-radius:16px;border:1px solid var(--border-subtle);background:rgba(0,0,0,.18);color:var(--text-on-dark);padding:10px 12px;outline:none;line-height:1.4}" +
            ".kh-cart-cta{height:48px;border-radius:18px;border:none;background:var(--color-gold);color:var(--bg-primary);font-weight:900;cursor:pointer;box-shadow:var(--shadow-gold)}" +
            ".kh-cart-secondary{height:44px;border-radius:16px;border:1px solid var(--border-subtle);background:rgba(255,255,255,.04);color:var(--text-on-dark);font-weight:900;cursor:pointer}" +
            ".kh-cart-empty{padding:18px;border-radius:24px;border:1px dashed var(--border-subtle);color:var(--text-muted);text-align:center}" +
            ".kh-cart-badge{position:absolute;top:-6px;right:-6px;min-width:18px;height:18px;padding:0 6px;border-radius:9999px;background:var(--color-gold);color:var(--bg-primary);font-weight:900;font-size:11px;display:inline-flex;align-items:center;justify-content:center;box-shadow:var(--shadow-gold)}" +
            "html[dir='rtl'] .kh-cart-badge{right:auto;left:-6px}";
        document.head.appendChild(style);
    }

    function ensureDom() {
        ensureStyles();

        var existing = document.getElementById("kh-cart-overlay");
        if (existing) return existing;

        var overlay = document.createElement("div");
        overlay.id = "kh-cart-overlay";
        overlay.className = "kh-cart-overlay";
        overlay.setAttribute("data-open", "0");
        overlay.setAttribute("aria-hidden", "true");

        var backdrop = document.createElement("div");
        backdrop.className = "kh-cart-backdrop";
        backdrop.addEventListener("click", closeCart);

        var panel = document.createElement("div");
        panel.className = "kh-cart-panel";

        var header = document.createElement("div");
        header.className = "kh-cart-header";

        var title = document.createElement("div");
        title.className = "kh-cart-title";
        title.textContent = document.documentElement.dir === "rtl" ? "سلة الطلب" : "Cart";

        var closeBtn = document.createElement("button");
        closeBtn.className = "kh-cart-close";
        closeBtn.type = "button";
        closeBtn.setAttribute("aria-label", "Close");
        closeBtn.textContent = "×";
        closeBtn.addEventListener("click", closeCart);

        header.appendChild(title);
        header.appendChild(closeBtn);

        var body = document.createElement("div");
        body.className = "kh-cart-body";
        body.id = "kh-cart-body";

        var footer = document.createElement("div");
        footer.className = "kh-cart-footer";
        footer.id = "kh-cart-footer";

        panel.appendChild(header);
        panel.appendChild(body);
        panel.appendChild(footer);

        overlay.appendChild(backdrop);
        overlay.appendChild(panel);

        document.body.appendChild(overlay);

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeCart();
        });

        return overlay;
    }

    function findCountTarget(btn) {
        var els = btn.querySelectorAll("*");
        var best = null;

        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el.children && el.children.length) continue;
            var txt = (el.textContent || "").trim();
            if (/^\d+$/.test(txt)) best = el;
        }

        if (best) return best;

        var childNodes = btn.childNodes || [];
        for (var j = childNodes.length - 1; j >= 0; j--) {
            var n = childNodes[j];
            if (n && n.nodeType === 3) {
                var t = (n.nodeValue || "").trim();
                if (/^\d+$/.test(t)) return n;
            }
        }

        return null;
    }

    function syncBadges() {
        var cart = readCart();
        var totals = getTotals(cart);
        var count = totals.qty;

        var btns = document.querySelectorAll(
            'button[aria-label="Shopping Cart"],button[aria-label="حقيبة التسوق"]'
        );

        for (var i = 0; i < btns.length; i++) {
            var btn = btns[i];
            var target = findCountTarget(btn);

            if (target && target.nodeType === 3) {
                target.nodeValue = " " + String(count) + " ";
                continue;
            }

            if (target && target.textContent != null) {
                target.textContent = String(count);
                continue;
            }

            btn.style.position = "relative";
            var badge = btn.querySelector(".kh-cart-badge");
            if (!badge) {
                badge = document.createElement("span");
                badge.className = "kh-cart-badge";
                btn.appendChild(badge);
            }
            badge.textContent = String(count);
            badge.style.display = count > 0 ? "inline-flex" : "none";
        }
    }

    function branchLabel(branchId) {
        var cfg = getConfig();
        for (var i = 0; i < cfg.branches.length; i++) {
            if (cfg.branches[i].id === branchId) {
                var isRtl = document.documentElement.dir === "rtl";
                return isRtl ? cfg.branches[i].name.ar : cfg.branches[i].name.en;
            }
        }
        return branchId || "";
    }

    function openWhatsAppOrder() {
        var cfg = getConfig();
        var cart = readCart();
        if (!cart.items.length) return;

        var isRtl = document.documentElement.dir === "rtl";
        var lines = [];

        lines.push(isRtl ? "طلب جديد من الموقع" : "New order from website");
        lines.push((isRtl ? "الفرع: " : "Branch: ") + branchLabel(cart.branchId));
        lines.push("");

        var totals = getTotals(cart);

        for (var i = 0; i < cart.items.length; i++) {
            var it = cart.items[i];
            lines.push(
                "• " +
                (it.name || "") +
                " × " +
                String(it.qty || 1) +
                " — " +
                formatBhd(Number(it.price || 0) * Number(it.qty || 0)) +
                " BHD"
            );
        }

        lines.push("");
        lines.push((isRtl ? "الإجمالي: " : "Total: ") + formatBhd(totals.total) + " BHD");

        if (cart.notes && String(cart.notes).trim()) {
            lines.push("");
            lines.push(isRtl ? "ملاحظات:" : "Notes:");
            lines.push(String(cart.notes).trim());
        }

        var text = encodeURIComponent(lines.join("\n"));
        window.open("https://wa.me/" + cfg.whatsapp + "?text=" + text, "_blank", "noopener,noreferrer");
    }

    function getCartItemQty(id) {
        if (!id) return 0;
        var cart = readCart();
        for (var i = 0; i < cart.items.length; i++) {
            if (cart.items[i].id === id) return Number(cart.items[i].qty || 0);
        }
        return 0;
    }

    function setCartQty(id, qty) {
        if (!id) return;

        var cfg = getConfig();
        var cart = readCart();
        if (!cart.branchId) cart.branchId = cfg.defaultBranchId;

        var q = Number(qty || 0);
        var found = null;

        for (var i = 0; i < cart.items.length; i++) {
            if (cart.items[i].id === id) {
                found = cart.items[i];
                break;
            }
        }

        if (q <= 0) {
            cart.items = cart.items.filter(function (x) {
                return x.id !== id;
            });
        } else if (found) {
            found.qty = q;
        } else {
            cart.items.push({ id: String(id), name: "", price: 0, image: "", qty: q });
        }

        writeCart(cart);
        emitChange(cart);
        syncBadges();
        render();
    }

    function addToCart(id, name, price, image) {
        if (!id) return;

        var cfg = getConfig();
        var cart = readCart();
        if (!cart.branchId) cart.branchId = cfg.defaultBranchId;

        var found = null;
        for (var i = 0; i < cart.items.length; i++) {
            if (cart.items[i].id === id) {
                found = cart.items[i];
                break;
            }
        }

        if (found) {
            found.qty = Number(found.qty || 1) + 1;
            if (name) found.name = String(name);
            if (price != null) found.price = Number(price || 0);
            if (image) found.image = String(image);
        } else {
            cart.items.push({
                id: String(id),
                name: String(name || ""),
                price: Number(price || 0),
                image: image ? String(image) : "",
                qty: 1,
            });
        }

        writeCart(cart);
        emitChange(cart);
        syncBadges();
    }

    function removeItem(id) {
        var cart = readCart();
        cart.items = cart.items.filter(function (x) {
            return x.id !== id;
        });
        writeCart(cart);
        emitChange(cart);
        syncBadges();
        render();
    }

    function setQty(id, qty) {
        setCartQty(id, qty);
    }

    function clearCart() {
        var cfg = getConfig();
        var cart = readCart();
        cart.items = [];
        cart.notes = "";
        cart.branchId = cart.branchId || cfg.defaultBranchId;

        writeCart(cart);
        emitChange(cart);
        syncBadges();
        render();
    }

    function render() {
        ensureDom();

        var cfg = getConfig();
        var cart = readCart();
        var totals = getTotals(cart);

        var body = document.getElementById("kh-cart-body");
        var footer = document.getElementById("kh-cart-footer");
        if (!body || !footer) return;

        var isRtl = document.documentElement.dir === "rtl";

        body.innerHTML = "";
        footer.innerHTML = "";

        if (!cart.items.length) {
            var empty = document.createElement("div");
            empty.className = "kh-cart-empty";
            empty.textContent = isRtl ? "السلة فارغة" : "Your cart is empty";
            body.appendChild(empty);
        } else {
            for (var i = 0; i < cart.items.length; i++) {
                (function (item) {
                    var row = document.createElement("div");
                    row.className = "kh-cart-row";

                    var img = document.createElement("img");
                    img.className = "kh-cart-img";
                    img.alt = item.name || "";
                    img.src = item.image || "/assets/brand/logo.webp";

                    var info = document.createElement("div");
                    info.style.minWidth = "0";

                    var name = document.createElement("div");
                    name.className = "kh-cart-name";
                    name.textContent = item.name || "";

                    var meta = document.createElement("div");
                    meta.className = "kh-cart-meta";
                    meta.textContent = formatBhd(item.price) + " BHD";

                    info.appendChild(name);
                    info.appendChild(meta);

                    var actions = document.createElement("div");
                    actions.className = "kh-cart-actions";

                    var qtyWrap = document.createElement("div");
                    qtyWrap.className = "kh-cart-qty";

                    var minus = document.createElement("button");
                    minus.type = "button";
                    minus.className = "kh-cart-btn";
                    minus.textContent = "−";
                    minus.addEventListener("click", function () {
                        setQty(item.id, Number(item.qty || 1) - 1);
                    });

                    var qtyNum = document.createElement("div");
                    qtyNum.className = "kh-cart-qtynum";
                    qtyNum.textContent = String(item.qty || 1);

                    var plus = document.createElement("button");
                    plus.type = "button";
                    plus.className = "kh-cart-btn";
                    plus.textContent = "+";
                    plus.addEventListener("click", function () {
                        setQty(item.id, Number(item.qty || 1) + 1);
                    });

                    qtyWrap.appendChild(minus);
                    qtyWrap.appendChild(qtyNum);
                    qtyWrap.appendChild(plus);

                    var remove = document.createElement("button");
                    remove.type = "button";
                    remove.className = "kh-cart-remove";
                    remove.textContent = isRtl ? "حذف" : "Remove";
                    remove.addEventListener("click", function () {
                        removeItem(item.id);
                    });

                    actions.appendChild(qtyWrap);
                    actions.appendChild(remove);

                    row.appendChild(img);
                    row.appendChild(info);
                    row.appendChild(actions);

                    body.appendChild(row);
                })(cart.items[i]);
            }
        }

        var select = document.createElement("select");
        select.className = "kh-cart-select";
        select.value = cart.branchId || cfg.defaultBranchId;
        select.addEventListener("change", function () {
            var c = readCart();
            c.branchId = select.value;
            writeCart(c);
            emitChange(c);
            syncBadges();
        });

        for (var b = 0; b < cfg.branches.length; b++) {
            var opt = document.createElement("option");
            opt.value = cfg.branches[b].id;
            opt.textContent = isRtl ? cfg.branches[b].name.ar : cfg.branches[b].name.en;
            select.appendChild(opt);
        }

        var notes = document.createElement("textarea");
        notes.className = "kh-cart-notes";
        notes.placeholder = isRtl ? "ملاحظات الطلب (اختياري)..." : "Order notes (optional)...";
        notes.value = cart.notes || "";
        notes.addEventListener("input", function () {
            var c = readCart();
            c.notes = String(notes.value || "");
            writeCart(c);
        });

        var totalRow = document.createElement("div");
        totalRow.className = "kh-cart-total";

        var totalLabel = document.createElement("div");
        totalLabel.textContent = isRtl ? "الإجمالي" : "Total";

        var totalValue = document.createElement("div");
        totalValue.textContent = formatBhd(totals.total) + " BHD";

        totalRow.appendChild(totalLabel);
        totalRow.appendChild(totalValue);

        var cta = document.createElement("button");
        cta.type = "button";
        cta.className = "kh-cart-cta";
        cta.disabled = !cart.items.length;
        cta.textContent = isRtl ? "اطلب عبر واتساب" : "Order via WhatsApp";
        cta.addEventListener("click", function () {
            openWhatsAppOrder();
        });

        var clear = document.createElement("button");
        clear.type = "button";
        clear.className = "kh-cart-secondary";
        clear.disabled = !cart.items.length;
        clear.textContent = isRtl ? "تفريغ السلة" : "Clear cart";
        clear.addEventListener("click", function () {
            var msg = isRtl ? "هل تريد تفريغ السلة؟" : "Clear the cart?";
            if (window.confirm(msg)) clearCart();
        });

        footer.appendChild(select);
        footer.appendChild(notes);
        footer.appendChild(totalRow);
        footer.appendChild(cta);
        footer.appendChild(clear);
    }

    function openCart() {
        var overlay = ensureDom();
        overlay.setAttribute("data-open", "1");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        render();
    }

    function closeCart() {
        var overlay = document.getElementById("kh-cart-overlay");
        if (!overlay) return;
        overlay.setAttribute("data-open", "0");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    window.openCart = openCart;
    window.closeCart = closeCart;
    window.addToCart = addToCart;

    // NEW: APIs for product stepper
    window.getCartItemQty = getCartItemQty;
    window.setCartQty = setCartQty;

    window.addEventListener("kahramana:cart", function () {
        syncBadges();
    });

    window.addEventListener("storage", function (e) {
        if (e && e.key === STORAGE_KEY) syncBadges();
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            syncBadges();
            emitChange(readCart());
        });
    } else {
        syncBadges();
        emitChange(readCart());
    }
})();
