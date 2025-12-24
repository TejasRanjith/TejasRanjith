import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Database,
  Cpu,
  Code2,
  BrainCircuit,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ExternalLink,
  Zap,
  Layers,
  Search,
  Sun,
  Moon,
  Download,
  Smartphone,
  Wifi,
  Globe,
  MonitorPlay,
  FileText,
  Copy,
  Check,
  FolderTree
} from 'lucide-react';

// --- CSS for Hidden Scrollbar ---
const scrollbarStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// --- Utility: Reveal Animation Component ---
const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) ${isVisible ? 'opacity-100 translate-y-0 filter blur-0' : 'opacity-0 translate-y-12 filter blur-sm'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- Background: Circuitry Animation ---
const CircuitBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const resize = () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; };
    window.addEventListener('resize', resize);
    resize();
    const gridSize = 40;
    const signalCount = 15;
    const signals = [];
    class Signal {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
        const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
        this.dir = dirs[Math.floor(Math.random() * dirs.length)];
        this.speed = 2; this.life = Math.random() * 100 + 100; this.history = []; this.historyMaxLength = 20;
      }
      update() {
        this.life--; this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.historyMaxLength) this.history.shift();
        this.x += this.dir.x * this.speed; this.y += this.dir.y * this.speed;
        if (this.x % gridSize === 0 && this.y % gridSize === 0) {
          if (Math.random() < 0.3) {
            const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
            this.dir = dirs[Math.floor(Math.random() * dirs.length)];
          }
        }
        if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
      }
      draw(ctx) {
        if (this.history.length < 2) return;
        ctx.beginPath(); ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) ctx.lineTo(this.history[i].x, this.history[i].y);
        ctx.strokeStyle = `rgba(239, 68, 68, ${this.life / 100})`; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill();
      }
    }
    for (let i = 0; i < signalCount; i++) signals.push(new Signal());
    const staticLines = [];
    const numStaticLines = 50;
    for (let i = 0; i < numStaticLines; i++) {
      const sx = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const sy = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      const length = Math.floor(Math.random() * 5 + 2) * gridSize;
      const vertical = Math.random() > 0.5;
      staticLines.push({ x: sx, y: sy, length, vertical });
    }
    let animationFrameId;
    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.05;
      const baseOpacity = isDarkMode ? 0.1 : 0.05;
      const breathing = (Math.sin(time) + 1) * 0.05;
      ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${baseOpacity + breathing})` : `rgba(0, 0, 0, ${baseOpacity + breathing})`;
      ctx.lineWidth = 1;
      staticLines.forEach(line => {
        ctx.beginPath(); ctx.moveTo(line.x, line.y);
        if (line.vertical) ctx.lineTo(line.x, line.y + line.length); else ctx.lineTo(line.x + line.length, line.y);
        ctx.stroke(); ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.arc(line.x, line.y, 2, 0, Math.PI * 2); ctx.fill();
      });
      signals.forEach(signal => { signal.update(); signal.draw(ctx); });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [isDarkMode]);
  return (<canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />);
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [view, setView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (view !== 'home') {
      setView('home'); setSelectedProject(null); setSelectedCategory(null);
      setTimeout(() => { const element = document.getElementById(id); if (element) element.scrollIntoView({ behavior: 'smooth' }); }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) { element.scrollIntoView({ behavior: 'smooth' }); setActiveSection(id); }
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  // --- DATA: Projects ---
  const allProjects = [
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
    │   └── style.css
    ├── templates
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
    └── vite.config.ts`,
      details: { overview: "Tracks mileage and costs.", features: ["Chart visualization", "Local Storage"], installation: "npm install", usage: "Add entry." }
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
    └── vite.config.ts`,
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
    └── README.md`,
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
    └── README.md`,
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
    ├── manifest.json
    ├── service-worker.js
    ├── simple_calculator.html
    └── style.css`,
      details: { overview: "Calculator PWA.", features: ["PWA support"], installation: "N/A", usage: "Open simple_calculator.html" }
    },
    {
      title: "Virtuosimusiq",
      description: "Virtuosi Musiq web app.",
      tags: ['HTML', 'JavaScript', 'CSS'],
      category: "App Development",
      featured: false,
      fileStructure: `└── virtuosimusiq/
    ├── OneSignalSDKWorker.js
    ├── README.md
    ├── index.html
    ├── manifest.json
    └── service-worker.js`,
      details: { overview: "Music app.", features: [], installation: "N/A", usage: "Open index.html" }
    },
    {
      title: "Intro To Github",
      description: "Introduction to GitHub materials.",
      tags: ['Git'],
      category: "Backend & DB",
      featured: false,
      fileStructure: `└── intro-to-github/
    ├── LICENSE
    ├── PROFILE.md
    ├── README.md
    └── images`,
      details: { overview: "GitHub Intro.", features: [], installation: "N/A", usage: "N/A" }
    },
    {
      title: "Intro To Markdown",
      description: "Introduction to Markdown.",
      tags: ['Markdown'],
      category: "Backend & DB",
      featured: false,
      fileStructure: `└── intro-to-markdown/
    ├── LICENSE
    ├── README.md
    └── index.md`,
      details: { overview: "Markdown guide.", features: [], installation: "N/A", usage: "Read index.md" }
    },
    {
      title: "Reality Example",
      description: "Reality example project.",
      tags: ['HTML'],
      category: "App Development",
      featured: false,
      fileStructure: `└── reality_example/
    ├── README.md
    └── rough.html`,
      details: { overview: "Example.", features: [], installation: "N/A", usage: "N/A" }
    },
    {
      title: "Intro On Git",
      description: "Intro on Git guide.",
      tags: ['Git'],
      category: "Backend & DB",
      featured: false,
      fileStructure: `└── intro-on-git/
    ├── PROFILE.md
    └── README.md`,
      details: { overview: "Git guide.", features: [], installation: "N/A", usage: "N/A" }
    },
    {
      title: "Projectworkonlineshop",
      description: "Online shop project.",
      tags: ['Python', 'HTML', 'SQL'],
      category: "App Development",
      featured: false,
      fileStructure: `└── ProjectWorkOnlineShop/
    ├── README.md
    ├── email.html
    ├── main.py
    ├── shop.sql
    └── ...`,
      details: { overview: "E-commerce project.", features: ["SQL Database", "Python Backend"], installation: "pip install -r req.txt", usage: "python main.py" }
    },
    {
      title: "Pyhton Practice",
      description: "Python practice scripts.",
      tags: ['HTML', 'Python', 'JavaScript'],
      category: "Backend & DB",
      featured: false,
      fileStructure: `└── PYHTON_PRACTICE/
    ├── README.md
    ├── voice_assistant.py
    ├── sql.py
    └── ...`,
      details: { overview: "Practice scripts.", features: [], installation: "N/A", usage: "Run scripts." }
    },
    {
      title: "Python School Gr12",
      description: "Grade 12 Python projects.",
      tags: ['HTML', 'Python'],
      category: "Backend & DB",
      featured: false,
      fileStructure: `└── PYTHON_SCHOOL_GR12/
    ├── README.md
    ├── store.csv
    └── student.dat`,
      details: { overview: "School projects.", features: [], installation: "N/A", usage: "N/A" }
    },
    {
      title: "Code Server Over Internet",
      description: "Code server deployment.",
      tags: ['TypeScript', 'Docker'],
      category: "IoT & Hardware",
      featured: false,
      fileStructure: `└── code-server-over-internet/
    ├── Dockerfile
    ├── README.md
    └── package.json`,
      details: { overview: "Remote code server.", features: ["Docker"], installation: "docker build .", usage: "Run container." }
    },
    {
      title: "Computerscience",
      description: "Computer Science resources.",
      tags: ['Python'],
      category: "Backend & DB",
      featured: false,
      fileStructure: `└── ComputerScience/
    ├── README.md
    └── SPECIAL_PY_PROGS`,
      details: { overview: "CS Resources.", features: [], installation: "N/A", usage: "N/A" }
    }
  ];

  const featuredProjects = allProjects.filter(p => p.featured);

  // --- Category Logic ---
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setView('category-projects');
    window.scrollTo(0, 0);
  };

  const getFilteredProjects = () => {
    if (!selectedCategory) return [];
    return allProjects.filter(p => p.category === selectedCategory);
  };

  // Theme configuration objects
  const theme = {
    bg: isDarkMode ? 'bg-black' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-neutral-900',
    textSub: isDarkMode ? 'text-neutral-400' : 'text-neutral-600',
    border: isDarkMode ? 'border-neutral-800' : 'border-neutral-200',
    navBg: isDarkMode ? 'bg-black/90' : 'bg-white/90',
    cardBg: isDarkMode ? 'bg-neutral-950' : 'bg-white',
    cardHover: isDarkMode ? 'hover:bg-neutral-900' : 'hover:bg-gray-50',
    invertedText: isDarkMode ? 'text-black' : 'text-white',
    invertedBg: isDarkMode ? 'bg-white' : 'bg-black',
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setView('project-details');
    window.scrollTo(0, 0);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-red-500 selection:text-white overflow-x-hidden ${theme.bg} ${theme.text}`}>
      <style>{scrollbarStyles}</style>

      {/* Circuitry Background */}
      <CircuitBackground isDarkMode={isDarkMode} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? `${theme.navBg} backdrop-blur-sm ${theme.border} py-4` : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer" onClick={() => scrollTo('home')}>
            <div className={`w-8 h-8 ${theme.invertedBg} ${theme.invertedText} flex items-center justify-center font-mono rounded-sm group-hover:bg-red-600 group-hover:text-white transition-all`}>
              TR
            </div>
            <span className="font-mono">TEJAS.DEV</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium tracking-wide transition-all hover:text-red-500 relative group ${activeSection === link.id && view === 'home' ? 'text-red-500' : theme.textSub}`}
                >
                  {link.name.toUpperCase()}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full ${activeSection === link.id && view === 'home' ? 'w-full' : ''}`}></span>
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border ${theme.border} hover:border-red-500 hover:text-red-500 transition-colors z-50 relative bg-opacity-50`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <div className={`space-y-1.5 cursor-pointer ${theme.text}`}>
              <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
              <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
              <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-black'}`}></div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- CONDITIONAL VIEW RENDERING --- */}
      {view === 'project-details' && selectedProject ? (
        // --- DETAILED PROJECT VIEW ---
        <section className={`min-h-screen pt-32 pb-24 px-6 ${theme.bg} relative z-20`}>
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Back Button */}
            <button
              onClick={() => setView('all-projects')} // Go back to list
              className={`flex items-center gap-2 mb-8 ${theme.textSub} hover:text-red-500 transition-colors group`}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              BACK TO ARCHIVE
            </button>

            {/* Project Header */}
            <div className={`p-8 border ${theme.border} ${theme.cardBg} mb-8 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Code2 size={120} />
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-mono bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-1 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{selectedProject.title}</h1>

                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-700 transition-colors rounded-sm">
                    <Github size={18} />
                    VIEW SOURCE
                  </button>
                  <button className={`flex items-center gap-2 border ${theme.border} px-6 py-3 font-bold hover:border-red-500 hover:text-red-500 transition-colors rounded-sm`}>
                    <Globe size={18} />
                    LIVE DEMO
                  </button>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                <div className={`p-8 border ${theme.border} ${theme.cardBg}`}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="text-red-500" size={20} />
                    OVERVIEW
                  </h3>
                  <p className={`${theme.textSub} leading-relaxed`}>
                    {selectedProject.details?.overview || selectedProject.description}
                  </p>
                </div>

                {/* --- ADDED: File Structure Section --- */}
                {selectedProject.fileStructure && (
                  <div className={`p-8 border ${theme.border} ${theme.cardBg}`}>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <FolderTree className="text-red-500" size={20} />
                      FILE STRUCTURE
                    </h3>
                    <div className="bg-[#0f0f0f] p-4 rounded-sm border border-neutral-800 overflow-x-auto">
                      <pre className="font-mono text-xs text-neutral-400 leading-relaxed">
                        {selectedProject.fileStructure}
                      </pre>
                    </div>
                  </div>
                )}

                <div className={`p-8 border ${theme.border} ${theme.cardBg}`}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <MonitorPlay className="text-red-500" size={20} />
                    KEY FEATURES
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.details?.features ? (
                      selectedProject.details.features.map((feature, idx) => (
                        <li key={idx} className={`flex items-start gap-3 ${theme.textSub}`}>
                          <Check className="text-red-500 mt-1 shrink-0" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className={theme.textSub}>Detailed feature list unavailable.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                <div className={`p-6 border ${theme.border} ${theme.cardBg}`}>
                  <h3 className="text-sm font-bold mb-4 text-red-500 font-mono">INSTALLATION</h3>
                  <div className="bg-black/50 p-3 rounded border border-neutral-800 font-mono text-xs overflow-x-auto text-neutral-300">
                    {selectedProject.details?.installation || "npm install"}
                  </div>
                </div>

                <div className={`p-6 border ${theme.border} ${theme.cardBg}`}>
                  <h3 className="text-sm font-bold mb-4 text-red-500 font-mono">USAGE</h3>
                  <div className="bg-black/50 p-3 rounded border border-neutral-800 font-mono text-xs overflow-x-auto text-neutral-300 whitespace-pre-wrap">
                    {selectedProject.details?.usage || "Run the application."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : view === 'category-projects' ? (
        // --- CATEGORY PROJECTS VIEW ---
        <section className={`min-h-screen pt-32 pb-24 px-6 ${theme.bg}`}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <button
                onClick={() => setView('home')}
                className={`flex items-center gap-2 mb-6 ${theme.textSub} hover:text-red-500 transition-colors group`}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                BACK TO HOME
              </button>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">{selectedCategory}</h2>
                <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-mono rounded">
                  {getFilteredProjects().length} PROJECTS
                </span>
              </div>
              <p className={`text-lg ${theme.textSub}`}>Curated projects specialized in {selectedCategory}.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProjects().map((project, index) => (
                <div
                  key={index}
                  onClick={() => openProjectDetails(project)}
                  className={`p-6 border ${theme.border} ${theme.cardBg} hover:border-red-500 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-full border ${theme.border} ${theme.textSub}`}>
                      {project.featured ? <Zap size={20} className="text-yellow-500" /> : <Layers size={20} />}
                    </div>
                    <div className="flex gap-2">
                      <Github className={`w-5 h-5 ${theme.textSub} hover:text-red-500 cursor-pointer transition-colors`} />
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold mb-3 group-hover:text-red-500 transition-colors`}>{project.title}</h3>
                  <p className={`text-sm ${theme.textSub} mb-6 leading-relaxed h-20 overflow-y-auto no-scrollbar`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className={`text-xs font-mono border ${theme.border} px-2 py-1 rounded-sm text-red-500`}>
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className={`text-xs font-mono border ${theme.border} px-2 py-1 rounded-sm ${theme.textSub}`}>
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : view === 'home' ? (
        <>
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20">
            <div className="max-w-4xl w-full relative z-10">
              <RevealOnScroll>
                {/* Indicator color green */}
                <div className={`mb-6 inline-flex items-center gap-2 px-3 py-1 border ${theme.border} rounded-full ${isDarkMode ? 'bg-neutral-900/50' : 'bg-white/50'}`}>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className={`text-xs ${theme.textSub} font-mono`}>AVAILABLE FOR HIRE</span>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
                  TEJAS <span className={theme.textSub}>RANJITH</span> <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">AI ENGINEER</span>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={400}>
                <div className={`max-w-xl ${theme.textSub} text-lg md:text-xl leading-relaxed mb-10`}>
                  Bridging the gap between raw data and intelligent systems. I specialize in Computer Vision, IoT, and building full-stack AI applications.
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={600}>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={() => scrollTo('projects')}
                    className="px-8 py-4 bg-red-600 text-white font-bold tracking-wide hover:bg-red-700 transition-colors flex items-center gap-2 group rounded-sm shadow-lg shadow-red-900/20"
                  >
                    VIEW WORK
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => scrollTo('contact')}
                    className={`px-8 py-4 border ${theme.border} ${theme.text} font-bold tracking-wide hover:border-red-500 hover:text-red-500 transition-colors rounded-sm backdrop-blur-sm`}
                  >
                    CONTACT ME
                  </button>

                  {/* Resume Button */}
                  <a
                    href="/resume.pdf"
                    download
                    className={`px-8 py-4 border ${theme.border} ${theme.text} font-bold tracking-wide 
                      ${isDarkMode
                        ? 'hover:bg-white hover:text-black hover:border-white'
                        : 'hover:bg-black hover:text-white hover:border-black'} 
                      transition-all rounded-sm backdrop-blur-sm flex items-center justify-center gap-2 group cursor-pointer`}
                  >
                    RESUME
                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            {/* Decorative elements */}
            <div className={`absolute bottom-10 right-10 hidden md:block animate-bounce ${theme.textSub}`}>
              <ChevronDown size={32} />
            </div>
          </section>

          {/* About / Terminal Section */}
          <section id="about" className={`py-24 px-6 border-t ${theme.border} relative`}>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <RevealOnScroll>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  DECODING COMPLEXITY <br />
                  <span className="text-red-500">WITH AI & IOT</span>
                </h2>
                <p className={`${theme.textSub} mb-6 leading-relaxed`}>
                  I am an Artificial Intelligence and Data Science student at Jyothi Engineering College, Kerala. My passion lies in building smart systems that bridge the physical and digital worlds.
                </p>
                <p className={`${theme.textSub} mb-8 leading-relaxed`}>
                  From training TensorFlow Lite models for mobile apps to engineering IoT devices with Raspberry Pi, I love solving real-world problems with code. I have a strong foundation in Python, Computer Vision, and Full Stack Development.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className={`border-l-2 border-red-500 pl-4`}>
                    {/* CHANGED: 50+ Projects */}
                    <div className="text-3xl font-bold mb-1">50+</div>
                    <div className={`text-sm ${theme.textSub} font-mono`}>PROJECTS</div>
                  </div>
                  <div className={`border-l-2 border-red-500 pl-4`}>
                    <div className="text-3xl font-bold mb-1">2026</div>
                    <div className={`text-sm ${theme.textSub} font-mono`}>GRADUATION</div>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Terminal Component */}
              <RevealOnScroll delay={300}>
                <div className="w-full bg-[#1a1a1a] border border-neutral-800 rounded-lg overflow-hidden font-mono text-sm shadow-2xl relative group transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  <div className="bg-[#2a2a2a] px-4 py-2 flex items-center gap-2 border-b border-neutral-800">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-neutral-500 text-xs">tejas@portfolio:~</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex gap-2">
                      <span className="text-green-500">➜</span>
                      <span className="text-blue-400">~</span>
                      <span className="text-white">python analyze_profile.py --target="Tejas"</span>
                    </div>
                    <div className="text-neutral-400 space-y-1 pl-4 border-l border-neutral-700 ml-1">
                      <p>Loading modules... <span className="text-green-500">Done</span></p>
                      <p>Analyzing skills vector space...</p>
                      <p>{`{`}</p>
                      <p className="pl-4">"role": "AI & DS Student",</p>
                      <p className="pl-4">"focus": ["Computer Vision", "IoT", "Full Stack"],</p>
                      <p className="pl-4">"status": "Ready to Deploy"</p>
                      <p>{`}`}</p>
                    </div>
                    <div className="flex gap-2 animate-pulse">
                      <span className="text-green-500">➜</span>
                      <span className="text-blue-400">~</span>
                      <span className="w-2 h-5 bg-red-500"></span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className={`py-24 px-6 border-t ${theme.border} ${isDarkMode ? 'bg-neutral-950/50' : 'bg-gray-100/50'} relative backdrop-blur-sm`}>
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                  <div>
                    <h2 className={`text-sm font-mono ${theme.textSub} mb-2`}>03. EXPERTISE</h2>
                    <h3 className="text-4xl font-bold">TECHNICAL ARSENAL</h3>
                  </div>
                  <p className={`${theme.textSub} max-w-md text-right md:text-left`}>
                    A curated stack of tools for Artificial Intelligence, Web, and Mobile Development.
                  </p>
                </div>
              </RevealOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <RevealOnScroll delay={100}>
                  <SkillCard
                    icon={<BrainCircuit className="w-8 h-8 text-blue-500" />}
                    title="AI & ML"
                    skills={['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'Gemini API']}
                    theme={theme}
                    isDarkMode={isDarkMode}
                    onClick={() => handleCategoryClick("AI & ML")}
                  />
                </RevealOnScroll>
                <RevealOnScroll delay={200}>
                  <SkillCard
                    icon={<Smartphone className="w-8 h-8 text-purple-500" />}
                    title="App Development"
                    skills={['Flutter', 'ReactJS', 'Figma', 'HTML', 'CSS']}
                    theme={theme}
                    isDarkMode={isDarkMode}
                    onClick={() => handleCategoryClick("App Development")}
                  />
                </RevealOnScroll>
                <RevealOnScroll delay={300}>
                  <SkillCard
                    icon={<Database className="w-8 h-8 text-green-500" />}
                    title="Backend & DB"
                    skills={['Firebase', 'Supabase', 'MySQL', 'Flask', 'SQL']}
                    theme={theme}
                    isDarkMode={isDarkMode}
                    onClick={() => handleCategoryClick("Backend & DB")}
                  />
                </RevealOnScroll>
                <RevealOnScroll delay={400}>
                  <SkillCard
                    icon={<Wifi className="w-8 h-8 text-orange-500" />}
                    title="IoT & Hardware"
                    skills={['Raspberry Pi', 'Embedded Systems', 'Git', 'Sensors']}
                    theme={theme}
                    isDarkMode={isDarkMode}
                    onClick={() => handleCategoryClick("IoT & Hardware")}
                  />
                </RevealOnScroll>
              </div>
            </div>
          </section>

          {/* Projects Section (FEATURED ONLY) */}
          <section id="projects" className={`py-24 px-6 border-t ${theme.border} relative z-10`}>
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll>
                <h2 className={`text-sm font-mono ${theme.textSub} mb-2`}>04. PORTFOLIO</h2>
                <h3 className="text-4xl font-bold mb-16">FEATURED PROJECTS</h3>
              </RevealOnScroll>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {featuredProjects.map((project, index) => (
                  <RevealOnScroll key={index} delay={index * 100}>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      tags={project.tags}
                      theme={theme}
                      onClick={() => openProjectDetails(project)}
                    />
                  </RevealOnScroll>
                ))}
              </div>

              {/* View More Button - Switches to 'all-projects' view */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setView('all-projects');
                  }}
                  className={`flex flex-col items-center gap-2 px-8 py-4 ${theme.text} font-bold opacity-50 hover:opacity-100 transition-all rounded-sm group`}
                >
                  <span className="tracking-widest text-sm">VIEW ALL PROJECTS</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>

          {/* CTA / Contact Section */}
          <section id="contact" className={`py-32 px-6 border-t ${theme.border} ${isDarkMode ? 'bg-neutral-900' : 'bg-red-600 text-white'} relative z-10`}>
            <div className="max-w-4xl mx-auto text-center">
              <RevealOnScroll>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                  LET'S BUILD THE <br /> FUTURE TOGETHER
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={200}>
                <p className={`text-xl mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-neutral-400' : 'text-red-100'}`}>
                  Whether you need to fine-tune a model, develop a Flutter app, or engineer an IoT solution, I'm ready to collaborate.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={400}>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                  <a href="mailto:tejasranjith035611@gmail.com" className={`group flex items-center gap-3 px-8 py-4 ${isDarkMode ? 'bg-white text-black hover:bg-red-600 hover:text-white' : 'bg-white text-red-600 hover:bg-black hover:text-white'} text-lg font-bold transition-all rounded-full shadow-lg`}>
                    <Mail className="w-5 h-5" />
                    <span>EMAIL ME</span>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="flex gap-4">
                    <a href="https://github.com/TejasRanjith" target="_blank" rel="noopener noreferrer">
                      <SocialButton icon={<Github className="w-6 h-6" />} label="GitHub" isDarkMode={isDarkMode} />
                    </a>
                    <a href="https://www.linkedin.com/in/tejas-ranjith-9675bb257/" target="_blank" rel="noopener noreferrer">
                      <SocialButton icon={<Linkedin className="w-6 h-6" />} label="LinkedIn" isDarkMode={isDarkMode} />
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>
        </>
      ) : (
        // --- ALL PROJECTS VIEW ---
        <section className={`min-h-screen pt-32 pb-24 px-6 ${theme.bg}`}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <button
                onClick={() => setView('home')}
                className={`flex items-center gap-2 mb-6 ${theme.textSub} hover:text-red-500 transition-colors group`}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                BACK TO HOME
              </button>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">PROJECT ARCHIVE</h2>
              <p className={`text-lg ${theme.textSub}`}>A complete list of my experiments, applications, and contributions.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => openProjectDetails(project)}
                  className={`p-6 border ${theme.border} ${theme.cardBg} hover:border-red-500 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-full border ${theme.border} ${theme.textSub}`}>
                      {project.featured ? <Zap size={20} className="text-yellow-500" /> : <Layers size={20} />}
                    </div>
                    <div className="flex gap-2">
                      {/* Placeholder links since not provided in text file, but UI is ready */}
                      <Github className={`w-5 h-5 ${theme.textSub} hover:text-red-500 cursor-pointer transition-colors`} />
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold mb-3 group-hover:text-red-500 transition-colors`}>{project.title}</h3>
                  <p className={`text-sm ${theme.textSub} mb-6 leading-relaxed h-20 overflow-y-auto no-scrollbar`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className={`text-xs font-mono border ${theme.border} px-2 py-1 rounded-sm text-red-500`}>
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className={`text-xs font-mono border ${theme.border} px-2 py-1 rounded-sm ${theme.textSub}`}>
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={`py-8 ${theme.bg} ${theme.textSub} text-sm border-t ${theme.border} relative z-10`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono">
            © {new Date().getFullYear()} TEJAS.DEV
          </div>
          <div className="flex gap-6">
            <span className="hover:text-red-500 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-red-500 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components

const SkillCard = ({ icon, title, skills, theme, isDarkMode, onClick }) => (
  <div onClick={onClick} className={`group p-6 border ${theme.border} ${theme.cardBg} hover:border-red-500 transition-all duration-300 rounded-sm relative overflow-hidden backdrop-blur-md bg-opacity-80 cursor-pointer`}>
    <div className="absolute top-0 left-0 w-1 h-0 bg-red-600 group-hover:h-full transition-all duration-300"></div>
    <div className="mb-6 transition-transform group-hover:scale-110 duration-300 transform origin-left">{icon}</div>
    <h4 className="text-xl font-bold mb-4 group-hover:text-red-500 transition-colors">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className={`text-xs font-mono border ${theme.border} px-2 py-1 rounded-sm 
            group-hover:border-red-500/50
            ${isDarkMode ? 'group-hover:bg-red-900/20' : 'group-hover:bg-red-50'} 
            group-hover:text-red-500 transition-all`}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ title, description, tags, theme, onClick }) => (
  <div onClick={onClick} className={`group relative border ${theme.border} ${theme.cardBg} p-8 hover:border-red-500 transition-all duration-300 backdrop-blur-md bg-opacity-90 cursor-pointer`}>
    <div className="relative z-10">
      <h4 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">{title}</h4>
      <p className={`${theme.textSub} mb-6 leading-relaxed h-20 overflow-y-auto no-scrollbar`}>
        {description}
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-xs font-bold uppercase tracking-wider text-red-500">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const SocialButton = ({ icon, label, isDarkMode }) => (
  <button className={`w-14 h-14 border ${isDarkMode ? 'border-neutral-700 hover:border-red-500 hover:bg-red-600' : 'border-white/30 text-white hover:bg-white hover:text-red-600'} flex items-center justify-center rounded-full transition-all shadow-lg`} aria-label={label}>
    {icon}
  </button>
);

export default Portfolio;
