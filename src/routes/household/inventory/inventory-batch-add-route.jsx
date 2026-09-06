import {Box, Container} from "@mui/material";
import TopBar from "../../../components/topbar/top-bar.jsx";
import {useState} from "react";

const InventoryItemToCreate = () => {

    return <Box>

    </Box>
}

const InventoryBatchAddRoute = () => {
    const breadcrumbs = [
        {link: "/", title: "Household"},
        {link: "/inventory", title: "Inventory"},
        {link: "/batch", title: "Add Batch"},
    ];
    const [numberOfItems, setNumberOfItems] = useState(1);
    return <>
        <TopBar breadcrumbList={breadcrumbs}/>
        <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >

        </Container>
    </>
}

export default InventoryBatchAddRoute;