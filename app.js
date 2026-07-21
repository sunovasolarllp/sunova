// --- Application Variables & State ---
let currentMode = 'residential'; // 'residential' or 'commercial'
let currentSystemType = 'ongrid'; // 'ongrid' or 'hybrid'

// Authorized Sunova Solar Dealers List
const DEALERS = [
    { code: "KNR-JOBI", name: "Jobi Sebastian", area: "Kannur", district: "Kannur", phone: "8590085865", lat: 11.8763836, lon: 75.3737973, kseb: "Kannur" },
    { code: "TVM-BENJ", name: "Benjose FG", area: "kanjiramkulam", district: "Thiruvananthapuram", phone: "9037273767", lat: 8.3601022, lon: 77.0525935, kseb: "kanjiramkulam" },
    { code: "TVM-ANAN", name: "Anand Sreedhar", area: "Neyyattinkara", district: "Thiruvananthapuram", phone: "7994430742", lat: 8.3858430, lon: 77.0650429, kseb: "Neyyattinkara" },
    { code: "KLA-VARG", name: "Varghese Nellimoottil", area: "Ayoor", district: "Kollam", phone: "9020202222", lat: 8.8978612, lon: 76.8601206, kseb: "Ayoor" },
    { code: "KLA-NIYA", name: "Niyas K", area: "Karunagappally", district: "Kollam", phone: "9656366068", lat: 9.0341924, lon: 76.5367765, kseb: "Karunagappally (North/South)" },
    { code: "KLA-UDAY", name: "Udayabhanu J", area: "Kadappakkada", district: "Kollam", phone: "9349136882", lat: 8.8919030, lon: 76.6020893, kseb: "Kadappakkada" },
    { code: "KLA-RAJE", name: "Rajeev R", area: "karavaloor", district: "Kollam", phone: "9567970077", lat: 8.9807724, lon: 76.9250357, kseb: "karavaloor" },
    { code: "KLA-RATH", name: "Rathil Kumar", area: "Sasthamcotta", district: "Kollam", phone: "7907878797", lat: 9.0314647, lon: 76.6009828, kseb: "Sasthamcotta" },
    { code: "PTA-SREE", name: "Sreejith TR", area: "Vaipur", district: "Pathanamthitta", phone: "9947030669", lat: 9.4485800, lon: 76.7149053, kseb: "Vaipur" },
    { code: "PTA-JIJU", name: "Jijukumar MC", area: "Pandalam", district: "Pathanamthitta", phone: "9388133400", lat: 9.2251208, lon: 76.6781249, kseb: "Pandalam" },
    { code: "PTA-PKPR", name: "PK Prasannakumar", area: "kumbazha", district: "Pathanamthitta", phone: "7034023301", lat: 9.2649844, lon: 76.8064366, kseb: "kumbazha" },
    { code: "PTA-BIJU", name: "Bijumon J", area: "Ranni North", district: "Pathanamthitta", phone: "9995990372", lat: 9.3852605, lon: 76.7848789, kseb: "Ranni North" },
    { code: "ALP-SHIN", name: "Shinas Shamsudeen", area: "Punnapra", district: "Alappuzha", phone: "9995550888", lat: 9.44681, lon: 76.32897, kseb: "Punnapra" },
    { code: "ALP-NISS", name: "Nissar Hameed", area: "Kayamkulam", district: "Alappuzha", phone: "9895497090", lat: 9.1723603, lon: 76.5000610, kseb: "Kayamkulam" },
    { code: "ALP-RENJ", name: "Renjith PS", area: "Mavelikkara", district: "Alappuzha", phone: "9447866958", lat: 9.2504893, lon: 76.5402433, kseb: "Mavelikkara" },
    { code: "ALP-BAIJ", name: "Baiju Sasidharan", area: "Vallikunnam", district: "Alappuzha", phone: "9747186818", lat: 9.1391951, lon: 76.5532781, kseb: "Vallikunnam" },
    { code: "KTM-SALY", name: "Saly Sainudeen", area: "erattupetta", district: "Kottayam", phone: "9446200616", lat: 9.6879884, lon: 76.7797651, kseb: "erattupetta" },
    { code: "KTM-ANIS", name: "Anish Kumar", area: "Neendoor", district: "Kottayam", phone: "9387220162", lat: 9.6855081, lon: 76.5055272, kseb: "Neendoor" },
    { code: "KTM-SANI", name: "Sanil Kumar", area: "Manarcad", district: "Kottayam", phone: "9061189784", lat: 9.5999286, lon: 76.5849633, kseb: "Manarcad" },
    { code: "IDK-OUSE", name: "Ouseph KA", area: "Moolamattom", district: "Idukki", phone: "9495737628", lat: 9.7910035, lon: 76.8537047, kseb: "Moolamattom" },
    { code: "IDK-MGAJ", name: "MG Ajay", area: "Thodupuzha", district: "Idukki", phone: "9447254142", lat: 9.8976798, lon: 76.7134225, kseb: "Thodupuzha" },
    { code: "EKM-SHIY", name: "Shiyas Rasheed", area: "Thrikkakkara", district: "Ernakulam", phone: "9847859859", lat: 9.9882518, lon: 76.3144876, kseb: "Thrikkakkara" },
    { code: "EKM-BHAV", name: "Bhavya M", area: "kalamassery", district: "Ernakulam", phone: "8301026309", lat: 10.0521676, lon: 76.3199033, kseb: "kalamassery" },
    { code: "EKM-JIBI", name: "Jibin George", area: "Mulanthuruthy", district: "Ernakulam", phone: "9995996240", lat: 9.9008567, lon: 76.3888568, kseb: "Mulanthuruthy" },
    { code: "TCR-JAIS", name: "Jaison Jose Meleth", area: "Ayyanthole", district: "Thrissur", phone: "9995601923", lat: 10.5330031, lon: 76.1885802, kseb: "Ayyanthole" },
    { code: "TCR-COAT", name: "Coats Thekkan", area: "chalakkudy", district: "Thrissur", phone: "8129119222", lat: 10.3315317, lon: 76.5488885, kseb: "chalakkudy" },
    { code: "TCR-JISO", name: "Jison George", area: "Chelakara", district: "Thrissur", phone: "9746666535", lat: 10.6942894, lon: 76.3395838, kseb: "Chelakara" },
    { code: "TCR-SINI", name: "Sinish KM", area: "Kodakara", district: "Thrissur", phone: "9946101892", lat: 10.3717111, lon: 76.3042007, kseb: "Kodakara" },
    { code: "TCR-BINU", name: "Binu Yacob", area: "Pazhayannur", district: "Thrissur", phone: "9946033807", lat: 10.6512224, lon: 76.4053969, kseb: "Pazhayannur" },
    { code: "TCR-JITH", name: "Jithesh Tharayil", area: "ramavarmapuram", district: "Thrissur", phone: "7356347700", lat: 10.5635491, lon: 76.2320952, kseb: "ramavarmapuram" },
    { code: "TCR-AKAN", name: "AK Anil", area: "Valappad", district: "Thrissur", phone: "9746891854", lat: 10.3805225, lon: 76.1119313, kseb: "Valappad" },
    { code: "PKD-SUHA", name: "Suhaib S", area: "kuzhalmannam", district: "Palakkad", phone: "9988553585", lat: 10.7194290, lon: 76.5948525, kseb: "kuzhalmannam" },
    { code: "PKD-PRAM", name: "Pramod", area: "Chittur", district: "Palakkad", phone: "9746611002", lat: 10.5766989, lon: 76.6942525, kseb: "Chittur" },
    { code: "PKD-BIJO", name: "Bijo Varghese", area: "Elapully", district: "Palakkad", phone: "9388883222", lat: 10.7599479, lon: 76.7376870, kseb: "Elapully" },
    { code: "PKD-ANAN", name: "Anand P", area: "Koduvayur", district: "Palakkad", phone: "9349811101", lat: 10.6887585, lon: 76.6621933, kseb: "Koduvayur" },
    { code: "MPM-NASS", name: "Nassarudheen E", area: "Edakkara", district: "Malappuram", phone: "9946139955", lat: 11.3564141, lon: 76.3047491, kseb: "Edakkara" },
    { code: "MPM-FAIS", name: "Faisal K", area: "Anakkayam", district: "Malappuram", phone: "7994035923", lat: 11.0891491, lon: 76.1209271, kseb: "Anakkayam" },
    { code: "MPM-RAVI", name: "Ravindran K", area: "Tirur", district: "Malappuram", phone: "9961476748", lat: 10.9166828, lon: 75.9239860, kseb: "Tirur" },
    { code: "KKD-RAJA", name: "Rajan Madavoor", area: "Narikkuni", district: "Kozhikode", phone: "9497345868", lat: 11.3670609, lon: 75.8635766, kseb: "Narikkuni" },
    { code: "KKD-YOOS", name: "Yoosaf NV", area: "Chakkittapara", district: "Kozhikode", phone: "9539724724", lat: 11.5754712, lon: 75.8164922, kseb: "Chakkittapara" },
    { code: "KKD-SAFE", name: "Safeer", area: "Vadakara", district: "Kozhikode", phone: "9995330555", lat: 11.5938180, lon: 75.5872715, kseb: "Vadakara" },
    { code: "KKD-RAHU", name: "Rahul RN", area: "Vadakara", district: "Kozhikode", phone: "9645464733", lat: 11.5938180, lon: 75.5872715, kseb: "Vadakara" },
    { code: "WYD-SINI", name: "Sinil Chacko K", area: "Mananthavady", district: "Wayanad", phone: "8921794334", lat: 11.8298756, lon: 75.9418934, kseb: "Mananthavady" },
    { code: "KNR-ACFA", name: "AC Faisal", area: "Irikkur", district: "Kannur", phone: "9656069964", lat: 11.9872395, lon: 75.5494735, kseb: "Irikkur" },
    { code: "KNR-NOUS", name: "Noushad T", area: "mattannur", district: "Kannur", phone: "9847761018", lat: 11.9307557, lon: 75.5712639, kseb: "mattannur" },
    { code: "KNR-SURI", name: "Suriya Subash", area: "Panoor", district: "Kannur", phone: "9946809010", lat: 11.7248921, lon: 75.5885598, kseb: "Panoor" },
    { code: "KNR-NISH", name: "Nishad NK", area: "Kathiroor", district: "Kannur", phone: "9562028244", lat: 11.7984679, lon: 75.5267285, kseb: "Kathiroor" },
    { code: "KNR-KASO", name: "KA Soju", area: "Thaliparamba", district: "Kannur", phone: "9447548430", lat: 12.0309939, lon: 75.3567793, kseb: "Thaliparamba" },
    { code: "KSD-PRAD", name: "Pradeep K", area: "Badiadka", district: "Kasaragod", phone: "9744880900", lat: 12.5887582, lon: 75.0729575, kseb: "Badiadka" },
    { code: "KSD-SURE", name: "Suresh Kumar", area: "Balamthode", district: "Kasaragod", phone: "9946960604", lat: 12.4552137, lon: 75.3089981, kseb: "Balamthode" }
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

// --- Distance Calculation (Haversine formula) ---
function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; // Distance in km
}

// --- Driving Distance (OSRM API) ---
async function getDrivingDistance(lat1, lon1, lat2, lon2) {
    try {
        // OSRM expects coordinates in lon,lat order
        const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
            return data.routes[0].distance / 1000; // Convert meters to km
        }
    } catch (e) {
        console.error("OSRM API failed", e);
    }
    return Infinity;
}

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
        if (calculatedCapacity < 3.0) calculatedCapacity = 3.0;
        if (calculatedCapacity > 15) calculatedCapacity = 15.0; // Typical res cap
    } else {
        // Round to nearest 1.0 kW
        calculatedCapacity = Math.round(calculatedCapacity);
        if (calculatedCapacity < 3.0) calculatedCapacity = 3.0;
        if (calculatedCapacity > 100) calculatedCapacity = 100.0; // Com cap
    }
    
    // Hide reset button since it matches the calculated capacity
    const resetBtn = document.getElementById('btn-reset-capacity');
    if (resetBtn) {
        resetBtn.classList.add('hidden');
    }
    
    performCalculationsDirect(calculatedCapacity, units, false, false);
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
        if (calculatedCapacity < 3.0) calculatedCapacity = 3.0;
        if (calculatedCapacity > 15) calculatedCapacity = 15.0;
    } else {
        calculatedCapacity = Math.round(calculatedCapacity);
        if (calculatedCapacity < 3.0) calculatedCapacity = 3.0;
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
    let currentVal = parseFloat(outSize.value) || 3.0;
    let newVal;
    
    // Custom jump logic for 3.0kW to 5.0kW
    if (currentVal === 3.0 && amount > 0) {
        newVal = 5.0;
    } else if (currentVal === 5.0 && amount < 0) {
        newVal = 3.0;
    } else {
        newVal = currentVal + amount;
    }
    
    if (newVal < 3.0) newVal = 3.0;
    if (newVal > 200) newVal = 200;
    // Format to 1 decimal place
    newVal = Math.round(newVal * 10) / 10;
    outSize.value = newVal.toFixed(1);
    handleCapacityInput(newVal);
}

function handlePanelBrandChange() {
    const capacity = parseFloat(outSize.value) || 3.0;
    const units = parseInt(unitsInput.value) || Math.round(capacity * 120);
    performCalculationsDirect(capacity, units, false);
}


