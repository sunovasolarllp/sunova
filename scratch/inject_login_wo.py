import re

def process_login_html():
    path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\login.html"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Staff Portal Navigation Bar
    if 'id="staff-tab-btn-work-orders"' not in content:
        quotes_btn = '''<button type="button" class="staff-tab-btn" onclick="switchStaffPortalTab('quotes')" id="staff-tab-btn-quotes" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                💾 Global Quotes (<span id="staff-tab-badge-quotes">0</span>)
                            </button>'''
        
        wo_btn = '''<button type="button" class="staff-tab-btn" onclick="switchStaffPortalTab('quotes')" id="staff-tab-btn-quotes" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                💾 Global Quotes (<span id="staff-tab-badge-quotes">0</span>)
                            </button>
                            <button type="button" class="staff-tab-btn" onclick="switchStaffPortalTab('work-orders')" id="staff-tab-btn-work-orders" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                🛠️ Work Orders (<span id="staff-tab-badge-wo">0</span>)
                            </button>'''
        if quotes_btn in content:
            content = content.replace(quotes_btn, wo_btn)
            print("Injected nav button into login.html")
        else:
            print("Warning: quotes button not matched in login.html")

    # 2. Add #staff-tab-work-orders pane before #staff-tab-docs
    staff_wo_pane = '''
                        <!-- TAB: Centralized Solar Work Orders Register -->
                        <div id="staff-tab-work-orders" class="staff-tab-pane hidden">
                            <div class="tech-settings-box portal-card-box" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 1.25rem; text-align: left;">
                                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.6rem;">
                                    <div>
                                        <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; color: var(--color-sun-yellow);">
                                            🛠️ Centralized Solar EPC Work Orders &amp; Field Dispatch Hub
                                            <span id="staff-wo-count-badge" style="background: var(--color-sun-yellow); color: #0d1321; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">0</span>
                                        </h4>
                                        <p style="font-size: 0.74rem; color: var(--color-text-muted); margin: 0.2rem 0 0 0;">
                                            Company-wide EPC engineering work orders, technical BoQ records, milestone schedules &amp; commissioning tracker.
                                        </p>
                                    </div>

                                    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                                        <button onclick="exportStaffWOsToCSV()" style="background: rgba(255, 183, 3, 0.15); border: 1px solid var(--color-sun-yellow); color: var(--color-sun-yellow); font-size: 0.74rem; cursor: pointer; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.3rem;">
                                            📊 Export WOs (CSV)
                                        </button>
                                    </div>
                                </div>

                                <!-- Filter Controls Bar -->
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.6rem; margin-bottom: 1rem; background: var(--color-bg-alt); padding: 0.75rem; border-radius: 10px; border: 1px solid var(--color-border);">
                                    <div>
                                        <label style="font-size: 0.7rem; color: var(--color-text-muted); display: block; margin-bottom: 0.2rem;">Search Query:</label>
                                        <input type="text" id="staff-wo-search" oninput="renderStaffWorkOrders()" placeholder="🔍 Search WO / Customer / Partner..." style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.4rem 0.65rem; border-radius: 6px; font-size: 0.78rem;">
                                    </div>
                                    <div>
                                        <label style="font-size: 0.7rem; color: var(--color-text-muted); display: block; margin-bottom: 0.2rem;">Execution Status:</label>
                                        <select id="staff-wo-status-filter" onchange="renderStaffWorkOrders()" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.4rem 0.65rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600;">
                                            <option value="All">All Statuses</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Material Dispatched">Material Dispatched</option>
                                            <option value="Structure Erected">Structure Erected</option>
                                            <option value="Net Metering Inspection">Net Meter Inspection</option>
                                            <option value="Commissioned">Commissioned</option>
                                            <option value="Draft">Draft</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style="font-size: 0.7rem; color: var(--color-text-muted); display: block; margin-bottom: 0.2rem;">District:</label>
                                        <select id="staff-wo-district-filter" onchange="renderStaffWorkOrders()" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.4rem 0.65rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600;">
                                            <option value="All">All 14 Districts</option>
                                            <option value="Ernakulam">Ernakulam</option>
                                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                                            <option value="Kozhikode">Kozhikode</option>
                                            <option value="Thrissur">Thrissur</option>
                                            <option value="Palakkad">Palakkad</option>
                                            <option value="Malappuram">Malappuram</option>
                                            <option value="Kollam">Kollam</option>
                                            <option value="Kannur">Kannur</option>
                                            <option value="Kottayam">Kottayam</option>
                                            <option value="Alappuzha">Alappuzha</option>
                                            <option value="Pathanamthitta">Pathanamthitta</option>
                                            <option value="Kasaragod">Kasaragod</option>
                                            <option value="Wayanad">Wayanad</option>
                                            <option value="Idukki">Idukki</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Staff Work Orders Container -->
                                <div id="staff-work-orders-container" style="max-height: 520px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.85rem; padding-right: 0.3rem;">
                                    <p style="font-size: 0.8rem; color: var(--color-text-muted); text-align: center; padding: 1rem 0;">No work orders logged yet.</p>
                                </div>
                            </div>
                        </div>
'''

    if 'id="staff-tab-work-orders"' not in content:
        docs_pane_marker = '<!-- TAB: Global Installation Documents & KSEB Verification -->'
        if docs_pane_marker in content:
            content = content.replace(docs_pane_marker, staff_wo_pane + '\n                        ' + docs_pane_marker)
            print("Injected #staff-tab-work-orders into login.html")
        else:
            print("Warning: docs_pane_marker not found in login.html")

    # 3. Update switchStaffPortalTab list in login.html
    old_tabs_line = "const tabs = ['leads', 'quotes', 'docs', 'management', 'security'];"
    new_tabs_line = "const tabs = ['leads', 'quotes', 'work-orders', 'docs', 'management', 'security'];"
    if old_tabs_line in content:
        content = content.replace(old_tabs_line, new_tabs_line)
        print("Updated switchStaffPortalTab list in login.html")

    # Add work-orders branch in switchStaffPortalTab
    old_switch_branch = "if (tabId === 'leads') {"
    new_switch_branch = """if (tabId === 'work-orders') {
                renderStaffWorkOrders();
            } else if (tabId === 'leads') {"""
    if old_switch_branch in content and "tabId === 'work-orders'" not in content:
        content = content.replace(old_switch_branch, new_switch_branch)
        print("Added tabId === 'work-orders' branch in login.html")

    # 4. Add Printable Modal to login.html if missing
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
                    <button onclick="window.print()" style="background: #eab308; color: #0f172a; border: none; font-weight: 800; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; display: flex; align-items: center; gap: 5px;">
                        🖨️ Print / Save PDF
                    </button>
                    <button onclick="whatsappStaffWorkOrder(activeViewingStaffWO ? activeViewingStaffWO.woNumber : '')" style="background: #25d366; color: #ffffff; border: none; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 0.82rem; display: flex; align-items: center; gap: 5px;">
                        💬 WhatsApp
                    </button>
                    <button onclick="closeStaffWOModal()" style="background: rgba(255,255,255,0.15); color: #ffffff; border: none; font-weight: 700; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center;">
                        ✕
                    </button>
                </div>
            </div>

            <!-- Printable Document Body -->
            <div id="wo-printable-area" style="padding: 35px 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.45; font-size: 13px; color: #1e293b;">
                <!-- Populated dynamically -->
            </div>
        </div>
    </div>
