import TopBar from "../../../components/topbar/top-bar.jsx";
import {Container} from "@mui/material";
const AddItemRoute = (props) => {
    const breadcrumbs = [
        {link: "/inventory", title: "Household"},
        {link: "/inventory", title: "Inventory"},
        {link: "/inventory/items", title: "Items"},
        {link: "/inventory/items/add", title: "Add Items"},
    ];
    return <>
        <TopBar breadcrumbList={breadcrumbs} sx={{width: "100%"}}/>
        <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
        </Container>
    </>
}

export default AddItemRoute