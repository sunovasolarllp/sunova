import re

with open('partner-portal.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update form value extraction
extract_old = '''const capacityVal = parseFloat(document.getElementById('quote-capacity').value);
            const panelModel = document.getElementById('quote-panel-brand').value;
            const inverterModel = document.getElementById('quote-inverter-brand').value;
            const roofType = document.getElementById('quote-roof-type').value;
            const phase = document.getElementById('quote-phase').value;'''

extract_new = '''const capacityStr = document.getElementById('quote-capacity').value;
            const capacityVal = parseFloat(capacityStr);
            const floors = parseInt(document.getElementById('quote-floors').value) || 1;
            const trussWork = document.getElementById('quote-truss').value;
            const structMat = document.getElementById('quote-material').value;
            const panelModel = document.getElementById('quote-panel-brand').value;
            const inverterModel = document.getElementById('quote-inverter-brand').value;
            const roofType = document.getElementById('quote-roof-type').value;
            const phase = document.getElementById('quote-phase').value;'''

content = content.replace(extract_old, extract_new)


# 2. Update pricing logic
pricing_old = '''if (type === 'customer') {
                if (capacityVal === 3) {
                    grossTotal = (customPricing && customPricing['3']) ? parseFloat(customPricing['3']) : 220000;
                } else if (capacityVal === 5) {
                    grossTotal = (customPricing && customPricing['5']) ? parseFloat(customPricing['5']) : 320000;
                } else {
                    grossTotal = capacityVal * ((customPricing && customPricing['other']) ? parseFloat(customPricing['other']) : 64000);
                }'''

pricing_new = '''if (type === 'customer') {
                const is5_3 = capacityStr === '5_3';
                const panelKw = (capacityStr === '3' || is5_3) ? 3 : 5;

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
'''

content = content.replace(pricing_old, pricing_new)

with open('partner-portal.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("JS Pricing updated.")
