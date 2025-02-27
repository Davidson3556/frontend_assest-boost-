
          document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update button emoji
            themeToggle.textContent = newTheme === 'dark' ? '🌞' : '🌓';
        });

        // Set initial button state
        themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌓';
    });

    // ...
        $(document).ready(function () {
            $(".fade-trigger").on("click", function (event) {
                event.preventDefault();
                let targetUrl = $(this).attr("href");
                $("#home-container").addClass("fade-out");
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            });
        });
// ...

