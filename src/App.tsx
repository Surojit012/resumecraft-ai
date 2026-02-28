/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from '@/components/Layout';
import LandingPage from '@/pages/LandingPage';
import TemplatesPage from '@/pages/TemplatesPage';
import EditorPage from '@/pages/EditorPage';
import FeaturesPage from '@/pages/FeaturesPage';
import PricingPage from '@/pages/PricingPage';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import PlaceholderPage from '@/pages/PlaceholderPage';
import FAQPage from '@/pages/FAQPage';
import SupportPage from '@/pages/SupportPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import CareerAdvicePage from '@/pages/CareerAdvicePage';
import HelpCenterPage from '@/pages/HelpCenterPage';
import { ChatBot } from '@/components/ChatBot';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/editor/:templateId" element={<EditorPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/career-advice" element={<CareerAdvicePage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

