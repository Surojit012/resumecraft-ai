import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Layout, 
  Zap, 
  FileText, 
  CheckCircle2, 
  Globe, 
  Shield, 
  Download 
} from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Writing',
    description: 'Our advanced AI helps you craft the perfect professional summary and job descriptions in seconds.',
    icon: Sparkles,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Professional Templates',
    description: 'Choose from a variety of designer-made, ATS-friendly templates tailored for every industry.',
    icon: Layout,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Real-Time Preview',
    description: 'See your changes instantly as you type. No more guessing how your resume will look.',
    icon: Zap,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    title: 'ATS-Friendly',
    description: 'Our templates are specifically designed to pass through Applicant Tracking Systems with ease.',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    title: 'One-Click Export',
    description: 'Download your resume as a high-quality PDF, ready to be sent to recruiters.',
    icon: Download,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Multi-Language Support',
    description: 'Create resumes in multiple languages to apply for global opportunities.',
    icon: Globe,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Everything you need to build a <span className="text-indigo-600">winning resume</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            Powerful features designed to help you land your dream job faster.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all group"
            >
              <div className={`w-12 h-12 ${feature.bgColor} ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-indigo-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to build your professional resume?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have used our builder to advance their careers.
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg">
            Get Started for Free
          </button>
        </motion.div>
      </div>
    </div>
  );
}
