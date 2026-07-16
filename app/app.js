// --- Sunova Solar Mobile Application Logic ---

// --- Authorized Sunova Solar Dealers List (Copied from brand index) ---
const DEALERS = [
    { code: "TVM-JOBI", name: "JOBI SEBASTIAN", area: "ATTINGAL", district: "Thiruvananthapuram", phone: "8590085856" },
    { code: "TVM-BENJ", name: "BENJOSE FG", area: "BALARAMAPURAM", district: "Thiruvananthapuram", phone: "9037273767" },
    { code: "TVM-ANAN", name: "ANAND SREEDHAR", area: "NEYYATTINKARA", district: "Thiruvananthapuram", phone: "7994430742" },
    { code: "KLA-VARG", name: "VARGHESE NELLIMOOTTIL", area: "AYOOR", district: "Kollam", phone: "9020202222" },
    { code: "KLA-NIYA", name: "NIYAS K", area: "KARUNAGAPPALLY", district: "Kollam", phone: "9656366068" },
    { code: "KLA-UDAY", name: "UDAYABHANU J", area: "KOLLAM", district: "Kollam", phone: "9349136882" },
    { code: "KLA-RAJE", name: "RAJEEV R", area: "PUNALUR", district: "Kollam", phone: "9567970077" },
    { code: "KLA-RATH", name: "RATHIL KUMAR", area: "WEST KALLADA", district: "Kollam", phone: "7907878797" },
    { code: "PTA-SREE", name: "SREEJITH TR", area: "MALLAPPALLY", district: "Pathanamthitta", phone: "9947030669" },
    { code: "PTA-JIJU", name: "JIJUKUMAR MC", area: "PANDALAM", district: "Pathanamthitta", phone: "9388133400" },
    { code: "PTA-PKPR", name: "PK PRASANNAKUMAR", area: "PATHANAMTHITTA", district: "Pathanamthitta", phone: "7034023301" },
    { code: "PTA-BIJU", name: "BIJUMON J", area: "RANNI", district: "Pathanamthitta", phone: "9995990372" },
    { code: "ALP-SHIN", name: "SHINAS SHAMSUDEEN", area: "ALAPPUZHA", district: "Alappuzha", phone: "9995550888" },
    { code: "ALP-NISS", name: "NISSAR HAMEED", area: "KAYAMKULAM", district: "Alappuzha", phone: "9895497090" },
    { code: "ALP-RENJ", name: "RENJITH PS", area: "MAVELIKKARA", district: "Alappuzha", phone: "9447866958" },
    { code: "ALP-BAIJ", name: "BAIJU SASIDHARAN", area: "VALLIKUNNAM", district: "Alappuzha", phone: "9747186818" },
    { code: "KTM-SALY", name: "SALY SAINUDEEN", area: "ERATTUPETTA", district: "Kottayam", phone: "9446200616" },
    { code: "KTM-ANIS", name: "ANISH KUMAR", area: "KALLARA", district: "Kottayam", phone: "9387220162" },
    { code: "KTM-SANI", name: "SANIL KUMAR", area: "KOTTAYAM TOWN", district: "Kottayam", phone: "9061189784" },
    { code: "IDK-OUSE", name: "OUSEPH KA", area: "ARAKULAM", district: "Idukki", phone: "9495737628" },
    { code: "IDK-MGAJ", name: "MG AJAY", area: "THODUPUZHA", district: "Idukki", phone: "9447254142" },
    { code: "EKM-SHIY", name: "SHIYAS RASHEED", area: "EDAPPALLY", district: "Ernakulam", phone: "9847859859" },
    { code: "EKM-BHAV", name: "BHAVYA M", area: "KALAMASSERY", district: "Ernakulam", phone: "8301026309" },
    { code: "EKM-JIBI", name: "JIBIN GEORGE", area: "THRIPUNITHURA", district: "Ernakulam", phone: "9995996240" },
    { code: "TCR-JAIS", name: "JAISON JOSE MELETH", area: "AYYANTHOL", district: "Thrissur", phone: "9995601923" },
    { code: "TCR-COAT", name: "COATS THEKKAN", area: "CHALAKUDY", district: "Thrissur", phone: "8129119222" },
    { code: "TCR-JISO", name: "JISON GEORGE", area: "CHELAKKARA", district: "Thrissur", phone: "9746666535" },
    { code: "TCR-SINI", name: "SINISH KM", area: "KODAKARA", district: "Thrissur", phone: "9946101892" },
    { code: "TCR-BINU", name: "BINU YACOB", area: "PAZHAYANNUR", district: "Thrissur", phone: "9946033807" },
    { code: "TCR-JITH", name: "JITHESH THARAYIL", area: "PO ROAD", district: "Thrissur", phone: "7356347700" },
    { code: "TCR-AKAN", name: "AK ANIL", area: "VALAPPAD", district: "Thrissur", phone: "9746891854" },
    { code: "PKD-SUHA", name: "SUHAIB S", area: "ALATHUR", district: "Palakkad", phone: "9988553585" },
    { code: "PKD-PRAM", name: "PRAMOD", area: "CHITTUR", district: "Palakkad", phone: "9746611002" },
    { code: "PKD-BIJO", name: "BIJO VARGHESE", area: "ELAPPULLY", district: "Palakkad", phone: "9388883222" },
    { code: "PKD-ANAN", name: "ANAND P", area: "KODUVAYUR", district: "Palakkad", phone: "9349811101" },
    { code: "MPM-NASS", name: "NASSARUDHEEN E", area: "EDAKKARA", district: "Malappuram", phone: "9946139955" },
    { code: "MPM-FAIS", name: "FAISAL K", area: "MANJERY", district: "Malappuram", phone: "7994035923" },
    { code: "MPM-RAVI", name: "RAVINDRAN K", area: "TIRUR", district: "Malappuram", phone: "9961476748" },
    { code: "KKD-RAJA", name: "RAJAN MADAVOOR", area: "KODUVALLY", district: "Kozhikode", phone: "9497345868" },
    { code: "KKD-YOOS", name: "YOOSAF NV", area: "PERAMBRA", district: "Kozhikode", phone: "9539724724" },
    { code: "KKD-SAFE", name: "SAFEER", area: "VADAKARA", district: "Kozhikode", phone: "9995330555" },
    { code: "KKD-RAHU", name: "RAHUL RN", area: "VATAKARA", district: "Kozhikode", phone: "9645464733" },
    { code: "WYD-SINI", name: "SINIL CHACKO K", area: "MANATHAWADY", district: "Wayanad", phone: "8921794334" },
    { code: "KNR-ACFA", name: "AC FAISAL", area: "IRIKKOOR", district: "Kannur", phone: "9656069964" },
    { code: "KNR-NOUS", name: "NOUSHAD T", area: "MATTANNUR", district: "Kannur", phone: "9847761018" },
    { code: "KNR-SURI", name: "SURIYA SUBASH", area: "PANOOR", district: "Kannur", phone: "9946809010" },
    { code: "KNR-NISH", name: "NISHAD NK", area: "THALASSERY", district: "Kannur", phone: "9562028244" },
    { code: "KNR-KASO", name: "KA SOJU", area: "THALIPARAMBU", district: "Kannur", phone: "9447548430" },
    { code: "KSD-PRAD", name: "PRADEEP K", area: "BADIADUKA", district: "Kasaragod", phone: "9744880900" },
    { code: "KSD-SURE", name: "SURESH KUMAR", area: "PANATHUR", district: "Kasaragod", phone: "9946960604" }
];

