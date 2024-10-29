import { useEffect, useState } from 'react';
import { useCV } from '../../hooks/useEntityHooks.ts';
import CVItem from "./CVItem.tsx";

const CVList = () => {
    const { items: cvs, isLoading, isError, errorInfo, loadItems, addItem, deleteItem } = useCV();
    const [newCVTitle, setNewCVTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    const handleAddCV = async () => {
        if (newCVTitle.trim() === '') {
            setError("Title cannot be empty.");
            return;
        }

        setError(null);

        const newCV = {
            id: `cv-${Date.now()}`,
            title: newCVTitle,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const result = await addItem(newCV);
        if (result.success) {
            setNewCVTitle('');
            setNotification('CV added successfully!');
        } else {
            setError(result.errorInfo?.message || 'Failed to add CV. Please try again.');
        }
    };

    const handleDeleteCV = async (id: string) => {
        const result = await deleteItem(id);
        if (result.success) {
            setNotification('CV deleted successfully!');
        } else {
            setError(result.errorInfo?.message || 'Failed to delete CV. Please try again.');
        }
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    if (isLoading) {
        return <p>Loading CVs...</p>;
    }

    if (isError && errorInfo) {
        return <p>Error: {errorInfo.message}</p>;
    }

    return (
        <div>
            <h2>CV List</h2>
            {cvs.length > 0 ? (
                <ul>
                    {cvs.map((cv) => (
                        <CVItem key={cv.id} cv={cv} onDelete={handleDeleteCV} />
                    ))}
                </ul>
            ) : (
                <p>No CVs available</p>
            )}
            {/* Reste du code identique */}
        </div>
    );
};

export default CVList;
