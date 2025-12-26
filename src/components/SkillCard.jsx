import React from 'react';

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

export default SkillCard;
