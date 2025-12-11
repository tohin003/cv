import MathText from '../components/MathText';

export default function MasterPYQView() {
    const [searchTerm, setSearchTerm] = useState('');

    const sections = [
        { title: 'Short Answers', marks: 4, type: 'Short', color: 'text-blue-400', border: 'border-blue-500/30' },
        { title: 'Medium Answers', marks: 6, type: 'Medium', color: 'text-purple-400', border: 'border-purple-500/30' },
        { title: 'Long Answers', marks: 10, type: 'Long', color: 'text-orange-400', border: 'border-orange-500/30' },
        { title: 'Very Long Answers', marks: 12, type: 'Very Long', color: 'text-red-400', border: 'border-red-500/30' },
    ];

    const filteredQuestions = useMemo(() => {
        if (!studyData.master_pyqs) return [];
        return studyData.master_pyqs.filter(q =>
            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const getQuestionsByMarks = (marks) => filteredQuestions.filter(q => q.marks === marks);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 pb-12"
        >
            <div className="text-center py-8">
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Master Question Bank
                </h1>
                <div className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Consolidated collection of unique questions from 2023-2025 papers.
                    Start here for complete exam coverage.
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search keywords (e.g., 'Hough', 'DFT')..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 px-4 py-3 pl-12 rounded-lg focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                        <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                    </div>
                </div>
            </div>

            <div className="space-y-12">
                {sections.map((section) => {
                    const questions = getQuestionsByMarks(section.marks);
                    if (questions.length === 0) return null;

                    return (
                        <div key={section.title} className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                <BookOpen size={24} className={section.color} />
                                <h2 className={`text-xl font-bold ${section.color}`}>{section.title} ({section.marks} Marks)</h2>
                                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">
                                    {questions.length} Questions
                                </span>
                            </div>

                            <div className="grid gap-6">
                                {questions.map((q) => (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        key={q.id}
                                        className={`bg-surface border border-slate-700 rounded-xl p-6 relative overflow-hidden active:scale-[0.99] transition-transform ${section.border}`}
                                    >
                                        <div className="flex justify-between items-start mb-4 gap-4">
                                            <h3 className="text-lg font-medium text-white">{q.question}</h3>
                                        </div>

                                        {q.diagram && (
                                            <div className="mb-4">
                                                <MermaidDiagram code={q.diagram} />
                                            </div>
                                        )}

                                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                                            <div className="flex items-start gap-3">
                                                <PenTool size={18} className="text-slate-500 mt-1 shrink-0" />
                                                <div className="text-slate-300 text-sm w-full">
                                                    <MathText text={q.answer} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {filteredQuestions.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No questions found matching your search.
                    </div>
                )}
            </div>
        </motion.div>
    );
}
