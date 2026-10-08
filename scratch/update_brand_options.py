import re

def update_brand_dropdowns():
    index_path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\index.html"
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    old_dropdown_grid = """                        <div class="form-grid">
                            <div class="form-group">
                                <label for="form-panel-brand">Preferred Panel</label>
                                <select id="form-panel-brand">
                                    <option value="Sunova Recommended" selected>🌟 Sunova Recommended</option>
                                    <option value="Emmvee TOPCon 560W">Emmvee TOPCon 560W (DCR ALMM)</option>
                                    <option value="Adani TOPCon 610W">Adani TOPCon 610W (Bifacial)</option>
                                    <option value="Waaree TOPCon / Mono">Waaree TOPCon / Mono PERC</option>
                                    <option value="Tata Power Solar">Tata Power Solar (Tier 1)</option>
                                    <option value="Vikram Solar">Vikram Solar High Efficiency</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="form-inverter-brand">Preferred Inverter</label>
                                <select id="form-inverter-brand">
                                    <option value="Sunova Recommended" selected>🌟 Sunova Recommended</option>
                                    <option value="Eastman Smart Inverter">Eastman Smart String Inverter</option>
                                    <option value="Deye High Efficiency">Deye Dual-MPPT Inverter</option>
                                    <option value="Growatt Smart Inverter">Growatt Wi-Fi Monitoring</option>
                                    <option value="Solis / GoodWe Inverter">Solis / GoodWe High Yield</option>
                                </select>
                            </div>
                        </div>"""

    new_dropdown_grid = """                        <div class="form-grid">
                            <div class="form-group">
                                <label for="form-panel-brand">Preferred Panel</label>
                                <select id="form-panel-brand">
                                    <option value="Emmvee TOPCon 560W" selected>Emmvee TOPCon 560W (DCR ALMM)</option>
                                    <option value="Adani TOPCon 610W">Adani TOPCon 610W (Bifacial)</option>
                                    <option value="Waaree TOPCon / Mono">Waaree TOPCon / Mono PERC</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="form-inverter-brand">Preferred Inverter</label>
                                <select id="form-inverter-brand">
                                    <option value="Eastman Smart Inverter" selected>Eastman Smart String Inverter</option>
                                    <option value="Deye High Efficiency">Deye Dual-MPPT Inverter</option>
                                </select>
                            </div>
                        </div>"""

    if old_dropdown_grid in content:
        content = content.replace(old_dropdown_grid, new_dropdown_grid)
        print("Updated brand dropdowns in index.html")
    else:
        print("Warning: old_dropdown_grid not found, using regex")
        pattern = r'<div class="form-group">\s*<label for="form-panel-brand">Preferred Panel</label>[\s\S]*?</select>\s*</div>\s*<div class="form-group">\s*<label for="form-inverter-brand">Preferred Inverter</label>[\s\S]*?</select>\s*</div>'
        content = re.sub(pattern, new_dropdown_grid.strip(), content)

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)

    # Update app.js fallbacks and reset logic
    app_js_path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\app.js"
    with open(app_js_path, 'r', encoding='utf-8') as f:
        app_content = f.read()

    app_content = app_content.replace(
        "const panelBrand = document.getElementById('form-panel-brand') ? document.getElementById('form-panel-brand').value : 'Sunova Recommended';",
        "const panelBrand = document.getElementById('form-panel-brand') ? document.getElementById('form-panel-brand').value : 'Emmvee TOPCon 560W';"
    )
    app_content = app_content.replace(
        "const inverterBrand = document.getElementById('form-inverter-brand') ? document.getElementById('form-inverter-brand').value : 'Sunova Recommended';",
        "const inverterBrand = document.getElementById('form-inverter-brand') ? document.getElementById('form-inverter-brand').value : 'Eastman Smart Inverter';"
    )
    app_content = app_content.replace(
        "if (document.getElementById('form-panel-brand')) document.getElementById('form-panel-brand').value = 'Sunova Recommended';",
        "if (document.getElementById('form-panel-brand')) document.getElementById('form-panel-brand').value = 'Emmvee TOPCon 560W';"
    )
    app_content = app_content.replace(
        "if (document.getElementById('form-inverter-brand')) document.getElementById('form-inverter-brand').value = 'Sunova Recommended';",
        "if (document.getElementById('form-inverter-brand')) document.getElementById('form-inverter-brand').value = 'Eastman Smart Inverter';"
    )

    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(app_content)
    print("Updated app.js fallbacks and reset logic")

update_brand_dropdowns()
