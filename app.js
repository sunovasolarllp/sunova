// --- Application Variables & State ---
let currentMode = 'residential'; // 'residential' or 'commercial'
let currentSystemType = 'ongrid'; // 'ongrid' or 'hybrid'

// Authorized Sunova Solar Dealers List
const DEALERS = [
    { code: "KNR-JOBI", name: "JOBI SEBASTIAN", area: "KANNUR", district: "Kannur", phone: "8590085856" },
    { code: "TVM-BENJ", name: "BENJOSE FG", area: "BALARAMAPURAM", district: "Thiruvanthapuram", phone: "9037273767" },
    { code: "TVM-ANAN", name: "ANAND SREEDHAR", area: "NEYYATTINKARA", district: "Thiruvanthapuram", phone: "7994430742" },
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
        
        // Auto-switch to manual input for commercial since sizes vary wildly
        const calcSelect = document.getElementById('calc-size-select');
        if (calcSelect && calcSelect.value !== 'custom') {
            calcSelect.value = 'custom';
            if (typeof handleCalcSizeSelectChange === 'function') {
                handleCalcSizeSelectChange('custom');
            }
        }
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
    
    const calcSelect = document.getElementById('calc-size-select');
    if (calcSelect) {
        calcSelect.value = 'auto';
        document.getElementById('calc-size-manual-wrapper').style.display = 'none';
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
// 5. Total Installation Cost (estimated Indian averages with discount rates)
    let rawCost = 0;
    if (currentMode === 'residential') {
        // Linear price: 50,000 per kW + 70,000 base
        rawCost = Math.round(capacity * 50000 + 70000);
    } else {
        // Commercial bulk pricing (unchanged)
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
    
    const outLastBill = document.getElementById('out-last-bill');
    if (outLastBill) {
        const currentBill = parseInt(document.getElementById('input-bill-manual')?.value || '0');
        outLastBill.textContent = currentBill.toLocaleString('en-IN');
    }
    
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
    const nameInput = document.getElementById('form-name');
    // Upper‑case name as user types
    if (nameInput) {
      nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.toUpperCase();
      });
    }
    const locationSelect = document.getElementById('form-location');
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
    
    // Get customer name and selected KSEB section
    const customerName = nameInput ? nameInput.value.trim() : '';
    const selectedSection = locationSelect ? locationSelect.value : '';
    
    // Update message text only if it has not been customized or is empty
    if (!msgArea.value || msgArea.value.startsWith("Hi ")) {
        msgArea.value = `Hi ${partnerName}, my name is ${customerName} from ${selectedSection} KSEB section. I am interested in a ${size.toFixed(1)} kW ${systemTypeLabel} solar system containing ${panels} panels${batteryDetail}. My current monthly bill is approximately ₹${billVal}. Please perform a feasibility study for my site.`;
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
    // Refresh the form message preview to reflect any changes when bank loan checkbox is toggled
    updateFormMessageDetails();
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
    
    // Also populate KSEB Section dropdown based on selected district
    populateKSEBSections(districtValue);
    
    updateFormMessageDetails();
}

// KSEB Section Data (fetched from wss.kseb.in/selfservices API)
const KSEB_SECTIONS = {
    "Thiruvananthapuram": {"Amboori":4656,"Aryanad":4652,"Attingal":4531,"Avanavancherry":4532,"Balaramapuram":4542,"Beach Trivandrum":4513,"Cantonment TVM":4506,"Chirayinkeezhu":4529,"Chullimanoor":4653,"Edava":4526,"Fort Trivandrum":4503,"Kachani":4691,"Kadakkavoor":4528,"Kallambalam":4533,"Kallara":4557,"Kalliyoor":4675,"Kamukinkode":4868,"Kaniyapuram":4522,"Kanjiramkulam":4544,"Kanyakulangara":4556,"Karamana":4510,"Kattakada":4552,"Kazhakuttam":4521,"Kedakulam":4527,"Kesavadasapuram":4516,"Kilimannoor":4535,"Kottukal":4657,"Kudappanakkunnu":4676,"Kulathoor":4520,"Kunnathukal":4667,"Madavoor":4536,"Malayinkeezh":4666,"Manacaud":4501,"Mangalapuram":4523,"Maranalloor":4553,"Marayamuttom":4539,"Nagaroor":4654,"Nalanchira":4518,"Nedumangad":4547,"Nemom":4543,"Neyyattinkara":4537,"Ottasekharamangalam":4554,"Palachira":4534,"Pallickal [Attingal Dvn.]":4680,"Palode":4548,"Parassala":4540,"Paravoor":4576,"Peringamala":4674,"Peroorkada":4508,"Pettah":4514,"Peyad":4550,"Poojappura":4512,"Poonthura":4679,"Poothakulam":4671,"Poovachal":4864,"Poovar":4545,"Poozhikunnu":4688,"Pothencode":4524,"Puthenchantha":4504,"Sreekariyam":4519,"Sreevaraham":4515,"Thirumala":4511,"Thiruvallam":4502,"Tholicode":4681,"Thycaud":4505,"Uchakkada":4655,"Udiyankulangara":4538,"Ulloor":4517,"Uzhamalakkal":4673,"Vakkom":4530,"Vamanapuram":4821,"Varkala":4525,"Vattappara":4678,"Vattiyoorkavu":4509,"Vellanad":4551,"Vellarada":4541,"Vellayambalam":4507,"Venjaramood":4555,"Vithura":4549,"Vizhinjam":4546},
    "Kollam": {"Anchal West":4669,"Anchal":4597,"Ayathil":4565,"Ayoor":4591,"Cantonment Kollam":4558,"Chadayamangalam":4672,"Chathannoor":4575,"Chavara":4571,"Chengamanad KTRA":4590,"Chithara":4662,"East kallada":4583,"Ezhukone":4582,"Kadakkal":4599,"Kadambanad":4613,"Kadappakkada":4559,"Kallambalam":4533,"Kanjiramkuzhy":4670,"Kannanalloor":4579,"Karavaloor":4677,"Karukone":4661,"Karunagappally North":4569,"Karunagappally South":4570,"Kilikolloor":4564,"Kottarakkara East":4683,"Kottarakkara":4587,"Kottiyam":4578,"Kulakkada":4588,"Kulathupuzha":4598,"Kundara":4581,"Madavoor":4536,"Manappally":4658,"Manipuzha":4620,"Mayyanad":4580,"Mynagappally":4659,"Nallila":4586,"Oachira":4567,"Olai":4560,"Oyoor":4660,"Pallimukku":4566,"Panmana":4682,"Paravoor":4576,"Parippally":4577,"Pathanapuram":4595,"Pattazhy":4685,"Perinad":4563,"Perumpuzha":4585,"Piravanthoor":4668,"Poothakulam":4671,"Punalur":4593,"Puthur Kottarakkara":4589,"Sakthikulangara":4561,"Sasthamcotta":4573,"Sooranad":4574,"Thankasserry":4562,"Thengamom-Pallickal":4663,"Thenmala":4594,"Thevalakkara":4572,"Valakom":4592,"Vallikunnam":5754,"Veliyam":4584,"Vilakkudi":4596},
    "Pathanamthitta": {"Adoor":4609,"Aranmula":5535,"Ayirur Kathakali Gramam":4608,"Changanachery":4636,"Elavumthitta":4616,"Enathu":4806,"Erumely":5637,"Ezhamkulam":4611,"Kadambanad":4613,"Kadapra":4621,"Kaippattoor":4610,"Kakkad":4604,"Kalanjoor":4612,"Karukachal":4641,"Konni":4602,"Kozhenchery":4605,"Kulanada":4615,"Kumbanad":4619,"Kumbazha":4601,"Mallappally":4623,"Manimala":4642,"Manipuzha":4620,"Pandalam Thekkekkara":4692,"Pandalam":4614,"Pathanamthitta":4600,"Pathanapuram":4595,"Ranni Perunad":4690,"Ranny North":4607,"Ranny South":4606,"Thengamom-Pallickal":4663,"Thiruvalla":4617,"Thottabhagom":4618,"Vadasserikkara":4603,"Vaipur":4624,"Vakayar":4687,"Vechoochira":4665,"Venmony":5824,"Vennikulam":4622},
    "Alappuzha": {"Alappuzha North":5501,"Alappuzha South":5503,"Alappuzha Town":5502,"Ambalappuzha":5505,"Arattupuzha":5833,"Arookutty":5705,"Aroor":5515,"Arthinkal":5518,"Chambakulam":5508,"Charummood":5527,"Chenganoor":5533,"Chennithala":5538,"Cheppad":5530,"Cherthala East":5704,"Cherthala":5512,"Edathua":5507,"Harippad":5524,"Kainakari":5511,"Kalavoor":5726,"Kallissery":5534,"Karthikappally":5526,"Karuvatta":5525,"Kattanam":5528,"Kayamkulam East":5531,"Kayamkulam West":5532,"Kidangara":5510,"Kollakadavu":5537,"Krishnapuram":4568,"Kuthiathode":5516,"Manipuzha":4620,"Mankombu":5509,"Mannar":5539,"Mavelikkara":5522,"Muhamma":5519,"Mulakuzha":5536,"Muthukulam":5741,"Nooranad":5529,"Oachira":4567,"Pallippad":5725,"Pathirappally":5521,"Pattanakadu":5517,"Poochakkal":5514,"Punja Pallom":4626,"Punnapra":5504,"S.L.Puram":5520,"Thakazhy":5506,"Thannermukkom":5513,"Thattarambalam":5523,"Thengamom-Pallickal":4663,"Vallikunnam":5754,"Venmony":5824},
    "Kottayam": {"Athirampuzha":4664,"Ayarkunnam":4632,"Aymanam":4629,"Bharananganam":5627,"Changanachery":4636,"Chempu":4644,"Erattupetta":5630,"Erumely":5637,"Ettumanur":4646,"Gandhinagar":4628,"Kaduthuruthy":4651,"Kanjirappally":5636,"Karukachal":4641,"Kidangoor":5625,"Kollappally":5740,"Kooroppada":5749,"Koothattukulam":5598,"Koottikkal":5721,"Kottayam Central":4634,"Kottayam East":4635,"Kumarakam":4630,"Kuravilangad":4649,"Kurichy":4637,"Kuruppanthara":4647,"Manarcad":4631,"Manimala":4642,"Manipuzha":4620,"Marangattupally":5628,"Meenadom":4689,"Mundakkayam":5638,"Nattakam":4627,"Neendoor":4648,"Paika":5626,"Pala":5624,"Pallickathode":5707,"Pallom":4625,"Pampady":5635,"Parathode":5745,"Pathanad":4684,"Peerumade":5612,"Peruva":4686,"Pinnakkanad":5632,"Piravom":5597,"Ponkunnam":5633,"Poonjar":5631,"Punja Pallom":4626,"Puthuppally":4633,"Ramapuram":5629,"Teekoy":5744,"Thalayazham":4645,"Thalayolaparambu":4650,"Thengana":4638,"Thiruvalla":4617,"Thodupuzha-I":5618,"Thrikkodithanam":4640,"Vaikom":4643,"Vakathanam":4639,"Vandiperiyar":5614,"Vazhoor":5634},
    "Idukki": {"Adimali":5617,"Alakode-Thodupuzha":5753,"Anakkara":5742,"Chithirapuram":5615,"Erattayar":5724,"Kalloorkad":5593,"Kambilikandom":5710,"Kanchiyar":5746,"Kanjikuzhy":5722,"Karimannur":5621,"Kattapana":5609,"Koothattukulam":5598,"Kothamangalam-II":5601,"Kumily":5708,"Manjalloor":5752,"Marayoor":5616,"Moolamattom":5619,"Murikkassery":5711,"Nedumkandam":5610,"Painavu":5623,"Peerumade":5612,"Peruvanthanam":5720,"Pothanikad":5592,"Purappuzha":5743,"Rajakkad":5730,"Rajakumary":5709,"Thodupuzha-I":5618,"Thodupuzha-II":5620,"Thookkupalam":5723,"Udumbanchola":5755,"Upputhara":5613,"Vandanmedu":5611,"Vandiperiyar":5614,"Vannapuram":5622},
    "Ernakulam": {"Alangad":5737,"Aluva North":5568,"Aluva Town":5567,"Aluva West":5569,"Amballoor":5552,"Angamaly":5579,"Arakkunnam":5553,"Athani":5572,"Chendamangalam":5606,"Chengamanad PBVR":5571,"Cherai":5605,"Cheranellore":5739,"Chottanikkara":5551,"Chowara":5570,"College Ernakulam":5540,"Edappally":5544,"Edathala":5750,"Edayar(Muppathadom)":5712,"Eloor":5574,"Ernakulam Central":5546,"Eroor":5733,"Ezhikkara":5603,"Fort Cochin":5564,"Girinagar":5542,"Kalady":5576,"Kalamassery":5573,"Kalloorkad":5593,"Kaloor":5545,"Kanjoor":5747,"Kannamali":5560,"Karakutty":5581,"Keerampara":5713,"Kizhakkambalam":5586,"Kolencherry":5554,"Koothattukulam":5598,"Koovappady":5590,"Kothamangalam-I":5600,"Kothamangalam-II":5601,"Kumbalangi":5561,"Kunnukara":5575,"Kurupampady":5588,"Kuzhoor":5657,"Malayattoor":5715,"Manjalloor":5752,"Manjapra":5578,"Mannam":5736,"Maradu":5550,"Mattancherry":5563,"Meloor":5650,"Mookannur":5582,"Moothakunnam":5608,"Moovattupuzha-I":5591,"Moovattupuzha-II":5594,"Mulanthuruthy":5748,"Nellikuzhy":5751,"Njarackkal":5566,"North Paravur":5604,"Okkal":5738,"Palarivattom":5543,"Palluruthy":5559,"Pampakuda":5599,"Panangad":5735,"Parakadavu PBVR":5580,"Pattimattam":5587,"Perumbavoor":5583,"Piravom":5597,"Pothanikad":5592,"Puthencruz":5555,"Puthenvelikkara":5659,"Thevakkal":5558,"Thevara":5541,"Thiruvaniyoor":5734,"Thodupuzha-I":5618,"Thodupuzha-II":5620,"Thoppumpady":5562,"Thrikkakkara West":5731,"Thrikkakkara":5557,"Thripunithura":5548,"Thuravoor":5577,"Udayamperoor":5549,"Vadakkekkara":5607,"Vaduthala":5547,"Valayanchirangara":5596,"Varapuzha":5602,"Vazhakulam":5584,"Velloorkunnam":5595,"Vengola":5585,"Vengoor":5589,"Vennala":5732,"Vypin":5565,"Vyttila":5556},
    "Thrissur": {"Ammadam":5670,"Annamanada":5648,"Arimboor":5679,"Ayyanthole":5678,"Beach Chavakkad":5699,"Big Bazar Thrissur":5702,"Chalakkudy":5651,"Chalissery":6538,"Chavakkad":5698,"Chelakara":5691,"Cherpu":5639,"Cheruthuruthy":5692,"Chirakkal":5642,"Desamangalam":5717,"Eriyad":5665,"Guruvayoor":5697,"Irinjalakuda- I":5644,"Irinjalakuda-II":5647,"Kaipamangalam":5660,"Kandassankadavu":5689,"Karuvannur":5640,"Kattoor":5643,"Kecheri":5694,"Kodakara":5654,"Kodungalloor- II":5664,"Kodungalloor-I":5663,"Kombodinjamakkal":5645,"Koonamoochy":5696,"Koorkancherry":5669,"Koratty":5649,"Kundannur":5684,"Kunnamkulam":5700,"Kuriachira":5671,"Kuttichira":5729,"Kuzhoor":5657,"Mala":5658,"Mannuthy":5675,"Marathakara":5673,"Mathilakom":5661,"Medical College(Peringandoor)":5714,"Meloor":5650,"Mulamkunnathukavu":5682,"Mundur Thrissur":5695,"Muthuvara":5685,"Nadathara":5677,"Ollur":5672,"Parappookara":5641,"Parappur":5686,"Pariyaram IRJKDA":5652,"Pattikad":5676,"Pavaratty":5687,"Pazhanji":5701,"Pazhayannur":5719,"Peringode":6705,"Peringottukara":5666,"Perinjanam":5662,"Perumbilavu":5727,"Punnamparambu":5718,"Punnayoorkulam":5703,"Puthenchira":5728,"Puthenvelikkara":5659,"Puthucode":6508,"Puthukkad":5655,"Puthur Thrissur":5674,"Ramavarmapuram":5681,"Thalikulam":5716,"Thiruvillwamala":5693,"Thriprayar":5667,"Vadanappally":5688,"Valappad":5668,"Varandarappally":5656,"Vellangallur":5646,"Vellikulangara":5653,"Vengidange":5690,"Viyur":5680,"Wadakkanchery":5683},
    "Palakkad": {"Agali":6516,"Alanallur":6521,"Alathur":6509,"Ambalappara":6534,"Big Bazar Palakkad":6518,"Chalissery":6538,"Cherpulassery":6541,"Chittur":6501,"Desamangalam":5717,"Elapully":6530,"Kadambazhippuram":6786,"Kalpathy":6531,"Kanjikode":6528,"Kanjirapuzha":6771,"Kayaradi":6822,"Kizhakkancherry":6754,"Koduvayur":6505,"Kollengode":6510,"Kongad":6523,"Koottupatha":6791,"Koppam":6537,"Kothakurussy":6542,"Kottathara":6785,"Kottayi":6526,"Kozhinjampara":6502,"Kumaramputhur":6742,"Kumbidi":6812,"Kunnissery":6726,"Kuthannur":6728,"Kuzhalmannam":6525,"Lakkidi":6824,"Malampuzha":6725,"Mannarkkad":6520,"Marutharoad":6529,"Melamuri":6519,"Mudappallur":6514,"Mundur Palakkad":6740,"Muthalamada":6511,"Muthuthala":6704,"Nelliampathy":6512,"Nemmara":6513,"Olavakkode":6532,"Ongallur":6801,"Ottappalam":6533,"Padinjarangadi":6540,"Padoor":6507,"Parali":6527,"Pathirippala":6729,"Pattambi":6536,"Pengattiri":6784,"Peringode":6705,"Peringottukurissy":6727,"Pudunagaram":6506,"Puthucode":6508,"Shoranur":6535,"Sreekrishnapuram":6524,"Sulthanpet":6517,"Tachampara":6522,"Tattamangalam":6504,"Thazhecode":6710,"Thiruvegapura":6753,"Thrithala":6539,"Vadakkumchery":6515,"Vadavannur":6810,"Vallapuzha":6703,"Vandithavalam":6809,"Vaniyamkulam":6733,"Velanthavalam":6503,"Vilayur":6821,"Walayar":6819},
    "Malappuram": {"Akambadam":6796,"Alathiyur":6574,"Anakkayam":6756,"Angadippuram":6748,"Areekode":6549,"Chalissery":6538,"Changaramkulam":6585,"Chattiparamba":6708,"Chelari":6577,"Cherpulassery":6541,"Chungathara":6713,"Edakkara":6544,"Edappal":6584,"Edarikode":6558,"Edavanna":6548,"Edavannappara":6550,"Edayoor":6769,"Ezhuvathurithy":6802,"Kadalundi":6632,"Kadampuzha":6572,"Kadungathukundu":6741,"Kalikavu":6560,"Kandanakom-Kalady":6755,"Karad":6768,"Karulai":6795,"Karuvarakundu":6794,"Keezhuparamba":6707,"Kizzhissery":6551,"Kolathur":6567,"Kondotty":6552,"Koombara":6805,"Kottakkal":6557,"Kumbidi":6812,"Kunnumpuram (AR Nagar)":6739,"Kuttipuram":6712,"Makkaraparamba":6565,"Malappuram East":6555,"Malappuram West":6780,"Mampad":6814,"Manjeri North":6547,"Manjeri South":6546,"Mankada":6711,"Melattoor":6563,"Moothedam":6807,"Mundakkulam":6823,"Nilambur":6543,"Oorakam":6808,"Othukungal":6709,"Pandikkad":6561,"Pannikkode":6777,"Parappanangadi":6575,"Pattikkad Chungam":6779,"Perinthalmanna":6562,"Perumpadappu":6803,"Ponmundam (Vylathur)":6570,"Ponnani":6581,"Pookottumpadam":6545,"Pothukallu":6310,"Pulamanthole":6564,"Pulikkal":6553,"Purangu":6583,"Purathur":6781,"Puthenathani":6571,"Puzhakkattiri":6820,"Thalappara":6580,"Thanalur":6736,"Thanur East":6798,"Thanur":6576,"Thavanur":6582,"Thazhecode":6710,"Thirunavaya":6573,"Thiruvali":6770,"Thrikkalangode":6706,"Thuvvakkad":6797,"Tirur East":6568,"Tirur West":6569,"Tirurangadi":6578,"Tuvvur":6815,"Valancheri":6566,"Vallikunnu":6715,"Vaniyambalam":6793,"Vazhikkadavu":6714,"Velluvambram":6554,"Vengara":6556,"Venniyoor":6579,"Vettom":6730,"Wandoor":6559},
    "Kozhikode": {"Areekkad":6789,"Areekkulam":6767,"Atholi":6615,"Ayenchery":6624,"Azhiyoor":6743,"Balussery":6613,"Beach Kozhikkode":6603,"Beypur":6635,"Central Kozhikode":6602,"Chakkittapara":6716,"Chelannur":6744,"Edacherri":6627,"Eranhikkal":6606,"Feroke":6631,"Kadalundi":6632,"Kakkattil":6735,"Kakkodi":6599,"Kakkoor":6764,"Kallai":6634,"Karaparamba":6598,"Kattangal":6747,"Keezhuparamba":6707,"Kodencheri":6612,"Koduvally":6611,"Koombara":6805,"Koorachundu":6763,"Koottalida":6765,"Kovoor":6595,"Kunnamangalam":6607,"Kuttiyadi":6629,"Maniyoor":6717,"Mankavu":6636,"Mavoor":6596,"Melady":6620,"Meppayoor":6617,"Moodadi":6766,"Mukkam":6608,"Muttungal":6625,"Nadakkave":6601,"Nadapuram":6628,"Naduvannur":6618,"Narikkuni":6600,"Omassery":6751,"Orkkatteri":6626,"Pannikkode":6777,"Pantheerankavu":6637,"Parakkadavu KKD":6724,"Parappupara":6752,"Perambra North":6778,"Perambra":6616,"Peringathur":6817,"Perumanna":6734,"Pottammal":6597,"Puthuppady":6732,"Quilandi North":6619,"Quilandi South":6621,"Ramanattukara":6633,"Thamarassery":6610,"Thikkody":6746,"Thiruvallur":6738,"Thiruvambadi":6609,"Thottilpalam":6630,"Thuneri":6731,"Unnikulam":6614,"Vadakara Beach":6737,"Vadakara North":6623,"Vadakara South":6622,"Vellimadukunnu":6605,"WestHill":6604},
    "Wayanad": {"Ambalavayal":6762,"Kalpetta":6586,"Kambalakkad":6718,"Kattikulam":6783,"Korom":6806,"Mananthavady":6589,"Meenangadi":6593,"Meppadi":6588,"Muttil":6792,"Padichira":6811,"Padinjarethara":6782,"Panamaram":6590,"Pulpally":6594,"Sultan Bathery West":6720,"Sultan Bathery":6592,"Thavinhal":6719,"Vellamunda":6591,"Vythiri":6587},
    "Kannur": {"Alakkode":6648,"Azheekode":6662,"Burnasseri":6655,"Chakkarakallu":6660,"Chalode":6661,"Chapparappadavu":6745,"Chemperi":6721,"Cherukunnu":6664,"Cherupuzha":6816,"Chokli":6671,"Chovva":6657,"Dharmadom":6677,"Dharmassala":6646,"Eaichur":6659,"Edoor":6722,"Irikkur":6649,"Iritty":6674,"Kadachira":6658,"Kakkayangad":6787,"Kannur":6654,"Karimbam":6645,"Karivellur":6651,"Karthikapuram":6799,"Kathiroor":6682,"Kelakom":6759,"Kodiyeri":6670,"Kolachery":6666,"Kolayad":6758,"Koothuparamba":6680,"Kunhimangalam":6639,"Madai":6643,"Mathamangalam":6641,"Mattannur":6675,"Mayyil":6667,"Padiyottuchal":6652,"Pallikunnu":6653,"Panoor":6672,"Pappinisseri":6663,"Parad":6673,"Pariyaram Kannur":6760,"Pattiyam":6681,"Payyangadi":6642,"Payyanur":6638,"Payyavur":6775,"Peralassery":6790,"Peringathur":6817,"Pinarayi":6679,"Ramanthali":6640,"Sivapuram":6776,"Sreekantapuram":6647,"Thalassery North":6669,"Thalassery South":6668,"Thaliparamba":6644,"Thayyil":6656,"Thondiyil":6676,"Ulikkal":6761,"Valapattanam":6665,"Vallithode":6813,"Vellur":6650,"Vengad":6678},
    "Kasaragod": {"Badiadka":6690,"Balamthode":6773,"Bhimanadi":6697,"Chattanchal":6772,"Cherkala":6689,"Cherupuzha":6816,"Chittari":6695,"Choyamkode":6750,"Kanhangad":6694,"Karivellur":6651,"Kasargode":6688,"Kayyur":6699,"Kumbala":6687,"Kuttikole":6693,"Manjeswar":6684,"Mavungal":6701,"Mulleria":6691,"Nallompuzha":6749,"Neeleswar":6696,"Nellikunnu":6686,"Padanna":6723,"Padannakkad":6804,"Paivalika":6757,"Periya Bazar":6774,"Perla":6800,"Pilicode":6698,"Rajapuram":6702,"Seethangoli":6818,"Thrikaripur":6700,"Udma":6692,"Uppala":6683,"Vellur":6650,"Vorkady":6685}
};

// Populate KSEB Section dropdown based on selected district
function populateKSEBSections(districtValue) {
    const sectionSelect = document.getElementById('form-location');
    if (!sectionSelect) return;
    
    sectionSelect.innerHTML = '';
    
    // Match district name to KSEB data key
    const districtMap = {
        "Thiruvananthapuram": "Thiruvananthapuram",
        "Kollam": "Kollam",
        "Pathanamthitta": "Pathanamthitta",
        "Alappuzha": "Alappuzha",
        "Kottayam": "Kottayam",
        "Idukki": "Idukki",
        "Ernakulam": "Ernakulam",
        "Thrissur": "Thrissur",
        "Palakkad": "Palakkad",
        "Malappuram": "Malappuram",
        "Kozhikode": "Kozhikode",
        "Wayanad": "Wayanad",
        "Kannur": "Kannur",
        "Kasaragod": "Kasaragod"
    };
    
    const ksebKey = districtMap[districtValue];
    const sections = ksebKey ? KSEB_SECTIONS[ksebKey] : null;
    
    if (!sections || Object.keys(sections).length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '-- Select district first --';
        opt.disabled = true;
        opt.selected = true;
        sectionSelect.appendChild(opt);
        return;
    }
    
    // Add placeholder
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- Select your KSEB section --';
    placeholder.disabled = true;
    placeholder.selected = true;
    sectionSelect.appendChild(placeholder);
    
    // Sort sections alphabetically and populate
    const sortedSections = Object.keys(sections).sort();
    sortedSections.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        sectionSelect.appendChild(opt);
    });
}

