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
window.onscroll = function() {
    const btn = document.getElementById("scrollTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

document.getElementById("scrollTop").onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};
