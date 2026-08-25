/**
 * SUNOVA SOLAR LLP - Bilingual Engine (English & Malayalam / മലയാളം)
 * Supports dynamic language switching with persistent state across all pages.
 */

const SUNOVA_TRANSLATIONS = {
    en: {
        // Navigation
        "nav_home": "Home",
        "nav_services": "Services",
        "nav_calculator": "Calculator",
        "nav_about": "About Us",
        "nav_contact": "Contact",
        "nav_dealers": "Dealers & Branches",
        "nav_get_quote": "Get Quotation",
        "nav_login_title": "Partner & Staff Login Portal",

        // Hero Section
        "hero_pill": "☀️ Brightening Kerala Homes • 💚 1,500+ Happy Families",
        "hero_title_prefix": "Power Your Home with Sunshine. ",
        "hero_title_highlight": "Protect Your Family's Future.",
        "hero_desc": "Experience true energy freedom and zero bill anxiety. Join over 1,500+ happy families across Kerala who enjoy clean, sustainable rooftop solar power, direct government subsidies (up to ₹78,000), and 25 years of warm local care.",
        "hero_typing_1": "Save up to ₹1,50,000/year on electricity bills",
        "hero_typing_2": "Get up to ₹78,000 direct PM Surya Ghar subsidy",
        "hero_typing_3": "25-year peace-of-mind warranty & local service",
        "hero_btn_calc": "Calculate Savings",
        "hero_btn_quote": "Get Free Quotation",
        "hero_badge_warranty": "✨ 25-Year Peace-of-Mind Care",
        "hero_badge_support": "🤝 Local Support in All 14 Districts",
        "hero_badge_eco": "🌱 100% Green Eco Protection",

        // Family Benefits Card
        "benefit_card_title": "☀️ Family Solar Benefits",
        "benefit_1_title": "Zero Bill Happiness",
        "benefit_1_desc": "Enjoy near-zero KSEB monthly power bills and lifelong financial freedom for your home.",
        "benefit_2_title": "Clean Green Legacy",
        "benefit_2_desc": "Offset tons of CO2 emissions and leave a healthier, greener Kerala for your children.",
        "benefit_3_title": "Govt. Subsidy (Up to ₹78,000)",
        "benefit_3_desc": "Hassle-free PM Surya Ghar Yojana subsidy credited directly to your bank account.",

        // Live Matrix Ribbon
        "grid_status_title": "☀️ Live Kerala Solar Grid Status:",
        "grid_status_today": "(Generated Today)",
        "grid_co2_label": "🌿 CO2 Avoided:",
        "grid_plants_label": "⚡ Active Solar Plants:",

        // Impact Statistics Banner
        "stat_families_num": "1,500+",
        "stat_families_title": "Happy Families Powered",
        "stat_families_desc": "Smiling Kerala homes with zero bill anxiety",
        "stat_trees_num": "45,000+",
        "stat_trees_title": "Trees Planted Equivalent",
        "stat_trees_desc": "Protecting Kerala's green natural beauty",
        "stat_savings_num": "₹15+ Crore",
        "stat_savings_title": "Family Savings Delivered",
        "stat_savings_desc": "Keeping hard-earned money at home",
        "stat_warranty_num": "25 Years",
        "stat_warranty_title": "Peace of Mind Warranty",
        "stat_warranty_desc": "Personal support across all 14 districts",

        // Core Services Section
        "services_sub": "WHAT WE DO",
        "services_title": "Core Solar Services & Operations",
        "services_desc": "We specialize in engineering, procurement, and construction (EPC) of high-grade solar photovoltaic power systems tailored for various applications.",
        
        "service_1_title": "Residential Rooftop Solar",
        "service_1_desc": "Complete on-grid solar solutions for homes under the PM Surya Ghar Yojana. Tailored to support heavy domestic appliances like air conditioners and water pumps while slashing KSEB tariffs.",
        "service_1_feat_1": "Subsidy support & paperless application",
        "service_1_feat_2": "Monocrystalline PERC half-cut panels",
        "service_1_feat_3": "Grid-tied inverter with mobile app monitoring",

        "service_2_title": "Commercial & Business Systems",
        "service_2_desc": "Custom rooftop structures for commercial complexes, offices, retail spaces, and factories. Lower operating expenses, hedge against rising commercial power tariffs, and enjoy tax depreciation benefits.",
        "service_2_feat_1": "Accelerated depreciation tax benefits",
        "service_2_feat_2": "High load capacity and structural engineering",
        "service_2_feat_3": "ROI starting in just 3 to 4 years",

        "service_3_title": "Hybrid Solar & Battery Storage",
        "service_3_desc": "Combine net-metered savings with battery autonomy. Our hybrid systems store excess day energy in Lithium-ion or Tubular banks, keeping power active during grid load shedding.",
        "service_3_feat_1": "Automatic switchover during blackouts",
        "service_3_feat_2": "Premium Lithium/Tubular storage banks",
        "service_3_feat_3": "Grid export (Net Metering) fully supported",

        "service_4_title": "Operations & Maintenance",
        "service_4_desc": "Keep your solar plant operating at peak efficiency. We provide professional pressure washing, inverter diagnostics, grid performance audits, and KSEB licensing coordination.",
        "service_4_feat_1": "Pressure washing panel cleaning services",
        "service_4_feat_2": "Inverter health checks & string testing",
        "service_4_feat_3": "Liaison for Net-Meter testing & billing",

        // Technology Guide Section
        "tech_sub": "SOLAR TECH GUIDE",
        "tech_title": "Types of Solar Panels in the Market",
        "tech_desc": "Understand the different solar photovoltaic panel technologies available to power your home or business.",

        // Calculator Section
        "calc_sub": "INTERACTIVE ESTIMATOR",
        "calc_title": "Kerala Solar Savings Calculator",
        "calc_desc": "Find out your ideal system size, estimated investment, government subsidy under PM Surya Ghar Yojana, and monthly savings.",
        "calc_step1": "Step 1: Your Current KSEB Monthly Bill",
        "calc_step2": "Step 2: Connection Type",
        "calc_single_phase": "Single Phase (1-3 kW)",
        "calc_three_phase": "Three Phase (3-10+ kW)",
        "calc_recommended_size": "Recommended System Size",
        "calc_subsidy_amount": "Govt. Direct Subsidy",
        "calc_net_investment": "Estimated Net Cost",
        "calc_monthly_savings": "Monthly Electricity Savings",
        "calc_annual_savings": "Estimated Annual Savings",
        "calc_payback": "Estimated Payback Period",
        "calc_btn_book": "Book Free Site Survey",

        // KSEB Bill Upload
        "kseb_parser_title": "⚡ Instant KSEB Bill AI Scanner",
        "kseb_parser_desc": "Upload a photo or PDF of your KSEB electricity bill for automated solar capacity recommendation.",
        "kseb_upload_btn": "Upload KSEB Bill (PDF / Photo)",

        // Dealers & Branches Section
        "dealers_sub": "ALL 14 DISTRICTS",
        "dealers_title": "Sunova Solar Authorized Dealer Network",
        "dealers_desc": "Connect with authorized Sunova Solar channel partners and technical support teams across Kerala.",
        "dealers_all": "All Kerala",
        "dealers_call": "📞 Call Partner",
        "dealers_wa": "💬 WhatsApp",

        // About Us
        "about_sub": "OUR STORY",
        "about_title": "Trusted Solar Engineering Partner in Kerala",
        "about_desc": "Headquartered in Thodupuzha, SUNOVA SOLAR LLP is committed to making clean solar energy affordable, durable, and reliable for every household and business across Kerala.",

        // Contact Section
        "contact_sub": "GET IN TOUCH",
        "contact_title": "Request a Free Quotation & Site Visit",
        "contact_desc": "Speak with our solar engineers to design a custom rooftop system for your building.",
        "form_name": "Full Name",
        "form_phone": "Mobile Number",
        "form_district": "Select District",
        "form_bill": "Average Monthly Bill (₹)",
        "form_submit": "Submit Quotation Request",

        // Footer
        "footer_desc": "SUNOVA SOLAR LLP is Kerala's trusted solar engineering, procurement, and construction company.",
        "footer_quick_links": "Quick Links",
        "footer_services_links": "Solar Solutions",
        "footer_contact_info": "Contact Info",
        "footer_copyright": "© 2026 SUNOVA SOLAR LLP. All rights reserved."
    },

    ml: {
        // Navigation
        "nav_home": "ഹോം",
        "nav_services": "സേവനങ്ങൾ",
        "nav_calculator": "കാൽക്കുലേറ്റർ",
        "nav_about": "ഞങ്ങളെക്കുറിച്ച്",
        "nav_contact": "ബന്ധപ്പെടുക",
        "nav_dealers": "ഡീലർമാർ & ശാഖകൾ",
        "nav_get_quote": "സൗജന്യ കൊട്ടേഷൻ",
        "nav_login_title": "പാർട്ണർ & സ്റ്റാഫ് ലോഗിൻ പോർട്ടൽ",

        // Hero Section
        "hero_pill": "☀️ കേരളത്തിലെ വീടുകൾക്ക് പ്രകാശം • 💚 1,500+ സംതൃപ്ത കുടുംബങ്ങൾ",
        "hero_title_prefix": "നിങ്ങളുടെ വീടിന് സൗരോർജ്ജത്തിന്റെ വെളിച്ചം. ",
        "hero_title_highlight": "കുടുംബത്തിന്റെ ഭാവിക്കൊരു സുരക്ഷ.",
        "hero_desc": "കറന്റ് ബില്ലിന്റെ ടെൻഷൻ ഇല്ലാതെ യഥാർത്ഥ ഊർജ്ജ സ്വാതന്ത്ര്യം അനുഭവിക്കൂ. കേരളത്തിലുടനീളം 1,500-ലധികം കുടുംബങ്ങൾക്കൊപ്പം പങ്കുചേരൂ - 78,000 രൂപ വരെയുള്ള കേന്ദ്ര സർക്കാർ സബ്സിഡിയും 25 വർഷത്തെ മികച്ച പ്രാദേശിക സേവനവും സ്വന്തമാക്കൂ.",
        "hero_typing_1": "വൈദ്യുതി ബില്ലിൽ വർഷം ₹1,50,000 വരെ ലാഭിക്കാം",
        "hero_typing_2": "PM സൂര്യ ഘർ വഴി ₹78,000 നേരിട്ടുള്ള ബാങ്ക് സബ്സിഡി",
        "hero_typing_3": "25 വർഷത്തെ വിശ്വസനീയ വാറണ്ടിയും സർവീസും",
        "hero_btn_calc": "ലാഭം കണക്കാക്കൂ",
        "hero_btn_quote": "സൗജന്യ കൊട്ടേഷൻ നേടൂ",
        "hero_badge_warranty": "✨ 25 വർഷത്തെ വിശ്വസനീയ സംരക്ഷണം",
        "hero_badge_support": "🤝 14 ജില്ലകളിലും പ്രാദേശിക സേവനം",
        "hero_badge_eco": "🌱 100% പരിസ്ഥിതി സൗഹൃദം",

        // Family Benefits Card
        "benefit_card_title": "☀️ സോളാറിന്റെ കുടുംബ നേട്ടങ്ങൾ",
        "benefit_1_title": "പൂജ്യം കറന്റ് ബിൽ സന്തോഷം",
        "benefit_1_desc": "KSEB പ്രതിമാസ വൈദ്യുതി ബില്ലുകൾ പൂർണ്ണമായും കുറച്ച് സാമ്പത്തിക സ്വാതന്ത്ര്യം നേടൂ.",
        "benefit_2_title": "ഹരിത പ്രകൃതി സംരക്ഷണം",
        "benefit_2_desc": "ടൺ കണക്കിന് കാർബൺ പുറന്തള്ളൽ കുറച്ച് അടുത്ത തലമുറയ്ക്കായി നല്ലൊരു കേരളം കാത്തുസൂക്ഷിക്കാം.",
        "benefit_3_title": "കേന്ദ്ര സബ്സിഡി (₹78,000 വരെ)",
        "benefit_3_desc": "പിഎം സൂര്യ ഘർ യോജന വഴിയുള്ള സബ്സിഡി തുക നേരിട്ട് നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ടിലേക്ക് ലഭിക്കും.",

        // Live Matrix Ribbon
        "grid_status_title": "☀️ കേരള സോളാർ ഗ്രിഡ് ലൈവ് നിലവാരം:",
        "grid_status_today": "(ഇന്ന് ഉത്പാദിപ്പിച്ചത്)",
        "grid_co2_label": "🌿 ഒഴിവാക്കിയ കാർബൺ (CO2):",
        "grid_plants_label": "⚡ സോളാർ പ്ലാന്റുകൾ:",

        // Impact Statistics Banner
        "stat_families_num": "1,500+",
        "stat_families_title": "സംതൃപ്ത കുടുംബങ്ങൾ",
        "stat_families_desc": "പൂജ്യം ബിൽ സന്തോഷത്തോടെ കേരളത്തിലെ വീടുകൾ",
        "stat_trees_num": "45,000+",
        "stat_trees_title": "നട്ടുപിടിപ്പിച്ച മരങ്ങൾക്ക് തുല്യം",
        "stat_trees_desc": "കേരളത്തിന്റെ പച്ചപ്പും പ്രകൃതി സൗന്ദര്യവും കാത്തുസൂക്ഷിക്കുന്നു",
        "stat_savings_num": "₹15+ കോടി",
        "stat_savings_title": "ഉപഭോക്താക്കളുടെ ആകെ സമ്പാദ്യം",
        "stat_savings_desc": "നിങ്ങളുടെ അധ്വാനത്തിന്റെ പണം വീട്ടിൽ തന്നെ നിലനിർത്തുന്നു",
        "stat_warranty_num": "25 വർഷം",
        "stat_warranty_title": "വിശ്വസനീയ വാറന്റി",
        "stat_warranty_desc": "14 ജില്ലകളിലും വ്യക്തിഗത കെയറും സേവനവും",

        // Core Services Section
        "services_sub": "ഞങ്ങളുടെ സേവനങ്ങൾ",
        "services_title": "പ്രധാന സോളാർ സേവനങ്ങളും സംവിധാനങ്ങളും",
        "services_desc": "വീടുകൾക്കും ബിസിനസുകൾക്കും അനുയോജ്യമായ ഏറ്റവും ഉയർന്ന നിലവാരത്തിലുള്ള റൂഫ്‌ടോപ്പ് സോളാർ സംവിധാനങ്ങൾ ഞങ്ങൾ കൃത്യതയോടെ ഇൻസ്റ്റാൾ ചെയ്യുന്നു.",
        
        "service_1_title": "വീടുകൾക്കായുള്ള റൂഫ്‌ടോപ്പ് സോളാർ",
        "service_1_desc": "പിഎം സൂര്യ ഘർ യോജന പ്രകാരമുള്ള ഓൺ-ഗ്രിഡ് സോളാർ സിസ്റ്റം. എയർ കണ്ടീഷണറുകളും വാട്ടർ പമ്പുകളും സുഗമമായി പ്രവർത്തിപ്പിക്കാനും KSEB ബില്ലുകൾ ഇല്ലാതാക്കാനും അനുയോജ്യം.",
        "service_1_feat_1": "സബ്സിഡി അപേക്ഷാ സഹായം & പേപ്പർലെസ് പ്രോസസ്സ്",
        "service_1_feat_2": "മോണോക്രിസ്റ്റലിൻ PERC ഹാഫ്-കട്ട് പാനലുകൾ",
        "service_1_feat_3": "മൊബൈൽ ആപ്പ് വഴി ജനറേഷൻ നിരീക്ഷിക്കാവുന്ന ഇൻവെർട്ടർ",

        "service_2_title": "വാണിജ്യ & വ്യവസായ സ്ഥാപനങ്ങൾ",
        "service_2_desc": "ഷോപ്പിംഗ് കോംപ്ലക്സുകൾ, ഓഫീസുകൾ, ഫാക്ടറികൾ എന്നിവയ്ക്കായുള്ള വലിയ സോളാർ സംവിധാനങ്ങൾ. വൈദ്യുതി ചിലവ് ഗണ്യമായി കുറയ്ക്കാനും ടാക്സ് ആനുകൂല്യങ്ങൾ നേടാനും സാധിക്കും.",
        "service_2_feat_1": "ആക്സിലറേറ്റഡ് ഡിപ്രീസിയേഷൻ നികുതി ആനുകൂല്യങ്ങൾ",
        "service_2_feat_2": "ഉയർന്ന കരുത്തുള്ള സ്ട്രക്ചറൽ എൻജിനീയറിങ്",
        "service_2_feat_3": "3 മുതൽ 4 വർഷത്തിനുള്ളിൽ മുടക്കുമുതൽ തിരിച്ചുകിട്ടുന്നു",

        "service_3_title": "ഹൈബ്രിഡ് സോളാർ & ബാറ്ററി സ്റ്റോറേജ്",
        "service_3_desc": "നെറ്റ് മീറ്ററിംഗിനൊപ്പം ബാറ്ററി ബാക്കപ്പും. അധികമായി ഉൽപ്പാദിപ്പിക്കുന്ന പകൽ വെളിച്ചം ലിഥിയം അല്ലെങ്കിൽ ട്യൂബുലാർ ബാറ്ററികളിൽ സൂക്ഷിച്ച് ലോഡ്ഷെഡിംഗ് സമയത്തും തടസ്സമില്ലാതെ വൈദ്യുതി ഉറപ്പാക്കാം.",
        "service_3_feat_1": "പവർ കട്ട് സമയത്ത് തനിയെ മാറുന്ന ഓട്ടോമാറ്റിക് സിസ്റ്റം",
        "service_3_feat_2": "പ്രീമിയം ലിഥിയം / ട്യൂബുലാർ ബാറ്ററി ബാങ്കുകൾ",
        "service_3_feat_3": "ഗ്രിഡ് എക്സ്പോർട്ട് (നെറ്റ് മീറ്ററിംഗ്) സൗകര്യം",

        "service_4_title": "ഓപ്പറേഷൻസ് & മെയിന്റനൻസ്",
        "service_4_desc": "നിങ്ങളുടെ സോളാർ പ്ലാന്റ് എപ്പോഴും ഏറ്റവും മികച്ച രീതിയിൽ പ്രവർത്തിക്കാൻ കൃത്യമായ പ്രഷർ വാഷ് ക്ലീനിംഗ്, ഇൻവെർട്ടർ ചെക്കപ്പ്, KSEB നെറ്റ് മീറ്റർ കോർഡിനേഷൻ എന്നിവ നൽകുന്നു.",
        "service_4_feat_1": "പ്രത്യേക പ്രഷർ വാഷിംഗ് പാനൽ ക്ലീനിംഗ്",
        "service_4_feat_2": "ഇൻവെർട്ടർ ഹെൽത്ത് & സ്ട്രിംഗ് ടെസ്റ്റിംഗ്",
        "service_4_feat_3": "നെറ്റ് മീറ്റർ ലൈസൻസിംഗും ബില്ലിംഗ് സഹായവും",

        // Technology Guide Section
        "tech_sub": "സാങ്കേതിക ഗൈഡ്",
        "tech_title": "വിപണിയിലെ പ്രധാന സോളാർ പാനലുകൾ",
        "tech_desc": "നിങ്ങളുടെ ആവശ്യങ്ങൾക്ക് ഏറ്റവും അനുയോജ്യമായ സോളാർ പാനൽ സാങ്കേതികവിദ്യ മനസ്സിലാക്കൂ.",

        // Calculator Section
        "calc_sub": "സോളാർ കാൽക്കുലേറ്റർ",
        "calc_title": "കേരള സോളാർ സമ്പാദ്യ കാൽക്കുലേറ്റർ",
        "calc_desc": "നിങ്ങളുടെ വീടിനാവശ്യമായ കപ്പാസിറ്റി, പ്രതീക്ഷിക്കുന്ന ചിലവ്, കേന്ദ്ര സബ്സിഡി, പ്രതിമാസ ലാഭം എന്നിവ നിമിഷങ്ങൾക്കുള്ളിൽ കണക്കാക്കൂ.",
        "calc_step1": "ഘട്ടം 1: നിലവിലെ KSEB പ്രതിമാസ ബിൽ",
        "calc_step2": "ഘട്ടം 2: കണക്ഷൻ ടൈപ്പ്",
        "calc_single_phase": "സിംഗിൾ ഫേസ് (1-3 kW)",
        "calc_three_phase": "ത്രീ ഫേസ് (3-10+ kW)",
        "calc_recommended_size": "ആവശ്യമായ സോളാർ സിസ്റ്റം",
        "calc_subsidy_amount": "നേരിട്ടുള്ള കേന്ദ്ര സബ്സിഡി",
        "calc_net_investment": "യഥാർത്ഥ ഇൻവെസ്റ്റ്മെന്റ്",
        "calc_monthly_savings": "പ്രതിമാസ ലാഭം",
        "calc_annual_savings": "പ്രതിവർഷം ലാഭിക്കാവുന്നത്",
        "calc_payback": "മുടക്കുമുതൽ തിരിച്ചുകിട്ടുന്ന കാലം",
        "calc_btn_book": "സൗജന്യ സൈറ്റ് സർവേ ബുക്ക് ചെയ്യൂ",

        // KSEB Bill Upload
        "kseb_parser_title": "⚡ KSEB ബിൽ AI സ്കാനർ",
        "kseb_parser_desc": "നിങ്ങളുടെ KSEB വൈദ്യുതി ബില്ലിന്റെ ഫോട്ടോയോ പിഡിഎഫോ അപ്‌ലോഡ് ചെയ്യുക - കപ്പാസിറ്റി തനിയെ കണക്കാക്കും.",
        "kseb_upload_btn": "KSEB ബിൽ അപ്‌ലോഡ് ചെയ്യൂ (PDF / ഫോട്ടോ)",

        // Dealers & Branches Section
        "dealers_sub": "14 ജില്ലകളിലും ലഭ്യമാണ്",
        "dealers_title": "സനോവ സോളാർ അംഗീകൃത ഡീലർ ശൃംഖല",
        "dealers_desc": "കേരളത്തിലുടനീളമുള്ള സനോവ സോളാറിന്റെ അംഗീകൃത ഡീലർമാരുമായി നേരിട്ട് ബന്ധപ്പെടാം.",
        "dealers_all": "എല്ലാ ജില്ലകളും",
        "dealers_call": "📞 വിളിക്കുക",
        "dealers_wa": "💬 വാട്സാപ്പ്",

        // About Us
        "about_sub": "ഞങ്ങളെക്കുറിച്ച്",
        "about_title": "കേരളത്തിന്റെ വിശ്വസ്ത സോളാർ പാർട്ണർ",
        "about_desc": "തൊടുപുഴ ആസ്ഥാനമായി പ്രവർത്തിക്കുന്ന SUNOVA SOLAR LLP, കേരളത്തിലെ ഓരോ വീടുകളിലും സ്ഥാപനങ്ങളിലും ഏറ്റവും മികച്ച നിലവാരത്തിലുള്ള സൗരോർജ്ജ സംവിധാനങ്ങൾ ലഭ്യമാക്കുന്നു.",

        // Contact Section
        "contact_sub": "ബന്ധപ്പെടുക",
        "contact_title": "സൗജന്യ കൊട്ടേഷനും സൈറ്റ് സന്ദർശനവും ആവശ്യപ്പെടൂ",
        "contact_desc": "നിങ്ങളുടെ ആവശ്യത്തിനനുസരിച്ചുള്ള സോളാർ പ്ലാന്റ് രൂപകൽപ്പന ചെയ്യാൻ ഞങ്ങളുടെ വിദഗ്ദ്ധ എഞ്ചിനീയർമാരുമായി സംസാരിക്കൂ.",
        "form_name": "പൂർണ്ണമായ പേര്",
        "form_phone": "മൊബൈൽ നമ്പർ",
        "form_district": "ജില്ല തിരഞ്ഞെടുക്കുക",
        "form_bill": "ശരാശരി മാസ ബിൽ (₹)",
        "form_submit": "കൊട്ടേഷൻ റിക്വസ്റ്റ് സമർപ്പിക്കൂ",

        // Footer
        "footer_desc": "കേരളത്തിലെ ഏറ്റവും വിശ്വസനീയമായ സോളാർ എൻജിനീയറിങ് & ഇൻസ്റ്റാളേഷൻ കമ്പനിയാണ് SUNOVA SOLAR LLP.",
        "footer_quick_links": "പ്രധാന ലിങ്കുകൾ",
        "footer_services_links": "സോളാർ സൊല്യൂഷനുകൾ",
        "footer_contact_info": "ബന്ധപ്പെടാനുള്ള വിലാസം",
        "footer_copyright": "© 2026 SUNOVA SOLAR LLP. സർവ്വ അവകാശങ്ങളും നിക്ഷിപ്തം."
    }
};

