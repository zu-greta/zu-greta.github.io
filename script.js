// ============================================================
// RENDERING — Builds all HTML from DATA (defined in data.js)
// ============================================================

// Helper: wrap text in a syntax-highlight span
const S = (cls, text) => `<span class="${cls}">${text}</span>`;
const cm = t => S("colour_comment", t);
const rs = t => S("colour_reserved", t);
const fn = t => S("colour_function", t);
const st = t => S("colour_string", `"${t}"`);
const dt = t => S("colour_dotthings", t);
const mn = t => S("colour_main", t);
const pn = t => S("colour_punctuation", t);
const link = (url, label) => `<a href="${url}" target="_blank" style="color:var(--link-code); text-decoration:underline;">${label}</a>`;

function escHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// ---- Typing animation ----
let typeTimer = null;
function typeText(elId, text, speed = 60) {
    clearInterval(typeTimer);
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = "";
    let i = 0;
    typeTimer = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(typeTimer);
    }, speed);
}

// ---- Helpers for i18n ----
function t(key) {
    if (currentLang === "fr" && FR.headings && FR.headings[key]) return FR.headings[key];
    const defaults = { aboutMe: "About Me", contactMe: "Contact Me", experience: "Experience",
        skills: "Skills", education: "Education", work: "Work", supervisor: "Supervisor",
        project: "Project", relevantCourses: "Relevant courses", awards: "Awards",
        status: "Open to opportunities" };
    return defaults[key] || key;
}

// ---- Sidebar ----
const monthMap = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, june:5, jul:6, july:6, aug:7, august:7, sep:8, sept:8, september:8, oct:9, nov:10, dec:11, december:11 };
function parseEndDate(dates) {
    if (!dates) return null;
    const end = dates.split("-").pop().trim().toLowerCase();
    if (end === "present" || end === "ongoing" || end === "tbd") return new Date(9999, 0);
    const parts = end.split(/\s+/);
    if (parts.length >= 2) {
        const m = monthMap[parts[0]];
        const y = parseInt(parts[1]);
        if (m !== undefined && y) return new Date(y, m + 1, 0);
    }
    return null;
}

function autoStatus(dates) {
    const now = new Date();
    const end = parseEndDate(dates);
    if (!end) return "";
    // Check if start date is in the future → upcoming (A)
    const startStr = dates.split("-")[0].trim().toLowerCase();
    const startParts = startStr.split(/\s+/);
    if (startParts.length >= 2) {
        const m = monthMap[startParts[0]];
        const y = parseInt(startParts[1]);
        if (m !== undefined && y) {
            const startDate = new Date(y, m, 1);
            if (startDate > now) return "A";             // upcoming / not started yet
        }
    }
    if (end >= now) return "M";                          // in progress
    return "";                                            // done
}

function statusColor(status) {
    if (status === "M") return "var(--syn-function)";  // orange — modified/in-progress
    if (status === "A") return "var(--syn-string)";    // green — added/recently done
    return "";
}

