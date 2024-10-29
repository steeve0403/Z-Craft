// z-craft/src/components/ui/Notification.tsx
import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    duration?: number;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={cn("notification", `notification--${type}`)}>
            <p>{message}</p>
            <button className="notification-close" onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

Notification.displayName = 'Notification';

export { Notification };
