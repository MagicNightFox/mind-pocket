import TopBar from "../../../components/topbar/top-bar.jsx";
import Row from "../../../components/row.jsx";
import InventoryDataList from "../../../components/household/inventory/inventory-data-list.jsx";
import ProductDataList from "../../../components/household/inventory/product-data-list.jsx";
import CreateProductModal from "../../../components/household/inventory/create-product-modal.jsx";
import CreateInventoryItemModal from "../../../components/household/inventory/create-inventory-item-modal.jsx";
import {Box, Button, CircularProgress, Container, Modal, Paper, TextField, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../../Constants.js";
import {getInventoryItem, getProduct} from "../../../calls.js";
import {useParams} from "react-router";
import {useState} from "react";



const InventoryItemDetailRoute = () => {
    let {id} = useParams();
  const {data: response, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.inventoryItemQueryData, id], queryFn: () => getInventoryItem(id),});

    const breadcrumbs = [
        {link: "/inventory", title: "Household"},
        {link: "/inventory", title: "Inventory"},
        {link: `/inventory/items/${id}`, title: response?.data?.name}
    ];
    if(isLoading){
        return <CircularProgress/>;
    }
    if(error){
        return <>{error}</>;
    }
    else {
        return <>
            <TopBar breadcrumbList={breadcrumbs} sx={{width: "100%"}}/>
            <Container maxWidth="100%" sx={{display: "flex", flexDirection: "column"}}>

            </Container>
        </>
    }
}

export default InventoryItemDetailRoute