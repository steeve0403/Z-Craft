import {useEffect, useRef} from 'react';
import {CV} from '../types/cv';

/**
 * AutoSave hook for CV updates, saving to Dexie database through Zustand at intervals.
 * @param cv - The CV object to auto-save.
 * @param id - ID of the CV.
 * @param interval - Auto-save interval in milliseconds.
 */
export const useAutoSave = (cv: CV | undefined, id: string | undefined, interval: number = 1000) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const updateCV = useCVManagerStore((state) => state.updateCV);
    const previousCV = useRef<CV | undefined>(cv);

    useEffect(() => {
        if (!cv || !id) return;

        const saveTimer = setInterval(() => {
            if (JSON.stringify(previousCV.current) !== JSON.stringify(cv)) {
                updateCV(id, cv);  // Update CV in Zustand store
                previousCV.current = cv;  // Track last saved state
            }
        }, interval);

        return () => clearInterval(saveTimer);
    }, [cv, id, interval, updateCV]);
};
