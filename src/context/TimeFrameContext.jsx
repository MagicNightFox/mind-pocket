import {createContext, useContext} from "react";

export const TimeFrameContext = createContext(null);
export const useTimeFrame = () => {
    const context = useContext(TimeFrameContext);
    if (!context) {
        throw new Error("Must be used with TimeFrameProvider");
    }
    return context;
}