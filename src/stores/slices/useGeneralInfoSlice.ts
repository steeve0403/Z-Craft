import {StateCreator} from 'zustand';
import {GeneralInfo} from '../../types/cv';
import generalInfoService from '../../services/dexie/generalInfoService.ts';
import {useLiveQuery} from "dexie-react-hooks";

export interface GeneralInfoSlice {
    generalInfos: GeneralInfo[];
    loading: boolean;
    error: string | null;
    useFetchGeneralInfosByCVId: (cvId: string) => GeneralInfo[] | undefined;
    addGeneralInfo: (generalInfo: GeneralInfo) => Promise<void>;
    updateGeneralInfo: (generalInfoId: string, changes: Partial<GeneralInfo>) => Promise<void>;
    deleteGeneralInfo: (generalInfoId: string) => Promise<void>;
}

export const createGeneralInfoSlice: StateCreator<GeneralInfoSlice> = (set) => ({
    generalInfos: [],
    loading: false,
    error: null,

    useFetchGeneralInfosByCVId: (cvId) => {
        const generalInfos = useLiveQuery(async () => {
            set({loading: true, error: null});
            try {
                const generalInfos = await generalInfoService.getGeneralInfosByCVId(cvId);
                set({generalInfos});
            } catch (error) {
                set({error: 'Error while loading general infos'});
            } finally {
                set({loading: false});
            }
        }, [cvId]);
        return generalInfos || [];
    },

    addGeneralInfo: async (generalInfo) => {
        set({loading: true, error: null});
        try {
            await generalInfoService.addGeneralInfo(generalInfo);
            set((state) => ({
                generalInfos: [...state.generalInfos, generalInfo],
            }));
        } catch (error) {
            set({error: 'Error while adding the general info'});
        } finally {
            set({loading: false});
        }
    },

    updateGeneralInfo: async (generalInfoId, changes) => {
        set({loading: true, error: null});
        try {
            await generalInfoService.updateGeneralInfo(generalInfoId, changes);
            set((state) => ({
                generalInfos: state.generalInfos.map((exp) =>
                    exp.id === generalInfoId ? {...exp, ...changes} : exp
                ),
            }));
        } catch (error) {
            set({error: 'Error while updating the general info'});
        } finally {
            set({loading: false});
        }
    },

    deleteGeneralInfo: async (generalInfoId) => {
        set({loading: true, error: null});
        try {
            await generalInfoService.deleteGeneralInfo(generalInfoId);
            set((state) => ({
                generalInfos: state.generalInfos.filter((exp) => exp.id !== generalInfoId),
            }));
        } catch (error) {
            set({error: 'Error while deleting the general info'});
        } finally {
            set({loading: false});
        }
    },
});