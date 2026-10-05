import re

def hide_public_calculator_in_index():
    path = r"C:\Users\a1ypwgg0\OneDrive - Airtelworld\Documents\GitHub\sunova\index.html"
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Header Navigation Links
    old_nav_calc = '<a href="#calculator" class="nav-link" id="link-calculator">Calculator</a>'
    new_nav_calc = '<!-- <a href="#calculator" class="nav-link" id="link-calculator" style="display: none;">Calculator</a> -->'
    if old_nav_calc in content:
        content = content.replace(old_nav_calc, new_nav_calc)
        print("Hidden calculator link in navbar")

    # 2. Update Hero CTA buttons
    old_hero_btn = '<a href="#calculator" class="cta-btn primary-btn" id="btn-hero-calc">Calculate Savings</a>'
    new_hero_btn = '<a href="#contact-form-container" onclick="if(typeof scrollToContactForm===\'function\'){ scrollToContactForm(); }" class="cta-btn primary-btn" id="btn-hero-calc">⚡ Get Free Quotation</a>'
    if old_hero_btn in content:
        content = content.replace(old_hero_btn, new_hero_btn)
        print("Updated hero CTA button link")

    # 3. Separate Calculator UI and Contact Form into distinct blocks with Calculator Hidden
    old_calc_header_to_form = """    <!-- Solar Savings Calculator Section -->
    <section class="calculator-section" id="calculator">
        <div class="container">
            <div class="section-header scroll-reveal">
                <span class="sub-title">SOLAR SIZING CALCULATOR</span>
                <h2 class="section-title">Estimate Your System &amp; Savings</h2>
                <div class="title-line"></div>
                <p class="section-desc">Instantly compute your recommended solar plant size, initial investment, potential subsidies, monthly savings, and payback period under Kerala conditions.</p>
            </div>
            
            <div class="calc-wrapper scroll-reveal-up">"""

    new_calc_header_to_form = """    <!-- Solar Savings Calculator Section (Hidden from Public View) -->
    <div id="calculator" style="display: none !important;">
        <div class="container">
            <div class="section-header">
                <span class="sub-title">SOLAR SIZING CALCULATOR</span>
                <h2 class="section-title">Estimate Your System &amp; Savings</h2>
                <div class="title-line"></div>
                <p class="section-desc">Instantly compute your recommended solar plant size, initial investment, potential subsidies, monthly savings, and payback period under Kerala conditions.</p>
            </div>
            
            <div class="calc-wrapper">"""

    if old_calc_header_to_form in content:
        content = content.replace(old_calc_header_to_form, new_calc_header_to_form)
        print("Wrapped calculator header in hidden container")

    # Close the hidden calculator div before contact form, and start clean contact section
    old_contact_wrapper = """                    <!-- Demand notice in English -->
                    <div style="background: rgba(255, 183, 3, 0.06); border: 1px dashed rgba(255, 183, 3, 0.35); border-radius: 8px; padding: 0.55rem 0.75rem; font-size: 0.73rem; color: var(--color-sun-yellow); text-align: center; margin-bottom: 0;">
                        💡 <strong>Note:</strong> Prices may vary depending on the market demand and availability of solar panels and inverters.
                    </div>
                </div>
            </div>

            <!-- CONTACT & FEASIBILITY HUB: KSEB Feasibility Application & Site Survey Form -->
            <div class="contact-form-wrapper" id="contact" style="max-width: 850px; margin: 2.5rem auto 0; display: flex; flex-direction: column;">"""

    new_contact_wrapper = """                    <!-- Demand notice in English -->
                    <div style="background: rgba(255, 183, 3, 0.06); border: 1px dashed rgba(255, 183, 3, 0.35); border-radius: 8px; padding: 0.55rem 0.75rem; font-size: 0.73rem; color: var(--color-sun-yellow); text-align: center; margin-bottom: 0;">
                        💡 <strong>Note:</strong> Prices may vary depending on the market demand and availability of solar panels and inverters.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CONTACT & FEASIBILITY HUB: KSEB Feasibility Application & Site Survey Section -->
    <section class="contact-section" id="contact" style="padding: 4rem 0; background: var(--color-bg);">
        <div class="container">
            <div class="contact-form-wrapper" style="max-width: 850px; margin: 0 auto; display: flex; flex-direction: column;">"""

    if old_contact_wrapper in content:
        content = content.replace(old_contact_wrapper, new_contact_wrapper)
        print("Isolated Contact & Feasibility Hub section")

    # 4. Update Footer Link
    old_footer_link = '<a href="#calculator">Solar Calculator</a>'
    new_footer_link = '<a href="#contact">KSEB Feasibility Check</a>'
    if old_footer_link in content:
        content = content.replace(old_footer_link, new_footer_link)
        print("Updated footer link")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

hide_public_calculator_in_index()
