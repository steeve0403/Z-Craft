import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useCVs} from '../hooks/useCVs';
import {Button} from '../components/ui/Button';

const CVList: React.FC = () => {
    const {cvs, loading, error, deleteCV, addCV} = useCVs();

    useEffect(() => {
        const fetchOrCreateCV = async () => {
            if (cvs.length === 0 && !loading && !error) {
                const newCV = {
                    id: Date.now().toString(),
                    title: "Example CV",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                try {
                    await addCV(newCV);
                } catch (err) {
                    console.error("Error adding example CV:", err);
                }
            }
        };
        fetchOrCreateCV();
    }, [cvs, loading, error, addCV]);

    const handleDelete = async (id: string) => {
        try {
            await deleteCV(id);
        } catch (e) {
            console.error("Error deleting CV:", e);
            alert("An error occurred while deleting the CV.");
        }
    };

    if (loading) return <p>Loading CVs...</p>;
    if (error) return <p>Error loading CVs: {error}</p>;

    return (
        <div className="cv-list">
            <h2>My CVs</h2>
            {cvs.length > 0 ? (
                <ul className="cv-list__items">
                    {cvs.map((cv) => (
                        <li key={cv.id} className="cv-list__item">
                            <Link to={`/cv/preview/${cv.id}`} className="cv-list__link">
                                {cv.title || 'Untitled CV'}
                            </Link>
                            <Button
                                variant="outline"
                                onClick={() => handleDelete(cv.id)}
                                disabled={loading}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No CVs created yet.</p>
            )}
        </div>
    );
};

export default CVList;