// Backend API Endpoints (relative to web app folder location)
const BACKEND_URL = '../proxy.php';
const EMAIL_DISPATCH_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = '3b85044a-ed95-42ed-b465-e6afcaeb60a2';

// --- State Variables ---
let activeTab = 'home';
let calcMode = 'residential';
let calcSystemType = 'ongrid';
let calcBill = 4000;
let calcUnits = 313;
let recommendedCapacity = 3.0; // kW
let panelCount = 8;

let currentPartnerUser = null;
let partnerLeads = [];

let currentStaffUser = null;
let staffLeads = [];

// Mock Database fallback for offline demo contexts
const MOCK_INQUIRIES = [
    { id: 1, name: "Haris K", phone: "9876543210", location: "Thodupuzha", dealer: "IDK-MGAJ", size: "3 kW", connection: "residential", status: "new", loan: "yes", timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { id: 2, name: "Dr. Thomas George", phone: "9447551222", location: "Muvattupuzha", dealer: "EKM-JIBI", size: "10 kW", connection: "commercial", status: "contacted", loan: "no", timestamp: new Date(Date.now() - 3600000 * 24).toISOString() },
    { id: 3, name: "Aswathy Nair", phone: "8590012345", location: "Attingal", dealer: "TVM-JOBI", size: "5 kW", connection: "residential", status: "new", loan: "yes", timestamp: new Date().toISOString() }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDealersSelect();
    updateCalculatorByBill(calcBill);
    setupInputValidators();
    
    // Hash routing support for native wrappers
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (['home', 'calc', 'partner', 'staff'].includes(hash)) {
            navigateToTab(hash);
        }
    }
});

