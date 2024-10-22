import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p className="footer__content">
                    © {new Date().getFullYear()} CV Manager. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;