import {Box} from "@mui/material";
import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import {useState} from "react";
import {useTimeFrame} from "../../../context/TimeFrameContext.jsx";


const initialEvents = [
    {
        id: 1,
        title: 'Team Meeting',
        start: '2024-01-15T10:00:00',
        end: '2024-01-15T11:00:00',
    },
    {
        id: 2,
        title: 'Project Review',
        start: '2024-01-16T14:00:00',
        end: '2026-01-16T15:30:00',
    },
    {
        id: 3,
        title: 'Client Call',
        start: '2026-01-17T09:00:00',
        end: '2026-01-17T10:00:00',
    },
];

const ScheduleWidget = (props) => {
    // should be able to adapt to any width and height higher than a certain value
    const {height = 320, eventData} = props;
    const [events, setEvents] = useState(eventData);
    const {currentDate, setCurrentDate} = useTimeFrame()
    const onDateChange = (value) => {
        setCurrentDate(value);
    }
    const time = new Date().getHours();
    const viewConfig = {
        day: {
            initialScrollTime: time
        },
        week: {
            initialScrollTime: time
        }
    }
    console.log(time);
    return (
        <Box style={{ height: height, width: '100%' }} flexGrow={1}>
            <EventCalendar
                events={events}
                onEventsChange={(data) => {
                    setEvents(data)
                    console.log(data)
                }}
                defaultVisibleDate={new Date()}
                viewConfig={viewConfig}
                apiRef={{
                    currentDate: currentDate,
                    current: { setVisibleDate: onDateChange }
                }}
                defaultView="day"
                sx={{
                    '& .MuiEventCalendar-dayTimeGridHeaderContent': {
                        flexDirection: 'row-reverse',
                    },
                    '& .MuiEventCalendar-dayTimeGridHeaderDayNumber': {
                        fontSize: '16px',
                        width: '24px',
                        height: '24px',
                    }
                }}
            />
        </Box>
    );
}

export default ScheduleWidget;
