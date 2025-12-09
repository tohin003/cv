import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Zap } from 'lucide-react';
import studyData from '../data/study_data.json';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Home() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Computer Vision
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Ultra-refined study notes for your last-minute revision.
                    Focusing on high-yield topics and simplified concepts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyData.units.map((unit) => (
                    <motion.div key={unit.id} variants={item}>
                        <Link to={`/unit/${unit.id}`} className="block group">
                            <div className="bg-surface border border-slate-700 rounded-xl p-6 h-full transition-all group-hover:border-primary group-hover:shadow-lg group-hover:shadow-blue-500/10 hover:-translate-y-1">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold px-2 py-1 bg-slate-800 text-slate-300 rounded uppercase tracking-wider">
                                        Unit {unit.id}
                                    </span>
                                    <Zap size={20} className="text-yellow-500" />
                                </div>

                                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {unit.title}
                                </h2>

                                <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                                    {unit.summary}
                                </p>

                                <div className="flex items-center text-primary text-sm font-medium mt-auto">
                                    Start Revision <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
