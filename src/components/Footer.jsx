import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h1 className="footer-title">Job Portal</h1> {/* H1 tag for JobSearch */}
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} color="white" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter size={24} color="white" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin size={24} color="white" />
          </a>
        </div>
        <div className="footer-copy">
          <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