// Automatically find and select the correct District and Section based on KSEB section name
window.autoSelectDistrictAndSection = function(fetchedSectionName) {
    if (!fetchedSectionName) return;
    
    const cleanSection = fetchedSectionName.replace(/electrical|section|office|dvn/gi, '').trim().toLowerCase();
    if (!cleanSection) return;
    
    let matchedDistrict = null;
    let matchedSectionValue = null;
    
    // Look through all districts and their sections to find the best match
    for (const [distName, sectionsMap] of Object.entries(KSEB_SECTIONS)) {
        for (const secName of Object.keys(sectionsMap)) {
            const cleanSecName = secName.replace(/electrical|section|office|dvn/gi, '').trim().toLowerCase();
            
            // Match exactly or check if one contains another
            if (cleanSection === cleanSecName || cleanSection.includes(cleanSecName) || cleanSecName.includes(cleanSection)) {
                matchedDistrict = distName;
                matchedSectionValue = secName;
                break;
            }
        }
        if (matchedDistrict) break;
    }
    
    if (matchedDistrict) {
        // 1. Update District Select
        const distSelect = document.getElementById('form-district');
        if (distSelect) {
            distSelect.value = matchedDistrict;
            // 2. Load sections for this district
            handleDistrictChange(matchedDistrict);
            
            // 3. Select KSEB Section
            const locationSelect = document.getElementById('form-location');
            if (locationSelect && matchedSectionValue) {
                locationSelect.value = matchedSectionValue;
                locationSelect.dispatchEvent(new Event('change'));
            }
        }
    }
};

