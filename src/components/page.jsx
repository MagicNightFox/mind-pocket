import {Box, Container} from "@mui/material";
import TopBar from "./topbar/top-bar.jsx";
import React from "react";

const Page = (props) => {
    const {children, breadcrumbs, gap} = props;
    return <Box margin="0 0 64px 0">
        <TopBar breadcrumbList={breadcrumbs || []}/>
        <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column", gap: (gap ?? "16px")}} >
        {children}
        </Container>
    </Box>
}

export default Page;