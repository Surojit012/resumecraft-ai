import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for getting started with your job search.',
    features: [
      { text: '3 Professional Templates', included: true },
      { text: 'Basic AI Writing Assistance', included: true },
      { text: 'PDF Export', included: true },
      { text: 'Real-time Preview', included: true },
      { text: 'Premium Templates', included: false },
      { text: 'Unlimited AI Generation', included: false },
      { text: 'Priority Support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    price: '9',
    description: 'Everything you need for a successful career move.',
    features: [
      { text: 'All Professional Templates', included: true },
      { text: 'Unlimited AI Writing Assistance', included: true },
      { text: 'High-Quality PDF Export', included: true },
      { text: 'Real-time Preview', included: true },
      { text: 'Custom Color Themes', included: true },
      { text: 'Priority Support', included: true },
      { text: 'No Watermark', included: true },
    ],
    cta: 'Get Premium',
    popular: true,
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Simple, <span className="text-indigo-600">transparent</span> pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            Choose the plan that's right for your career goals.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl bg-white border ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-sm font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-500 ml-2">/month</span>
                </div>
              </div>

              <button className={`w-full py-3 rounded-xl font-bold transition-all mb-8 ${plan.popular
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}>
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check size={18} className="text-emerald-500 shrink-0" />
                    ) : (
                      <X size={18} className="text-slate-300 shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="text-center">
          <p className="text-slate-500">
            Have questions? <button className="text-indigo-600 font-bold hover:underline">Check our FAQ</button> or <button className="text-indigo-600 font-bold hover:underline">Contact Support</button>
          </p>
        </div>
      </div>
    </div>
  );
}