const formLocation = document.getElementById('form-location');
if (formLocation) {
    formLocation.addEventListener('change', function() {
        const sectionName = this.value;
        if (!formDealer || !sectionName) return;
        
        const searchStr = sectionName.toUpperCase();
        let bestMatch = null;
        let maxMatchLen = 0;
        
        Array.from(formDealer.options).forEach(opt => {
            if (!opt.value) return;
            const dealer = DEALERS.find(d => d.code === opt.value);
            if (dealer) {
                const areaUpper = dealer.area.toUpperCase();
                // Simple string match
                if (searchStr.includes(areaUpper) || areaUpper.includes(searchStr)) {
                    if (areaUpper.length > maxMatchLen) {
                        maxMatchLen = areaUpper.length;
                        bestMatch = opt.value;
                    }
                }
            }
        });
        
        if (bestMatch) {
            formDealer.value = bestMatch;
        }
    });
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
    
    // Phone validation (10 digits starting with 6-9)
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
        showFormFeedback('Please enter a valid 10-digit mobile number starting with 6-9.', 'error');
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

    const WEB3FORMS_ACCESS_KEY = "3b85044a-ed95-42ed-b465-e6afcaeb60a2";

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

    // Primary Dispatch: Web3Forms (using your verified Access Key)
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
            console.log('[Web3Forms] Email successfully dispatched.');
        } else {
            throw new Error('Web3Forms returned status: ' + response.status);
        }
    })
    .catch(err => {
        console.warn('[Web3Forms] Primary dispatch failed. Attempting FormSubmit fallback...', err);
        
        // Redundancy Dispatch: FormSubmit AJAX API
        const fsPayload = {
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
            body: JSON.stringify(fsPayload)
        })
        .then(response => {
            if (response.ok) {
                console.log('[FormSubmit] Fallback email successfully dispatched.');
            } else {
                console.warn('[FormSubmit] Fallback returned status: ' + response.status);
            }
        })
        .catch(fsErr => {
            console.error('[Submit] All mail automation systems blocked by local network:', fsErr);
        });
    });

    // 3.5. Also Log Inquiry to Local Server database securely (so staff can view it in Sunova Mail inbox)
    const logPayload = {
        name: name,
        phone: phone,
        email: email || 'Not Provided',
        district: district,
        location: location,
        connection: connection,
        systemModel: systemModelLabel,
        capacity: capacity,
        loan: loanRequired,
        message: message || 'None',
        dealer: `${dealer.name} (${dealer.code})`
    };

    fetch('proxy.php?action=log_inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logPayload)
    })
    .then(res => res.json())
    .then(data => {
        console.log('[Database] Lead logged to server successfully:', data);
    })
    .catch(err => {
        console.warn('[Database] Local fallback logging only (offline):', err);
    });

    // 4. Build success feedback detailing the assigned partner
    const successMessage = `
        <strong>Submission Successful!</strong><br>
        Thank you, ${name.toUpperCase()}. Your quote request has been registered in our portal.<br><br>
        <strong>Details Provided:</strong><br>
        • District: ${district}<br>
        • KSEB Section: ${location}<br><br>
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
    const consumerNoEl = document.getElementById('form-consumer-no');
    if (consumerNoEl) consumerNoEl.value = '';
    const regMobileEl = document.getElementById('form-reg-mobile');
    if (regMobileEl) regMobileEl.value = '';
    const ksebStatusEl = document.getElementById('kseb-status');
    if (ksebStatusEl) ksebStatusEl.style.display = 'none';
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

    // Setup developer secret click trigger on copyright footer to set SMTP password and Web3Forms key
    const devTrigger = document.getElementById('developer-trigger');
    if (devTrigger) {
        let clickCount = 0;
        devTrigger.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 5) {
                clickCount = 0;
                
                // Prompt 1: Web3Forms Access Key
                const currentKey = localStorage.getItem('web3forms_access_key') || '';
                const key = prompt("Enter Web3Forms Access Key for Mail Automation (leave blank to clear / skip):", currentKey);
                if (key !== null) {
                    if (key.trim() !== '') {
                        localStorage.setItem('web3forms_access_key', key.trim());
                    } else {
                        localStorage.removeItem('web3forms_access_key');
                    }
                }

                // Prompt 2: Hostinger Password
                const currentPass = localStorage.getItem('hostinger_smtp_password') || '';
                const pass = prompt("Enter Hostinger SMTP Password for Webmail Client (leave blank to clear / skip):", currentPass);
                if (pass !== null) {
                    if (pass.trim() !== '') {
                        localStorage.setItem('hostinger_smtp_password', pass.trim());
                    } else {
                        localStorage.removeItem('hostinger_smtp_password');
                    }
                }

                alert("Configuration successfully saved! Reloading page to apply changes...");
                location.reload();
            }
        });
    }
});

// Capacity and Connection Category change handlers
window.handleFormSizeSelectChange = function(val) {
    const manualWrapper = document.getElementById('form-size-manual-wrapper');
    const sizeInput = document.getElementById('form-size');
    if (val === 'custom') {
        manualWrapper.style.display = 'flex';
    } else {
        manualWrapper.style.display = 'none';
        sizeInput.value = val;
    }
};

window.handleFormConnectionChange = function(val) {
    const sizeSelect = document.getElementById('form-size-select');
    if (!sizeSelect) return;
    
    if (val === 'commercial') {
        sizeSelect.value = 'custom';
        window.handleFormSizeSelectChange('custom');
    } else {
        sizeSelect.value = '3.0';
        window.handleFormSizeSelectChange('3.0');
        document.getElementById('form-size').value = 3.0;
    }
};

window.handleCalcSizeSelectChange = function(val) {
    const manualWrapper = document.getElementById('calc-size-manual-wrapper');
    const sizeSelect = document.getElementById('calc-size-select');
    
    if (val === 'auto') {
        manualWrapper.style.display = 'none';
        if (typeof resetCapacityToCalculated === 'function') {
            resetCapacityToCalculated();
        }
    } else if (val === 'custom') {
        manualWrapper.style.display = 'flex';
    } else {
        manualWrapper.style.display = 'none';
        if (typeof handleCapacityInput === 'function') {
            handleCapacityInput(val);
        }
    }
};

// KSEB Auto-Fill Functions
let ksebFetchTimer = null;

window.triggerKSEBAutoFetch = function() {
    const consumerNo = (document.getElementById('form-consumer-no')?.value || '').trim();
    const regMobile  = (document.getElementById('form-reg-mobile')?.value  || '').trim();
    
    // Only fire when both fields are complete
    if (consumerNo.length !== 13 || !/^[0-9]{13}$/.test(consumerNo)) return;
    if (regMobile.length  !== 10 || !/^[6-9][0-9]{9}$/.test(regMobile))  return;
    
    // Debounce — wait 600ms after last keystroke
    clearTimeout(ksebFetchTimer);
    ksebFetchTimer = setTimeout(() => fetchKSEBDetails(consumerNo, regMobile), 600);
};

window.openKSEBPortalTab = function() {
    const consumerNo = (document.getElementById('form-consumer-no')?.value || '').trim();
    const regMobile  = (document.getElementById('form-reg-mobile')?.value  || '').trim();
    
    const url = `kseb.html?consumerno=${encodeURIComponent(consumerNo)}&regmobno=${encodeURIComponent(regMobile)}`;
    window.open(url, '_blank');
};

window.setKSEBStatus = function(msg, type) {
    const el = document.getElementById('kseb-status');
    if (!el) return;
    el.style.display = 'block';
    el.textContent = msg;
    if (type === 'loading') {
        el.style.background = 'rgba(255,183,3,0.1)';
        el.style.color = 'var(--color-sun-yellow)';
        el.style.border = '1px solid rgba(255,183,3,0.3)';
    } else if (type === 'success') {
        el.style.background = 'rgba(34,197,94,0.12)';
        el.style.color = '#4ade80';
        el.style.border = '1px solid rgba(34,197,94,0.3)';
    } else {
        el.style.background = 'rgba(239,68,68,0.1)';
        el.style.color = '#f87171';
        el.style.border = '1px solid rgba(239,68,68,0.3)';
    }
}

async function fetchKSEBDetails(consumerNo, regMobile) {
    setKSEBStatus('⏳ Fetching from KSEB…', 'loading');
    
    try {
        const resp = await fetch('/api/kseb_fetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consumerno: consumerNo, regmobno: regMobile })
        });
        
        const json = await resp.json();
        
        if (!resp.ok || json.error) {
            setKSEBStatus('❌ ' + (json.error || 'Could not fetch bill details'), 'error');
            return;
        }
        
        const d = json.data;
        
        // Fill in name if not already typed
        const nameInput = document.getElementById('form-name');
        if (nameInput && d.name) {
            if (!nameInput.value || nameInput.value.trim() === '') {
                nameInput.value = d.name;
            }
        }
        
        // Match and select the district and section office dynamically
        if (d.section && typeof autoSelectDistrictAndSection === 'function') {
            autoSelectDistrictAndSection(d.section);
        }
        
        // Auto-fill last bill amount to calculator inputs
        if (d.amount) {
            const amountVal = parseInt(d.amount);
            if (!isNaN(amountVal) && amountVal > 0) {
                if (typeof handleBillManualInput === 'function') {
                    handleBillManualInput(amountVal);
                }
            }
        }
        
        // Build success summary
        let summary = '✅ Details fetched!';
        if (d.name)     summary += ` Name: ${d.name}.`;
        if (d.section)  summary += ` Section: ${d.section}.`;
        if (d.amount)   summary += ` Amount Due: ₹${d.amount}.`;
        if (d.units)    summary += ` Units: ${d.units}.`;
        if (d.due_date) summary += ` Due: ${d.due_date}.`;
        
        setKSEBStatus(summary, 'success');
        
    } catch (err) {
        // Hide the status indicator on network/CORS error when proxy is not active
        const el = document.getElementById('kseb-status');
        if (el) el.style.display = 'none';
        console.warn('KSEB auto-fetch failed (proxy not running or CORS blocked):', err);
    }
};

window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'kseb_autofill') {
        const fetchedData = event.data.data;
        const regMobile = event.data.regMobile;
        
        // Fill Name
        const nameEl = document.getElementById('form-name');
        if (nameEl) nameEl.value = fetchedData.name;
        
        // Fill Consumer Number
        const consumerEl = document.getElementById('form-consumer-no');
        if (consumerEl) consumerEl.value = fetchedData.consumerno;
        
        // Match and select the district and section office dynamically
        if (fetchedData.section && typeof autoSelectDistrictAndSection === 'function') {
            autoSelectDistrictAndSection(fetchedData.section);
        }
        
        // Fill Registered Mobile
        const regMobileEl = document.getElementById('form-reg-mobile');
        if (regMobileEl) regMobileEl.value = regMobile;
        
        // Fill Hidden Phone
        const phoneEl = document.getElementById('form-phone');
        if (phoneEl) phoneEl.value = regMobile;
        
        // Sync last bill amount directly to the solar calculator
        if (typeof handleBillManualInput === 'function') {
            handleBillManualInput(parseInt(fetchedData.amount));
        }
        
        // Set success banner on parent
        if (typeof setKSEBStatus === 'function') {
            const summary = `✅ Details fetched! Name: ${fetchedData.name}. Section: ${fetchedData.section}. Last Billed Amount: ₹${fetchedData.amount}. Units: ${fetchedData.units}.`;
            setKSEBStatus(summary, 'success');
        }
    }
});

