import { motion } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '@/data/blog';

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 pb-12 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
                <p className="text-slate-600 mb-8">The article you're looking for doesn't exist.</p>
                <Link to="/blog" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link to="/blog" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                        <ArrowLeft size={20} className="mr-2" /> Back to all articles
                    </Link>
                </motion.div>

                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200"
                >
                    <div className="h-[400px] w-full relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-indigo-700 text-sm font-bold px-4 py-2 rounded-full">
                            {post.category}
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-6 text-slate-500 mb-8 pb-8 border-b border-slate-100">
                            <span className="font-medium text-slate-700">{post.date}</span>
                            <span className="flex items-center gap-2 font-medium">
                                <Clock size={16} />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div
                            className="prose prose-lg max-w-none prose-indigo prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </motion.article>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to build your resume?</h3>
                    <Link to="/templates" className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                        Get Started for Free
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
