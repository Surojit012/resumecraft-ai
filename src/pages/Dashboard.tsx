import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Trash2, ExternalLink, Loader2, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePrivy } from '@privy-io/react-auth';

interface Resume {
  id: string;
  data: any;
  updated_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { getAccessToken } = usePrivy();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchResumes = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await fetch('/api/resumes', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setResumes(data);
        }
      } catch (error) {
        console.error('Failed to fetch resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [user, navigate, getAccessToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">My Resumes</h1>
            <p className="text-slate-500">Manage and edit your professional resumes.</p>
          </div>
          <Link 
            to="/templates"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <Plus size={20} />
            Create New
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
              <FileText size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No resumes yet</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              You haven't created any resumes yet. Start by choosing a template and let our AI help you build your professional future.
            </p>
            <Link 
              to="/templates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
            >
              Choose a Template
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
              >
                <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent z-0" />
                  <FileText size={64} className="text-slate-300 relative z-10" />
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
                    <Link 
                      to={`/editor/${resume.data.templateId || 'modern'}?id=${resume.id}`}
                      className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform"
                      title="Edit"
                    >
                      <ExternalLink size={20} />
                    </Link>
                    <button 
                      className="p-3 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">
                    {resume.data.personalInfo?.fullName || 'Untitled Resume'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={14} />
                    <span>Last updated: {new Date(resume.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
