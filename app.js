// --- Application Variables & State ---
let currentMode = 'residential'; // 'residential' or 'commercial'
let currentSystemType = 'ongrid'; // 'ongrid' or 'hybrid'

// Authorized Sunova Solar Dealers List
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

// --- DOM elements ---
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Calculator DOM elements
const billInput = document.getElementById('input-bill');
const billManualInput = document.getElementById('input-bill-manual');
const unitsInput = document.getElementById('input-units');
const unitsDisplay = document.getElementById('units-val-display');
const ksebNote = document.getElementById('calc-kseb-note');

const outSize = document.getElementById('out-size');
const outPanels = document.getElementById('out-panels');
const outArea = document.getElementById('out-area');
const outGeneration = document.getElementById('out-generation');
const outCost = document.getElementById('out-cost');
const outSubsidy = document.getElementById('out-subsidy');
const outNetCost = document.getElementById('out-net-cost');
const outSavings = document.getElementById('out-savings');
const outPayback = document.getElementById('out-payback');
const outRoi = document.getElementById('out-roi');
const outCo2 = document.getElementById('out-co2');
const outTrees = document.getElementById('out-trees');
const subsidyContainer = document.getElementById('subsidy-container');

// Contact Form DOM elements
const formConnection = document.getElementById('form-connection');
const formSize = document.getElementById('form-size');
const formDealer = document.getElementById('form-dealer');
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

// --- Theme Toggle (Automatic Time-Based & Manual Override) ---
function getThemeByTime() {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'light-theme' : 'dark-theme';
}

const savedTheme = localStorage.getItem('theme') || getThemeByTime();
body.className = savedTheme;

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    }
});

// --- Mobile Navigation Menu ---
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- Scroll-linked animations using Intersection Observer ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            // Once revealed, no need to track it anymore
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, observerOptions);
const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-up, .scroll-reveal-left, .scroll-reveal-right');

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// --- Active Nav Link highlighting on scroll ---
const sectionObserverOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px' // Trigger when section occupies the middle of viewport
};

const sectionCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

const sectionObserver = new IntersectionObserver(sectionCallback, sectionObserverOptions);
const sections = document.querySelectorAll('section');
sections.forEach(sec => sectionObserver.observe(sec));

// --- Calculator Logic ---

// Custom tariff rates mapping for Kerala
// Piecewise linear approximation for converting Bill (INR) to Consumption (Units/kWh)
function billToUnits(bill, mode) {
    if (mode === 'commercial') {
        // Average commercial tariff including fixed charges is approx. ₹10.5 per unit
        return Math.round(bill / 10.5);
    } else {
        // Residential slab rate approximation (domestic telescopic slab)
        if (bill <= 300) return Math.round(bill / 6.0);
        if (bill <= 700) return Math.round(50 + (bill - 300) / 7.0);
        if (bill <= 1500) return Math.round(107 + (bill - 700) / 7.5);
        if (bill <= 2500) return Math.round(213 + (bill - 1500) / 8.0);
        if (bill <= 4500) return Math.round(338 + (bill - 2500) / 8.5);
        return Math.round(573 + (bill - 4500) / 9.2);
    }
}

// Piecewise linear approximation for converting Consumption (Units/kWh) to Bill (INR)
function unitsToBill(units, mode) {
    if (mode === 'commercial') {
        return Math.round(units * 10.5);
    } else {
        if (units <= 50) return Math.round(units * 6.0);
        if (units <= 107) return Math.round(300 + (units - 50) * 7.0);
        if (units <= 213) return Math.round(700 + (units - 107) * 7.5);
        if (units <= 338) return Math.round(1500 + (units - 213) * 8.0);
        if (units <= 573) return Math.round(2500 + (units - 338) * 8.5);
        return Math.round(4500 + (units - 573) * 9.2);
    }
}

