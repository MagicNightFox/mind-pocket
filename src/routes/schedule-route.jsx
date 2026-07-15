import TopBar from "../components/topbar/top-bar.jsx";
import {Box, Container} from "@mui/material";
import Row from "../components/row.jsx";
import {DateCalendar} from "@mui/x-date-pickers";
import {useLang} from "../lang/LanguageContext.jsx";

const ScheduleRoute = () => {
    const {t} = useLang();

    const breadcrumbs = [
        {link: "/", title: t.Breadcrumbs.Personal},
        {link: "/schedule", title: t.Breadcrumbs.Schedule},
    ];
    return <>
        <TopBar breadcrumbList={breadcrumbs}/>
        <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
            <Row>
                <Box bgcolor="white" borderRadius="16px" display="flex">

                </Box>
            </Row>
            <Row display="flex" gap="16px">
                <Box bgcolor="white" borderRadius="16px" display="flex">
                    <DateCalendar readOnly />
                </Box>
            </Row>
        </Container></>
}
export default ScheduleRoute;