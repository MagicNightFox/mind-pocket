import {useMemo, useState} from "react";
import {TimeFrameContext} from "../../context/TimeFrameContext.jsx";
const TimeFrameProvider = ({children}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const value = useMemo(() => ({
        currentDate, setCurrentDate
    }), [currentDate]);
    return <TimeFrameContext.Provider value={value}>
        {children}
    </TimeFrameContext.Provider>
}

export default TimeFrameProvider;