function setCalculatorMode(mode) {
    currentMode = mode;
    
    // Toggle active classes on buttons
    const btnRes = document.getElementById('toggle-res');
    const btnCom = document.getElementById('toggle-com');
    
    if (mode === 'residential') {
        btnRes.classList.add('active');
        btnCom.classList.remove('active');
        ksebNote.textContent = 'Calculated using typical KSEB telescopic domestic tariff rates. Higher consumption levels fall under higher rate slabs.';
        subsidyContainer.classList.remove('hidden');
        formConnection.value = 'residential';
    } else {
        btnCom.classList.add('active');
        btnRes.classList.remove('active');
        ksebNote.textContent = 'Calculated using commercial LT-VIIA rates. Businesses are not eligible for direct PM Surya Ghar subsidy but can avail 40% accelerated depreciation tax benefits.';
        subsidyContainer.classList.add('hidden');
        formConnection.value = 'commercial';
    }
    
    // Recalculate
    updateCalculatorOutputs();
}

function setSystemType(type) {
    currentSystemType = type;
    
    const btnOnGrid = document.getElementById('toggle-ongrid');
    const btnHybrid = document.getElementById('toggle-hybrid');
    const formSystemModel = document.getElementById('form-system-model');
    
    if (type === 'ongrid') {
        if (btnOnGrid) btnOnGrid.classList.add('active');
        if (btnHybrid) btnHybrid.classList.remove('active');
        if (formSystemModel) formSystemModel.value = 'ongrid';
    } else {
        if (btnHybrid) btnHybrid.classList.add('active');
        if (btnOnGrid) btnOnGrid.classList.remove('active');
        if (formSystemModel) formSystemModel.value = 'hybrid';
    }
    
    // Recalculate
    updateCalculatorOutputs();
}

function handleFormSystemModelChange(value) {
    currentSystemType = value;
    
    const btnOnGrid = document.getElementById('toggle-ongrid');
    const btnHybrid = document.getElementById('toggle-hybrid');
    
    if (value === 'ongrid') {
        if (btnOnGrid) btnOnGrid.classList.add('active');
        if (btnHybrid) btnHybrid.classList.remove('active');
    } else {
        if (btnHybrid) btnHybrid.classList.add('active');
        if (btnOnGrid) btnOnGrid.classList.remove('active');
    }
    
    // Recalculate and update the detail textarea greeting message
    updateCalculatorOutputs();
    updateFormMessageDetails();
}

// When page loads, sync values
function updateCalculatorOutputs() {
    const billVal = parseInt(billInput.value);
    billManualInput.value = billVal;
    
    // Calculate units corresponding to this bill
    const calculatedUnits = billToUnits(billVal, currentMode);
    unitsInput.value = calculatedUnits;
    unitsDisplay.textContent = calculatedUnits.toLocaleString('en-IN');
    
    performCalculations(calculatedUnits);
}

// When range slider is updated
function handleBillSliderInput(val) {
    const billVal = parseInt(val);
    billManualInput.value = billVal;
    
    // Calculate units corresponding to this bill
    const calculatedUnits = billToUnits(billVal, currentMode);
    unitsInput.value = calculatedUnits;
    unitsDisplay.textContent = calculatedUnits.toLocaleString('en-IN');
    
    performCalculations(calculatedUnits);
}

// When bill number input is typed directly
function handleBillManualInput(val) {
    let billVal = parseInt(val);
    if (isNaN(billVal) || billVal < 0) {
        billVal = 0;
    }
    
    // Sync slider value
    if (billVal >= parseInt(billInput.min) && billVal <= parseInt(billInput.max)) {
        billInput.value = billVal;
    } else if (billVal < parseInt(billInput.min)) {
        billInput.value = billInput.min;
    } else {
        billInput.value = billInput.max;
    }
    
    // Calculate units corresponding to this bill
    const calculatedUnits = billToUnits(billVal, currentMode);
    unitsInput.value = calculatedUnits;
    unitsDisplay.textContent = calculatedUnits.toLocaleString('en-IN');
    
    performCalculations(calculatedUnits);
}

