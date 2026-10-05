import re
import os

files_to_update = [
    r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\partner-portal.html",
    r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\quotation-generator.html",
    r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\leads.html",
    r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\saved-quotes.html",
    r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\solar-tools.html",
    r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\kseb-feasibility.html",
    r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\tech-locker.html",
    r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\partner-security.html"
]

# Pattern for the stat box:
# <span style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">📥 Active District Leads</span>
# or variations

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace "📥 Active District Leads" or variations
    content = re.sub(
        r'(\<span[^\>]*\>)\s*(?:📥\s*)?Active District Leads\s*(\<\/span\>)',
        r'\1🛠️ Create Work Order\2',
        content
    )

    # In partner-portal.html & quotation-generator.html, ensure stat box is clickable to switch to work-order tab
    if 'partner-portal.html' in file_path or 'quotation-generator.html' in file_path:
        # Check stat box wrapper around partner-active-leads
        old_stat_box = '<div class="portal-stat-box" style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.1rem; text-align: center;">\n                                    <span style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">🛠️ Create Work Order</span>'
        new_stat_box = '<div class="portal-stat-box" onclick="switchPartnerPortalTab(\'work-order\')" style="background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 12px; padding: 1.1rem; text-align: center; cursor: pointer;" title="Click to create or view Work Orders">\n                                    <span style="font-size: 0.76rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">🛠️ Create Work Order</span>'
        if old_stat_box in content:
            content = content.replace(old_stat_box, new_stat_box)

        # Place "Create Work Order" tab button right after Quotation Generator
        nav_pattern = r'(<button type="button" class="partner-tab-btn active"[^>]*id="tab-btn-quote-generator"[^>]*>[\s\S]*?<\/button>)\s*([\s\S]*?)(<button type="button" class="partner-tab-btn"[^>]*id="tab-btn-work-order"[^>]*>[\s\S]*?<\/button>)'
        # Let's inspect nav order and reorder if needed
        old_nav = '''<button type="button" class="partner-tab-btn active" onclick="switchPartnerPortalTab('quote-generator')" id="tab-btn-quote-generator" style="background: var(--color-sun-yellow); color: #0d1321; border: 1px solid var(--color-sun-yellow); font-weight: 800; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                ⚡ Quotation Generator
                            </button>
                            <button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('leads')" id="tab-btn-leads" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                📥 Leads &amp; Inquiries (<span id="tab-badge-allocated">0</span>)
                            </button>
                            <button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('saved-quotes')" id="tab-btn-saved-quotes" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                💾 Saved Quotes (<span id="tab-badge-saved">0</span>)
                            </button>
                            <button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('work-order')" id="tab-btn-work-order" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                🛠️ Create Work Order (<span id="tab-badge-wo">0</span>)
                            </button>'''

        new_nav = '''<button type="button" class="partner-tab-btn active" onclick="switchPartnerPortalTab('quote-generator')" id="tab-btn-quote-generator" style="background: var(--color-sun-yellow); color: #0d1321; border: 1px solid var(--color-sun-yellow); font-weight: 800; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                ⚡ Quotation Generator
                            </button>
                            <button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('work-order')" id="tab-btn-work-order" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                🛠️ Create Work Order (<span id="tab-badge-wo">0</span>)
                            </button>
                            <button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('leads')" id="tab-btn-leads" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                📥 Leads &amp; Inquiries (<span id="tab-badge-allocated">0</span>)
                            </button>
                            <button type="button" class="partner-tab-btn" onclick="switchPartnerPortalTab('saved-quotes')" id="tab-btn-saved-quotes" style="background: rgba(255,255,255,0.06); color: var(--color-text); border: 1px solid var(--color-border); font-weight: 700; padding: 0.6rem 1.1rem; border-radius: 10px; cursor: pointer; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
                                💾 Saved Quotes (<span id="tab-badge-saved">0</span>)
                            </button>'''
        if old_nav in content:
            content = content.replace(old_nav, new_nav)

        # Update stats counter in loadPartnerDashboard to display work orders count in partner-active-leads element
        old_leads_stat = "if (activeLeadsEl) activeLeadsEl.textContent = activeLeadsCount;"
        new_leads_stat = "if (activeLeadsEl) activeLeadsEl.textContent = `${partnerWOs.length} WOs`;"
        if old_leads_stat in content:
            content = content.replace(old_leads_stat, new_leads_stat)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated: {os.path.basename(file_path)}")
