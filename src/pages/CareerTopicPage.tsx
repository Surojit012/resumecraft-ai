import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { careerTopics } from '@/data/career';

export default function CareerTopicPage() {
    const { slug } = useParams<{ slug: string }>();
    const topic = careerTopics.find(t => t.slug === slug);

    if (!topic) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-12 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Topic Not Found</h1>
                <p className="text-slate-600 mb-8">The career advice topic you're looking for doesn't exist.</p>
                <Link to="/career-advice" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                    Back to Topics
                </Link>
            </div>
        );
    }

    const Icon = topic.icon;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link to="/career-advice" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                        <ArrowLeft size={20} className="mr-2" /> Back to all topics
                    </Link>
                </motion.div>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200"
                >
                    <div className="bg-slate-900 p-12 md:p-16 text-center text-white relative overflow-hidden">
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-slate-800 blur-3xl opacity-50"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-900 blur-3xl opacity-50"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 bg-white/10 backdrop-blur`}>
                                <Icon size={40} className="text-white" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-6">{topic.title}</h1>
                            <p className="text-lg text-slate-300 max-w-2xl mx-auto">{topic.description}</p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div
                            className="prose prose-lg max-w-none prose-indigo prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600"
                            dangerouslySetInnerHTML={{ __html: topic.content }}
                        />
                    </div>
                </motion.article>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Put this advice into action!</h3>
                    <Link to="/templates" className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                        Create Your Resume Now
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