function renderSidebarList(el, items, detailSource) {
    const detailsMap = detailSource === "experience" ? DATA.experienceDetails : DATA.projectsC.details;
    let html = "";
    for (const entry of items) {
        if (entry.folder) {
            html += `<div class="projects-folder" onclick="this.classList.toggle('collapsed')">
                <i class="fa fa-angle-down folder-arrow"></i> ${entry.folder}
                <ul class="projects-list folder-contents" style="padding: 1.5% 2%;">`;
            for (const item of entry.items) {
                const detail = detailsMap[item.id];
                const status = detail ? autoStatus(detail.dates) : "";
                const color = statusColor(status);
                const style = color ? ` style="color:${color}"` : "";
                const badge = status ? `<span class="git-badge">${status}</span>` : "";
                html += `<li class="project-item"${style} data-item-id="${item.id}" data-source="${detailSource}">${item.short}${badge}</li>`;
            }
            html += `</ul></div>`;
        } else {
            const detail = detailsMap[entry.id];
            const status = detail ? autoStatus(detail.dates) : "";
            const color = statusColor(status);
            const style = color ? ` style="color:${color}"` : "";
            const badge = status ? `<span class="git-badge">${status}</span>` : "";
            html += `<li class="project-item"${style} data-item-id="${entry.id}" data-source="${detailSource}">${entry.short}${badge}</li>`;
        }
    }
    el.innerHTML = html;
    el.querySelectorAll(".project-item").forEach(item => {
        item.addEventListener("click", function (e) {
            e.stopPropagation();
            const id = this.dataset.itemId;
            const source = this.dataset.source;
            const details = source === "experience" ? DATA.experienceDetails : DATA.projectsC.details;
            openDetailPanel(id, details);
            document.querySelectorAll(".project-item").forEach(p => p.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

function renderSidebar() {
    renderSidebarList(document.getElementById("sidebar-projects"), DATA.projectsC.sidebar, "projects");
    renderSidebarList(document.getElementById("sidebar-experience"), DATA.experienceSidebar, "experience");
}

function openDetailPanel(id, detailsMap) {
    const p = detailsMap[id];
    if (!p) return;
    const tab = document.getElementById("current-project-tab");
    const label = p.title.length > 25 ? p.title.substring(0, 25) + "…" : p.title;
    tab.textContent = label + " ✕";
    tab.dataset.target = "project-detail";
    tab.classList.remove("hidden");
    tab.style.display = "";
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".content").forEach(c => c.style.display = "none");
    const status = autoStatus(p.dates);
    const statusLabels = { "M": "In Progress", "A": "Upcoming", "": "Completed" };
    const sColors = { "M": "var(--syn-function)", "A": "var(--syn-string)", "": "var(--text-muted)" };
    const sColor = sColors[status] || "var(--text-muted)";
    const sLabel = statusLabels[status] || "Completed";
    const context = p.course || p.company || "";
    const detail = document.getElementById("project-detail");
    detail.style.display = "block";
    detail.innerHTML = `
        <div class="project-card">
            <div class="project-card-header">
                <h2>${p.title}</h2>
                <span class="project-status" style="color:${sColor}">● ${sLabel}</span>
            </div>
            <div class="project-meta">
                <span>📅 ${p.dates}</span>
                <span>🏢 ${context}</span>
            </div>
            <p class="project-desc">${p.description}</p>
            <div class="project-tech">
                ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join("")}
            </div>
            ${p.links && p.links.length ? `<div class="project-links">
                ${p.links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join("")}
            </div>` : ""}
        </div>`;
    tab.onclick = function (e) {
        e.stopImmediatePropagation();
        tab.classList.add("hidden");
        tab.classList.remove("active");
        tab.style.display = "none";
        detail.style.display = "none";
        document.querySelectorAll(".project-item").forEach(p => p.classList.remove("active"));
        document.querySelector('.tab[data-target*="home"]').click();
    };
}

function initSidebarAccordion() {
    document.querySelectorAll(".sidebar-section[data-section]").forEach(header => {
        header.addEventListener("click", function () {
            const section = this.dataset.section;
            const projBody = document.getElementById("sidebar-projects");
            const expBody = document.getElementById("sidebar-experience");
            const projH = document.getElementById("sidebar-projects-header");
            const expH = document.getElementById("sidebar-experience-header");
            if (section === "projects") {
                const open = projBody.style.display !== "none";
                projBody.style.display = open ? "none" : "";
                projH.querySelector(".folder-arrow").className = "fa folder-arrow " + (open ? "fa-angle-right" : "fa-angle-down");
                projH.classList.toggle("active", !open);
                if (!open) { expBody.style.display = "none"; expH.querySelector(".folder-arrow").className = "fa folder-arrow fa-angle-right"; expH.classList.remove("active"); }
            } else {
                const open = expBody.style.display !== "none";
                expBody.style.display = open ? "none" : "";
                expH.querySelector(".folder-arrow").className = "fa folder-arrow " + (open ? "fa-angle-right" : "fa-angle-down");
                expH.classList.toggle("active", !open);
                if (!open) { projBody.style.display = "none"; projH.querySelector(".folder-arrow").className = "fa folder-arrow fa-angle-right"; projH.classList.remove("active"); }
            }
        });
    });
}
// ---- Home tab sections ----
function renderAboutMe() {
    const d = DATA.aboutMe;
    const text = (currentLang === "fr" && FR.aboutMe) ? FR.aboutMe.text : d.text;
    document.getElementById("about-me").innerHTML = `
        <div class="about-me-img"><img src="${d.image}" alt="Greta's Profile Picture"></div>
        <div class="about-me-text"><h2>${t("aboutMe")}</h2><br><p>${text}</p></div>`;
}

function renderContact() {
    const el = document.getElementById("contact-me");
    el.innerHTML = `<h2>${t("contactMe")}</h2>` +
        DATA.contact.map(c => `<a href="${c.url}" target="_blank"><i class="fa ${c.icon}"></i> ${c.label}</a>`).join("\n");

    // Floating contact bar
    document.getElementById("contact-bar").innerHTML = DATA.contact.map(c =>
        `<a href="${c.url}" target="_blank"><i class="fa ${c.icon}"></i><span>${c.label}</span></a>`
    ).join("");
}

function renderHomeExperience() {
    let html = `<h2 style="text-align: center;">${t("experience")}</h2><br>`;
    DATA.workExperience.forEach((e, i) => {
        const fr = (currentLang === "fr" && FR.workExperience) ? FR.workExperience[i] : {};
        html += `<blockquote><b style="font-size:1.2rem;">${e.company}</b>
            <ul style="list-style-type:none;padding-left:0;margin:0;">
                <li><b style="font-size:1rem;">${fr.role || e.role}</b> (${e.dates})</li>
                <li><b style="font-size:1rem;">${t("work")}: </b> ${escHtml(fr.work || e.work)}</li>
            </ul></blockquote><br>`;
    });
    html += "<hr><br>";
    DATA.researchExperience.forEach((r, i) => {
        const fr = (currentLang === "fr" && FR.researchExperience) ? FR.researchExperience[i] : {};
        html += `<blockquote><b style="font-size:1.2rem;">${r.institution}</b>
            <ul style="list-style-type:none;padding-left:0;margin:0;">
                <li><b style="font-size:1rem;">${fr.role || r.role}</b> (${r.dates})</li>
                <li><b style="font-size:1rem;">${t("supervisor")}: </b> ${fr.supervisor || r.supervisor}</li>
                <li><b style="font-size:1rem;">${t("project")}: </b> ${fr.project || r.project}</li>
            </ul></blockquote><br>`;
    });
    document.getElementById("experience").innerHTML = html;
}

function renderHomeSkills() {
    let html = `<h2 style="text-align: center;">${t("skills")}</h2><br><ul style="list-style-type:none;padding-left:0;margin:0;">`;
    DATA.skills.forEach((s, i) => {
        const fr = (currentLang === "fr" && FR.skills) ? FR.skills[i] : {};
        html += `<li><b>${fr.category || s.category}:</b> ${fr.items || s.items}</li>`;
    });
    html += "</ul>";
    document.getElementById("skills").innerHTML = html;
}

function renderHomeEducation() {
    let html = `<h2 style="text-align: center;">${t("education")}</h2>`;
    DATA.education.forEach((e, i) => {
        const fr = (currentLang === "fr" && FR.education) ? FR.education[i] : {};
        if (i > 0) html += "<br><hr><br>";
        html += `<blockquote><b style="font-size:1.2rem;">${e.school}</b>
            <ul style="list-style-type:none;padding-left:0;margin:0;">
                <li><b style="font-size:1rem;">${fr.degree || e.degree}</b> (${fr.dates || e.dates})</li>`;
        if (e.gpa) html += `<li><b style="font-size:1rem;">cGPA: </b> ${e.gpa}</li>`;
        if (e.rScore) html += `<li><b style="font-size:1rem;">R-Score: </b> ${e.rScore}</li>`;
        if (e.courses) html += `<li><b style="font-size:1rem;">${t("relevantCourses")}: </b>${e.courses}</li>`;
        const awards = fr.awards || e.awards;
        if (awards) html += `<li><b style="font-size:1rem;">${t("awards")}: </b> ${awards}</li>`;
        html += `</ul></blockquote>`;
    });
    document.getElementById("education").innerHTML = html;
}

// ---- Code-themed tabs ----
function renderExperiencePy() {
    const d = DATA.experiencePy;
    let py = "";
    py += `${cm("### Work Experience ###")}

${rs("class")} ${mn("Work_Experience")}:
    ${rs("def")} ${fn("__init__")}(${dt("self")}):
        ${dt("self")}.positions ${pn("=")} []

    ${rs("def")} ${fn("add_position")}(${dt("self")}, company, role, dates, details):
        ${dt("self")}.positions.append({
            ${st("company")}: company,
            ${st("role")}: role,
            ${st("dates")}: dates,
            ${st("details")}: details
        })
`;
    for (const w of d.work) {
        const details = w.details.map(d => `        ${st(escHtml(d))}`).join(",\n");
        py += `
${cm("# " + w.comment)}
${fn("experience.add_position")}(
    ${st(escHtml(w.company))},
    ${st(escHtml(w.role))},
    ${st(w.dates)},
    [
${details}
    ]
)
`;
    }

    py += `\n<hr style="border: none; border-top: 1px solid var(--border-color); margin: 0.8rem 0;">\n`;

    py += `
${cm("### Research Experience ###")}
${rs("class")} ${mn("Research_Experience")}:
    ${rs("def")} ${fn("__init__")}(${dt("self")}):
        ${dt("self")}.projects ${pn("=")} []

    ${rs("def")} ${fn("add_project")}(${dt("self")}, lab, professors, dates, details):
        ${dt("self")}.projects.append({
            ${st("lab")}: lab,
            ${st("professors")}: professors,
            ${st("dates")}: dates,
            ${st("details")}: details
        })
`;
    for (const r of d.research) {
        const details = r.details.map(d => `        ${st(escHtml(d))}`).join(",\n");
        py += `
${cm("# " + r.comment)}
${fn("research.add_project")}(
    ${st(escHtml(r.lab))},
    ${st(escHtml(r.professors))},
    ${st(r.dates)},
    [
${details}
    ]
)
`;
    }

    document.getElementById("experiencepy-pre").innerHTML = py;
}

function renderProjectsC() {
    const d = DATA.projectsC;
    let c = `${cm("// Projects")}

${rs("#include")} &lt;stdio.h&gt;
`;
    for (const p of d.projects) {
        c += `
${cm("// " + p.comment)}
${rs("void")} ${p.funcName}() {
    ${cm("// " + p.dates)}
    ${cm("/*")} ${p.description} ${cm("*/")}
    ${fn("char")} *tech = ${st(p.tech)};`;
        for (const [key, val] of Object.entries(p.links)) {
            c += `\n    ${fn("char")} *${key} = ${S("colour_string", '"' + link(val.url, val.label) + '"')};`;
        }
        c += `
}
`;
    }

    c += `
<hr style="border: none; border-top: 1px solid var(--border-color); margin: 0.8rem 0;">

${cm("// Research Projects")}
${rs("struct")} Research_Project {
    ${fn("char")} *title;
    ${fn("char")} *professors;
    ${fn("char")} *description;
    ${fn("char")} *report_link;
};
`;
    for (const r of d.research) {
        c += `
${cm("// " + r.comment)}
${rs("struct")} ${r.name} {
    ${fn("char")} *title = ${st(r.title)};
    ${fn("char")} *description = ${st(r.description)};
    ${cm("// Report → " + link(r.reportLink.url, r.reportLink.label))}
};
`;
    }

    document.getElementById("projectsc-pre").innerHTML = c;
}

function renderEducationJava() {
    let java = "";
    for (const cls of DATA.educationJava) {
        java += `${cm("// " + cls.comment)}
${mn("public class")} ${fn(cls.className)} {`;
        for (const f of cls.fields) {
            const val = f.isNumber ? dt(f.value) : st(f.value);
            java += `\n    ${mn("private")} ${mn(f.type)} ${f.name} = ${val};`;
        }
        if (cls.arrayFields) {
            for (const af of cls.arrayFields) {
                java += `\n\n    ${mn("private")} ${mn("String[]")} ${af.name} = {`;
                java += af.values.map(v => `\n        ${st(escHtml(v))}`).join(",");
                java += `\n    };`;
            }
        }
        if (cls.extraFields) {
            java += "\n";
            for (const f of cls.extraFields) {
                const val = f.isNumber ? dt(f.value) : st(f.value);
                java += `\n    ${mn("private")} ${mn(f.type)} ${f.name} = ${val};`;
            }
        }
        java += `\n}\n\n`;
    }
    document.getElementById("educationjava-pre").innerHTML = java;
}

function renderSkillsBash() {
    let bash = `${cm("# Skills")}\n`;
    for (const group of DATA.skillsBash) {
        bash += `\n${dt("$")} ${mn(group.varName)}=${pn("(")}`;
        for (const v of group.values) {
            bash += `\n    ${st(v)}`;
        }
        bash += `\n${pn(")")}\n`;
    }
    document.getElementById("skillsbash-pre").innerHTML = bash;
}

function renderInterestsJson() {
    const d = DATA.interests;
    let json = `${cm("// My hobbies and interests")}\n${pn("{")}`;
    d.entries.forEach((e, i) => {
        const fr = (currentLang === "fr" && FR.interests && FR.interests.entries) ? FR.interests.entries[i] : {};
        json += `\n    ${mn('"' + e.name + '"')}${pn(":")} ${pn("{")}
        ${mn('"description"')}${pn(":")} ${st(fr.description || e.description)}${pn(",")}
        ${mn('"image"')}${pn(":")} ${st(e.image)}
    ${pn("}")}${pn(",")}`;
    });
    json += `\n\n    ${mn('"Other"')}${pn(":")} ${pn("[")}`;
    d.other.forEach((o, i) => {
        json += `\n        ${st(o)}${i < d.other.length - 1 ? pn(",") : ""}`;
    });
    json += `\n    ${pn("]")}`;
    json += `\n${pn("}")}`;
    document.getElementById("interestsjson-pre").innerHTML = json;

    // Render polaroid gallery
    const rotations = [-4, 3, -2, 5, -3, 4, -5, 2, -1, 3];
    const photos = d.gallery || d.entries;
    let imgHtml = "";
    photos.forEach((e, i) => {
        const rot = rotations[i % rotations.length];
        imgHtml += `<div class="polaroid" style="--rot: ${rot}deg">
            <img src="${e.image}" alt="${e.name}">
            <div class="polaroid-caption">${e.name}</div>
        </div>`;
    });
    document.getElementById("interests-images").innerHTML = imgHtml;
}

// ---- Profile popup ----
function renderProfilePopup() {
    const stats = [
        { value: Object.keys(DATA.projectsC.details).length, label: "Projects" },
        { value: DATA.skills[0].items.split(",").length, label: "Languages" },
        { value: DATA.workExperience.length + DATA.researchExperience.length, label: "Positions" },
        { value: DATA.education.length, label: "Degrees" }
    ];
    document.getElementById("profile-stats").innerHTML = stats.map(s =>
        `<div class="stat-item"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`
    ).join("");
    document.getElementById("profile-status-text").innerHTML = '<span class="status-dot-inline green"></span> ' + t("status");
}

function initProfilePopup() {
    const btn = document.getElementById("profile-btn");
    const popup = document.getElementById("profile-popup");

    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        popup.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
        if (!popup.contains(e.target)) popup.classList.remove("show");
    });

    popup.addEventListener("click", function (e) { e.stopPropagation(); });
}

// ---- Init ----
function renderAll() {
    // Update greeting with typing animation
    const greetText = currentLang === "fr" ? FR.greeting : "Hello World, I'm Greta";
    const homeEl = document.getElementById("home");
    homeEl.innerHTML = `<h1 style="text-align: center;" class="colour_main"><span id="typed-greeting"></span><span class="cursor-blink">|</span></h1>`;
    typeText("typed-greeting", greetText);
    // Update profile status
    const statusEl = document.querySelector(".profile-status");
    if (statusEl) statusEl.textContent = t("status");

    renderSidebar();
    renderAboutMe();
    renderContact();
    renderHomeExperience();
    renderHomeSkills();
    renderHomeEducation();
    renderExperiencePy();
    renderProjectsC();
    renderEducationJava();
    renderSkillsBash();
    renderInterestsJson();
    renderProfilePopup();

    // Footer
    const now = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    document.getElementById("footer").innerHTML = `<p style="color:var(--text-muted);font-size:0.8rem;">// last modified: ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | Greta Zu</p>`;
}

document.addEventListener("DOMContentLoaded", function () {
    renderAll();
    initProfilePopup();
    initSidebarAccordion();
});

// ---- Shortcuts popup ----
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("shortcuts-btn");
    const popup = document.getElementById("shortcuts-popup");
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        popup.classList.toggle("show");
    });
    document.addEventListener("click", function () { popup.classList.remove("show"); });
    popup.addEventListener("click", function (e) { e.stopPropagation(); });
});

