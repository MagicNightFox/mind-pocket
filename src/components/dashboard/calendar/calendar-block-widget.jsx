import {Box, Button} from "@mui/material";
import {useTimeFrame} from "../../../context/TimeFrameContext.jsx";

const CalendarBlockWidget = (props) => {
    const {children} = props;
    const {currentDate, setCurrentDate} = useTimeFrame();
    console.log(currentDate.toISOString());
    return <Box width="200px" height="100px" borderRadius="16px" padding="8px" display="flex" flexDirection="column" style={{backgroundColor: "white"}}>
        <Box gridTemplateColumns="repeat(2, 1fr)">
            <Box gridRow={0} gridColumn={0}>{currentDate.toLocaleDateString()}</Box>
            <Box gridRow={0} gridColumn={1}>
                <button>{"<"}</button>
                <button>{">"}</button>
            </Box>
        </Box>
    </Box>
}

export default CalendarBlockWidget