import React from 'react';

const ShippingReturnPage = () => (
  <div className="container mx-auto px-4 py-16 max-w-3xl">
    <h1 className="text-3xl font-bold mb-8">Shipping & Exchange Policy</h1>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Shipping & Tracking</h2>
      <p className="mb-2"><strong>When will you ship my order?</strong></p>
      <p className="mb-4">All the orders, once shipped, are typically delivered in 1-4 working days. Delivery time may vary depending upon the shipping address.</p>
      <p className="mb-2"><strong>How can I track my order?</strong></p>
      <p className="mb-4">You can track your order once it has been shipped from our warehouse. An email and SMS will be sent with a link.</p>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Exchanges</h2>
      <p className="mb-2"><strong>What is your return policy?</strong></p>
      <p className="mb-4">There is no Return Policy; Client can Exchange any product.</p>
      <p className="mb-2"><strong>Rate for Exchange:</strong></p>
      <ul className="list-disc list-inside mb-4">
        <li>₹100 for 1 product</li>
        <li>₹120 for 2 products</li>
        <li>₹140 for 3 and more products</li>
      </ul>
      <p className="mb-2"><strong>How do I initiate an Exchange?</strong></p>
      <p className="mb-4">Please mail us at <a href="mailto:brainrotclothing01@gmail.com" className="underline hover:opacity-80">brainrotclothing01@gmail.com</a> to initiate an exchange. Please mention the following information clearly in the mail:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Order Number / Registered E-Mail Id</li>
        <li>Exchange Requirement</li>
        <li>Call on our customer support numbers provided</li>
      </ul>
      <p className="mb-2"><strong>Do you arrange for reverse pickups?</strong></p>
      <p>We have a reverse pick up facility for most pin codes. In case we don't have the reverse pickup available at your location you would have to send the product back to us for exchange at the below-mentioned address.</p>
    </section>
  </div>
);

export default ShippingReturnPage;
