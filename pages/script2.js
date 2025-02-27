document.addEventListener('DOMContentLoaded', function() {

    // Form elements
    const nextButton = document.getElementById('nextButton');
    const emailInput = document.getElementById('email');
    const firstNameInput = document.getElementById('first-name');
    const phoneInput = document.getElementById('phone-number');
    const formElements = [emailInput, firstNameInput, phoneInput];

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/;

    // Error messages
    const errors = {
        phone: "Please enter a valid phone number (at least 7 digits after country code)",
        email: "Please enter a valid email address",
        name: "Please enter your first name (letters only)"
    };

    // Input validation
    function validateInput(input, type) {
        const value = input.value.trim();
        let isValid = false;

        switch(type) {
            case 'phone':
                const countryCode = document.querySelector('.country-code').textContent;
                const digits = value.replace(countryCode, '').replace(/[^0-9]/g, '');
                isValid = digits.length >= 7;
                break;
                
            case 'email':
                isValid = emailRegex.test(value);
                break;
                
            case 'name':
                isValid = nameRegex.test(value) && value.length >= 2;
                break;
        }

        input.classList.toggle('is-invalid', !isValid);
        return isValid;
    }

    // Form submission handler
    function handleSubmit() {
        const isPhoneValid = validateInput(phoneInput, 'phone');
        const isEmailValid = validateInput(emailInput, 'email');
        const isNameValid = validateInput(firstNameInput, 'name');

        if (isPhoneValid && isEmailValid && isNameValid) {
            // Store data in localStorage
            localStorage.setItem('userData', JSON.stringify({
                phone: document.querySelector('.country-code').textContent + phoneInput.value.replace(/[^0-9]/g, ''),
                email: emailInput.value.trim(),
                firstName: firstNameInput.value.trim()
            }));

            // Redirect to next page (replace with actual page)
            window.location.href = '/pages/PassWord.html';
        }
    }

    // Event listeners
    nextButton.addEventListener('click', handleSubmit);
    
    // Real-time validation
    formElements.forEach(input => {
        input.addEventListener('input', function() {
            const type = this.id === 'phone-number' ? 'phone' : 
                        this.id === 'email' ? 'email' : 'name';
            validateInput(this, type);
        });
    });

    // Initialize error messages
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.textContent = errors[el.id.replace('-error', '')];
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Country data - you can expand this list
    const countries = [
        { name: "United States", code: "US", dialCode: "+1" },
        { name: "United Kingdom", code: "GB", dialCode: "+44" },
        { name: "Nigeria", code: "NG", dialCode: "+234" },
        { name: "France", code: "FR", dialCode: "+33" },
        { name: "Germany", code: "DE", dialCode: "+49" },
        { name: "China", code: "CN", dialCode: "+86" },
        { name: "India", code: "IN", dialCode: "+91" },
        { name: "Brazil", code: "BR", dialCode: "+55" }
    ];

    // DOM Elements
    const countryList = document.querySelector('.country-list');
    const flagEmoji = document.querySelector('.flag-emoji');
    const countryCode = document.querySelector('.country-code');
    const phoneInput = document.getElementById('phone-number');

    // Generate flag emoji from ISO country code
    function getFlagEmoji(countryCode) {
        return countryCode.toUpperCase().replace(/./g, 
            char => String.fromCodePoint(127397 + char.charCodeAt()));
    }

    // Populate country dropdown
    function populateCountryList() {
        countryList.innerHTML = '';
        countries.forEach(country => {
            const li = document.createElement('li');
            li.className = 'dropdown-item d-flex align-items-center gap-3 py-3';
            li.innerHTML = `
                <span class="flag">${getFlagEmoji(country.code)}</span>
                <span class="country-name">${country.name}</span>
                <span class="ms-auto dial-code">${country.dialCode}</span>
            `;
            
            li.addEventListener('click', () => {
                flagEmoji.textContent = getFlagEmoji(country.code);
                countryCode.textContent = country.dialCode;
                phoneInput.value = country.dialCode;
            });
            
            countryList.appendChild(li);
        });
    }

    // Phone number input validation
    phoneInput.addEventListener('input', function(e) {
        // Allow only numbers and +
        this.value = this.value.replace(/[^0-9+]/g, '');
        
        // Auto-update country code
        const inputValue = this.value.startsWith('+') ? this.value : `+${this.value}`;
        const matchedCountry = countries.find(country => inputValue.startsWith(country.dialCode));
        
        if (matchedCountry) {
            flagEmoji.textContent = getFlagEmoji(matchedCountry.code);
            countryCode.textContent = matchedCountry.dialCode;
        }
    });

    // Initialize country list
    populateCountryList();

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌓';

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.textContent = newTheme === 'dark' ? '🌞' : '🌓';
    });
});
