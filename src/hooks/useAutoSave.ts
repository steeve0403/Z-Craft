import { useEffect, useRef } from 'react';
import { CV } from '../types/cv';
import {useCVStore} from "../stores/cvStore.ts";

export const useAutoSave = (cv: CV | undefined, id: string | undefined, interval: number = 1000) => {
    const { updateCV } = useCVStore();
    const previousCV = useRef<CV | undefined>(cv);

    useEffect(() => {
        if (!cv || !id) return;

        const saveTimer = setTimeout(() => {
            if (JSON.stringify(previousCV.current) !== JSON.stringify(cv)) {
                updateCV(id, cv);
                try {
                    localStorage.setItem(`cv_${id}`, JSON.stringify(cv));
                } catch (error) {
                    console.error('AutoSave: Failed to save to localStorage', error);
                }
                previousCV.current = cv;
            }
        }, interval);

        return () => clearTimeout(saveTimer);

    }, [cv, id, interval, updateCV]);
};