"""
    if 'id="wo-modal-overlay"' not in content:
        closing_body = '</body>'
        content = content.replace(closing_body, wo_modal_html + '\n' + closing_body)
        print("Injected #wo-modal-overlay in login.html")

    # 5. Add JS functions for Staff Work Orders
    staff_wo_js = """
        // ==========================================
        // 🛠️ STAFF GLOBAL WORK ORDERS ENGINE
        // ==========================================
        let activeViewingStaffWO = null;

        function getGlobalWorkOrders() {
            try {
                return JSON.parse(localStorage.getItem('global_work_orders') || '[]');
            } catch(e) { return []; }
        }

        function updateStaffWOBadges() {
            const wos = getGlobalWorkOrders();
            const badge = document.getElementById('staff-tab-badge-wo');
            if (badge) badge.textContent = wos.length;
            const cardBadge = document.getElementById('staff-wo-count-badge');
            if (cardBadge) cardBadge.textContent = wos.length;
        }

        function renderStaffWorkOrders() {
            const wos = getGlobalWorkOrders();
            updateStaffWOBadges();

            const container = document.getElementById('staff-work-orders-container');
            if (!container) return;

            const searchQuery = (document.getElementById('staff-wo-search')?.value || '').toLowerCase().trim();
            const statusFilter = document.getElementById('staff-wo-status-filter')?.value || 'All';
            const distFilter = document.getElementById('staff-wo-district-filter')?.value || 'All';

            const filtered = wos.filter(w => {
                const matchSearch = !searchQuery ||
                    (w.woNumber && w.woNumber.toLowerCase().includes(searchQuery)) ||
                    (w.customerName && w.customerName.toLowerCase().includes(searchQuery)) ||
                    (w.dealerName && w.dealerName.toLowerCase().includes(searchQuery)) ||
                    (w.dealerCode && w.dealerCode.toLowerCase().includes(searchQuery)) ||
                    (w.consumerNo && w.consumerNo.toLowerCase().includes(searchQuery)) ||
                    (w.ksebSection && w.ksebSection.toLowerCase().includes(searchQuery));

                const matchStatus = (statusFilter === 'All') || (w.status === statusFilter);
                const matchDist = (distFilter === 'All') || (w.district === distFilter);
                return matchSearch && matchStatus && matchDist;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem 1rem; color: var(--color-text-muted); background: var(--color-bg-alt); border-radius: 12px; border: 1px dashed var(--color-border);">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛠️</div>
                        <div style="font-weight: 700; color: var(--color-text);">No Work Orders Found</div>
                        <p style="font-size: 0.78rem; margin-top: 0.25rem;">Adjust search filters or create work orders from the Partner Portal.</p>
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
                    <div class="portal-card-box" style="background: var(--color-bg-alt); border: 1.5px solid var(--color-border); border-left: 5px solid ${statusColor}; border-radius: 12px; padding: 1.1rem; text-align: left;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 0.75rem;">
                            <div>
                                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                                    <span style="font-family: monospace; font-weight: 800; color: var(--color-sun-yellow); font-size: 0.95rem;">${escapeHtml(w.woNumber)}</span>
                                    <span style="background: ${statusColor}22; color: ${statusColor}; border: 1px solid ${statusColor}; font-size: 0.7rem; font-weight: 800; padding: 0.15rem 0.6rem; border-radius: 20px;">
                                        ● ${escapeHtml(w.status)}
                                    </span>
                                    <span style="background: rgba(255,255,255,0.06); color: var(--color-text-muted); border: 1px solid var(--color-border); font-size: 0.68rem; padding: 0.15rem 0.5rem; border-radius: 12px;">
                                        🏢 Partner: <strong>${escapeHtml(w.dealerName || w.dealerCode || 'Direct')}</strong>
                                    </span>
                                </div>
                                <h5 style="margin: 0.35rem 0 0.15rem 0; font-size: 1.05rem; color: var(--color-text); font-weight: 800;">
                                    ${escapeHtml(w.customerName)} 
                                    <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted);">(📞 ${escapeHtml(w.customerPhone)})</span>
                                </h5>
                                <div style="font-size: 0.76rem; color: var(--color-text-muted);">
                                    📍 ${escapeHtml(w.siteAddress || w.district)}, ${escapeHtml(w.district)} | ⚡ KSEB: <strong>${escapeHtml(w.ksebSection || 'Section')}</strong> | Cons. No: <span style="font-family: monospace;">${escapeHtml(w.consumerNo)}</span>
                                </div>
                            </div>

                            <div style="text-align: right; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 0.5rem 0.8rem;">
                                <div style="font-size: 0.72rem; color: var(--color-text-muted);">Project Value</div>
                                <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-sun-yellow);">₹${(w.totalCost || 0).toLocaleString('en-IN')}</div>
                                <div style="font-size: 0.7rem; color: #10b981; font-weight: 700;">DBT: ₹${(w.subsidy || 0).toLocaleString('en-IN')}</div>
                            </div>
                        </div>

                        <!-- Technical Summary Strip -->
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 0.6rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 0.7rem; margin-bottom: 0.85rem; font-size: 0.76rem;">
                            <div>
                                <span style="color: var(--color-text-muted); display: block;">Capacity &amp; Topology:</span>
                                <strong style="color: var(--color-text);">⚡ ${w.capacity} kWp (${escapeHtml(w.topology)})</strong>
                            </div>
                            <div>
                                <span style="color: var(--color-text-muted); display: block;">Structure &amp; Modules:</span>
                                <strong style="color: var(--color-text);">${escapeHtml(w.structureType)} (${escapeHtml(w.moduleQty || 'Modules')})</strong>
                            </div>
                            <div>
                                <span style="color: var(--color-text-muted); display: block;">Assigned Engineer:</span>
                                <strong style="color: #3b82f6;">👷 ${escapeHtml(w.assignedEngineer || 'Field Team')}</strong>
                            </div>
                            <div>
                                <span style="color: var(--color-text-muted); display: block;">Target Date:</span>
                                <strong style="color: var(--color-text);">${w.targetDate || 'TBD'}</strong>
                            </div>
                        </div>

                        <!-- Action Controls -->
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
                            <div style="font-size: 0.74rem; color: var(--color-text-muted);">
                                📅 Issue Date: <strong>${w.issueDate || 'Recent'}</strong> | Priority: <strong>${w.priority || 'Normal'}</strong>
                            </div>

                            <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                                <select onchange="updateStaffWorkOrderStatus('${escapeHtml(w.woNumber)}', this.value)" style="background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.35rem 0.65rem; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">
                                    <option value="Approved" ${w.status === 'Approved' ? 'selected' : ''}>🟡 Approved</option>
                                    <option value="Material Dispatched" ${w.status === 'Material Dispatched' ? 'selected' : ''}>🚚 Dispatched</option>
                                    <option value="Structure Erected" ${w.status === 'Structure Erected' ? 'selected' : ''}>🏗️ Erected</option>
                                    <option value="Net Metering Inspection" ${w.status === 'Net Metering Inspection' ? 'selected' : ''}>⚡ KSEB Inspection</option>
                                    <option value="Commissioned" ${w.status === 'Commissioned' ? 'selected' : ''}>🟢 Commissioned</option>
                                    <option value="Draft" ${w.status === 'Draft' ? 'selected' : ''}>📝 Draft</option>
                                </select>

                                <button type="button" onclick="viewStaffWorkOrder('${escapeHtml(w.woNumber)}')" style="background: rgba(255, 183, 3, 0.15); border: 1px solid var(--color-sun-yellow); color: var(--color-sun-yellow); font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: 6px; cursor: pointer;">
                                    🖨️ View / Print
                                </button>
                                <button type="button" onclick="whatsappStaffWorkOrder('${escapeHtml(w.woNumber)}')" style="background: rgba(37, 211, 102, 0.15); border: 1px solid #25d366; color: #25d366; font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: 6px; cursor: pointer;">
                                    💬 WhatsApp
                                </button>
                                <button type="button" onclick="deleteStaffWorkOrder('${escapeHtml(w.woNumber)}')" style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.4); color: #ef4444; font-size: 0.75rem; font-weight: 700; padding: 0.35rem 0.65rem; border-radius: 6px; cursor: pointer;">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function updateStaffWorkOrderStatus(woNumber, newStatus) {
            let globalWOs = getGlobalWorkOrders();
            const w = globalWOs.find(item => item.woNumber === woNumber);
            if (w) {
                w.status = newStatus;
                w.updatedAt = new Date().toISOString();
                localStorage.setItem('global_work_orders', JSON.stringify(globalWOs));

                // Also sync partner key if dealerCode present
                if (w.dealerCode) {
                    const partnerWOKey = 'partner_work_orders_' + w.dealerCode;
                    try {
                        let pWOs = JSON.parse(localStorage.getItem(partnerWOKey) || '[]');
                        const pTarget = pWOs.find(item => item.woNumber === woNumber);
                        if (pTarget) {
                            pTarget.status = newStatus;
                            pTarget.updatedAt = new Date().toISOString();
                            localStorage.setItem(partnerWOKey, JSON.stringify(pWOs));
                        }
                    } catch(e) {}
                }
            }

            renderStaffWorkOrders();
            showPortalToast(`Updated WO status: ${newStatus}`);
        }

        function deleteStaffWorkOrder(woNumber) {
            if (!confirm(`Are you sure you want to delete Work Order ${woNumber}?`)) return;
            let globalWOs = getGlobalWorkOrders();
            const target = globalWOs.find(item => item.woNumber === woNumber);
            globalWOs = globalWOs.filter(w => w.woNumber !== woNumber);
            localStorage.setItem('global_work_orders', JSON.stringify(globalWOs));

            if (target && target.dealerCode) {
                const partnerWOKey = 'partner_work_orders_' + target.dealerCode;
                try {
                    let pWOs = JSON.parse(localStorage.getItem(partnerWOKey) || '[]');
                    pWOs = pWOs.filter(w => w.woNumber !== woNumber);
                    localStorage.setItem(partnerWOKey, JSON.stringify(pWOs));
                } catch(e) {}
            }

            renderStaffWorkOrders();
            showPortalToast(`Deleted Work Order ${woNumber}.`);
        }

        function viewStaffWorkOrder(woNumber) {
            const wos = getGlobalWorkOrders();
            const w = wos.find(item => item.woNumber === woNumber);
            if (!w) return alert('Work order not found');

            activeViewingStaffWO = w;
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
                        <strong style="color: #0f172a; font-size: 13px;">${escapeHtml(w.priority || 'Normal')} Priority</strong>
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
                                <td style="padding: 5px 8px; font-weight: 700; color: #0f172a; border: 1px solid #e2e8f0;">${escapeHtml(w.sanctionedLoad || '5.0')} kW (LT Feasibility Clear)</td>
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
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">${escapeHtml(w.moduleMake || 'Sunova TopCon')} (${w.moduleWatt || '550'}Wp) - 30 Yr Warranty</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">${escapeHtml(w.moduleQty)}</td>
                            </tr>
                            <tr style="background: #f8fafc;">
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">2</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Smart Grid Inverter</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">${escapeHtml(w.inverterMake)} - ${w.inverterCap || w.capacity} kW (${escapeHtml(w.phase)}) with Wi-Fi</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">1 Set</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">3</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Mounting Structure</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">${escapeHtml(w.structureType)} (Hot-Dip Galvanized 80μm, Wind Rated)</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">Complete Array</td>
                            </tr>
                            <tr style="background: #f8fafc;">
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">4</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">DC &amp; AC Protection Boxes</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">DCDB (1000V DC SPD + Fuses) &amp; ACDB (4P MCB + Class II SPD)</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">1 Set Each</td>
                            </tr>
                            <tr>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: center;">5</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; font-weight: 700;">Earthing &amp; Lightning Safety</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0;">3 Dedicated Chemical Earth Pits (&lt; 5Ω) + Solid Copper Lightning Arrester (LA)</td>
                                <td style="padding: 6px 8px; border: 1px solid #e2e8f0; text-align: right; font-weight: 700;">3 Pits + 1 LA</td>
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
                                    <td style="padding: 5px 8px; color: #475569; border: 1px solid #e2e8f0;">2. Material Delivery Milestone:</td>
                                    <td style="padding: 5px 8px; font-weight: 700; color: #0f172a; text-align: right; border: 1px solid #e2e8f0;">₹${(w.dispatchDue || 0).toLocaleString('en-IN')}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 8px; color: #475569; border: 1px solid #e2e8f0;">3. Commissioning &amp; Handover:</td>
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

        function closeStaffWOModal() {
            const modal = document.getElementById('wo-modal-overlay');
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            activeViewingStaffWO = null;
        }

        function whatsappStaffWorkOrder(woNumber) {
            const wos = getGlobalWorkOrders();
            const w = wos.find(item => item.woNumber === woNumber);
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

        function exportStaffWOsToCSV() {
            const wos = getGlobalWorkOrders();
            if (wos.length === 0) return alert('No work orders to export');

            let csv = 'Work Order No,Issue Date,Target Date,Customer Name,Phone,Address,District,KSEB Section,Consumer No,Capacity (kWp),Topology,Module Qty,Inverter,Total Cost,Advance Paid,DBT Subsidy,Net Cost,Status,Partner\\n';
            wos.forEach(w => {
                csv += `"${w.woNumber || ''}","${w.issueDate || ''}","${w.targetDate || ''}","${(w.customerName || '').replace(/"/g, '""')}","${w.customerPhone || ''}","${(w.siteAddress || '').replace(/"/g, '""')}","${w.district || ''}","${(w.ksebSection || '').replace(/"/g, '""')}","${w.consumerNo || ''}","${w.capacity || ''}","${w.topology || ''}","${w.moduleQty || ''}","${(w.inverterMake || '').replace(/"/g, '""')}","${w.totalCost || 0}","${w.advancePaid || 0}","${w.subsidy || 0}","${w.netCustomerCost || 0}","${w.status || ''}","${(w.dealerName || '').replace(/"/g, '""')}"\\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Sunova_Solar_Work_Orders_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
        }
"""
    if 'function getGlobalWorkOrders()' not in content:
        script_closing = '</script>'
        last_idx = content.rfind(script_closing)
        if last_idx != -1:
            content = content[:last_idx] + staff_wo_js + '\n    ' + content[last_idx:]
            print("Injected Staff Work Orders JavaScript into login.html")

    # Update loadPortalDashboard in login.html to call updateStaffWOBadges()
    old_init_call = "renderInquiries();"
    new_init_call = "renderInquiries();\n            updateStaffWOBadges();"
    if old_init_call in content and "updateStaffWOBadges();" not in content:
        content = content.replace(old_init_call, new_init_call)
        print("Injected updateStaffWOBadges() into login flow in login.html")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

process_login_html()
