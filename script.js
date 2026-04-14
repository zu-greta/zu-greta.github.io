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
const link = (url, label) => `<a href="${url}" target="_blank" style="color:#9cb5db; text-decoration:underline;">${label}</a>`;

function escHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// ---- Helpers for i18n ----
function t(key) {
    if (currentLang === "fr" && FR.headings && FR.headings[key]) return FR.headings[key];
    const defaults = { aboutMe: "About Me", contactMe: "Contact Me", experience: "Experience",
        skills: "Skills", education: "Education", work: "Work", supervisor: "Supervisor",
        project: "Project", relevantCourses: "Relevant courses", awards: "Awards",
        status: "🟢 Open to opportunities" };
    return defaults[key] || key;
}

// ---- Sidebar ----
function renderSidebar() {
    const el = document.getElementById("sidebar-projects");
    let html = "";
    for (const entry of DATA.projectsC.sidebar) {
        if (entry.folder) {
            html += `<div class="projects-folder"><i class="fa fa-angle-down"></i> ${entry.folder}
                <ul class="projects-list" style="padding: 1.5% 2%;">`;
            for (const item of entry.items) {
                const style = item.highlight ? ' style="color: #d1f1a9;"' : "";
                html += `<li class="project-item"${style} data-project="${item.name}">${item.short}</li>`;
            }
            html += `</ul></div>`;
        } else {
            html += `<li class="project-item" data-project="${entry.name}">${entry.short}</li>`;
        }
    }
    el.innerHTML = html;
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

    py += `\n<hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.08); margin: 0.8rem 0;">\n`;

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
<hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.08); margin: 0.8rem 0;">

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

    // Render images
    let imgHtml = "";
    for (const e of d.entries) {
        imgHtml += `<div style="text-align: center;">
            <img src="${e.image}" alt="${e.name}" style="height: 150px; border-radius: 5px; display: block; margin: 0 auto;">
            <p style="color: #ffffff; font-family: 'Fira Code', monospace; font-size: 0.85rem;">${e.image}</p>
        </div>`;
    }
    document.getElementById("interests-images").innerHTML = imgHtml;
}

// ---- Profile popup ----
function renderProfilePopup() {
    const el = document.getElementById("profile-links");
    el.innerHTML = DATA.contact.map(c =>
        `<a href="${c.url}" target="_blank"><i class="fa ${c.icon}"></i> ${c.label}</a>`
    ).join("");
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
    // Update greeting
    document.getElementById("home").innerHTML = `<h1 style="text-align: center;" class="colour_main">${
        currentLang === "fr" ? FR.greeting : "Hello World, I'm Greta"
    }</h1>`;
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
}

document.addEventListener("DOMContentLoaded", function () {
    renderAll();
    initProfilePopup();
});

// ---- Language toggle ----
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("lang-toggle");
    toggle.addEventListener("click", function () {
        currentLang = currentLang === "en" ? "fr" : "en";
        if (currentLang === "fr") {
            toggle.innerHTML = '<span class="lang-inactive">EN</span> / FR';
        } else {
            toggle.innerHTML = 'EN / <span class="lang-inactive">FR</span>';
        }
        renderAll();
    });
});

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