// When units input is typed directly
function handleUnitInput(val) {
    let units = parseInt(val);
    if (isNaN(units) || units < 10) {
        units = 10;
    }
    
    // Update displays
    unitsDisplay.textContent = units.toLocaleString('en-IN');
    
    // Reverse calculate corresponding bill
    const calculatedBill = unitsToBill(units, currentMode);
    billManualInput.value = calculatedBill;
    
    // Sync slider value
    if (calculatedBill >= parseInt(billInput.min) && calculatedBill <= parseInt(billInput.max)) {
        billInput.value = calculatedBill;
    } else if (calculatedBill < parseInt(billInput.min)) {
        billInput.value = billInput.min;
    } else {
        billInput.value = billInput.max;
    }
    
    performCalculations(units);
}

// Core Math Calculations
function performCalculations(units) {
    // 1. System Sizing
    // Solar yields ~4 units per day per 1 kW. Monthly = 120 units per kW.
    let calculatedCapacity = units / 120;
    
    // Grid sizing guidelines (rounding steps)
    if (currentMode === 'residential') {
        // Round to nearest 0.5 kW
        calculatedCapacity = Math.round(calculatedCapacity * 2) / 2;
        if (calculatedCapacity < 1) calculatedCapacity = 1.0;
        if (calculatedCapacity > 15) calculatedCapacity = 15.0; // Typical res cap
    } else {
        // Round to nearest 1.0 kW
        calculatedCapacity = Math.round(calculatedCapacity);
        if (calculatedCapacity < 1) calculatedCapacity = 1.0;
        if (calculatedCapacity > 100) calculatedCapacity = 100.0; // Com cap
    }
    
    // Hide reset button since it matches the calculated capacity
    const resetBtn = document.getElementById('btn-reset-capacity');
    if (resetBtn) {
        resetBtn.classList.add('hidden');
    }
    
    performCalculationsDirect(calculatedCapacity, units);
}

// When capacity number input is typed directly
function handleCapacityInput(val) {
    let capacity = parseFloat(val);
    if (isNaN(capacity) || capacity < 0.1) {
        capacity = 0.1;
    }
    
    // Show reset button since customer has manually overridden capacity
    const resetBtn = document.getElementById('btn-reset-capacity');
    if (resetBtn) {
        resetBtn.classList.remove('hidden');
    }
    
    // Calculate units corresponding to this capacity (120 units per kW)
    const units = Math.round(capacity * 120);
    
    // Sync other input displays
    unitsInput.value = units;
    unitsDisplay.textContent = units.toLocaleString('en-IN');
    
    // Sync bill
    const calculatedBill = unitsToBill(units, currentMode);
    billManualInput.value = calculatedBill;
    
    if (calculatedBill >= parseInt(billInput.min) && calculatedBill <= parseInt(billInput.max)) {
        billInput.value = calculatedBill;
    } else if (calculatedBill < parseInt(billInput.min)) {
        billInput.value = billInput.min;
    } else {
        billInput.value = billInput.max;
    }
    
    // Run financial calculations directly with this capacity
    performCalculationsDirect(capacity, units);
}

// Reset overridden capacity back to KSEB bill recommendations
function resetCapacityToCalculated() {
    const billVal = parseInt(billInput.value);
    const calculatedUnits = billToUnits(billVal, currentMode);
    
    let calculatedCapacity = calculatedUnits / 120;
    if (currentMode === 'residential') {
        calculatedCapacity = Math.round(calculatedCapacity * 2) / 2;
        if (calculatedCapacity < 1) calculatedCapacity = 1.0;
        if (calculatedCapacity > 15) calculatedCapacity = 15.0;
    } else {
        calculatedCapacity = Math.round(calculatedCapacity);
        if (calculatedCapacity < 1) calculatedCapacity = 1.0;
        if (calculatedCapacity > 100) calculatedCapacity = 100.0;
    }
    
    outSize.value = calculatedCapacity.toFixed(1);
    
    const resetBtn = document.getElementById('btn-reset-capacity');
    if (resetBtn) {
        resetBtn.classList.add('hidden');
    }
    
    performCalculations(calculatedUnits);
}

