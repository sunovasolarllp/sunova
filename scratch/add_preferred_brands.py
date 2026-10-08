import re

def add_preferred_brand_features():
    index_path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\index.html"
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Form grid to inject
    preferred_brands_html = """                        <div class="form-grid">
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

    target_after = """                            <div class="form-group">
                                <label for="form-system-model">System Technology Model</label>
                                <select id="form-system-model" onchange="handleFormSystemModelChange(this.value)">
                                    <option value="ongrid">On-Grid (Max Savings, Net Metering)</option>
                                    <option value="hybrid">Hybrid (Grid Export + Battery Backup)</option>
                                </select>
                            </div>
                        </div>"""

    if 'id="form-panel-brand"' not in content:
        if target_after in content:
            content = content.replace(target_after, target_after + "\n\n" + preferred_brands_html)
            print("Injected Preferred Panel and Preferred Inverter into index.html")
        else:
            print("Warning: target_after not matched in index.html")
    else:
        print("form-panel-brand already exists in index.html")

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)

    # Also update app.js reset logic
    app_js_path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\app.js"
    with open(app_js_path, 'r', encoding='utf-8') as f:
        app_content = f.read()

    old_reset_code = "document.getElementById('form-system-model').value = 'ongrid';"
    new_reset_code = """document.getElementById('form-system-model').value = 'ongrid';
    if (document.getElementById('form-panel-brand')) document.getElementById('form-panel-brand').value = 'Sunova Recommended';
    if (document.getElementById('form-inverter-brand')) document.getElementById('form-inverter-brand').value = 'Sunova Recommended';"""

    if old_reset_code in app_content and "form-panel-brand" not in app_content[app_content.find(old_reset_code):app_content.find(old_reset_code)+300]:
        app_content = app_content.replace(old_reset_code, new_reset_code)
        print("Updated app.js form reset handler")

    with open(app_js_path, 'w', encoding='utf-8') as f:
        app_content = f.write(app_content)

add_preferred_brand_features()
