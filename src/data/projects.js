export const allProjects = [
{
        title: "Fuel Tracker",
        description: "A utility web application to track fuel consumption and efficiency over time.",
        tags: ['React', 'TypeScript', 'Vite', 'Recharts'],
        category: "App Development",
        featured: false,
        fileStructure: `└── fuel-tracker/
    ├── src
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── ...
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts`,
        details: { overview: "Tracks mileage and costs.", features: ["Chart visualization", "Local Storage"], installation: "npm install", usage: "Add entry." }
    },
{
        title: "Pokedex Pro",
        description: "Advanced Flutter app with a catalog of 150+ Pokémon. Integrated TensorFlow Lite for real-time image classification to identify Pokémon from camera feed.",
        tags: ['Flutter', 'Dart', 'TensorFlow Lite', 'AI'],
        category: "App Development",
        featured: true,
        fileStructure: `└── Pokedex/
    ├── assets
    │   ├── model2.tflite
    │   └── pokemon.csv
    ├── lib
    │   ├── home_page
    │   ├── llm_api
    │   ├── main.dart
    │   └── result_page
    ├── pubspec.yaml
    └── README.md`,
        details: {
            overview: "More than just a Pokedex, this app serves as a field guide for trainers. Point your camera at any Pokemon merchandise or image, and the integrated TFLite model will identify it instantly.",
            features: [
                "Real-time Image Classification (MobileNetV2)",
                "Rich UI with animated stats",
                "Offline database of 150+ Pokemon",
                "Voice search capability"
            ],
            installation: "flutter pub get\nflutter run",
            usage: "Open the 'Scan' tab to use the camera, or browse the 'Dex' tab to view stats."
        }
    },
{
        title: "Legal RAG System",
        description: "A privacy-first, local AI assistant for legal professionals. Uses Ollama (Llama 3), LangChain, and ChromaDB to analyze PDF contracts entirely offline with encryption at rest.",
        tags: ['Python', 'Streamlit', 'Ollama', 'RAG'],
        category: "AI & ML",
        featured: true,
        fileStructure: `└── legal_rag_system/
    ├── app.py
    ├── database.py
    ├── rag_engine.py
    ├── README.md
    ├── requirements.txt
    └── security.py`,
        details: {
            overview: "The Legal RAG System is a cutting-edge Retrieval-Augmented Generation application designed to help legal professionals analyze contracts without compromising client privacy. It operates entirely offline, ensuring no data ever leaves the local machine.",
            features: [
                "Local LLM Inference using Ollama (Llama 3)",
                "Vector Embeddings via ChromaDB for semantic search",
                "Privacy-first architecture with zero external API calls",
                "PDF Contract Analysis and Summarization",
                "Interactive Chat Interface for legal Q&A"
            ],
            installation: "pip install -r requirements.txt\npython app.py",
            usage: "1. Upload a PDF contract.\n2. Wait for embedding generation.\n3. Ask questions like 'What is the termination clause?'"
        }
    },
{
        title: "ExoSeek (Exo_Planet)",
        description: "Interactive space-themed web app for exploring exoplanets. Features ML classification models (Kepler/TESS data) and a 3D solar system visualization.",
        tags: ['Flask', 'Python', 'Machine Learning', 'Three.js'],
        category: "AI & ML",
        featured: true,
        fileStructure: `└── Exo_Planet/
    ├── app.py
    ├── models
    │   ├── ensemble_model.pkl
    │   ├── NASA.ipynb
    │   ├── preprocessor.pkl
    │   └── ...
    ├── static
    │   ├── script.js
    │   ├── style.css
    │   ├── templates
    │   ├── index.html
    │   └── find_exoplanets.html
    └── requirements.txt`,
        details: {
            overview: "ExoSeek visualizes the universe's exoplanets using data from NASA's Kepler and TESS missions. It combines a Machine Learning backend for planet classification with a stunning Three.js frontend for 3D exploration.",
            features: [
                "Interactive 3D Solar System visualization",
                "ML Classification of 'Habitable' candidates",
                "Real-time data visualization of light curves",
                "Educational mode for students"
            ],
            installation: "pip install flask tensorflow scikit-learn\nnpm install three",
            usage: "Run the Flask server and navigate to localhost:5000 to begin your journey."
        }
    },
{
        title: "Teachers Day App",
        description: "A modern Next.js application designed for event management, featuring a clean UI powered by Tailwind CSS and backend integration.",
        tags: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
        category: "App Development",
        featured: true,
        fileStructure: `└── teachers_day/
    ├── apphosting.yaml
    ├── next.config.ts
    ├── package.json
    ├── public
    ├── src
    │   ├── ai
    │   ├── app
    │   ├── components
    │   ├── hooks
    │   └── lib
    └── tsconfig.json`,
        details: {
            overview: "Built for organizing the annual Teacher's Day celebration, this app handled RSVPs, event scheduling, and a digital message board for students to leave notes.",
            features: [
                "Responsive Design with Tailwind CSS",
                "Server-side rendering with Next.js",
                "Digital Guestbook",
                "Admin dashboard for event managers"
            ],
            installation: "npm install\nnpm run dev",
            usage: "Navigate to the RSVP section to confirm attendance."
        }
    },
{
        title: "RecipeMedia",
        description: "A social-media style platform for sharing recipes. Built with Flutter and Supabase, featuring user profiles, infinite feeds, and media uploads.",
        tags: ['Flutter', 'Supabase', 'Dart', 'Social'],
        category: "App Development",
        featured: true,
        fileStructure: `└── RecipeMedia/
    ├── recipe_media
    │   ├── lib
    │   │   ├── main.dart
    │   │   ├── HomeScreen.dart
    │   │   ├── ProfilePage.dart
    │   │   ├── CreateNewReceipe.dart
    │   │   └── ...
    │   └── pubspec.yaml
    └── README.md`,
        details: {
            overview: "RecipeMedia reimagines the cookbook as a social feed. Users can snap photos of their creations, share step-by-step guides, and follow their favorite chefs.",
            features: [
                "Supabase Authentication & Database",
                "Infinite scrolling feed",
                "Image compression and caching",
                "Like, Comment, and Save recipes"
            ],
            installation: "flutter pub get",
            usage: "Sign up with email, verify, and start posting your culinary creations."
        }
    },
{
        title: "Aesthetix",
        description: "A collection of algorithmic solutions and aesthetic UI components for Python-based CLI tools.",
        tags: ['Python', 'Algorithms', 'CLI'],
        category: "AI & ML",
        featured: false,
        fileStructure: `└── Aesthetix/
    ├── 128longest_consecutive_sequence.py
    ├── 1two_sum.py
    ├── 3sum.py
    ├── listoffunc.py
    └── ...`,
        details: { overview: "CLI UI tools.", features: ["Colors", "Progress Bars"], installation: "pip install aesthetix", usage: "Import module." }
    },
{
        title: "Session",
        description: "Python backend scripts for session management logic.",
        tags: ['Python', 'Backend'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── session/
    ├── 1480.Running_sum_of_1d_array.py
    ├── example.py
    └── README.md`,
        details: { overview: "Backend logic.", features: ["Array manipulation", "Session tokens"], installation: "python example.py", usage: "Run scripts." }
    },
{
        title: "Session Site",
        description: "A lightweight session management web interface.",
        tags: ['HTML', 'CSS', 'JavaScript'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── session-site/
    ├── index.html
    └── README.md`,
        details: { overview: "Session manager.", features: ["Cookies", "State"], installation: "Open index.html", usage: "Login to test." }
    },
{
        title: "Water Drop Counter",
        description: "Computer vision application that counts falling water droplets in real-time from video feeds using OpenCV. Built for precise liquid measurement.",
        tags: ['Python', 'OpenCV', 'Streamlit', 'Computer Vision'],
        category: "AI & ML",
        featured: true,
        fileStructure: `└── Water_drop_counter/
    ├── main.py
    ├── README.md
    ├── requirements.txt
    └── static
        └── bg.mp4`,
        details: {
            overview: "A precise computer vision tool developed to automate the counting of liquid droplets in laboratory settings. It uses contour detection and background subtraction to track fast-moving droplets.",
            features: [
                "Real-time contour detection",
                "Background subtraction for noise reduction",
                "Automatic velocity calculation",
                "Data export to CSV"
            ],
            installation: "pip install opencv-python streamlit numpy",
            usage: "Upload a video file or connect a camera stream. Adjust the threshold slider until droplets are clearly detected."
        }
    },
{
        title: "Drop Basic",
        description: "Fundamental fluid dynamics simulation scripts implemented in Python.",
        tags: ['Python', 'Physics', 'Simulation'],
        category: "AI & ML",
        featured: false,
        fileStructure: `└── drop_basic/
    ├── main.py
    ├── requirements.txt
    └── vercel.json`,
        details: { overview: "Physics sim.", features: ["Fluid dynamics", "Matplotlib"], installation: "pip install numpy", usage: "Run simulation." }
    },
{
        title: "Toxic Tweet Analysis",
        description: "NLP project using TF-IDF vectorization and Linear Support Vector Classifiers to identify toxic content on social media.",
        tags: ['Python', 'NLP', 'Scikit-Learn', 'Pandas'],
        category: "AI & ML",
        featured: false,
        fileStructure: `└── sentiment_analysis/
    ├── README.md
    └── Toxic_Tweet_Classification_LinearSVC.ipynb`,
        details: { overview: "Identifies toxic language.", features: ["TF-IDF", "SVM Classifier"], installation: "pip install scikit-learn", usage: "Input text to classify." }
    },
{
        title: "StockNLP",
        description: "Stock market trend prediction tool leveraging Natural Language Processing on news headlines.",
        tags: ['Python', 'NLP', 'Finance', 'Jupyter'],
        category: "AI & ML",
        featured: false,
        fileStructure: `└── stocknlp/
    ├── README.md
    ├── stocknlpprediction.ipynb
    └── stocknlpprediction.py`,
        details: { overview: "Predicts trends from news.", features: ["Sentiment Analysis", "Historical Data"], installation: "pip install pandas", usage: "Run notebook." }
    },
{
        title: "Test BBot",
        description: "An experimental bot framework integrating Python backend logic with a lightweight HTML/JS frontend.",
        tags: ['Python', 'JavaScript', 'Bot Dev'],
        category: "IoT & Hardware",
        featured: false,
        fileStructure: `└── test_bbot/
    ├── index.html
    ├── requirements.txt
    ├── script.js
    ├── styles.css
    └── test.py`,
        details: { overview: "Bot framework.", features: ["Async logic", "Web Interface"], installation: "python main.py", usage: "Chat via web." }
    },
{
        title: "Aida Web",
        description: "Aida Web project implementation.",
        tags: ['JavaScript', 'TypeScript', 'HTML', 'Ruby', 'CSS'],
        category: "App Development",
        featured: false,
        fileStructure: `└── aida-web/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    ├── tailwind.config.js
    └── vite.config.js`,
        details: {
            overview: "Aida Web project sources.",
            features: [],
            installation: "Check package.json.",
            usage: "npm run dev"
        }
    },
{
        title: "Ai Based Projects",
        description: "Collection of AI based experiments.",
        tags: ['AI'],
        category: "AI & ML",
        featured: false,
        fileStructure: `└── Ai-Based-Projects/
    └── README.md`,
        details: { overview: "AI experiments.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Gitsample",
        description: "Git sample project.",
        tags: ['HTML', 'CSS'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── gitsample/
    ├── README.md
    ├── index.html
    └── style.css`,
        details: { overview: "Sample git project.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Railizard",
        description: "Railizard application.",
        tags: ['PHP', 'HTML', 'JavaScript', 'CSS'],
        category: "App Development",
        featured: false,
        fileStructure: `└── Railizard/
    ├── README.md
    ├── Readme.txt
    ├── assets
    ├── forms
    ├── index.html
    ├── portfolio-details.html
    ├── service-details.html
    └── starter-page.html`,
        details: { overview: "Railizard web app.", features: [], installation: "PHP server required.", usage: "Deploy to server." }
    },
{
        title: "Snapwaste",
        description: "Snapwaste mobile application.",
        tags: ['C++', 'HTML', 'Dart'],
        category: "AI & ML",
        featured: false,
        fileStructure: `└── SnapWaste/
    ├── README.md
    ├── analysis_options.yaml
    ├── android
    ├── ios
    ├── lib
    ├── linux
    ├── macos
    ├── pubspec.lock
    ├── pubspec.yaml
    ├── test
    ├── web
    └── windows`,
        details: { overview: "Multi-platform app.", features: [], installation: "flutter pub get", usage: "flutter run" }
    },
{
        title: "Web Test",
        description: "Web testing project.",
        tags: ['HTML', 'TypeScript', 'JavaScript', 'CSS'],
        category: "App Development",
        featured: false,
        fileStructure: `└── web-test/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── public
    ├── src
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts`,
        details: { overview: "Web testing suite.", features: [], installation: "npm install", usage: "npm run test" }
    },
{
        title: "Wallie",
        description: "Wallie IoT project.",
        tags: ['Python'],
        category: "IoT & Hardware",
        featured: false,
        fileStructure: `└── wallie/
    ├── README.md
    └── wallie.py`,
        details: { overview: "Wallie python script.", features: [], installation: "python wallie.py", usage: "python wallie.py" }
    },
{
        title: "Lab",
        description: "Academic lab works and experiments.",
        tags: ['HTML', 'Java', 'Python', 'C'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── Lab/
    ├── DS
    ├── Exp.ipynb
    ├── Github.sh
    ├── Mysql
    ├── Python AI Lab S5
    ├── PythonLab S4
    ├── README.md
    ├── Shell
    ├── commands.sql
    ├── java
    ├── output.png
    └── python`,
        details: { overview: "Lab repository.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Workshop Qr Scanner",
        description: "QR Scanner for workshops.",
        tags: ['Python'],
        category: "App Development",
        featured: false,
        fileStructure: `└── Workshop_QR_Scanner/
    ├── README.md
    ├── banner.png
    ├── check.png
    ├── cross.png\n    ├── data.xlsx
    ├── datatest.xlsx
    ├── downloader.py
    ├── email_test.py
    ├── images
    ├── points.txt
    ├── qr_code.png
    ├── qrgen.py
    ├── scanner.py
    └── test-image.jpeg`,
        details: { overview: "QR code tools.", features: ["Scanning", "Generation"], installation: "pip install requirements.txt", usage: "python scanner.py" }
    },
{
        title: "Ideaignite",
        description: "Idea Ignite project.",
        tags: ['HTML', 'JavaScript', 'CSS'],
        category: "App Development",
        featured: false,
        fileStructure: `└── ideaignite/
    ├── CHANGELOG.md
    ├── LICENSE
    ├── README.md
    ├── dist
    ├── index.html
    ├── package-lock.json
    ├── package-sample.json
    ├── package.json
    └── src`,
        details: { overview: "Idea submission platform.", features: [], installation: "npm install", usage: "npm start" }
    },
{
        title: "Ideapitchingwebsite",
        description: "Platform for pitching ideas.",
        tags: ['HTML', 'Python', 'JavaScript', 'CSS'],
        category: "App Development",
        featured: false,
        fileStructure: `└── IdeaPitchingWebsite/
    ├── README.md
    └── flask-app`,
        details: { overview: "Flask based pitching site.", features: [], installation: "pip install flask", usage: "python app.py" }
    },
{
        title: "Newfolder",
        description: "Miscellaneous scripts.",
        tags: ['Python'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── newfolder/
    ├── README.md
    ├── dictionary.py
    ├── python.ipynb
    └── stream.py`,
        details: { overview: "Script collection.", features: [], installation: "N/A", usage: "python stream.py" }
    },
{
        title: "Simzflutter",
        description: "Simz Academy flutter app.",
        tags: ['C++', 'HTML', 'Dart'],
        category: "App Development",
        featured: false,
        fileStructure: `└── simzflutter/
    ├── README.md
    └── simz_academy`,
        details: { overview: "Academy app.", features: [], installation: "flutter pub get", usage: "flutter run" }
    },
{
        title: "Futterinternship",
        description: "Flutter internship projects.",
        tags: ['C++', 'HTML', 'Dart'],
        category: "App Development",
        featured: false,
        fileStructure: `└── FutterInternship/
    ├── README.md
    ├── example.dart
    ├── flutter
    ├── github.sh
    ├── hello-world.dart
    ├── oops
    └── team_project`,
        details: { overview: "Internship work.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Project Flutter Internship",
        description: "Flutter internship final project.",
        tags: ['Dart'],
        category: "App Development",
        featured: false,
        fileStructure: `└── Project--Flutter-internship/
    ├── Dart Project
    ├── README.md
    └── github.sh`,
        details: { overview: "Final project.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Pythonplayground001",
        description: "Python playground.",
        tags: ['Python'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── PythonPlayGround001/
    ├── README.md`,
        details: { overview: "Playground.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Testproject",
        description: "Test project.",
        tags: ['Test'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── TestProject/
    └── README.md`,
        details: { overview: "Test.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Voice",
        description: "Voice recognition project 2.0.",
        tags: ['HTML', 'Python', 'JavaScript'],
        category: "AI & ML",
        featured: false,
        fileStructure: `└── voice/
    ├── README.md
    └── project2.0`,
        details: { overview: "Voice tools.", features: [], installation: "pip install requirements.txt", usage: "python main.py" }
    },
{
        title: "Learningfest",
        description: "Learning Fest web resources.",
        tags: ['HTML', 'CSS'],
        category: "App Development",
        featured: false,
        fileStructure: `└── LearningFest/
    ├── README.md
    ├── Week_1
    ├── Week_2
    ├── Week_3
    └── index.html`,
        details: { overview: "Educational materials.", features: [], installation: "N/A", usage: "Open index.html" }
    },
{
        title: "Nasa Space App",
        description: "NASA Space App Challenge submission.",
        tags: ['HTML', 'JavaScript', 'CSS'],
        category: "AI & ML",
        featured: false,
        fileStructure: `└── Nasa_Space_App/
    ├── README.md
    ├── index.html
    ├── script.js
    ├── style.css
    ├── mars.html
    └── ...`,
        details: { overview: "Space app challenge.", features: [], installation: "N/A", usage: "Open index.html" }
    },
{
        title: "Example",
        description: "Example HTML project.",
        tags: ['HTML'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── example/
    ├── README.md
    └── html.html`,
        details: { overview: "Example.", features: [], installation: "N/A", usage: "Open html.html" }
    },
{
        title: "Mulearn Web",
        description: "MuLearn Web portal.",
        tags: ['Web'],
        category: "App Development",
        featured: false,
        fileStructure: `└── MuLearn_Web/
    ├── README.md`,
        details: { overview: "Web portal.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Astrocoders",
        description: "Astrocoders website.",
        tags: ['HTML', 'JavaScript', 'CSS'],
        category: "App Development",
        featured: false,
        fileStructure: `└── AstroCoders/
    ├── README.md
    ├── index.html
    ├── script.js
    └── style.css`,
        details: { overview: "Space themed site.", features: [], installation: "N/A", usage: "Open index.html" }
    },
{
        title: "Skills Introduction To Github",
        description: "GitHub skills course.",
        tags: ['Git'],
        category: "Backend & DB",
        featured: false,
        fileStructure: `└── skills-introduction-to-github/
    ├── LICENSE
    ├── README.md
    ├── ROFILE.md
    └── images`,
        details: { overview: "GitHub training.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Skills Github Pages",
        description: "GitHub Pages skills course.",
        tags: ['Git', 'Pages'],
        category: "App Development",
        featured: false,
        fileStructure: `└── skills-github-pages/
    ├── LICENSE
    └── README.md`,
        details: { overview: "GitHub Pages.", features: [], installation: "N/A", usage: "N/A" }
    },
{
        title: "Calculator",
        description: "Simple Calculator app.",
        tags: ['HTML', 'JavaScript', 'CSS'],
        category: "App Development",
        featured: false,
        fileStructure: `└── Calculator/
    ├── README.md
    ├── index.html
    ├── script.js
    └── style.css`,
        details: { overview: "Calculator.", features: [], installation: "N/A", usage: "Open index.html" }
    }
];