// Transfer sizing info to form and scroll down smoothly
function scrollToContactForm() {
    transferCalculatorDetails();
    const contactSec = document.getElementById('contact');
    if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
    }
}

// Adjust manual bill value via custom spin buttons
function adjustManualBill(amount) {
    let currentVal = parseInt(billManualInput.value) || 0;
    let newVal = currentVal + amount;
    if (newVal < 500) newVal = 500;
    if (newVal > 100000) newVal = 100000;
    billManualInput.value = newVal;
    handleBillManualInput(newVal);
}

// Adjust manual units value via custom spin buttons
function adjustManualUnits(amount) {
    let currentVal = parseInt(unitsInput.value) || 0;
    let newVal = currentVal + amount;
    if (newVal < 10) newVal = 10;
    if (newVal > 6000) newVal = 6000;
    unitsInput.value = newVal;
    handleUnitInput(newVal);
}

// Adjust manual capacity value via custom spin buttons
function adjustCapacity(amount) {
    let currentVal = parseFloat(outSize.value) || 0;
    let newVal = currentVal + amount;
    if (newVal < 0.5) newVal = 0.5;
    if (newVal > 200) newVal = 200;
    // Format to 1 decimal place
    newVal = Math.round(newVal * 10) / 10;
    outSize.value = newVal.toFixed(1);
    handleCapacityInput(newVal);
}


function performCalculationsDirect(capacity, units, skipSyncForm = false) {
    // 2. Solar Panels needed (assuming high quality 500W monocrystalline panels)
    const panelsCount = Math.round((capacity * 1000) / 500);
    
    // 3. Roof area required (~90 sq ft per kW)
    const areaRequired = Math.round(capacity * 90);
    
    // 4. Generation capacity (120 units per kW monthly)
    const generationPerMonth = Math.round(capacity * 120);
    
    // 5. Total Installation Cost (estimated Indian averages with discount rates)
    let rawCost = 0;
    if (currentMode === 'residential') {
        if (capacity === 1.0) {
            rawCost = 75000;
        } else if (capacity === 2.0) {
            rawCost = 140000;
        } else if (capacity <= 3.0) {
            rawCost = 195000; // ~₹65,000/kW
        } else if (capacity <= 10.0) {
            rawCost = capacity * 60000;
        } else {
            rawCost = capacity * 55000;
        }
    } else {
        // Commercial bulk pricing
        rawCost = capacity * 52000;
    }
    
    // 6. PM Surya Ghar Subsidy
    let subsidy = 0;
    if (currentMode === 'residential') {
        if (capacity === 1.0) {
            subsidy = 30000;
        } else if (capacity === 2.0) {
            subsidy = 60000;
        } else if (capacity >= 3.0) {
            subsidy = 78000; // Capped max subsidy
        }
    }
    
    // 7. Battery Cost (for hybrid system)
    let batteryCost = 0;
    let batterySize = 0;
    if (currentSystemType === 'hybrid') {
        batterySize = Math.round(capacity * 1.5 * 10) / 10;
        if (batterySize < 2.4) batterySize = 2.4; // Minimum battery bank for hybrid system
        batteryCost = Math.round(capacity * 25000);
    }
    const totalInstallationCost = rawCost + batteryCost;
    
    // 8. Net Cost
    const netCost = totalInstallationCost - subsidy;
    
    // 9. Financial Savings
    // Kerala average unit charge: Residential saved ₹8.20/unit, Commercial saved ₹10.80/unit
    const unitValue = currentMode === 'residential' ? 8.20 : 10.80;
    // Cap energy savings to actual generation or consumption (whichever is lower)
    const activeSavingsUnits = Math.min(units, generationPerMonth);
    const annualSavingsVal = Math.round(activeSavingsUnits * unitValue * 12);
    
    // 10. Return on Investment (ROI) & Payback
    const paybackVal = annualSavingsVal > 0 ? (netCost / annualSavingsVal).toFixed(1) : '0';
    const roiVal = netCost > 0 ? ((annualSavingsVal / netCost) * 100).toFixed(1) : '0';
    
    // 11. Environmental Impact
    // 1 kW offsets 1.25 metric tonnes of CO2 per year
    const co2Offset = (capacity * 1.25).toFixed(1);
    const equivalentTrees = Math.round(parseFloat(co2Offset) * 16.6); // 1 tonne = ~16.6 mature trees/yr
    
    // Update Outputs DOM
    outSize.value = capacity.toFixed(1);
    outPanels.textContent = panelsCount;
    outArea.textContent = areaRequired.toLocaleString('en-IN');
    outGeneration.textContent = generationPerMonth.toLocaleString('en-IN');
    outCost.textContent = totalInstallationCost.toLocaleString('en-IN');
    outSubsidy.textContent = subsidy.toLocaleString('en-IN');
    outNetCost.textContent = netCost.toLocaleString('en-IN');
    outSavings.textContent = annualSavingsVal.toLocaleString('en-IN');
    outPayback.textContent = paybackVal;
    outRoi.textContent = roiVal;
    outCo2.textContent = co2Offset;
    outTrees.textContent = equivalentTrees;
    
    // Dynamic battery metric UI updates
    const batteryMetricContainer = document.getElementById('battery-metric-container');
    const outBattery = document.getElementById('out-battery');
    if (currentSystemType === 'hybrid') {
        if (batteryMetricContainer) batteryMetricContainer.style.display = 'flex';
        if (outBattery) outBattery.textContent = batterySize.toFixed(1);
    } else {
        if (batteryMetricContainer) batteryMetricContainer.style.display = 'none';
    }
    
    // Sync size back to contact form requested size field
    if (!skipSyncForm) {
        formSize.value = capacity.toFixed(1);
    }
    updateFormMessageDetails();
}

