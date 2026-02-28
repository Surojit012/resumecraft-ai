import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "How does the AI resume builder work?",
    answer: "Our AI uses advanced natural language processing to analyze your provided experience and skills. It then suggests impactful bullet points and summaries tailored to your target industry, ensuring your resume stands out."
  },
  {
    question: "Can I use the resume templates for free?",
    answer: "Yes! We offer a selection of professional templates completely free of charge. You can create, edit, and export your resume using these templates without a premium subscription."
  },
  {
    question: "What formats can I export my resume in?",
    answer: "Currently, you can export your completed resume as a high-quality PDF, which is the industry standard for job applications. We are working on adding more export options in the future."
  },
  {
    question: "How do I upgrade to the Premium plan?",
    answer: "You can upgrade to our Premium plan directly from the Pricing page. Simply click the 'Get Premium' button, and you'll be guided through the secure checkout process."
  },
  {
    question: "Is my personal data secure?",
    answer: "Absolutely. We take your privacy seriously. Your data is encrypted and stored securely. We never sell your personal information to third parties."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can manage and cancel your Premium subscription at any time from your account settings. You will continue to have Premium access until the end of your current billing period."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            Find answers to common questions about our platform and services.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-indigo-600 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="text-slate-400 shrink-0 ml-4" />
                )}
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">Still have questions?</p>
          <a
            href="/support"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
