import React from 'react';

const SocialButton = ({ icon, label, isDarkMode }) => (
    <button className={`w-14 h-14 border ${isDarkMode ? 'border-neutral-700 hover:border-red-500 hover:bg-red-600' : 'border-white/30 text-white hover:bg-white hover:text-red-600'} flex items-center justify-center rounded-full transition-all shadow-lg`} aria-label={label}>
        {icon}
    </button>
);

export default SocialButton;