// Sync calculator choice to contact form select element
formConnection.addEventListener('change', (e) => {
    setCalculatorMode(e.target.value);
});

// Update form message greeting when matched partner changes
formDealer.addEventListener('change', () => {
    updateFormMessageDetails();
});

// Booking Action
function transferCalculatorDetails() {
    const size = parseFloat(outSize.value) || 4.0;
    formSize.value = size.toFixed(1);
    updateFormMessageDetails();
}

// Automatically sync the message textarea details based on form requested size
function updateFormMessageDetails() {
    const formSizeEl = document.getElementById('form-size');
    const msgArea = document.getElementById('form-message');
    if (!formSizeEl || !msgArea) return;
    
    const size = parseFloat(formSizeEl.value) || 4.0;
    const panels = Math.round((size * 1000) / 500);
    const billVal = billManualInput.value || billInput.value || "4000";
    
    // Matched partner details
    const dealerCode = document.getElementById('form-dealer').value;
    const dealer = DEALERS.find(d => d.code === dealerCode);
    const partnerName = dealer ? dealer.name : "Partner";
    
    const systemTypeLabel = currentSystemType === 'hybrid' ? 'Hybrid (Grid + Battery Backup)' : 'On-Grid';
    const batteryDetail = currentSystemType === 'hybrid' ? ` with a recommended battery bank of ${(size * 1.5 < 2.4 ? 2.4 : Math.round(size * 1.5 * 10) / 10).toFixed(1)} kWh` : '';
    
    // Update message text only if it has not been customized or is empty
    if (!msgArea.value || msgArea.value.startsWith("Hi ")) {
        msgArea.value = `Hi ${partnerName}, I am interested in a ${size.toFixed(1)} kW ${systemTypeLabel} solar system containing ${panels} panels${batteryDetail}. My current monthly bill is approximately ₹${billVal}. Please perform a feasibility study for my site.`;
    }
}

// Adjust form size value via custom spin buttons
function adjustFormCapacity(amount) {
    const formSizeEl = document.getElementById('form-size');
    if (!formSizeEl) return;
    let currentVal = parseFloat(formSizeEl.value) || 4.0;
    let newVal = currentVal + amount;
    if (newVal < 0.5) newVal = 0.5;
    if (newVal > 200) newVal = 200;
    newVal = Math.round(newVal * 10) / 10;
    formSizeEl.value = newVal.toFixed(1);
    
    handleFormSizeChange();
}

