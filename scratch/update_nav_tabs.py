import re

files_info = [
    ('partner-portal.html', 'tab-btn-quote-generator'),
    ('quotation-generator.html', 'tab-btn-quote-generator'),
    ('leads.html', 'tab-btn-leads'),
    ('saved-quotes.html', 'tab-btn-saved-quotes'),
    ('installation-tracker.html', 'tab-btn-tracker'),
    ('solar-tools.html', 'tab-btn-calculators'),
    ('kseb-feasibility.html', 'tab-btn-kseb'),
    ('tech-locker.html', 'tab-btn-resources'),
    ('partner-security.html', 'tab-btn-security'),
]

def make_nav(active_id):
    tabs = [
        ('partner-portal.html', 'tab-btn-quote-generator', '⚡ Quotation Generator', None),
        ('leads.html', 'tab-btn-leads', '📥 Leads &amp; Inquiries', 'tab-badge-allocated'),
        ('saved-quotes.html', 'tab-btn-saved-quotes', '💾 Saved Quotes', 'tab-badge-saved'),
        ('installation-tracker.html', 'tab-btn-tracker', '🛠️ Installation Tracker', 'tab-badge-tracker'),
        ('solar-tools.html', 'tab-btn-calculators', '🧮 Solar Tools &amp; Subsidy', None),
        ('kseb-feasibility.html', 'tab-btn-kseb', '⚡ KSEB Feasibility', None),
        ('tech-locker.html', 'tab-btn-resources', '📂 Tech Locker &amp; Warranty', None),
        ('partner-security.html', 'tab-btn-security', '🔒 Security &amp; PIN', None)
    ]
    
    html = ['                        <div class="partner-nav-tabs" style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1.5px solid var(--color-border); scrollbar-width: thin;">']
    for url, tid, label, badge_id in tabs:
        is_active = (tid == active_id)
        bg = 'var(--color-sun-yellow)' if is_active else 'rgba(255,255,255,0.06)'
        col = '#0d1321' if is_active else 'var(--color-text)'
        border = '1px solid var(--color-sun-yellow)' if is_active else '1px solid var(--color-border)'
        fw = '800' if is_active else '700'
        cls = 'partner-tab-btn active' if is_active else 'partner-tab-btn'
        
        badge_html = f' (<span id="{badge_id}">0</span>)' if badge_id else ''
        html.append(f'                            <a href="{url}" class="{cls}" id="{tid}" style="background: {bg}; color: {col}; border: {border}; font-weight: {fw}; padding: 0.6rem 1.1rem; border-radius: 10px; font-size: 0.84rem; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; text-decoration: none;">')
        html.append(f'                                {label}{badge_html}')
        html.append('                            </a>')
    html.append('                        </div>')
    return '\n'.join(html)

for filename, active_id in files_info:
    filepath = rf"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\{filename}"
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace partner-nav-tabs block
        pattern = r'<div class="partner-nav-tabs".*?</div>\s*</div>'
        new_nav = make_nav(active_id)
        
        # We find from <div class="partner-nav-tabs" to the closing </div> of partner-nav-tabs
        nav_pattern = r'<div class="partner-nav-tabs"[\s\S]*?</div>'
        content = re.sub(nav_pattern, new_nav, content, count=1)

        # Ensure tab-badge-tracker count update in JS
        js_badge_code = """
                // Tracker badge
                const projectsList = JSON.parse(localStorage.getItem('sunova_projects') || '[]');
                const trackerBadge = document.getElementById('tab-badge-tracker');
                if (trackerBadge) trackerBadge.textContent = projectsList.length;
"""
        if 'tab-badge-tracker' not in content or 'projectsList' not in content:
            if 'tabSavedBadge.textContent = savedQuotes.length;' in content:
                content = content.replace(
                    'tabSavedBadge.textContent = savedQuotes.length;',
                    'tabSavedBadge.textContent = savedQuotes.length;\n' + js_badge_code
                )
            elif 'if (tabSavedBadge) tabSavedBadge.textContent = savedQuotes.length;' in content:
                content = content.replace(
                    'if (tabSavedBadge) tabSavedBadge.textContent = savedQuotes.length;',
                    'if (tabSavedBadge) tabSavedBadge.textContent = savedQuotes.length;\n' + js_badge_code
                )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")
    except Exception as e:
        print(f"Error on {filename}: {e}")