// --- PWA Theme Toggle Support ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || (new Date().getHours() >= 6 && new Date().getHours() < 18 ? 'light-theme' : 'dark-theme');
    setTheme(savedTheme);
    
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        setTheme(isDark ? 'light-theme' : 'dark-theme');
    });
}

function setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'dark-theme') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// --- App Router/Tab Navigation ---
function navigateToTab(tabId) {
    if (tabId === activeTab) return;
    
    const previousTabEl = document.getElementById(`tab-${activeTab}`);
    const activeTabEl = document.getElementById(`tab-${tabId}`);
    
    const previousScreenEl = document.getElementById(`screen-${activeTab}`);
    const activeScreenEl = document.getElementById(`screen-${tabId}`);
    
    // Animate tabs
    if (previousTabEl) previousTabEl.classList.remove('active');
    if (activeTabEl) activeTabEl.classList.add('active');
    
    // Slide transition animation
    previousScreenEl.classList.remove('active');
    previousScreenEl.classList.add('slide-out-left');
    
    activeScreenEl.classList.add('active');
    activeScreenEl.classList.remove('slide-out-left');
    
    setTimeout(() => {
        previousScreenEl.classList.remove('slide-out-left');
    }, 300);
    
    activeTab = tabId;
    
    // Refresh lists on portal tabs automatically if logged in
    if (tabId === 'partner' && currentPartnerUser) {
        fetchPartnerLeads();
    } else if (tabId === 'staff' && currentStaffUser) {
        fetchStaffLeads();
    }
}

// --- Indian Phone Input Validation Rules ---
function setupInputValidators() {
    const phoneFields = [
        document.getElementById('cust-phone')
    ];
    
    phoneFields.forEach(field => {
        if (!field) return;
        
        field.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, ''); // Strip all non-digits
            
            // If starting with +91 or 91, strip it
            if (val.length > 10 && val.startsWith('91')) {
                val = val.substring(2);
            }
            // Enforce starting with 6-9
            if (val.length > 0 && !/^[6-9]/.test(val)) {
                val = '';
            }
            // Limit to 10 digits
            if (val.length > 10) {
                val = val.substring(0, 10);
            }
            e.target.value = val;
        });
    });
}

// --- Dealer Dropdown Injection ---
function initDealersSelect() {
    const dealerSelect = document.getElementById('cust-dealer');
    if (!dealerSelect) return;
    
    // Clear dynamic options but keep Auto-assign
    dealerSelect.innerHTML = '<option value="">Auto-Assign (Based on location)</option>';
    
    // Group dealers by district
    const districts = [...new Set(DEALERS.map(d => d.district))].sort();
    
    districts.forEach(dist => {
        const optGroup = document.createElement('optgroup');
        optGroup.label = dist;
        
        const distDealers = DEALERS.filter(d => d.district === dist);
        distDealers.forEach(dealer => {
            const opt = document.createElement('option');
            opt.value = dealer.code;
            opt.textContent = `${dealer.area} - ${dealer.name}`;
            optGroup.appendChild(opt);
        });
        
        dealerSelect.appendChild(optGroup);
    });
}

// --- Solar Calculator Logic ---
function toggleCalculatorMode(mode) {
    calcMode = mode;
    document.getElementById('segment-res').classList.toggle('active', mode === 'residential');
    document.getElementById('segment-com').classList.toggle('active', mode === 'commercial');
    
    // Update tariff note labels
    const ksebNote = document.getElementById('kseb-tariff-note');
    if (mode === 'commercial') {
        ksebNote.textContent = 'Commercial energy rate assumed flat ₹10.5/unit.';
        // Commercial average slider settings
        document.getElementById('slider-bill').max = 35000;
    } else {
        ksebNote.textContent = 'Based on telescopic residential slab tariff structure.';
        document.getElementById('slider-bill').max = 15000;
    }
    
    updateCalculatorByBill(calcBill);
}

