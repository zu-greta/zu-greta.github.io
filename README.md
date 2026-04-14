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

## How to Update Content

Everything is in `data.js`. The site has English content at the top and French translations in the `FR` object at the bottom.

### New Job

Add an entry to **all of these**:

1. `workExperience` — home tab display (company, role, dates, work description)
2. `experienceSidebar` — sidebar item (id, short name)
3. `experienceDetails` — detail card when clicked (title, company, dates, description, tech array)
4. `experiencePy.work` — Experience.py code tab (comment, company, role, dates, details array)
5. `FR.workExperience` — French translation (role, work)

### New Research Position

Same as job but use:

1. `researchExperience` — home tab (institution, role, dates, supervisor, project)
2. `experienceSidebar` — under the Research folder
3. `experienceDetails` — detail card
4. `experiencePy.research` — Experience.py code tab
5. `FR.researchExperience` — French translation

### New Project

1. `projectsC.sidebar` — sidebar item (id, short name, in the right folder)
2. `projectsC.details` — detail card (title, dates, description, tech, course, links)
3. `projectsC.projects` — Projects.c code tab (funcName, comment, dates, description, tech, links)

### New Education

1. `education` — home tab (school, degree, dates, gpa/rScore, courses, awards)
2. `educationJava` — Education.java code tab (className, fields, arrayFields)
3. `FR.education` — French translation (degree, dates, awards)

### New Skill

- `skills` — add to the relevant category's `items` string
- `skillsBash` — add to the relevant `values` array

### New Interest / Photo

- `interests.entries` — for the JSON code display (name, description, image)
- `interests.gallery` — for the polaroid gallery (just name + image path)
- `interests.other` — text-only list items
- `FR.interests.entries` — French description

## Statuses

Sidebar statuses auto-compute from dates:
- **M** (orange) — start date passed, end date in future → In Progress
- **A** (green) — start date in future → Upcoming
- No badge — end date passed → Completed

No manual status updates needed.

## Features

- **3 themes**: dark (default), light, monokai — toggle with 🌙 button or backtick key
- **EN/FR toggle**: translates home tab content
- **Interactive sidebar**: collapsible Projects/Experience accordion, clickable items open detail cards
- **Terminal**: click >_ button or press `/` — commands: `help`, `whoami`, `skills`, `projects`, `education`, `contact`, `interests`, `fortune`, `git log`, `print cv`, `theme [name]`, `echo`, `clear`, `exit`
- **Keyboard shortcuts**: `1-6` tabs, `Esc` home, `/` terminal, `` ` `` theme, `?` button for reference
- **Easter egg**: type `greta` anywhere
- **Floating contact bar**: left side (desktop), bottom dock (mobile)
- **Sidebar pet**: ASCII kaomoji that walks and cycles, click to sleep/wake
- **Code rain**: faint Matrix background on dark themes

## Local Development

Just open `index.html` in a browser. No build step needed.
