import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is the T-shirt quality?',
    answer: 'Most of our tees are made from comfy 210 GSM cotton. soft, oversized, and built to last. If GSM is different, we’ll let you know on the product page.',
  },
  {
    question: 'How’s the print?',
    answer: 'We use high-quality DTF printing crisp, durable, no cracking. And yes, puff print is coming soon 🔥',
  },
  {
    question: 'How do I wash my T-shirt?',
    answer: 'Cold wash inside out. Avoid bleach and don’t iron directly on the print — unless you’re into crackled vintage vibes (we won’t judge).',
  },
  {
    question: 'How long will my order take?',
    answer: 'Delivery usually takes 2–5 days depending on where you live.',
  },
  {
    question: 'Can I cancel or return my order?',
    answer: (
      <>
        Only if you cancel the order within 10 hours of order placement.  
        For more details, check our{' '}
        <a href="/shipping-return" className="underline hover:opacity-80" target="_blank">
          Shipping & Returns
        </a>{' '}
        page.
      </>
    ),
  },
  {
    question: 'Do you ship everywhere in India?',
    answer: 'Yep, PAN India shipping. Even that weird small town you never thought anyone shipped to? Yes.',
  },
  {
    question: 'Do you offer COD?',
    answer: 'Yes, and also, secure online payments only via Razorpay.',
  },
  {
    question: 'Why is the brand called brainrot?',
    answer: 'Because we design for the ones chilling, vibing through chaos at 2am. Dark, oversized, digital-core energy. You get it.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <p className="text-muted-foreground mb-6">
        We're here to help! Please check our most common questions below. For anything else, contact us at{' '}
        <a href="mailto:brainrotclothing01@gmail.com" className="underline hover:opacity-80">
          brainrotclothing01@gmail.com
        </a>.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 cursor-pointer transition-all"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-base">{faq.question}</h3>
              <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <p className="text-sm text-muted-foreground mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
