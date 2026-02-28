import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        title: 'How to Write a Resume That Stands Out in 2026',
        excerpt: 'Learn the latest techniques and formatting tricks to make sure your resume passes the ATS and catches the recruiter\'s eye.',
        category: 'Resume Writing',
        readTime: '5 min read',
        date: 'March 1, 2026',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'The Ultimate Guide to Remote Job Hunting',
        excerpt: 'Discover the best platforms, strategies, and interview tips for landing your dream remote position.',
        category: 'Job Search',
        readTime: '8 min read',
        date: 'February 25, 2026',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: '5 Common AI Resume Builder Mistakes to Avoid',
        excerpt: 'Make sure you are getting the most out of our AI tools by avoiding these common pitfalls when generating your content.',
        category: 'Platform Tips',
        readTime: '4 min read',
        date: 'February 15, 2026',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Negotiating Your Salary: A Step-by-Step Guide',
        excerpt: 'Don\'t leave money on the table. Learn how to confidently negotiate your starting salary and benefits package.',
        category: 'Career Advice',
        readTime: '6 min read',
        date: 'February 10, 2026',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
                    >
                        The BuildMyResume <span className="text-indigo-600">Blog</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600"
                    >
                        Insights, strategies, and tips to help you land your dream job.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:shadow-indigo-100 transition-all group flex flex-col"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                                    {post.category}
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {post.readTime}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-slate-600 mb-6 flex-grow">
                                    {post.excerpt}
                                </p>

                                <a href="#" className="inline-flex items-center font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                                    Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="text-center">
                    <button className="px-8 py-4 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors">
                        Load More Posts
                    </button>
                </div>
            </div>
        </div>
    );
}