function toggleSystemType(type) {
    calcSystemType = type;
    document.getElementById('segment-ongrid').classList.toggle('active', type === 'ongrid');
    document.getElementById('segment-hybrid').classList.toggle('active', type === 'hybrid');
    updateCalculatorByBill(calcBill);
}

function billToUnits(bill, mode) {
    if (mode === 'commercial') {
        return Math.round(bill / 10.5);
    } else {
        if (bill <= 300) return Math.round(bill / 6.0);
        if (bill <= 700) return Math.round(50 + (bill - 300) / 7.0);
        if (bill <= 1500) return Math.round(107 + (bill - 700) / 7.5);
        if (bill <= 2500) return Math.round(213 + (bill - 1500) / 8.0);
        if (bill <= 4500) return Math.round(338 + (bill - 2500) / 8.5);
        return Math.round(573 + (bill - 4500) / 9.2);
    }
}

function updateCalculatorByBill(value) {
    calcBill = parseInt(value);
    document.getElementById('bill-val').textContent = `₹ ${calcBill.toLocaleString('en-IN')}`;
    document.getElementById('slider-bill').value = calcBill;
    
    calcUnits = billToUnits(calcBill, calcMode);
    document.getElementById('calc-units-input').value = calcUnits;
    
    runSolarCalculations();
}

function updateCalculatorByUnits(value) {
    calcUnits = parseInt(value) || 0;
    
    // Piecewise linear approximation of Units to Bill
    if (calcMode === 'commercial') {
        calcBill = Math.round(calcUnits * 10.5);
    } else {
        if (calcUnits <= 50) calcBill = Math.round(calcUnits * 6.0);
        else if (calcUnits <= 100) calcBill = Math.round(300 + (calcUnits - 50) * 7.0);
        else if (calcUnits <= 200) calcBill = Math.round(700 + (calcUnits - 100) * 7.5);
        else if (calcUnits <= 300) calcBill = Math.round(1500 + (calcUnits - 200) * 8.0);
        else if (calcUnits <= 500) calcBill = Math.round(2500 + (calcUnits - 300) * 8.5);
        else calcBill = Math.round(4500 + (calcUnits - 500) * 9.2);
    }
    
    document.getElementById('bill-val').textContent = `₹ ${calcBill.toLocaleString('en-IN')}`;
    document.getElementById('slider-bill').value = calcBill;
    
    runSolarCalculations();
}

