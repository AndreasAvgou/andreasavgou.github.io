const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'publications', 'projects']

window.addEventListener('DOMContentLoaded', event => {
    
    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // --- 1. ΑΡΧΙΚΟΠΟΙΗΣΗ ΚΑΙ ΣΤΑΘΕΡΟΠΟΙΗΣΗ DARK MODE ---
    // Διαβάζει το αποθηκευμένο theme με το που φορτώνει η σελίδα
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
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
    const navLinks = document.querySelectorAll('.nav-link');
    const menuCollapse = document.getElementById('navbarResponsive');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
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

// --- 4. ΕΝΙΑΙΟ SCROLL EVENT (Για Scroll Top & Progress Bar) ---
window.addEventListener('scroll', () => {
    const btn = document.getElementById("scrollTop");
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Έλεγχος για το κουμπί Scroll Top
    if (winScroll > 300) {
        if (btn) btn.style.display = "block";
    } else {
        if (btn) btn.style.display = "none";
    }
    
    // Υπολογισμός Progress Bar
    let scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) progressBar.style.width = scrolled + "%";
});

// Scroll to Top κλικ
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
    scrollTopBtn.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
}

// --- 5. 3D AVATAR TILT ---
if (document.querySelector("#avatar img")) {
    VanillaTilt.init(document.querySelector("#avatar img"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
}
