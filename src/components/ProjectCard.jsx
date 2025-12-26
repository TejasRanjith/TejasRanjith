import React from 'react';

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

export default ProjectCard;
