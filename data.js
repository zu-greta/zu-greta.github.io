// ============================================================
// DATA FILE — write everything here.
//
// Organization:
// ---------------------------------------------------------------
// - EXPERIENCE: every job and research position. 
//   Home tab, Experience sidebar + detail cards, and Experience.py.
//   A research entry can also show up under Projects by setting
//   `alsoProject: true` 
// - PROJECTS: the project catalog. Projects sidebar +
//   detail cards, and Projects.c.
// - SKILLS / EDUCATION / NEWS / INTERESTS / ABOUT_ME / HEADINGS:
//   the rest of the Home tab.
//
// CONTROLLING WHERE SOMETHING APPEARS
// ---------------------------------------------------------------
// Every EXPERIENCE/PROJECTS entry has a `show` object:
//   { home: true, sidebar: true, code: true }
// Set any of those to false to hide the entry from that surface
// without deleting its data. (`home` only applies to EXPERIENCE —
// the Projects catalog has no separate "home" list.)
//
// FRENCH TRANSLATIONS
// ---------------------------------------------------------------
// Wrap a value in { en: "...", fr: "..." }. 
// If `fr` left out english will be used by default
//
// DATES — WRITE ONCE, IN ENGLISH. french automatically generated from this.
// ============================================================

const GREETING = { en: "Hello World, I'm Greta", fr: "Hello World, je suis Greta" };

const STATUS = {
    en: "Open to opportunities - Summer 2027 & beyond",
    fr: "Ouverte aux opportunités - Été 2027 et au-delà"
};

const HEADINGS = {
    aboutMe: { en: "About Me", fr: "À propos de moi" },
    contactMe: { en: "Contact Me", fr: "Me contacter" },
    experience: { en: "Experience", fr: "Expérience" },
    skills: { en: "Skills", fr: "Compétences" },
    education: { en: "Education", fr: "Éducation" },
    work: { en: "Work", fr: "Travail" },
    supervisor: { en: "Supervisor", fr: "Superviseur" },
    project: { en: "Project", fr: "Projet" },
    relevantCourses: { en: "Relevant courses", fr: "Cours pertinents" },
    awards: { en: "Awards", fr: "Prix" },
    news: { en: "News", fr: "Nouvelles" }
};

const ABOUT_ME = {
    image: "./assets/Linkedin_picture.jpg",
    text: {
        en: `I am a Master of Science in <b>Computing (Software Engineering)</b> student at
            <a href="https://www.imperial.ac.uk/">Imperial College London</a> (graduating September 2027).
            My work spans <b>software engineering</b>, <b>machine learning</b>, and <b>energy-efficient AI</b>.
            <br><br>
            Previously, I worked with the <a href="https://www.epfl.ch/labs/sacs/">EPFL SaCS lab</a> with Dr. Biswas,
            Dr. Devos, and Dr. Garcia Bourrée (under Professor Anne-Marie Kermarrec) on watermarking in output layer
            for free-rider detection in federated learning. This was a part of the <a href="https://www.epfl.ch/labs/sacs/">Summer@EPFL</a> program.
            <br><br>
            I have also done research with the <a href="https://sites.google.com/view/discslab">McGill DISC Lab</a>
            with Professors Oana Balmau and Bettina Kemme, where I reduced GPU energy consumption by ~66% on
            Mixture-of-Experts models without loss in accuracy.
            <br><br>
            I completed two internships at
            <a href="https://www.ericsson.com/en/about-us/company-facts/ericsson-worldwide/canada">Ericsson Canada</a>,
            building RAG pipelines, agentic workflows, and AI-powered prediction tools.
            <br><br>
            I hold a B.Sc. in <a href="https://www.cs.mcgill.ca/">Computer Science (Artificial Intelligence)</a>
            from <b>McGill University</b> (GPA 3.85/4.0, Alma Mater Scholar).
            <br><br>
            Whether you are a student, a recruiter, or a collaborator curious about software engineering or responsible AI,
            feel free to connect with me through the links below.`,
        fr: `Je suis étudiante en maîtrise (MSc) en <b>informatique (génie logiciel)</b> à
            <a href="https://www.imperial.ac.uk/">Imperial College London</a> (graduant en septembre 2027).
            Mon travail couvre le <b>génie logiciel</b>, l'<b>apprentissage automatique</b> et l'<b>IA écoénergétique</b>.
            <br><br>
            Précédemment, j'ai travaillé au <a href="https://www.epfl.ch/labs/sacs/">EPFL SaCS Lab</a> avec les
            docteurs Biswas, Devos et Garcia Bourrée (sous la direction de la professeure Anne-Marie Kermarrec) sur le
            filigranage de la couche de sortie pour la détection des resquilleurs dans l'apprentissage fédéré, dans le
            cadre du programme <a href="https://www.epfl.ch/labs/sacs/">Summer@EPFL</a>.
            <br><br>
            J'ai aussi fait de la recherche au <a href="https://sites.google.com/view/discslab">McGill DISC Lab</a>
            avec les professeures Oana Balmau et Bettina Kemme, où j'ai réduit la consommation énergétique GPU de ~66% sur
            des modèles Mixture-of-Experts sans perte de précision.
            <br><br>
            J'ai complété deux stages chez
            <a href="https://www.ericsson.com/en/about-us/company-facts/ericsson-worldwide/canada">Ericsson Canada</a>,
            où j'ai construit des pipelines RAG, des flux agentiques et des outils de prédiction alimentés par l'IA.
            <br><br>
            Je détiens un B.Sc. en <a href="https://www.cs.mcgill.ca/">informatique (intelligence artificielle)</a>
            de l'<b>Université McGill</b> (GPA 3.85/4.0, boursière Alma Mater).
            <br><br>
            Que vous soyez étudiant(e), recruteur(se) ou collaborateur(trice) curieux(se) du génie logiciel ou de l'IA responsable,
            n'hésitez pas à me contacter via les liens ci-dessous.`
    }
};

