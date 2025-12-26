import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ isDarkMode, setIsDarkMode, theme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => { setScrolled(window.scrollY > 50); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' },
    ];

    const scrollTo = (id) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(id);
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(id);
            } else {
                // If element not found (e.g. top of page), just scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
            }
        }
    };

    return (
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
                                className={`text-sm font-medium tracking-wide transition-all hover:text-red-500 relative group ${activeSection === link.id && location.pathname === '/' ? 'text-red-500' : theme.textSub}`}
                            >
                                {link.name.toUpperCase()}
                                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full ${activeSection === link.id && location.pathname === '/' ? 'w-full' : ''}`}></span>
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
    );
};

export default Navbar;
