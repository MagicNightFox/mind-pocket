import {createContext, useContext} from "react";

export const NoteContext = createContext(null);
export const useNotes = () => {
    const context = useContext(NoteContext);
    if (!context) {
        throw new Error('useNotes must be used within a NoteProvider');
    }
    return context;
};