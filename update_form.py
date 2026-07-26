import re

with open('partner-portal.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Capacity field to be a select
capacity_old = '''<label style="font-size: 0.76rem; color: var(--color-text); margin-bottom: 0.3rem; display: block; font-weight: 600;">Capacity (kWp)</label>
                                <input type="number" id="quote-capacity" value="3" min="1" step="1" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;" required>'''
capacity_new = '''<label style="font-size: 0.76rem; color: var(--color-text); margin-bottom: 0.3rem; display: block; font-weight: 600;">System Configuration</label>
                                <select id="quote-capacity" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;" required>
                                    <option value="3">3 kW</option>
                                    <option value="5">5 kW</option>
                                    <option value="5_3">5 kW Inverter + 3 kW Panels</option>
                                </select>'''
content = content.replace(capacity_old, capacity_new)


# 2. Add new fields below Roof Type and Phase
fields_old = '''<div class="form-group">
                                <label style="font-size: 0.76rem; color: var(--color-text); margin-bottom: 0.3rem; display: block; font-weight: 600;">Electrical Phase</label>
                                <select id="quote-phase" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;">
                                    <option value="Single Phase">Single Phase</option>
                                    <option value="Three Phase">Three Phase</option>
                                </select>
                            </div>
                        </div>'''
fields_new = '''<div class="form-group">
                                <label style="font-size: 0.76rem; color: var(--color-text); margin-bottom: 0.3rem; display: block; font-weight: 600;">Electrical Phase</label>
                                <select id="quote-phase" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;">
                                    <option value="Single Phase">Single Phase</option>
                                    <option value="Three Phase">Three Phase</option>
                                </select>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.8rem; margin-bottom: 1rem;">
                            <div class="form-group">
                                <label style="font-size: 0.76rem; color: var(--color-text); margin-bottom: 0.3rem; display: block; font-weight: 600;">Number of Floors</label>
                                <input type="number" id="quote-floors" value="1" min="1" max="10" step="1" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;" required>
                            </div>
                            <div class="form-group">
                                <label style="font-size: 0.76rem; color: var(--color-text); margin-bottom: 0.3rem; display: block; font-weight: 600;">Truss Work</label>
                                <select id="quote-truss" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;">
                                    <option value="No">No Truss Work</option>
                                    <option value="Yes">With Truss Work</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label style="font-size: 0.76rem; color: var(--color-text); margin-bottom: 0.3rem; display: block; font-weight: 600;">Structure Material</label>
                                <select id="quote-material" style="width: 100%; padding: 0.55rem; background: var(--color-bg-alt); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text); font-size: 0.82rem;">
                                    <option value="Sunova">By Sunova Solar</option>
                                    <option value="Customer">By Customer</option>
                                </select>
                            </div>
                        </div>'''
content = content.replace(fields_old, fields_new)

with open('partner-portal.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Form fields updated.")