// ---- Language toggle ----
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("lang-toggle");
    toggle.addEventListener("click", function () {
        currentLang = currentLang === "en" ? "fr" : "en";
        if (currentLang === "fr") {
            toggle.innerHTML = '<span class="toggle-inactive">EN</span> / FR';
        } else {
            toggle.innerHTML = 'EN / <span class="toggle-inactive">FR</span>';
        }
        renderAll();
    });
});

// ---- Theme toggle ----
document.addEventListener("DOMContentLoaded", function () {
    const themes = ["dark", "light", "monokai"];
    const icons = { dark: "🌙", light: "☀️", monokai: "🎨" };
    let themeIndex = 0;
    const toggle = document.getElementById("theme-toggle");

    toggle.addEventListener("click", function () {
        themeIndex = (themeIndex + 1) % themes.length;
        document.documentElement.setAttribute("data-theme", themes[themeIndex]);
        toggle.textContent = icons[themes[themeIndex]];
    });
});

// ---- Terminal ----
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("terminal-btn");
    const win = document.getElementById("terminal-window");
    const close = document.getElementById("terminal-close");
    const input = document.getElementById("terminal-input");
    const output = document.getElementById("terminal-output");

    btn.addEventListener("click", () => {
        win.classList.toggle("show");
        if (win.classList.contains("show")) {
            input.focus();
            setTimeout(() => input.scrollIntoView({ block: "nearest" }), 300);
        }
    });
    close.addEventListener("click", () => win.classList.remove("show"));

    const commands = {
        help: () => `Available commands:
  <span style="color:var(--syn-string)">whoami</span>      — who is Greta?
  <span style="color:var(--syn-string)">skills</span>      — list skills
  <span style="color:var(--syn-string)">education</span>    — education history
  <span style="color:var(--syn-string)">contact</span>     — how to reach me
  <span style="color:var(--syn-string)">projects</span>    — list projects
  <span style="color:var(--syn-string)">interests</span>   — hobbies & fun
  <span style="color:var(--syn-string)">fortune</span>     — random quote
  <span style="color:var(--syn-string)">git log</span>     — timeline of my journey
  <span style="color:var(--syn-string)">date</span>        — current date
  <span style="color:var(--syn-string)">echo [msg]</span>  — repeat after me
  <span style="color:var(--syn-string)">print cv</span>    — printable CV layout
  <span style="color:var(--syn-string)">theme [name]</span>— switch theme (dark/light/monokai)
  <span style="color:var(--syn-string)">clear</span>       — clear terminal
  <span style="color:var(--syn-string)">exit</span>        — close terminal`,

        whoami: () => `Greta Ru-Mei Zu
BSc Computer Science (AI) @ McGill → MSc Computing @ Imperial
Currently: Summer@EPFL in the SaCS Lab 🇨🇭`,

        skills: () => DATA.skills.map(s => `<span style="color:var(--syn-function)">${s.category}:</span> ${s.items}`).join("\n"),

        education: () => DATA.education.map(e => `<span style="color:var(--syn-function)">${e.school}</span> — ${e.degree} (${e.dates})`).join("\n"),

        contact: () => DATA.contact.map(c => `<span style="color:var(--syn-function)">${c.label}:</span> ${c.url}`).join("\n"),

        projects: () => DATA.projectsC.projects.map(p => `<span style="color:var(--syn-function)">${p.comment}</span> (${p.dates}) — ${p.tech}`).join("\n"),

        interests: () => {
            const main = DATA.interests.entries.map(e => `🎯 ${e.name} — ${e.description}`).join("\n");
            const other = DATA.interests.other.join(", ");
            return main + `\n\nAlso: ${other}`;
        },

        fortune: () => {
            const quotes = [
                '"The best way to predict the future is to invent it." — Alan Kay',
                '"Talk is cheap. Show me the code." — Linus Torvalds',
                '"First, solve the problem. Then, write the code." — John Johnson',
                '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
                '"Simplicity is the soul of efficiency." — Austin Freeman',
                '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
                '"It works on my machine. ¯\\_(ツ)_/¯"'
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        },

        date: () => new Date().toString(),

        "print cv": () => {
            window.open("assets/Greta_Zu_CV.pdf", "_blank");
            return "Opening CV...";
        },

        "git log": () => {
            const events = [
                ...DATA.education.map(e => ({ date: e.dates.split("-")[0].trim(), msg: e.degree + " @ " + e.school, type: "edu" })),
                ...DATA.workExperience.map(e => ({ date: e.dates.split("-")[0].trim(), msg: e.role + " @ " + e.company, type: "work" })),
                ...DATA.researchExperience.map(e => ({ date: e.dates.split("-")[0].trim(), msg: e.role + " @ " + e.institution, type: "research" }))
            ];
            const colors = { edu: "var(--syn-dot)", work: "var(--syn-function)", research: "var(--syn-string)" };
            return events.map(e =>
                `<span style="color:var(--syn-function)">*</span> <span style="color:var(--text-muted)">${e.date.padEnd(16)}</span> <span style="color:${colors[e.type]}">${e.msg}</span>`
            ).join("\n") + "\n\n<span style=\"color:var(--text-muted)\">  edu=blue  work=orange  research=green</span>";
        },

        clear: () => null,
        exit: () => null
    };

    function addOutput(html) {
        const div = document.createElement("div");
        div.innerHTML = html.replace(/\n/g, "<br>");
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }

    input.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        const raw = input.value.trim();
        input.value = "";
        if (!raw) return;

        addOutput(`<span style="color:var(--syn-function)">$ </span>${raw}`);

        const parts = raw.split(" ");
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1).join(" ");
        const fullCmd = raw.toLowerCase();

        if (cmd === "clear") {
            output.innerHTML = "";
            return;
        }
        if (cmd === "exit") {
            win.classList.remove("show");
            return;
        }
        if (cmd === "echo") {
            addOutput(args || "");
            return;
        }
        if (cmd === "theme") {
            const valid = ["dark", "light", "monokai"];
            if (valid.includes(args)) {
                document.documentElement.setAttribute("data-theme", args);
                const icons = { dark: "🌙", light: "☀️", monokai: "🎨" };
                document.getElementById("theme-toggle").textContent = icons[args];
                addOutput(`Theme switched to ${args}`);
            } else {
                addOutput(`Usage: theme [dark|light|monokai]`);
            }
            return;
        }
        if (commands[fullCmd]) {
            const result = commands[fullCmd]();
            if (result) addOutput(result);
        } else if (commands[cmd]) {
            const result = commands[cmd]();
            if (result) addOutput(result);
        } else {
            addOutput(`<span style="color:var(--syn-main)">command not found: ${cmd}</span>. Type <span style="color:var(--syn-string)">help</span> for available commands.`);
        }
    });
});