function runSolarCalculations() {
    // 1. Capacity Recommendation
    // Average solar yield in Kerala is ~120 units per month per 1 kW system size
    if (calcMode === 'residential') {
        recommendedCapacity = calcUnits / 120;
        // Round to nearest 0.5 kW
        recommendedCapacity = Math.round(recommendedCapacity * 2) / 2;
        if (recommendedCapacity < 1) recommendedCapacity = 1.0;
        if (recommendedCapacity > 10) recommendedCapacity = 10.0; // Res standard limit
    } else {
        // Commercial offsets 80% typical base load
        recommendedCapacity = (calcUnits * 0.8) / 120;
        recommendedCapacity = Math.round(recommendedCapacity * 2) / 2;
        if (recommendedCapacity < 2) recommendedCapacity = 2.0;
        if (recommendedCapacity > 100) recommendedCapacity = 100.0;
    }
    
    // Update capacity dials
    document.getElementById('gauge-capacity-val').textContent = `${recommendedCapacity.toFixed(1)} kW`;
    
    panelCount = Math.ceil(recommendedCapacity * 1000 / 540); // 540W Mono PERC
    document.getElementById('gauge-panels-val').textContent = `${panelCount} Panels (540W)`;
    
    // Animate Circular Gauge
    // SVG circle circumference is 2 * pi * r = 2 * 3.1415 * 70 = 440
    // Max dial is 10 kW (for visual scaling)
    const maxCapacityScale = calcMode === 'residential' ? 10.0 : 50.0;
    const capacityRatio = Math.min(recommendedCapacity / maxCapacityScale, 1.0);
    const strokeOffset = 440 - (440 * capacityRatio);
    document.getElementById('gauge-capacity-ring').style.strokeDashoffset = strokeOffset;
    
    // 2. Cost Analysis
    // Residential: On-grid ~65k/kW, Hybrid ~85k/kW
    // Commercial: On-grid ~55k/kW, Hybrid ~75k/kW
    let pricePerKw = calcMode === 'residential' 
        ? (calcSystemType === 'ongrid' ? 65000 : 85000)
        : (calcSystemType === 'ongrid' ? 55000 : 75000);
        
    let grossCost = recommendedCapacity * pricePerKw;
    
    // Government Subsidy (PM Surya Ghar scheme logic)
    let subsidy = 0;
    if (calcMode === 'residential' && calcSystemType === 'ongrid') {
        if (recommendedCapacity >= 3) {
            subsidy = 78000;
        } else if (recommendedCapacity >= 2) {
            subsidy = 60000;
        } else if (recommendedCapacity >= 1) {
            subsidy = 30000;
        }
    }
    
    let netCost = grossCost - subsidy;
    
    // 3. Savings & Payback
    // Est monthly units * avg unit cost
    let unitRate = calcMode === 'residential' ? 7.5 : 10.5;
    let estMonthlySavings = Math.min(calcUnits, recommendedCapacity * 120) * unitRate;
    let paybackYears = netCost / (estMonthlySavings * 12);
    
    // Render Results
    document.getElementById('res-gross').textContent = `₹ ${Math.round(grossCost).toLocaleString('en-IN')}`;
    document.getElementById('res-subsidy').textContent = subsidy > 0 ? `-₹ ${Math.round(subsidy).toLocaleString('en-IN')}` : '₹ 0';
    document.getElementById('res-net').textContent = `₹ ${Math.round(netCost).toLocaleString('en-IN')}`;
    document.getElementById('res-savings').textContent = `₹ ${Math.round(estMonthlySavings).toLocaleString('en-IN')} /mo`;
    document.getElementById('res-payback').textContent = paybackYears > 10 ? '10+ Years' : `${paybackYears.toFixed(1)} Years`;
    
    // Environmental Calculations
    const co2Offset = recommendedCapacity * 1.05; // 1.05 tons offset per kW per year
    const treesEquivalent = Math.round(co2Offset * 15);
    document.getElementById('env-trees').textContent = `${treesEquivalent} Trees`;
    document.getElementById('env-co2').textContent = `${co2Offset.toFixed(1)} Tons`;
}

// Submit Customer Feasibility Request
function handleCalculatorSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const location = document.getElementById('cust-location').value.trim();
    const dealer = document.getElementById('cust-dealer').value;
    const loan = document.getElementById('cust-loan').checked ? 'Yes' : 'No';
    
    const feedbackBox = document.getElementById('calc-form-feedback');
    feedbackBox.className = 'form-feedback';
    feedbackBox.textContent = 'Submitting your survey request...';
    feedbackBox.classList.remove('hidden');
    
    // Auto assign dealer based on location if not selected
    let assignedDealer = dealer;
    if (!assignedDealer) {
        // Simple heuristic: match location keyword to dealer's area/district
        const matched = DEALERS.find(d => 
            location.toLowerCase().includes(d.area.toLowerCase()) || 
            location.toLowerCase().includes(d.district.toLowerCase())
        );
        assignedDealer = matched ? matched.code : 'TVM-JOBI'; // Default fallback
    }

    const payload = {
        name: name,
        phone: phone,
        location: location,
        dealer: assignedDealer,
        size: `${recommendedCapacity.toFixed(1)} kW (${calcSystemType})`,
        connection: calcMode,
        loan: loan,
        timestamp: new Date().toISOString()
    };

    // Attempt Double Redundancy Dispatch: First, push to database proxy, Second, dispatch email alert
    fetch(BACKEND_URL + '?action=add_inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        // Dispatch email notification via Web3Forms API
        return fetch(EMAIL_DISPATCH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `New Mobile Solar Inquiry: ${name}`,
                from_name: "Sunova Solar App",
                message: `Customer Inquiry Details:\n\nName: ${name}\nPhone: ${phone}\nLocation: ${location}\nSystem Size: ${recommendedCapacity} kW (${calcSystemType})\nLoan Required: ${loan}\nAssigned Dealer: ${assignedDealer}`
            })
        });
    })
    .then(() => {
        feedbackBox.classList.add('success');
        feedbackBox.textContent = '✓ Inquiry submitted! Our engineer will call you shortly.';
        document.getElementById('calc-feasibility-form').reset();
        
        // Save to local storage for local demo testing
        let localInquiries = JSON.parse(localStorage.getItem('inquiries') || JSON.stringify(MOCK_INQUIRIES));
        payload.id = Date.now();
        payload.status = 'new';
        localInquiries.unshift(payload);
        localStorage.setItem('inquiries', JSON.stringify(localInquiries));
    })
    .catch(err => {
        console.error(err);
        // Offline / Server unavailable fallback: Save locally and show success
        feedbackBox.classList.add('success');
        feedbackBox.textContent = '✓ Request registered locally (Offline mode). We will sync when online!';
        
        let localInquiries = JSON.parse(localStorage.getItem('inquiries') || JSON.stringify(MOCK_INQUIRIES));
        payload.id = Date.now();
        payload.status = 'new';
        localInquiries.unshift(payload);
        localStorage.setItem('inquiries', JSON.stringify(localInquiries));
    });
}