const CONTACT = [
    { icon: "fa-github", label: "GitHub", url: "https://github.com/zu-greta" },
    { icon: "fa-linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/greta-ru-mei-zu/" },
    { icon: "fa-envelope", label: "Email", url: "mailto:gretarm.zu@gmail.com" },
    { icon: "fa-file", label: "CV", url: "assets/Greta_Zu_CV.pdf" }
];

// The repo this site is deployed from — used only to look up the real
// "last modified" date in the footer from GitHub's API (see renderFooter()
// in script.js). Change this if the repo is ever renamed or moved.
const REPO = "zu-greta/zu-greta.github.io";

// ============================================================
// EXPERIENCE — jobs and research positions. 
// ============================================================
const EXPERIENCE = [
    {
        id: "exp-ericsson-ai",
        type: "work",
        dates: "Jan 2026 - May 2026",
        org: "Ericsson Canada",
        logo: "assets/logos/ericsson.png",
        image: "assets/logos/ericsson_banner.png",
        short: "Ericsson - AI Dev",
        role: {
            en: "Artificial Intelligence Software Developer Intern",
            fr: "Stagiaire développeuse en intelligence artificielle"
        },
        description: {
            en: "Implemented and deployed RAG chatbot using Hopsworks, DeepEval, and EricAI models. Enhancing a dimensioning tool (CANDI) with AI/ML capabilities and automating the building of the prediction model. Designed and deployed a price-predictor tool with regex and LLM process, and trained a LightBGM model for trend prediction.",
            fr: "Implémentation et déploiement d'un chatbot RAG utilisant Hopsworks, DeepEval et les modèles EricAI. Amélioration d'un outil de dimensionnement (CANDI) avec des capacités IA/ML et automatisation de la construction du modèle de prédiction. Conception et déploiement d'un outil de prédiction de prix avec regex et processus LLM, et entraînement d'un modèle LightBGM pour la prédiction de tendances."
        },
        bullets: [
            "Implemented and deployed RAG chatbot using Hopsworks, DeepEval, and EricAI models",
            "Enhancing dimensioning tool (CANDI) with AI/ML capabilities",
            "Designed price-predictor tool with regex/LLM and trained LightBGM model"
        ],
        tech: ["Python", "Hopsworks", "DeepEval", "LightGBM", "RAG"],
        show: { home: true, sidebar: true, code: true }
    },
    {
        id: "exp-ericsson-ml",
        type: "work",
        dates: "May 2025 - Dec 2025",
        org: "Ericsson Canada",
        logo: "assets/logos/ericsson.png",
        image: "assets/logos/ericsson_banner.png",
        short: "Ericsson - ML Intern",
        role: {
            en: "Machine Learning Intern",
            fr: "Stagiaire en apprentissage automatique"
        },
        description: {
            en: "Designed and deployed Retrieval-Augmented Generation (RAG) pipelines using AWS Lambda, Bedrock, and S3. Created Python-based agentic workflows to generate datasets for fine-tuning; improved workflow latency & results by ~40%. Designed and implemented a CLI based coding assistant using Langchain DeepAgents.",
            fr: "Conception et déploiement de pipelines de génération augmentée par récupération (RAG) utilisant AWS Lambda, Bedrock et S3. Création de flux de travail agentiques en Python pour générer des jeux de données pour le fine-tuning; amélioration de la latence et des résultats de ~40%. Conception et implémentation d'un assistant de codage CLI utilisant Langchain DeepAgents."
        },
        bullets: [
            "Designed and deployed RAG pipelines using AWS Lambda, Bedrock, and S3",
            "Created agentic workflows for fine-tuning datasets; improved latency by ~40%",
            "Built a CLI coding assistant using Langchain DeepAgents"
        ],
        tech: ["Python", "AWS", "Bedrock", "Langchain"],
        show: { home: true, sidebar: true, code: true }
    },
    {
        id: "exp-mcgill-notes",
        type: "work",
        dates: "Jan 2024 - May 2025",
        org: "McGill University",
        logo: "assets/logos/mcgill.svg",
        image: "assets/logos/mcgill_banner.png",
        short: "McGill - Notetaker",
        role: {
            en: "Notetaker (Data Science)",
            fr: "Preneur de notes (Science des données)"
        },
        description: {
            en: "Created organized and well-written notes for the McGill Student Accessibility & Achievement program.",
            fr: "Création de notes organisées et bien rédigées pour le programme d'accessibilité et de réussite étudiante de McGill."
        },
        bullets: ["Created notes for the McGill Student Accessibility & Achievement program"],
        tech: ["Data Science", "Technical Writing"],
        show: { home: true, sidebar: true, code: true }
    },
    {
        id: "exp-marianopolis",
        type: "work",
        dates: "Aug 2022 - Jun 2023",
        org: "Marianopolis College",
        logo: "assets/logos/marianopolis.jpg",
        image: "assets/logos/marianopolis.jpg",
        short: "Marianopolis - Corrector",
        role: {
            en: "Corrector (Physics Labs)",
            fr: "Correctrice (Laboratoires de physique)"
        },
        description: {
            en: "Grading student lab reports and providing feedback to improve their understanding of physics concepts.",
            fr: "Correction de rapports de laboratoire et rétroaction aux étudiants pour améliorer leur compréhension des concepts de physique."
        },
        bullets: ["Grading lab reports and providing feedback"],
        tech: ["Physics", "Grading"],
        show: { home: true, sidebar: true, code: true }
    },

    // ---- Research (also appear under Projects — see alsoProject) ----
    {
        id: "exp-epfl",
        type: "research",
        dates: "June 2026 - Aug 2026",
        org: "EPFL - SaCS Lab",
        institutionFull: "École Polytechnique Fédérale de Lausanne - Summer@EPFL",
        course: "EPFL SaCS Lab - Prof. Anne-Marie Kermarrec",
        logo: "assets/logos/epfl.png",
        image: "assets/logos/epfl.png",
        short: "EPFL - SaCS Lab",
        // Sidebar label + detail-card title differ slightly depending on
        // whether this is reached from the Experience side or the
        // Projects side — kept as small named variants on this same entry
        // rather than full duplicate copies.
        roleTitle: "Research Assistant - Summer@EPFL",
        projectShort: "Watermarking for Free-rider detection in Federated Learning",
        funcName: "Watermarking_Project",
        role: { en: "Research Assistant", fr: "Assistante de recherche" },
        supervisor: { en: "Professor Anne-Marie Kermarrec", fr: "Professeure Anne-Marie Kermarrec" },
        title: {
            en: "The Inefficiency of Output Layer Watermarking for Free-rider Detection in Federated Learning",
            fr: "L'inefficacité du filigranage de la couche de sortie pour la détection des resquilleurs dans l'apprentissage fédéré"
        },
        description: "Summer@EPFL program in the SaCS Lab under Professor Anne-Marie Kermarrec. Worked on the analysis of output layer watermarking for free-rider detection in federated learning. We prove experimentally and theoretically that output layer watermarking is too fragile and that a free-rider using less than 30% of the effort of an honest client can still escape detection.",
        bullets: [
            "Summer@EPFL program in the SaCS Lab under Professor Anne-Marie Kermarrec",
            "Worked on the analysis of output layer watermarking for free-rider detection in federated learning",
            "Proved experimentally and theoretically that output layer watermarking is too fragile — a free-rider",
            "using less than 30% of the effort of an honest client can still escape detection"
        ],
        tech: ["Python", "Watermarking", "Federated Learning", "Free-Rider", "PyTorch"],
        links: [{ label: "📄 Report", url: "assets/reports/TODO" }],
        alsoProject: true,
        projectFolder: "Research Projects",
        show: { home: true, sidebar: true, code: true }
    },
    {
        id: "exp-disc",
        type: "research",
        dates: "June 2025 - Dec 2025",
        org: "McGill University - DISC Lab",
        institutionFull: "McGill University - DISC Lab",
        course: "McGill DISC Lab - Prof. Balmau & Prof. Kemme",
        logo: "assets/logos/mcgill.svg",
        image: "assets/logos/energy-ml.png",
        short: "McGill - DISC Lab",
        roleTitle: "Research Assistant - DISC Lab",
        projectShort: "Energy Efficiency in ML",
        funcName: "Energy_Efficiency_Project",
        role: { en: "Research Assistant", fr: "Assistante de recherche" },
        supervisor: { en: "Professor Oana Balmau & Professor Bettina Kemme", fr: "Professeure Oana Balmau et Professeure Bettina Kemme" },
        title: {
            en: "Energy Efficiency in Machine Learning Algorithms",
            fr: "Efficacité énergétique des algorithmes d'apprentissage automatique"
        },
        description: "Instrumented Switch-Transformers and Qwen Mixture-of-Experts models using CodeCarbon on DeepSpeed. Profiled GPU energy consumption and identified optimization strategies that reduced energy usage by ~66% without loss in accuracy. Prepared a Responsible AI course project with starter code.",
        bullets: [
            "Instrumented Switch-Transformers and Qwen MoE models using CodeCarbon on DeepSpeed",
            "Reduced energy usage by ~66% without loss in accuracy",
            "Prepared Responsible AI course project with starter code"
        ],
        tech: ["Python", "CodeCarbon", "DeepSpeed", "PyTorch"],
        links: [{ label: "📄 Report", url: "assets/reports/energy_eff_report.pdf" }],
        alsoProject: true,
        projectFolder: "Research Projects",
        show: { home: true, sidebar: true, code: true }
    },
    {
        id: "exp-prometheus",
        type: "research",
        dates: "Sept 2024 - Dec 2024",
        org: "McGill University - The Prometheus Lab",
        institutionFull: "McGill University - The Prometheus Lab",
        course: "Prometheus Lab - Prof. Vybihal",
        logo: "assets/logos/mcgill.svg",
        image: "assets/logos/mcgill_banner.png",
        short: "McGill - Prometheus Lab",
        roleTitle: "Research Assistant - Prometheus Lab",
        projectShort: "TikTok Analysis",
        funcName: "TikTok_Impact_Project",
        // The Projects.c code display uses a punchier title than the
        // Home-tab research line for this one — a real content variant,
        // not duplication, so it gets its own small field.
        codeTitle: "TikTok Impact on Society Analysis",
        role: { en: "Research Assistant", fr: "Assistante de recherche" },
        supervisor: { en: "Professor Joseph Vybihal", fr: "Professeur Joseph Vybihal" },
        title: {
            en: "TikTok algorithm analysis - designed bots to collect 400+ videos and conducted statistical analysis on algorithmic bias",
            fr: "Analyse de l'algorithme TikTok - conception de bots pour collecter plus de 400 vidéos et analyse statistique des biais algorithmiques"
        },
        description: "Designed Python-based bots to collect 400+ TikTok videos while bypassing scraping restrictions. Conducted statistical analysis using Pandas and Scikit-learn to quantify algorithmic bias in engagement rates by user gender and content sentiment.",
        bullets: [
            "Designed bots to collect 400+ TikTok videos bypassing scraping restrictions",
            "Statistical analysis using Pandas and Scikit-learn on algorithmic bias"
        ],
        tech: ["Python", "Pandas", "Scikit-learn", "Web Scraping"],
        links: [{ label: "📄 Report", url: "assets/reports/Tik_Tok_Research_Project.pdf" }],
        alsoProject: true,
        projectFolder: "Research Projects",
        show: { home: true, sidebar: true, code: true }
    }
];

