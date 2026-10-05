import re
import json

def process_partner_portal():
    path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\partner-portal.html"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Navigation Tabs Bar if not already present
    if 'id="tab-btn-work-order"' not in content:
        # Insert after saved-quotes button
        saved_quotes_btn = '''<button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('saved-quotes')" id="tab-btn-saved-quotes" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                💾 Saved Quotes (<span id="tab-badge-saved">0</span>)
                            </button>'''
        
        wo_btn = '''<button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('saved-quotes')" id="tab-btn-saved-quotes" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                💾 Saved Quotes (<span id="tab-badge-saved">0</span>)
                            </button>
                            <button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('work-order')" id="tab-btn-work-order" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                🛠️ Create Work Order (<span id="tab-badge-wo">0</span>)
                            </button>'''
        if saved_quotes_btn in content:
            content = content.replace(saved_quotes_btn, wo_btn)
            print("Injected nav button into partner-portal.html")
        else:
            print("Warning: saved-quotes button exact match not found in partner-portal.html")

    # 2. Add Partner Tab Pane for Work Orders before docs-upload tab
    wo_pane_html = '''
                        <!-- TAB: Create Work Order & Technical BoQ Dispatch -->
                        <div id="partner-tab-work-order" class="partner-tab-pane hidden">
                            <!-- Work Order Generator Form Box -->
                            <div class="portal-card-box" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 15px; padding: 1.25rem; margin-bottom: 1.5rem; text-align: left;">
                                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 0.6rem; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.6rem;">
                                    <div>
                                        <h4 style="margin: 0; color: var(--color-sun-yellow); font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-heading);">
                                            🛠️ Solar EPC Work Order Generator &amp; Execution Dispatch
                                        </h4>
                                        <p style="font-size: 0.74rem; color: var(--color-text-muted); margin: 0.25rem 0 0 0;">
                                            Generate official engineering work orders, technical BoQ, milestone schedules &amp; dispatch to field installation teams.
                                        </p>
                                    </div>
                                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                                        <button type="button" onclick="initNewWorkOrderForm()" style="background: rgba(255, 183, 3, 0.15); border: 1px solid var(--color-sun-yellow); color: var(--color-sun-yellow); font-size: 0.74rem; font-weight: 700; padding: 0.4rem 0.85rem; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem;">
                                            🔄 New / Reset Work Order
                                        </button>
                                    </div>
                                </div>

                                <!-- 1-Click Fast-Track Auto-Fill Header -->
                                <div style="background: var(--color-bg-alt); border: 1.5px solid var(--color-border); border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem;">
                                    <label style="font-size: 0.78rem; font-weight: 800; color: var(--color-sun-yellow); display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.6rem;">
                                        ⚡ 1-Click Fast-Track Auto-Fill from Quotations or Leads:
                                    </label>
                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.75rem;">
                                        <div>
                                            <label style="font-size: 0.72rem; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">From Saved Customer Quotation:</label>
                                            <select id="wo-autofill-quote-select" onchange="autoFillWOFromQuote(this.value)" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.5rem 0.7rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">
                                                <option value="">-- Choose from Saved Quotes --</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style="font-size: 0.72rem; color: var(--color-text-muted); display: block; margin-bottom: 0.25rem;">From Allocated Customer Lead:</label>
                                            <select id="wo-autofill-lead-select" onchange="autoFillWOFromLead(this.value)" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.5rem 0.7rem; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">
                                                <option value="">-- Choose from Allocated Leads --</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Work Order Master Form -->
                                <form id="work-order-form" onsubmit="event.preventDefault(); handleSaveWorkOrder();">
                                    
                                    <!-- SECTION 1: Customer & Site Details -->
                                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.1rem; margin-bottom: 1.25rem;">
                                        <h5 style="margin: 0 0 0.85rem 0; font-size: 0.88rem; color: var(--color-sun-yellow); font-weight: 800; display: flex; align-items: center; gap: 0.4rem; border-bottom: 1px dashed var(--color-border); padding-bottom: 0.4rem;">
                                            📋 1. Work Order Metadata &amp; Customer Site Information
                                        </h5>

                                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Work Order No. *</label>
                                                <input type="text" id="wo-number" readonly required style="width: 100%; box-sizing: border-box; background: rgba(255, 183, 3, 0.08); color: var(--color-sun-yellow); border: 1px solid var(--color-sun-yellow); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.82rem; font-weight: 800; font-family: monospace;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Issue Date *</label>
                                                <input type="date" id="wo-date" required style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Target Commissioning Date *</label>
                                                <input type="date" id="wo-target-date" required style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Project Priority</label>
                                                <select id="wo-priority" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">
                                                    <option value="Normal">🟢 Standard (14-21 Days)</option>
                                                    <option value="High">🟡 High Priority (7-10 Days)</option>
                                                    <option value="Urgent">🔴 Urgent Express (3-5 Days)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Customer Name *</label>
                                                <input type="text" id="wo-cust-name" required placeholder="e.g. Radhakrishnan Nair" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; text-transform: uppercase;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Mobile / WhatsApp *</label>
                                                <input type="tel" id="wo-cust-phone" required placeholder="e.g. 9847012345" maxlength="10" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">KSEB 13-Digit Consumer No. *</label>
                                                <input type="text" id="wo-consumer-no" required maxlength="13" placeholder="e.g. 1155667788990" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-family: monospace;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Sanctioned Connected Load (kW)</label>
                                                <input type="number" id="wo-sanctioned-load" step="0.5" min="1" value="5.0" placeholder="e.g. 5.0" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                        </div>

                                        <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 0.75rem;">
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Installation Site Address *</label>
                                                <input type="text" id="wo-site-address" required placeholder="e.g. House No 45, Greenfield Enclave, Near Civil Station" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">District (Kerala) *</label>
                                                <select id="wo-district" required onchange="populateWOKSEBSections(this.value)" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">
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
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">KSEB Electrical Section *</label>
                                                <input type="text" id="wo-kseb-section" required placeholder="e.g. Kakkanad Section" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- SECTION 2: Technical BoQ & Engineering Specs -->
                                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.1rem; margin-bottom: 1.25rem;">
                                        <h5 style="margin: 0 0 0.85rem 0; font-size: 0.88rem; color: var(--color-sun-yellow); font-weight: 800; display: flex; align-items: center; gap: 0.4rem; border-bottom: 1px dashed var(--color-border); padding-bottom: 0.4rem;">
                                            ⚙️ 2. Technical Engineering Bill of Quantities (BoQ) &amp; Specs
                                        </h5>

                                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Plant Capacity (kWp) *</label>
                                                <input type="number" id="wo-capacity" step="0.1" min="1" max="100" value="3.0" required oninput="calculateWOBoQ(); calculateWOCommercials();" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.82rem; font-weight: 700;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">System Topology *</label>
                                                <select id="wo-topology" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">
                                                    <option value="On-Grid Net Metered">⚡ On-Grid (KSEB Net-Metered)</option>
                                                    <option value="Hybrid with Battery Storage">🔋 Hybrid (Solar + Lithium Battery)</option>
                                                    <option value="Off-Grid Independent">☀️ Off-Grid Independent</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Grid Connection Phase *</label>
                                                <select id="wo-phase" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">
                                                    <option value="Single Phase 230V">Single Phase (230V AC - Up to 5 kW)</option>
                                                    <option value="Three Phase 415V">Three Phase (415V AC - Above 3 kW)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Roof Mounting Structure *</label>
                                                <select id="wo-structure-type" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">
                                                    <option value="Elevated High-Rise HDGI">🏗️ Elevated High-Rise HDGI (Walkable)</option>
                                                    <option value="Standard Flat Roof HDGI">🏢 Standard Flat Roof HDGI (Short Leg)</option>
                                                    <option value="Sloped Tile Roof Rail Mount">🏠 Sloped Tile / Sheet Rail Clamps</option>
                                                    <option value="Waterproof Solar Pergola / Canopy">☔ Waterproof Solar Pergola Canopy</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Solar PV Modules (Make &amp; Technology)</label>
                                                <input type="text" id="wo-module-make" value="Sunova High-Efficiency TopCon Bifacial Dual Glass (DCR ALMM)" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Module Wattage (Wp)</label>
                                                <select id="wo-module-watt" onchange="calculateWOBoQ()" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">
                                                    <option value="550">550 Wp TopCon</option>
                                                    <option value="580">580 Wp Bifacial</option>
                                                    <option value="540">540 Wp Mono PERC</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Calculated Module Qty</label>
                                                <input type="text" id="wo-module-qty" readonly style="width: 100%; box-sizing: border-box; background: rgba(16, 185, 129, 0.08); color: #10b981; border: 1px solid #10b981; padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.82rem; font-weight: 800;">
                                            </div>
                                        </div>

                                        <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Solar Grid Inverter (Make &amp; Model)</label>
                                                <input type="text" id="wo-inverter-make" value="Sunova Dual-MPPT Smart Grid-Tie Inverter (IP65 Wi-Fi)" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Inverter Capacity (kW)</label>
                                                <input type="number" id="wo-inverter-cap" step="0.5" value="3.0" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Earthing Pits &amp; Surge</label>
                                                <input type="text" id="wo-earthing-spec" readonly value="3 Chemical Earth Pits &lt; 5Ω + Class II SPD" style="width: 100%; box-sizing: border-box; background: rgba(255,255,255,0.04); color: var(--color-text-muted); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.76rem;">
                                            </div>
                                        </div>

                                        <!-- BoS & Protection Summary Checklist -->
                                        <div style="background: rgba(255, 183, 3, 0.04); border: 1px solid rgba(255, 183, 3, 0.2); border-radius: 8px; padding: 0.75rem 0.9rem; font-size: 0.76rem; color: var(--color-text); display: flex; flex-wrap: wrap; gap: 0.8rem;">
                                            <span>✔️ <strong>DCDB:</strong> 1000V DC Fuse + 2P SPD</span>
                                            <span>✔️ <strong>ACDB:</strong> 4P MCB + 4P SPD Protection</span>
                                            <span>✔️ <strong>Earthing:</strong> 3 Pure Copper Bonded Pits</span>
                                            <span>✔️ <strong>LA:</strong> Solid Copper Lightning Spike</span>
                                            <span>✔️ <strong>Cables:</strong> 4/6 sq.mm Tinned Copper Solar DC</span>
                                        </div>
                                    </div>

                                    <!-- SECTION 3: Execution Team & Milestones -->
                                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.1rem; margin-bottom: 1.25rem;">
                                        <h5 style="margin: 0 0 0.85rem 0; font-size: 0.88rem; color: var(--color-sun-yellow); font-weight: 800; display: flex; align-items: center; gap: 0.4rem; border-bottom: 1px dashed var(--color-border); padding-bottom: 0.4rem;">
                                            👷 3. Field Execution Team, Milestones &amp; Site Notes
                                        </h5>

                                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Assigned Lead Engineer / Technician *</label>
                                                <input type="text" id="wo-assigned-engineer" required placeholder="e.g. Sujith M. (Senior Solar Tech - 9847123456)" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Material Dispatch Target</label>
                                                <input type="date" id="wo-dispatch-date" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Structure Erection Target</label>
                                                <input type="date" id="wo-structure-date" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">KSEB Inspection Target</label>
                                                <input type="date" id="wo-inspection-date" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">
                                            </div>
                                        </div>

                                        <div>
                                            <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Site Execution &amp; Safety Instructions</label>
                                            <textarea id="wo-site-notes" rows="2" placeholder="e.g. Sloped RCC roof with staircase access. Ensure safety harnesses and lifelines during module mounting. Inverter to be installed inside covered utility area." style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-family: inherit; resize: vertical;"></textarea>
                                        </div>
                                    </div>

                                    <!-- SECTION 4: Commercials & Subsidy Breakdown -->
                                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.1rem; margin-bottom: 1.25rem;">
                                        <h5 style="margin: 0 0 0.85rem 0; font-size: 0.88rem; color: var(--color-sun-yellow); font-weight: 800; display: flex; align-items: center; gap: 0.4rem; border-bottom: 1px dashed var(--color-border); padding-bottom: 0.4rem;">
                                            💰 4. Commercial Terms, Milestones &amp; PM Surya Ghar DBT Subsidy
                                        </h5>

                                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Total Project Cost (₹) *</label>
                                                <input type="number" id="wo-total-cost" required min="10000" value="195000" oninput="calculateWOCommercials()" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.85rem; font-weight: 800;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Advance Received (₹)</label>
                                                <input type="number" id="wo-advance-paid" value="50000" oninput="calculateWOCommercials()" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.82rem; font-weight: 700; color: #10b981;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Material Dispatch Due (₹)</label>
                                                <input type="number" id="wo-dispatch-due" value="100000" oninput="calculateWOCommercials()" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.82rem;">
                                            </div>
                                            <div>
                                                <label style="font-size: 0.72rem; font-weight: 700; color: var(--color-text); display: block; margin-bottom: 0.25rem;">Final Handover Due (₹)</label>
                                                <input type="number" id="wo-final-due" value="45000" readonly style="width: 100%; box-sizing: border-box; background: rgba(255,255,255,0.04); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.82rem; font-weight: 700;">
                                            </div>
                                        </div>

                                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
                                            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid #10b981; border-radius: 8px; padding: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
                                                <div>
                                                    <span style="font-size: 0.72rem; color: #10b981; font-weight: 700; display: block;">PM Surya Ghar DBT Subsidy (Direct to Bank)</span>
                                                    <strong id="wo-subsidy-display" style="font-size: 1.15rem; color: #10b981;">₹78,000</strong>
                                                </div>
                                                <span style="font-size: 0.72rem; background: #10b981; color: white; padding: 0.2rem 0.5rem; border-radius: 10px; font-weight: 700;">MNRE Direct</span>
                                            </div>
                                            <div style="background: rgba(255, 183, 3, 0.08); border: 1px solid var(--color-sun-yellow); border-radius: 8px; padding: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
                                                <div>
                                                    <span style="font-size: 0.72rem; color: var(--color-sun-yellow); font-weight: 700; display: block;">Net Effective Cost to Customer</span>
                                                    <strong id="wo-net-cost-display" style="font-size: 1.15rem; color: var(--color-sun-yellow);">₹1,17,000</strong>
                                                </div>
                                                <span style="font-size: 0.72rem; background: var(--color-sun-yellow); color: #0d1321; padding: 0.2rem 0.5rem; border-radius: 10px; font-weight: 700;">After Subsidy</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Status & Action Bar -->
                                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; background: var(--color-bg-alt); padding: 1rem; border-radius: 12px; border: 1px solid var(--color-border);">
                                        <div style="display: flex; align-items: center; gap: 0.6rem;">
                                            <label style="font-size: 0.76rem; font-weight: 700; color: var(--color-text);">Initial Status:</label>
                                            <select id="wo-status" style="background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">
                                                <option value="Approved">🟡 Approved / Ready for Dispatch</option>
                                                <option value="Material Dispatched">🚚 Material Dispatched</option>
                                                <option value="Structure Erected">🏗️ Structure Erected</option>
                                                <option value="Net Metering Inspection">⚡ Net Meter Inspection</option>
                                                <option value="Commissioned">🟢 Commissioned &amp; Live</option>
                                                <option value="Draft">📝 Draft</option>
                                            </select>
                                        </div>

                                        <div style="display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap;">
                                            <button type="submit" style="background: var(--color-sun-yellow); color: #0d1321; font-weight: 800; border: none; padding: 0.55rem 1.25rem; border-radius: 8px; cursor: pointer; font-size: 0.84rem; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: 0 4px 12px rgba(255, 183, 3, 0.25);">
                                                💾 Save &amp; Issue Work Order
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <!-- Work Orders Register & Tracker Box -->
                            <div class="portal-card-box" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 15px; padding: 1.25rem; text-align: left;">
                                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 0.6rem; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.6rem;">
                                    <div>
                                        <h4 style="margin: 0; color: var(--color-sun-yellow); font-size: 1rem; display: flex; align-items: center; gap: 0.4rem; font-family: var(--font-heading);">
                                            📑 Active Work Orders Register &amp; Execution Tracker
                                            <span id="wo-register-count" style="background: var(--color-sun-yellow); color: #0d1321; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 10px; font-weight: 700;">0</span>
                                        </h4>
                                        <p style="font-size: 0.74rem; color: var(--color-text-muted); margin: 0.2rem 0 0 0;">
                                            Track project lifecycle from material dispatch to KSEB net-metering synchronization and final commissioning.
                                        </p>
                                    </div>

                                    <!-- Filter & Search Controls -->
                                    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                                        <input type="text" id="wo-search-input" oninput="renderWorkOrders()" placeholder="🔍 Search WO / Customer / Section..." style="background: var(--color-bg-alt); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.78rem; min-width: 200px;">
                                        <select id="wo-status-filter" onchange="renderWorkOrders()" style="background: var(--color-bg-alt); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.4rem 0.7rem; border-radius: 6px; font-size: 0.78rem; font-weight: 600;">
                                            <option value="All">All Statuses</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Material Dispatched">Material Dispatched</option>
                                            <option value="Structure Erected">Structure Erected</option>
                                            <option value="Net Metering Inspection">Net Meter Inspection</option>
                                            <option value="Commissioned">Commissioned</option>
                                            <option value="Draft">Draft</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Work Orders Cards / List -->
                                <div id="work-orders-list-container" style="display: flex; flex-direction: column; gap: 0.85rem; max-height: 520px; overflow-y: auto; padding-right: 0.3rem;">
                                    <!-- Rendered dynamically via renderWorkOrders() -->
                                </div>
                            </div>
                        </div>
                        <!-- End Tab: Work Order -->
'''

    if 'id="partner-tab-work-order"' not in content:
        docs_upload_pane = '<!-- TAB 4: Solar Installation Documents Upload -->'
        if docs_upload_pane in content:
            content = content.replace(docs_upload_pane, wo_pane_html + '\n                        ' + docs_upload_pane)
            print("Injected #partner-tab-work-order pane into partner-portal.html")
        else:
            # Fallback search
            docs_marker = '<div id="partner-tab-docs-upload"'
            idx = content.find(docs_marker)
            if idx != -1:
                content = content[:idx] + wo_pane_html + '\n                        ' + content[idx:]
                print("Injected #partner-tab-work-order pane before docs-upload (fallback)")
            else:
                print("Warning: Could not find insertion point for #partner-tab-work-order in partner-portal.html")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

process_partner_portal()
