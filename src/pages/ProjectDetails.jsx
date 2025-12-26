import React, { useEffect } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Code2, Github, Globe, FileText, FolderTree, MonitorPlay, Check, BrainCircuit, Smartphone, Database, Wifi } from 'lucide-react';
import { allProjects } from '../data/projects';
import { getTheme } from '../utils/theme';

const ProjectDetails = () => {
    const { isDarkMode } = useOutletContext();
    const theme = getTheme(isDarkMode);
    const navigate = useNavigate();
    const { title } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [title]);

    const projectTitle = decodeURIComponent(title);
    const selectedProject = allProjects.find(p => p.title === projectTitle);

    if (!selectedProject) {
        return (
            <div className={`min-h-screen pt-32 px-6 ${theme.bg} ${theme.text} flex flex-col items-center`}>
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <button onClick={() => navigate('/projects')} className="text-red-500 hover:underline">Return to Archives</button>
            </div>
        );
    }

    return (
        <section className={`min-h-screen pt-32 pb-24 px-6 ${theme.bg} relative z-20`}>
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-2 mb-8 ${theme.textSub} hover:text-red-500 transition-colors group`}
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    GO BACK
                </button>

                {/* Project Header */}
                <div className={`p-8 border ${theme.border} ${theme.cardBg} mb-8 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 p-4">
                        {(() => {
                            switch (selectedProject.category) {
                                case "AI & ML": return <BrainCircuit size={120} className="text-blue-500" />;
                                case "App Development": return <Smartphone size={120} className="text-purple-500" />;
                                case "Backend & DB": return <Database size={120} className="text-green-500" />;
                                case "IoT & Hardware": return <Wifi size={120} className="text-orange-500" />;
                                default: return <Code2 size={120} className={`${theme.textSub}`} />;
                            }
                        })()}
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
                            <a
                                href={selectedProject.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-bold hover:bg-red-700 transition-colors rounded-sm"
                            >
                                <Github size={18} />
                                VIEW SOURCE
                            </a>
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

                        {/* File Structure Section */}
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
    );
};

export default ProjectDetails;