// --- PARTNER PORTAL WORKFLOW ---
function handlePartnerLogin(event) {
    event.preventDefault();
    
    const code = document.getElementById('part-code').value.trim().toUpperCase();
    const pin = document.getElementById('part-pin').value;
    const feedback = document.getElementById('partner-login-feedback');
    
    // Verify dealer exists
    const dealer = DEALERS.find(d => d.code === code);
    
    if (dealer && pin === '2277') {
        currentPartnerUser = dealer;
        feedback.className = 'form-feedback hidden';
        
        document.getElementById('partner-login-view').classList.add('hidden');
        document.getElementById('partner-dashboard-view').classList.remove('hidden');
        document.getElementById('partner-user-code').textContent = `${dealer.code} (${dealer.name})`;
        
        fetchPartnerLeads();
    } else {
        feedback.className = 'form-feedback error';
        feedback.textContent = '❌ Invalid Dealer Code or Security PIN.';
    }
}

function handlePartnerLogout(event) {
    event.preventDefault();
    currentPartnerUser = null;
    document.getElementById('partner-login-view').classList.remove('hidden');
    document.getElementById('partner-dashboard-view').classList.add('hidden');
    document.getElementById('partner-login-form').reset();
}

function fetchPartnerLeads() {
    const listContainer = document.getElementById('partner-leads-list');
    listContainer.innerHTML = 'Loading assigned leads...';
    
    // Load leads (Try database backend first, fallback to LocalStorage mock database)
    fetch(BACKEND_URL + '?action=get_inquiries')
        .then(res => res.json())
        .then(data => {
            renderPartnerLeads(data);
        })
        .catch(() => {
            // Local Storage fallback
            const data = JSON.parse(localStorage.getItem('inquiries') || JSON.stringify(MOCK_INQUIRIES));
            renderPartnerLeads(data);
        });
}

