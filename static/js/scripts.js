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

    // Φόρτωση προτίμησης (Προεπιλογή light)
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

    // --- 2. YAML LOADING ---
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            for (let key in yml) {
                const el = document.getElementById(key);
                if (el) el.innerHTML = yml[key];
            }
        }).catch(err => console.error("Config load error:", err));

    // --- 3. MARKDOWN LOADING ---
    if (typeof marked !== 'undefined') {
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
                }).catch(err => console.error("Markdown load error:", err));
        });
    }

    // --- 4. NAVBAR & SCROLLSPY ---
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, { target: '#mainNav', offset: 74 });
    }
});
