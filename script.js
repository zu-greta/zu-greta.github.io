// Tab switching
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        contents.forEach(c => c.style.display = 'none');
        const targets = tab.dataset.target.split(',');
        targets.forEach(id => {
            const section = document.getElementById(id.trim());
            if (section) section.style.display = 'block';
        });
    });
});

// Mobile hamburger menu
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const tabsEl = document.querySelector(".tabs");

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    hamburger.addEventListener("click", function (e) {
        if (!isMobile()) return;
        e.stopPropagation();
        tabsEl.style.display = tabsEl.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelectorAll(".tabs .tab").forEach(tab => {
        tab.addEventListener("click", function () {
            if (isMobile()) tabsEl.style.display = 'none';
        });
    });

    document.addEventListener("click", function (e) {
        if (isMobile() && tabsEl.style.display === 'block' &&
            !tabsEl.contains(e.target) && !hamburger.contains(e.target)) {
            tabsEl.style.display = 'none';
        }
    });

    window.addEventListener("resize", function () {
        if (!isMobile()) tabsEl.style.display = '';
    });
});
