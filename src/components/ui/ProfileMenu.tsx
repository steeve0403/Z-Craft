import React from 'react';
import {Link} from 'react-router-dom';
import {User} from 'lucide-react';

/**
 * ProfileMenu component for user-related actions like profile, settings, and logout.
 */
const ProfileMenu: React.FC = () => (
    <div className="header__profile-menu">
        <User className="w-5 h-5 header__profile-icon"/>
        <div className="header__profile-dropdown">
            <Link to="/profile" className="header__profile-item">Profile</Link>
            <Link to="/settings" className="header__profile-item">Settings</Link>
            <Link to="/logout" className="header__profile-item">Logout</Link>
        </div>
    </div>
);

export default ProfileMenu;