// ---- Sidebar pet ----
(function() {
    const pets = [
        { idle: "/\\_/\\  \n(o.o)", name: "cat" },
        { idle: "(^.^)", name: "kitty" },
        { idle: "(\\ /)\n( . .)\no(\")(\")", name: "bunny" },
        { idle: "<`)))><", name: "fish" },
        { idle: "(~^.^)~", name: "dancer" },
        { idle: "=^..^=", name: "neko" },
        { idle: "(o_O)", name: "owl" },
        { idle: "d(^_^)b", name: "dj" }
    ];
    let petIndex = Math.floor(Math.random() * pets.length);
    const el = document.getElementById("sidebar-pet");
    if (!el) return;
    const petEl = document.createElement("span");
    petEl.className = "pet";
    petEl.textContent = pets[petIndex].idle;
    petEl.title = "Click me!";
    const zzzEl = document.createElement("span");
    zzzEl.className = "pet-zzz";
    zzzEl.textContent = "z Z z";
    el.appendChild(petEl);
    el.appendChild(zzzEl);

    // Swap pet every 4-6 animation iterations (2-3 full left-right cycles)
    let bounces = 0;
    const swapEvery = 4 + Math.floor(Math.random() * 3);
    petEl.addEventListener("animationiteration", function() {
        bounces++;
        if (bounces >= swapEvery) {
            bounces = 0;
            petIndex = (petIndex + 1) % pets.length;
            petEl.textContent = pets[petIndex].idle;
        }
    });

    let sleeping = false;
    petEl.addEventListener("click", function() {
        if (!sleeping) {
            petEl.style.animationPlayState = "paused";
            zzzEl.style.left = petEl.style.left || "0px";
            zzzEl.style.animationPlayState = "running";
            sleeping = true;
        } else {
            petEl.style.animationPlayState = "running";
            zzzEl.style.animationPlayState = "paused";
            zzzEl.style.opacity = "0";
            sleeping = false;
        }
    });
})();