/**
 * Switch language between 'en' and 'ml'
 */
function setSunovaLanguage(lang) {
    if (!SUNOVA_TRANSLATIONS[lang]) lang = 'en';
    localStorage.setItem('sunova_lang', lang);
    document.documentElement.lang = lang;
    
    // Apply body class for language specific font smoothing
    if (lang === 'ml') {
        document.body.classList.add('lang-ml');
    } else {
        document.body.classList.remove('lang-ml');
    }

    // Update active state on language switcher buttons
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
        const isMl = lang === 'ml';
        btn.setAttribute('aria-label', isMl ? 'Switch to English' : 'മലയാളത്തിലേക്ക് മാറ്റുക');
        const textSpan = btn.querySelector('.lang-btn-text');
        if (textSpan) {
            textSpan.innerHTML = isMl 
                ? '<span style="color:var(--color-sun-yellow);font-weight:700;">മലയാളം</span> | EN'
                : 'EN | <span style="opacity:0.75;">മലയാളം</span>';
        }
    });

    // Translate all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (SUNOVA_TRANSLATIONS[lang] && SUNOVA_TRANSLATIONS[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = SUNOVA_TRANSLATIONS[lang][key];
            } else {
                el.innerHTML = SUNOVA_TRANSLATIONS[lang][key];
            }
        }
    });

    // Update dynamic typing phrases for hero if present
    if (window.heroTypingPhrases) {
        if (lang === 'ml') {
            window.heroTypingPhrases = [
                SUNOVA_TRANSLATIONS.ml.hero_typing_1,
                SUNOVA_TRANSLATIONS.ml.hero_typing_2,
                SUNOVA_TRANSLATIONS.ml.hero_typing_3
            ];
        } else {
            window.heroTypingPhrases = [
                SUNOVA_TRANSLATIONS.en.hero_typing_1,
                SUNOVA_TRANSLATIONS.en.hero_typing_2,
                SUNOVA_TRANSLATIONS.en.hero_typing_3
            ];
        }
    }

    // Dispatch event so custom interactive widgets can react
    window.dispatchEvent(new CustomEvent('sunova_lang_change', { detail: { lang: lang } }));
}

/**
 * Toggle between English and Malayalam
 */
function toggleSunovaLanguage() {
    const current = localStorage.getItem('sunova_lang') || 'en';
    const next = current === 'en' ? 'ml' : 'en';
    setSunovaLanguage(next);
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('sunova_lang') || 'en';
    setSunovaLanguage(savedLang);
});