// ============================================================
// PROJECTS — the project catalog 
// ============================================================
const PROJECTS = [
    {
        id: "depression",
        projectFolder: "Research Projects",
        dates: "Jan 2022 - April 2022",
        short: "Depression & Eating Disorders",
        title: "Depression & Eating Disorders",
        funcName: "Depression_Eating_Disorders_Project",
        image: "assets/logos/marianopolis_banner.png",
        description: "Researched the correlation between eating disorders and depression, determining whether there is a link in terms of impact and risks. Analyzed if antidepressants can be beneficial to eating disorders such as anorexia nervosa and bulimia nervosa.",
        tech: ["Research", "Statistical Analysis"],
        course: "Marianopolis College - Health Science",
        links: [
            { label: "📄 Report", url: "assets/reports/eating_disorders_depression.pdf" },
            { label: "📊 Presentation", url: "assets/eating_disorders_depression_poster_prsentation.pdf" }
        ],
        show: { sidebar: true, code: true }
    },
    {
        id: "brown-lab",
        projectFolder: "Web Development",
        dates: "Jan 2025 - Present",
        short: "Brown Lab Website",
        title: "Brown Lab Website",
        image: "assets/logos/mcgill_banner.png",
        description: "Building and maintaining the official website for the Brown Lab at McGill University. Responsive design with dynamic content management for lab publications, team members, and research updates.",
        tech: ["React", "Javascript", "Node.js"],
        course: "Volunteer / Freelance",
        funcName: "Brown_lab",
        links: [
            { label: "🌐 Website", url: "https://zu-greta.github.io/brown_lab/" },
            { label: "💻 Code", url: "https://github.com/zu-greta/brown_lab" }
        ],
        show: { sidebar: true, code: true }
    },
    {
        id: "soc-schedule",
        projectFolder: "Web Development",
        dates: "Nov 2024 - Jan 2025",
        short: "SOC-cessful Schedule",
        title: "SOC-cessful Schedule Booking Tool",
        image: "assets/logos/soc-schedule.png",
        description: "Full-stack web application creating a booking tool for school staff and students. The frontend uses HTML, CSS and Javascript, and the backend is developed with PHP and a SQLite3 database hosted on the McGill SOCS servers.",
        tech: ["HTML/CSS", "Javascript", "PHP", "XAMPP", "SQLite3", "SQL"],
        course: "COMP 307 - Web Development",
        funcName: "Schedule_Booking_Tool",
        links: [
            { label: "🌐 Website", url: "https://www.cs.mcgill.ca/~gzu/socs_sisters/landing" },
            { label: "💻 Code", url: "https://github.com/zu-greta/socs_sisters" },
            { label: "🎬 Demo", url: "https://youtu.be/ZxdcFvYHAKo?si=WddSmUicHZD8O6qh" }
        ],
        show: { sidebar: true, code: true }
    },
    {
        id: "bcv",
        projectFolder: "Web Development",
        dates: "2025 (Hackathon)",
        short: "Best-CV (BCV)",
        title: "BCV - Best CV Generator",
        image: "assets/logos/bcv.jpeg",
        description: "Hackathon project (McWICS 2025). Users enter their experience, skills, and a job description - Gemini API generates a tailored single-page CV ranked by relevance. Includes a SERP API job board carousel.",
        tech: ["React", "Tailwind CSS", "Next.js", "Drizzle", "PostgreSQL", "Gemini API", "SERP API"],
        course: "McWICS 2025 Hackathon",
        funcName: "BCV_Hackathon",
        links: [
            { label: "🎬 Demo", url: "https://youtu.be/TeJMOojokRM?si=M3tr0oGHdgZCmjvG" },
            { label: "📋 Devpost", url: "https://devpost.com/software/bcv-hackmcwics25" },
            { label: "💻 Code", url: "https://github.com/DavidNitchi/McWICS25" }
        ],
        show: { sidebar: true, code: true }
    },
    {
        id: "ai-agent",
        dates: "Oct 2023 - Dec 2023",
        short: "AI Agent",
        title: "Artificial Intelligence Agent",
        image: "assets/logos/424_agent.webp",
        description: "Developed an agent that plays and wins against random, human, and other agents in Colosseum Survival. Uses Monte Carlo Tree Search, A* Search, and heuristics to make efficient decisions. Placed in the top 20% of the class tournament.",
        tech: ["Python"],
        course: "COMP 424 - Artificial Intelligence",
        funcName: "AI_Agent",
        links: [
            { label: "💻 Code", url: "https://github.com/zu-greta/424project" },
            { label: "📄 Report", url: "assets/reports/424Report.pdf" }
        ],
        show: { sidebar: true, code: true }
    },
    {
        id: "paxos",
        dates: "Nov 2024 - Dec 2024",
        short: "Paxos Game",
        title: "Paxos Total Order Game",
        image: "assets/logos/paxos.webp",
        description: "Implemented the Paxos Consensus Algorithm to achieve total order in a Java-based multiplayer distributed systems game. Handles node failures and network partitions gracefully.",
        tech: ["Java", "Paxos", "Distributed Systems"],
        course: "COMP 512 - Distributed Systems",
        funcName: "Paxos_Game",
        links: [{ label: "📄 Report", url: "assets/reports/paxos_report.pdf" }],
        show: { sidebar: true, code: true }
    },
    {
        id: "travel-agency",
        dates: "Jan 2024 - May 2024",
        short: "Travelling Agency",
        title: "Travel Agency Management System",
        image: "assets/logos/travel-agency.png",
        description: "Designed an application for a travelling agency where users can book flights, hotels, or rent cars. Created relational schemas, E/R diagrams, SQL queries and used JDBC to provide a database and functions to navigate and use it.",
        tech: ["Java", "JDBC", "SQL", "DB2", "E/R diagrams"],
        course: "COMP 421 - Database Systems",
        funcName: "Travelling_Agency",
        links: [{ label: "💻 Code", url: "https://github.com/zu-greta/comp421" }],
        show: { sidebar: true, code: true }
    },
    {
        id: "compiler",
        dates: "Jan 2025 - May 2025",
        short: "Compiler for Mini-C",
        title: "Compiler for Mini-C",
        image: "assets/logos/compiler.png",
        description: "Built a full compiler from scratch for Mini-C (a subset of C) including lexer, parser, semantic analysis, MIPS code generation, and object-oriented features. Automated with Bash scripts.",
        tech: ["Java", "C", "MIPS", "Bash"],
        course: "COMP 520 - Compiler Design",
        funcName: "MiniC_Compiler",
        links: [{ label: "💻 Code", url: "https://github.com/zu-greta/comp520_2024" }],
        show: { sidebar: true, code: true }
    },
    {
        id: "os-sim",
        dates: "Jan 2024 - Mar 2024",
        short: "OS simulation",
        title: "Operating Systems Simulation",
        image: "assets/logos/os-sim.png",
        description: "Created an operating system simulation including a custom shell, memory management (paging, segmentation), and filesystem management. Containerized with Docker for reproducible testing.",
        tech: ["C", "Bash", "Docker"],
        course: "COMP 310 - Operating Systems",
        funcName: "OS_Simulation",
        links: [{ label: "💻 Code", url: "https://github.com/zu-greta/comp310" }],
        show: { sidebar: true, code: true }
    },
    {
        id: "mealmates",
        projectFolder: "Mobile Application",
        dates: "2024 (Hackathon)",
        short: "MealMates",
        title: "MealMates - Food Matching App",
        image: "assets/logos/mealmates.png",
        description: "Hackathon project (CodeJam 14). Users swipe through food images from nearby restaurants and curate a list of interested spots. Match with friends on similar restaurants to try out together. Tinder-style UX for food.",
        tech: ["Python", "Django-rest", "SQLite3", "Javascript", "TypeScript", "React Native", "Tailwind"],
        course: "CodeJam 14 Hackathon",
        funcName: "MealMates_App",
        links: [
            { label: "🎬 Demo", url: "https://youtube.com/shorts/2nAD9EJrNGw?si=f1xnBtyIwjq76qlM" },
            { label: "📋 Devpost", url: "https://devpost.com/software/fooder-zx98kt" },
            { label: "💻 Code", url: "https://github.com/denis-tsariov/codejam14" }
        ],
        show: { sidebar: true, code: true }
    },
    {
        id: "calendar",
        projectFolder: "Mobile Application",
        dates: "July 2024 - Present",
        short: "Calendar/Reminder",
        title: "Calendar / Reminder App",
        image: "assets/logos/calendar.png",
        description: "Personal iOS Calendar and ToDo list application. Exploring differences between iOS and macOS APIs, database syncing between devices, and native SwiftUI design patterns.",
        tech: ["Swift", "SwiftUI", "Xcode"],
        course: "Personal Project",
        funcName: "Calendar_App",
        links: [{ label: "💻 Code", url: "https://github.com/zu-greta/calendar" }],
        show: { sidebar: true, code: true }
    }
];

