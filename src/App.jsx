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
  ExternalLink,
  Zap,
  Layers,
  Search,
  Sun,
  Moon,
  Download,
  Smartphone,
  Wifi
} from 'lucide-react';

// --- Utility: Reveal Animation Component ---
const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) ${isVisible
          ? 'opacity-100 translate-y-0 filter blur-0'
          : 'opacity-0 translate-y-12 filter blur-sm'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Configuration
    const gridSize = 40;
    const signalCount = 15;
    const signals = [];

    class Signal {
      constructor() {
        this.reset();
      }

      reset() {
        // Snap to grid
        this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;

        // Random cardinal direction
        const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
        this.dir = dirs[Math.floor(Math.random() * dirs.length)];

        this.speed = 2; // Pixels per frame
        this.life = Math.random() * 100 + 100; // Frames to live
        this.history = []; // For trail effect
        this.historyMaxLength = 20;
      }

      update() {
        this.life--;

        // Update history
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.historyMaxLength) {
          this.history.shift();
        }

        // Move
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;

        // Change direction randomly or at grid intersections
        if (this.x % gridSize === 0 && this.y % gridSize === 0) {
          if (Math.random() < 0.3) {
            const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
            // Don't reverse immediately
            this.dir = dirs[Math.floor(Math.random() * dirs.length)];
          }
        }

        // Respawn if dead or out of bounds
        if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw(ctx) {
        if (this.history.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.strokeStyle = `rgba(239, 68, 68, ${this.life / 100})`; // Red-500 fading
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw head
        ctx.fillStyle = '#ef4444'; // Red-500
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize signals
    for (let i = 0; i < signalCount; i++) {
      signals.push(new Signal());
    }

    // Static Circuit Lines (Background Texture)
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
      // Clear with trail for motion blur feeling or full clear
      ctx.clearRect(0, 0, width, height);

      time += 0.05;

      // Draw Static Lines (Breathing effect)
      const baseOpacity = isDarkMode ? 0.1 : 0.05;
      const breathing = (Math.sin(time) + 1) * 0.05; // Oscillate opacity
      ctx.strokeStyle = isDarkMode
        ? `rgba(255, 255, 255, ${baseOpacity + breathing})`
        : `rgba(0, 0, 0, ${baseOpacity + breathing})`;
      ctx.lineWidth = 1;

      staticLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        if (line.vertical) {
          ctx.lineTo(line.x, line.y + line.length);
        } else {
          ctx.lineTo(line.x + line.length, line.y);
        }
        ctx.stroke();

        // Add little nodes at ends
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.arc(line.x, line.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and Draw Signals
      signals.forEach(signal => {
        signal.update();
        signal.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  // Projects Data - Updated from Resume
  const initialProjects = [
    {
      title: "Smart Buddy (IoT)",
      description: "Interactive toy car that follows humans, avoids obstacles using computer vision, and engages in voice conversations using the Gemini API and Raspberry Pi 5.",
      tags: ['Raspberry Pi', 'Python', 'Gemini API', 'OpenCV']
    },
    {
      title: "Pokedex App",
      description: "Flutter-based app featuring a catalog of 100 Pokémon with a built-in TensorFlow Lite image classifier identifying 50 Pokémon with 60% accuracy.",
      tags: ['Flutter', 'TensorFlow Lite', 'Dart', 'Mobile AI']
    },
    {
      title: "AIDA Web Platform",
      description: "Responsive web platform for the Artificial Intelligence and Data Science Association, enabling easy access to member information and events.",
      tags: ['ReactJS', 'Flask', 'HTML/CSS', 'Full Stack']
    },
    {
      title: "QR Event Manager",
      description: "Workshop management software capable of generating and scanning QR codes for participant tracking and data logging.",
      tags: ['Python', 'OpenCV', 'Automation', 'Management']
    }
  ];

  const moreProjects = [
    {
      title: "IdeaIgnite Site",
      description: "Web platform for an idea pitching competition, integrating participant registration and a real-time event timer.",
      tags: ['ReactJS', 'Web Dev', 'Event Tech']
    },
    {
      title: "Railizard Site",
      description: "Hackathon website presenting a robotics-based solution for automating railway track cleaning to promote efficiency.",
      tags: ['HTML', 'CSS', 'ReactJS', 'Hackathon']
    }
  ];

  const visibleProjects = showAllProjects ? [...initialProjects, ...moreProjects] : initialProjects;

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

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-red-500 selection:text-white overflow-x-hidden ${theme.bg} ${theme.text}`}>

      {/* Circuitry Background */}
      <CircuitBackground isDarkMode={isDarkMode} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? `${theme.navBg} backdrop-blur-sm ${theme.border} py-4` : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer" onClick={() => scrollTo('home')}>
            <div className={`w-8 h-8 ${theme.invertedBg} ${theme.invertedText} flex items-center justify-center font-mono rounded-sm group-hover:bg-red-600 group-hover:text-white transition-all`}>
              _
            </div>
            <span className="font-mono">TEJAS.DEV</span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm font-medium tracking-wide transition-all hover:text-red-500 relative group ${activeSection === link.id ? 'text-red-500' : theme.textSub}`}
                >
                  {link.name.toUpperCase()}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full ${activeSection === link.id ? 'w-full' : ''}`}></span>
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
                <div className="text-3xl font-bold mb-1">6+</div>
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
              />
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <SkillCard
                icon={<Smartphone className="w-8 h-8 text-purple-500" />}
                title="App Development"
                skills={['Flutter', 'ReactJS', 'Figma', 'HTML', 'CSS']}
                theme={theme}
                isDarkMode={isDarkMode}
              />
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <SkillCard
                icon={<Database className="w-8 h-8 text-green-500" />}
                title="Backend & DB"
                skills={['Firebase', 'Supabase', 'MySQL', 'Flask', 'SQL']}
                theme={theme}
                isDarkMode={isDarkMode}
              />
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <SkillCard
                icon={<Wifi className="w-8 h-8 text-orange-500" />}
                title="IoT & Hardware"
                skills={['Raspberry Pi', 'Embedded Systems', 'Git', 'Sensors']}
                theme={theme}
                isDarkMode={isDarkMode}
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-24 px-6 border-t ${theme.border} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className={`text-sm font-mono ${theme.textSub} mb-2`}>04. PORTFOLIO</h2>
            <h3 className="text-4xl font-bold mb-16">FEATURED PROJECTS</h3>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {visibleProjects.map((project, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  theme={theme}
                />
              </RevealOnScroll>
            ))}
          </div>

          {/* View More Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className={`flex flex-col items-center gap-2 px-8 py-4 ${theme.text} font-bold opacity-50 hover:opacity-100 transition-all rounded-sm group`}
            >
              <span className="tracking-widest text-sm">{showAllProjects ? 'VIEW LESS' : 'VIEW MORE'}</span>
              {showAllProjects ? (
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              )}
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

const SkillCard = ({ icon, title, skills, theme, isDarkMode }) => (
  // Reverted hover accent to Red, Fixed dark mode tag background logic
  <div className={`group p-6 border ${theme.border} ${theme.cardBg} hover:border-red-500 transition-all duration-300 rounded-sm relative overflow-hidden backdrop-blur-md bg-opacity-80`}>
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

const ProjectCard = ({ title, description, tags, theme }) => (
  <div className={`group relative border ${theme.border} ${theme.cardBg} p-8 hover:border-red-500 transition-all duration-300 backdrop-blur-md bg-opacity-90`}>
    <div className="relative z-10">
      <h4 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">{title}</h4>
      <p className={`${theme.textSub} mb-6 leading-relaxed`}>
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
