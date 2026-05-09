const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'projects']

window.addEventListener('DOMContentLoaded', event => {
    
    // --- 1. DARK MODE TOGGLE ---
    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (toggleButton) {
        toggleButton.onclick = (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        };
    }

    // --- 2. MOBILE MENU AUTO-CLOSE ---
    // Κλείνει το μενού αυτόματα όταν πατάς ένα link, χωρίς να χαλάει το toggle
    const navLinks = document.querySelectorAll('.nav-link');
    const menuCollapse = document.getElementById('navbarResponsive');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
                // Χρησιμοποιούμε το API του Bootstrap για ασφάλεια
                const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });

    // --- 3. LOADING CONTENT ---
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            for (let key in yml) {
                const el = document.getElementById(key);
                if (el) el.innerHTML = yml[key];
            }
        }).catch(err => console.error("Config error:", err));

    if (typeof marked !== 'undefined') {
        marked.use({ mangle: false, headerIds: false });
        section_names.forEach(name => {
            const el = document.getElementById(name + '-md');
            if (el) {
                fetch(content_dir + name + '.md')
                    .then(response => response.text())
                    .then(markdown => {
                        el.innerHTML = marked.parse(markdown);
                    }).catch(err => console.error(name + " error:", err));
            }
        });
    }
});