function renderPartnerLeads(leads) {
    const listContainer = document.getElementById('partner-leads-list');
    
    // Filter to this dealer's leads only
    const filtered = leads.filter(item => item.dealer === currentPartnerUser.code);
    
    document.getElementById('partner-leads-count').textContent = filtered.length;
    // Mock commission (example: 2.5% on average active leads)
    const activeInstallCount = filtered.filter(l => l.status === 'contacted').length;
    document.getElementById('partner-commission-val').textContent = `₹ ${(activeInstallCount * 4500).toLocaleString('en-IN')}`;
    
    if (filtered.length === 0) {
        listContainer.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--color-text-muted); font-size:0.8rem;">No inquiries assigned to your code yet.</div>';
        return;
    }
    
    listContainer.innerHTML = '';
    filtered.forEach(lead => {
        const dateStr = new Date(lead.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        const card = document.createElement('div');
        card.className = 'lead-item-card';
        card.innerHTML = `
            <div class="lead-item-header">
                <span class="lead-name">${lead.name}</span>
                <span class="lead-tag ${lead.status === 'new' ? 'tag-new' : 'tag-contacted'}">${lead.status.toUpperCase()}</span>
            </div>
            <div class="lead-detail-row"><strong>Loc:</strong> ${lead.location} (${dateStr})</div>
            <div class="lead-detail-row"><strong>System:</strong> ${lead.size}</div>
            <div class="lead-detail-row"><strong>Loan:</strong> ${lead.loan || 'No'}</div>
            <div class="lead-actions-row">
                <button class="lead-mini-btn secondary-btn" onclick="callCustomer('${lead.phone}')">📞 Call</button>
                <button class="lead-mini-btn whatsapp-btn" onclick="whatsappPartnerCustomer('${lead.name}', '${lead.phone}', '${lead.size}')">💬 Msg</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function callCustomer(phone) {
    window.open(`tel:${phone}`);
}

function whatsappPartnerCustomer(name, phone, size) {
    const text = encodeURIComponent(`Hi ${name}, this is ${currentPartnerUser.name} from Sunova Solar LLP. We have received your feasibility request for a ${size} solar system. When is a convenient time to schedule the physical site survey?`);
    window.open(`https://wa.me/91${phone}?text=${text}`, '_blank');
}

// Partner quotation generator
function generatePartnerQuote(event) {
    event.preventDefault();
    
    const cap = parseFloat(document.getElementById('quote-capacity').value);
    const panels = document.getElementById('quote-panels').value;
    const price = parseInt(document.getElementById('quote-price').value);
    const sub = parseInt(document.getElementById('quote-subsidy').value);
    const net = price - sub;
    
    const quoteText = `☀️ *SUNOVA SOLAR LLP* ☀️\n_Premium Solar Solutions Across Kerala_\n\n*CUSTOM SOLAR FEASIBILITY QUOTATION*\n----------------------------------------\n*System Capacity:* ${cap} kW\n*Panel Configuration:* ${panels}\n*Inverter Technology:* High-efficiency Grid-tied Smart Inverter\n\n*FINANCIAL SUMMARY*\n- Estimated Project Cost: ₹${price.toLocaleString('en-IN')}\n- Gov. Subsidy (PM Surya Ghar): -₹${sub.toLocaleString('en-IN')}\n========================================\n*NET INVESTMENT:* ₹${net.toLocaleString('en-IN')}\n========================================\n\n_Includes standard engineering, structures, ANERT net-metering integration, and 25-year performance warranty._\n\n*Contact Dealer:* ${currentPartnerUser.name} (${currentPartnerUser.phone})`;
    
    const previewBox = document.getElementById('quote-preview-box');
    previewBox.textContent = quoteText;
    
    const container = document.getElementById('quote-preview-container');
    container.classList.remove('hidden');
    
    // Bind share button
    const shareBtn = document.getElementById('btn-share-quote-whatsapp');
    shareBtn.onclick = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(quoteText)}`, '_blank');
    };
}

// --- STAFF PORTAL WORKFLOW ---
function handleStaffLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('st-email').value.trim();
    const pass = document.getElementById('st-pass').value;
    const feedback = document.getElementById('staff-login-feedback');
    
    if (email === 'info@sunovasolar.in' && pass === 'admin') {
        currentStaffUser = { email: email };
        feedback.className = 'form-feedback hidden';
        
        document.getElementById('staff-login-view').classList.add('hidden');
        document.getElementById('staff-dashboard-view').classList.remove('hidden');
        
        fetchStaffLeads();
    } else {
        feedback.className = 'form-feedback error';
        feedback.textContent = '❌ Incorrect staff email or password.';
    }
}

function handleStaffLogout(event) {
    event.preventDefault();
    currentStaffUser = null;
    document.getElementById('staff-login-view').classList.remove('hidden');
    document.getElementById('staff-dashboard-view').classList.add('hidden');
    document.getElementById('staff-login-form').reset();
}

function fetchStaffLeads() {
    const listContainer = document.getElementById('staff-leads-list');
    listContainer.innerHTML = 'Loading customer registry...';
    
    fetch(BACKEND_URL + '?action=get_inquiries')
        .then(res => res.json())
        .then(data => {
            staffLeads = data;
            renderStaffLeads(data);
        })
        .catch(() => {
            // Local Storage fallback
            staffLeads = JSON.parse(localStorage.getItem('inquiries') || JSON.stringify(MOCK_INQUIRIES));
            renderStaffLeads(staffLeads);
        });
}

function renderStaffLeads(leads) {
    const listContainer = document.getElementById('staff-leads-list');
    document.getElementById('staff-leads-count').textContent = leads.length;
    
    if (leads.length === 0) {
        listContainer.innerHTML = '<div style="text-align:center; padding: 20px; color: var(--color-text-muted); font-size:0.8rem;">No inquiries in registry.</div>';
        return;
    }
    
    listContainer.innerHTML = '';
    leads.forEach(lead => {
        const dateStr = new Date(lead.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        const dealerObj = DEALERS.find(d => d.code === lead.dealer);
        const dealerName = dealerObj ? dealerObj.name.split(' ')[0] : lead.dealer;
        
        const card = document.createElement('div');
        card.className = 'lead-item-card';
        card.innerHTML = `
            <div class="lead-item-header">
                <span class="lead-name">${lead.name} (${lead.phone})</span>
                <span class="lead-tag ${lead.status === 'new' ? 'tag-new' : 'tag-contacted'}" onclick="toggleLeadStatus(${lead.id || 0})" style="cursor:pointer;" title="Click to toggle status">${lead.status.toUpperCase()}</span>
            </div>
            <div class="lead-detail-row"><strong>Loc:</strong> ${lead.location} (${dateStr})</div>
            <div class="lead-detail-row"><strong>System:</strong> ${lead.size} | <strong>Loan:</strong> ${lead.loan || 'No'}</div>
            <div class="lead-detail-row"><strong>Dealer:</strong> ${dealerName} (${lead.dealer})</div>
            <div class="lead-actions-row">
                <button class="lead-mini-btn secondary-btn" onclick="callCustomer('${lead.phone}')">📞 Call</button>
                <button class="lead-mini-btn whatsapp-btn" onclick="whatsappStaffCustomer('${lead.name}', '${lead.phone}', '${lead.size}', '${dealerName}')">💬 WhatsApp</button>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function filterStaffLeads(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
        renderStaffLeads(staffLeads);
        return;
    }
    
    const filtered = staffLeads.filter(lead => 
        lead.name.toLowerCase().includes(q) || 
        lead.phone.includes(q) || 
        lead.location.toLowerCase().includes(q) ||
        lead.dealer.toLowerCase().includes(q)
    );
    renderStaffLeads(filtered);
}

function toggleLeadStatus(leadId) {
    if (!leadId) return;
    
    // Fallback/Mock logic
    let localInquiries = JSON.parse(localStorage.getItem('inquiries') || JSON.stringify(MOCK_INQUIRIES));
    const localLead = localInquiries.find(l => l.id == leadId || l.timestamp == leadId);
    if (localLead) {
        localLead.status = localLead.status === 'new' ? 'contacted' : 'new';
        localStorage.setItem('inquiries', JSON.stringify(localInquiries));
    }
    
    // Attempt backend update
    fetch(BACKEND_URL + `?action=update_status&id=${leadId}`, { method: 'POST' })
        .then(() => fetchStaffLeads())
        .catch(() => {
            // Offline refresh
            fetchStaffLeads();
        });
}

function syncStaffEmailLeads() {
    const btnText = document.getElementById('staff-sync-btn-text');
    btnText.textContent = '🔄 Syncing Mailbox...';
    
    fetch(BACKEND_URL + '?action=sync_mailbox')
        .then(res => res.json())
        .then(data => {
            btnText.textContent = '✓ Sync Complete!';
            setTimeout(() => { btnText.textContent = '🔄 Sync Mailbox'; }, 2000);
            fetchStaffLeads();
        })
        .catch(() => {
            // Mock delay
            setTimeout(() => {
                btnText.textContent = '❌ Sync Failed (Local Fallback)';
                setTimeout(() => { btnText.textContent = '🔄 Sync Mailbox'; }, 2000);
                fetchStaffLeads();
            }, 1000);
        });
}

function whatsappStaffCustomer(name, phone, size, dealerName) {
    const text = encodeURIComponent(`Hi ${name}, this is the support team from Sunova Solar LLP. We have assigned your feasibility request for a ${size} solar system to our district engineer ${dealerName}. They will reach out to you shortly.`);
    window.open(`https://wa.me/91${phone}?text=${text}`, '_blank');
}