const SKILLS = [
    { category: { en: "Programming Languages", fr: "Langages de programmation" }, items: "Python, Java, C, C++, Bash, Javascript, PHP, OCaml, MIPS Assembly" },
    { category: { en: "Markup and Frontend", fr: "Balisage et Frontend" }, items: "HTML, CSS, Swift, React" },
    { category: { en: "Databases", fr: "Bases de données" }, items: "SQL, DB2, MariaDB, SQLite" },
    { category: { en: "Technologies", fr: "Technologies" }, items: "Docker, AWS" },
    { category: { en: "Frameworks & Tools", fr: "Frameworks et outils" }, items: "Django, Flask, JUnit, JavaFX, Git, Linux, Pandas, NumPy, Matplotlib, Pytorch, TensorFlow, Scikit-learn, CodeCarbon, Zookeeper, TCP/IP, REST APIs" },
    { category: { en: "Web stacks", fr: "Piles web" }, items: "XAMPP, MERN" },
    { category: { en: "IDE/Tools", fr: "IDE/Outils" }, items: "Visual Studio Code, IntelliJ IDEA, PyCharm, Jupyter Notebook" },
    { category: { en: "Languages", fr: "Langues" }, items: { en: "English and French (both native fluency)", fr: "Anglais et français (les deux de langue maternelle)" } }
];

