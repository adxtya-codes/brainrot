
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">brainrot</h3>
            <p className="text-sm text-muted-foreground">
              Designed for doomscrollers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/" className="block hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="block hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="block hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-medium">Customer Care</h4>
            <div className="space-y-2 text-sm">
              <Link to="/size-guide" className="block hover:text-primary transition-colors">
                Size Guide
              </Link>
              <Link to="/shipping-return" className="block hover:text-primary transition-colors">
                Shipping & Returns
              </Link>
              <Link to="/faq" className="block hover:text-primary transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 brainrot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