function performCalculationsDirect(capacity, units, skipSyncForm = false, syncBill = true) {
    // 2. Solar Panels needed (dynamically based on selected brand watts)
    const brandSelect = document.getElementById('calc-panel-brand');
    const panelWatts = brandSelect ? (parseInt(brandSelect.value) || 550) : 550;
    const panelsCount = Math.ceil((capacity * 1000) / panelWatts);
    
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
    
    // Sync Average Monthly Bill to reflect the recommended capacity (only when capacity is the source)
    if (syncBill) {
        const derivedUnits = Math.round(capacity * 120);
        const derivedBill = unitsToBill(derivedUnits, currentMode);
        billManualInput.value = derivedBill;
        unitsInput.value = derivedUnits;
        unitsDisplay.textContent = derivedUnits.toLocaleString('en-IN');
        if (derivedBill >= parseInt(billInput.min) && derivedBill <= parseInt(billInput.max)) {
            billInput.value = derivedBill;
        } else if (derivedBill < parseInt(billInput.min)) {
            billInput.value = billInput.min;
        } else {
            billInput.value = billInput.max;
        }
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
        
        const formSizeSelect = document.getElementById('form-size-select');
        const manualWrapper = document.getElementById('form-size-manual-wrapper');
        if (formSizeSelect) {
            if (capacity === 3.0) {
                formSizeSelect.value = "3.0";
                if (manualWrapper) manualWrapper.style.display = 'none';
            } else if (capacity === 5.0) {
                formSizeSelect.value = "5.0";
                if (manualWrapper) manualWrapper.style.display = 'none';
            } else {
                formSizeSelect.value = "custom";
                if (manualWrapper) manualWrapper.style.display = 'flex';
            }
        }
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
    
    const size = parseFloat(formSizeEl.value) || 3.0;
    const brandSelect = document.getElementById('calc-panel-brand');
    const panelWatts = brandSelect ? (parseInt(brandSelect.value) || 550) : 550;
    const panels = Math.ceil((size * 1000) / panelWatts);
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
    let currentVal = parseFloat(formSizeEl.value) || 3.0;
    let newVal;
    
    if (currentVal === 3.0 && amount > 0) {
        newVal = 5.0;
    } else if (currentVal === 5.0 && amount < 0) {
        newVal = 3.0;
    } else {
        newVal = currentVal + amount;
    }
    
    if (newVal < 3.0) newVal = 3.0;
    if (newVal > 200) newVal = 200;
    newVal = Math.round(newVal * 10) / 10;
    formSizeEl.value = newVal.toFixed(1);
    
    handleFormSizeChange();
}

// Sync form capacity changes back to calculator recommended capacity and stats
function handleFormSizeChange() {
    const formSizeEl = document.getElementById('form-size');
    if (!formSizeEl) return;
    
    let capacity = parseFloat(formSizeEl.value) || 3.0;
    if (capacity < 3.0) capacity = 3.0;
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

// Function to handle district select changes and dynamically populate KSEB sections
function handleDistrictChange(districtValue) {
    if (!formDealer) return;
    
    // Clear current options
    formDealer.innerHTML = '';
    
    // Sort dealers by district (South to North) with Alappuzha first
    const districtOrder = [
        "Alappuzha",
        "Thiruvananthapuram",
        "Kollam",
        "Pathanamthitta",
        "Kottayam",
        "Idukki",
        "Ernakulam",
        "Thrissur",
        "Palakkad",
        "Malappuram",
        "Kozhikode",
        "Wayanad",
        "Kannur",
        "Kasaragod"
    ];
    
    const allDealers = [...DEALERS].sort((a, b) => {
        // Pin Shinas to the very top
        const isShinasA = a.name.toLowerCase().includes('shinas');
        const isShinasB = b.name.toLowerCase().includes('shinas');
        
        if (isShinasA && !isShinasB) return -1;
        if (!isShinasA && isShinasB) return 1;

        let indexA = districtOrder.indexOf(a.district);
        let indexB = districtOrder.indexOf(b.district);
        
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        
        if (indexA !== indexB) {
            return indexA - indexB;
        }
        return a.area.localeCompare(b.area);
    });
    
    // Populate select menu with ALL dealers across the state
    allDealers.forEach((dealer, index) => {
        const opt = document.createElement('option');
        opt.value = dealer.code;
        opt.textContent = `${dealer.name} | Ph: ${dealer.phone}`;
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
    "Alappuzha": {
        "Alappuzha North": {
            "code": 5501,
            "lat": 9.49942,
            "lon": 76.32596
        },
        "Alappuzha South": {
            "code": 5503,
            "lat": 9.49442,
            "lon": 76.33057
        },
        "Alappuzha Town": {
            "code": 5502,
            "lat": 9.50164,
            "lon": 76.34259
        },
        "Ambalappuzha": {
            "code": 5505,
            "lat": 9.48438,
            "lon": 76.3195
        },
        "Arattupuzha": {
            "code": 5833,
            "lat": 9.19901,
            "lon": 76.4346
        },
        "Arookutty": {
            "code": 5705,
            "lat": 9.86036,
            "lon": 76.33671
        },
        "Aroor": {
            "code": 5515,
            "lat": 9.87831,
            "lon": 76.30388
        },
        "Arthingal": {
            "code": 5518,
            "lat": 9.67098,
            "lon": 76.33272
        },
        "Chambakkulam": {
            "code": 5508,
            "lat": 9.4005,
            "lon": 76.3861
        },
        "Charummood": {
            "code": 5527,
            "lat": 9.17214,
            "lon": 76.60811
        },
        "Chenganoor": {
            "code": 5533,
            "lat": 9.32487,
            "lon": 76.61205
        },
        "Chennithala": {
            "code": 5538,
            "lat": 9.27184,
            "lon": 76.53637
        },
        "Cheppad": {
            "code": 5530,
            "lat": 9.23861,
            "lon": 76.47098
        },
        "Cherthala": {
            "code": 5512,
            "lat": 9.67098,
            "lon": 76.33272
        },
        "Cherthala East": {
            "code": 5704,
            "lat": 9.66091,
            "lon": 76.33922
        },
        "Edathua": {
            "code": 5507,
            "lat": 9.36239,
            "lon": 76.47306
        },
        "Harippad": {
            "code": 5524,
            "lat": 9.29318,
            "lon": 76.41469
        },
        "Kainakari": {
            "code": 5511,
            "lat": 9.51129,
            "lon": 76.39001
        },
        "Kalavoor": {
            "code": 5726,
            "lat": 9.56999,
            "lon": 76.32036
        },
        "Kallissery": {
            "code": 5534,
            "lat": 9.33694,
            "lon": 76.60252
        },
        "Karthikappally": {
            "code": 5526,
            "lat": 9.23847,
            "lon": 76.45902
        },
        "Karuvatta": {
            "code": 5525,
            "lat": 9.31795,
            "lon": 76.42651
        },
        "Kattanam": {
            "code": 5528,
            "lat": 9.17688,
            "lon": 76.56333
        },
        "Kayamkulam East": {
            "code": 5531,
            "lat": 9.14807,
            "lon": 76.49563
        },
        "Kayamkulam West": {
            "code": 5532,
            "lat": 9.14754,
            "lon": 76.49506
        },
        "Kidangara": {
            "code": 5510,
            "lat": 9.42395,
            "lon": 76.50492
        },
        "Kollakadavu": {
            "code": 5537,
            "lat": 9.25495,
            "lon": 76.58733
        },
        "Krishnapuram": {
            "code": 4568,
            "lat": 9.15028,
            "lon": 76.50877
        },
        "Kuthiathode": {
            "code": 5516,
            "lat": 9.79274,
            "lon": 76.31967
        },
        "Mankombu": {
            "code": 5509,
            "lat": 9.43121,
            "lon": 76.47959
        },
        "Mannar": {
            "code": 5539,
            "lat": 9.3174,
            "lon": 76.53386
        },
        "Mavelikkara": {
            "code": 5522,
            "lat": 9.25049,
            "lon": 76.54024
        },
        "Muhamma": {
            "code": 5519,
            "lat": 9.60456,
            "lon": 76.35949
        },
        "Mulakuzha": {
            "code": 5536,
            "lat": 9.29205,
            "lon": 76.64746
        },
        "Muthukulam": {
            "code": 5741,
            "lat": 9.21519,
            "lon": 76.4593
        },
        "Nooranad": {
            "code": 5529,
            "lat": 9.17471,
            "lon": 76.64113
        },
        "Oachira": {
            "code": 4567,
            "lat": 9.16372,
            "lon": 76.52381
        },
        "Pallippad": {
            "code": 5725,
            "lat": 9.28017,
            "lon": 76.47666
        },
        "Pathirappally": {
            "code": 5521,
            "lat": 9.54619,
            "lon": 76.32714
        },
        "Pattanakadu": {
            "code": 5517,
            "lat": 9.50034,
            "lon": 76.41234
        },
        "Poochakkal": {
            "code": 5514,
            "lat": 9.80084,
            "lon": 76.35366
        },
        "Punja Pallom": {
            "code": 4626,
            "lat": 9.19816,
            "lon": 76.65564
        },
        "Punnapra": {
            "code": 5504,
            "lat": 9.44681,
            "lon": 76.32897
        },
        "S.L.Puram": {
            "code": 5520,
            "lat": 9.60594,
            "lon": 76.32899
        },
        "Thakazhy": {
            "code": 5506,
            "lat": 9.37246,
            "lon": 76.41129
        },
        "Thannermukkom": {
            "code": 5513,
            "lat": 9.67585,
            "lon": 76.39231
        },
        "Thattarambalam": {
            "code": 5523,
            "lat": 9.25139,
            "lon": 76.52148
        },
        "Vallikunnam": {
            "code": 5754,
            "lat": 9.13188,
            "lon": 76.56111
        },
        "Venmony": {
            "code": 5824,
            "lat": 9.24799,
            "lon": 76.61582
        }
    },
    "Ernakulam": {
        "Alangad": {
            "code": 5737,
            "lat": 10.12204,
            "lon": 76.3
        },
        "Aluva North": {
            "code": 5568,
            "lat": 10.14526,
            "lon": 76.23165
        },
        "Aluva Town": {
            "code": 5567,
            "lat": 10.10538,
            "lon": 76.35286
        },
        "Aluva West": {
            "code": 5569,
            "lat": 10.09195,
            "lon": 76.34783
        },
        "Amballoor": {
            "code": 5552,
            "lat": 9.85774,
            "lon": 76.40139
        },
        "Angamaly": {
            "code": 5579,
            "lat": 10.19103,
            "lon": 76.38741
        },
        "Arakkunnam": {
            "code": 5553,
            "lat": 9.88651,
            "lon": 76.42909
        },
        "Athani": {
            "code": 5572,
            "lat": 10.15612,
            "lon": 76.35412
        },
        "Chendamangalam": {
            "code": 5606,
            "lat": 10.16917,
            "lon": 76.23409
        },
        "Chengamanad PBVR": {
            "code": 5571,
            "lat": 10.15392,
            "lon": 76.33731
        },
        "Cherai": {
            "code": 5605,
            "lat": 10.14375,
            "lon": 76.1776
        },
        "Cheranellore": {
            "code": 5739,
            "lat": 10.04228,
            "lon": 76.28795
        },
        "Chottanikkara": {
            "code": 5551,
            "lat": 9.93257,
            "lon": 76.38976
        },
        "Chowara": {
            "code": 5570,
            "lat": 10.13385,
            "lon": 76.40347
        },
        "College Ernakulam": {
            "code": 5540,
            "lat": 9.97463,
            "lon": 76.27951
        },
        "Edappally": {
            "code": 5544,
            "lat": 10.02516,
            "lon": 76.31136
        },
        "Edathala": {
            "code": 5750,
            "lat": 10.07069,
            "lon": 76.38349
        },
        "Edayar(Muppathadom)": {
            "code": 5712,
            "lat": 10.08996,
            "lon": 76.31703
        },
        "Eloor": {
            "code": 5574,
            "lat": 10.067,
            "lon": 76.29893
        },
        "Ernakulam Central": {
            "code": 5546,
            "lat": 9.98156,
            "lon": 76.28481
        },
        "Eroor": {
            "code": 5733,
            "lat": 9.98007,
            "lon": 76.32978
        },
        "Ezhikkara": {
            "code": 5603,
            "lat": 10.1112,
            "lon": 76.22925
        },
        "Fort Cochin": {
            "code": 5564,
            "lat": 9.96757,
            "lon": 76.24219
        },
        "Girinagar": {
            "code": 5542,
            "lat": 9.96289,
            "lon": 76.29881
        },
        "Kalady": {
            "code": 5576,
            "lat": 10.17991,
            "lon": 76.4362
        },
        "Kalamassery": {
            "code": 5573,
            "lat": 10.05347,
            "lon": 76.35599
        },
        "Kalloorkad": {
            "code": 5593,
            "lat": 9.96563,
            "lon": 76.67098
        },
        "Kaloor": {
            "code": 5545,
            "lat": 9.99512,
            "lon": 76.29204
        },
        "Kanjoor": {
            "code": 5747,
            "lat": 10.14461,
            "lon": 76.42467
        },
        "Kannamali": {
            "code": 5560,
            "lat": 9.87538,
            "lon": 76.2643
        },
        "Karakutty": {
            "code": 5581,
            "lat": 11.28485,
            "lon": 75.98923
        },
        "Keerampara": {
            "code": 5713,
            "lat": 10.10013,
            "lon": 76.65071
        },
        "Kizhakkambalam": {
            "code": 5586,
            "lat": 10.03543,
            "lon": 76.40698
        },
        "Kolencherry": {
            "code": 5554,
            "lat": 9.97968,
            "lon": 76.47315
        },
        "Koothattukulam": {
            "code": 5598,
            "lat": 9.91782,
            "lon": 76.60514
        },
        "Koovappady": {
            "code": 5590,
            "lat": 10.16288,
            "lon": 76.48724
        },
        "Kothamangalam-I": {
            "code": 5600,
            "lat": 10.06405,
            "lon": 76.63009
        },
        "Kothamangalam-II": {
            "code": 5601,
            "lat": 10.05956,
            "lon": 76.59586
        },
        "Kumbalangi": {
            "code": 5561,
            "lat": 9.87406,
            "lon": 76.28944
        },
        "Kunnukara": {
            "code": 5575,
            "lat": 10.15471,
            "lon": 76.29541
        },
        "Kurupampady": {
            "code": 5588,
            "lat": 9.96852,
            "lon": 76.28204
        },
        "Kuzhoor": {
            "code": 5657,
            "lat": 10.05034,
            "lon": 76.51759
        },
        "Malayattoor": {
            "code": 5715,
            "lat": 10.18629,
            "lon": 76.50394
        },
        "Manjalloor": {
            "code": 5752,
            "lat": 9.93781,
            "lon": 76.66496
        },
        "Manjapra": {
            "code": 5578,
            "lat": 10.20813,
            "lon": 76.45269
        },
        "Mannam": {
            "code": 5736,
            "lat": 10.18903,
            "lon": 76.24997
        },
        "Maradu": {
            "code": 5550,
            "lat": 9.93628,
            "lon": 76.31586
        },
        "Mattancherry": {
            "code": 5563,
            "lat": 9.95835,
            "lon": 76.25918
        },
        "Meloor": {
            "code": 5650,
            "lat": 10.28412,
            "lon": 76.43191
        },
        "Mookannur": {
            "code": 5582,
            "lat": 10.22386,
            "lon": 76.41381
        },
        "Moothakunnam": {
            "code": 5608,
            "lat": 10.20518,
            "lon": 76.20086
        },
        "Moovattupuzha-I": {
            "code": 5591,
            "lat": 9.76529,
            "lon": 76.56205
        },
        "Moovattupuzha-II": {
            "code": 5594,
            "lat": 10.05956,
            "lon": 76.59586
        },
        "Mulanthuruthy": {
            "code": 5748,
            "lat": 9.90086,
            "lon": 76.38886
        },
        "Nellikuzhy": {
            "code": 5751,
            "lat": 10.07687,
            "lon": 76.59194
        },
        "Njarackkal": {
            "code": 5566,
            "lat": 9.96852,
            "lon": 76.28204
        },
        "North Paravur": {
            "code": 5604,
            "lat": 10.15221,
            "lon": 76.2211
        },
        "Okkal": {
            "code": 5738,
            "lat": 10.15494,
            "lon": 76.4438
        },
        "Palarivattom": {
            "code": 5543,
            "lat": 10.00253,
            "lon": 76.30621
        },
        "Palluruthy": {
            "code": 5559,
            "lat": 9.92121,
            "lon": 76.27406
        },
        "Pampakuda": {
            "code": 5599,
            "lat": 9.92242,
            "lon": 76.52082
        },
        "Panangad": {
            "code": 5735,
            "lat": 9.88695,
            "lon": 76.33297
        },
        "Parakadavu PBVR": {
            "code": 5580,
            "lat": 10.01666,
            "lon": 76.60504
        },
        "Pattimattom": {
            "code": 5587,
            "lat": 9.54534,
            "lon": 76.81724
        },
        "Perumbavoor": {
            "code": 5583,
            "lat": 10.11827,
            "lon": 76.47988
        },
        "Piravom": {
            "code": 5597,
            "lat": 9.87681,
            "lon": 76.48634
        },
        "Pothanikad": {
            "code": 5592,
            "lat": 10.01129,
            "lon": 76.6875
        },
        "Puthencruz": {
            "code": 5555,
            "lat": 9.96941,
            "lon": 76.42325
        },
        "Puthenvelikkara": {
            "code": 5659,
            "lat": 10.18576,
            "lon": 76.24552
        },
        "Thevakkal": {
            "code": 5558,
            "lat": 10.04636,
            "lon": 76.36375
        },
        "Thevara": {
            "code": 5541,
            "lat": 9.93613,
            "lon": 76.29829
        },
        "Thiruvaniyoor": {
            "code": 5734,
            "lat": 9.93392,
            "lon": 76.42481
        },
        "Thodupuzha-I": {
            "code": 5618,
            "lat": 9.91406,
            "lon": 76.6457
        },
        "Thodupuzha-II": {
            "code": 5620,
            "lat": 9.91406,
            "lon": 76.6457
        },
        "Thoppumpady": {
            "code": 5562,
            "lat": 9.93481,
            "lon": 76.26007
        },
        "Thrikkakkara": {
            "code": 5557,
            "lat": 10.04705,
            "lon": 76.32805
        },
        "Thrikkakkara West": {
            "code": 5731,
            "lat": 10.04705,
            "lon": 76.32805
        },
        "Thripunithura": {
            "code": 5548,
            "lat": 10.01392,
            "lon": 76.31141
        },
        "Thuravoor": {
            "code": 5577,
            "lat": 10.22032,
            "lon": 76.42783
        },
        "Udayamperoor": {
            "code": 5549,
            "lat": 9.91427,
            "lon": 76.36267
        },
        "Vadakkekkara": {
            "code": 5607,
            "lat": 10.15918,
            "lon": 76.21311
        },
        "Vaduthala": {
            "code": 5547,
            "lat": 10.01182,
            "lon": 76.27693
        },
        "Valayanchirangara": {
            "code": 5596,
            "lat": 10.06579,
            "lon": 76.49453
        },
        "Varapuzha": {
            "code": 5602,
            "lat": 10.07894,
            "lon": 76.27483
        },
        "Vazhakulam": {
            "code": 5584,
            "lat": 9.94393,
            "lon": 76.64038
        },
        "Velloorkunnam": {
            "code": 5595,
            "lat": 9.99041,
            "lon": 76.57804
        },
        "Vengola": {
            "code": 5585,
            "lat": 10.08064,
            "lon": 76.46625
        },
        "Vengoor": {
            "code": 5589,
            "lat": 10.18229,
            "lon": 76.41186
        },
        "Vennala": {
            "code": 5732,
            "lat": 10.00164,
            "lon": 76.32265
        },
        "Vypin": {
            "code": 5565,
            "lat": 10.0781,
            "lon": 76.20597
        },
        "Vyttila": {
            "code": 5556,
            "lat": 9.96734,
            "lon": 76.31753
        }
    },
    "Idukki": {
        "Adimali": {
            "code": 5617,
            "lat": 10.0114,
            "lon": 76.95785
        },
        "Alakode-Thodupuzha": {
            "code": 5753,
            "lat": 9.87363,
            "lon": 76.76437
        },
        "Anakkara": {
            "code": 5742,
            "lat": 9.6647,
            "lon": 77.1581
        },
        "Chithirapuram": {
            "code": 5615,
            "lat": 10.03278,
            "lon": 77.04208
        },
        "Erattayar": {
            "code": 5724,
            "lat": 9.8201,
            "lon": 77.07442
        },
        "Kalloorkad": {
            "code": 5593,
            "lat": 9.96563,
            "lon": 76.67098
        },
        "Kambilikandom": {
            "code": 5710,
            "lat": 9.94051,
            "lon": 77.01563
        },
        "Kanchiyar": {
            "code": 5746,
            "lat": 9.7453,
            "lon": 77.07533
        },
        "Kanjikuzhy": {
            "code": 5722,
            "lat": 9.95139,
            "lon": 76.93897
        },
        "Karimannur": {
            "code": 5621,
            "lat": 9.81548,
            "lon": 76.99916
        },
        "Kattapana": {
            "code": 5609,
            "lat": 9.73915,
            "lon": 77.11456
        },
        "Koothattukulam": {
            "code": 5598,
            "lat": 9.88341,
            "lon": 76.63591
        },
        "Kothamangalam-II": {
            "code": 5601,
            "lat": 9.92328,
            "lon": 77.07157
        },
        "Kumily": {
            "code": 5708,
            "lat": 9.93645,
            "lon": 76.96597
        },
        "Manjalloor": {
            "code": 5752,
            "lat": 9.93781,
            "lon": 76.66496
        },
        "Marayoor": {
            "code": 5616,
            "lat": 10.27574,
            "lon": 77.16204
        },
        "Moolamattom": {
            "code": 5619,
            "lat": 9.78965,
            "lon": 76.85965
        },
        "Murikkassery": {
            "code": 5711,
            "lat": 9.81548,
            "lon": 76.99916
        },
        "Nedumkandam": {
            "code": 5610,
            "lat": 9.8413,
            "lon": 77.15305
        },
        "Painavu": {
            "code": 5623,
            "lat": 9.85401,
            "lon": 76.94465
        },
        "Peerumade": {
            "code": 5612,
            "lat": 9.52298,
            "lon": 77.14348
        },
        "Peruvanthanam": {
            "code": 5720,
            "lat": 9.5528,
            "lon": 76.92682
        },
        "Pothanikad": {
            "code": 5592,
            "lat": 10.00783,
            "lon": 76.68822
        },
        "Purappuzha": {
            "code": 5743,
            "lat": 9.86853,
            "lon": 76.66836
        },
        "Rajakkad": {
            "code": 5730,
            "lat": 9.96397,
            "lon": 77.09692
        },
        "Rajakumary": {
            "code": 5709,
            "lat": 9.97416,
            "lon": 77.15855
        },
        "Thodupuzha-I": {
            "code": 5618,
            "lat": 9.84805,
            "lon": 76.96176
        },
        "Thodupuzha-II": {
            "code": 5620,
            "lat": 9.91298,
            "lon": 76.65068
        },
        "Thookkupalam": {
            "code": 5723,
            "lat": 9.81275,
            "lon": 77.19362
        },
        "Udumbanchola": {
            "code": 5755,
            "lat": 9.86013,
            "lon": 77.17086
        },
        "Upputhara": {
            "code": 5613,
            "lat": 9.69995,
            "lon": 77.0209
        },
        "Vandanmedu": {
            "code": 5611,
            "lat": 9.72307,
            "lon": 77.15454
        },
        "Vandiperiyar": {
            "code": 5614,
            "lat": 9.57292,
            "lon": 77.09189
        },
        "Vannapuram": {
            "code": 5622,
            "lat": 9.98191,
            "lon": 76.78316
        }
    },
    "Kannur": {
        "Alakkode": {
            "code": 6648,
            "lat": 12.18418,
            "lon": 75.44094
        },
        "Azheekode": {
            "code": 6662,
            "lat": 11.937,
            "lon": 75.40016
        },
        "Burnasseri": {
            "code": 6655,
            "lat": 11.87638,
            "lon": 75.3738
        },
        "Chakkarakallu": {
            "code": 6660,
            "lat": 11.87638,
            "lon": 75.3738
        },
        "Chalode": {
            "code": 6661,
            "lat": 11.91228,
            "lon": 75.5451
        },
        "Chapparappadavu": {
            "code": 6745,
            "lat": 12.08585,
            "lon": 75.34512
        },
        "Chemperi": {
            "code": 6721,
            "lat": 12.09582,
            "lon": 75.54711
        },
        "Cherukunnu": {
            "code": 6664,
            "lat": 11.99733,
            "lon": 75.29545
        },
        "Cherupuzha": {
            "code": 6816,
            "lat": 12.25637,
            "lon": 75.38554
        },
        "Chokli": {
            "code": 6671,
            "lat": 11.7262,
            "lon": 75.55721
        },
        "Chovva": {
            "code": 6657,
            "lat": 11.91727,
            "lon": 75.54478
        },
        "Dharmadom": {
            "code": 6677,
            "lat": 11.77671,
            "lon": 75.46855
        },
        "Dharmassala": {
            "code": 6646,
            "lat": 11.87638,
            "lon": 75.3738
        },
        "Eaichur": {
            "code": 6659,
            "lat": 11.87638,
            "lon": 75.3738
        },
        "Edoor": {
            "code": 6722,
            "lat": 11.99815,
            "lon": 75.72622
        },
        "Irikkur": {
            "code": 6649,
            "lat": 11.88487,
            "lon": 75.50512
        },
        "Iritty": {
            "code": 6674,
            "lat": 11.97731,
            "lon": 75.72316
        },
        "Kadachira": {
            "code": 6658,
            "lat": 11.83599,
            "lon": 75.45022
        },
        "Kakkayangad": {
            "code": 6787,
            "lat": 11.93729,
            "lon": 75.70647
        },
        "Kannur": {
            "code": 6654,
            "lat": 11.87638,
            "lon": 75.3738
        },
        "Karimbam": {
            "code": 6645,
            "lat": 12.03907,
            "lon": 75.34119
        },
        "Karivellur": {
            "code": 6651,
            "lat": 12.1788,
            "lon": 75.18928
        },
        "Karthikapuram": {
            "code": 6799,
            "lat": 12.22967,
            "lon": 75.48146
        },
        "Kathiroor": {
            "code": 6682,
            "lat": 11.78587,
            "lon": 75.53208
        },
        "Kelakom": {
            "code": 6759,
            "lat": 11.87638,
            "lon": 75.3738
        },
        "Kodiyeri": {
            "code": 6670,
            "lat": 11.74644,
            "lon": 75.53022
        },
        "Kolachery": {
            "code": 6666,
            "lat": 11.96689,
            "lon": 75.39792
        },
        "Kolayad": {
            "code": 6758,
            "lat": 11.85311,
            "lon": 75.69659
        },
        "Koothuparamba": {
            "code": 6680,
            "lat": 11.83039,
            "lon": 75.5333
        },
        "Kunhimangalam": {
            "code": 6639,
            "lat": 12.07236,
            "lon": 75.23655
        },
        "Madai": {
            "code": 6643,
            "lat": 12.05758,
            "lon": 75.26346
        },
        "Mathamangalam": {
            "code": 6641,
            "lat": 12.13454,
            "lon": 75.29981
        },
        "Mattannur": {
            "code": 6675,
            "lat": 11.91727,
            "lon": 75.54478
        },
        "Mayyil": {
            "code": 6667,
            "lat": 11.91593,
            "lon": 75.45719
        },
        "Padiyottuchal": {
            "code": 6652,
            "lat": 12.25385,
            "lon": 75.33525
        },
        "Pallikunnu": {
            "code": 6653,
            "lat": 11.89145,
            "lon": 75.35016
        },
        "Panoor": {
            "code": 6672,
            "lat": 11.75983,
            "lon": 75.57776
        },
        "Pappinisseri": {
            "code": 6663,
            "lat": 11.94432,
            "lon": 75.34448
        },
        "Parad": {
            "code": 6673,
            "lat": 12.01715,
            "lon": 75.377
        },
        "Pariyaram Kannur": {
            "code": 6760,
            "lat": 12.06888,
            "lon": 75.29545
        },
        "Pattiyam": {
            "code": 6681,
            "lat": 11.87638,
            "lon": 75.3738
        },
        "Payyangadi": {
            "code": 6642,
            "lat": 11.87638,
            "lon": 75.3738
        },
        "Payyanur": {
            "code": 6638,
            "lat": 12.09189,
            "lon": 75.19518
        },
        "Payyavur": {
            "code": 6775,
            "lat": 12.06522,
            "lon": 75.58123
        },
        "Peralassery": {
            "code": 6790,
            "lat": 11.84412,
            "lon": 75.47382
        },
        "Peringathur": {
            "code": 6817,
            "lat": 11.71548,
            "lon": 75.58481
        },
        "Pinarayi": {
            "code": 6679,
            "lat": 11.81025,
            "lon": 75.49476
        },
        "Ramanthali": {
            "code": 6640,
            "lat": 12.06044,
            "lon": 75.19035
        },
        "Sivapuram": {
            "code": 6776,
            "lat": 11.91554,
            "lon": 75.62511
        },
        "Sreekantapuram": {
            "code": 6647,
            "lat": 12.04350,
            "lon": 75.54920
        },
        "Thalassery North": {
            "code": 6669,
            "lat": 11.79441,
            "lon": 75.49672
        },
        "Thalassery South": {
            "code": 6668,
            "lat": 11.79071,
            "lon": 75.56212
        },
        "Thaliparamba": {
            "code": 6644,
            "lat": 12.04219,
            "lon": 75.36694
        },
        "Thayyil": {
            "code": 6656,
            "lat": 11.90264,
            "lon": 75.36401
        },
        "Thondiyil": {
            "code": 6676,
            "lat": 11.89775,
            "lon": 75.74267
        },
        "Ulikkal": {
            "code": 6761,
            "lat": 12.04021,
            "lon": 75.66363
        },
        "Valapattanam": {
            "code": 6665,
            "lat": 11.92738,
            "lon": 75.34637
        },
        "Vallithode": {
            "code": 6813,
            "lat": 12.03524,
            "lon": 75.71164
        },
        "Vellur": {
            "code": 6650,
            "lat": 12.15152,
            "lon": 75.21231
        },
        "Vengad": {
            "code": 6678,
            "lat": 11.88396,
            "lon": 75.53314
        }
    },
    "Kasaragod": {
        "Badiadka": {
            "code": 6690,
            "lat": 12.58876,
            "lon": 75.07296
        },
        "Balamthode": {
            "code": 6773,
            "lat": 12.49147,
            "lon": 74.98776
        },
        "Bhimanadi": {
            "code": 6697,
            "lat": 12.49147,
            "lon": 74.98776
        },
        "Chattanchal": {
            "code": 6772,
            "lat": 12.47835,
            "lon": 75.05845
        },
        "Cherkala": {
            "code": 6689,
            "lat": 12.50899,
            "lon": 75.05728
        },
        "Cherupuzha": {
            "code": 6816,
            "lat": 12.30206,
            "lon": 75.36531
        },
        "Chittari": {
            "code": 6695,
            "lat": 12.35634,
            "lon": 75.06935
        },
        "Choyamkode": {
            "code": 6750,
            "lat": 12.28789,
            "lon": 75.19271
        },
        "Kanhangad": {
            "code": 6694,
            "lat": 12.50494,
            "lon": 74.99356
        },
        "Karivellur": {
            "code": 6651,
            "lat": 12.19014,
            "lon": 75.17509
        },
        "Kasargode": {
            "code": 6688,
            "lat": 12.51944,
            "lon": 74.97759
        },
        "Kayyur": {
            "code": 6699,
            "lat": 12.25643,
            "lon": 75.20873
        },
        "Kumbala": {
            "code": 6687,
            "lat": 12.59012,
            "lon": 74.94361
        },
        "Kuttikole": {
            "code": 6693,
            "lat": 12.48065,
            "lon": 75.20948
        },
        "Manjeswar": {
            "code": 6684,
            "lat": 12.72899,
            "lon": 74.89271
        },
        "Mavungal": {
            "code": 6701,
            "lat": 12.44887,
            "lon": 75.2321
        },
        "Mulleria": {
            "code": 6691,
            "lat": 12.5492,
            "lon": 75.16512
        },
        "Nallompuzha": {
            "code": 6749,
            "lat": 12.29963,
            "lon": 75.36502
        },
        "Neeleswar": {
            "code": 6696,
            "lat": 12.26482,
            "lon": 75.15432
        },
        "Nellikunnu": {
            "code": 6686,
            "lat": 12.50357,
            "lon": 74.97957
        },
        "Padanna": {
            "code": 6723,
            "lat": 12.18045,
            "lon": 75.14922
        },
        "Padannakkad": {
            "code": 6804,
            "lat": 12.26558,
            "lon": 75.11406
        },
        "Paivalika": {
            "code": 6757,
            "lat": 12.70162,
            "lon": 74.98643
        },
        "Periya Bazar": {
            "code": 6774,
            "lat": 12.38832,
            "lon": 75.10169
        },
        "Perla": {
            "code": 6800,
            "lat": 12.64539,
            "lon": 75.10727
        },
        "Pilicode": {
            "code": 6698,
            "lat": 12.19759,
            "lon": 75.16105
        },
        "Rajapuram": {
            "code": 6702,
            "lat": 12.4225,
            "lon": 75.24647
        },
        "Seethangoli": {
            "code": 6818,
            "lat": 12.58936,
            "lon": 75.00184
        },
        "Thrikaripur": {
            "code": 6700,
            "lat": 12.14383,
            "lon": 75.17743
        },
        "Udma": {
            "code": 6692,
            "lat": 12.43149,
            "lon": 75.10146
        },
        "Uppala": {
            "code": 6683,
            "lat": 12.68521,
            "lon": 74.90562
        },
        "Vellur": {
            "code": 6650,
            "lat": 12.49147,
            "lon": 74.98776
        },
        "Vorkady": {
            "code": 6685,
            "lat": 12.76129,
            "lon": 74.95315
        }
    },
    "Kollam": {
        "Anchal": {
            "code": 4597,
            "lat": 8.92927,
            "lon": 76.9065
        },
        "Anchal West": {
            "code": 4669,
            "lat": 8.92996,
            "lon": 76.90541
        },
        "Ayathil": {
            "code": 4565,
            "lat": 8.89287,
            "lon": 76.62918
        },
        "Ayoor": {
            "code": 4591,
            "lat": 8.8898,
            "lon": 76.61776
        },
        "Cantonment Kollam": {
            "code": 4558,
            "lat": 8.88622,
            "lon": 76.59548
        },
        "Chadayamangalam": {
            "code": 4672,
            "lat": 8.90029,
            "lon": 76.85408
        },
        "Chathannoor": {
            "code": 4575,
            "lat": 8.86372,
            "lon": 76.71325
        },
        "Chavara": {
            "code": 4571,
            "lat": 8.97557,
            "lon": 76.53457
        },
        "Chengamanad KTRA": {
            "code": 4590,
            "lat": 9.01396,
            "lon": 76.82591
        },
        "Chithara": {
            "code": 4662,
            "lat": 8.81496,
            "lon": 76.96719
        },
        "East kallada": {
            "code": 4583,
            "lat": 9.01695,
            "lon": 76.6528
        },
        "Ezhukone": {
            "code": 4582,
            "lat": 8.97952,
            "lon": 76.71533
        },
        "Kadakkal": {
            "code": 4599,
            "lat": 8.82676,
            "lon": 76.92001
        },
        "Kadambanad": {
            "code": 4613,
            "lat": 9.10279,
            "lon": 76.71126
        },
        "Kadappakkada": {
            "code": 4559,
            "lat": 8.89228,
            "lon": 76.60352
        },
        "Kallambalam": {
            "code": 4533,
            "lat": 8.72904,
            "lon": 76.73848
        },
        "Kanjiramkuzhy": {
            "code": 4670,
            "lat": 8.8932,
            "lon": 76.6141
        },
        "Kannanalloor": {
            "code": 4579,
            "lat": 8.89392,
            "lon": 76.68054
        },
        "Karavaloor": {
            "code": 4677,
            "lat": 8.98077,
            "lon": 76.92504
        },
        "Karukone": {
            "code": 4661,
            "lat": 8.90298,
            "lon": 76.93546
        },
        "Karunagappally North": {
            "code": 4569,
            "lat": 9.09367,
            "lon": 76.50703
        },
        "Karunagappally South": {
            "code": 4570,
            "lat": 9.12031,
            "lon": 76.49261
        },
        "Kilikolloor": {
            "code": 4564,
            "lat": 8.8933,
            "lon": 76.61818
        },
        "Kottarakkara": {
            "code": 4587,
            "lat": 9.00549,
            "lon": 76.7832
        },
        "Kottarakkara East": {
            "code": 4683,
            "lat": 9.02348,
            "lon": 76.77633
        },
        "Kottiyam": {
            "code": 4578,
            "lat": 8.86607,
            "lon": 76.67093
        },
        "Kulakkada": {
            "code": 4588,
            "lat": 9.07872,
            "lon": 76.75311
        },
        "Kulathupuzha": {
            "code": 4598,
            "lat": 8.9091,
            "lon": 77.05445
        },
        "Kundara": {
            "code": 4581,
            "lat": 8.96022,
            "lon": 76.67824
        },
        "Madavoor": {
            "code": 4536,
            "lat": 8.82296,
            "lon": 76.82911
        },
        "Manapally": {
            "code": 4658,
            "lat": 9.10672,
            "lon": 76.5729
        },
        "Mayyanad": {
            "code": 4580,
            "lat": 8.83959,
            "lon": 76.64593
        },
        "Mynagappally": {
            "code": 4659,
            "lat": 9.03954,
            "lon": 76.58402
        },
        "Nallila": {
            "code": 4586,
            "lat": 8.92637,
            "lon": 76.71033
        },
        "Oachira": {
            "code": 4567,
            "lat": 9.13576,
            "lon": 76.51052
        },
        "Olai": {
            "code": 4560,
            "lat": 8.88705,
            "lon": 76.59067
        },
        "Oyoor": {
            "code": 4660,
            "lat": 8.87397,
            "lon": 76.76876
        },
        "Pallimukku": {
            "code": 4566,
            "lat": 8.8763,
            "lon": 76.62366
        },
        "Panmana": {
            "code": 4682,
            "lat": 9.0011,
            "lon": 76.53182
        },
        "Paravoor": {
            "code": 4576,
            "lat": 8.81369,
            "lon": 76.66997
        },
        "Parippally": {
            "code": 4577,
            "lat": 8.81266,
            "lon": 76.75841
        },
        "Pathanapuram": {
            "code": 4595,
            "lat": 9.0927,
            "lon": 76.8563
        },
        "Pattazhy": {
            "code": 4685,
            "lat": 9.08034,
            "lon": 76.79617
        },
        "Perinad": {
            "code": 4563,
            "lat": 8.94846,
            "lon": 76.62089
        },
        "Perumpuzha": {
            "code": 4585,
            "lat": 8.93879,
            "lon": 76.67931
        },
        "Piravanthoor": {
            "code": 4668,
            "lat": 9.05545,
            "lon": 76.87417
        },
        "Poothakulam": {
            "code": 4671,
            "lat": 8.81575,
            "lon": 76.69186
        },
        "Punalur": {
            "code": 4593,
            "lat": 9.01746,
            "lon": 76.92648
        },
        "Puthur Kottarakkara": {
            "code": 4589,
            "lat": 9.06009,
            "lon": 76.75378
        },
        "Sakthikulangara": {
            "code": 4561,
            "lat": 8.92943,
            "lon": 76.54875
        },
        "Sasthamcotta": {
            "code": 4573,
            "lat": 9.04167,
            "lon": 76.6296
        },
        "Sooranad": {
            "code": 4574,
            "lat": 9.10334,
            "lon": 76.63429
        },
        "Thankasserry": {
            "code": 4562,
            "lat": 8.88705,
            "lon": 76.59067
        },
        "Thenmala": {
            "code": 4594,
            "lat": 8.96527,
            "lon": 77.06996
        },
        "Thevalakkara": {
            "code": 4572,
            "lat": 8.99767,
            "lon": 76.57824
        },
        "Valakom": {
            "code": 4592,
            "lat": 8.96348,
            "lon": 76.83582
        },
        "Vallikunnam": {
            "code": 5754,
            "lat": 9.11479,
            "lon": 76.54183
        },
        "Veliyam": {
            "code": 4584,
            "lat": 8.91514,
            "lon": 76.7659
        },
        "Vilakkudi": {
            "code": 4596,
            "lat": 9.02969,
            "lon": 76.86728
        }
    },
    "Kottayam": {
        "Athirampuzha": {
            "code": 4664,
            "lat": 9.66395,
            "lon": 76.53147
        },
        "Ayarkunnam": {
            "code": 4632,
            "lat": 9.63784,
            "lon": 76.60079
        },
        "Aymanam": {
            "code": 4629,
            "lat": 9.61215,
            "lon": 76.49979
        },
        "Bharananganam": {
            "code": 5627,
            "lat": 9.70034,
            "lon": 76.72711
        },
        "Changanachery": {
            "code": 4636,
            "lat": 9.44844,
            "lon": 76.54938
        },
        "Chempu": {
            "code": 4644,
            "lat": 9.80693,
            "lon": 76.39698
        },
        "Erattupetta": {
            "code": 5630,
            "lat": 9.68799,
            "lon": 76.77977
        },
        "Erumely": {
            "code": 5637,
            "lat": 9.48131,
            "lon": 76.84444
        },
        "Ettumanur": {
            "code": 4646,
            "lat": 9.67359,
            "lon": 76.56095
        },
        "Gandhinagar": {
            "code": 4628,
            "lat": 9.63093,
            "lon": 76.52546
        },
        "Kaduthuruthy": {
            "code": 4651,
            "lat": 9.76551,
            "lon": 76.49223
        },
        "Kanjirappally": {
            "code": 5636,
            "lat": 9.55831,
            "lon": 76.79136
        },
        "Karukachal": {
            "code": 4641,
            "lat": 9.50116,
            "lon": 76.63836
        },
        "Kidangoor": {
            "code": 5625,
            "lat": 9.66815,
            "lon": 76.62154
        },
        "Kollappally": {
            "code": 5740,
            "lat": 9.77083,
            "lon": 76.70243
        },
        "Kooroppada": {
            "code": 5749,
            "lat": 9.59853,
            "lon": 76.64564
        },
        "Koothattukulam": {
            "code": 5598,
            "lat": 9.82202,
            "lon": 76.60827
        },
        "Koottikkal": {
            "code": 5721,
            "lat": 10.20592,
            "lon": 76.17397
        },
        "Kottayam Central": {
            "code": 4634,
            "lat": 9.58925,
            "lon": 76.51677
        },
        "Kottayam East": {
            "code": 4635,
            "lat": 9.58887,
            "lon": 76.53462
        },
        "Kumarakam": {
            "code": 4630,
            "lat": 9.59074,
            "lon": 76.43908
        },
        "Kuravilangad": {
            "code": 4649,
            "lat": 9.75731,
            "lon": 76.56159
        },
        "Kurichy": {
            "code": 4637,
            "lat": 9.50232,
            "lon": 76.51226
        },
        "Kuruppanthara": {
            "code": 4647,
            "lat": 9.74124,
            "lon": 76.51722
        },
        "Manarcad": {
            "code": 4631,
            "lat": 9.59993,
            "lon": 76.58496
        },
        "Manimala": {
            "code": 4642,
            "lat": 9.54698,
            "lon": 76.56831
        },
        "Manipuzha": {
            "code": 4620,
            "lat": 9.56707,
            "lon": 76.51924
        },
        "Marangattupally": {
            "code": 5628,
            "lat": 9.76325,
            "lon": 76.59357
        },
        "Meenadom": {
            "code": 4689,
            "lat": 9.55061,
            "lon": 76.60958
        },
        "Mundakkayam": {
            "code": 5638,
            "lat": 9.53682,
            "lon": 76.88551
        },
        "Nattakam": {
            "code": 4627,
            "lat": 9.52648,
            "lon": 76.51447
        },
        "Neendoor": {
            "code": 4648,
            "lat": 9.68129,
            "lon": 76.50632
        },
        "Paika": {
            "code": 5626,
            "lat": 9.65543,
            "lon": 76.72245
        },
        "Pala": {
            "code": 5624,
            "lat": 9.71307,
            "lon": 76.68313
        },
        "Pallickathode": {
            "code": 5707,
            "lat": 9.60966,
            "lon": 76.70612
        },
        "Pallom": {
            "code": 4625,
            "lat": 9.52855,
            "lon": 76.51491
        },
        "Pampady": {
            "code": 5635,
            "lat": 9.57808,
            "lon": 76.6224
        },
        "Parathode": {
            "code": 5745,
            "lat": 9.57328,
            "lon": 76.82594
        },
        "Pathanad": {
            "code": 4684,
            "lat": 9.50876,
            "lon": 76.694
        },
        "Peruva": {
            "code": 4686,
            "lat": 9.82768,
            "lon": 76.50113
        },
        "Pinnakkanad": {
            "code": 5632,
            "lat": 9.62899,
            "lon": 76.77092
        },
        "Piravom": {
            "code": 5597,
            "lat": 9.81517,
            "lon": 76.48507
        },
        "Ponkunnam": {
            "code": 5633,
            "lat": 9.56574,
            "lon": 76.76345
        },
        "Poonjar": {
            "code": 5631,
            "lat": 9.67376,
            "lon": 76.81303
        },
        "Punja Pallom": {
            "code": 4626,
            "lat": 9.52855,
            "lon": 76.51491
        },
        "Puthuppally": {
            "code": 4633,
            "lat": 9.56142,
            "lon": 76.57214
        },
        "Ramapuram": {
            "code": 5629,
            "lat": 9.8002,
            "lon": 76.6621
        },
        "Teekoy": {
            "code": 5744,
            "lat": 9.6986,
            "lon": 76.80776
        },
        "Thalayazham": {
            "code": 4645,
            "lat": 9.7144,
            "lon": 76.4259
        },
        "Thalayolaparambu": {
            "code": 4650,
            "lat": 9.78556,
            "lon": 76.44749
        },
        "Thengana": {
            "code": 4638,
            "lat": 9.5554,
            "lon": 76.57008
        },
        "Thiruvalla": {
            "code": 4617,
            "lat": 9.42587,
            "lon": 76.58565
        },
        "Thodupuzha-I": {
            "code": 5618,
            "lat": 9.77326,
            "lon": 76.76242
        },
        "Thrikkodithanam": {
            "code": 4640,
            "lat": 9.43915,
            "lon": 76.56569
        },
        "Vaikom": {
            "code": 4643,
            "lat": 9.74978,
            "lon": 76.3926
        },
        "Vakathanam": {
            "code": 4639,
            "lat": 9.51385,
            "lon": 76.563
        },
        "Vandiperiyar": {
            "code": 5614,
            "lat": 9.57292,
            "lon": 77.09189
        },
        "Vazhoor": {
            "code": 5634,
            "lat": 9.5632,
            "lon": 76.69956
        }
    },
    "Kozhikode": {
        "Areekkad": {
            "code": 6789,
            "lat": 11.21273,
            "lon": 75.80575
        },
        "Areekkulam": {
            "code": 6767,
            "lat": 11.04693,
            "lon": 75.97966
        },
        "Atholi": {
            "code": 6615,
            "lat": 11.32334,
            "lon": 75.76427
        },
        "Ayenchery": {
            "code": 6624,
            "lat": 11.61751,
            "lon": 75.67069
        },
        "Azhiyoor": {
            "code": 6743,
            "lat": 11.68841,
            "lon": 75.54308
        },
        "Balussery": {
            "code": 6613,
            "lat": 11.32895,
            "lon": 75.80944
        },
        "Beach Kozhikkode": {
            "code": 6603,
            "lat": 11.25034,
            "lon": 75.79963
        },
        "Beypur": {
            "code": 6635,
            "lat": 11.24506,
            "lon": 75.77547
        },
        "Central Kozhikode": {
            "code": 6602,
            "lat": 11.28284,
            "lon": 75.76167
        },
        "Chakkittapara": {
            "code": 6716,
            "lat": 11.57631,
            "lon": 75.81696
        },
        "Chelannur": {
            "code": 6744,
            "lat": 11.33964,
            "lon": 75.81025
        },
        "Edacherri": {
            "code": 6627,
            "lat": 11.24506,
            "lon": 75.77547
        },
        "Eranhikkal": {
            "code": 6606,
            "lat": 11.33241,
            "lon": 75.76771
        },
        "Feroke": {
            "code": 6631,
            "lat": 11.17651,
            "lon": 75.83131
        },
        "Kadalundi": {
            "code": 6632,
            "lat": 11.13811,
            "lon": 75.83343
        },
        "Kakkattil": {
            "code": 6735,
            "lat": 11.31334,
            "lon": 75.88354
        },
        "Kakkodi": {
            "code": 6599,
            "lat": 11.42,
            "lon": 75.78495
        },
        "Kakkoor": {
            "code": 6764,
            "lat": 11.38915,
            "lon": 75.82184
        },
        "Kallai": {
            "code": 6634,
            "lat": 11.23639,
            "lon": 75.78571
        },
        "Karaparamba": {
            "code": 6598,
            "lat": 11.2871,
            "lon": 75.78175
        },
        "Kattangal": {
            "code": 6747,
            "lat": 11.31866,
            "lon": 75.93951
        },
        "Keezhuparamba": {
            "code": 6707,
            "lat": 11.25367,
            "lon": 76.02197
        },
        "Kodencheri": {
            "code": 6612,
            "lat": 11.68201,
            "lon": 75.62986
        },
        "Koduvally": {
            "code": 6611,
            "lat": 11.38533,
            "lon": 75.91751
        },
        "Koombara": {
            "code": 6805,
            "lat": 11.25613,
            "lon": 76.04385
        },
        "Koorachundu": {
            "code": 6763,
            "lat": 11.53972,
            "lon": 75.84475
        },
        "Koottalida": {
            "code": 6765,
            "lat": 11.5057,
            "lon": 75.80359
        },
        "Kovoor": {
            "code": 6595,
            "lat": 11.24244,
            "lon": 75.83233
        },
        "Kunnamangalam": {
            "code": 6607,
            "lat": 11.29297,
            "lon": 75.87363
        },
        "Kuttiyadi": {
            "code": 6629,
            "lat": 11.32334,
            "lon": 75.76427
        },
        "Maniyoor": {
            "code": 6717,
            "lat": 11.54601,
            "lon": 75.64189
        },
        "Mankavu": {
            "code": 6636,
            "lat": 11.23553,
            "lon": 75.80795
        },
        "Mavoor": {
            "code": 6596,
            "lat": 11.2608,
            "lon": 75.95299
        },
        "Melady": {
            "code": 6620,
            "lat": 11.51828,
            "lon": 75.62655
        },
        "Meppayoor": {
            "code": 6617,
            "lat": 11.24506,
            "lon": 75.77547
        },
        "Moodadi": {
            "code": 6766,
            "lat": 11.47002,
            "lon": 75.65823
        },
        "Mukkam": {
            "code": 6608,
            "lat": 11.32248,
            "lon": 75.99488
        },
        "Muttungal": {
            "code": 6625,
            "lat": 11.63021,
            "lon": 75.57555
        },
        "Nadakkave": {
            "code": 6601,
            "lat": 11.27105,
            "lon": 75.77633
        },
        "Nadapuram": {
            "code": 6628,
            "lat": 11.63919,
            "lon": 75.57545
        },
        "Naduvannur": {
            "code": 6618,
            "lat": 11.48623,
            "lon": 75.77348
        },
        "Narikkuni": {
            "code": 6600,
            "lat": 11.37125,
            "lon": 75.84964
        },
        "Omassery": {
            "code": 6751,
            "lat": 11.36438,
            "lon": 75.96501
        },
        "Orkkatteri": {
            "code": 6626,
            "lat": 11.65309,
            "lon": 75.60198
        },
        "Pannikkode": {
            "code": 6777,
            "lat": 10.74188,
            "lon": 76.6181
        },
        "Pantheerankavu": {
            "code": 6637,
            "lat": 11.23103,
            "lon": 75.85032
        },
        "Parakkadavu KKD": {
            "code": 6724,
            "lat": 11.30491,
            "lon": 75.85956
        },
        "Parappupara": {
            "code": 6752,
            "lat": 11.72599,
            "lon": 75.71009
        },
        "Perambra": {
            "code": 6616,
            "lat": 11.55994,
            "lon": 75.7545
        },
        "Perambra North": {
            "code": 6778,
            "lat": 11.548,
            "lon": 75.71602
        },
        "Peringathur": {
            "code": 6817,
            "lat": 11.71548,
            "lon": 75.58481
        },
        "Perumanna": {
            "code": 6734,
            "lat": 11.23979,
            "lon": 75.8787
        },
        "Pottammal": {
            "code": 6597,
            "lat": 11.26019,
            "lon": 75.80831
        },
        "Puthuppady": {
            "code": 6732,
            "lat": 11.46788,
            "lon": 75.98337
        },
        "Quilandi North": {
            "code": 6619,
            "lat": 11.4462,
            "lon": 75.69337
        },
        "Quilandi South": {
            "code": 6621,
            "lat": 11.4462,
            "lon": 75.69337
        },
        "Ramanattukara": {
            "code": 6633,
            "lat": 11.17809,
            "lon": 75.86562
        },
        "Thamarassery": {
            "code": 6610,
            "lat": 11.41861,
            "lon": 75.93656
        },
        "Thikkody": {
            "code": 6746,
            "lat": 11.24506,
            "lon": 75.77547
        },
        "Thiruvallur": {
            "code": 6738,
            "lat": 11.59233,
            "lon": 75.67419
        },
        "Thiruvambadi": {
            "code": 6609,
            "lat": 11.39677,
            "lon": 76.03751
        },
        "Thottilpalam": {
            "code": 6630,
            "lat": 11.67664,
            "lon": 75.77859
        },
        "Thuneri": {
            "code": 6731,
            "lat": 11.70865,
            "lon": 75.63017
        },
        "Unnikulam": {
            "code": 6614,
            "lat": 11.43561,
            "lon": 75.87883
        },
        "Vadakara Beach": {
            "code": 6737,
            "lat": 11.62284,
            "lon": 75.57048
        },
        "Vadakara North": {
            "code": 6623,
            "lat": 11.67829,
            "lon": 75.61833
        },
        "Vadakara South": {
            "code": 6622,
            "lat": 11.68736,
            "lon": 75.54638
        },
        "Vellimadukunnu": {
            "code": 6605,
            "lat": 11.28974,
            "lon": 75.81886
        },
        "WestHill": {
            "code": 6604,
            "lat": 11.29073,
            "lon": 75.76053
        }
    },
    "Malappuram": {
        "Akambadam": {
            "code": 6796,
            "lat": 11.3108,
            "lon": 76.20873
        },
        "Alathiyur": {
            "code": 6574,
            "lat": 10.86189,
            "lon": 75.93711
        },
        "Anakkayam": {
            "code": 6756,
            "lat": 11.08348,
            "lon": 76.11264
        },
        "Angadippuram": {
            "code": 6748,
            "lat": 10.97642,
            "lon": 76.20132
        },
        "Areekode": {
            "code": 6549,
            "lat": 11.23456,
            "lon": 76.04918
        },
        "Chalissery": {
            "code": 6538,
            "lat": 10.77091,
            "lon": 75.9289
        },
        "Changaramkulam": {
            "code": 6585,
            "lat": 10.73963,
            "lon": 76.03033
        },
        "Chattiparamba": {
            "code": 6708,
            "lat": 11.00943,
            "lon": 76.0886
        },
        "Chelari": {
            "code": 6577,
            "lat": 11.10775,
            "lon": 75.89064
        },
        "Cherpulassery": {
            "code": 6541,
            "lat": 10.88073,
            "lon": 76.31681
        },
        "Chungathara": {
            "code": 6713,
            "lat": 11.3173,
            "lon": 76.26394
        },
        "Edakkara": {
            "code": 6544,
            "lat": 11.35641,
            "lon": 76.30475
        },
        "Edappal": {
            "code": 6584,
            "lat": 10.78379,
            "lon": 76.00779
        },
        "Edarikode": {
            "code": 6558,
            "lat": 10.994,
            "lon": 75.98077
        },
        "Edavanna": {
            "code": 6548,
            "lat": 11.21333,
            "lon": 76.13851
        },
        "Edavannappara": {
            "code": 6550,
            "lat": 11.24585,
            "lon": 75.97742
        },
        "Edayoor": {
            "code": 6769,
            "lat": 11.10684,
            "lon": 76.10996
        },
        "Ezhuvathurithy": {
            "code": 6802,
            "lat": 11.10684,
            "lon": 76.10996
        },
        "Kadalundi": {
            "code": 6632,
            "lat": 11.08038,
            "lon": 76.12252
        },
        "Kadampuzha": {
            "code": 6572,
            "lat": 10.94552,
            "lon": 76.04047
        },
        "Kadungathukundu": {
            "code": 6741,
            "lat": 10.93978,
            "lon": 75.97629
        },
        "Kalikavu": {
            "code": 6560,
            "lat": 11.17059,
            "lon": 76.3229
        },
        "Kandanakom-Kalady": {
            "code": 6755,
            "lat": 10.81043,
            "lon": 75.99145
        },
        "Karad": {
            "code": 6768,
            "lat": 10.96345,
            "lon": 75.87636
        },
        "Karulai": {
            "code": 6795,
            "lat": 11.29049,
            "lon": 76.30142
        },
        "Karuvarakundu": {
            "code": 6794,
            "lat": 11.12509,
            "lon": 76.34225
        },
        "Keezhuparamba": {
            "code": 6707,
            "lat": 11.25367,
            "lon": 76.02197
        },
        "Kizzhissery": {
            "code": 6551,
            "lat": 11.10684,
            "lon": 76.10996
        },
        "Kolathur": {
            "code": 6567,
            "lat": 10.94144,
            "lon": 76.13896
        },
        "Kondotty": {
            "code": 6552,
            "lat": 11.14572,
            "lon": 75.96438
        },
        "Koombara": {
            "code": 6805,
            "lat": 11.08077,
            "lon": 76.05016
        },
        "Kottakkal": {
            "code": 6557,
            "lat": 11.00048,
            "lon": 76.00476
        },
        "Kumbidi": {
            "code": 6812,
            "lat": 10.829,
            "lon": 76.02258
        },
        "Kunnumpuram (AR Nagar)": {
            "code": 6739,
            "lat": 11.07006,
            "lon": 75.94459
        },
        "Kuttipuram": {
            "code": 6712,
            "lat": 10.61961,
            "lon": 76.11394
        },
        "Makkaraparamba": {
            "code": 6565,
            "lat": 11.01723,
            "lon": 76.12046
        },
        "Malappuram East": {
            "code": 6555,
            "lat": 10.73892,
            "lon": 76.03506
        },
        "Malappuram West": {
            "code": 6780,
            "lat": 11.11225,
            "lon": 76.05422
        },
        "Mampad": {
            "code": 6814,
            "lat": 11.24439,
            "lon": 76.20297
        },
        "Manjeri North": {
            "code": 6547,
            "lat": 10.91602,
            "lon": 75.92426
        },
        "Manjeri South": {
            "code": 6546,
            "lat": 11.1178,
            "lon": 76.11967
        },
        "Mankada": {
            "code": 6711,
            "lat": 11.01857,
            "lon": 76.17548
        },
        "Melattoor": {
            "code": 6563,
            "lat": 11.10684,
            "lon": 76.10996
        },
        "Moothedam": {
            "code": 6807,
            "lat": 11.3345,
            "lon": 76.3101
        },
        "Mundakkulam": {
            "code": 6823,
            "lat": 11.19095,
            "lon": 75.97105
        },
        "Nilambur": {
            "code": 6543,
            "lat": 11.28651,
            "lon": 76.24074
        },
        "Oorakam": {
            "code": 6808,
            "lat": 11.06282,
            "lon": 76.0175
        },
        "Othukungal": {
            "code": 6709,
            "lat": 11.02595,
            "lon": 76.02891
        },
        "Pandikkad": {
            "code": 6561,
            "lat": 11.11875,
            "lon": 76.23077
        },
        "Pannikkode": {
            "code": 6777,
            "lat": 10.74188,
            "lon": 76.6181
        },
        "Parappanangadi": {
            "code": 6575,
            "lat": 11.05079,
            "lon": 75.864
        },
        "Pattikkad Chungam": {
            "code": 6779,
            "lat": 11.0163,
            "lon": 76.2288
        },
        "Perinthalmanna": {
            "code": 6562,
            "lat": 10.98121,
            "lon": 76.19226
        },
        "Perumpadappu": {
            "code": 6803,
            "lat": 10.69892,
            "lon": 75.98821
        },
        "Ponmundam (Vylathur)": {
            "code": 6570,
            "lat": 10.95662,
            "lon": 75.9558
        },
        "Ponnani": {
            "code": 6581,
            "lat": 10.78007,
            "lon": 75.91893
        },
        "Pookottumpadam": {
            "code": 6545,
            "lat": 11.10684,
            "lon": 76.10996
        },
        "Pothukallu": {
            "code": 6310,
            "lat": 11.45364,
            "lon": 76.24315
        },
        "Pulamanthole": {
            "code": 6564,
            "lat": 10.90125,
            "lon": 76.19033
        },
        "Pulikkal": {
            "code": 6553,
            "lat": 11.22754,
            "lon": 75.98982
        },
        "Purangu": {
            "code": 6583,
            "lat": 10.75091,
            "lon": 75.95447
        },
        "Purathur": {
            "code": 6781,
            "lat": 10.8051,
            "lon": 75.92064
        },
        "Puthenathani": {
            "code": 6571,
            "lat": 11.10684,
            "lon": 76.10996
        },
        "Puzhakkattiri": {
            "code": 6820,
            "lat": 10.98658,
            "lon": 76.14699
        },
        "Thalappara": {
            "code": 6580,
            "lat": 11.07245,
            "lon": 75.9027
        },
        "Thanalur": {
            "code": 6736,
            "lat": 10.95109,
            "lon": 75.909
        },
        "Thanur": {
            "code": 6576,
            "lat": 11.10684,
            "lon": 76.10996
        },
        "Thanur East": {
            "code": 6798,
            "lat": 10.73892,
            "lon": 76.03506
        },
        "Thavanur": {
            "code": 6582,
            "lat": 10.85266,
            "lon": 75.9839
        },
        "Thazhecode": {
            "code": 6710,
            "lat": 11.10684,
            "lon": 76.10996
        },
        "Thirunavaya": {
            "code": 6573,
            "lat": 10.86124,
            "lon": 75.97184
        },
        "Thiruvali": {
            "code": 6770,
            "lat": 11.19969,
            "lon": 76.17742
        },
        "Thrikkalangode": {
            "code": 6706,
            "lat": 11.15727,
            "lon": 76.14999
        },
        "Thuvvakkad": {
            "code": 6797,
            "lat": 10.90973,
            "lon": 75.96939
        },
        "Tirur East": {
            "code": 6568,
            "lat": 11.06839,
            "lon": 76.10696
        },
        "Tirur West": {
            "code": 6569,
            "lat": 10.98581,
            "lon": 75.96811
        },
        "Tirurangadi": {
            "code": 6578,
            "lat": 11.04223,
            "lon": 75.92793
        },
        "Tuvvur": {
            "code": 6815,
            "lat": 11.11966,
            "lon": 76.2832
        },
        "Valancheri": {
            "code": 6566,
            "lat": 11.12138,
            "lon": 76.02235
        },
        "Vallikunnu": {
            "code": 6715,
            "lat": 11.09242,
            "lon": 75.85115
        },
        "Vaniyambalam": {
            "code": 6793,
            "lat": 11.18773,
            "lon": 76.26066
        },
        "Vazhikkadavu": {
            "code": 6714,
            "lat": 11.36877,
            "lon": 76.3275
        },
        "Velluvambram": {
            "code": 6554,
            "lat": 11.12282,
            "lon": 76.05226
        },
        "Vengara": {
            "code": 6556,
            "lat": 11.04914,
            "lon": 75.96327
        },
        "Venniyoor": {
            "code": 6579,
            "lat": 11.0187,
            "lon": 75.95009
        },
        "Vettom": {
            "code": 6730,
            "lat": 10.87556,
            "lon": 75.91197
        },
        "Wandoor": {
            "code": 6559,
            "lat": 11.19386,
            "lon": 76.23405
        }
    },
    "Palakkad": {
        "Agali": {
            "code": 6516,
            "lat": 11.1,
            "lon": 76.64486
        },
        "Alanallur": {
            "code": 6521,
            "lat": 11.01119,
            "lon": 76.34671
        },
        "Alathur": {
            "code": 6509,
            "lat": 10.6459,
            "lon": 76.54361
        },
        "Ambalappara": {
            "code": 6534,
            "lat": 10.83467,
            "lon": 76.41015
        },
        "Big Bazar Palakkad": {
            "code": 6518,
            "lat": 10.7725,
            "lon": 76.64547
        },
        "Chalissery": {
            "code": 6538,
            "lat": 10.73533,
            "lon": 76.08756
        },
        "Cherpulassery": {
            "code": 6541,
            "lat": 10.87749,
            "lon": 76.31387
        },
        "Chittur": {
            "code": 6501,
            "lat": 10.75957,
            "lon": 76.6655
        },
        "Desamangalam": {
            "code": 5717,
            "lat": 10.75451,
            "lon": 76.23119
        },
        "Elapully": {
            "code": 6530,
            "lat": 10.75834,
            "lon": 76.75173
        },
        "Kadambazhippuram": {
            "code": 6786,
            "lat": 10.78737,
            "lon": 76.47422
        },
        "Kalpathy": {
            "code": 6531,
            "lat": 10.79112,
            "lon": 76.65086
        },
        "Kanjikode": {
            "code": 6528,
            "lat": 10.80028,
            "lon": 76.75477
        },
        "Kanjirapuzha": {
            "code": 6771,
            "lat": 10.84692,
            "lon": 76.46629
        },
        "Kayaradi": {
            "code": 6822,
            "lat": 10.61084,
            "lon": 76.56436
        },
        "Kizhakkancherry": {
            "code": 6754,
            "lat": 9.30867,
            "lon": 76.56685
        },
        "Koduvayur": {
            "code": 6505,
            "lat": 10.69429,
            "lon": 76.65965
        },
        "Kollengode": {
            "code": 6510,
            "lat": 10.61254,
            "lon": 76.69739
        },
        "Kongad": {
            "code": 6523,
            "lat": 10.85477,
            "lon": 76.52206
        },
        "Koottupatha": {
            "code": 6791,
            "lat": 10.77345,
            "lon": 76.69119
        },
        "Koppam": {
            "code": 6537,
            "lat": 10.77776,
            "lon": 76.65913
        },
        "Kothakurussy": {
            "code": 6542,
            "lat": 10.78737,
            "lon": 76.47422
        },
        "Kottathara": {
            "code": 6785,
            "lat": 11.13288,
            "lon": 76.68561
        },
        "Kottayi": {
            "code": 6526,
            "lat": 10.77303,
            "lon": 76.53648
        },
        "Kozhinjampara": {
            "code": 6502,
            "lat": 10.74247,
            "lon": 76.74555
        },
        "Kumaramputhur": {
            "code": 6742,
            "lat": 10.98736,
            "lon": 76.42903
        },
        "Kumbidi": {
            "code": 6812,
            "lat": 10.82001,
            "lon": 76.64333
        },
        "Kunnissery": {
            "code": 6726,
            "lat": 10.63029,
            "lon": 76.47213
        },
        "Kuthannur": {
            "code": 6728,
            "lat": 10.71082,
            "lon": 76.58682
        },
        "Kuzhalmannam": {
            "code": 6525,
            "lat": 10.71943,
            "lon": 76.59485
        },
        "Lakkidi": {
            "code": 6824,
            "lat": 10.77445,
            "lon": 76.43197
        },
        "Malampuzha": {
            "code": 6725,
            "lat": 10.82853,
            "lon": 76.6857
        },
        "Mannarkkad": {
            "code": 6520,
            "lat": 10.82182,
            "lon": 76.59838
        },
        "Marutharoad": {
            "code": 6529,
            "lat": 10.77827,
            "lon": 76.70201
        },
        "Melamuri": {
            "code": 6519,
            "lat": 10.77693,
            "lon": 76.63749
        },
        "Mudappallur": {
            "code": 6514,
            "lat": 10.59095,
            "lon": 76.51715
        },
        "Mundur Palakkad": {
            "code": 6740,
            "lat": 10.84887,
            "lon": 76.57838
        },
        "Muthalamada": {
            "code": 6511,
            "lat": 10.60646,
            "lon": 76.75972
        },
        "Muthuthala": {
            "code": 6704,
            "lat": 10.83692,
            "lon": 76.15969
        },
        "Nelliampathy": {
            "code": 6512,
            "lat": 10.5934,
            "lon": 76.60003
        },
        "Nemmara": {
            "code": 6513,
            "lat": 10.59395,
            "lon": 76.60144
        },
        "Olavakkode": {
            "code": 6532,
            "lat": 10.7993,
            "lon": 76.63757
        },
        "Ongallur": {
            "code": 6801,
            "lat": 10.80285,
            "lon": 76.21862
        },
        "Ottappalam": {
            "code": 6533,
            "lat": 10.90357,
            "lon": 76.43527
        },
        "Padinjarangadi": {
            "code": 6540,
            "lat": 10.79454,
            "lon": 76.05146
        },
        "Padoor": {
            "code": 6507,
            "lat": 10.65524,
            "lon": 76.4753
        },
        "Parali": {
            "code": 6527,
            "lat": 10.80073,
            "lon": 76.55576
        },
        "Pathirippala": {
            "code": 6729,
            "lat": 10.78925,
            "lon": 76.47637
        },
        "Pattambi": {
            "code": 6536,
            "lat": 10.80486,
            "lon": 76.17802
        },
        "Pengattiri": {
            "code": 6784,
            "lat": 10.86357,
            "lon": 76.27711
        },
        "Peringode": {
            "code": 6705,
            "lat": 10.86239,
            "lon": 76.48265
        },
        "Peringottukurissy": {
            "code": 6727,
            "lat": 10.78737,
            "lon": 76.47422
        },
        "Pudunagaram": {
            "code": 6506,
            "lat": 10.68293,
            "lon": 76.68815
        },
        "Puthucode": {
            "code": 6508,
            "lat": 10.63392,
            "lon": 76.44984
        },
        "Shoranur": {
            "code": 6535,
            "lat": 10.76713,
            "lon": 76.27386
        },
        "Sreekrishnapuram": {
            "code": 6524,
            "lat": 10.90357,
            "lon": 76.43527
        },
        "Sulthanpet": {
            "code": 6517,
            "lat": 10.77799,
            "lon": 76.6613
        },
        "Tachampara": {
            "code": 6522,
            "lat": 10.78737,
            "lon": 76.47422
        },
        "Tattamangalam": {
            "code": 6504,
            "lat": 10.68334,
            "lon": 76.70884
        },
        "Thazhecode": {
            "code": 6710,
            "lat": 10.78737,
            "lon": 76.47422
        },
        "Thiruvegapura": {
            "code": 6753,
            "lat": 10.87509,
            "lon": 76.12714
        },
        "Thrithala": {
            "code": 6539,
            "lat": 10.80327,
            "lon": 76.12899
        },
        "Vadakkumchery": {
            "code": 6515,
            "lat": 10.78737,
            "lon": 76.47422
        },
        "Vadavannur": {
            "code": 6810,
            "lat": 10.6435,
            "lon": 76.69369
        },
        "Vallapuzha": {
            "code": 6703,
            "lat": 10.84054,
            "lon": 76.2523
        },
        "Vandithavalam": {
            "code": 6809,
            "lat": 10.65594,
            "lon": 76.74551
        },
        "Vaniyamkulam": {
            "code": 6733,
            "lat": 10.78116,
            "lon": 76.32996
        },
        "Velanthavalam": {
            "code": 6503,
            "lat": 10.81652,
            "lon": 76.8617
        },
        "Vilayur": {
            "code": 6821,
            "lat": 10.89538,
            "lon": 76.18829
        },
        "Walayar": {
            "code": 6819,
            "lat": 10.84679,
            "lon": 76.83759
        }
    },
    "Pathanamthitta": {
        "Adoor": {
            "code": 4609,
            "lat": 9.26546,
            "lon": 76.7901
        },
        "Aranmula": {
            "code": 5535,
            "lat": 9.32681,
            "lon": 76.6857
        },
        "Ayirur Kathakali Gramam": {
            "code": 4608,
            "lat": null,
            "lon": null
        },
        "Changanachery": {
            "code": 4636,
            "lat": 9.27808,
            "lon": 76.97374
        },
        "Elavumthitta": {
            "code": 4616,
            "lat": 9.26929,
            "lon": 76.70156
        },
        "Enathu": {
            "code": 4806,
            "lat": 9.09372,
            "lon": 76.75975
        },
        "Erumely": {
            "code": 5637,
            "lat": 9.27808,
            "lon": 76.97374
        },
        "Ezhamkulam": {
            "code": 4611,
            "lat": 9.14499,
            "lon": 76.7694
        },
        "Kadambanad": {
            "code": 4613,
            "lat": 9.09192,
            "lon": 76.68661
        },
        "Kadapra": {
            "code": 4621,
            "lat": 9.33115,
            "lon": 76.52534
        },
        "Kaippattoor": {
            "code": 4610,
            "lat": 9.16221,
            "lon": 76.74411
        },
        "Kakkad": {
            "code": 4604,
            "lat": 9.35245,
            "lon": 76.85531
        },
        "Kalanjoor": {
            "code": 4612,
            "lat": 9.12885,
            "lon": 76.85353
        },
        "Karukachal": {
            "code": 4641,
            "lat": 9.50115,
            "lon": 76.64011
        },
        "Konni": {
            "code": 4602,
            "lat": 9.29021,
            "lon": 76.81388
        },
        "Kozhenchery": {
            "code": 4605,
            "lat": 9.33697,
            "lon": 76.70643
        },
        "Kulanada": {
            "code": 4615,
            "lat": 9.24345,
            "lon": 76.67197
        },
        "Kumbanad": {
            "code": 4619,
            "lat": 9.36741,
            "lon": 76.65685
        },
        "Kumbazha": {
            "code": 4601,
            "lat": 9.28846,
            "lon": 76.81427
        },
        "Mallappally": {
            "code": 4623,
            "lat": 9.44595,
            "lon": 76.65534
        },
        "Manimala": {
            "code": 4642,
            "lat": 9.36984,
            "lon": 76.59056
        },
        "Pandalam": {
            "code": 4614,
            "lat": 9.22508,
            "lon": 76.67848
        },
        "Pandalam Thekkekkara": {
            "code": 4692,
            "lat": 9.20866,
            "lon": 76.73067
        },
        "Pathanamthitta": {
            "code": 4600,
            "lat": 9.27808,
            "lon": 76.97374
        },
        "Pathanapuram": {
            "code": 4595,
            "lat": 9.09563,
            "lon": 76.85252
        },
        "Ranni Perunad": {
            "code": 4690,
            "lat": 9.35712,
            "lon": 76.86593
        },
        "Ranny North": {
            "code": 4607,
            "lat": 9.39465,
            "lon": 76.80675
        },
        "Ranny South": {
            "code": 4606,
            "lat": 9.39465,
            "lon": 76.80675
        },
        "Thengamom": {
            "code": 4663,
            "lat": 9.12139,
            "lon": 76.6575
        },
        "Thiruvalla": {
            "code": 4617,
            "lat": 9.29926,
            "lon": 76.72985
        },
        "Thottabhagom": {
            "code": 4618,
            "lat": 9.384,
            "lon": 76.6153
        },
        "Vadasserikkara": {
            "code": 4603,
            "lat": 9.34078,
            "lon": 76.82933
        },
        "Vaipur": {
            "code": 4624,
            "lat": 9.45628,
            "lon": 76.70091
        },
        "Vakayar": {
            "code": 4687,
            "lat": 9.19659,
            "lon": 76.85084
        },
        "Vechoochira": {
            "code": 4665,
            "lat": 9.43511,
            "lon": 76.85368
        },
        "Venmony": {
            "code": 5824,
            "lat": 9.24474,
            "lon": 76.66476
        },
        "Vennikulam": {
            "code": 4622,
            "lat": 9.38336,
            "lon": 76.78153
        }
    },
    "Thiruvananthapuram": {
        "Amboori": {
            "code": 4656,
            "lat": 8.50558,
            "lon": 77.18804
        },
        "Aryanad": {
            "code": 4652,
            "lat": 8.57558,
            "lon": 77.08773
        },
        "Attingal": {
            "code": 4531,
            "lat": 8.6986,
            "lon": 76.81344
        },
        "Avanavancherry": {
            "code": 4532,
            "lat": 8.6934,
            "lon": 76.83786
        },
        "Balaramapuram": {
            "code": 4542,
            "lat": 8.40873,
            "lon": 77.03534
        },
        "Beach Trivandrum": {
            "code": 4513,
            "lat": 8.56998,
            "lon": 76.83884
        },
        "Cantonment TVM": {
            "code": 4506,
            "lat": 8.49849,
            "lon": 76.94963
        },
        "Chirayinkeezhu": {
            "code": 4529,
            "lat": 8.65083,
            "lon": 76.78944
        },
        "Chullimanoor": {
            "code": 4653,
            "lat": 8.6371,
            "lon": 77.02504
        },
        "Edava": {
            "code": 4526,
            "lat": 8.76402,
            "lon": 76.6932
        },
        "Fort Trivandrum": {
            "code": 4503,
            "lat": 8.48668,
            "lon": 76.95327
        },
        "Kachani": {
            "code": 4691,
            "lat": 8.55426,
            "lon": 76.98986
        },
        "Kadakkavoor": {
            "code": 4528,
            "lat": 8.68272,
            "lon": 76.77061
        },
        "Kallambalam": {
            "code": 4533,
            "lat": 8.76293,
            "lon": 76.79192
        },
        "Kallara": {
            "code": 4557,
            "lat": 8.753,
            "lon": 76.93886
        },
        "Kalliyoor": {
            "code": 4675,
            "lat": 8.43269,
            "lon": 77.01676
        },
        "Kamukinkode": {
            "code": 4868,
            "lat": 8.39302,
            "lon": 77.06359
        },
        "Kaniyapuram": {
            "code": 4522,
            "lat": 8.58766,
            "lon": 76.85607
        },
        "Kanjiramkulam": {
            "code": 4544,
            "lat": 8.3601,
            "lon": 77.05259
        },
        "Kanyakulangara": {
            "code": 4556,
            "lat": 8.62681,
            "lon": 76.90543
        },
        "Karamana": {
            "code": 4510,
            "lat": 8.48171,
            "lon": 76.9663
        },
        "Kattakada": {
            "code": 4552,
            "lat": 8.51239,
            "lon": 77.10151
        },
        "Kazhakuttam": {
            "code": 4521,
            "lat": 8.55682,
            "lon": 76.87275
        },
        "Kedakulam": {
            "code": 4527,
            "lat": 8.79583,
            "lon": 76.71613
        },
        "Kesavadasapuram": {
            "code": 4516,
            "lat": 8.52971,
            "lon": 76.9384
        },
        "Kilimannoor": {
            "code": 4535,
            "lat": 8.77913,
            "lon": 76.88339
        },
        "Kottukal": {
            "code": 4657,
            "lat": 8.36783,
            "lon": 77.03509
        },
        "Kudappanakkunnu": {
            "code": 4676,
            "lat": 8.55463,
            "lon": 76.96282
        },
        "Kulathoor": {
            "code": 4520,
            "lat": 8.54108,
            "lon": 76.88001
        },
        "Kunnathukal": {
            "code": 4667,
            "lat": 8.39018,
            "lon": 77.16163
        },
        "Madavoor": {
            "code": 4536,
            "lat": 8.80675,
            "lon": 76.82485
        },
        "Malayinkeezh": {
            "code": 4666,
            "lat": 8.49932,
            "lon": 77.02932
        },
        "Manacaud": {
            "code": 4501,
            "lat": 8.4752,
            "lon": 76.94792
        },
        "Mangalapuram": {
            "code": 4523,
            "lat": 8.62424,
            "lon": 76.84861
        },
        "Maranalloor": {
            "code": 4553,
            "lat": 8.47209,
            "lon": 77.07239
        },
        "Marayamuttom": {
            "code": 4539,
            "lat": 8.41643,
            "lon": 77.1052
        },
        "Nagaroor": {
            "code": 4654,
            "lat": 8.73381,
            "lon": 76.84862
        },
        "Nalanchira": {
            "code": 4518,
            "lat": 8.54611,
            "lon": 76.94434
        },
        "Nedumangad": {
            "code": 4547,
            "lat": 8.68262,
            "lon": 77.13513
        },
        "Nemom": {
            "code": 4543,
            "lat": 8.45913,
            "lon": 76.99855
        },
        "Neyyattinkara": {
            "code": 4537,
            "lat": 8.38584,
            "lon": 77.06504
        },
        "Ottasekharamangalam": {
            "code": 4554,
            "lat": 8.47664,
            "lon": 77.13547
        },
        "Palachira": {
            "code": 4534,
            "lat": 8.73412,
            "lon": 76.74439
        },
        "Pallickal [Attingal Dvn.]": {
            "code": 4680,
            "lat": null,
            "lon": null
        },
        "Palode": {
            "code": 4548,
            "lat": 8.72183,
            "lon": 77.02841
        },
        "Parassala": {
            "code": 4540,
            "lat": 8.3429,
            "lon": 77.15478
        },
        "Paravoor": {
            "code": 4576,
            "lat": 8.69895,
            "lon": 76.83174
        },
        "Peringamala": {
            "code": 4674,
            "lat": 8.41721,
            "lon": 77.01823
        },
        "Peroorkada": {
            "code": 4508,
            "lat": 8.53539,
            "lon": 76.96622
        },
        "Pettah": {
            "code": 4514,
            "lat": 8.49503,
            "lon": 76.93178
        },
        "Peyad": {
            "code": 4550,
            "lat": 8.50805,
            "lon": 77.00273
        },
        "Poojappura": {
            "code": 4512,
            "lat": 8.48985,
            "lon": 76.9736
        },
        "Poonthura": {
            "code": 4679,
            "lat": 8.44356,
            "lon": 76.94399
        },
        "Poothakulam": {
            "code": 4671,
            "lat": 8.48823,
            "lon": 76.94755
        },
        "Poovachal": {
            "code": 4864,
            "lat": 8.53398,
            "lon": 77.08622
        },
        "Poovar": {
            "code": 4545,
            "lat": 8.31874,
            "lon": 77.07065
        },
        "Poozhikunnu": {
            "code": 4688,
            "lat": 8.46972,
            "lon": 76.99803
        },
        "Pothencode": {
            "code": 4524,
            "lat": 8.61923,
            "lon": 76.89806
        },
        "Puthenchantha": {
            "code": 4504,
            "lat": 8.72954,
            "lon": 76.73528
        },
        "Sreekariyam": {
            "code": 4519,
            "lat": 8.54834,
            "lon": 76.91723
        },
        "Sreevaraham": {
            "code": 4515,
            "lat": 8.47777,
            "lon": 76.94278
        },
        "Thirumala": {
            "code": 4511,
            "lat": 8.50185,
            "lon": 76.992
        },
        "Thiruvallam": {
            "code": 4502,
            "lat": 8.4404,
            "lon": 76.95845
        },
        "Tholicode": {
            "code": 4681,
            "lat": 8.64804,
            "lon": 77.05889
        },
        "Thycaud": {
            "code": 4505,
            "lat": 8.4893,
            "lon": 76.96453
        },
        "Uchakkada": {
            "code": 4655,
            "lat": 8.31601,
            "lon": 77.09723
        },
        "Udiyankulangara": {
            "code": 4538,
            "lat": 8.37967,
            "lon": 77.12091
        },
        "Ulloor": {
            "code": 4517,
            "lat": 8.53001,
            "lon": 76.92862
        },
        "Uzhamalakkal": {
            "code": 4673,
            "lat": 8.60405,
            "lon": 77.05421
        },
        "Vakkom": {
            "code": 4530,
            "lat": 8.68874,
            "lon": 76.75636
        },
        "Vamanapuram": {
            "code": 4821,
            "lat": 8.66776,
            "lon": 76.89554
        },
        "Varkala": {
            "code": 4525,
            "lat": 8.73668,
            "lon": 76.7248
        },
        "Vattappara": {
            "code": 4678,
            "lat": 8.40738,
            "lon": 76.97095
        },
        "Vattiyoorkavu": {
            "code": 4509,
            "lat": 8.52501,
            "lon": 76.98906
        },
        "Vellanad": {
            "code": 4551,
            "lat": 8.56298,
            "lon": 77.05574
        },
        "Vellarada": {
            "code": 4541,
            "lat": 8.43026,
            "lon": 77.19586
        },
        "Vellayambalam": {
            "code": 4507,
            "lat": 8.51024,
            "lon": 76.96083
        },
        "Venjaramood": {
            "code": 4555,
            "lat": 8.72242,
            "lon": 76.89806
        },
        "Vithura": {
            "code": 4549,
            "lat": 8.68262,
            "lon": 77.13513
        },
        "Vizhinjam": {
            "code": 4546,
            "lat": 8.40873,
            "lon": 77.03534
        }
    },
    "Thrissur": {
        "Ammadam": {
            "code": 5670,
            "lat": 10.45622,
            "lon": 76.18211
        },
        "Annamanada": {
            "code": 5648,
            "lat": 10.23485,
            "lon": 76.33088
        },
        "Arimboor": {
            "code": 5679,
            "lat": 10.50463,
            "lon": 76.13492
        },
        "Ayyanthole": {
            "code": 5678,
            "lat": 10.533,
            "lon": 76.18858
        },
        "Beach Chavakkad": {
            "code": 5699,
            "lat": 10.56932,
            "lon": 76.00912
        },
        "Big Bazar Thrissur": {
            "code": 5702,
            "lat": 10.53481,
            "lon": 76.2154
        },
        "Chalakkudy": {
            "code": 5651,
            "lat": 10.26815,
            "lon": 76.35428
        },
        "Chalissery": {
            "code": 6538,
            "lat": 10.50577,
            "lon": 76.22573
        },
        "Chavakkad": {
            "code": 5698,
            "lat": 10.56932,
            "lon": 76.00912
        },
        "Chelakara": {
            "code": 5691,
            "lat": 10.72547,
            "lon": 76.31732
        },
        "Cherpu": {
            "code": 5639,
            "lat": 10.43867,
            "lon": 76.20919
        },
        "Cheruthuruthy": {
            "code": 5692,
            "lat": 10.74696,
            "lon": 76.27512
        },
        "Chirakkal": {
            "code": 5642,
            "lat": 10.5225,
            "lon": 76.21024
        },
        "Desamangalam": {
            "code": 5717,
            "lat": 10.52837,
            "lon": 76.18351
        },
        "Eriyad": {
            "code": 5665,
            "lat": 10.22288,
            "lon": 76.1585
        },
        "Guruvayoor": {
            "code": 5697,
            "lat": 10.59592,
            "lon": 76.05001
        },
        "Irinjalakuda- I": {
            "code": 5644,
            "lat": 10.34065,
            "lon": 76.28079
        },
        "Irinjalakuda-II": {
            "code": 5647,
            "lat": 10.35823,
            "lon": 76.22111
        },
        "Kaipamangalam": {
            "code": 5660,
            "lat": 10.34362,
            "lon": 76.14492
        },
        "Kandassankadavu": {
            "code": 5689,
            "lat": 10.47155,
            "lon": 76.09595
        },
        "Karuvannur": {
            "code": 5640,
            "lat": 10.4153,
            "lon": 76.18584
        },
        "Kattoor": {
            "code": 5643,
            "lat": 10.37746,
            "lon": 76.16584
        },
        "Kecheri": {
            "code": 5694,
            "lat": 10.61915,
            "lon": 76.11512
        },
        "Kodakara": {
            "code": 5654,
            "lat": 10.37171,
            "lon": 76.3042
        },
        "Kodungalloor- II": {
            "code": 5664,
            "lat": 10.19125,
            "lon": 76.17872
        },
        "Kodungalloor-I": {
            "code": 5663,
            "lat": 10.19125,
            "lon": 76.17872
        },
        "Kombodinjamakkal": {
            "code": 5645,
            "lat": 10.31059,
            "lon": 76.22947
        },
        "Koonamoochy": {
            "code": 5696,
            "lat": 10.55358,
            "lon": 76.22188
        },
        "Koorkancherry": {
            "code": 5669,
            "lat": 10.51811,
            "lon": 76.21188
        },
        "Koratty": {
            "code": 5649,
            "lat": 10.26815,
            "lon": 76.35428
        },
        "Kundannur": {
            "code": 5684,
            "lat": 10.68334,
            "lon": 76.21378
        },
        "Kunnamkulam": {
            "code": 5700,
            "lat": 10.66689,
            "lon": 76.0756
        },
        "Kuriachira": {
            "code": 5671,
            "lat": 10.50274,
            "lon": 76.22285
        },
        "Kuttichira": {
            "code": 5729,
            "lat": 10.34112,
            "lon": 76.42403
        },
        "Kuzhoor": {
            "code": 5657,
            "lat": 10.55358,
            "lon": 76.22188
        },
        "Mala": {
            "code": 5658,
            "lat": 10.24024,
            "lon": 76.26828
        },
        "Mannuthy": {
            "code": 5675,
            "lat": 10.53699,
            "lon": 76.26406
        },
        "Marathakara": {
            "code": 5673,
            "lat": 10.46648,
            "lon": 76.25816
        },
        "Mathilakom": {
            "code": 5661,
            "lat": 10.55358,
            "lon": 76.22188
        },
        "Medical College(Peringandoor)": {
            "code": 5714,
            "lat": 10.61825,
            "lon": 76.19849
        },
        "Meloor": {
            "code": 5650,
            "lat": 10.29462,
            "lon": 76.3639
        },
        "Mulamkunnathukavu": {
            "code": 5682,
            "lat": 10.59189,
            "lon": 76.21021
        },
        "Mundur Thrissur": {
            "code": 5695,
            "lat": 10.59216,
            "lon": 76.15678
        },
        "Muthuvara": {
            "code": 5685,
            "lat": 10.55409,
            "lon": 76.18192
        },
        "Nadathara": {
            "code": 5677,
            "lat": 10.51368,
            "lon": 76.26782
        },
        "Ollur": {
            "code": 5672,
            "lat": 10.47388,
            "lon": 76.23709
        },
        "Parappookara": {
            "code": 5641,
            "lat": 10.55358,
            "lon": 76.22188
        },
        "Parappur": {
            "code": 5686,
            "lat": 10.56468,
            "lon": 76.12229
        },
        "Pariyaram IRJKDA": {
            "code": 5652,
            "lat": 10.31393,
            "lon": 76.42034
        },
        "Pattikad": {
            "code": 5676,
            "lat": 10.55885,
            "lon": 76.32982
        },
        "Pavaratty": {
            "code": 5687,
            "lat": 10.56582,
            "lon": 76.06214
        },
        "Pazhanji": {
            "code": 5701,
            "lat": 10.69001,
            "lon": 76.05465
        },
        "Pazhayannur": {
            "code": 5719,
            "lat": 10.43204,
            "lon": 76.14056
        },
        "Peringode": {
            "code": 6705,
            "lat": 10.71041,
            "lon": 76.12032
        },
        "Peringottukara": {
            "code": 5666,
            "lat": 10.42562,
            "lon": 76.13142
        },
        "Perinjanam": {
            "code": 5662,
            "lat": 10.32038,
            "lon": 76.1524
        },
        "Perumbilavu": {
            "code": 5727,
            "lat": 10.70307,
            "lon": 76.09007
        },
        "Punnamparambu": {
            "code": 5718,
            "lat": 10.63577,
            "lon": 76.28171
        },
        "Punnayoorkulam": {
            "code": 5703,
            "lat": 10.6772,
            "lon": 75.99326
        },
        "Puthenchira": {
            "code": 5728,
            "lat": 10.484,
            "lon": 76.34662
        },
        "Puthenvelikkara": {
            "code": 5659,
            "lat": 10.18576,
            "lon": 76.24552
        },
        "Puthucode": {
            "code": 6508,
            "lat": 10.62453,
            "lon": 76.44855
        },
        "Puthukkad": {
            "code": 5655,
            "lat": 10.42119,
            "lon": 76.27034
        },
        "Puthur Thrissur": {
            "code": 5674,
            "lat": 10.4905,
            "lon": 76.27052
        },
        "Ramavarmapuram": {
            "code": 5681,
            "lat": 10.56743,
            "lon": 76.2362
        },
        "Thalikulam": {
            "code": 5716,
            "lat": 10.44077,
            "lon": 76.09496
        },
        "Thiruvillwamala": {
            "code": 5693,
            "lat": 10.55358,
            "lon": 76.22188
        },
        "Thriprayar": {
            "code": 5667,
            "lat": 10.41455,
            "lon": 76.12308
        },
        "Vadanappally": {
            "code": 5688,
            "lat": 10.4698,
            "lon": 76.08645
        },
        "Valappad": {
            "code": 5668,
            "lat": 10.38464,
            "lon": 76.11138
        },
        "Varandarappally": {
            "code": 5656,
            "lat": 10.55358,
            "lon": 76.22188
        },
        "Vellangallur": {
            "code": 5646,
            "lat": 10.29611,
            "lon": 76.22188
        },
        "Vellikulangara": {
            "code": 5653,
            "lat": 10.36414,
            "lon": 76.40674
        },
        "Vengidange": {
            "code": 5690,
            "lat": 10.55358,
            "lon": 76.22188
        },
        "Viyur": {
            "code": 5680,
            "lat": 10.54858,
            "lon": 76.21087
        },
        "Wadakkanchery": {
            "code": 5683,
            "lat": 10.64853,
            "lon": 76.23605
        }
    },
    "Wayanad": {
        "Ambalavayal": {
            "code": 6762,
            "lat": 11.6192,
            "lon": 76.21202
        },
        "Kalpetta": {
            "code": 6586,
            "lat": 11.61028,
            "lon": 76.08281
        },
        "Kambalakkad": {
            "code": 6718,
            "lat": 11.67756,
            "lon": 76.07462
        },
        "Kattikulam": {
            "code": 6783,
            "lat": 11.84221,
            "lon": 76.06183
        },
        "Korom": {
            "code": 6806,
            "lat": 11.74487,
            "lon": 75.87989
        },
        "Mananthavady": {
            "code": 6589,
            "lat": 11.90133,
            "lon": 76.07835
        },
        "Meenangadi": {
            "code": 6593,
            "lat": 11.6551,
            "lon": 76.15627
        },
        "Meppadi": {
            "code": 6588,
            "lat": 11.55295,
            "lon": 76.13201
        },
        "Muttil": {
            "code": 6792,
            "lat": 11.64184,
            "lon": 76.11062
        },
        "Padichira": {
            "code": 6811,
            "lat": 11.83964,
            "lon": 76.17891
        },
        "Padinjarethara": {
            "code": 6782,
            "lat": 11.67807,
            "lon": 75.97525
        },
        "Panamaram": {
            "code": 6590,
            "lat": 11.7391,
            "lon": 76.07311
        },
        "Pulpally": {
            "code": 6594,
            "lat": 11.79327,
            "lon": 76.16439
        },
        "Sultan Bathery": {
            "code": 6592,
            "lat": 11.66319,
            "lon": 76.25955
        },
        "Sultan Bathery West": {
            "code": 6720,
            "lat": 11.66319,
            "lon": 76.25955
        },
        "Thavinhal": {
            "code": 6719,
            "lat": 11.83697,
            "lon": 75.88556
        },
        "Vellamunda": {
            "code": 6591,
            "lat": 11.7352,
            "lon": 75.95504
        },
        "Vythiri": {
            "code": 6587,
            "lat": 11.54061,
            "lon": 76.01954
        }
    }
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

// --- Geo Distance Auto-Selection ---

// Haversine distance between two coordinates in km
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Geocode query with localStorage caching and staggered delay for parallel use
async function geocodeLocation(query, staggerIndex = 0) {
    const cacheKey = 'geo_' + query;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    
    // Stagger parallel requests to respect Nominatim rate limits (~1 req/sec)
    // Each uncached call waits (staggerIndex * 1100)ms so they fire sequentially
    await new Promise(resolve => setTimeout(resolve, staggerIndex * 1100));
    
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
        const res = await fetch(url, { headers: { 'User-Agent': 'SunovaSolarLocator/1.0' } });
        const data = await res.json();
        
        if (data && data.length > 0) {
            const coords = { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
            localStorage.setItem(cacheKey, JSON.stringify(coords));
            return coords;
        }
    } catch (e) {
        console.error("Geocoding failed:", e);
    }
    
    // Cache negative result to prevent retry
    localStorage.setItem(cacheKey, JSON.stringify({ lat: null, lon: null }));
    return { lat: null, lon: null };
}

// Check for explicit KSEB section assignment match
function checkKSEBMatch(selectedSection, dealerKsebString) {
    if (!dealerKsebString) return false;
    
    const s1 = selectedSection.toLowerCase().trim();
    const s2 = dealerKsebString.toLowerCase().trim();
    
    if (s1 === s2) return true;
    if (s1.replace(/[^a-z0-9]/g, '') === s2.replace(/[^a-z0-9]/g, '')) return true;
    
    if (s2.includes(s1)) return true;
    
    const parts = s2.split('/');
    for (let p of parts) {
        if (p.trim() === s1) return true;
    }
    
    const parensMatch = s2.match(/^([a-z\s]+)\s*\((.*?)\)/);
    if (parensMatch) {
        const base = parensMatch[1].trim();
        const inner = parensMatch[2];
        if (s1.startsWith(base)) {
            const innerParts = inner.split('/');
            for (let ip of innerParts) {
                const combined = base + " " + ip.trim();
                if (combined === s1) return true;
            }
        }
        if (s1 === base) return true;
        if (s1 === inner.trim()) return true;
    }
    
    return false;
}

// Automatically select matching dealer based on section name
async function handleKSEBSectionChange(sectionName) {
    const districtSelect = document.getElementById('form-district');
    if (!districtSelect || !districtSelect.value || !sectionName) return;
    
    const districtName = districtSelect.options[districtSelect.selectedIndex].text;
    const formDealerEl = document.getElementById('form-dealer');
    
    if (!formDealerEl) return;
    
    // Find matching dealer based on KSEB section name
    let closestDealerCode = null;
    let exactMatchFound = false;
    let minGeographicalDist = null;
    
    DEALERS.forEach((dealer) => {
        if (checkKSEBMatch(sectionName, dealer.kseb)) {
            closestDealerCode = dealer.code;
            exactMatchFound = true;
        }
    });

    if (!exactMatchFound) {
        // Fallback: Calculate distance using hardcoded coordinates from KSEB_SECTIONS
        const sectionData = KSEB_SECTIONS[districtName] ? KSEB_SECTIONS[districtName][sectionName] : null;
        if (sectionData && sectionData.lat && sectionData.lon) {
            
            // 1. Calculate straight-line distances to all dealers
            let candidates = [];
            DEALERS.forEach((dealer) => {
                if (dealer.lat && dealer.lon) {
                    const dist = calculateDistance(sectionData.lat, sectionData.lon, dealer.lat, dealer.lon);
                    candidates.push({ code: dealer.code, lat: dealer.lat, lon: dealer.lon, dist: dist });
                }
            });
            
            // 2. Sort by straight-line distance and take the absolute closest
            candidates.sort((a, b) => a.dist - b.dist);
            
            if (candidates.length > 0) {
                closestDealerCode = candidates[0].code;
                minGeographicalDist = candidates[0].dist;
            }
        }
    }
    
    // Update dropdown options (Removed appended geo details as per user request)
    Array.from(formDealerEl.options).forEach(opt => {
        if (!opt.dataset.originalText) {
            opt.dataset.originalText = opt.textContent;
        }
        
        // Ensure text stays as original (Name | Ph: Number) without appending geo details
        opt.textContent = opt.dataset.originalText;
    });
    
    if (closestDealerCode) {
        formDealerEl.value = closestDealerCode;
    } else {
        // If no exact match and geocoding failed, try to find the first dealer in the same district
        const districtDealer = DEALERS.find(d => d.district.toLowerCase() === districtName.toLowerCase());
        if (districtDealer && Array.from(formDealerEl.options).some(opt => opt.value === districtDealer.code)) {
             formDealerEl.value = districtDealer.code;
        }
    }
    
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
    
    // Phone validation (10 digits NOT starting with 6-9)
    const phoneRegex = /^[0-5]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showFormFeedback('Please enter a valid 10-digit mobile number that does NOT start with 6, 7, 8, or 9.', 'error');
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
    
    // 5. Open Partner WhatsApp immediately to bypass popup blockers
    window.open(waPartnerUrl, '_blank');

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

function setKSEBStatus(msg, type) {
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

window.handleKSEBExternalFetch = function(d) {
    // Fill consumer number & registered mobile
    const consInput = document.getElementById('form-consumer-no');
    if (consInput && d.consumerNo) consInput.value = d.consumerNo;
    
    const mobInput = document.getElementById('form-reg-mobile');
    if (mobInput && d.regMobile) {
        mobInput.value = d.regMobile;
        // Sync hidden phone field
        const phoneInput = document.getElementById('form-phone');
        if (phoneInput) phoneInput.value = d.regMobile;
    }
    
    // Fill name
    const nameInput = document.getElementById('form-name');
    if (nameInput && d.name) nameInput.value = d.name;
    
    // Fill bill amount in calculator
    if (d.amount) {
        const amountVal = parseInt(d.amount);
        if (!isNaN(amountVal) && amountVal > 0) {
            if (typeof handleBillManualInput === 'function') {
                handleBillManualInput(amountVal);
            }
        }
    }
    
    // Fill section and district
    if (d.section && typeof KSEB_SECTIONS !== 'undefined') {
        let matchedDistrict = null;
        let matchedSectionKey = null;
        for (const [dist, sections] of Object.entries(KSEB_SECTIONS)) {
            for (const secKey of Object.keys(sections)) {
                if (secKey.toLowerCase() === d.section.toLowerCase() || 
                    secKey.toLowerCase().includes(d.section.toLowerCase()) ||
                    d.section.toLowerCase().includes(secKey.toLowerCase())) {
                    matchedDistrict = dist;
                    matchedSectionKey = secKey;
                    break;
                }
            }
            if (matchedDistrict) break;
        }
        
        if (matchedDistrict && matchedSectionKey) {
            const distSelect = document.getElementById('form-district');
            if (distSelect) {
                distSelect.value = matchedDistrict;
                handleDistrictChange(matchedDistrict);
                populateKSEBSections(matchedDistrict);
            }
            const secSelect = document.getElementById('form-location');
            if (secSelect) {
                secSelect.value = matchedSectionKey;
            }
        }
    }
    
    // Show success status
    let summary = '✅ Details auto-filled from KSEB website!';
    if (d.name)     summary += ` Name: ${d.name}.`;
    if (d.section)  summary += ` Section: ${d.section}.`;
    if (d.amount)   summary += ` Last Bill: ₹${d.amount}.`;
    
    setKSEBStatus(summary, 'success');
};

// On page load check for KSEB external fetch redirect data
window.addEventListener('DOMContentLoaded', () => {
    const fetched = localStorage.getItem('kseb_fetched_details');
    if (fetched) {
        localStorage.removeItem('kseb_fetched_details');
        try {
            const data = JSON.parse(fetched);
            // Delay slightly to ensure dropdowns and scripts are fully initialized
            setTimeout(() => {
                if (typeof window.handleKSEBExternalFetch === 'function') {
                    window.handleKSEBExternalFetch(data);
                }
            }, 500);
        } catch (e) {
            console.error('Error parsing redirected KSEB details:', e);
        }
    }
});

