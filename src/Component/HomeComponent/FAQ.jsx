import React from 'react';

const faqs = [
  {
    question: "Is People's Matrimony free to use?",
    answer: "Yes, basic features are free. However, to contact profiles directly, a premium membership is required."
  },
  {
    question: "How do I upgrade to premium?",
    answer: "You can upgrade by visiting the Premium section and completing a secure payment via Stripe."
  },
  {
    question: "How is my data protected?",
    answer: "We use modern security practices and encrypted authentication with Firebase to keep your information safe."
  },
  {
    question: "Can I delete my account?",
    answer: "Yes, please contact support or use the profile settings page to request account deletion."
  }
];

const FAQ = () => {
  return (
    <div className="bg-red-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-white text-black rounded-md p-4 cursor-pointer shadow-md">
              <summary className="font-semibold">{faq.question}</summary>
              <p className="mt-2 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