const EDUCATION = [
    {
        school: "Imperial College London",
        logo: "./assets/logos/imperial.jpeg",
        degree: { en: "Postgraduate taught MSc in Computing (Software Engineering)", fr: "Maîtrise en informatique (génie logiciel)" },
        dates: "September 2026 - September 2027 expected"
    },
    {
        school: "McGill University",
        logo: "./assets/logos/mcgill.svg",
        degree: { en: "Bachelor of Science in Computer Science (Artificial Intelligence)", fr: "Baccalauréat en informatique (Intelligence artificielle)" },
        dates: "August 2022 - May 2026",
        gpa: "3.85/4.0",
        courses: "Algorithms & Data Structures, Artificial Intelligence, Applied Machine Learning, Reinforcement Learning, Software Systems, Operating Systems, Compiler Design, Database Systems, Data Science, Distributed Systems",
        awards: { en: "Alma Mater Scholarship", fr: "Bourse Alma Mater" }
    },
    {
        school: "Marianopolis College",
        logo: "./assets/logos/marianopolis.jpg",
        degree: { en: "DCS in Honours Health Science", fr: "DEC en Sciences de la santé (Honours)" },
        dates: "August 2020 - June 2022",
        rScore: "37.825",
        awards: { en: "Dean's List Fall 2020 and Winter 2021", fr: "Liste du doyen automne 2020 et hiver 2021" }
    }
];

