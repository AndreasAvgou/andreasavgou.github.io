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

    // --- 2. YAML LOADING (Για κοινά στοιχεία όπως τίτλοι & footer) ---
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            for (let key in yml) {
                const el = document.getElementById(key);
                if (el) el.innerHTML = yml[key];
            }
        }).catch(err => console.error("Config load error:", err));

    // --- 3. SMART MARKDOWN LOADING ---
    if (typeof marked !== 'undefined') {
        marked.use({ mangle: false, headerIds: false });

        section_names.forEach(name => {
            const el = document.getElementById(name + '-md');
            
            // Φορτώνει το Markdown ΜΟΝΟ αν το αντίστοιχο div υπάρχει στη σελίδα
            if (el) {
                fetch(content_dir + name + '.md')
                    .then(response => {
                        if (!response.ok) throw new Error(name + ".md not found");
                        return response.text();
                    })
                    .then(markdown => {
                        el.innerHTML = marked.parse(markdown);
                        // Αν υπάρχει MathJax στη σελίδα, κάνε re-render τους τύπους
                        if (window.MathJax && window.MathJax.typeset) {
                            window.MathJax.typeset();
                        }
                    })
                    .catch(err => console.error("Markdown load error:", err));
            }
        });
    }
});