// Sync form capacity changes back to calculator recommended capacity and stats
function handleFormSizeChange() {
    const formSizeEl = document.getElementById('form-size');
    if (!formSizeEl) return;
    
    let capacity = parseFloat(formSizeEl.value) || 4.0;
    if (capacity < 0.1) capacity = 0.1;
    if (capacity > 200) capacity = 200;
    
    // Update calculator recommended capacity field
    outSize.value = capacity.toFixed(1);
    
    // Show calculator reset/back button since capacity is overridden
    const resetBtn = document.getElementById('btn-reset-capacity');
    if (resetBtn) {
        resetBtn.classList.remove('hidden');
    }
    
    // Sync other calculator inputs (bill, units) and perform financial stats math
    const units = Math.round(capacity * 120);
    unitsInput.value = units;
    unitsDisplay.textContent = units.toLocaleString('en-IN');
    
    const calculatedBill = unitsToBill(units, currentMode);
    billManualInput.value = calculatedBill;
    
    if (calculatedBill >= parseInt(billInput.min) && calculatedBill <= parseInt(billInput.max)) {
        billInput.value = calculatedBill;
    } else if (calculatedBill < parseInt(billInput.min)) {
        billInput.value = billInput.min;
    } else {
        billInput.value = billInput.max;
    }
    
    // Trigger standard direct calculations skipping formSize sync
    performCalculationsDirect(capacity, units, true);
}

// Toggle visibility of the solar bank loan required documents checklist
function toggleLoanDocsInfo(isChecked) {
    const loanDocsBox = document.getElementById('loan-docs-box');
    if (!loanDocsBox) return;
    if (isChecked) {
        loanDocsBox.classList.remove('hidden');
    } else {
        loanDocsBox.classList.add('hidden');
    }
}

// Normalize district spellings for strict comparisons
function getNormalizedDistrict(dist) {
    if (!dist) return "";
    const d = dist.toUpperCase().trim();
    if (d === "THIRUVANANTHAPURAM" || d === "THIRUVANTHAPURAM" || d === "TVM") {
        return "THIRUVANANTHAPURAM";
    }
    return d;
}

