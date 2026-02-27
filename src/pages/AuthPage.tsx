import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-12 flex flex-col items-center text-center"
      >
        {/* Back to Home */}
        <Link 
          to="/" 
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors z-20 font-medium text-sm"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Welcome!
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Sign in to ResumeCraft AI to save your progress and access your resumes from anywhere.
          </p>
        </div>

        <button
          onClick={() => login()}
          disabled={loading}
          className="w-full py-5 bg-black text-white rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-70 flex items-center justify-center gap-3 text-lg"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            'Sign In / Sign Up'
          )}
        </button>
      </motion.div>
    </div>
  );
}
