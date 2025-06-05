import React from 'react';
import { FaShippingFast, FaExchangeAlt, FaUserAlt, FaCreditCard } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaShippingFast size={32} className="mx-auto mb-2" />,
    title: 'All India Free Shipping',
    desc: 'Heard it right',
  },
  {
    icon: <FaExchangeAlt size={32} className="mx-auto mb-2" />,
    title: 'Return Policy',
    desc: 'We have a great return policy too!',
  },
  {
    icon: <FaUserAlt size={32} className="mx-auto mb-2" />,
    title: 'Best Customer Support',
    desc: 'email us at brainrotclothing01@gmail.com',
  },
  {
    icon: <FaCreditCard size={32} className="mx-auto mb-2" />,
    title: 'Safe and Secure Payments',
    desc: 'Pay Via Cards, UPI and COD',
  },
];

const StoreBenefits = () => {
  return (
    <section className="w-full max-w-screen-xl mx-auto mt-8 mb-8 bg-black text-white">
      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8 p-6">
        {benefits.map((b, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center justify-center ${i === 0 ? 'justify-self-center' : ''}`}
          >
            {React.cloneElement(b.icon, { color: 'white' })}
            <div className="font-semibold text-lg mb-1 text-white">{b.title}</div>
            <div className="text-base text-white/80">{b.desc}</div>
          </div>
        ))}
      </div>
      {/* Mobile swiper */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto no-scrollbar gap-4 snap-x snap-mandatory">
          {benefits.map((b, i) => (
            <div key={i} className="flex-shrink-0 w-72 snap-center p-6 mx-auto flex flex-col items-center text-center bg-black text-white">
              {React.cloneElement(b.icon, { color: 'white' })}
              <div className="font-semibold text-lg mb-1 text-white">{b.title}</div>
              <div className="text-base text-white/80">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreBenefits;
