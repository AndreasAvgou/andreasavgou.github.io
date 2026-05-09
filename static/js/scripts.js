const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'projects']

window.addEventListener('DOMContentLoaded', event => {
    
    // --- 1. DARK MODE TOGGLE ---
    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    const updateIcon = (theme) => {
        if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    if (toggleButton) {
        toggleButton.onclick = (e) => {
            e.preventDefault();
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        };
    }

    // --- 2. MENU AUTO-CLOSE & FIX ---
    const navbarToggler = document.querySelector('.navbar-toggler');
    const responsiveMenu = document.getElementById('navbarResponsive');
    
    // Κλείσιμο όταν πατάς ένα link (για κινητά)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // --- 3. YAML & MARKDOWN LOADING ---
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            for (let key in yml) {
                const el = document.getElementById(key);
                if (el) el.innerHTML = yml[key];
            }
        });

    if (typeof marked !== 'undefined') {
        marked.use({ mangle: false, headerIds: false });
        section_names.forEach(name => {
            const el = document.getElementById(name + '-md');
            if (el) {
                fetch(content_dir + name + '.md')
                    .then(response => response.text())
                    .then(markdown => {
                        el.innerHTML = marked.parse(markdown);
                    });
            }
        });
    }
});
