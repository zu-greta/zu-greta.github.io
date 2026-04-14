// ============================================================
// DATA FILE — Edit this file to update your website content.
// No need to touch index.html or script.js.
// ============================================================

const DATA = {

    aboutMe: {
        image: "./assets/Linkedin_picture.jpg",
        text: `Hello! I'm Greta and I am a postgraduate taught (MSc) student at
            <a href="https://www.imperial.ac.uk/">Imperial College London</a>, in <b>Computing (Software Engineering)</b> (graduating in September 2027).
            <br>
            I am passionate about software development and machine learning, and I am always looking for
            opportunities to learn and grow in the field. 
            Previously, I completed a research project on Energy Efficiency and Machine Learning algorithms in the <a href="https://sites.google.com/view/discslab">McGill DISC Lab</a>, 
            and two software development and ai/ml internships at <a href="https://www.ericsson.com/en/about-us/company-facts/ericsson-worldwide/canada">Ericsson Canada</a>.
            <br>
            During the summer of 2026, I am participating in the Summer@EPFL program in the <a href="https://www.epfl.ch/labs/sacs/">SaCS Lab</a> under Professor Anne-Marie Kermarrec.`
    },

    contact: [
        { icon: "fa-github", label: "GitHub", url: "https://github.com/zu-greta" },
        { icon: "fa-linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/greta-ru-mei-zu/" },
        { icon: "fa-envelope", label: "Email", url: "mailto:gretarm.zu@gmail.com" },
        { icon: "fa-file", label: "CV", url: "assets/Greta_Zu_CV.pdf" }
    ],

    experienceSidebar: [
        { folder: "Work", items: [
            { id: "exp-ericsson-ai", short: "Ericsson — AI Dev", status: "M" },
            { id: "exp-ericsson-ml", short: "Ericsson — ML Intern", status: "" },
            { id: "exp-mcgill-notes", short: "McGill — Notetaker", status: "" },
            { id: "exp-marianopolis", short: "Marianopolis — Corrector", status: "" }
        ]},
        { folder: "Research", items: [
            { id: "exp-epfl", short: "EPFL — SaCS Lab", status: "M" },
            { id: "exp-disc", short: "McGill — DISC Lab", status: "" },
            { id: "exp-prometheus", short: "McGill — Prometheus Lab", status: "" }
        ]}
    ],

    experienceDetails: {
        "exp-ericsson-ai": {
            title: "Artificial Intelligence Software Developer Intern",
            company: "Ericsson Canada", dates: "Jan 2026 - May 2026",
            status: "M", statusLabel: "Current",
            description: "Implemented and deployed RAG chatbot using Hopsworks, DeepEval, and EricAI models. Enhancing a dimensioning tool (CANDI) with AI/ML capabilities. Designed a price-predictor tool with regex/LLM and trained a LightBGM model.",
            tech: ["Python", "Hopsworks", "DeepEval", "LightGBM", "RAG"]
        },
        "exp-ericsson-ml": {
            title: "Machine Learning Intern",
            company: "Ericsson Canada", dates: "May 2025 - Dec 2025",
            status: "", statusLabel: "Completed",
            description: "Designed and deployed RAG pipelines using AWS Lambda, Bedrock, and S3. Created agentic workflows for fine-tuning datasets; improved latency by ~40%. Built a CLI coding assistant using Langchain DeepAgents.",
            tech: ["Python", "AWS", "Bedrock", "Langchain"]
        },
        "exp-mcgill-notes": {
            title: "Notetaker (Data Science)",
            company: "McGill University", dates: "Jan 2024 - May 2025",
            status: "", statusLabel: "Completed",
            description: "Created organized and well-written notes for the McGill Student Accessibility & Achievement program.",
            tech: ["Data Science", "Technical Writing"]
        },
        "exp-marianopolis": {
            title: "Corrector (Physics Labs)",
            company: "Marianopolis College", dates: "Aug 2022 - Jun 2023",
            status: "", statusLabel: "Completed",
            description: "Grading student lab reports and providing feedback to improve their understanding of physics concepts.",
            tech: ["Physics", "Grading"]
        },
        "exp-epfl": {
            title: "Research Assistant — Summer@EPFL",
            company: "EPFL — SaCS Lab", dates: "June 2026 - Aug 2026",
            status: "M", statusLabel: "Upcoming",
            description: "Summer@EPFL program in the SaCS Lab under Professor Anne-Marie Kermarrec. Project TBD.",
            tech: ["TBD"]
        },
        "exp-disc": {
            title: "Research Assistant — DISC Lab",
            company: "McGill University", dates: "June 2025 - Dec 2025",
            status: "", statusLabel: "Completed",
            description: "Instrumented Switch-Transformers and Qwen MoE models using CodeCarbon on DeepSpeed. Reduced energy usage by ~66% without loss in accuracy. Prepared Responsible AI course project.",
            tech: ["Python", "CodeCarbon", "DeepSpeed", "PyTorch"]
        },
        "exp-prometheus": {
            title: "Research Assistant — Prometheus Lab",
            company: "McGill University", dates: "Sept 2024 - Dec 2024",
            status: "", statusLabel: "Completed",
            description: "Designed bots to collect 400+ TikTok videos bypassing scraping restrictions. Statistical analysis using Pandas and Scikit-learn on algorithmic bias.",
            tech: ["Python", "Pandas", "Scikit-learn"]
        }
    },

    workExperience: [
        {
            company: "Ericsson Canada",
            role: "Artificial Intelligence Software Developer Intern",
            dates: "Jan 2026 - May 2026",
            work: "Implemented and deployed RAG chatbot using Hopsworks, DeepEval, and EricAI models. Enhancing a dimensioning tool (CANDI) with AI/ML capabilities and automating the building of the prediction model. Designed and deployed a price-predictor tool with regex and LLM process, and trained a LightBGM model for trend prediction."
        },
        {
            company: "Ericsson Canada",
            role: "Machine Learning Intern",
            dates: "May 2025 - December 2025",
            work: "Designed and deployed Retrieval-Augmented Generation (RAG) pipelines using AWS Lambda, Bedrock, and S3. Created Python-based agentic workflows to generate datasets for fine-tuning; improved workflow latency & results by ~40%. Designed and implemented a CLI based coding assistant using Langchain DeepAgents."
        },
        {
            company: "McGill University",
            role: "Notetaker (Data Science)",
            dates: "January 2024 - May 2025",
            work: "Created organized and well-written notes for the McGill Student Accessibility & Achievement program."
        },
        {
            company: "Marianopolis College",
            role: "Corrector (Physics Labs)",
            dates: "August 2022 - June 2023",
            work: "Grading student lab reports and providing feedback to improve their understanding of physics concepts."
        }
    ],

    researchExperience: [
        {
            institution: "École Polytechnique de Lausanne - Summer@EPFL",
            role: "Research Assistant",
            dates: "June 2026 - August 2026",
            supervisor: "Professor Anne-Marie Kermarrec",
            project: "TBD"
        },
        {
            institution: "McGill University - DISC Lab",
            role: "Research Assistant",
            dates: "June 2025 - December 2025",
            supervisor: "Professor Oana Balmau & Professor Bettina Kemme",
            project: "Energy Efficiency in Machine Learning Algorithms"
        },
        {
            institution: "McGill University - The Prometheus Lab",
            role: "Research Assistant",
            dates: "September 2024 - December 2024",
            supervisor: "Professor Joseph Vybihal",
            project: "TikTok algorithm analysis — designed bots to collect 400+ videos and conducted statistical analysis on algorithmic bias"
        }
    ],

    skills: [
        { category: "Programming Languages", items: "Python, Java, C, C++, Bash, Javascript, PHP, OCaml, MIPS Assembly" },
        { category: "Markup and Frontend", items: "HTML, CSS, Swift, React" },
        { category: "Databases", items: "SQL, DB2, MariaDB, SQLite" },
        { category: "Technologies", items: "Docker, AWS" },
        { category: "Frameworks & Tools", items: "Django, Flask, JUnit, JavaFX, Git, Linux, Pandas, NumPy, Matplotlib, Pytorch, TensorFlow, Scikit-learn, CodeCarbon, Zookeeper, TCP/IP, REST APIs" },
        { category: "Web stacks", items: "XAMPP, MERN" },
        { category: "IDE/Tools", items: "Visual Studio Code, IntelliJ IDEA, PyCharm, Jupyter Notebook" },
        { category: "Languages", items: "English and French (both native fluency)" }
    ],

    education: [
        {
            school: "Imperial College London",
            degree: "Postgraduate taught MSc in Computing (Software Engineering)",
            dates: "September 2026 - September 2027 expected"
        },
        {
            school: "McGill University",
            degree: "Bachelor of Science in Computer Science (Artificial Intelligence)",
            dates: "August 2022 - May 2026",
            gpa: "3.85/4.0",
            courses: "Algorithms & Data Structures, Artificial Intelligence, Applied Machine Learning, Reinforcement Learning, Software Systems, Operating Systems, Compiler Design, Database Systems, Data Science, Distributed Systems",
            awards: "Alma Mater Scholarship"
        },
        {
            school: "Marianopolis College",
            degree: "DCS in Honours Health Science",
            dates: "August 2020 - June 2022",
            rScore: "37.825",
            awards: "Dean's List Fall 2020 and Winter 2021"
        }
    ],

    // ---- Code-themed tab data ----

    // Experience.py tab — work entries shown as Python add_position calls
    experiencePy: {
        work: [
            {
                comment: "Ericsson - AI Software Developer",
                company: "Ericsson Canada",
                role: "Artificial Intelligence Software Developer Intern",
                dates: "Jan 2026 - May 2026",
                details: [
                    "Implemented and deployed RAG chatbot using Hopsworks, DeepEval, and EricAI models",
                    "Enhancing dimensioning tool (CANDI) with AI/ML capabilities",
                    "Designed price-predictor tool with regex/LLM and trained LightBGM model"
                ]
            },
            {
                comment: "Ericsson - ML Intern",
                company: "Ericsson Canada",
                role: "Machine Learning Intern",
                dates: "May 2025 - Dec 2025",
                details: [
                    "Designed and deployed RAG pipelines using AWS Lambda, Bedrock, and S3",
                    "Created agentic workflows for fine-tuning datasets; improved latency by ~40%",
                    "Designed CLI coding assistant using Langchain DeepAgents"
                ]
            },
            {
                comment: "McGill University",
                company: "McGill University",
                role: "Notetaker (Data Science)",
                dates: "Jan 2024 - May 2025",
                details: ["Created notes for the McGill Student Accessibility & Achievement program"]
            },
            {
                comment: "Marianopolis College",
                company: "Marianopolis College",
                role: "Corrector (Physics Labs)",
                dates: "Aug 2022 - Jun 2023",
                details: ["Grading lab reports and providing feedback"]
            }
        ],
        research: [
            {
                comment: "EPFL Summer@EPFL",
                lab: "EPFL SaCS Lab",
                professors: "Anne-Marie Kermarrec",
                dates: "June 2026 - Aug 2026",
                details: ["TBD"]
            },
            {
                comment: "McGill DISC Lab",
                lab: "McGill University DISC Lab",
                professors: "Oana Balmau, Bettina Kemme",
                dates: "June 2025 - Dec 2025",
                details: [
                    "Instrumented Switch-Transformers and Qwen MoE models using CodeCarbon on DeepSpeed",
                    "Reduced energy usage by ~66% without loss in accuracy",
                    "Prepared Responsible AI course project with starter code"
                ]
            },
            {
                comment: "McGill Prometheus Lab",
                lab: "McGill University - The Prometheus Lab",
                professors: "Joseph Vybihal",
                dates: "Sept 2024 - Dec 2024",
                details: [
                    "Designed bots to collect 400+ TikTok videos bypassing scraping restrictions",
                    "Statistical analysis using Pandas and Scikit-learn on algorithmic bias"
                ]
            }
        ]
    },

    // Projects.c tab
    projectsC: {
        // Git-style status: "M" = modified (in progress/green), "A" = added (recently done/orange), "" = committed (done/normal)
        sidebar: [
            { folder: "Research Projects", items: [
                { id: "energy-ml", short: "Energy Efficiency in ML", status: "A" },
                { id: "tiktok", short: "TikTok Analysis", status: "" },
                { id: "depression", short: "Depression & Eating Disorders", status: "" }
            ]},
            { folder: "Web Development", items: [
                { id: "brown-lab", short: "Brown Lab Website", status: "M" },
                { id: "soc-schedule", short: "SOC-cessful Schedule", status: "" },
                { id: "bcv", short: "Best-CV (BCV)", status: "" }
            ]},
            { id: "ai-agent", short: "AI Agent", status: "" },
            { id: "paxos", short: "Paxos Game", status: "" },
            { id: "travel-agency", short: "Travelling Agency", status: "" },
            { id: "compiler", short: "Compiler for Mini-C", status: "" },
            { id: "os-sim", short: "OS simulation", status: "" },
            { folder: "Mobile Application", items: [
                { id: "mealmates", short: "MealMates", status: "" },
                { id: "calendar", short: "Calendar/Reminder", status: "M" }
            ]}
        ],
        // Detailed project info — shown when clicking a sidebar item
        details: {
            "brown-lab": {
                title: "Brown Lab Website",
                dates: "Jan 2025 - Present",
                status: "M",
                statusLabel: "In Development",
                description: "Building and maintaining the official website for the Brown Lab at McGill University. Responsive design with dynamic content management for lab publications, team members, and research updates.",
                tech: ["React", "Javascript", "Node.js"],
                course: "Volunteer / Freelance",
                links: [
                    { label: "🌐 Website", url: "https://zu-greta.github.io/brown_lab/" },
                    { label: "💻 Code", url: "https://github.com/zu-greta/brown_lab" }
                ]
            },
            "soc-schedule": {
                title: "SOC-cessful Schedule Booking Tool",
                dates: "Nov 2024 - Jan 2025",
                status: "",
                statusLabel: "Completed",
                description: "Full-stack web application creating a booking tool for school staff and students. The frontend uses HTML, CSS and Javascript, and the backend is developed with PHP and a SQLite3 database hosted on the McGill SOCS servers.",
                tech: ["HTML/CSS", "Javascript", "PHP", "XAMPP", "SQLite3", "SQL"],
                course: "COMP 307 — Web Development",
                links: [
                    { label: "🌐 Website", url: "https://www.cs.mcgill.ca/~gzu/socs_sisters/landing" },
                    { label: "💻 Code", url: "https://github.com/zu-greta/socs_sisters" },
                    { label: "🎬 Demo", url: "https://youtu.be/ZxdcFvYHAKo?si=WddSmUicHZD8O6qh" }
                ]
            },
            "bcv": {
                title: "BCV — Best CV Generator",
                dates: "2025 (Hackathon)",
                status: "",
                statusLabel: "Completed",
                description: "Hackathon project (McWICS 2025). Users enter their experience, skills, and a job description — Gemini API generates a tailored single-page CV ranked by relevance. Includes a SERP API job board carousel.",
                tech: ["React", "Tailwind CSS", "Next.js", "Drizzle", "PostgreSQL", "Gemini API", "SERP API"],
                course: "McWICS 2025 Hackathon",
                links: [
                    { label: "🎬 Demo", url: "https://youtu.be/TeJMOojokRM?si=M3tr0oGHdgZCmjvG" },
                    { label: "📋 Devpost", url: "https://devpost.com/software/bcv-hackmcwics25" },
                    { label: "💻 Code", url: "https://github.com/DavidNitchi/McWICS25" }
                ]
            },
            "ai-agent": {
                title: "Artificial Intelligence Agent",
                dates: "Oct 2023 - Dec 2023",
                status: "",
                statusLabel: "Completed",
                description: "Developed an agent that plays and wins against random, human, and other agents in Colosseum Survival. Uses Monte Carlo Tree Search, A* Search, and heuristics to make efficient decisions. Placed in the top 20% of the class tournament.",
                tech: ["Python"],
                course: "COMP 424 — Artificial Intelligence",
                links: [
                    { label: "💻 Code", url: "https://github.com/zu-greta/424project" },
                    { label: "📄 Report", url: "assets/reports/424Report.pdf" }
                ]
            },
            "paxos": {
                title: "Paxos Total Order Game",
                dates: "Nov 2024 - Dec 2024",
                status: "",
                statusLabel: "Completed",
                description: "Implemented the Paxos Consensus Algorithm to achieve total order in a Java-based multiplayer distributed systems game. Handles node failures and network partitions gracefully.",
                tech: ["Java", "Paxos", "Distributed Systems"],
                course: "COMP 512 — Distributed Systems",
                links: []
            },
            "travel-agency": {
                title: "Travel Agency Management System",
                dates: "Jan 2024 - May 2024",
                status: "",
                statusLabel: "Completed",
                description: "Designed an application for a travelling agency where users can book flights, hotels, or rent cars. Created relational schemas, E/R diagrams, SQL queries and used JDBC to provide a database and functions to navigate and use it.",
                tech: ["Java", "JDBC", "SQL", "DB2", "E/R diagrams"],
                course: "COMP 421 — Database Systems",
                links: [
                    { label: "💻 Code", url: "https://github.com/zu-greta/comp421" }
                ]
            },
            "compiler": {
                title: "Compiler for Mini-C",
                dates: "Jan 2025 - May 2025",
                status: "",
                statusLabel: "Completed",
                description: "Built a full compiler from scratch for Mini-C (a subset of C) including lexer, parser, semantic analysis, MIPS code generation, and object-oriented features. Automated with Bash scripts.",
                tech: ["Java", "C", "MIPS", "Bash"],
                course: "COMP 520 — Compiler Design",
                links: [
                    { label: "💻 Code", url: "https://github.com/zu-greta/comp520_2024" }
                ]
            },
            "os-sim": {
                title: "Operating Systems Simulation",
                dates: "Jan 2024 - Mar 2024",
                status: "",
                statusLabel: "Completed",
                description: "Created an operating system simulation including a custom shell, memory management (paging, segmentation), and filesystem management. Containerized with Docker for reproducible testing.",
                tech: ["C", "Bash", "Docker"],
                course: "COMP 310 — Operating Systems",
                links: [
                    { label: "💻 Code", url: "https://github.com/zu-greta/comp310" }
                ]
            },
            "mealmates": {
                title: "MealMates — Food Matching App",
                dates: "2024 (Hackathon)",
                status: "",
                statusLabel: "Completed",
                description: "Hackathon project (CodeJam 14). Users swipe through food images from nearby restaurants and curate a list of interested spots. Match with friends on similar restaurants to try out together. Tinder-style UX for food.",
                tech: ["Python", "Django-rest", "SQLite3", "Javascript", "TypeScript", "React Native", "Tailwind"],
                course: "CodeJam 14 Hackathon",
                links: [
                    { label: "🎬 Demo", url: "https://youtube.com/shorts/2nAD9EJrNGw?si=f1xnBtyIwjq76qlM" },
                    { label: "📋 Devpost", url: "https://devpost.com/software/fooder-zx98kt" },
                    { label: "💻 Code", url: "https://github.com/denis-tsariov/codejam14" }
                ]
            },
            "calendar": {
                title: "Calendar / Reminder App",
                dates: "July 2024 - Present",
                status: "M",
                statusLabel: "In Development",
                description: "Personal iOS Calendar and ToDo list application. Exploring differences between iOS and macOS APIs, database syncing between devices, and native SwiftUI design patterns.",
                tech: ["Swift", "SwiftUI", "Xcode"],
                course: "Personal Project",
                links: [
                    { label: "💻 Code", url: "https://github.com/zu-greta/calendar" }
                ]
            },
            "energy-ml": {
                title: "Energy Efficiency in ML Algorithms",
                dates: "June 2025 - Dec 2025",
                status: "A",
                statusLabel: "Recently Completed",
                description: "Instrumented Switch-Transformers and Qwen Mixture-of-Experts models using CodeCarbon on DeepSpeed. Profiled GPU energy consumption and identified optimization strategies that reduced energy usage by ~66% without loss in accuracy. Prepared a Responsible AI course project with starter code.",
                tech: ["Python", "CodeCarbon", "DeepSpeed", "PyTorch"],
                course: "McGill DISC Lab — Prof. Balmau & Prof. Kemme",
                links: [
                    { label: "📄 Report", url: "assets/reports/energy_eff_report.pdf" }
                ]
            },
            "tiktok": {
                title: "TikTok Algorithm Analysis",
                dates: "Sept 2024 - Dec 2024",
                status: "",
                statusLabel: "Completed",
                description: "Designed Python-based bots to collect 400+ TikTok videos while bypassing scraping restrictions. Conducted statistical analysis using Pandas and Scikit-learn to quantify algorithmic bias in engagement rates by user gender and content sentiment.",
                tech: ["Python", "Pandas", "Scikit-learn", "Web Scraping"],
                course: "Prometheus Lab — Prof. Vybihal",
                links: [
                    { label: "📄 Report", url: "assets/reports/Tik_Tok_Research_Project.pdf" }
                ]
            },
            "depression": {
                title: "Depression & Eating Disorders",
                dates: "Jan 2022 - April 2022",
                status: "",
                statusLabel: "Completed",
                description: "Researched the correlation between eating disorders and depression, determining whether there is a link in terms of impact and risks. Analyzed if antidepressants can be beneficial to eating disorders such as anorexia nervosa and bulimia nervosa.",
                tech: ["Research", "Statistical Analysis"],
                course: "Marianopolis College — Health Science",
                links: [
                    { label: "📄 Report", url: "assets/reports/eating_disorders_depression.pdf" },
                    { label: "📊 Presentation", url: "assets/eating_disorders_depression_poster_prsentation.pdf" }
                ]
            }
        },
        // The C-code project entries
        projects: [
            {
                funcName: "AI_Agent",
                comment: "Artificial Intelligence Agent",
                dates: "Oct 2023 - Dec 2023",
                description: "Python-based agent using Monte Carlo Tree Search, A* Search, and\n                heuristics; winning top 20% in the class tournament.",
                tech: "Python",
                links: {
                    code_link: { url: "https://github.com/zu-greta/424project", label: "https://github.com/zu-greta/424project" },
                    report_link: { url: "assets/reports/424Report.pdf", label: "assets/reports/424Report.pdf" }
                }
            },
            {
                funcName: "Paxos_Game",
                comment: "Paxos Total Order Game",
                dates: "Nov 2024 - Dec 2024",
                description: "Using the Paxos Consensus Algorithm to implement total order\n                for a Java-based multiplayer distributed systems game.",
                tech: "Java, Paxos, Distributed Systems",
                links: {}
            },
            {
                funcName: "Schedule_Booking_Tool",
                comment: "SOC-cessful Schedule Booking Tool",
                dates: "Nov 2024 - Jan 2025",
                description: "Full-stack website for a booking tool used by school staff\n                and students (XAMPP stack, SQLite3 database).",
                tech: "HTML/CSS, Javascript, PHP, XAMPP, SQLite3, SQL",
                links: {
                    website_link: { url: "https://www.cs.mcgill.ca/~gzu/socs_sisters/landing", label: "https://www.cs.mcgill.ca/~gzu/socs_sisters/landing" },
                    code_link: { url: "https://github.com/zu-greta/socs_sisters", label: "https://github.com/zu-greta/socs_sisters" },
                    demo_link: { url: "https://youtu.be/ZxdcFvYHAKo?si=WddSmUicHZD8O6qh", label: "https://youtu.be/ZxdcFvYHAKo?si=WddSmUicHZD8O6qh" }
                }
            },
            {
                funcName: "Travelling_Agency",
                comment: "Travelling Agency Management System",
                dates: "Jan 2024 - May 2024",
                description: "Java-based application for a travelling agency to book flights,\n                hotels or rent cars. Created relational schemas, E/R diagrams,\n                SQL queries and JDBC.",
                tech: "Java, JDBC, E/R diagrams, SQL, DB2",
                links: {
                    code_link: { url: "https://github.com/zu-greta/comp520_2024", label: "https://github.com/zu-greta/comp520_2024" }
                }
            },
            {
                funcName: "MiniC_Compiler",
                comment: "Compiler for Mini-C",
                dates: "Jan 2025 - May 2025",
                description: "Full compiler from scratch for Mini-C language (subset of C)\n                using Java and Bash scripts for automation.",
                tech: "Java, C, MIPS, Bash",
                links: {
                    code_link: { url: "https://github.com/zu-greta/comp520_2024", label: "https://github.com/zu-greta/comp520_2024" }
                }
            },
            {
                funcName: "OS_Simulation",
                comment: "Operating Systems Simulation Project",
                dates: "Jan 2024 - Mar 2024",
                description: "OS simulation including shell, memory management, and filesystem.",
                tech: "C, Bash, Docker",
                links: {
                    code_link: { url: "https://github.com/zu-greta/comp310", label: "https://github.com/zu-greta/comp310" }
                }
            },
            {
                funcName: "Brown_lab",
                comment: "Brown Lab Website",
                dates: "Jan 2025 - Dec 2025",
                description: "Website for the Brown Lab at McGill using React, Javascript and Node.js.",
                tech: "React, Javascript, Node.js",
                links: {
                    website_link: { url: "https://zu-greta.github.io/brown_lab/", label: "https://zu-greta.github.io/brown_lab/" },
                    code_link: { url: "https://github.com/zu-greta/brown_lab", label: "https://github.com/zu-greta/brown_lab" }
                }
            },
            {
                funcName: "BCV_Hackathon",
                comment: "HackMcWics25 Hackathon BCV website",
                dates: "2025",
                description: "Full-stack web-app (React, Drizzle, Postgresql) to improve CV\n                with most relevant experience using Gemini API calls.",
                tech: "REACT, Tailwind CSS, HTML/CSS, Javascript, APIs, Drizzle, Next.js",
                links: {
                    demo_link: { url: "https://youtu.be/TeJMOojokRM?si=M3tr0oGHdgZCmjvG", label: "https://youtu.be/TeJMOojokRM?si=M3tr0oGHdgZCmjvG" },
                    devpost_link: { url: "https://devpost.com/software/bcv-hackmcwics25", label: "https://devpost.com/software/bcv-hackmcwics25" },
                    code_link: { url: "https://github.com/DavidNitchi/McWICS25", label: "https://github.com/DavidNitchi/McWICS25" }
                }
            },
            {
                funcName: "MealMates_App",
                comment: "CodeJam14 Hackathon MealMates mobile application",
                dates: "2024",
                description: "Full-stack mobile app with React-Native frontend and Django-rest backend.",
                tech: "Python, Django-rest, SQLite3, SQL, Javascript, Typescript, REACT-native, Tailwind",
                links: {
                    demo_link: { url: "https://youtube.com/shorts/2nAD9EJrNGw?si=f1xnBtyIwjq76qlM", label: "https://youtube.com/shorts/2nAD9EJrNGw?si=f1xnBtyIwjq76qlM" },
                    devpost_link: { url: "https://devpost.com/software/fooder-zx98kt", label: "https://devpost.com/software/fooder-zx98kt" },
                    code_link: { url: "https://github.com/denis-tsariov/codejam14", label: "https://github.com/denis-tsariov/codejam14" }
                }
            },
            {
                funcName: "Calendar_App",
                comment: "Calendar/Reminder mobile application",
                dates: "July 2024 - Present",
                description: "iOS Calendar and ToDo list application using SwiftUI and XCode.",
                tech: "Swift, SwiftUI",
                links: {
                    code_link: { url: "https://github.com/zu-greta/calendar", label: "https://github.com/zu-greta/calendar" }
                }
            }
        ],
        research: [
            {
                name: "Energy_Efficiency_Project",
                comment: "Energy Efficiency in ML Algorithms",
                title: "Energy Efficiency in ML Algorithms",
                description: "Instrumented Switch-Transformers and Qwen MoE models\n                    using CodeCarbon on DeepSpeed; profiled GPU energy consumption and identified\n                    optimization strategies that reduced energy usage by ~66% without loss in accuracy.",
                reportLink: { url: "assets/reports/energy_eff_report.pdf", label: "assets/reports/energy_eff_report.pdf" }
            },
            {
                name: "TikTok_Impact_Project",
                comment: "TikTok Impact on Society Analysis",
                title: "TikTok Impact on Society Analysis",
                description: "Designed Python-based bots to collect 400+ TikTok videos\n                    while bypassing scraping restrictions; conducted statistical analysis using\n                    Pandas and Scikit-learn to quantify algorithmic bias in engagement rates.",
                reportLink: { url: "assets/reports/Tik_Tok_Research_Project.pdf", label: "assets/reports/Tik_Tok_Research_Project.pdf" }
            },
            {
                name: "Depression_Eating_Disorders_Project",
                comment: "Depression and Eating Disorders",
                title: "Depression and Eating Disorders",
                description: "Researching correlation between eating disorders and depression, \n                        analyzing treatment impact",
                reportLink: { url: "assets/reports/eating_disorders_depression.pdf", label: "assets/reports/eating_disorders_depression.pdf" }
            }
        ]
    },

    // Education.java tab
    educationJava: [
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
                ]},
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
    ],

    // Skills.bash tab
    skillsBash: [
        { varName: "PROGRAMMING_LANGUAGES", values: ["Java", "Python", "C/C++", "Bash", "Assembly", "SQL", "Javascript", "PHP", "OCaml", "HTML/CSS"] },
        { varName: "FRAMEWORKS_LIBRARIES", values: ["AWS", "Docker", "Git", "Pandas", "NumPy", "Matplotlib", "Pytorch", "TensorFlow", "Scikit-learn", "CodeCarbon", "SQLite", "Zookeeper", "TCP/IP", "REST APIs", "Django", "Flask", "React", "Swift"] },
        { varName: "LANGUAGES", values: ["English (Native)", "French (Native)"] }
    ],

    // Interests.json tab
    interests: {
        entries: [
            { name: "Dancing", description: "I am an active dancer at K-RAVE McGill, Emoria, and Kreation.", image: "./assets/interests/dance.JPG" },
            { name: "Volleyball", description: "I have started playing volleyball at McGill in intramural teams this year!", image: "./assets/interests/volleyball.jpg" },
            { name: "Dragon Boat", description: "I paddled with the McGill DragonBoatZ team and also the UDEM Dragon boat team.", image: "./assets/interests/db.JPG" },
            { name: "Travelling", description: "I enjoy travelling to different countries and discovering local foods/culture!", image: "./assets/interests/plane.jpg" }
        ],
        // Gallery: just add { name, image } to show more photos as polaroids
        gallery: [
            { name: "Dance.jpg", image: "./assets/interests/dance.JPG" },
            { name: "Volleyball.jpg", image: "./assets/interests/volleyball.jpg" },
            { name: "Dragon_Boat.jpg", image: "./assets/interests/db.JPG" },
            { name: "Travelling.jpg", image: "./assets/interests/plane.jpg" },
            { name: "Airshows.jpg", image: "./assets/interests/airshow.jpg" },
            { name: "Birds.jpg", image: "./assets/interests/birds.jpg" },
            { name: "Cars.jpg", image: "./assets/interests/cars.jpg" },
            { name: "Photography.jpg", image: "./assets/interests/photography.jpg" },
        ],
        other: ["Piano", "Figure Skating", "Snowboarding","Basketball", "Drawing", "Reading"]
    }
};

