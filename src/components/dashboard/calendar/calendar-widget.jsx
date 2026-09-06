import React, {useState} from 'react';
import {Paper, Typography, Box, IconButton, Popover, Switch, FormGroup, FormControlLabel} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import SettingsIcon from '@mui/icons-material/Settings';
import dayjs from 'dayjs';

// A custom day so "today" and the "selected" day are visually distinct
// even when they're not the same date.
function CustomDay(props) {
    const { day, selected, today, ...other } = props;
    return (
        <PickersDay
            {...other}
            day={day}
            selected={selected}
            sx={{
                ...(selected && {
                    bgcolor: `#757575 !important`,
                    color: '#fff'
                }),
                ...(!selected &&
                    today && {
                        border: `1.5px solid #757575`
                    })
            }}
        />
    );
}

export default function CalendarWidget({ selectedDate, onDateChange }) {
    const userSettingsDefault = {
        showDaysOutsideCurrentMonth: true,
        displayWeekNumber: false
    }
    const [userSettings, setUserSettings] = useState(userSettingsDefault);
    const [calendarIsHovered, setCalendarIsHovered] = useState(false)
    const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
    const openSettings = Boolean(calendarAnchorEl);
    return (
        <Paper variant="elevation" elevation={calendarIsHovered ? 0 : 0} sx={{ p: 1.5, borderRadius: "16px" }} onMouseEnter={() => setCalendarIsHovered(true)} onMouseLeave={() => setCalendarIsHovered(false)}>
            <Box display="flex" sx={{ px: 1, pt: 0.5 }}>
                <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: '0.08em', flexGrow: 1 }}>
                    Calendar
                </Typography>
                { calendarIsHovered && <Box>
                    <IconButton size="small" onClick={(event) => {
                        setCalendarAnchorEl(event.currentTarget);
                    }}> <SettingsIcon fontSize="small"/> </IconButton>
                </Box>}
            </Box>
            <Popover
                open={openSettings}
                anchorEl={calendarAnchorEl}
                onClose={() => setCalendarAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <FormGroup>
                    <FormControlLabel control={<Switch onChange={(event) => {setUserSettings({...userSettings, displayWeekNumber: event.target.checked})}} />} label="Show week number" />
                    <FormControlLabel control={<Switch defaultChecked label="Show days outside current month" onChange={(event) => {setUserSettings({...userSettings, showDaysOutsideCurrentMonth: event.target.checked})}} />} label="Show days outside current month" />
                </FormGroup>
            </Popover>
            <DateCalendar
                value={dayjs(selectedDate)}
                onChange={(newVal) => newVal && onDateChange(dayjs(newVal).format())}
                slots={{ day: CustomDay }}
                sx={{ width: '100%' }}
                {...userSettings}
            />
        </Paper>
    );
}