// Function to handle district select changes and dynamically populate dealer choices
function handleDistrictChange(districtValue) {
    if (!formDealer) return;
    
    // Clear current options
    formDealer.innerHTML = '';
    
    const normalizedSelected = getNormalizedDistrict(districtValue);
    
    // Filter dealers matching this district
    const matchedDealers = DEALERS.filter(d => {
        const normalizedDealerDist = getNormalizedDistrict(d.district);
        return normalizedDealerDist === normalizedSelected;
    });
    
    if (matchedDealers.length === 0) {
        const opt = document.createElement('option');
        opt.value = "";
        opt.textContent = "No dealers found for this district";
        formDealer.appendChild(opt);
        return;
    }
    
    // Sort dealers alphabetically by Area name (A to Z)
    matchedDealers.sort((a, b) => a.area.localeCompare(b.area));
    
    // Populate select menu with Area/Location showing first
    matchedDealers.forEach((dealer, index) => {
        const opt = document.createElement('option');
        opt.value = dealer.code;
        opt.textContent = `${dealer.area} - ${dealer.name} (Ph: ${dealer.phone})`;
        if (index === 0) {
            opt.selected = true;
        }
        formDealer.appendChild(opt);
    });
    
    updateFormMessageDetails();
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const district = document.getElementById('form-district').value;
    const location = document.getElementById('form-location').value.trim();
    const dealerCode = document.getElementById('form-dealer').value;
    const connection = document.getElementById('form-connection').value;
    const capacity = document.getElementById('form-size').value;
    const systemModelVal = document.getElementById('form-system-model').value;
    const systemModelLabel = systemModelVal === 'hybrid' ? 'Hybrid (With Battery Backup)' : 'On-Grid';
    const loanRequired = document.getElementById('form-loan').checked ? 'Yes' : 'No';
    const message = document.getElementById('form-message').value.trim();
    
    // Validate fields
    if (!district || !location || !dealerCode) {
        showFormFeedback('District, Location, and Dealer fields are mandatory.', 'error');
        return;
    }
    
    // Phone validation (10 digits check)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        showFormFeedback('Please enter a valid 10-digit mobile number.', 'error');
        return;
    }
    
    // Find selected dealer details
    const dealer = DEALERS.find(d => d.code === dealerCode);
    if (!dealer) {
        showFormFeedback('Selected dealer details could not be found.', 'error');
        return;
    }
    
    // Show processing feedback
    showFormFeedback('Processing your site survey request...', 'info');

    // 1. Immediately Save Inquiry locally (shared with partner logins & staff portal)
    const systemDesc = connection === 'residential' ? 'Residential (Home Solar)' : 'Commercial / Business';
    try {
        const inquiries = JSON.parse(localStorage.getItem('sunova_inquiries')) || [];
        const newInquiry = {
            timestamp: new Date().toLocaleString('en-IN'),
            name: name,
            phone: phone,
            email: email || 'Not Provided',
            district: district,
            location: location,
            category: systemDesc,
            model: systemModelLabel,
            capacity: capacity,
            loan: loanRequired,
            message: message || 'None',
            partner: dealer.name,
            partnerCode: dealer.code,
            partnerPhone: dealer.phone
        };
        inquiries.unshift(newInquiry); // Add to top
        localStorage.setItem('sunova_inquiries', JSON.stringify(inquiries));
    } catch (e) {
        console.error('Local storage save failed:', e);
    }

    // 2. Construct WhatsApp messages
    const waMessage = `Hi, I've submitted a Sunova Solar Feasibility & Quote Request.
- Name: ${name}
- Phone: ${phone}
- Email: ${email || 'Not Provided'}
- District: ${district}
- Location: ${location}
- System Category: ${systemDesc}
- System Model: ${systemModelLabel}
- Capacity: ${capacity} kW
- Bank Loan Required: ${loanRequired}
- Site Details: ${message || 'None'}
- Assigned Partner: ${dealer.name}`;

    const partnerPhone = "91" + dealer.phone;
    const waPartnerUrl = `https://wa.me/${partnerPhone}?text=${encodeURIComponent(waMessage)}`;
    
    const officePhone = "919072522277";
    const waOfficeUrl = `https://wa.me/${officePhone}?text=${encodeURIComponent(waMessage)}`;

    // 3. Automated Background Email Copy (Web3Forms API or FormSubmit Fallback)
    // To activate: Go to https://web3forms.com/, enter your email, copy the free Access Key, and paste it below:
    const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

    if (WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
        const emailPayload = {
            access_key: WEB3FORMS_ACCESS_KEY,
            name: name,
            phone: phone,
            email: email || 'Not Provided',
            district: district,
            location: location,
            "System Type": connection,
            "System Technology Model": systemModelLabel,
            "Requested Capacity": capacity + ' kWp',
            "Bank Loan Required": loanRequired,
            "Message / Site Details": message || 'None',
            "Matched Dealer": `${dealer.name} (${dealer.code})`,
            subject: `New Solar Inquiry from ${name} (${location})`
        };

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(emailPayload)
        })
        .then(response => {
            if (response.ok) {
                console.log('[Web3Forms] Background email copy successfully dispatched.');
            } else {
                console.warn('[Web3Forms] Server returned status: ' + response.status);
            }
        })
        .catch(err => {
            console.error('[Web3Forms] Dispatch failed:', err);
        });
    } else {
        // Fallback Route: FormSubmit AJAX API using the pre-verified hash token
        const emailPayload = {
            Name: name,
            Phone: phone,
            Email: email || 'Not Provided',
            District: district,
            Location: location,
            "System Type": connection,
            "System Technology Model": systemModelLabel,
            "Requested Capacity": capacity + ' kWp',
            "Bank Loan Required": loanRequired,
            "Message / Site Details": message || 'None',
            "Matched Dealer": `${dealer.name} (${dealer.code})`,
            _subject: `New Solar Inquiry from ${name} (${location}, ${district}) - Dealer: ${dealer.name}`
        };

        fetch('https://formsubmit.co/ajax/b1ebd95b70dc040e3935087370fc44ab', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(emailPayload)
        })
        .then(response => {
            if (response.ok) {
                console.log('[Submit] Background email copy successfully dispatched.');
            } else {
                console.warn('[Submit] FormSubmit server returned status: ' + response.status);
            }
        })
        .catch(err => {
            console.error('[Submit] FormSubmit dispatch failed:', err);
        });
    }

    // 4. Build success feedback detailing the assigned partner
    const successMessage = `
        <strong>Submission Successful!</strong><br>
        Thank you, ${name}. Your quote request has been registered in our portal. <br><br>
        <strong>Matched Authorized Partner:</strong><br>
        👤 <strong>Partner Name:</strong> ${dealer.name}<br>
        📍 <strong>Service Area:</strong> ${dealer.area} (${dealer.district})<br>
        📞 <strong>Contact Phone:</strong> <a href="tel:+91${dealer.phone}" style="color:var(--color-sun-yellow); font-weight:bold;">+91 ${dealer.phone}</a><br>
        <br>
        <strong>WhatsApp Copies:</strong><br>
        Click below to send a copy of your details on WhatsApp directly:<br>
        <div class="success-wa-buttons">
            <a href="${waPartnerUrl}" target="_blank" class="wa-btn-success partner-wa-btn">💬 Chat with Partner</a>
            <a href="${waOfficeUrl}" target="_blank" class="wa-btn-success office-wa-btn">🏢 Chat with Head Office</a>
        </div>
        <br>
        <em>Automatically opening partner WhatsApp chat in 3 seconds...</em>
    `;
    showFormFeedback(successMessage, 'success');
    
    // 5. Open Partner WhatsApp in 3 seconds
    setTimeout(() => {
        window.open(waPartnerUrl, '_blank');
    }, 3000);

    // 6. Reset form fields
    document.getElementById('form-name').value = '';
    document.getElementById('form-phone').value = '';
    document.getElementById('form-email').value = '';
    document.getElementById('form-location').value = '';
    document.getElementById('form-district').value = 'Alappuzha';
    handleDistrictChange('Alappuzha');
    document.getElementById('form-system-model').value = 'ongrid';
    setSystemType('ongrid');
    document.getElementById('form-loan').checked = false;
    const loanDocsBox = document.getElementById('loan-docs-box');
    if (loanDocsBox) loanDocsBox.classList.add('hidden');
    document.getElementById('form-message').value = '';
}

function showFormFeedback(msg, type) {
    formFeedback.innerHTML = msg;
    formFeedback.className = 'form-feedback'; // reset
    
    if (type === 'success') {
        formFeedback.classList.add('success');
    } else if (type === 'error') {
        formFeedback.classList.add('error');
    } else {
        formFeedback.style.backgroundColor = 'rgba(255, 183, 3, 0.15)';
        formFeedback.style.color = 'var(--color-sun-yellow)';
        formFeedback.style.border = '1px solid rgba(255, 183, 3, 0.3)';
    }
    
    formFeedback.classList.remove('hidden');
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    updateCalculatorOutputs();
    handleDistrictChange('Alappuzha'); // Initialize the dealer dropdown for default district

    // Setup developer secret click trigger on copyright footer to set SMTP password
    const devTrigger = document.getElementById('developer-trigger');
    if (devTrigger) {
        let clickCount = 0;
        devTrigger.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 5) {
                clickCount = 0;
                const pass = prompt("Enter Hostinger SMTP Password for Local Testing:");
                if (pass !== null) {
                    localStorage.setItem('hostinger_smtp_password', pass);
                    alert("Hostinger SMTP Password successfully saved locally! Reloading page...");
                    location.reload();
                }
            }
        });
    }
});
