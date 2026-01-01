import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ChevronDown, Download, Mail, ExternalLink, Github, Linkedin, BrainCircuit, Smartphone, Database, Wifi } from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';
import SkillCard from '../components/SkillCard';
import ProjectCard from '../components/ProjectCard';
import SocialButton from '../components/SocialButton';
import { allProjects } from '../data/projects';
import { getTheme } from '../utils/theme';

const Home = () => {
    const { isDarkMode } = useOutletContext();
    const theme = getTheme(isDarkMode);
    const navigate = useNavigate();

    const featuredProjects = allProjects.filter(p => p.featured);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };

    const openProjectDetails = (project) => {
        // Navigate to project details page. 
        // Using title as slug or finding a unique way. 
        // For now, let's pass state or use index/title. 
        // Ideally update allProjects to have IDs.
        // I'll use title for now, encoded.
        navigate(`/project/${encodeURIComponent(project.title)}`);
    };

    return (
        <>
            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20">
                <div className="max-w-4xl w-full relative z-10">
                    <RevealOnScroll>
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
                            A motivated Al Engineer and Full-Stack Developer with experience in building interactive applications and implementing machine learning models. Passionate about solving real-world problems through thoughtful solutions at the intersection of data intelligence and user experience, with a strong commitment to continuous learning and leveraging technology to empower people, businesses, and the future of tech.
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
                            onClick={() => navigate('/projects')}
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
        </>
    );
};

export default Home;
