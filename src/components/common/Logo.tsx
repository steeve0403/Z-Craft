import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {FileText} from 'lucide-react';

/**
 * Logo component extracted for reusability and separation of concerns.
 * Displays the application logo and links to the homepage.
 */
const Logo: React.FC = memo(() => (
    <Link to="/" className="header__logo">
        <FileText className="header__logoIcon"/>
        <span>CV Manager</span>
    </Link>
));

export default Logo;