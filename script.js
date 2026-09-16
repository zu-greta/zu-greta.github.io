// ============================================================
// RENDERING — Builds all HTML from EXPERIENCE / PROJECTS / etc.
// (defined in data.js). See data.js for how to add content.
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

// ============================================================
// ---- i18n helpers ----
// L(val)  = the value in the CURRENT language (Home tab / sidebar
//           folder names). Falls back to English if French is missing.
// EN(val) = always the English value (detail cards + code tabs, which
//           are English-only by design).
// Both accept either a plain value (shown as-is in both languages)
// or a { en, fr } object.
// ============================================================
function L(val) {
    if (val && typeof val === "object" && !Array.isArray(val) && ("en" in val || "fr" in val)) {
        return (currentLang === "fr" && val.fr) ? val.fr : val.en;
    }
    return val;
}
function EN(val) {
    if (val && typeof val === "object" && !Array.isArray(val) && "en" in val) return val.en;
    return val;
}

function t(key) {
    if (HEADINGS[key]) return L(HEADINGS[key]);
    return key;
}

// ---- Automatic French date localization ----
// Write every `dates` field once, in English (e.g. "June 2026 - Aug 2026").
// French display is generated from it here — no French dates to maintain.
const MONTH_FR = {
    jan: "Janv.", january: "Janvier", feb: "Févr.", february: "Février",
    mar: "Mars", march: "Mars", apr: "Avr.", april: "Avril",
    may: "Mai", jun: "Juin", june: "Juin", jul: "Juil.", july: "Juillet",
    aug: "Août", august: "Août", sep: "Sept.", sept: "Sept.", september: "Septembre",
    oct: "Oct.", october: "Octobre", nov: "Nov.", november: "Novembre",
    dec: "Déc.", december: "Décembre"
};
const WORD_FR = { present: "Présent", ongoing: "En cours", expected: "prévu", tbd: "à déterminer" };

function translateDateWord(word) {
    const core = word.toLowerCase().replace(/[^a-z]/g, "");
    const repl = MONTH_FR[core] || WORD_FR[core];
    if (!repl || !core) return word;
    return word.replace(new RegExp(core, "i"), repl);
}
function localizeDatePart(part) {
    return part.trim().split(/\s+/).map(translateDateWord).join(" ");
}
function localizeDates(str) {
    if (currentLang !== "fr" || !str) return str;
    if (str.includes(" - ")) return str.split(" - ").map(localizeDatePart).join(" - ");
    return localizeDatePart(str);
}

// ---- Status (auto-computed from dates — never set by hand) ----
const monthMap = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7, sep: 8, sept: 8, september: 8, oct: 9, nov: 10, dec: 11, december: 11 };
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
    const startStr = dates.split("-")[0].trim().toLowerCase();
    const startParts = startStr.split(/\s+/);
    if (startParts.length >= 2) {
        const m = monthMap[startParts[0]];
        const y = parseInt(startParts[1]);
        if (m !== undefined && y) {
            const startDate = new Date(y, m, 1);
            if (startDate > now) return "A";
        }
    }
    if (end >= now) return "M";
    return "";
}

function statusColor(status) {
    if (status === "M") return "var(--syn-function)";
    if (status === "A") return "var(--syn-string)";
    return "";
}

// ============================================================
// ---- Derived views (built from EXPERIENCE / PROJECTS) ----
// ============================================================

// Every project — the hand-written PROJECTS catalog, plus any
// EXPERIENCE entry flagged alsoProject:true (shown in ITS OWN words,
// never re-typed).
function allProjects() {
    const fromExperience = EXPERIENCE.filter(e => e.alsoProject).map(e => ({
        id: e.id,
        projectFolder: e.projectFolder,
        dates: e.dates,
        short: e.projectShort || e.short,
        title: EN(e.title),
        image: e.image,
        description: EN(e.description),
        tech: e.tech,
        course: e.course,
        links: e.links || [],
        funcName: e.funcName,
        codeTitle: e.codeTitle,
        show: e.show
    }));
    return [...fromExperience, ...PROJECTS];
}

