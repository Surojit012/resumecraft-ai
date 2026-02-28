import { motion } from 'framer-motion';
import { BookOpen, Target, Users, TrendingUp } from 'lucide-react';

const topics = [
    {
        title: 'Interview Preparation',
        description: 'Master the art of interviewing with our comprehensive guides and mock questions.',
        icon: Users,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        title: 'Career Advancement',
        description: 'Strategies for getting promoted, asking for raises, and managing your career trajectory.',
        icon: TrendingUp,
        color: 'bg-emerald-100 text-emerald-600'
    },
    {
        title: 'Resume & Cover Letter Tips',
        description: 'Learn how to craft compelling documents that showcase your unique value.',
        icon: BookOpen,
        color: 'bg-purple-100 text-purple-600'
    },
    {
        title: 'Job Search Strategies',
        description: 'Navigate the modern job market with effective networking and application tactics.',
        icon: Target,
        color: 'bg-orange-100 text-orange-600'
    }
];

export default function CareerAdvicePage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-16 text-center text-white mb-16 relative overflow-hidden">
                    {/* Abstract Background Shapes */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500 blur-3xl opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-700 blur-3xl opacity-50"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert Career Advice</h1>
                        <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
                            Actionable insights and expert guidance to help you navigate every stage of your professional journey.
                        </p>
                        <div className="max-w-xl mx-auto flex gap-4">
                            <input
                                type="text"
                                placeholder="Search topics (e.g. 'interview tips')"
                                className="flex-grow px-6 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-400"
                            />
                            <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shrink-0">
                                Search
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Explore by Topic</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {topics.map((topic, index) => {
                            const Icon = topic.icon;
                            return (
                                <motion.a
                                    href="#"
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                    className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group block"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${topic.color}`}>
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </motion.a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
