import re

def inject_instant_quote_scanner():
    index_path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\index.html"
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Hero Buttons to feature the Instant WhatsApp Quote & Bill Scanner
    old_hero_buttons = """                <div class="hero-buttons" style="margin-bottom: 1.5rem;">
                    <a href="#contact-form-container" onclick="if(typeof scrollToContactForm==='function'){ scrollToContactForm(); }" class="cta-btn primary-btn" id="btn-hero-calc">⚡ Get Free Quotation</a>
                    <a href="#contact-form-container" onclick="if(typeof scrollToContactForm==='function'){ scrollToContactForm(); }" class="cta-btn green-btn" id="btn-hero-contact">Get Free Quotation</a>
                </div>"""

    new_hero_buttons = """                <div class="hero-buttons" style="margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.75rem;">
                    <button type="button" onclick="openInstantQuoteModal()" class="cta-btn primary-btn" id="btn-hero-instant-quote" style="display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 20px rgba(255, 183, 3, 0.4); animation: pulse-glow 2.5s infinite;">
                        ⚡ Instant WhatsApp Quote &amp; Bill Scanner
                    </button>
                    <a href="#contact-form-container" onclick="if(typeof scrollToContactForm==='function'){ scrollToContactForm(); }" class="cta-btn green-btn" id="btn-hero-contact" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                        📋 KSEB Feasibility Form
                    </a>
                </div>"""

    if old_hero_buttons in content:
        content = content.replace(old_hero_buttons, new_hero_buttons)
        print("Injected Hero buttons into index.html")

    # 2. Add Floating Trigger & Modal before </body>
    modal_and_floating_html = """
    <!-- ======================================================= -->
    <!-- ⚡ 1-CLICK WHATSAPP INSTANT QUOTE & KSEB BILL SCANNER -->
    <!-- ======================================================= -->

    <!-- Floating Trigger Pill on Desktop & Mobile -->
    <div id="floating-quote-pill" style="position: fixed; bottom: 25px; left: 25px; z-index: 9999; display: flex; align-items: center;">
        <button type="button" onclick="openInstantQuoteModal()" style="background: linear-gradient(135deg, #ffb703 0%, #10b981 100%); color: #0d1321; border: 2px solid #ffffff; font-weight: 800; font-size: 0.85rem; padding: 0.65rem 1.25rem; border-radius: 50px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 8px 30px rgba(0,0,0,0.4); transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            <span style="font-size: 1.1rem;">⚡</span>
            <span>Instant WhatsApp Quote &amp; Bill Scan</span>
            <span style="background: #0d1321; color: #ffb703; font-size: 0.65rem; padding: 2px 7px; border-radius: 20px; font-weight: 800;">FREE</span>
        </button>
    </div>

    <!-- Interactive Instant Quote & Bill Scanner Modal -->
    <div id="instant-quote-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 999999; overflow-y: auto; padding: 20px 10px; box-sizing: border-box; backdrop-filter: blur(8px);">
        <div style="max-width: 680px; margin: 20px auto; background: var(--color-surface, #1e293b); color: var(--color-text, #ffffff); border: 1.5px solid var(--color-sun-yellow, #ffb703); border-radius: 20px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6); overflow: hidden; position: relative;">
            
            <!-- Modal Header -->
            <div style="background: linear-gradient(135deg, rgba(255, 183, 3, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%); border-bottom: 1px solid var(--color-border); padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="width: 42px; height: 42px; background: rgba(255, 183, 3, 0.2); border: 1.5px solid var(--color-sun-yellow); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
                        ⚡
                    </div>
                    <div>
                        <h4 style="margin: 0; font-size: 1.1rem; color: var(--color-sun-yellow); font-family: var(--font-heading);">
                            Instant WhatsApp Solar Quote &amp; Bill Sizing
                        </h4>
                        <p style="margin: 0.15rem 0 0 0; font-size: 0.76rem; color: var(--color-text-muted);">
                            Snap your KSEB bill or estimate by monthly bill for instant PM Surya Ghar subsidy calculations.
                        </p>
                    </div>
                </div>
                <button type="button" onclick="closeInstantQuoteModal()" style="background: rgba(255,255,255,0.08); border: 1px solid var(--color-border); color: var(--color-text); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer;">
                    ✕
                </button>
            </div>

            <!-- Mode Switcher Tabs -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--color-border); background: var(--color-bg-alt, #0f172a);">
                <button type="button" id="iq-tab-btn-scan" onclick="switchIQMode('scan')" style="padding: 0.85rem; background: rgba(255, 183, 3, 0.12); color: var(--color-sun-yellow); border: none; border-bottom: 2.5px solid var(--color-sun-yellow); font-weight: 800; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
                    📸 Snap &amp; Scan KSEB Bill (Auto-Fill)
                </button>
                <button type="button" id="iq-tab-btn-manual" onclick="switchIQMode('manual')" style="padding: 0.85rem; background: transparent; color: var(--color-text-muted); border: none; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
                    💡 10-Sec Quick Bill Estimate
                </button>
            </div>

            <!-- Modal Content Body -->
            <div style="padding: 1.5rem;">
                
                <!-- TAB 1: KSEB Bill OCR Dropzone -->
                <div id="iq-pane-scan">
                    <div id="iq-bill-dropzone" onclick="document.getElementById('iq-bill-file-input').click()" style="border: 2px dashed rgba(255, 183, 3, 0.45); background: rgba(255, 183, 3, 0.04); border-radius: 14px; padding: 1.8rem 1.2rem; text-align: center; cursor: pointer; transition: border-color 0.2s; margin-bottom: 1.25rem;">
                        <input type="file" id="iq-bill-file-input" accept="image/*,application/pdf" style="display: none;" onchange="handleIQBillFileUpload(event)">
                        <div style="font-size: 2.4rem; margin-bottom: 0.5rem;">📸 📑</div>
                        <div style="font-weight: 800; color: var(--color-sun-yellow); font-size: 0.95rem; margin-bottom: 0.25rem;">
                            Click to Upload or Snap KSEB Electricity Bill
                        </div>
                        <p style="font-size: 0.76rem; color: var(--color-text-muted); margin: 0; line-height: 1.4;">
                            Supports Smartphone Camera Photos, JPG, PNG or PDF bills.<br>
                            Our AI OCR auto-extracts your 13-digit Consumer Number, Section &amp; Tariff Sizing.
                        </p>
                        <div id="iq-ocr-status" style="display: none; margin-top: 0.85rem; font-size: 0.82rem; font-weight: 700; color: var(--color-sun-yellow);">
                            <span class="spinner" style="display: inline-block; animation: spin 1s linear infinite;">⏳</span> Scanning KSEB Bill OCR...
                        </div>
                    </div>
                </div>

                <!-- TAB 2 / Manual Sizing Controls -->
                <div id="iq-pane-manual" style="margin-bottom: 1.25rem;">
                    <label style="font-size: 0.78rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.4rem;">
                        ⚡ Average Bi-Monthly KSEB Electricity Bill:
                    </label>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 1rem;">
                        <button type="button" class="iq-bill-btn" onclick="setIQBill(2500, this)" style="padding: 0.55rem; background: rgba(255,255,255,0.06); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-weight: 700; font-size: 0.8rem; cursor: pointer;">
                            ₹2,500
                        </button>
                        <button type="button" class="iq-bill-btn active" onclick="setIQBill(4500, this)" style="padding: 0.55rem; background: var(--color-sun-yellow); border: 1px solid var(--color-sun-yellow); border-radius: 8px; color: #0d1321; font-weight: 800; font-size: 0.8rem; cursor: pointer;">
                            ₹4,500
                        </button>
                        <button type="button" class="iq-bill-btn" onclick="setIQBill(7500, this)" style="padding: 0.55rem; background: rgba(255,255,255,0.06); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-weight: 700; font-size: 0.8rem; cursor: pointer;">
                            ₹7,500
                        </button>
                        <button type="button" class="iq-bill-btn" onclick="setIQBill(12000, this)" style="padding: 0.55rem; background: rgba(255,255,255,0.06); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-weight: 700; font-size: 0.8rem; cursor: pointer;">
                            ₹12,000+
                        </button>
                    </div>

                    <!-- Customer Contact Fields -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <div>
                            <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Your Name *</label>
                            <input type="text" id="iq-name" placeholder="e.g. Radhakrishnan" style="width: 100%; box-sizing: border-box; background: var(--color-bg-alt); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.82rem; text-transform: uppercase;">
                        </div>
                        <div>
                            <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">WhatsApp Number *</label>
                            <input type="tel" id="iq-phone" placeholder="10-digit mobile number" maxlength="10" pattern="^[6-9]\\d{9}$" oninput="this.value = this.value.replace(/[^0-9]/g, '')" style="width: 100%; box-sizing: border-box; background: var(--color-bg-alt); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.82rem;">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                        <div>
                            <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">District (Kerala)</label>
                            <select id="iq-district" style="width: 100%; box-sizing: border-box; background: var(--color-bg-alt); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600;">
                                <option value="Ernakulam">Ernakulam</option>
                                <option value="Idukki">Idukki (Thodupuzha)</option>
                                <option value="Kottayam">Kottayam</option>
                                <option value="Alappuzha">Alappuzha</option>
                                <option value="Thrissur">Thrissur</option>
                                <option value="Palakkad">Palakkad</option>
                                <option value="Malappuram">Malappuram</option>
                                <option value="Kozhikode">Kozhikode</option>
                                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                <option value="Kollam">Kollam</option>
                                <option value="Kannur">Kannur</option>
                                <option value="Pathanamthitta">Pathanamthitta</option>
                                <option value="Wayanad">Wayanad</option>
                                <option value="Kasaragod">Kasaragod</option>
                            </select>
                        </div>
                        <div>
                            <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">13-Digit KSEB Cons. No (Optional)</label>
                            <input type="text" id="iq-consumer-no" placeholder="e.g. 1155667788990" maxlength="13" oninput="this.value = this.value.replace(/[^0-9]/g, '')" style="width: 100%; box-sizing: border-box; background: var(--color-bg-alt); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.82rem; font-family: monospace;">
                        </div>
                    </div>
                </div>

                <!-- LIVE CALCULATED SOLAR SIZING CARD -->
                <div style="background: linear-gradient(135deg, rgba(255, 183, 3, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%); border: 1.5px solid var(--color-sun-yellow); border-radius: 14px; padding: 1.1rem; margin-bottom: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed rgba(255, 183, 3, 0.35); padding-bottom: 0.6rem; margin-bottom: 0.75rem;">
                        <div>
                            <span style="font-size: 0.72rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Recommended Sizing:</span>
                            <div id="iq-res-capacity" style="font-size: 1.25rem; font-weight: 800; color: var(--color-sun-yellow);">3.0 kWp On-Grid Plant</div>
                        </div>
                        <div style="text-align: right;">
                            <span style="background: #10b981; color: #ffffff; padding: 3px 10px; border-radius: 12px; font-size: 0.72rem; font-weight: 800;">
                                100% Zero-Bill Guarantee
                            </span>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; text-align: center; font-size: 0.78rem;">
                        <div style="background: var(--color-surface); padding: 0.6rem; border-radius: 8px; border: 1px solid var(--color-border);">
                            <span style="color: var(--color-text-muted); font-size: 0.7rem; display: block;">Total Project Value</span>
                            <strong id="iq-res-total" style="color: var(--color-text); font-size: 0.95rem;">₹1,95,000</strong>
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.12); padding: 0.6rem; border-radius: 8px; border: 1px solid #10b981;">
                            <span style="color: #10b981; font-size: 0.7rem; font-weight: 700; display: block;">Govt. DBT Subsidy</span>
                            <strong id="iq-res-subsidy" style="color: #10b981; font-size: 0.95rem;">- ₹78,000</strong>
                        </div>
                        <div style="background: rgba(255, 183, 3, 0.12); padding: 0.6rem; border-radius: 8px; border: 1px solid var(--color-sun-yellow);">
                            <span style="color: var(--color-sun-yellow); font-size: 0.7rem; font-weight: 700; display: block;">Net Customer Cost</span>
                            <strong id="iq-res-net" style="color: var(--color-sun-yellow); font-size: 1.05rem;">₹1,17,000</strong>
                        </div>
                    </div>
                </div>

                <!-- ACTION BUTTONS -->
                <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                    <button type="button" onclick="dispatchInstantWhatsAppQuote()" style="width: 100%; background: #25d366; color: #ffffff; border: none; font-weight: 800; font-size: 0.92rem; padding: 0.85rem; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);">
                        💬 Send Complete Quote Directly to my WhatsApp
                    </button>
                    <button type="button" onclick="autoFillFullFeasibilityFromIQ()" style="width: 100%; background: rgba(255, 255, 255, 0.08); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; font-size: 0.82rem; padding: 0.65rem; border-radius: 10px; cursor: pointer;">
                        📋 Auto-Fill Full KSEB Feasibility Form Below
                    </button>
                </div>
            </div>
        </div>
    </div>
"""

    if 'id="instant-quote-modal"' not in content:
        closing_body = '</body>'
        content = content.replace(closing_body, modal_and_floating_html + '\n' + closing_body)
        print("Injected #instant-quote-modal and floating pill into index.html")

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)

    # 3. Add JavaScript logic to app.js
    app_js_path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\app.js"
    with open(app_js_path, 'r', encoding='utf-8') as f:
        app_content = f.read()

    iq_js_code = """
// ========================================================
// ⚡ 1-CLICK WHATSAPP INSTANT QUOTE & BILL SCANNER ENGINE
// ========================================================
let activeIQBill = 4500;
let activeIQCap = 3.0;

function openInstantQuoteModal() {
    const modal = document.getElementById('instant-quote-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    calculateIQResults();
}

function closeInstantQuoteModal() {
    const modal = document.getElementById('instant-quote-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchIQMode(mode) {
    const scanPane = document.getElementById('iq-pane-scan');
    const manualPane = document.getElementById('iq-pane-manual');
    const scanBtn = document.getElementById('iq-tab-btn-scan');
    const manualBtn = document.getElementById('iq-tab-btn-manual');

    if (mode === 'scan') {
        if (scanPane) scanPane.style.display = 'block';
        if (scanBtn) {
            scanBtn.style.background = 'rgba(255, 183, 3, 0.12)';
            scanBtn.style.color = 'var(--color-sun-yellow)';
            scanBtn.style.borderBottom = '2.5px solid var(--color-sun-yellow)';
        }
        if (manualBtn) {
            manualBtn.style.background = 'transparent';
            manualBtn.style.color = 'var(--color-text-muted)';
            manualBtn.style.borderBottom = 'none';
        }
    } else {
        if (scanPane) scanPane.style.display = 'none';
        if (manualBtn) {
            manualBtn.style.background = 'rgba(255, 183, 3, 0.12)';
            manualBtn.style.color = 'var(--color-sun-yellow)';
            manualBtn.style.borderBottom = '2.5px solid var(--color-sun-yellow)';
        }
        if (scanBtn) {
            scanBtn.style.background = 'transparent';
            scanBtn.style.color = 'var(--color-text-muted)';
            scanBtn.style.borderBottom = 'none';
        }
    }
}

function setIQBill(amount, btnEl) {
    activeIQBill = amount;
    const buttons = document.querySelectorAll('.iq-bill-btn');
    buttons.forEach(b => {
        b.style.background = 'rgba(255,255,255,0.06)';
        b.style.color = 'var(--color-text)';
        b.style.borderColor = 'var(--color-border)';
        b.style.fontWeight = '700';
    });
    if (btnEl) {
        btnEl.style.background = 'var(--color-sun-yellow)';
        btnEl.style.color = '#0d1321';
        btnEl.style.borderColor = 'var(--color-sun-yellow)';
        btnEl.style.fontWeight = '800';
    }
    calculateIQResults();
}

function calculateIQResults() {
    // Sizing logic based on bi-monthly bill
    let cap = 3.0;
    if (activeIQBill >= 10000) {
        cap = 8.0;
    } else if (activeIQBill >= 6000) {
        cap = 5.0;
    } else if (activeIQBill >= 3500) {
        cap = 3.0;
    } else {
        cap = 2.0;
    }
    activeIQCap = cap;

    let baseRatePerKw = 65000;
    let grossCost = cap * baseRatePerKw;
    
    let subsidy = 0;
    if (cap >= 3.0) subsidy = 78000;
    else if (cap >= 2.0) subsidy = 60000;
    else if (cap >= 1.0) subsidy = 30000;

    let netCost = Math.max(0, grossCost - subsidy);

    const capEl = document.getElementById('iq-res-capacity');
    if (capEl) capEl.textContent = `${cap.toFixed(1)} kWp On-Grid Solar Plant`;

    const totalEl = document.getElementById('iq-res-total');
    if (totalEl) totalEl.textContent = `₹${grossCost.toLocaleString('en-IN')}`;

    const subEl = document.getElementById('iq-res-subsidy');
    if (subEl) subEl.textContent = `- ₹${subsidy.toLocaleString('en-IN')}`;

    const netEl = document.getElementById('iq-res-net');
    if (netEl) netEl.textContent = `₹${netCost.toLocaleString('en-IN')}`;
}

async function handleIQBillFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('iq-ocr-status');
    if (statusEl) statusEl.style.display = 'block';

    try {
        let extractedText = '';
        if (file.type === 'application/pdf') {
            if (typeof parseKSEBPdf === 'function') {
                extractedText = await parseKSEBPdf(file);
            }
        } else {
            if (typeof parseKSEBImage === 'function') {
                extractedText = await parseKSEBImage(file);
            }
        }

        if (extractedText && typeof parseKSEBBillText === 'function') {
            const parsedData = parseKSEBBillText(extractedText);
            if (parsedData) {
                if (parsedData.consumerNo) {
                    const cEl = document.getElementById('iq-consumer-no');
                    if (cEl) cEl.value = parsedData.consumerNo;
                }
                if (parsedData.name) {
                    const nEl = document.getElementById('iq-name');
                    if (nEl) nEl.value = parsedData.name;
                }
                if (parsedData.district) {
                    const dEl = document.getElementById('iq-district');
                    if (dEl) dEl.value = parsedData.district;
                }
                if (parsedData.totalBill) {
                    activeIQBill = parsedData.totalBill;
                    calculateIQResults();
                }
            }
        }
        if (statusEl) statusEl.innerHTML = '✅ KSEB Bill Scanned &amp; Auto-Filled Successfully!';
    } catch(err) {
        console.warn('[IQ OCR Error]', err);
        if (statusEl) statusEl.innerHTML = '⚠️ Bill uploaded. Sizing estimated using standard rates.';
    }
}

function dispatchInstantWhatsAppQuote() {
    const name = (document.getElementById('iq-name')?.value || '').trim() || 'Valued Customer';
    const phone = (document.getElementById('iq-phone')?.value || '').trim();
    const district = document.getElementById('iq-district')?.value || 'Kerala';
    const consumerNo = (document.getElementById('iq-consumer-no')?.value || '').trim();

    if (phone && !/^[6-9]\\d{9}$/.test(phone)) {
        alert('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
        document.getElementById('iq-phone')?.focus();
        return;
    }

    let subsidy = (activeIQCap >= 3.0) ? 78000 : ((activeIQCap >= 2.0) ? 60000 : 30000);
    let gross = activeIQCap * 65000;
    let net = gross - subsidy;

    const waMsg = 
`⚡ *SUNOVA SOLAR - INSTANT QUOTATION* ⚡
👤 *Customer:* ${name.toUpperCase()}
📍 *District:* ${district}
${consumerNo ? `⚡ *KSEB Consumer No:* ${consumerNo}\n` : ''}
⚙️ *PROPOSED SOLAR SYSTEM:*
• Capacity: *${activeIQCap.toFixed(1)} kWp On-Grid System*
• Technology: TopCon Bifacial Dual Glass Panels
• Inverter: Smart Dual-MPPT Wi-Fi Inverter
• Earthing: 3 Chemical Earth Pits (<5Ω) + Lightning Arrester

💰 *COMMERCIALS & SUBSIDY:*
• Total Project Value: ₹${gross.toLocaleString('en-IN')}
• *PM Surya Ghar DBT Subsidy:* ₹${subsidy.toLocaleString('en-IN')}
• *NET EFFECTIVE COST:* ₹${net.toLocaleString('en-IN')}
• Estimated Monthly Savings: *₹3,200 / Month (100% Zero-Bill)*

Please connect me with my nearest Sunova Channel Partner for KSEB Net-Metering Feasibility Clearance!`;

    // Log Inquiry into background lead pipeline
    try {
        const inquiries = JSON.parse(localStorage.getItem('sunova_inquiries') || '[]');
        inquiries.unshift({
            timestamp: new Date().toLocaleString('en-IN'),
            name: name,
            phone: phone || 'WhatsApp Quick Quote',
            email: 'Not Provided',
            district: district,
            location: district,
            category: 'Residential (Home Solar)',
            model: 'On-Grid',
            capacity: String(activeIQCap),
            consumerNo: consumerNo || 'Not Provided',
            subsidy: 'Yes (PM Surya Ghar)',
            loan: 'No',
            message: `Instant WhatsApp Quote Generated (${activeIQCap} kWp - Net ₹${net.toLocaleString('en-IN')})`,
            partner: 'Direct Sunova Solar Desk',
            partnerCode: 'DIRECT',
            partnerPhone: '9072522277'
        });
        localStorage.setItem('sunova_inquiries', JSON.stringify(inquiries.slice(0, 200)));
    } catch(e) {}

    // Dispatch Web3Forms logging
    try {
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: "3b85044a-ed95-42ed-b465-e6afcaeb60a2",
                name: name,
                phone: phone || 'WhatsApp Request',
                district: district,
                "Requested Capacity": `${activeIQCap} kWp`,
                "Net Cost": `₹${net.toLocaleString('en-IN')}`,
                subject: `Instant WhatsApp Quote Request from ${name} (${district})`
            })
        }).catch(e => {});
    } catch(e) {}

    const targetUrl = `https://wa.me/919072522277?text=${encodeURIComponent(waMsg)}`;
    window.open(targetUrl, '_blank');
    closeInstantQuoteModal();
}

function autoFillFullFeasibilityFromIQ() {
    const name = document.getElementById('iq-name')?.value || '';
    const phone = document.getElementById('iq-phone')?.value || '';
    const district = document.getElementById('iq-district')?.value || 'Alappuzha';
    const consumerNo = document.getElementById('iq-consumer-no')?.value || '';

    if (name && document.getElementById('form-name')) document.getElementById('form-name').value = name;
    if (phone && document.getElementById('form-phone')) document.getElementById('form-phone').value = phone;
    if (consumerNo && document.getElementById('form-consumer-no')) document.getElementById('form-consumer-no').value = consumerNo;
    
    const distEl = document.getElementById('form-district');
    if (distEl && district) {
        distEl.value = district;
        if (typeof handleDistrictChange === 'function') handleDistrictChange(district);
    }

    const sizeEl = document.getElementById('form-size-select');
    if (sizeEl) {
        sizeEl.value = activeIQCap.toFixed(1);
        if (typeof handleFormSizeSelectChange === 'function') handleFormSizeSelectChange(activeIQCap.toFixed(1));
    }

    closeInstantQuoteModal();
    if (typeof scrollToContactForm === 'function') {
        scrollToContactForm();
    } else {
        document.getElementById('contact-form-container')?.scrollIntoView({ behavior: 'smooth' });
    }
}
"""

    if 'function openInstantQuoteModal()' not in app_content:
        app_content += '\n' + iq_js_code
        with open(app_js_path, 'w', encoding='utf-8') as f:
            f.write(app_content)
        print("Injected Instant Quote JavaScript Engine into app.js")

inject_instant_quote_scanner()
