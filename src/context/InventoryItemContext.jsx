import {createContext, useContext} from "react";

export const InventoryItemContext = createContext(null);
export const useInventoryItems = () => {
    const context = useContext(InventoryItemContext);
    if (!context) {
        throw new Error('useInventoryItems must be used within a InventoryItemProvider');
    }
    return context;
};