import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { helpCategories } from '@/data/help';

export default function HelpCategoryPage() {
    const { slug } = useParams<{ slug: string }>();
    const category = helpCategories.find(c => c.slug === slug);

    if (!category) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-12 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Category Not Found</h1>
                <p className="text-slate-600 mb-8">The help category you're looking for doesn't exist.</p>
                <Link to="/help-center" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                    Back to Help Center
                </Link>
            </div>
        );
    }

    const Icon = category.icon;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link to="/help-center" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                        <ArrowLeft size={20} className="mr-2" /> Back to Help Center
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
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 bg-indigo-600/30 backdrop-blur text-white border border-indigo-500/30`}>
                                <Icon size={40} className="text-white" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">{category.title}</h1>
                            <p className="text-lg text-slate-300 max-w-2xl mx-auto">{category.desc}</p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div
                            className="prose prose-lg max-w-none prose-indigo prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900"
                            dangerouslySetInnerHTML={{ __html: category.content }}
                        />
                    </div>
                </motion.article>

                <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Still need help?</h3>
                        <p className="text-slate-600 max-w-md">
                            If you couldn't find the answer you were looking for, our support team is ready to assist you.
                        </p>
                    </div>

                    <div className="flex shrink-0 w-full md:w-auto">
                        <Link to="/support" className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-center">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