const NEWS = [
    {
        date: "Aug 2026",
        text: {
            en: 'Completed research at the <a href="https://www.epfl.ch/labs/sacs/">SaCS Lab</a> - Developped a free-rider to prove the fragility of output layer watermarking for free-rider detection in federated learning.',
            fr: 'Recherche complétée au <a href="https://www.epfl.ch/labs/sacs/">SaCS Lab</a> - développement d\'un resquilleur pour prouver la fragilité du filigranage de la couche de sortie pour la détection des resquilleurs dans l\'apprentissage fédéré.'
        }
    },
    {
        date: "Dec 2025",
        text: {
            en: 'Completed research at the <a href="https://sites.google.com/view/discslab">DISC Lab</a> - reduced MoE model energy usage by ~66%.',
            fr: 'Recherche complétée au <a href="https://sites.google.com/view/discslab">DISC Lab</a> - réduction de ~66% de la consommation énergétique des modèles MoE.'
        }
    },
    {
        date: "Jan 2026",
        text: {
            en: 'Began AI Software Developer internship at <a href="https://www.ericsson.com/">Ericsson Canada</a> - building RAG chatbots and prediction tools.',
            fr: 'Début du stage en développement IA chez <a href="https://www.ericsson.com/">Ericsson Canada</a> - chatbots RAG et outils de prédiction.'
        }
    },
    {
        date: "May 2026",
        text: {
            en: 'Graduated from <a href="https://www.mcgill.ca/">McGill University</a> with a B.Sc. in Computer Science (AI).',
            fr: 'Diplômée de l\'<a href="https://www.mcgill.ca/">Université McGill</a> avec un B.Sc. en informatique (IA).'
        }
    },
    {
        date: "Jun 2026",
        text: {
            en: 'Starting the <a href="https://www.epfl.ch/labs/sacs/">Summer@EPFL</a> program at the SaCS Lab under Prof. Anne-Marie Kermarrec!',
            fr: 'Début du programme <a href="https://www.epfl.ch/labs/sacs/">Summer@EPFL</a> au laboratoire SaCS sous la prof. Anne-Marie Kermarrec !'
        }
    },
    {
        date: "Sep 2026",
        text: {
            en: 'Starting MSc in Computing (Software Engineering) at <a href="https://www.imperial.ac.uk/">Imperial College London</a>!',
            fr: 'Début du MSc en informatique (génie logiciel) à <a href="https://www.imperial.ac.uk/">Imperial College London</a> !'
        }
    }
];

