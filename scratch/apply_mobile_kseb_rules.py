import re
import os

def apply_mobile_and_kseb_rules():
    files = [
        r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\partner-portal.html",
        r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\quotation-generator.html"
    ]

    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Update Mobile input in Work Order Form
        old_phone_input = '<input type="tel" id="wo-cust-phone" required placeholder="e.g. 9847012345" maxlength="10" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">'
        new_phone_input = '<input type="tel" id="wo-cust-phone" required placeholder="e.g. 9876543210" pattern="^[6-9]\\d{9}$" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, \'\')" title="10-digit mobile number starting with 6-9" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">'
        if old_phone_input in content:
            content = content.replace(old_phone_input, new_phone_input)
            print(f"Updated phone input in {os.path.basename(file_path)}")

        # 2. Update Consumer No input in Work Order Form
        old_consumer_input = '<input type="text" id="wo-consumer-no" required maxlength="13" placeholder="e.g. 1155667788990" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-family: monospace;">'
        new_consumer_input = '<input type="text" id="wo-consumer-no" required maxlength="13" placeholder="13-digit Consumer No." pattern="^\\d{13}$" oninput="this.value = this.value.replace(/[^0-9]/g, \'\')" title="13-digit KSEB Consumer Number" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-family: monospace;">'
        if old_consumer_input in content:
            content = content.replace(old_consumer_input, new_consumer_input)
            print(f"Updated consumer no input in {os.path.basename(file_path)}")

        # 3. Update KSEB Section input to select dropdown in Work Order Form
        old_kseb_section = '<input type="text" id="wo-kseb-section" required placeholder="e.g. Kakkanad Section" style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem;">'
        new_kseb_section = '<select id="wo-kseb-section" required style="width: 100%; box-sizing: border-box; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); padding: 0.45rem 0.7rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600;">\n                                                    <option value="">-- Select KSEB Section --</option>\n                                                </select>'
        if old_kseb_section in content:
            content = content.replace(old_kseb_section, new_kseb_section)
            print(f"Updated KSEB section to select dropdown in {os.path.basename(file_path)}")

        # 4. Update populateWOKSEBSections JavaScript function
        old_populate_wo_kseb = """        function populateWOKSEBSections(district) {
            // Optional helper when district changes in WO form
            const ksebInput = document.getElementById('wo-kseb-section');
            if (ksebInput && !ksebInput.value) {
                ksebInput.placeholder = `e.g. ${district} Town Section`;
            }
        }"""
        new_populate_wo_kseb = """        function populateWOKSEBSections(districtName) {
            const selectEl = document.getElementById('wo-kseb-section');
            if (!selectEl) return;
            selectEl.innerHTML = '<option value="">-- Select KSEB Section --</option>';
            if (!districtName) return;
            const sections = KSEB_SECTIONS[districtName];
            if (sections) {
                Object.keys(sections).sort().forEach(sec => {
                    const opt = document.createElement('option');
                    opt.value = sec;
                    opt.textContent = `${sec} (${sections[sec]})`;
                    selectEl.appendChild(opt);
                });
            }
        }"""
        if old_populate_wo_kseb in content:
            content = content.replace(old_populate_wo_kseb, new_populate_wo_kseb)
            print(f"Updated populateWOKSEBSections JS in {os.path.basename(file_path)}")

        # 5. Update validation in handleSaveWorkOrder
        old_save_validation = "const custName = (document.getElementById('wo-cust-name')?.value || '').trim();"
        new_save_validation = """const custName = (document.getElementById('wo-cust-name')?.value || '').trim().toUpperCase();
            const custPhone = (document.getElementById('wo-cust-phone')?.value || '').trim();
            const consumerNo = (document.getElementById('wo-consumer-no')?.value || '').trim();

            if (!custName) {
                alert('Please enter Customer Name.');
                document.getElementById('wo-cust-name')?.focus();
                return;
            }
            if (!custPhone) {
                alert('Please enter Mobile / WhatsApp Number.');
                document.getElementById('wo-cust-phone')?.focus();
                return;
            }
            if (!/^[6-9]\\d{9}$/.test(custPhone)) {
                alert('Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.');
                document.getElementById('wo-cust-phone')?.focus();
                return;
            }
            if (!consumerNo) {
                alert('Please enter 13-digit KSEB Consumer Number.');
                document.getElementById('wo-consumer-no')?.focus();
                return;
            }
            if (!/^\\d{13}$/.test(consumerNo)) {
                alert('Please enter a valid 13-digit numeric KSEB Consumer Number (e.g. 1155667788990).');
                document.getElementById('wo-consumer-no')?.focus();
                return;
            }"""

        # Replace standard fields capture in handleSaveWorkOrder
        target_block = """            const custName = (document.getElementById('wo-cust-name')?.value || '').trim();
            const custPhone = (document.getElementById('wo-cust-phone')?.value || '').trim();
            const consumerNo = (document.getElementById('wo-consumer-no')?.value || '').trim();"""
        if target_block in content:
            content = content.replace(target_block, new_save_validation)
            print(f"Injected strict validation into handleSaveWorkOrder in {os.path.basename(file_path)}")

        # 6. Ensure initNewWorkOrderForm populates sections
        old_init_dist = """const currentPartnerDist = localStorage.getItem('partner_district') || 'Ernakulam';
            const distEl = document.getElementById('wo-district');
            if (distEl) distEl.value = currentPartnerDist;"""
        new_init_dist = """const currentPartnerDist = localStorage.getItem('partner_district') || 'Ernakulam';
            const distEl = document.getElementById('wo-district');
            if (distEl) {
                distEl.value = currentPartnerDist;
                populateWOKSEBSections(currentPartnerDist);
            }"""
        if old_init_dist in content:
            content = content.replace(old_init_dist, new_init_dist)
            print(f"Updated initNewWorkOrderForm district/KSEB init in {os.path.basename(file_path)}")

        # 7. Update autoFillWOFromQuote to set section in dropdown
        old_fill_quote_kseb = """            if (quote.ksebSection) {
                document.getElementById('wo-kseb-section').value = quote.ksebSection;
            }"""
        new_fill_quote_kseb = """            if (quote.district) {
                const distEl = document.getElementById('wo-district');
                if (distEl) distEl.value = quote.district;
                populateWOKSEBSections(quote.district);
            }
            if (quote.ksebSection) {
                const secEl = document.getElementById('wo-kseb-section');
                if (secEl) secEl.value = quote.ksebSection;
            }"""
        if old_fill_quote_kseb in content:
            content = content.replace(old_fill_quote_kseb, new_fill_quote_kseb)
            print(f"Updated autoFillWOFromQuote KSEB section handling in {os.path.basename(file_path)}")

        # 8. Update autoFillWOFromLead to set section in dropdown
        old_fill_lead_kseb = """                if (lead.ksebSection) {
                    document.getElementById('wo-kseb-section').value = lead.ksebSection;
                }"""
        new_fill_lead_kseb = """                if (lead.district) {
                    const distEl = document.getElementById('wo-district');
                    if (distEl) distEl.value = lead.district;
                    populateWOKSEBSections(lead.district);
                }
                if (lead.ksebSection || lead.location) {
                    const secEl = document.getElementById('wo-kseb-section');
                    if (secEl) secEl.value = lead.ksebSection || lead.location;
                }"""
        if old_fill_lead_kseb in content:
            content = content.replace(old_fill_lead_kseb, new_fill_lead_kseb)
            print(f"Updated autoFillWOFromLead KSEB section handling in {os.path.basename(file_path)}")

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

apply_mobile_and_kseb_rules()
