import React, { useEffect } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Zap, Layers, Github } from 'lucide-react';
import { allProjects } from '../data/projects';
import { getTheme } from '../utils/theme';

const CategoryProjects = () => {
    const { isDarkMode } = useOutletContext();
    const theme = getTheme(isDarkMode);
    const navigate = useNavigate();
    const { category } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredProjects = allProjects.filter(p => p.category === category);

    const openProjectDetails = (project) => {
        navigate(`/project/${encodeURIComponent(project.title)}`);
    };

    return (
        <section className={`min-h-screen pt-32 pb-24 px-6 ${theme.bg}`}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className={`flex items-center gap-2 mb-6 ${theme.textSub} hover:text-red-500 transition-colors group`}
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        GO BACK
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">{category}</h2>
                        <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-mono rounded">
                            {filteredProjects.length} PROJECTS
                        </span>
                    </div>
                    <p className={`text-lg ${theme.textSub}`}>Curated projects specialized in {category}.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            onClick={() => openProjectDetails(project)}
                            className={`p-6 border ${theme.border} ${theme.cardBg} hover:border-red-500 transition-all duration-300 group cursor-pointer`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-full border ${theme.border} ${theme.textSub}`}>
                                    {project.featured ? <Zap size={20} className="text-yellow-500" /> : <Layers size={20} />}
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
    );
};

export default CategoryProjects;
