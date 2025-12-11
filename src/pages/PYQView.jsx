import { motion } from 'framer-motion';
import { FileCheck, PenTool } from 'lucide-react';
import studyData from '../data/study_data.json';
import MermaidDiagram from '../components/MermaidDiagram';
import MathText from '../components/MathText';

export default function PYQView() {
    // Flatten all PYQs
    // Flatten all PYQs and Sort them naturally (q1, q2, q10 should be 1, 2, 10)
    const allPyqs = studyData.units.flatMap(u =>
        u.pyqs ? u.pyqs.map(q => ({ ...q, unitTitle: u.title })) : []
    ).sort((a, b) => {
        // Extract number from id (e.g., "q1" -> 1, "q17a" -> 17)
        const numA = parseInt(a.id.replace(/\D/g, ''));
        const numB = parseInt(b.id.replace(/\D/g, ''));

        if (numA !== numB) return numA - numB;

        // If numbers are same, sort by the suffix (a, b)
        return a.id.localeCompare(b.id);
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="text-center py-8">
                <h1 className="text-3xl font-bold mb-4">Solved Previous Year Questions</h1>
                <p className="text-slate-400">Master the exam by practicing these high-yield questions.</p>
            </div>

            <div className="grid gap-6">
                {allPyqs.map((q, index) => (
                    <div key={q.id} className="bg-surface border border-slate-700 rounded-xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FileCheck size={120} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4 gap-4">
                                <div className="flex-1">
                                    <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">
                                        {q.marks} Marks • {q.type} Answer
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">
                                        <span className="text-emerald-400 font-bold mr-2">{index + 1}.</span>
                                        {q.question}
                                    </h3>
                                </div>
                            </div>

                            {q.diagram && (
                                <MermaidDiagram code={q.diagram} />
                            )}

                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                                <div className="flex items-start gap-3">
                                    <PenTool size={18} className="text-slate-500 mt-1 shrink-0" />
                                    <div className="text-slate-300 w-full text-sm">
                                        <span className="font-semibold text-emerald-400 block mb-1">Solution:</span>
                                        <MathText text={q.answer} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-xs text-slate-500 text-right">
                                From: {q.unitTitle}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
