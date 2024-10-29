import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                {/* Logo Section */}
                <div className="footer__logo">
                    <h2>CV Manager</h2>
                </div>

                {/* Navigation Links */}
                <div className="footer__nav">
                    <a href="#" className="footer__link">Home</a>
                    <a href="#" className="footer__link">About Us</a>
                    <a href="#" className="footer__link">Contact</a>
                    <a href="#" className="footer__link">Privacy Policy</a>
                </div>

                {/* Social Links */}
                <div className="footer__social">
                    <a href="https://twitter.com" className="footer__social-link" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter"></i> Twitter
                    </a>
                    <a href="https://linkedin.com" className="footer__social-link" target="_blank" rel="noreferrer">
                        <i className="fa fa-linkedin"></i> LinkedIn
                    </a>
                    <a href="https://github.com" className="footer__social-link" target="_blank" rel="noreferrer">
                        <i className="fa fa-github"></i> GitHub
                    </a>
                </div>

                {/* Copyright */}
                <p className="footer__content">
                    © {new Date().getFullYear()} CV Manager. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
