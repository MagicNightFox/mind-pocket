import {Box} from "@mui/material";
import {useTimeFrame} from "../../../context/TimeFrameContext.jsx";

const CalendarRowWidget = (props) => {
    const {children} = props;
    const {currentDate} = useTimeFrame();
    console.log(currentDate.toISOString());
    return <Box borderRadius="16px" display="flex" flexDirection="row" padding="16px 0" height="96px" style={{backgroundColor: "white"}}>
        <Box>

        </Box>
    </Box>
}

export default CalendarRowWidget