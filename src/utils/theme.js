export const getTheme = (isDarkMode) => ({
    bg: isDarkMode ? 'bg-black' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-neutral-900',
    textSub: isDarkMode ? 'text-neutral-400' : 'text-neutral-600',
    border: isDarkMode ? 'border-neutral-800' : 'border-neutral-200',
    navBg: isDarkMode ? 'bg-black/90' : 'bg-white/90',
    cardBg: isDarkMode ? 'bg-neutral-950' : 'bg-white',
    cardHover: isDarkMode ? 'hover:bg-neutral-900' : 'hover:bg-gray-50',
    invertedText: isDarkMode ? 'text-black' : 'text-white',
    invertedBg: isDarkMode ? 'bg-white' : 'bg-black',
});
