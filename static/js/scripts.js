const CONTENT_DIR = 'contents/';
const CONFIG_FILE = 'config.yml';
const SECTIONS = ['home', 'publications', 'projects'];

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    loadAllContent();
    initScrollPerformance();
});

function initTheme() {
    const toggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    if (toggleButton) {
        toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }
}

function initMobileMenu() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuCollapse = document.getElementById('navbarResponsive');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (!menuCollapse || !toggler) return;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.getComputedStyle(toggler).display !== 'none') {
                const bsCollapse = bootstrap.Collapse.getInstance(menuCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });
}

async function loadAllContent() {
    try {
        const configPromise = fetch(`${CONTENT_DIR}${CONFIG_FILE}`).then(res => res.text());
        const sectionPromises = SECTIONS.map(name => 
            fetch(`${CONTENT_DIR}${name}.md`).then(res => res.text().then(text => ({ name, text })))
        );

        const [configText, ...sectionsData] = await Promise.all([configPromise, ...sectionPromises]);

        if (typeof jsyaml !== 'undefined') {
            const yml = jsyaml.load(configText);
            if (yml.hero) {
                const headlineEl = document.getElementById('top-section-bg-text');
                if (headlineEl) headlineEl.innerHTML = yml.hero.headline;
                
                const subtitleEl = document.getElementById('home-subtitle');
                if (subtitleEl) subtitleEl.innerHTML = yml.hero.subtitle;
            }
            if (yml.system && yml.system.copyright) {
                const copyrightEl = document.getElementById('copyright-text');
                if (copyrightEl) copyrightEl.innerHTML = yml.system.copyright;
            }
            if (yml.metadata && yml.metadata.title) {
                document.title = yml.metadata.title;
            }
        }

        if (typeof marked !== 'undefined') {
            marked.use({ mangle: false, headerIds: false });
            sectionsData.forEach(({ name, text }) => {
                const el = document.getElementById(`${name}-md`);
                if (el) el.innerHTML = marked.parse(text);
            });
        }

        initAvatarTilt();
    } catch (error) {
        console.error("Data hydration failed:", error);
    }
}

function initScrollPerformance() {
    const btn = document.getElementById("scrollTop");
    const progressBar = document.getElementById("progress-bar");
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                
                if (btn) btn.style.display = winScroll > 300 ? "block" : "none";
                if (progressBar) progressBar.style.width = `${(winScroll / height) * 100}%`;
                
                ticking = false;
            });
            ticking = true;
        }
    });

    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function initAvatarTilt() {
    const avatarImg = document.querySelector("#avatar img");
    if (avatarImg && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(avatarImg, {
            max: 10,
            speed: 500,
            glare: true,
            "max-glare": 0.3,
        });
    }
}
