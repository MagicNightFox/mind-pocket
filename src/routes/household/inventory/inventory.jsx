import TopBar from "../../../components/topbar/top-bar.jsx";
import {Box, Button, Container} from "@mui/material";
import Row from "../../../components/row.jsx";
import {useState} from "react";
import ProductDataList from "../../../components/household/inventory/product-data-list.jsx";
import CreateProductModal from "../../../components/household/inventory/create-product-modal.jsx";
import InventoryDataList from "../../../components/household/inventory/inventory-data-list.jsx";
import CreateInventoryItemModal from "../../../components/household/inventory/create-inventory-item-modal.jsx";
import {Link as ReactLink} from "react-router";

const InventoryRoute = () => {
    const breadcrumbs = [
        {link: "/inventory", title: "Household"},
        {link: "/inventory", title: "Inventory"},
    ];

    const [createProductModal, setCreateProductModal] = useState(false);
    const [createInventoryItemModal, setCreateInventoryItemModal] = useState(false);
    return <>
        <TopBar breadcrumbList={breadcrumbs} sx={{width: "100%"}}/>
        <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}} >
            <Button component={ReactLink} to={"/inventory/batch"}>Add Batch</Button>
            <Row gap="16px" >
                <InventoryDataList onClickAddInventoryItem={() => setCreateInventoryItemModal(true)} />
                <ProductDataList onClickAddProduct={() => setCreateProductModal(true)}/>
            </Row>
            <CreateProductModal open={createProductModal} onClose={() => {setCreateProductModal(false)}}/>
            <CreateInventoryItemModal open={createInventoryItemModal} onClose={() => {setCreateInventoryItemModal(false)}} />
        </Container>
    </>
}

export default InventoryRoute