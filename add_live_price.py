import re

with open('partner-portal.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add onchange handlers to form fields
fields_to_update = [
    ('id="quote-capacity"', 'id="quote-capacity" onchange="recalculateLivePrice()"'),
    ('id="quote-panel-brand"', 'id="quote-panel-brand" onchange="recalculateLivePrice()"'),
    ('id="quote-phase"', 'id="quote-phase" onchange="recalculateLivePrice()"'),
    ('id="quote-roof-type"', 'id="quote-roof-type" onchange="recalculateLivePrice()"'),
    ('id="quote-floors"', 'id="quote-floors" onchange="recalculateLivePrice()"'),
    ('id="quote-truss"', 'id="quote-truss" onchange="recalculateLivePrice()"'),
    ('id="quote-material"', 'id="quote-material" onchange="recalculateLivePrice()"')
]

for old, new in fields_to_update:
    content = content.replace(old, new)

# 2. Add live price display div before the buttons
buttons_html = '''<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 1.2rem;">
                            <button type="button" onclick="generateQuotation('customer')"'''
live_price_html = '''<div id="live-price-display" style="text-align: center; margin-top: 1rem; font-size: 1.1rem; font-weight: 700; color: #28a745; background: rgba(40, 167, 69, 0.1); padding: 0.5rem; border-radius: 8px;">
                            Estimated Total: ₹ <span id="live-price-amount">0</span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 1.2rem;">
                            <button type="button" onclick="generateQuotation('customer')"'''
content = content.replace(buttons_html, live_price_html)

# 3. Add recalculateLivePrice function
js_function = '''
        function recalculateLivePrice() {
            const capacityStr = document.getElementById('quote-capacity').value;
            const capacityVal = parseFloat(capacityStr);
            const floors = parseInt(document.getElementById('quote-floors').value) || 1;
            const trussWork = document.getElementById('quote-truss').value;
            const structMat = document.getElementById('quote-material').value;
            const panelModel = document.getElementById('quote-panel-brand').value;
            const phase = document.getElementById('quote-phase').value;
            const roofType = document.getElementById('quote-roof-type').value;

            const is5_3 = capacityStr === '5_3';
            const panelKw = (capacityStr === '3' || is5_3) ? 3 : 5;

            let grossTotal = 0;

            // Base pricing
            if (panelModel === 'Emmvee') {
                if (capacityStr === '3') grossTotal = 200000;
                else if (capacityStr === '5' && phase === 'Single Phase') grossTotal = 290000;
                else if (capacityStr === '5' && phase === 'Three Phase') grossTotal = 310000;
                else if (is5_3 && phase === 'Single Phase') grossTotal = 240000;
                else if (is5_3 && phase === 'Three Phase') grossTotal = 260000;
            } else if (panelModel === 'Adani') {
                if (capacityStr === '3') grossTotal = 210000;
                else if (capacityStr === '5' && phase === 'Single Phase') grossTotal = 300000;
                else if (capacityStr === '5' && phase === 'Three Phase') grossTotal = 320000;
                else if (is5_3 && phase === 'Single Phase') grossTotal = 250000;
                else if (is5_3 && phase === 'Three Phase') grossTotal = 270000;
            } else {
                grossTotal = capacityVal * 64000; // Fallback
            }

            // Roof & Truss Add-ons
            if (roofType === 'RCC') {
                if (trussWork === 'Yes') grossTotal += (panelKw === 3 ? 3500 : 6500);
                if (floors >= 3) grossTotal += (floors - 2) * 5000;
            } else {
                if (trussWork === 'Yes') grossTotal += (panelKw === 3 ? 6500 : 8500);
                else grossTotal += (panelKw === 3 ? 5000 : 6000);
                
                if (floors >= 2) grossTotal += (floors - 1) * 5000;
            }

            // Material Discount
            if (structMat === 'Customer') {
                grossTotal -= (panelKw === 3 ? 15000 : 25000);
            }
            
            document.getElementById('live-price-amount').innerText = grossTotal.toLocaleString('en-IN');
        }

        // Call once on load to set initial price
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(recalculateLivePrice, 500);
        });

        async function generateQuotation(type) {'''

content = content.replace("async function generateQuotation(type) {", js_function)

with open('partner-portal.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Live price preview added.")
