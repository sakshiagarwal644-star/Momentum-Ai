import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Who is MomentumAI for?',
      answer: 'MomentumAI is designed for service-based coaches, consultants, and educators who want to create consistent, high-quality social media content without spending hours on research, scripting, and editing.',
    },
    {
      question: 'Do I need editing skills?',
      answer: 'No editing skills required! MomentumAI provides step-by-step editing instructions and export-ready content. You can follow along easily, even if you\'re new to content creation.',
    },
    {
      question: 'What niches are supported?',
      answer: 'MomentumAI works with all coaching and service-based business niches including life coaching, business coaching, fitness, wellness, marketing, finance, and more.',
    },
    {
      question: 'Is the free trial limited?',
      answer: 'The free trial gives you full access to all features so you can experience the complete MomentumAI workflow. Create content calendars, generate scripts, and export your first batch of content completely free.',
    },
    {
      question: 'Can I export my scripts and ideas?',
      answer: 'Yes! All scripts, content ideas, shooting tips, and editing guides can be exported in multiple formats. Download everything you need and use it however works best for your workflow.',
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#F6F9F8] rounded-2xl shadow-pastel overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-xl font-extrabold text-[#1A1A1A] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-[#A4D8C8] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-[#545454] text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