// Group a list into sidebar folders, in order of first appearance —
// so adding a new `projectFolder` name automatically creates a new
// accordion folder, and leaving it out keeps the item top-level.
function groupByFolder(items, folderKeyFn, mapFn) {
    const order = [];
    const buckets = new Map();
    items.forEach(item => {
        const key = folderKeyFn(item) || null;
        if (!buckets.has(key)) { buckets.set(key, []); order.push(key); }
        buckets.get(key).push(mapFn(item));
    });
    return order.map(key => key ? { folder: key, items: buckets.get(key) } : { items: buckets.get(key), ungrouped: true });
}

function experienceSidebarTree() {
    const items = EXPERIENCE.filter(e => e.show.sidebar);
    return groupByFolder(items, e => (e.type === "research" ? "Research" : "Work"), e => ({ id: e.id, short: e.short }));
}

function projectsSidebarTree() {
    const items = allProjects().filter(p => p.show && p.show.sidebar !== false);
    return groupByFolder(items, p => p.projectFolder, p => ({ id: p.id, short: p.short || p.title }));
}

// Look up the detail-card shape for an id. `via` is "experience" or
// "projects" — for a research item that appears on both sidebars, this
// picks the right title/short label (its Experience-side role title vs.
// its Projects-side project title), without storing two copies of the
// rest of the content.
function findDetail(id, via) {
    const exp = EXPERIENCE.find(e => e.id === id);
    if (exp && (via !== "projects" || !exp.alsoProject)) {
        return {
            title: exp.type === "research" ? (exp.roleTitle || EN(exp.title)) : EN(exp.role),
            image: exp.image,
            dates: exp.dates,
            course: exp.course || exp.org,
            description: EN(exp.description),
            tech: exp.tech,
            links: exp.links || []
        };
    }
    const proj = allProjects().find(p => p.id === id);
    if (proj) return proj;
    if (exp) {
        return {
            title: EN(exp.title || exp.role), image: exp.image, dates: exp.dates,
            course: exp.course || exp.org, description: EN(exp.description), tech: exp.tech, links: exp.links || []
        };
    }
    return null;
}

// ---- Sidebar rendering ----
function renderSidebarList(el, tree, source) {
    let html = "";
    for (const group of tree) {
        if (group.ungrouped) {
            for (const item of group.items) html += sidebarItemHtml(item, source);
        } else {
            html += `<div class="projects-folder" onclick="this.classList.toggle('collapsed')">
                <i class="fa fa-angle-down folder-arrow"></i> ${group.folder}
                <ul class="projects-list folder-contents" style="padding: 1.5% 2%;">`;
            for (const item of group.items) html += sidebarItemHtml(item, source);
            html += `</ul></div>`;
        }
    }
    el.innerHTML = html;
    el.querySelectorAll(".project-item").forEach(item => {
        item.addEventListener("click", function (e) {
            e.stopPropagation();
            const id = this.dataset.itemId;
            const src = this.dataset.source;
            openDetailPanel(id, src);
            document.querySelectorAll(".project-item").forEach(p => p.classList.remove("active"));
            this.classList.add("active");
        });
    });
}

function sidebarItemHtml(item, source) {
    const detail = findDetail(item.id, source);
    const status = detail ? autoStatus(detail.dates) : "";
    const color = statusColor(status);
    const style = color ? ` style="color:${color}"` : "";
    const badge = status ? `<span class="git-badge">${status}</span>` : "";
    return `<li class="project-item"${style} data-item-id="${item.id}" data-source="${source}">${item.short}${badge}</li>`;
}

function renderSidebar() {
    renderSidebarList(document.getElementById("sidebar-projects"), projectsSidebarTree(), "projects");
    renderSidebarList(document.getElementById("sidebar-experience"), experienceSidebarTree(), "experience");
}

