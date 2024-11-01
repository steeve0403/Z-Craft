import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCV, useGeneralInfo } from '@/hooks/useEntityHooks';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Textarea } from '@components/ui/Textarea';

const CVEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { items: cvs, loadItems: loadCVs, updateItem: updateCV } = useCV();
    const {
        items: generalInfos,
        loadItems: loadGeneralInfos,
        updateItem: updateGeneralInfo,
    } = useGeneralInfo();
    const [cvTitle, setCvTitle] = useState('');

    useEffect(() => {
        loadCVs();
        loadGeneralInfos();
    }, [loadCVs, loadGeneralInfos]);

    const cv = cvs.find((cv) => cv.id === id);
    useEffect(() => {
        if (cv) setCvTitle(cv.title);
    }, [cv]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCvTitle(e.target.value);
    };

    const handleSave = async () => {
        if (cv) {
            await updateCV({ ...cv, title: cvTitle });
        }
    };

    if (!cv) {
        return <p>CV not found</p>;
    }

    return (
        <div>
            <h2>Edit CV</h2>
            <Input
                label='Title'
                value={cvTitle}
                onChange={handleTitleChange}
                error={cvTitle === '' ? 'Title is required' : undefined}
            />
            <Button
                variant='primary'
                onClick={handleSave}
                disabled={cvTitle === ''}
            >
                Save
            </Button>

            {generalInfos
                .filter((info) => info.cvId === id)
                .map((info) => (
                    <div key={info.id}>
                        <Input
                            label='First Name'
                            value={info.firstname}
                            onChange={(e) =>
                                updateGeneralInfo({
                                    ...info,
                                    firstname: e.target.value,
                                })
                            }
                        />
                        <Textarea
                            label='Summary'
                            value={info.summary}
                            onChange={(e) =>
                                updateGeneralInfo({
                                    ...info,
                                    summary: e.target.value,
                                })
                            }
                        />
                    </div>
                ))}
        </div>
    );
};

export default CVEditPage;
