import TopBar from "../../../components/topbar/top-bar.jsx";
import {Container} from "@mui/material";
const AddProductRoute = (props) => {
    const breadcrumbs = [
        {link: "/inventory", title: "Household"},
        {link: "/inventory", title: "Inventory"},
        {link: "/inventory/products", title: "Products"},
        {link: "/inventory/products/add", title: "Add Products"},
    ];
    return <>
        <TopBar breadcrumbList={breadcrumbs} sx={{width: "100%"}}/>
        <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
        </Container>
    </>
}

export default AddProductRoute