// ============================================================
// Code-themed tabs that don't come from EXPERIENCE/PROJECTS
// ============================================================
const EDUCATION_JAVA = [
    {
        className: "Imperial",
        comment: "Imperial College London",
        fields: [
            { type: "String", name: "degree", value: "Postgraduate taught MSc in Computing (Software Engineering)" },
            { type: "String", name: "dates", value: "Sept 2026 - Sept 2027" }
        ]
    },
    {
        className: "McGill",
        comment: "McGill University",
        fields: [
            { type: "String", name: "degree", value: "Bachelor of Science in Computer Science (Artificial Intelligence)" },
            { type: "String", name: "dates", value: "Aug 2022 - May 2026" },
            { type: "double", name: "cGPA", value: "3.85", isNumber: true }
        ],
        arrayFields: [
            { name: "courses", values: [
                "Algorithms & Data Structures", "Artificial Intelligence",
                "Applied Machine Learning", "Reinforcement Learning",
                "Software Systems", "Operating Systems",
                "Compiler Design", "Database Systems",
                "Data Science", "Distributed Systems"
            ] }
        ],
        extraFields: [
            { type: "String", name: "awards", value: "Alma Mater Scholarship" }
        ]
    },
    {
        className: "Marianopolis",
        comment: "Marianopolis College",
        fields: [
            { type: "String", name: "degree", value: "DCS in Honours Health Science" },
            { type: "double", name: "rScore", value: "37.825", isNumber: true }
        ],
        arrayFields: [
            { name: "awards", values: ["Dean's List Fall 2020", "Dean's List Winter 2021"] }
        ]
    }
];

