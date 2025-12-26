import React, { useState, useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, BrainCircuit, Smartphone, Database, Wifi, Code2, Search, ArrowUpDown, Filter } from 'lucide-react';
import { allProjects } from '../data/projects';
import { getTheme } from '../utils/theme';

const AllProjects = () => {
    const { isDarkMode } = useOutletContext();
    const theme = getTheme(isDarkMode);
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("newest"); // 'newest', 'oldest', 'asc', 'desc'

    const categories = ["All", "AI & ML", "App Development", "Backend & DB", "IoT & Hardware"];

    const getCategoryIcon = (category) => {
        switch (category) {
            case "AI & ML": return <BrainCircuit size={20} className="text-blue-500" />;
            case "App Development": return <Smartphone size={20} className="text-purple-500" />;
            case "Backend & DB": return <Database size={20} className="text-green-500" />;
            case "IoT & Hardware": return <Wifi size={20} className="text-orange-500" />;
            default: return <Code2 size={20} className="text-neutral-500" />;
        }
    };

    const filteredProjects = useMemo(() => {
        let result = allProjects.map((p, i) => ({ ...p, originalIndex: i }));

        // Filter by Category
        if (selectedCategory !== "All") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by Search Query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            );
        }

        // Sort
        return result.sort((a, b) => {
            switch (sortOrder) {
                case 'newest': return a.originalIndex - b.originalIndex;
                case 'oldest': return b.originalIndex - a.originalIndex;
                case 'asc': return a.title.localeCompare(b.title);
                case 'desc': return b.title.localeCompare(a.title);
                default: return 0;
            }
        });
    }, [selectedCategory, searchQuery, sortOrder]);

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
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">PROJECT ARCHIVE</h2>
                    <p className={`text-lg ${theme.textSub} mb-8`}>A complete list of my experiments, applications, and contributions.</p>

                    {/* Controls Bar */}
                    <div className={`p-4 border ${theme.border} ${theme.cardBg} rounded-sm flex flex-col md:flex-row gap-4 justify-between items-center sticky top-24 z-30 shadow-sm`}>

                        {/* Search */}
                        <div className="relative w-full md:w-auto flex-1 max-w-md">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textSub}`} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 bg-transparent border ${theme.border} rounded-sm focus:outline-none focus:border-red-500 transition-colors bg-opacity-50 ${theme.text}`}
                            />
                        </div>

                        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
                            {/* Category Filter */}
                            <div className="flex gap-2 items-center">
                                <Filter className={`w-4 h-4 ${theme.textSub}`} />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className={`bg-transparent border ${theme.border} ${theme.text} px-3 py-2 rounded-sm focus:outline-none focus:border-red-500 cursor-pointer`}
                                >
                                    {categories.map(cat => <option key={cat} value={cat} className="bg-black text-white">{cat}</option>)}
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="flex gap-2 items-center">
                                <ArrowUpDown className={`w-4 h-4 ${theme.textSub}`} />
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className={`bg-transparent border ${theme.border} ${theme.text} px-3 py-2 rounded-sm focus:outline-none focus:border-red-500 cursor-pointer`}
                                >
                                    <option value="newest" className="bg-black text-white">Date (Newest)</option>
                                    <option value="oldest" className="bg-black text-white">Date (Oldest)</option>
                                    <option value="asc" className="bg-black text-white">Name (A-Z)</option>
                                    <option value="desc" className="bg-black text-white">Name (Z-A)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <div
                                key={index}
                                onClick={() => openProjectDetails(project)}
                                className={`p-6 border ${theme.border} ${theme.cardBg} hover:border-red-500 transition-all duration-300 group cursor-pointer flex flex-col`}
                            >
                                <div className="flex justify-end items-start mb-4">
                                    <div className={`p-2 rounded-full border ${theme.border} ${theme.textSub} transition-transform group-hover:scale-110 duration-300`}>
                                        {/* Dynamic Icon based on Category */}
                                        {getCategoryIcon(project.category)}
                                    </div>
                                </div>

                                <div className="mb-auto">
                                    <h3 className={`text-xl font-bold mb-2 group-hover:text-red-500 transition-colors`}>{project.title}</h3>
                                    <span className={`text-xs font-mono mb-3 block ${theme.textSub}`}>{project.category}</span>
                                    <p className={`text-sm ${theme.textSub} mb-6 leading-relaxed h-20 overflow-y-auto no-scrollbar`}>
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
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
                        ))
                    ) : (
                        <div className={`col-span-full py-20 text-center ${theme.textSub}`}>
                            <p className="text-xl">No projects found matching your criteria.</p>
                            <button
                                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                                className="mt-4 text-red-500 hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AllProjects;
