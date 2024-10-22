import React from 'react';
import {NavLink} from 'react-router-dom';
import {FileText, User, Settings} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, toggleSidebar}) => {
    return (
        <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
            <button onClick={toggleSidebar} className="sidebar__close-button">Close</button>
            <nav className="sidebar__nav">
                <NavLink
                    to="/cvs"
                    className={({isActive}) => (isActive ? "sidebar__nav-item active" : "sidebar__nav-item")}
                >
                    <FileText className="sidebar__icon"/>
                    My CVs
                </NavLink>
                <NavLink
                    to="/cv/new"
                    className={({isActive}) => (isActive ? "sidebar__nav-item active" : "sidebar__nav-item")}
                >
                    <User className="sidebar__icon"/>
                    Create CV
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({isActive}) => (isActive ? "sidebar__nav-item active" : "sidebar__nav-item")}
                >
                    <Settings className="sidebar__icon"/>
                    Settings
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;

