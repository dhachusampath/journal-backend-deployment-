import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="ledger-footer">
      <div className="ledger-footer-top">
        <div className="ledger-footer-brand">
          <span className="ledger-footer-logo">The Daily Ledger</span>
          <p>
            Independent reporting, published daily. Fact-checked stories and
            in-depth analysis you can trust.
          </p>
        </div>

        <div className="ledger-footer-col">
          <span className="ledger-footer-heading">Company</span>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/career">Careers</Link>
          <Link to="/about#team">Our Newsroom</Link>
        </div>

        <div className="ledger-footer-col">
          <span className="ledger-footer-heading">Follow</span>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            Twitter — @dailyledger
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram — @dailyledger
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn — The Daily Ledger
          </a>
        </div>
      </div>

      <div className="ledger-footer-rule"></div>

      <div className="ledger-footer-bottom">
        <span>© {year} The Daily Ledger. All rights reserved.</span>
        <div className="ledger-footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <span className="ledger-footer-dot">•</span>
          <Link to="/terms">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
