import React from 'react';
import Navbar from './Navbar';
import CircuitBackground from './CircuitBackground';

const Layout = ({ children, isDarkMode, setIsDarkMode }) => {
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

    const scrollbarStyles = `
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    `;

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-red-500 selection:text-white overflow-x-hidden ${theme.bg} ${theme.text}`}>
            <style>{scrollbarStyles}</style>

            {/* Circuitry Background */}
            <CircuitBackground isDarkMode={isDarkMode} />

            {/* Navigation */}
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} theme={theme} />

            {children}
        </div>
    );
};

export default Layout;
