# Greta Zu — Personal Website

VS Code-themed personal portfolio. Hosted on GitHub Pages at [zu-greta.github.io](https://zu-greta.github.io/).

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | Page shell — rarely needs editing |
| `data.js` | **All content lives here** — edit this to update the site |
| `script.js` | Rendering logic, interactions, terminal |
| `styles.css` | Styling, themes, responsive layout |
| `assets/` | Images, PDFs (CV, reports, presentations) |

## How Content Is Organized

Everything is in `data.js`, split into two main arrays plus a handful of smaller lists:

- **`EXPERIENCE`** — every job and research position. Drives the Home tab experience blocks, the Experience sidebar + its detail cards, and the Experience.py code tab. Each entry has `type: "work"` or `type: "research"`.
- **`PROJECTS`** — the project catalog. Drives the Projects sidebar + detail cards, and the Projects.c code tab.
- **`SKILLS`, `EDUCATION`, `NEWS`, `INTERESTS`, `ABOUT_ME`, `HEADINGS`, `CONTACT`** — the rest of the Home tab.
- **`EDUCATION_JAVA`, `SKILLS_BASH`** — hand-written, English-only code-tab content that rarely changes.

**You write each thing once.** A research position that should also appear in the Projects catalog (like the EPFL project) just gets `alsoProject: true` on its `EXPERIENCE` entry — the sidebar, detail card, and code tab all pull from that one object instead of being retyped elsewhere.

### Controlling where something appears

Every `EXPERIENCE` / `PROJECTS` entry has a `show` object:

```js
show: { home: true, sidebar: true, code: true }
```

Set any of these to `false` to hide the entry from that surface without deleting its data. (`home` only applies to `EXPERIENCE` — the Projects catalog has no separate "home" list.)

### Adding a new job

Add **one object** to `EXPERIENCE`:

```js
{
    id: "exp-my-new-job",
    type: "work",
    dates: "Jan 2027 - May 2027",        // English only — French dates are automatic, see below
    org: "Company Name",
    logo: "assets/logos/company.png",     // small icon, shown in the Home tab list
    image: "assets/logos/company_banner.png", // banner shown in the detail card
    short: "Company - Short Title",       // sidebar label
    role: { en: "Job Title", fr: "Titre du poste" },
    description: {
        en: "One paragraph describing the role — shown in the Home tab, the detail card, and (as bullets, see below) the code tab.",
        fr: "Le même paragraphe en français — utilisé seulement sur la page d'accueil."
    },
    bullets: ["Bullet one", "Bullet two", "Bullet three"], // optional — used for Experience.py; omit and it auto-splits the English description into sentences instead
    tech: ["Python", "..."],
    show: { home: true, sidebar: true, code: true }
}
```

That's it — the sidebar entry, the detail card, the Experience.py entry, and the Home tab block all come from this one object.

### Adding a new research position

Same shape, with `type: "research"` and a few extra fields:

```js
{
    id: "exp-my-new-lab",
    type: "research",
    dates: "Jan 2027 - May 2027",
    org: "Some Lab",                       // short name — sidebar label & detail-card chip
    institutionFull: "Full Institution Name - Some Lab", // long name, shown on the Home tab heading only
    course: "Some Lab - Prof. Last Name",  // detail-card context chip
    logo: "assets/logos/somelab.png",
    image: "assets/logos/somelab.png",
    short: "Some Lab - Short Name",        // Experience-sidebar label
    roleTitle: "Research Assistant - Some Lab", // Experience detail-card title
    projectShort: "Short Project Name",    // Projects-sidebar label (only needed if alsoProject is true)
    role: { en: "Research Assistant", fr: "Assistante de recherche" },
    supervisor: { en: "Professor X", fr: "Professeure X" },
    title: { en: "Full project title", fr: "Titre complet du projet" }, // shown on the Home tab "Project:" line, and as the Projects detail-card title
    description: "One paragraph, English only — detail cards & code tabs are always English.",
    bullets: ["Bullet one", "Bullet two"],
    tech: ["Python", "..."],
    links: [{ label: "📄 Report", url: "assets/reports/..." }],
    alsoProject: true,                     // also show this under Projects
    projectFolder: "Research Projects",    // which Projects sidebar folder to file it under
    show: { home: true, sidebar: true, code: true }
}
```

`roleTitle`/`short` are what you see coming from the **Experience** side; `title`/`projectShort` are what you see coming from the **Projects** side (a research position is genuinely framed a little differently in each context — that's the one deliberate exception to "one field, one place"). If you don't need the Projects-side framing to differ, you can just reuse the same wording in both.

If a research write-up needs an even shorter/punchier title specifically in the Projects.c code display, add `codeTitle: "..."` — it falls back to `title` if omitted.

### Adding a new project (non-research)

Add **one object** to `PROJECTS`:

```js
{
    id: "my-new-project",
    projectFolder: "Web Development",   // omit for a top-level, ungrouped sidebar item
    dates: "Jan 2027 - May 2027",
    short: "Short Sidebar Label",
    title: "Full Project Title",
    image: "assets/logos/project.png",
    description: "One paragraph — English only, shown in the detail card and the Projects.c tab.",
    tech: ["React", "Node.js"],
    course: "COMP 000 - Some Course",     // or "Personal Project" / "Hackathon Name" etc.
    funcName: "My_New_Project",           // optional — Projects.c function/struct name; auto-derived from the id if omitted
    links: [
        { label: "🌐 Website", url: "..." },
        { label: "💻 Code", url: "..." }
    ],
    show: { sidebar: true, code: true }
}
```

`projectFolder` groups the sidebar automatically — the **first time** a folder name appears in the array, a new accordion folder is created at that point; every later item using the same name joins it. There's no separate folder list to maintain. Link labels (`💻 Code`, `🌐 Website`, `🎬 Demo`, `📋 Devpost`, `📄 Report`, ...) also auto-generate their Projects.c variable name (`code_link`, `website_link`, etc.) from the label's first word — you don't need to name that yourself.

### Adding new education

Add **one object** to `EDUCATION`:

```js
{
    school: "School Name",
    logo: "./assets/logos/school.png",
    degree: { en: "Degree Name", fr: "Nom du diplôme" },
    dates: "Sept 2027 - May 2029",   // English only — French auto-generates
    gpa: "3.9/4.0",                   // or rScore, whichever applies
    courses: "Course A, Course B, ...",
    awards: { en: "Award Name", fr: "Nom du prix" }
}
```

If you also want it listed in the Education.java code tab, add a matching entry to `EDUCATION_JAVA` (that one's hand-written and rarely changes, so it isn't auto-derived).

### New skill

- `SKILLS` — add to the relevant category's `items` string (wrap `category`/`items` in `{ en, fr }` only if the French differs)
- `SKILLS_BASH` — add to the relevant `values` array (English-only code tab)

### New interest / photo

- `INTERESTS.entries` — for the Interests.json code display (`name`, `description` as `{ en, fr }`, `image`)
- `INTERESTS.gallery` — for the polaroid gallery (just `name` + `image` path)
- `INTERESTS.other` — text-only list items

### New news item

Add to `NEWS`:

```js
{ date: "Jan 2027", text: { en: "...", fr: "..." } }
```

Add it wherever in the array you want it to appear (the array isn't auto-sorted — order is whatever you place it in).

## French Translations

Wrap a value in `{ en: "...", fr: "..." }` **only where the language actually needs different text** — bios, roles, titles, and blurbs shown on the Home tab. Everything else (company names, tech lists, links, folder names) is a plain string/array shown as-is in both languages.

**If you leave `fr` out, the English text is used automatically** — nothing breaks, and you can add the French translation whenever you get to it. There's no requirement to update both languages at the same time.

**Dates never need a French version at all.** Every `dates` field is written once, in English (`"Jan 2026 - May 2026"`). `localizeDates()` in `script.js` translates the month names (and words like "Present"/"Expected") automatically whenever the site is in French. You will never type a French date.

**Detail cards and the code-themed tabs (Experience.py, Projects.c, Education.java, Skills.bash) are always in English by design** — that's the whole "code tabs stay in English" idea. Only the Home tab, sidebar folder headings, and (as it happened to work before this update) Interests.json respect the language toggle. So `description` on a research `EXPERIENCE` entry, or `description` on a `PROJECTS` entry, is always a plain English string — it's never shown in French, so it never needs a `fr` version.

## Statuses

Sidebar and detail-card statuses auto-compute from `dates` — never set by hand:

- **M** (orange) — start date passed, end date in future → In Progress
- **A** (green) — start date in future → Upcoming
- No badge — end date passed → Completed

## Long Text in the Code Tabs

You never need to manually break a long `description` (or any other long line) into shorter pieces to keep Experience.py / Projects.c / Education.java / Skills.bash readable. The `<pre>` blocks those tabs render into (`.code-pre` in `styles.css`) wrap automatically:

```css
.code-pre {
    white-space: pre-wrap;   /* wrap long lines instead of forcing horizontal scroll */
    overflow-wrap: anywhere; /* force-break a single long token (e.g. a URL) if it still doesn't fit */
}
```

Write `description` as one long sentence (or a few) in `data.js` exactly like everything else — the `/* comment */` block, the `"quoted string"` lines, and the auto-generated link lines all reflow to fit the tab's width on their own, at any screen size. There's no fixed character width to tune and nothing to keep in sync if the tab gets narrower or wider (e.g. on mobile) — it's handled once, in CSS, for every code tab at once.

## Footer: "Last Modified" Date

The footer doesn't show today's date — it shows the date of the **last commit actually pushed to GitHub**, fetched live from GitHub's public API (`GET https://api.github.com/repos/{REPO}/commits`), so it stays accurate without you touching anything after a push.

- `REPO` (near the top of `data.js`, next to `CONTACT`) is `"zu-greta/zu-greta.github.io"`. If the repo is ever renamed or moved, update that one line.
- The result is cached in the visitor's browser (`localStorage`) for 6 hours, so repeat visits don't re-hit GitHub's API — this matters because GitHub allows only 60 unauthenticated requests per hour per visitor IP.
- If the request ever fails (offline, rate-limited, an ad blocker, GitHub down), the footer says "date unavailable" rather than silently showing today's date as if it were real.
- This only runs once per page load (`renderFooter()` in `script.js`, called from the `DOMContentLoaded` handler) — it does **not** re-fetch every time you flip the EN/FR toggle, since `renderAll()` (which the toggle re-runs) no longer touches the footer at all.

## Features

- **3 themes**: dark (default), light, monokai — toggle with 🌙 button or backtick key
- **EN/FR toggle**: translates Home tab content and sidebar folder headings; dates translate automatically
- **Interactive sidebar**: collapsible Projects/Experience accordion, clickable items open detail cards
- **Terminal**: click >_ button or press `/` — commands: `help`, `whoami`, `skills`, `projects`, `education`, `contact`, `interests`, `fortune`, `git log`, `print cv`, `theme [name]`, `echo`, `clear`, `exit`
- **Keyboard shortcuts**: `1-6` tabs, `Esc` home, `/` terminal, `` ` `` theme, `?` button for reference
- **Easter egg**: type `greta` anywhere
- **Floating contact bar**: left side (desktop), bottom dock (mobile)
- **Sidebar pet**: ASCII kaomoji that walks and cycles, click to sleep/wake
- **Code rain**: faint Matrix background on dark themes

## Local Development

Just open `index.html` in a browser. No build step needed.