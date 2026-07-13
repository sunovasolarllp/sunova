// --- Application Variables & State ---
let currentMode = 'residential'; // 'residential' or 'commercial'

// --- DOM elements ---
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Calculator DOM elements
const billInput = document.getElementById('input-bill');
const billDisplay = document.getElementById('bill-val-display');
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
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

// --- Theme Toggle ---
const savedTheme = localStorage.getItem('theme') || 'dark-theme';
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

// When range slider is updated
function updateCalculatorOutputs() {
    const billVal = parseInt(billInput.value);
    billDisplay.textContent = billVal.toLocaleString('en-IN');
    
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
    
    // Sync slider value without recursive loop
    if (calculatedBill >= parseInt(billInput.min) && calculatedBill <= parseInt(billInput.max)) {
        billInput.value = calculatedBill;
        billDisplay.textContent = calculatedBill.toLocaleString('en-IN');
    } else if (calculatedBill < parseInt(billInput.min)) {
        billInput.value = billInput.min;
        billDisplay.textContent = parseInt(billInput.min).toLocaleString('en-IN');
    } else {
        billInput.value = billInput.max;
        billDisplay.textContent = parseInt(billInput.max).toLocaleString('en-IN');
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
    
    // 2. Solar Panels needed (assuming high quality 500W monocrystalline panels)
    const panelsCount = Math.round((calculatedCapacity * 1000) / 500);
    
    // 3. Roof area required (~90 sq ft per kW)
    const areaRequired = Math.round(calculatedCapacity * 90);
    
    // 4. Generation capacity (120 units per kW monthly)
    const generationPerMonth = Math.round(calculatedCapacity * 120);
    
    // 5. Total Installation Cost (estimated Indian averages with discount rates)
    let rawCost = 0;
    if (currentMode === 'residential') {
        if (calculatedCapacity === 1.0) {
            rawCost = 75000;
        } else if (calculatedCapacity === 2.0) {
            rawCost = 140000;
        } else if (calculatedCapacity <= 3.0) {
            rawCost = 195000; // ~₹65,000/kW
        } else if (calculatedCapacity <= 10.0) {
            rawCost = calculatedCapacity * 60000;
        } else {
            rawCost = calculatedCapacity * 55000;
        }
    } else {
        // Commercial bulk pricing
        rawCost = calculatedCapacity * 52000;
    }
    
    // 6. PM Surya Ghar Subsidy
    let subsidy = 0;
    if (currentMode === 'residential') {
        if (calculatedCapacity === 1.0) {
            subsidy = 30000;
        } else if (calculatedCapacity === 2.0) {
            subsidy = 60000;
        } else {
            subsidy = 78000; // Capped max subsidy
        }
    }
    
    // 7. Net Cost
    const netCost = rawCost - subsidy;
    
    // 8. Financial Savings
    // Kerala average unit charge: Residential saved ₹8.20/unit, Commercial saved ₹10.80/unit
    const unitValue = currentMode === 'residential' ? 8.20 : 10.80;
    // Cap energy savings to actual generation or consumption (whichever is lower)
    const activeSavingsUnits = Math.min(units, generationPerMonth);
    const annualSavingsVal = Math.round(activeSavingsUnits * unitValue * 12);
    
    // 9. Return on Investment (ROI) & Payback
    const paybackVal = annualSavingsVal > 0 ? (netCost / annualSavingsVal).toFixed(1) : '0';
    const roiVal = netCost > 0 ? ((annualSavingsVal / netCost) * 100).toFixed(1) : '0';
    
    // 10. Environmental Impact
    // 1 kW offsets 1.25 metric tonnes of CO2 per year
    const co2Offset = (calculatedCapacity * 1.25).toFixed(1);
    const equivalentTrees = Math.round(parseFloat(co2Offset) * 16.6); // 1 tonne = ~16.6 mature trees/yr
    
    // Update Outputs DOM
    outSize.textContent = calculatedCapacity.toFixed(1);
    outPanels.textContent = panelsCount;
    outArea.textContent = areaRequired.toLocaleString('en-IN');
    outGeneration.textContent = generationPerMonth.toLocaleString('en-IN');
    outCost.textContent = rawCost.toLocaleString('en-IN');
    outSubsidy.textContent = subsidy.toLocaleString('en-IN');
    outNetCost.textContent = netCost.toLocaleString('en-IN');
    outSavings.textContent = annualSavingsVal.toLocaleString('en-IN');
    outPayback.textContent = paybackVal;
    outRoi.textContent = roiVal;
    outCo2.textContent = co2Offset;
    outTrees.textContent = equivalentTrees;
    
    // Sync size back to contact form requested size field
    formSize.value = `${calculatedCapacity.toFixed(1)} kW (${panelsCount} panels)`;
}

// Sync calculator choice to contact form select element
formConnection.addEventListener('change', (e) => {
    setCalculatorMode(e.target.value);
});

// Booking Action
function transferCalculatorDetails() {
    const size = outSize.textContent;
    const panels = outPanels.textContent;
    const msgArea = document.getElementById('form-message');
    
    msgArea.value = `Hi Sunova Solar, I am interested in a ${size} kW system containing ${panels} panels. My current monthly bill is approximately ₹${billInput.value}. Please perform a feasibility study for my site.`;
}

// --- Contact Form Submission & Validation ---
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const connection = document.getElementById('form-connection').value;
    const capacity = document.getElementById('form-size').value;
    const message = document.getElementById('form-message').value.trim();
    
    // Phone validation (10 digits check)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        showFormFeedback('Please enter a valid 10-digit mobile number.', 'error');
        return;
    }
    
    // Show sending feedback
    showFormFeedback('Sending your inquiry...', 'info');
    
    // Send form data to FormSubmit.co via AJAX
    fetch('https://formsubmit.co/ajax/info@sunovasolar.in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Name: name,
            Phone: phone,
            Email: email,
            "System Type": connection,
            "Requested Capacity": capacity,
            "Message / Site Details": message,
            _subject: `New Solar Inquiry from ${name} (${capacity})`
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        showFormFeedback(`Thank you, ${name}! Your inquiry for a ${capacity} system has been sent directly to our email. Our technical team or sales engineers from Sunova Solar LLP will contact you within 24 working hours.`, 'success');
        
        // Reset form inputs except readonly fields
        document.getElementById('form-name').value = '';
        document.getElementById('form-phone').value = '';
        document.getElementById('form-email').value = '';
        document.getElementById('form-message').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        showFormFeedback('Something went wrong. Please try again or email us directly at info@sunovasolar.in', 'error');
    });
}

function showFormFeedback(msg, type) {
    formFeedback.textContent = msg;
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
});
