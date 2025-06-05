
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About brainrot</h1>
          <p className="text-xl text-muted-foreground">
            Designed for doomscrollers.
          </p>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
            We started brainrot because we were tired of boring clothes.

Everything felt the same- loud logos, weird fits, or designs that tried too hard. So we decided to do something different: make clean, oversized T-shirts that actually look good, feel good, and make sense for everyday wear.

We’re a small team that cares a lot about design, quality, and not overcomplicating things. Our tees are made to be comfy, easy to wear, and just a little bit bold, without shouting in your face.
The name brainrot? It’s a joke... sort of. We’re online way too much, like most people, and this brand is our way of turning that brain mush into something creative.

Good shirts. Chill vibe. No cringe.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
            To make oversized T-shirts that don’t suck.<br>
</br>At brainrot, we care about good design, proper fits, and not looking like everyone else. We're here to prove that simple can still hit hard, and yes, comfort matters too.


            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Quality & Ethics</h2>
            <p className="text-muted-foreground leading-relaxed">
              All our pieces are made from premium organic cotton and produced ethically. 
              We believe in sustainable fashion that doesn't compromise on style or comfort. 
              Because even doomscrollers deserve quality basics.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Join the Community</h2>
            <p className="text-muted-foreground leading-relaxed">
              Connect with fellow digital nomads, meme enthusiasts, and existential explorers. 
              Follow us on all platforms for exclusive drops, behind-the-scenes content, 
              and a healthy dose of organized chaos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