const SKILLS_BASH = [
    { varName: "PROGRAMMING_LANGUAGES", values: ["Java", "Python", "C/C++", "Bash", "Assembly", "SQL", "Javascript", "PHP", "OCaml", "HTML/CSS"] },
    { varName: "FRAMEWORKS_LIBRARIES", values: ["AWS", "Docker", "Git", "Pandas", "NumPy", "Matplotlib", "Pytorch", "TensorFlow", "Scikit-learn", "CodeCarbon", "SQLite", "Zookeeper", "TCP/IP", "REST APIs", "Django", "Flask", "React", "Swift"] },
    { varName: "LANGUAGES", values: ["English (Native)", "French (Native)"] }
];

const INTERESTS = {
    entries: [
        { name: "Dancing", description: { en: "I am an active dancer at K-RAVE McGill, Emoria, and Kreation.", fr: "Je suis une danseuse active à K-RAVE McGill et Emoria." }, image: "./assets/interests/dance.JPG" },
        { name: "Volleyball", description: { en: "I have started playing volleyball at McGill in intramural teams this year!", fr: "J'ai commencé à jouer au volleyball à McGill dans des équipes intra-muros cette année!" }, image: "./assets/interests/volleyball.jpg" },
        { name: "Dragon Boat", description: { en: "I paddled with the McGill DragonBoatZ team and also the UDEM Dragon boat team.", fr: "J'ai pagayé avec l'équipe McGill DragonBoatZ et aussi l'équipe de bateau-dragon de l'UdeM." }, image: "./assets/interests/db.JPG" },
        { name: "Travelling", description: { en: "I enjoy travelling to different countries and discovering local foods/culture!", fr: "J'aime voyager dans différents pays et découvrir la cuisine et la culture locales!" }, image: "./assets/interests/plane.jpg" }
    ],
    // Gallery: just add { name, image } to show more photos as polaroids
    gallery: [
        { name: "Dance.jpg", image: "./assets/interests/dance.JPG" },
        { name: "Volleyball.jpg", image: "./assets/interests/volleyball.jpg" },
        { name: "Dragon_Boat.jpg", image: "./assets/interests/db.JPG" },
        { name: "Travelling.jpg", image: "./assets/interests/plane.jpg" },
        { name: "Airshows.jpg", image: "./assets/interests/airshow.JPG" },
        { name: "Birds.jpg", image: "./assets/interests/birds.JPG" },
        { name: "Cars.jpg", image: "./assets/interests/cars.JPG" },
        { name: "Photography.jpg", image: "./assets/interests/photography.JPG" }
    ],
    other: ["Piano", "Figure Skating", "Snowboarding", "Basketball", "Drawing", "Reading"]
};

// Current language state
let currentLang = "en";