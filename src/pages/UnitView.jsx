import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, BookOpen, ChevronDown, ChevronUp, Star } from 'lucide-react';
import studyData from '../data/study_data.json';
import MermaidDiagram from '../components/MermaidDiagram';

export default function UnitView() {
    const { id } = useParams();
    const unit = studyData.units.find(u => u.id === parseInt(id));
    const [expanded, setExpanded] = useState({});

    if (!unit) return <div className="text-center p-10">Unit not found</div>;

    const toggleExpand = (idx) => {
        setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    // Helper to highlight key terms
    const renderContentWithHighlights = (text) => {
        if (!text) return null;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={i} className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{part.slice(2, -2)}</span>;
            }
            return part;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
            </Link>

            <div className="border-b border-slate-700 pb-6">
                <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Unit {unit.id}</div>
                <h1 className="text-3xl font-bold">{unit.title}</h1>
            </div>

            <div className="grid gap-8">
                {unit.topics.map((topic, index) => (
                    <div key={index} className="bg-surface rounded-xl border border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-700/50 bg-slate-800/50">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <BookOpen size={20} className="text-blue-400" />
                                {topic.title}
                            </h2>
                        </div>

                        <div className="p-6">
                            {/* Main Content with "Pop" highlights */}
                            <div className="prose prose-invert max-w-none text-slate-300 text-lg leading-relaxed whitespace-pre-line mb-6">
                                {renderContentWithHighlights(topic.content)}
                            </div>

                            {topic.diagram && (
                                <div className="my-8 scale-110 origin-center bg-slate-900 rounded-xl border border-slate-700 p-4 shadow-2xl">
                                    <MermaidDiagram code={topic.diagram} />
                                    <p className="text-center text-xs text-slate-500 mt-2 uppercase tracking-widest">Visual Concept Map</p>
                                </div>
                            )}

                            {topic.analogy && (
                                <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-l-4 border-blue-500 rounded-r-lg p-5 mb-6">
                                    <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-2 text-lg">
                                        <Lightbulb size={24} className="fill-blue-500/20" /> Analogy to Remember
                                    </h3>
                                    <p className="text-blue-100 italic text-lg">{topic.analogy}</p>
                                </div>
                            )}

                            {/* Extended Explanation Dropdown */}
                            {topic.extended_content && (
                                <div className="mt-6 border-t border-slate-700/50 pt-4">
                                    <button
                                        onClick={() => toggleExpand(index)}
                                        className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-all group border border-slate-700 hover:border-emerald-500/50"
                                    >
                                        <span className="flex items-center gap-2 font-bold text-emerald-400 group-hover:text-emerald-300">
                                            <Star size={18} className="fill-emerald-500/20" />
                                            Deep Dive & Extra Details
                                        </span>
                                        {expanded[index] ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                                    </button>

                                    <AnimatePresence>
                                        {expanded[index] && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 pt-6 text-slate-300 space-y-4 bg-slate-900/30 rounded-b-lg border-x border-b border-slate-800">
                                                    <div className="prose prose-invert max-w-none whitespace-pre-line">
                                                        {renderContentWithHighlights(topic.extended_content)}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {topic.examples && (
                                <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 mt-6">
                                    <h3 className="text-purple-400 font-semibold mb-2">Real World Examples</h3>
                                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                                        {topic.examples.map((ex, i) => (
                                            <li key={i}>{ex}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
