const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'projects']

window.addEventListener('DOMContentLoaded', event => {
    // --- 1. DARK MODE LOGIC ---
    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    const updateIcon = (theme) => {
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    };

    // Προεπιλογή: light (για να μην μπαίνει απευθείας σε dark)
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    if (toggleButton) {
        toggleButton.onclick = () => {
            const theme = htmlElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        };
    }

    // --- 2. ORIGINAL LOGIC (ScrollSpy & Navbar) ---
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, { target: '#mainNav', offset: 74 });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.map(function (item) {
        item.addEventListener('click', () => {
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
            Object.keys(yml).forEach(key => {
                const el = document.getElementById(key);
                if (el) el.innerHTML = yml[key];
            });
        }).catch(e => console.error("YAML Error:", e));

    marked.use({ mangle: false, headerIds: false });
    section_names.forEach(name => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                const el = document.getElementById(name + '-md');
                if (el) el.innerHTML = html;
            }).then(() => {
                if (window.MathJax) MathJax.typeset();
            }).catch(e => console.error("Markdown Error:", e));
    });
});
