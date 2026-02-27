import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const templates = [
  {
    id: 'modern',
    name: 'Modern Clean',
    description: 'A clean, professional layout suitable for most industries. Features a clear hierarchy and easy readability.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=500',
    color: 'bg-blue-50',
  },
  {
    id: 'executive',
    name: 'Executive Dark',
    description: 'A sophisticated design with a dark sidebar. Perfect for senior roles and professionals who want to stand out.',
    image: 'https://images.unsplash.com/photo-1616628188859-7a11abb8fcc0?auto=format&fit=crop&q=80&w=500',
    color: 'bg-slate-900',
  },
  {
    id: 'geometric',
    name: 'Geometric Creative',
    description: 'A modern, creative layout with geometric accents and a unique color scheme. Ideal for designers and creatives.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500',
    color: 'bg-amber-50',
  },
  {
    id: 'minimalist',
    name: 'Bold Minimalist',
    description: 'High contrast, bold typography, and plenty of whitespace. A striking choice for modern professionals.',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=500',
    color: 'bg-white',
  },
  {
    id: 'creative',
    name: 'Creative Frame',
    description: 'A distinctive layout with a bold frame and warm background. Great for showcasing personality.',
    image: 'https://images.unsplash.com/photo-1598555989508-4e8a4944927b?auto=format&fit=crop&q=80&w=500',
    color: 'bg-blue-100',
  },
  {
    id: 'professional',
    name: 'Professional Split',
    description: 'A balanced split-screen layout with a strong header and clear section separation.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=500',
    color: 'bg-blue-600',
  },
  {
    id: 'designer',
    name: 'Designer Portfolio',
    description: 'A striking layout with bold typography and lime accents. Perfect for creative professionals.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=500',
    color: 'bg-lime-300',
  },
  {
    id: 'clean',
    name: 'Clean Resume',
    description: 'A modern, clean layout with yellow accents and a clear hierarchy. Great for showcasing professionalism.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=500',
    color: 'bg-yellow-100',
  },
  {
    id: 'graphic',
    name: 'Graphic Modern',
    description: 'A bold two-column layout with a unique curved sidebar and yellow accents. Ideal for designers.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500',
    color: 'bg-yellow-400',
  },
  {
    id: 'engineer',
    name: 'Engineer Technical',
    description: 'A structured layout with a strong sidebar and technical focus. Ideal for developers and engineers.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500',
    color: 'bg-slate-300',
  },
  {
    id: 'bw',
    name: 'Black & White Modern',
    description: 'A sleek, monochromatic design with a dark sidebar. Professional and timeless.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500',
    color: 'bg-slate-800',
  },
  {
    id: 'blue-wave',
    name: 'Blue Wave Creative',
    description: 'A creative layout with a distinctive blue header curve and timeline-style experience section.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500',
    color: 'bg-blue-600',
  },
  {
    id: 'architect',
    name: 'Architect Minimal',
    description: 'A sophisticated, minimalist design with serif typography and clean lines. Ideal for creative professionals.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500',
    color: 'bg-slate-200',
  },
  {
    id: 'creative-yellow',
    name: 'Creative Yellow',
    description: 'A vibrant and personable design with a unique script header and yellow accents.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500',
    color: 'bg-yellow-400',
  },
  {
    id: 'social-media',
    name: 'Social Media Analyst',
    description: 'A bold, high-contrast design with large typography and vibrant orange accents.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=500',
    color: 'bg-orange-600',
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Template</h1>
          <p className="text-lg text-slate-600">
            Select a professionally designed template to get started. All templates are ATS-friendly and fully customizable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200"
            >
              <div className={`h-64 ${template.color} relative overflow-hidden`}>
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    to={`/editor/${template.id}`}
                    className="px-6 py-3 bg-white text-slate-900 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                  >
                    Use Template
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{template.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-600">Free</span>
                  <span className="text-xs text-slate-400">Last updated 2 days ago</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
