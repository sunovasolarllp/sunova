import re
import os

def clean_brand_names_only():
    # 1. Update index.html
    index_path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\index.html"
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    old_dropdown_grid = """                        <div class="form-grid">
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

    new_dropdown_grid = """                        <div class="form-grid">
                            <div class="form-group">
                                <label for="form-panel-brand">Preferred Panel</label>
                                <select id="form-panel-brand">
                                    <option value="Emmvee" selected>Emmvee</option>
                                    <option value="Adani">Adani</option>
                                    <option value="Waaree">Waaree</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="form-inverter-brand">Preferred Inverter</label>
                                <select id="form-inverter-brand">
                                    <option value="Eastman" selected>Eastman</option>
                                    <option value="Deye">Deye</option>
                                </select>
                            </div>
                        </div>"""

    if old_dropdown_grid in content:
        content = content.replace(old_dropdown_grid, new_dropdown_grid)
        print("Updated index.html brand dropdowns with clean names only")
    else:
        # regex replacement
        pattern = r'<div class="form-group">\s*<label for="form-panel-brand">Preferred Panel</label>[\s\S]*?</select>\s*</div>\s*<div class="form-group">\s*<label for="form-inverter-brand">Preferred Inverter</label>[\s\S]*?</select>\s*</div>'
        replacement = """<div class="form-group">
                                <label for="form-panel-brand">Preferred Panel</label>
                                <select id="form-panel-brand">
                                    <option value="Emmvee" selected>Emmvee</option>
                                    <option value="Adani">Adani</option>
                                    <option value="Waaree">Waaree</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="form-inverter-brand">Preferred Inverter</label>
                                <select id="form-inverter-brand">
                                    <option value="Eastman" selected>Eastman</option>
                                    <option value="Deye">Deye</option>
                                </select>
                            </div>"""
        content = re.sub(pattern, replacement, content)
        print("Regex replaced in index.html")

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)

    # 2. Update app.js
    app_js_path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\app.js"
    with open(app_js_path, 'r', encoding='utf-8') as f:
        app_content = f.read()

    app_content = app_content.replace(
        "const panelBrand = document.getElementById('form-panel-brand') ? document.getElementById('form-panel-brand').value : 'Emmvee TOPCon 560W';",
        "const panelBrand = document.getElementById('form-panel-brand') ? document.getElementById('form-panel-brand').value : 'Emmvee';"
    )
    app_content = app_content.replace(
        "const inverterBrand = document.getElementById('form-inverter-brand') ? document.getElementById('form-inverter-brand').value : 'Eastman Smart Inverter';",
        "const inverterBrand = document.getElementById('form-inverter-brand') ? document.getElementById('form-inverter-brand').value : 'Eastman';"
    )
    app_content = app_content.replace(
        "if (document.getElementById('form-panel-brand')) document.getElementById('form-panel-brand').value = 'Emmvee TOPCon 560W';",
        "if (document.getElementById('form-panel-brand')) document.getElementById('form-panel-brand').value = 'Emmvee';"
    )
    app_content = app_content.replace(
        "if (document.getElementById('form-inverter-brand')) document.getElementById('form-inverter-brand').value = 'Eastman Smart Inverter';",
        "if (document.getElementById('form-inverter-brand')) document.getElementById('form-inverter-brand').value = 'Eastman';"
    )

    with open(app_js_path, 'w', encoding='utf-8') as f:
        f.write(app_content)
    print("Updated app.js")

    # 3. Update partner-portal.html & quotation-generator.html
    for portal_file in [r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\partner-portal.html", r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\quotation-generator.html"]:
        with open(portal_file, 'r', encoding='utf-8') as f:
            p_content = f.read()

        # Update quote-panel-brand
        old_p_panel = """                                <select id="quote-panel-brand" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;">
                                    <option value="Emmvee" selected>Emmvee TOPCon 560W</option>
                                    <option value="Adani">Adani TOPCon 610W</option>
                                    <option value="Waaree">Waaree TOPCon / Mono</option>
                                </select>"""
        new_p_panel = """                                <select id="quote-panel-brand" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;">
                                    <option value="Emmvee" selected>Emmvee</option>
                                    <option value="Adani">Adani</option>
                                    <option value="Waaree">Waaree</option>
                                </select>"""
        if old_p_panel in p_content:
            p_content = p_content.replace(old_p_panel, new_p_panel)

        # Update quote-inverter-brand
        old_p_inverter = """                                <select id="quote-inverter-brand" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;">
                                    <option value="Eastman" selected>Eastman String Inverter</option>
                                    <option value="Deye">Deye High Efficiency</option>
                                    <option value="Growatt">Growatt String Inverter</option>
                                </select>"""
        new_p_inverter = """                                <select id="quote-inverter-brand" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;">
                                    <option value="Eastman" selected>Eastman</option>
                                    <option value="Deye">Deye</option>
                                </select>"""
        if old_p_inverter in p_content:
            p_content = p_content.replace(old_p_inverter, new_p_inverter)

        with open(portal_file, 'w', encoding='utf-8') as f:
            f.write(p_content)
        print(f"Updated {os.path.basename(portal_file)}")

clean_brand_names_only()
