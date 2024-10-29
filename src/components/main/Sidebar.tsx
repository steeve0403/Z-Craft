import React from 'react';
import {NavLink} from 'react-router-dom';
import {FileText, User, Settings, Bell, ClipboardList, BarChart} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

/**
 * Sidebar component for navigating through the application.
 * @param isOpen - Boolean indicating if the sidebar is open.
 * @param toggleSidebar - Function to toggle the sidebar visibility.
 */
const Sidebar: React.FC<SidebarProps> = ({isOpen, toggleSidebar}) => {
    return (
        <aside
            className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
            aria-hidden={!isOpen}
            aria-label="Main Navigation Sidebar"
            role="navigation"
        >
            <button onClick={toggleSidebar} className="sidebar__close-button" aria-label="Close Sidebar">
                &times; Close
            </button>
            <nav className="sidebar__nav">
                {[
                    {to: "/cvs", label: "My CVs", icon: <FileText className="sidebar__icon"/>},
                    {to: "/cv/new", label: "Create CV", icon: <User className="sidebar__icon"/>},
                    {to: "/settings", label: "Settings", icon: <Settings className="sidebar__icon"/>},
                    {to: "/notifications", label: "Notifications", icon: <Bell className="sidebar__icon"/>},
                    {to: "/templates", label: "CV Templates", icon: <ClipboardList className="sidebar__icon"/>},
                    {to: "/analytics", label: "Analytics", icon: <BarChart className="sidebar__icon"/>},
                ].map(({to, label, icon}) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({isActive}) =>
                            isActive ? "sidebar__nav-item sidebar__nav-item--active" : "sidebar__nav-item"
                        }
                    >
                        {icon}
                        <span className="sidebar__nav-label">{label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;

