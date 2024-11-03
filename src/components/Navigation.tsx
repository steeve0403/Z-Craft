import React from 'react';
import {NavLink} from 'react-router-dom';

/**
 * Navigation component for managing navigation links in the header.
 * Provides navigation links to key parts of the application.
 */
const Navigation: React.FC = () => (
    <nav className="header__nav">
        <NavLink to="/cvs" className={({isActive}) => (isActive ? "header__nav-item active" : "header__nav-item")}>My
            CVs</NavLink>
        <NavLink to="/cv/new" className={({isActive}) => (isActive ? "header__nav-item active" : "header__nav-item")}>Create
            CV</NavLink>
    </nav>
);

export default Navigation;