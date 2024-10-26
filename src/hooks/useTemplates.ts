import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../db/dexieConfig.ts";


export const useTemplates = () => useLiveQuery(() => db.templates.toArray(), []);

export const useTemplate = (templateID: string) => useLiveQuery(() => db.templates.get(templateID), [templateID]);