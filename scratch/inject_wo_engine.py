import re

def inject_wo_engine():
    path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\partner-portal.html"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add switchPartnerPortalTab support for 'work-order'
    old_tabs_line = "const tabs = ['quote-generator', 'leads', 'saved-quotes', 'docs-upload', 'calculators', 'kseb', 'resources', 'security'];"
    new_tabs_line = "const tabs = ['quote-generator', 'leads', 'saved-quotes', 'work-order', 'docs-upload', 'calculators', 'kseb', 'resources', 'security'];"
    if old_tabs_line in content:
        content = content.replace(old_tabs_line, new_tabs_line)
        print("Updated switchPartnerPortalTab tabs list")

    # Add work-order handler inside switchPartnerPortalTab
    old_tab_triggers = "if (tabId === 'leads') {"
    new_tab_triggers = """if (tabId === 'work-order') {
                populateWOAutoFillDropdowns();
                renderWorkOrders();
            } else if (tabId === 'leads') {"""
    if old_tab_triggers in content and "tabId === 'work-order'" not in content:
        content = content.replace(old_tab_triggers, new_tab_triggers)
        print("Injected tabId === 'work-order' render hook")

    # Add badge updater in loadPartnerDashboard (where activeLeadsEl and savedBadge are updated)
    old_badge_sec = """// Update installation docs count badge"""
    new_badge_sec = """// Update Work Orders count badge
                const woKey = 'partner_work_orders_' + dealerCode;
                let partnerWOs = [];
                try {
                    partnerWOs = JSON.parse(localStorage.getItem(woKey) || '[]');
                } catch(e) { partnerWOs = []; }
                const tabWOBadge = document.getElementById('tab-badge-wo');
                if (tabWOBadge) tabWOBadge.textContent = partnerWOs.length;

                // Update installation docs count badge"""
    if old_badge_sec in content and "partner_work_orders_" not in content:
        content = content.replace(old_badge_sec, new_badge_sec)
        print("Injected work orders count badge updater in loadPartnerDashboard")

    # Add populateWOAutoFillDropdowns call in loadPartnerDashboard
    old_pop_call = "populateDocLeadAutoFill(dealerCode, inquiries);"
    new_pop_call = "populateDocLeadAutoFill(dealerCode, inquiries);\n                populateWOAutoFillDropdowns();\n                renderWorkOrders();"
    if old_pop_call in content and "populateWOAutoFillDropdowns();" not in content:
        content = content.replace(old_pop_call, new_pop_call)
        print("Injected populateWOAutoFillDropdowns in login flow")

    # 2. Add Modal Overlay and Print CSS
    wo_modal_html = """
    <!-- ==================================================== -->
    <!-- 🖨️ PRINTABLE SOLAR EPC WORK ORDER LETTERHEAD MODAL -->
    <!-- ==================================================== -->
    <div id="wo-modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 999999; overflow-y: auto; padding: 20px 10px; box-sizing: border-box;">
        <div style="max-width: 860px; margin: 0 auto; background: #ffffff; color: #1e293b; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); overflow: hidden; position: relative;">
            
            <!-- Modal Actions Bar (Hidden during Print) -->
            <div class="no-print" style="background: #0f172a; color: #ffffff; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eab308;">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.95rem;">
                    <span>🛠️</span> Official Solar EPC Work Order Preview
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button onclick="printWODocument()" style="background: #eab308; color: #0f172a; border: none; font-weight: 800; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; display: flex; align-items: center; gap: 5px;">
                        🖨️ Print / Save PDF
                    </button>
                    <button onclick="whatsappActiveWorkOrder()" style="background: #25d366; color: #ffffff; border: none; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; display: flex; align-items: center; gap: 5px;">
                        💬 WhatsApp
                    </button>
                    <button onclick="closeWOModal()" style="background: rgba(255,255,255,0.15); color: #ffffff; border: none; font-weight: 700; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center;">
                        ✕
                    </button>
                </div>
            </div>

            <!-- Printable Document Body -->
            <div id="wo-printable-area" style="padding: 35px 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.45; font-size: 13px; color: #1e293b;">
                <!-- Populated dynamically via viewWorkOrder() -->
            </div>
        </div>
    </div>

    <!-- Print Media Styling for Work Order -->
    <style>
        @media print {
            body * {
                visibility: hidden !important;
            }
            #wo-modal-overlay, #wo-modal-overlay * {
                visibility: visible !important;
            }
            #wo-modal-overlay {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: auto !important;
                background: #ffffff !important;
                padding: 0 !important;
                margin: 0 !important;
                display: block !important;
            }
            #wo-modal-overlay > div {
                box-shadow: none !important;
                border-radius: 0 !important;
                max-width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .no-print {
                display: none !important;
            }
            #wo-printable-area {
                padding: 20px 25px !important;
            }
        }
    </style>
"""

    if 'id="wo-modal-overlay"' not in content:
        closing_body = '</body>'
        content = content.replace(closing_body, wo_modal_html + '\n' + closing_body)
        print("Injected #wo-modal-overlay before </body> in partner-portal.html")

    # 3. Add JavaScript functions for Work Order Engine
    wo_js_code = """
        // ==========================================
        // 🛠️ SOLAR EPC WORK ORDER ENGINE
        // ==========================================
        let activeViewingWO = null;

        function generateWONumber() {
            const year = new Date().getFullYear();
            const rand = Math.floor(1000 + Math.random() * 9000);
            return `WO-SUN-${year}-${rand}`;
        }

        function initNewWorkOrderForm() {
            const form = document.getElementById('work-order-form');
            if (!form) return;

            const today = new Date();
            const issueDateStr = today.toISOString().split('T')[0];
            
            const targetDate = new Date();
            targetDate.setDate(today.getDate() + 14);
            const targetDateStr = targetDate.toISOString().split('T')[0];

            const dispatchDate = new Date();
            dispatchDate.setDate(today.getDate() + 3);

            const structDate = new Date();
            structDate.setDate(today.getDate() + 7);

            const inspectDate = new Date();
            inspectDate.setDate(today.getDate() + 12);

            document.getElementById('wo-number').value = generateWONumber();
            document.getElementById('wo-date').value = issueDateStr;
            document.getElementById('wo-target-date').value = targetDateStr;
            document.getElementById('wo-priority').value = 'Normal';

            document.getElementById('wo-cust-name').value = '';
            document.getElementById('wo-cust-phone').value = '';
            document.getElementById('wo-consumer-no').value = '';
            document.getElementById('wo-sanctioned-load').value = '5.0';
            document.getElementById('wo-site-address').value = '';
            document.getElementById('wo-kseb-section').value = '';

            const currentPartnerDist = localStorage.getItem('partner_district') || 'Ernakulam';
            const distEl = document.getElementById('wo-district');
            if (distEl) distEl.value = currentPartnerDist;

            document.getElementById('wo-capacity').value = '3.0';
            document.getElementById('wo-topology').value = 'On-Grid Net Metered';
            document.getElementById('wo-phase').value = 'Single Phase 230V';
            document.getElementById('wo-structure-type').value = 'Elevated High-Rise HDGI';
            document.getElementById('wo-module-make').value = 'Sunova High-Efficiency TopCon Bifacial Dual Glass (DCR ALMM)';
            document.getElementById('wo-module-watt').value = '550';
            document.getElementById('wo-inverter-make').value = 'Sunova Dual-MPPT Smart Grid-Tie Inverter (IP65 Wi-Fi)';
            document.getElementById('wo-inverter-cap').value = '3.0';

            document.getElementById('wo-assigned-engineer').value = 'Sujith M. (Lead Solar Technician - 9847123456)';
            document.getElementById('wo-dispatch-date').value = dispatchDate.toISOString().split('T')[0];
            document.getElementById('wo-structure-date').value = structDate.toISOString().split('T')[0];
            document.getElementById('wo-inspection-date').value = inspectDate.toISOString().split('T')[0];
            document.getElementById('wo-site-notes').value = 'Sloped RCC roof with staircase access. Ensure safety harnesses and lifelines during module mounting.';

            document.getElementById('wo-total-cost').value = '195000';
            document.getElementById('wo-advance-paid').value = '50000';
            document.getElementById('wo-status').value = 'Approved';

            calculateWOBoQ();
            calculateWOCommercials();
            populateWOAutoFillDropdowns();
        }

        function calculateWOBoQ() {
            const cap = parseFloat(document.getElementById('wo-capacity')?.value) || 3.0;
            const watt = parseInt(document.getElementById('wo-module-watt')?.value) || 550;
            const qty = Math.ceil((cap * 1000) / watt);
            const actualKw = (qty * watt / 1000).toFixed(2);

            const qtyInput = document.getElementById('wo-module-qty');
            if (qtyInput) qtyInput.value = `${qty} Modules (${actualKw} kWp)`;

            const invCapInput = document.getElementById('wo-inverter-cap');
            if (invCapInput) invCapInput.value = cap;

            const phaseSelect = document.getElementById('wo-phase');
            if (phaseSelect) {
                if (cap > 5.0) {
                    phaseSelect.value = 'Three Phase 415V';
                }
            }
        }

        function calculateWOCommercials() {
            const cap = parseFloat(document.getElementById('wo-capacity')?.value) || 3.0;
            const total = parseFloat(document.getElementById('wo-total-cost')?.value) || 0;
            const advance = parseFloat(document.getElementById('wo-advance-paid')?.value) || 0;

            // PM Surya Ghar DBT Subsidy Rules
            let subsidy = 0;
            if (cap >= 3.0) {
                subsidy = 78000;
            } else if (cap >= 2.0) {
                subsidy = 60000;
            } else if (cap >= 1.0) {
                subsidy = 30000;
            }

            const dispatchDue = Math.round(total * 0.5);
            const finalDue = Math.max(0, total - advance - dispatchDue);
            const netCustomerCost = Math.max(0, total - subsidy);

            const dispatchInput = document.getElementById('wo-dispatch-due');
            if (dispatchInput && document.activeElement !== dispatchInput) dispatchInput.value = dispatchDue;

            const finalInput = document.getElementById('wo-final-due');
            if (finalInput) finalInput.value = finalDue;

            const subsidyDisp = document.getElementById('wo-subsidy-display');
            if (subsidyDisp) subsidyDisp.textContent = `₹${subsidy.toLocaleString('en-IN')}`;

            const netCostDisp = document.getElementById('wo-net-cost-display');
            if (netCostDisp) netCostDisp.textContent = `₹${netCustomerCost.toLocaleString('en-IN')}`;
        }

        function populateWOKSEBSections(district) {
            // Optional helper when district changes in WO form
            const ksebInput = document.getElementById('wo-kseb-section');
            if (ksebInput && !ksebInput.value) {
                ksebInput.placeholder = `e.g. ${district} Town Section`;
            }
        }

        function populateWOAutoFillDropdowns() {
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';

            // 1. Populate Saved Quotes
            const quoteSelect = document.getElementById('wo-autofill-quote-select');
            if (quoteSelect) {
                const quotesKey = 'saved_quotes_' + dealerCode;
                let quotes = [];
                try {
                    quotes = JSON.parse(localStorage.getItem(quotesKey) || '[]');
                } catch(e) { quotes = []; }

                quoteSelect.innerHTML = '<option value="">-- Choose from Saved Quotes --</option>';
                quotes.forEach(q => {
                    const opt = document.createElement('option');
                    opt.value = q.id || q.quoteId || '';
                    opt.textContent = `📋 ${q.customerName || 'Customer'} - ${q.capacity || '3'} kWp (₹${(q.netPayable || q.totalCost || 0).toLocaleString('en-IN')})`;
                    quoteSelect.appendChild(opt);
                });
            }

            // 2. Populate Allocated Leads
            const leadSelect = document.getElementById('wo-autofill-lead-select');
            if (leadSelect) {
                loadInquiries(function(inquiries) {
                    const myLeads = inquiries.filter(l => l.partnerCode === dealerCode || dealerCode === 'DIRECT');
                    leadSelect.innerHTML = '<option value="">-- Choose from Allocated Leads --</option>';
                    myLeads.forEach(l => {
                        const opt = document.createElement('option');
                        opt.value = l.phone || l.id || '';
                        opt.textContent = `👤 ${l.name || 'Lead'} - 📞 ${l.phone || ''} (${l.district || 'Kerala'} - ${l.capacity || '3'} kWp)`;
                        leadSelect.appendChild(opt);
                    });
                });
            }
        }

        function autoFillWOFromQuote(quoteId) {
            if (!quoteId) return;
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            const quotesKey = 'saved_quotes_' + dealerCode;
            let quotes = [];
            try {
                quotes = JSON.parse(localStorage.getItem(quotesKey) || '[]');
            } catch(e) { quotes = []; }

            const quote = quotes.find(q => (q.id === quoteId || q.quoteId === quoteId));
            if (!quote) return;

            document.getElementById('wo-cust-name').value = quote.customerName || '';
            document.getElementById('wo-cust-phone').value = quote.phone || quote.customerPhone || '';
            document.getElementById('wo-consumer-no').value = quote.consumerNo || '';
            document.getElementById('wo-site-address').value = quote.address || quote.installationAddress || '';
            
            if (quote.district) {
                const distEl = document.getElementById('wo-district');
                if (distEl) distEl.value = quote.district;
            }
            if (quote.ksebSection) {
                document.getElementById('wo-kseb-section').value = quote.ksebSection;
            }

            const cap = parseFloat(quote.capacity) || 3.0;
            document.getElementById('wo-capacity').value = cap;

            const total = parseFloat(quote.totalCost || quote.netPayable) || 195000;
            document.getElementById('wo-total-cost').value = total;

            calculateWOBoQ();
            calculateWOCommercials();
            showPortalToast(`⚡ Auto-filled Work Order from Quote for ${quote.customerName}!`);
        }

        function autoFillWOFromLead(leadPhone) {
            if (!leadPhone) return;
            loadInquiries(function(inquiries) {
                const lead = inquiries.find(l => (l.phone === leadPhone || l.id === leadPhone));
                if (!lead) return;

                document.getElementById('wo-cust-name').value = lead.name || '';
                document.getElementById('wo-cust-phone').value = lead.phone || '';
                document.getElementById('wo-consumer-no').value = lead.consumerNo || '';
                document.getElementById('wo-site-address').value = lead.address || (lead.district ? `${lead.district}, Kerala` : '');
                
                if (lead.district) {
                    const distEl = document.getElementById('wo-district');
                    if (distEl) distEl.value = lead.district;
                }
                if (lead.ksebSection) {
                    document.getElementById('wo-kseb-section').value = lead.ksebSection;
                }

                const cap = parseFloat(lead.capacity) || 3.0;
                document.getElementById('wo-capacity').value = cap;

                calculateWOBoQ();
                calculateWOCommercials();
                showPortalToast(`⚡ Auto-filled Work Order from Lead: ${lead.name}!`);
            });
        }

        function handleSaveWorkOrder() {
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            const dealerName = localStorage.getItem('partner_name') || 'Authorized Sunova Partner';
            const dealerPhone = localStorage.getItem('partner_phone') || '9847012345';

            const woNumber = (document.getElementById('wo-number')?.value || generateWONumber()).trim();
            const issueDate = document.getElementById('wo-date')?.value || new Date().toISOString().split('T')[0];
            const targetDate = document.getElementById('wo-target-date')?.value || '';
            const priority = document.getElementById('wo-priority')?.value || 'Normal';

            const custName = (document.getElementById('wo-cust-name')?.value || '').trim();
            const custPhone = (document.getElementById('wo-cust-phone')?.value || '').trim();
            const consumerNo = (document.getElementById('wo-consumer-no')?.value || '').trim();
            const sanctionedLoad = (document.getElementById('wo-sanctioned-load')?.value || '5.0').trim();
            const siteAddress = (document.getElementById('wo-site-address')?.value || '').trim();
            const district = document.getElementById('wo-district')?.value || 'Ernakulam';
            const ksebSection = (document.getElementById('wo-kseb-section')?.value || '').trim();

            const capacity = parseFloat(document.getElementById('wo-capacity')?.value) || 3.0;
            const topology = document.getElementById('wo-topology')?.value || 'On-Grid Net Metered';
            const phase = document.getElementById('wo-phase')?.value || 'Single Phase 230V';
            const structureType = document.getElementById('wo-structure-type')?.value || 'Elevated High-Rise HDGI';
            const moduleMake = (document.getElementById('wo-module-make')?.value || '').trim();
            const moduleWatt = parseInt(document.getElementById('wo-module-watt')?.value) || 550;
            const moduleQty = (document.getElementById('wo-module-qty')?.value || '').trim();
            const inverterMake = (document.getElementById('wo-inverter-make')?.value || '').trim();
            const inverterCap = parseFloat(document.getElementById('wo-inverter-cap')?.value) || capacity;

            const assignedEngineer = (document.getElementById('wo-assigned-engineer')?.value || '').trim();
            const dispatchDate = document.getElementById('wo-dispatch-date')?.value || '';
            const structureDate = document.getElementById('wo-structure-date')?.value || '';
            const inspectionDate = document.getElementById('wo-inspection-date')?.value || '';
            const siteNotes = (document.getElementById('wo-site-notes')?.value || '').trim();

            const totalCost = parseFloat(document.getElementById('wo-total-cost')?.value) || 0;
            const advancePaid = parseFloat(document.getElementById('wo-advance-paid')?.value) || 0;
            const dispatchDue = parseFloat(document.getElementById('wo-dispatch-due')?.value) || 0;
            const finalDue = parseFloat(document.getElementById('wo-final-due')?.value) || 0;
            const status = document.getElementById('wo-status')?.value || 'Approved';

            let subsidy = 0;
            if (capacity >= 3.0) subsidy = 78000;
            else if (capacity >= 2.0) subsidy = 60000;
            else if (capacity >= 1.0) subsidy = 30000;

            const netCustomerCost = Math.max(0, totalCost - subsidy);

            const workOrder = {
                id: woNumber,
                woNumber: woNumber,
                dealerCode: dealerCode,
                dealerName: dealerName,
                dealerPhone: dealerPhone,
                issueDate: issueDate,
                targetDate: targetDate,
                priority: priority,
                customerName: custName,
                customerPhone: custPhone,
                consumerNo: consumerNo,
                sanctionedLoad: sanctionedLoad,
                siteAddress: siteAddress,
                district: district,
                ksebSection: ksebSection,
                capacity: capacity,
                topology: topology,
                phase: phase,
                structureType: structureType,
                moduleMake: moduleMake,
                moduleWatt: moduleWatt,
                moduleQty: moduleQty,
                inverterMake: inverterMake,
                inverterCap: inverterCap,
                assignedEngineer: assignedEngineer,
                dispatchDate: dispatchDate,
                structureDate: structureDate,
                inspectionDate: inspectionDate,
                siteNotes: siteNotes,
                totalCost: totalCost,
                advancePaid: advancePaid,
                dispatchDue: dispatchDue,
                finalDue: finalDue,
                subsidy: subsidy,
                netCustomerCost: netCustomerCost,
                status: status,
                updatedAt: new Date().toISOString()
            };

            // Save to Partner local storage
            const partnerWOKey = 'partner_work_orders_' + dealerCode;
            let partnerWOs = [];
            try {
                partnerWOs = JSON.parse(localStorage.getItem(partnerWOKey) || '[]');
            } catch(e) { partnerWOs = []; }

            // Replace if already exists, or unshift
            partnerWOs = partnerWOs.filter(w => w.woNumber !== woNumber && w.id !== woNumber);
            partnerWOs.unshift(workOrder);
            localStorage.setItem(partnerWOKey, JSON.stringify(partnerWOs));

            // Save to Global Work Orders storage
            let globalWOs = [];
            try {
                globalWOs = JSON.parse(localStorage.getItem('global_work_orders') || '[]');
            } catch(e) { globalWOs = []; }
            globalWOs = globalWOs.filter(w => w.woNumber !== woNumber && w.id !== woNumber);
            globalWOs.unshift(workOrder);
            localStorage.setItem('global_work_orders', JSON.stringify(globalWOs.slice(0, 300)));

            renderWorkOrders();
            showPortalToast(`🎉 Work Order ${woNumber} issued successfully!`);

            // Open Preview Modal
            viewWorkOrder(woNumber);
        }

        function getPartnerWorkOrders(dealerCode) {
            if (!dealerCode) dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            const partnerWOKey = 'partner_work_orders_' + dealerCode;
            try {
                return JSON.parse(localStorage.getItem(partnerWOKey) || '[]');
            } catch(e) { return []; }
        }

        function renderWorkOrders() {
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            const wos = getPartnerWorkOrders(dealerCode);
            const container = document.getElementById('work-orders-list-container');
            const badgeCount = document.getElementById('wo-register-count');
            const tabBadge = document.getElementById('tab-badge-wo');

            if (tabBadge) tabBadge.textContent = wos.length;
            if (badgeCount) badgeCount.textContent = wos.length;

            if (!container) return;

            const searchQuery = (document.getElementById('wo-search-input')?.value || '').toLowerCase().trim();
            const statusFilter = document.getElementById('wo-status-filter')?.value || 'All';

            const filtered = wos.filter(w => {
                const matchSearch = !searchQuery || 
                    (w.woNumber && w.woNumber.toLowerCase().includes(searchQuery)) ||
                    (w.customerName && w.customerName.toLowerCase().includes(searchQuery)) ||
                    (w.consumerNo && w.consumerNo.toLowerCase().includes(searchQuery)) ||
                    (w.ksebSection && w.ksebSection.toLowerCase().includes(searchQuery)) ||
                    (w.district && w.district.toLowerCase().includes(searchQuery)) ||
                    (w.assignedEngineer && w.assignedEngineer.toLowerCase().includes(searchQuery));

                const matchStatus = (statusFilter === 'All') || (w.status === statusFilter);
                return matchSearch && matchStatus;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2.5rem 1rem; color: var(--color-text-muted); background: var(--color-bg-alt); border-radius: 12px; border: 1px dashed var(--color-border);">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛠️</div>
                        <div style="font-weight: 700; color: var(--color-text); font-size: 0.95rem;">No Work Orders Found</div>
                        <p style="font-size: 0.78rem; margin-top: 0.25rem;">Create a new work order above or adjust your search filter.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(w => {
                const statusColor = {
                    'Approved': '#eab308',
                    'Material Dispatched': '#3b82f6',
                    'Structure Erected': '#a855f7',
                    'Net Metering Inspection': '#f97316',
                    'Commissioned': '#10b981',
                    'Draft': '#94a3b8'
                }[w.status] || '#eab308';

                return `
                    <div class="portal-card-box" style="background: var(--color-bg-alt); border: 1.5px solid var(--color-border); border-left: 5px solid ${statusColor}; border-radius: 12px; padding: 1.1rem; text-align: left; transition: transform 0.2s ease;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.75rem;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="font-family: monospace; font-weight: 800; color: var(--color-sun-yellow); font-size: 0.95rem;">${escapeHtml(w.woNumber)}</span>
                                    <span style="background: ${statusColor}22; color: ${statusColor}; border: 1px solid ${statusColor}; font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.6rem; border-radius: 20px;">
                                        ● ${escapeHtml(w.status)}
                                    </span>
                                    <span style="font-size: 0.7rem; color: var(--color-text-muted);">Issued: ${w.issueDate || 'Recent'}</span>
                                </div>
                                <h5 style="margin: 0.35rem 0 0.15rem 0; font-size: 1.05rem; color: var(--color-text); font-weight: 800;">
                                    ${escapeHtml(w.customerName)} 
                                    <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted);">(📞 ${escapeHtml(w.customerPhone)})</span>
                                </h5>
                                <div style="font-size: 0.76rem; color: var(--color-text-muted);">
                                    📍 ${escapeHtml(w.siteAddress || w.district)}, ${escapeHtml(w.district)} | ⚡ KSEB: <strong>${escapeHtml(w.ksebSection || 'Section')}</strong> | Cons. No: <span style="font-family: monospace;">${escapeHtml(w.consumerNo)}</span>
                                </div>
                            </div>

                            <!-- Commercial Pill -->
                            <div style="text-align: right; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 0.5rem 0.8rem;">
                                <div style="font-size: 0.72rem; color: var(--color-text-muted);">Project Value</div>
                                <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-sun-yellow);">₹${(w.totalCost || 0).toLocaleString('en-IN')}</div>
                                <div style="font-size: 0.7rem; color: #10b981; font-weight: 700;">DBT Subsidy: ₹${(w.subsidy || 0).toLocaleString('en-IN')}</div>
                            </div>
                        </div>

                        <!-- Technical Specs Grid Bar -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.6rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 0.75rem; margin-bottom: 0.85rem; font-size: 0.76rem;">
                            <div>
                                <span style="color: var(--color-text-muted); display: block;">Capacity &amp; Topology:</span>
                                <strong style="color: var(--color-text); font-size: 0.82rem;">⚡ ${w.capacity} kWp (${escapeHtml(w.topology)})</strong>
                            </div>
                            <div>
                                <span style="color: var(--color-text-muted); display: block;">PV Modules:</span>
                                <strong style="color: var(--color-text);">${escapeHtml(w.moduleQty || 'Modules')}</strong>
                            </div>
                            <div>
                                <span style="color: var(--color-text-muted); display: block;">Inverter:</span>
                                <strong style="color: var(--color-text);">${escapeHtml(w.inverterCap || w.capacity)} kW (${escapeHtml(w.phase)})</strong>
                            </div>
                            <div>
                                <span style="color: var(--color-text-muted); display: block;">Assigned Engineer:</span>
                                <strong style="color: #3b82f6;">👷 ${escapeHtml(w.assignedEngineer || 'Field Team')}</strong>
                            </div>
                        </div>

                        <!-- Milestone & Actions Footer -->
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
                            <div style="font-size: 0.74rem; color: var(--color-text-muted); display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
                                <span>🎯 <strong>Target Commissioning:</strong> ${w.targetDate || 'TBD'}</span>
                                <span>🚚 <strong>Dispatch:</strong> ${w.dispatchDate || 'TBD'}</span>
                                <span style="color: ${w.priority === 'Urgent' ? '#ef4444' : (w.priority === 'High' ? '#f59e0b' : '#10b981')}; font-weight: 700;">
                                    Priority: ${w.priority}
                                </span>
                            </div>

                            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                                <!-- Live Status Changer -->
                                <select onchange="updateWorkOrderStatus('${escapeHtml(w.woNumber)}', this.value)" style="background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.35rem 0.65rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">
                                    <option value="Approved" ${w.status === 'Approved' ? 'selected' : ''}>🟡 Approved</option>
                                    <option value="Material Dispatched" ${w.status === 'Material Dispatched' ? 'selected' : ''}>🚚 Dispatched</option>
                                    <option value="Structure Erected" ${w.status === 'Structure Erected' ? 'selected' : ''}>🏗️ Erected</option>
                                    <option value="Net Metering Inspection" ${w.status === 'Net Metering Inspection' ? 'selected' : ''}>⚡ KSEB Inspection</option>
                                    <option value="Commissioned" ${w.status === 'Commissioned' ? 'selected' : ''}>🟢 Commissioned</option>
                                    <option value="Draft" ${w.status === 'Draft' ? 'selected' : ''}>📝 Draft</option>
                                </select>

                                <button type="button" onclick="viewWorkOrder('${escapeHtml(w.woNumber)}')" style="background: rgba(255, 183, 3, 0.15); border: 1px solid var(--color-sun-yellow); color: var(--color-sun-yellow); font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem;">
                                    🖨️ View / Print
                                </button>
                                <button type="button" onclick="whatsappWorkOrder('${escapeHtml(w.woNumber)}')" style="background: rgba(37, 211, 102, 0.15); border: 1px solid #25d366; color: #25d366; font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem;">
                                    💬 WhatsApp
                                </button>
                                <button type="button" onclick="loadWOToEdit('${escapeHtml(w.woNumber)}')" style="background: rgba(255,255,255,0.06); border: 1px solid var(--color-border); color: var(--color-text); font-size: 0.75rem; font-weight: 600; padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer;">
                                    ✏️ Edit
                                </button>
                                <button type="button" onclick="deleteWorkOrder('${escapeHtml(w.woNumber)}')" style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.4); color: #ef4444; font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer;">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function loadWOToEdit(woNumber) {
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            const wos = getPartnerWorkOrders(dealerCode);
            const w = wos.find(item => item.woNumber === woNumber);
            if (!w) return;

            document.getElementById('wo-number').value = w.woNumber;
            document.getElementById('wo-date').value = w.issueDate || '';
            document.getElementById('wo-target-date').value = w.targetDate || '';
            document.getElementById('wo-priority').value = w.priority || 'Normal';

            document.getElementById('wo-cust-name').value = w.customerName || '';
            document.getElementById('wo-cust-phone').value = w.customerPhone || '';
            document.getElementById('wo-consumer-no').value = w.consumerNo || '';
            document.getElementById('wo-sanctioned-load').value = w.sanctionedLoad || '5.0';
            document.getElementById('wo-site-address').value = w.siteAddress || '';
            document.getElementById('wo-district').value = w.district || 'Ernakulam';
            document.getElementById('wo-kseb-section').value = w.ksebSection || '';

            document.getElementById('wo-capacity').value = w.capacity || 3.0;
            document.getElementById('wo-topology').value = w.topology || 'On-Grid Net Metered';
            document.getElementById('wo-phase').value = w.phase || 'Single Phase 230V';
            document.getElementById('wo-structure-type').value = w.structureType || 'Elevated High-Rise HDGI';
            document.getElementById('wo-module-make').value = w.moduleMake || '';
            document.getElementById('wo-module-watt').value = w.moduleWatt || '550';
            document.getElementById('wo-inverter-make').value = w.inverterMake || '';
            document.getElementById('wo-inverter-cap').value = w.inverterCap || w.capacity;

            document.getElementById('wo-assigned-engineer').value = w.assignedEngineer || '';
            document.getElementById('wo-dispatch-date').value = w.dispatchDate || '';
            document.getElementById('wo-structure-date').value = w.structureDate || '';
            document.getElementById('wo-inspection-date').value = w.inspectionDate || '';
            document.getElementById('wo-site-notes').value = w.siteNotes || '';

            document.getElementById('wo-total-cost').value = w.totalCost || 0;
            document.getElementById('wo-advance-paid').value = w.advancePaid || 0;
            document.getElementById('wo-dispatch-due').value = w.dispatchDue || 0;
            document.getElementById('wo-final-due').value = w.finalDue || 0;
            document.getElementById('wo-status').value = w.status || 'Approved';

            calculateWOBoQ();
            calculateWOCommercials();

            // Scroll to form
            document.getElementById('partner-tab-work-order')?.scrollIntoView({ behavior: 'smooth' });
            showPortalToast(`✏️ Loaded Work Order ${woNumber} into editor.`);
        }

        function updateWorkOrderStatus(woNumber, newStatus) {
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            const partnerWOKey = 'partner_work_orders_' + dealerCode;
            let partnerWOs = [];
            try {
                partnerWOs = JSON.parse(localStorage.getItem(partnerWOKey) || '[]');
            } catch(e) { partnerWOs = []; }

            const target = partnerWOs.find(w => w.woNumber === woNumber);
            if (target) {
                target.status = newStatus;
                target.updatedAt = new Date().toISOString();
                localStorage.setItem(partnerWOKey, JSON.stringify(partnerWOs));
            }

            // Sync with global
            let globalWOs = [];
            try {
                globalWOs = JSON.parse(localStorage.getItem('global_work_orders') || '[]');
            } catch(e) { globalWOs = []; }
            const gTarget = globalWOs.find(w => w.woNumber === woNumber);
            if (gTarget) {
                gTarget.status = newStatus;
                gTarget.updatedAt = new Date().toISOString();
                localStorage.setItem('global_work_orders', JSON.stringify(globalWOs));
            }

            renderWorkOrders();
            showPortalToast(`Updated status of ${woNumber} to: ${newStatus}`);
        }

        function deleteWorkOrder(woNumber) {
            if (!confirm(`Are you sure you want to delete Work Order ${woNumber}?`)) return;
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            const partnerWOKey = 'partner_work_orders_' + dealerCode;
            let partnerWOs = [];
            try {
                partnerWOs = JSON.parse(localStorage.getItem(partnerWOKey) || '[]');
            } catch(e) { partnerWOs = []; }

            partnerWOs = partnerWOs.filter(w => w.woNumber !== woNumber);
            localStorage.setItem(partnerWOKey, JSON.stringify(partnerWOs));

            let globalWOs = [];
            try {
                globalWOs = JSON.parse(localStorage.getItem('global_work_orders') || '[]');
            } catch(e) { globalWOs = []; }
            globalWOs = globalWOs.filter(w => w.woNumber !== woNumber);
            localStorage.setItem('global_work_orders', JSON.stringify(globalWOs));

            renderWorkOrders();
            showPortalToast(`Deleted Work Order ${woNumber}.`);
        }

        function viewWorkOrder(woNumber) {
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            let w = getPartnerWorkOrders(dealerCode).find(item => item.woNumber === woNumber);
            if (!w) {
                // Check global
                try {
                    const globalWOs = JSON.parse(localStorage.getItem('global_work_orders') || '[]');
                    w = globalWOs.find(item => item.woNumber === woNumber);
                } catch(e) {}
            }
            if (!w) {
                alert('Work Order not found.');
                return;
            }

            activeViewingWO = w;
            const printContainer = document.getElementById('wo-printable-area');
            if (!printContainer) return;

            printContainer.innerHTML = `
                <!-- LETTERHEAD HEADER -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2.5px solid #eab308; padding-bottom: 15px; margin-bottom: 20px;">
                    <div>
                        <div style="font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; display: flex; align-items: center; gap: 6px;">
                            <span style="color: #eab308;">⚡</span> SUNOVA SOLAR LLP
                        </div>
                        <div style="font-size: 11px; color: #64748b; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700;">
                            Authorized Solar EPC &amp; PM Surya Ghar National Portal Vendor
                        </div>
                        <div style="font-size: 11.5px; color: #334155; margin-top: 6px; line-height: 1.4;">
                            Door No. 14/282-A, Solar Tech Park, Edappally, Kochi, Kerala - 682024<br>
                            📞 +91 98470 12345 | ✉️ projects@sunovasolar.in | 🌐 www.sunovasolar.in
                        </div>
                    </div>

                    <div style="text-align: right;">
                        <div style="display: inline-block; background: #fef08a; border: 1.5px solid #eab308; color: #854d0e; padding: 4px 12px; border-radius: 6px; font-weight: 800; font-size: 13px; text-transform: uppercase; margin-bottom: 6px;">
                            Official EPC Work Order
                        </div>
                        <div style="font-size: 13px; font-weight: 800; color: #0f172a; font-family: monospace;">${escapeHtml(w.woNumber)}</div>
                        <div style="font-size: 11.5px; color: #64748b; margin-top: 3px;">Date of Issue: <strong>${w.issueDate || 'Today'}</strong></div>
                        <div style="font-size: 11.5px; color: #dc2626; font-weight: 700; margin-top: 2px;">Target Live: ${w.targetDate || 'TBD'}</div>
                    </div>
                </div>

                <!-- METADATA & CHANNEL PARTNER INFO -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px;">
                    <div>
                        <span style="color: #64748b; font-size: 10.5px; text-transform: uppercase; font-weight: 700; display: block;">Channel Partner / EPC Branch:</span>
                        <strong style="color: #0f172a; font-size: 13px;">${escapeHtml(w.dealerName || 'Sunova Direct Partner')}</strong>
                        <div style="color: #475569; font-size: 11.5px;">ID: ${escapeHtml(w.dealerCode || 'DIRECT')} | 📞 ${escapeHtml(w.dealerPhone || '9847012345')}</div>
                    </div>
                    <div>
                        <span style="color: #64748b; font-size: 10.5px; text-transform: uppercase; font-weight: 700; display: block;">Execution Priority &amp; Status:</span>
                        <strong style="color: #0f172a; font-size: 13px;">${escapeHtml(w.priority)} Priority</strong>
                        <div style="color: #16a34a; font-weight: 700; font-size: 11.5px;">Status: ${escapeHtml(w.status)}</div>
                    </div>
                </div>

                <!-- SECTION 1: CUSTOMER & SITE DETAILS TABLE -->
                <div style="margin-bottom: 18px;">
                    <div style="font-weight: 800; font-size: 12.5px; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px; display: flex; justify-content: space-between;">
                        <span>1. Customer &amp; KSEB Installation Premise</span>
                        <span style="color: #64748b; font-size: 11px;">Consumer No: ${escapeHtml(w.consumerNo)}</span>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px; line-height: 1.4;">
                        <tbody>
                            <tr>
                                <td style="padding: 5px 8px; width: 22%; color: #64748b; font-weight: 600; border: 1px solid #e2e8f0; background: #f8fafc;">Customer Name:</td>
                                <td style="padding: 5px 8px; width: 28%; font-weight: 700; color: #0f172a; border: 1px solid #e2e8f0;">${escapeHtml(w.customerName)}</td>
                                <td style="padding: 5px 8px; width: 22%; color: #64748b; font-weight: 600; border: 1px solid #e2e8f0; background: #f8fafc;">Mobile / WhatsApp:</td>
                                <td style="padding: 5px 8px; width: 28%; font-weight: 700; color: #0f172a; border: 1px solid #e2e8f0;">${escapeHtml(w.customerPhone)}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px 8px; color: #64748b; font-weight: 600; border: 1px solid #e2e8f0; background: #f8fafc;">Site Address:</td>
                                <td style="padding: 5px 8px; font-weight: 600; color: #0f172a; border: 1px solid #e2e8f0;" colspan="3">${escapeHtml(w.siteAddress)}, ${escapeHtml(w.district)}, Kerala</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px 8px; color: #64748b; font-weight: 600; border: 1px solid #e2e8f0; background: #f8fafc;">KSEB Section Office:</td>
                                <td style="padding: 5px 8px; font-weight: 700; color: #0f172a; border: 1px solid #e2e8f0;">${escapeHtml(w.ksebSection)}</td>
                                <td style="padding: 5px 8px; color: #64748b; font-weight: 600; border: 1px solid #e2e8f0; background: #f8fafc;">Sanctioned Load:</td>
                                <td style="padding: 5px 8px; font-weight: 700; color: #0f172a; border: 1px solid #e2e8f0;">${escapeHtml(w.sanctionedLoad)} kW (LT Feasibility Clear)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- SECTION 2: TECHNICAL BoQ SPECIFICATIONS TABLE -->
                <div style="margin-bottom: 18px;">
                    <div style="font-weight: 800; font-size: 12.5px; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px;">
                        2. Technical Engineering Bill of Quantities (BoQ)
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 11.5px;">
                        <thead>
                            <tr style="background: #0f172a; color: #ffffff; text-align: left;">
                                <th style="padding: 6px 8px; border: 1px solid #0f172a; width: 5%;">#</th>
                                <th style="padding: 6px 8px; border: 1px solid #0f172a; width: 30%;">Item / Equipment</th>
                                <th style="padding: 6px 8px; border: 1px solid #0f172a; width: 45%;">Approved Technical Specifications</th>
                                <th style="padding: 6px 8px; border: 1px solid #0f172a; width: 20%; text-align: right;">Quantity / Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">1</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Solar PV Modules</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">${escapeHtml(w.moduleMake)} (${w.moduleWatt}Wp) - 30 Yr Warranty</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">${escapeHtml(w.moduleQty)}</td>
                            </tr>
                            <tr style="background: #f8fafc;">
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">2</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Smart Grid Inverter</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">${escapeHtml(w.inverterMake)} - ${w.inverterCap} kW (${escapeHtml(w.phase)}) with Cloud Wi-Fi Monitoring</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">1 Set</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">3</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Mounting Structure</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">${escapeHtml(w.structureType)} (Hot-Dip Galvanized 80μm, 150 km/h Wind Rated)</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">Complete Array</td>
                            </tr>
                            <tr style="background: #f8fafc;">
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">4</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">DC &amp; AC Protection Boxes</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">DCDB (1000V DC SPD + Fuses) &amp; ACDB (4P MCB + Class II Surge Protection Device)</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">1 Set Each</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">5</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Earthing &amp; Lightning Safety</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">3 Dedicated Chemical Earth Pits (&lt; 5Ω) + Solid Copper Lightning Arrester (LA)</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">3 Earth Pits + 1 LA</td>
                            </tr>
                            <tr style="background: #f8fafc;">
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">6</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Cabling &amp; Accessories</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">4/6 sq.mm Tinned Copper UV Fire-Retardant DC Solar Cables + Conduit Pipes</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">Complete Kit</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- SECTION 3: COMMERCIALS & DBT SUBSIDY BREAKDOWN -->
                <div style="margin-bottom: 18px;">
                    <div style="font-weight: 800; font-size: 12.5px; color: #0f172a; text-transform: uppercase; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 8px;">
                        3. Commercial Schedule &amp; PM Surya Ghar DBT Subsidy
                    </div>
                    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 14px;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 11.5px;">
                            <tbody>
                                <tr>
                                    <td style="padding: 5px 8px; color: #475569; border: 1px solid #e2e8f0; background: #f8fafc;">Total Agreed Project Value:</td>
                                    <td style="padding: 5px 8px; font-weight: 800; color: #0f172a; text-align: right; border: 1px solid #e2e8f0;">₹${(w.totalCost || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 8px; color: #16a34a; font-weight: 600; border: 1px solid #e2e8f0;">1. Booking Advance Received:</td>
                                    <td style="padding: 5px 8px; font-weight: 700; color: #16a34a; text-align: right; border: 1px solid #e2e8f0;">₹${(w.advancePaid || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 8px; color: #475569; border: 1px solid #e2e8f0;">2. Material Delivery Milestone Due:</td>
                                    <td style="padding: 5px 8px; font-weight: 700; color: #0f172a; text-align: right; border: 1px solid #e2e8f0;">₹${(w.dispatchDue || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 8px; color: #475569; border: 1px solid #e2e8f0;">3. Commissioning &amp; Handover Due:</td>
                                    <td style="padding: 5px 8px; font-weight: 700; color: #0f172a; text-align: right; border: 1px solid #e2e8f0;">₹${(w.finalDue || 0).toLocaleString('en-IN')}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div style="background: #fefce8; border: 1.5px solid #facc15; border-radius: 8px; padding: 10px 14px; font-size: 11.5px;">
                            <div style="font-weight: 800; color: #854d0e; margin-bottom: 4px; display: flex; justify-content: space-between;">
                                <span>⚡ PM SURYA GHAR DBT SUBSIDY:</span>
                                <span style="font-size: 13px; color: #16a34a;">₹${(w.subsidy || 0).toLocaleString('en-IN')}</span>
                            </div>
                            <p style="font-size: 10.5px; color: #713f12; margin: 0 0 6px 0; line-height: 1.35;">
                                Directly credited to customer's linked bank account upon KSEB Net Metering synchronization.
                            </p>
                            <div style="border-top: 1px dashed #ca8a04; padding-top: 5px; display: flex; justify-content: space-between; align-items: center; font-weight: 800;">
                                <span style="color: #0f172a;">NET EFFECTIVE CUSTOMER COST:</span>
                                <span style="font-size: 14px; color: #0f172a;">₹${(w.netCustomerCost || 0).toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SECTION 4: EXECUTION TEAM & SITE NOTES -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; margin-bottom: 24px; font-size: 11.5px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 6px;">
                        <div><strong>Assigned Lead Project Engineer:</strong> ${escapeHtml(w.assignedEngineer || 'Field Team')}</div>
                        <div><strong>Planned Dispatch Target:</strong> ${w.dispatchDate || 'TBD'} | <strong>Erection:</strong> ${w.structureDate || 'TBD'}</div>
                    </div>
                    <div><strong>Special Site Instructions:</strong> <span style="color: #475569;">${escapeHtml(w.siteNotes || 'Follow standard MNRE / KSEB safety guidelines during installation.')}</span></div>
                </div>

                <!-- SIGNATURE BLOCKS -->
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center; font-size: 11px; margin-top: 30px; padding-top: 10px; border-top: 1px solid #cbd5e1;">
                    <div>
                        <div style="height: 40px; border-bottom: 1px solid #94a3b8; margin-bottom: 4px;"></div>
                        <strong>Authorized Signatory</strong><br>
                        <span style="color: #64748b;">For Sunova Solar LLP</span>
                    </div>
                    <div>
                        <div style="height: 40px; border-bottom: 1px solid #94a3b8; margin-bottom: 4px;"></div>
                        <strong>Lead Project Engineer</strong><br>
                        <span style="color: #64748b;">Field Operations</span>
                    </div>
                    <div>
                        <div style="height: 40px; border-bottom: 1px solid #94a3b8; margin-bottom: 4px;"></div>
                        <strong>Customer Acceptance</strong><br>
                        <span style="color: #64748b;">${escapeHtml(w.customerName)}</span>
                    </div>
                </div>
            `;

            document.getElementById('wo-modal-overlay').style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeWOModal() {
            const modal = document.getElementById('wo-modal-overlay');
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            activeViewingWO = null;
        }

        function printWODocument() {
            window.print();
        }

        function whatsappActiveWorkOrder() {
            if (!activeViewingWO) return;
            whatsappWorkOrder(activeViewingWO.woNumber);
        }

        function whatsappWorkOrder(woNumber) {
            const dealerCode = localStorage.getItem('partner_code') || 'DIRECT';
            let w = getPartnerWorkOrders(dealerCode).find(item => item.woNumber === woNumber);
            if (!w) {
                try {
                    const globalWOs = JSON.parse(localStorage.getItem('global_work_orders') || '[]');
                    w = globalWOs.find(item => item.woNumber === woNumber);
                } catch(e) {}
            }
            if (!w) return;

            const text = 
`⚡ *SUNOVA SOLAR EPC WORK ORDER* ⚡
📄 *Work Order No:* ${w.woNumber}
📅 *Issue Date:* ${w.issueDate || 'Today'}
🎯 *Target Commissioning:* ${w.targetDate || '14 Days'}

👤 *Customer:* ${w.customerName}
📞 *Mobile:* ${w.customerPhone}
📍 *Site:* ${w.siteAddress}, ${w.district}
⚡ *KSEB Section:* ${w.ksebSection} (Cons No: ${w.consumerNo})

⚙️ *TECHNICAL BoQ & SPECS:*
• Capacity: *${w.capacity} kWp (${w.topology})*
• PV Modules: ${w.moduleQty}
• Inverter: ${w.inverterCap || w.capacity} kW (${w.phase})
• Structure: ${w.structureType}
• Protection: 3 Earth Pits (<5Ω) + LA + SPD DCDB/ACDB

👷 *EXECUTION TEAM:*
• Lead Engineer: ${w.assignedEngineer}
• Dispatch Target: ${w.dispatchDate}

💰 *COMMERCIAL SUMMARY:*
• Total Project Cost: ₹${(w.totalCost || 0).toLocaleString('en-IN')}
• Advance Paid: ₹${(w.advancePaid || 0).toLocaleString('en-IN')}
• PM Surya Ghar DBT Subsidy: *₹${(w.subsidy || 0).toLocaleString('en-IN')}*
• *Net Customer Cost:* ₹${(w.netCustomerCost || 0).toLocaleString('en-IN')}

_Issued by ${w.dealerName} | Sunova Solar LLP_`;

            const phone = (w.customerPhone || '').replace(/[^0-9]/g, '');
            const targetPhone = (phone.length === 10) ? ('91' + phone) : phone;
            const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }

        // Initialize Work Order defaults on page load
        window.addEventListener('DOMContentLoaded', () => {
            initNewWorkOrderForm();
        });
"""

    if 'function generateWONumber()' not in content:
        script_closing = '</script>'
        # insert before the last </script>
        last_idx = content.rfind(script_closing)
        if last_idx != -1:
            content = content[:last_idx] + wo_js_code + '\n    ' + content[last_idx:]
            print("Injected Work Order JavaScript engine into partner-portal.html")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

inject_wo_engine()
