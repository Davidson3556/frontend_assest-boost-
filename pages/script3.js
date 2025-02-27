document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) window.location.href = '/IndividualAccount.html';

    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');
    const nextButton = document.getElementById('nextButton');
    const passwordError = document.getElementById('password-error');
    
    const requirements = {
        length: { regex: /.{8,}/, message: "At least 8 characters" },
    
    };

    function validatePassword() {
        const password = passwordInput.value;
        let errors = [];
        
        // Check requirements
        Object.entries(requirements).forEach(([key, req]) => {
            const element = document.getElementById(`req-${key}`);
            const met = req.regex.test(password);
            element.style.color = met ? 'var(--Header)' : 'var(--p3-text)';
            if (!met) errors.push(req.message);
        });

        // Check confirmation
        const confirmValid = password === confirmInput.value;
        confirmInput.classList.toggle('is-invalid', !confirmValid);
        
        // Show password errors
        if (errors.length > 0) {
            passwordInput.classList.add('is-invalid');
            passwordError.textContent = `Missing: ${errors.join(', ')}`;
        } else {
            passwordInput.classList.remove('is-invalid');
            passwordError.textContent = '';
        }

        return errors.length === 0 && confirmValid;
    }

    passwordInput.addEventListener('input', function() {
        validatePassword();
    });

    confirmInput.addEventListener('input', function() {
        this.classList.toggle('is-invalid', this.value !== passwordInput.value);
        validatePassword();
    });

    nextButton.addEventListener('click', function() {
        const isValid = validatePassword();
        
        if (isValid) {
            userData.password = passwordInput.value;
            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = '/pages/Confirmation.html';
        }
    });

    // Theme toggle
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