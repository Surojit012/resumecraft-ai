import { motion } from 'framer-motion';
import { Search, HelpCircle, Shield, FileText, Settings, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { title: "Getting Started", icon: Shield, desc: "Account setup and basics" },
    { title: "Resume Builder", icon: FileText, desc: "Creating and editing resumes" },
    { title: "Managing Account", icon: Settings, desc: "Settings and preferences" },
    { title: "Billing & Plans", icon: CreditCard, desc: "Payments and subscriptions" }
];

export default function HelpCenterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="bg-slate-900 text-white py-20 px-4 mt-[-6rem] mb-12 relative overflow-hidden">
                {/* Cool abstract shapes */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                <div className="container mx-auto max-w-3xl relative z-10 text-center mt-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        How can we help you today?
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative max-w-2xl mx-auto"
                    >
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <Search size={22} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full pl-12 pr-6 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 transition-all text-lg"
                        />
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-slate-900">Browse by Category</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 cursor-pointer transition-all group"
                            >
                                <div className="w-12 h-12 bg-slate-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
                                <p className="text-slate-500 text-sm">{cat.desc}</p>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                            <HelpCircle size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Can't find what you're looking for?</h3>
                            <p className="text-slate-600 max-w-md">
                                Our support team is always ready to help you out. Drop us a message or check our frequently asked questions.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
                        <Link to="/faq" className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl border border-indigo-200 hover:bg-slate-50 transition-colors text-center">
                            View FAQ
                        </Link>
                        <Link to="/support" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-center">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