function openDetailPanel(id, source) {
    const p = findDetail(id, source);
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
    const context = p.course || "";
    const detail = document.getElementById("project-detail");
    detail.style.display = "block";
    const imgHtml = p.image ? `<div class="detail-banner"><img src="${p.image}" alt="${p.title}"><div class="detail-banner-fade"></div></div>` : "";
    detail.innerHTML = `
        <div class="project-card">
            ${imgHtml}
            <div class="project-card-body">
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
                    ${(p.tech || []).map(tg => `<span class="tech-tag">${tg}</span>`).join("")}
                </div>
                ${p.links && p.links.length ? `<div class="project-links">
                    ${p.links.map(l => `<a href="${l.url}" target="_blank">${l.label}</a>`).join("")}
                </div>` : ""}
            </div>
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
    const text = L(ABOUT_ME.text);
    const status = STATUS ? `<p class="about-status">${L(STATUS)}</p>` : "";
    document.getElementById("about-me").innerHTML = `
        <div class="about-me-img"><img src="${ABOUT_ME.image}" alt="Greta's Profile Picture"></div>
        <div class="about-me-text"><h2>${t("aboutMe")}</h2>${status}<p>${text}</p></div>`;
}

function renderContact() {
    const el = document.getElementById("contact-me");
    el.innerHTML = `<h2>${t("contactMe")}</h2>` +
        CONTACT.map(c => `<a href="${c.url}" target="_blank" class="${c.label === 'CV' ? 'cv-highlight' : ''}"><i class="fa ${c.icon}"></i> ${c.label}</a>`).join("\n");

    document.getElementById("contact-bar").innerHTML = CONTACT.map(c =>
        `<a href="${c.url}" target="_blank" class="${c.label === 'CV' ? 'cv-highlight' : ''}"><i class="fa ${c.icon}"></i><span>${c.label}</span></a>`
    ).join("");
}

function renderHomeExperience() {
    let html = `<h2 style="text-align: center;">${t("experience")}</h2><br>`;
    EXPERIENCE.filter(e => e.type === "work" && e.show.home).forEach(e => {
        const logo = e.logo ? `<img src="${e.logo}" alt="${e.org}" class="exp-logo">` : "";
        html += `<blockquote class="exp-entry">${logo}<div>
            <b style="font-size:1.2rem;">${e.org}</b>
            <ul style="list-style-type:none;padding-left:0;margin:0;">
                <li><b style="font-size:1rem;">${L(e.role)}</b> (${localizeDates(e.dates)})</li>
                <li><b style="font-size:1rem;">${t("work")}: </b> ${escHtml(L(e.description))}</li>
            </ul></div></blockquote><br>`;
    });
    html += "<hr><br>";
    EXPERIENCE.filter(e => e.type === "research" && e.show.home).forEach(e => {
        const logo = e.logo ? `<img src="${e.logo}" alt="${e.institutionFull || e.org}" class="exp-logo">` : "";
        html += `<blockquote class="exp-entry">${logo}<div>
            <b style="font-size:1.2rem;">${e.institutionFull || e.org}</b>
            <ul style="list-style-type:none;padding-left:0;margin:0;">
                <li><b style="font-size:1rem;">${L(e.role)}</b> (${localizeDates(e.dates)})</li>
                <li><b style="font-size:1rem;">${t("supervisor")}: </b> ${L(e.supervisor)}</li>
                <li><b style="font-size:1rem;">${t("project")}: </b> ${L(e.title)}</li>
            </ul></div></blockquote><br>`;
    });
    document.getElementById("experience").innerHTML = html;
}

function renderHomeSkills() {
    let html = `<h2 style="text-align: center;">${t("skills")}</h2><br><ul style="list-style-type:none;padding-left:0;margin:0;">`;
    SKILLS.forEach(s => {
        html += `<li><b>${L(s.category)}:</b> ${L(s.items)}</li>`;
    });
    html += "</ul>";
    document.getElementById("skills").innerHTML = html;
}

function renderHomeEducation() {
    let html = `<h2 style="text-align: center;">${t("education")}</h2>`;
    EDUCATION.forEach((e, i) => {
        if (i > 0) html += "<br><hr><br>";
        const logoHtml = e.logo ? `<img src="${e.logo}" alt="${e.school}" class="edu-logo">` : "";
        html += `<blockquote class="edu-entry">${logoHtml}<div>
            <b style="font-size:1.2rem;">${e.school}</b>
            <ul style="list-style-type:none;padding-left:0;margin:0;">
                <li><b style="font-size:1rem;">${L(e.degree)}</b> (${localizeDates(e.dates)})</li>`;
        if (e.gpa) html += `<li><b style="font-size:1rem;">cGPA: </b> ${e.gpa}</li>`;
        if (e.rScore) html += `<li><b style="font-size:1rem;">R-Score: </b> ${e.rScore}</li>`;
        if (e.courses) html += `<li><b style="font-size:1rem;">${t("relevantCourses")}: </b>${e.courses}</li>`;
        if (e.awards) html += `<li><b style="font-size:1rem;">${t("awards")}: </b> ${L(e.awards)}</li>`;
        html += `</ul></div></blockquote>`;
    });
    document.getElementById("education").innerHTML = html;
}

function renderNews() {
    const el = document.getElementById("news");
    if (!NEWS || !NEWS.length) { el.innerHTML = ""; return; }
    const items = NEWS.map(n => `<tr><td class="news-date">${localizeDates(n.date)}</td><td>${L(n.text)}</td></tr>`).join("");
    el.innerHTML = `<h2 style="text-align:center;">${t("news")}</h2><table class="news-table">${items}</table>`;
}

// ---- Code-themed tabs (always English) ----
function experienceBullets(e) {
    if (e.bullets && e.bullets.length) return e.bullets;
    return EN(e.description).split(/\.\s+/).filter(Boolean).map(s => s.replace(/\.$/, ""));
}

function renderExperiencePy() {
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
    EXPERIENCE.filter(e => e.type === "work" && e.show.code).forEach(e => {
        const details = experienceBullets(e).map(d => `        ${st(escHtml(d))}`).join(",\n");
        py += `
${cm("# " + e.short)}
${fn("experience.add_position")}(
    ${st(escHtml(e.org))},
    ${st(escHtml(EN(e.role)))},
    ${st(e.dates)},
    [
${details}
    ]
)
`;
    });

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
    EXPERIENCE.filter(e => e.type === "research" && e.show.code).forEach(e => {
        const details = experienceBullets(e).map(d => `        ${st(escHtml(d))}`).join(",\n");
        py += `
${cm("# " + e.short)}
${fn("research.add_project")}(
    ${st(escHtml(e.org))},
    ${st(escHtml(EN(e.supervisor)))},
    ${st(e.dates)},
    [
${details}
    ]
)
`;
    });

    document.getElementById("experiencepy-pre").innerHTML = py;
}

// derive a `char *some_link` variable name from a link label like "💻 Code"
function linkVarName(label) {
    const word = label.replace(/[^\p{L}]+/gu, " ").trim().split(/\s+/)[0] || "link";
    return word.toLowerCase() + "_link";
}

function renderProjectsC() {
    const all = allProjects().filter(p => p.show && p.show.code !== false);
    const regular = all.filter(p => p.projectFolder !== "Research Projects");
    const research = all.filter(p => p.projectFolder === "Research Projects");

    let c = `${cm("// Projects")}

${rs("#include")} &lt;stdio.h&gt;
`;
    for (const p of regular) {
        const funcName = p.funcName || p.id.replace(/[^A-Za-z0-9]+/g, "_");
        c += `
${cm("// " + (p.short || p.title))}
${rs("void")} ${funcName}() {
    ${cm("// " + p.dates)}
    ${cm("/*")} ${p.description} ${cm("*/")}
    ${fn("char")} *tech = ${st((p.tech || []).join(", "))};`;
        for (const l of (p.links || [])) {
            c += `\n    ${fn("char")} *${linkVarName(l.label)} = ${S("colour_string", '"' + link(l.url, l.label) + '"')};`;
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
    for (const p of research) {
        const structName = p.funcName || p.id.replace(/[^A-Za-z0-9]+/g, "_");
        const reportLink = (p.links || [])[0];
        const codeTitle = p.codeTitle || p.title;
        c += `
${cm("// " + codeTitle)}
${rs("struct")} ${structName} {
    ${fn("char")} *title = ${st(codeTitle)};
    ${fn("char")} *description = ${st(p.description)};
    ${reportLink ? cm("// Report → " + link(reportLink.url, reportLink.label)) : ""}
};
`;
    }

    document.getElementById("projectsc-pre").innerHTML = c;
}

function renderEducationJava() {
    let java = "";
    for (const cls of EDUCATION_JAVA) {
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
    for (const group of SKILLS_BASH) {
        bash += `\n${dt("$")} ${mn(group.varName)}=${pn("(")}`;
        for (const v of group.values) {
            bash += `\n    ${st(v)}`;
        }
        bash += `\n${pn(")")}\n`;
    }
    document.getElementById("skillsbash-pre").innerHTML = bash;
}

function renderInterestsJson() {
    const d = INTERESTS;
    let json = `${cm("// My hobbies and interests")}\n${pn("{")}`;
    d.entries.forEach((e) => {
        json += `\n    ${mn('"' + e.name + '"')}${pn(":")} ${pn("{")}
        ${mn('"description"')}${pn(":")} ${st(L(e.description))}${pn(",")}
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
        { value: allProjects().length, label: "Projects" },
        { value: String(SKILLS[0].items).split(",").length, label: "Languages" },
        { value: EXPERIENCE.length, label: "Positions" },
        { value: EDUCATION.length, label: "Degrees" }
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
    const greetText = L(GREETING);
    const homeEl = document.getElementById("home");
    homeEl.innerHTML = `<h1 style="text-align: center;" class="colour_main"><span id="typed-greeting"></span><span class="cursor-blink">|</span></h1>`;
    typeText("typed-greeting", greetText);
    const statusEl = document.querySelector(".profile-status");
    if (statusEl) statusEl.textContent = t("status");

    renderSidebar();
    renderAboutMe();
    renderContact();
    renderHomeExperience();
    renderHomeSkills();
    renderHomeEducation();
    renderNews();
    renderExperiencePy();
    renderProjectsC();
    renderEducationJava();
    renderSkillsBash();
    renderInterestsJson();
    renderProfilePopup();

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

        skills: () => SKILLS.map(s => `<span style="color:var(--syn-function)">${EN(s.category)}:</span> ${EN(s.items)}`).join("\n"),

        education: () => EDUCATION.map(e => `<span style="color:var(--syn-function)">${e.school}</span> — ${EN(e.degree)} (${e.dates})`).join("\n"),

        contact: () => CONTACT.map(c => `<span style="color:var(--syn-function)">${c.label}:</span> ${c.url}`).join("\n"),

        projects: () => allProjects().filter(p => p.projectFolder !== "Research Projects").map(p => `<span style="color:var(--syn-function)">${p.short || p.title}</span> (${p.dates}) — ${(p.tech || []).join(", ")}`).join("\n"),

        interests: () => {
            const main = INTERESTS.entries.map(e => `🎯 ${e.name} — ${EN(e.description)}`).join("\n");
            const other = INTERESTS.other.join(", ");
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
                ...EDUCATION.map(e => ({ date: e.dates.split("-")[0].trim(), msg: EN(e.degree) + " @ " + e.school, type: "edu" })),
                ...EXPERIENCE.map(e => ({ date: e.dates.split("-")[0].trim(), msg: EN(e.role) + " @ " + e.org, type: e.type === "research" ? "research" : "work" }))
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