// ============================================================
// FRENCH TRANSLATIONS — Only override text that needs translating.
// Code-themed tabs stay in English (they're "code").
// ============================================================

const FR = {
    greeting: "Hello World, je suis Greta",
    headings: {
        aboutMe: "À propos de moi",
        contactMe: "Me contacter",
        experience: "Expérience",
        skills: "Compétences",
        education: "Éducation",
        work: "Travail",
        supervisor: "Superviseur",
        project: "Projet",
        relevantCourses: "Cours pertinents",
        awards: "Prix",
        status: "Ouverte aux opportunités"
    },

    aboutMe: {
        text: `Bonjour! Je suis Greta et je suis étudiante en maîtrise (MSc) à
            <a href="https://www.imperial.ac.uk/">Imperial College London</a>, en <b>informatique (génie logiciel)</b> (graduant en septembre 2027).
            <br>
            Je suis passionnée par le développement logiciel et l'apprentissage automatique, et je cherche toujours des
            opportunités pour apprendre et évoluer dans le domaine. Précédemment, j'ai complété un baccalauréat en informatique (intelligence artificielle) à <a href="https://www.mcgill.ca/">l'Université McGill</a> (2022-2026) et un DEC en sciences de la santé au <a href="https://www.marianopolis.edu/">Collège Marianopolis</a> (2020-2022).
            J'ai acquis de l'expérience dans divers rôles de stage, notamment en tant que développeuse en intelligence artificielle chez <a href="https://www.ericsson.com/en/about-us/company-facts/ericsson-worldwide/canada">Ericsson Canada</a>, et j'ai également travaillé sur plusieurs projets de recherche liés à l'efficacité énergétique des algorithmes d'apprentissage automatique dans le <a href="https://sites.google.com/view/discslab">McGill DISC Lab</a>.
            <br>
            Actuellement, je participe au programme Summer@EPFL dans le <a href="https://www.epfl.ch/labs/sacs/">laboratoire SaCS</a> sous la direction de professeure Anne-Marie Kermarrec.`
    },

    workExperience: [
        {
            role: "Stagiaire développeuse en intelligence artificielle",
            work: "Implémentation et déploiement d'un chatbot RAG utilisant Hopsworks, DeepEval et les modèles EricAI. Amélioration d'un outil de dimensionnement (CANDI) avec des capacités IA/ML et automatisation de la construction du modèle de prédiction. Conception et déploiement d'un outil de prédiction de prix avec regex et processus LLM, et entraînement d'un modèle LightBGM pour la prédiction de tendances."
        },
        {
            role: "Stagiaire en apprentissage automatique",
            work: "Conception et déploiement de pipelines de génération augmentée par récupération (RAG) utilisant AWS Lambda, Bedrock et S3. Création de flux de travail agentiques en Python pour générer des jeux de données pour le fine-tuning; amélioration de la latence et des résultats de ~40%. Conception et implémentation d'un assistant de codage CLI utilisant Langchain DeepAgents."
        },
        {
            role: "Preneur de notes (Science des données)",
            work: "Création de notes organisées et bien rédigées pour le programme d'accessibilité et de réussite étudiante de McGill."
        },
        {
            role: "Correctrice (Laboratoires de physique)",
            work: "Correction de rapports de laboratoire et rétroaction aux étudiants pour améliorer leur compréhension des concepts de physique."
        }
    ],

    researchExperience: [
        {
            role: "Assistante de recherche",
            supervisor: "Professeure Anne-Marie Kermarrec",
            project: "À déterminer"
        },
        {
            role: "Assistante de recherche",
            supervisor: "Professeure Oana Balmau et Professeure Bettina Kemme",
            project: "Efficacité énergétique des algorithmes d'apprentissage automatique"
        },
        {
            role: "Assistante de recherche",
            supervisor: "Professeur Joseph Vybihal",
            project: "Analyse de l'algorithme TikTok — conception de bots pour collecter plus de 400 vidéos et analyse statistique des biais algorithmiques"
        }
    ],

    skills: [
        { category: "Langages de programmation" },
        { category: "Balisage et Frontend" },
        { category: "Bases de données" },
        { category: "Technologies" },
        { category: "Frameworks et outils" },
        { category: "Piles web" },
        { category: "IDE/Outils" },
        { category: "Langues", items: "Anglais et français (les deux de langue maternelle)" }
    ],

    education: [
        {
            degree: "Maîtrise en informatique (génie logiciel)",
            dates: "Septembre 2026 - septembre 2027 prévu"
        },
        {
            degree: "Baccalauréat en informatique (Intelligence artificielle)",
            dates: "Août 2022 - mai 2026",
            awards: "Bourse Alma Mater"
        },
        {
            degree: "DEC en Sciences de la santé (Honours)",
            dates: "Août 2020 - juin 2022",
            awards: "Liste du doyen automne 2020 et hiver 2021"
        }
    ],

    interests: {
        entries: [
            { description: "Je suis une danseuse active à K-RAVE McGill et Emoria." },
            { description: "J'ai commencé à jouer au volleyball à McGill dans des équipes intra-muros cette année!" },
            { description: "J'ai pagayé avec l'équipe McGill DragonBoatZ et aussi l'équipe de bateau-dragon de l'UdeM." },
            { description: "J'aime voyager dans différents pays et découvrir la cuisine et la culture locales!" }
        ]
    }
};

// Current language state
let currentLang = "en";
