import {StateCreator} from 'zustand';
import {GeneralInfo} from '../../types/cv';
import generalInfoService from '../../services/dexie/generalInfoService';

export interface GeneralInfoSlice {
    generalInfos: GeneralInfo[]
    fetchGeneralInfo: (cvId: string) => Promise<void>;
    addGeneralInfo: (generalInfo: GeneralInfo) => Promise<void>;
    updateGeneralInfo: (generalInfoId: string, changes: Partial<GeneralInfo>) => Promise<void>;
    deleteGeneralInfo: (generalInfoId: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export const createGeneralInfoSlice: StateCreator<GeneralInfoSlice> = (set) => ({
    generalInfos: [],
    loading: false,
    error: null,


    fetchGeneralInfo: async (cvId) => {
        set({loading: true, error: null});
        try {
            const generalInfos = await generalInfoService.getGeneralInfoByCVId(cvId);
            set({generalInfos, loading: false});
        } catch (error) {
            set({error: 'Error fetching general info', loading: false});
        }
    },

    addGeneralInfo: async (generalInfo) => {
        set({loading: true, error: null});
        try {
            await generalInfoService.addGeneralInfo(generalInfo);
            set((state) => ({generalInfos: [...state.generalInfos, generalInfo], loading: false}));
        } catch (error) {
            set({error: 'Error adding general info', loading: false});
        }
    },

    updateGeneralInfo: async (generalInfoId, changes) => {
        set({loading: true, error: null});
        try {
            await generalInfoService.updateGeneralInfo(generalInfoId, changes);
            set((state) => ({
                generalInfos: state.generalInfos.map((infos) =>
                    infos.id === generalInfoId ? {...infos, ...changes} : infos
                ),
                loading: false,
            }))
        } catch (error) {
            set({error: 'Error updating general info', loading: false});
        }
    },

    deleteGeneralInfo: async (generalInfoId) => {
        set({loading: true, error: null});
        try {
            await generalInfoService.deleteGeneralInfo(generalInfoId);
            set((state) => ({
                generalInfos: state.generalInfos.filter((infos) => infos.id !== generalInfoId)
            }));
        } catch (error) {
            set({error: 'Error deleting general info', loading: false});
        }
    },
});