// ---- Code rain ----
(function() {
    const canvas = document.getElementById("code-rain");
    const ctx = canvas.getContext("2d");
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);
    const chars = "01{}[]<>/;:=+-*&|!?.#abcdef".split("");
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);
    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0f0";
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 80);
})();

// ---- Scroll progress bar ----
document.querySelector("main").addEventListener("scroll", function() {
    const el = this;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100;
    document.getElementById("scroll-progress").style.width = Math.min(pct, 100) + "%";
});

// ---- Keyboard shortcuts ----
document.addEventListener("keydown", function(e) {
    if (e.target.tagName === "INPUT") return;
    const tabKeys = {"1":0,"2":1,"3":2,"4":3,"5":4,"6":5};
    if (tabKeys[e.key] !== undefined) {
        const allTabs = document.querySelectorAll(".tabs .tab:not(.hidden):not(#current-project-tab):not(.toolbar-group *)");
        if (allTabs[tabKeys[e.key]]) allTabs[tabKeys[e.key]].click();
    }
    if (e.key === "Escape") document.querySelector('.tab[data-target*="home"]').click();
    if (e.key === "/" && !e.ctrlKey) { e.preventDefault(); document.getElementById("terminal-btn").click(); }
    if (e.key === "`" && !e.ctrlKey && !e.metaKey) document.getElementById("theme-toggle").click();
});

// ---- Easter egg — type "greta" anywhere ----
(function() {
    const secret = "greta";
    let buffer = "";
    document.addEventListener("keydown", function(e) {
        if (e.target.tagName === "INPUT") return;
        buffer += e.key.toLowerCase();
        if (buffer.length > secret.length) buffer = buffer.slice(-secret.length);
        if (buffer === secret) {
            buffer = "";
            for (let i = 0; i < 80; i++) {
                const c = document.createElement("div");
                c.className = "confetti";
                c.style.left = Math.random() * 100 + "vw";
                c.style.background = ["var(--syn-main)","var(--syn-string)","var(--syn-function)","var(--syn-dot)","var(--syn-reserved)"][Math.floor(Math.random()*5)];
                c.style.animationDuration = (Math.random() * 2 + 1) + "s";
                c.style.animationDelay = Math.random() * 0.5 + "s";
                document.body.appendChild(c);
                setTimeout(() => c.remove(), 3500);
            }
        }
    });
})();

// ---- Tab switching ----
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
            if (section) section.style.display = section.classList.contains('about-me') ? 'flex' : 'block';
        });
    });
});

// ---- Mobile hamburger menu ----
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
