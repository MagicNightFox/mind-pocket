import TopBar from "../../../components/topbar/top-bar.jsx";
import Row from "../../../components/row.jsx";
import InventoryDataList from "../../../components/household/inventory/inventory-data-list.jsx";
import ProductDataList from "../../../components/household/inventory/product-data-list.jsx";
import CreateProductModal from "../../../components/household/inventory/create-product-modal.jsx";
import CreateInventoryItemModal from "../../../components/household/inventory/create-inventory-item-modal.jsx";
import {Box, Button, CircularProgress, Container, Modal, Paper, TextField, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../../Constants.js";
import {getProduct} from "../../../calls.js";
import {useParams} from "react-router";
import {useState} from "react";



const ProductDetailRoute = () => {
    let {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [addInventoryItemModalOpen, setAddInventoryItemModalOpen] = useState(false);
    const {data: product, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.productQueryData, id], queryFn: () => getProduct(id),});
    const breadcrumbs = [
        {link: "/inventory", title: "Household"},
        {link: "/inventory", title: "Inventory"},
        {link: `/inventory/product/${id}`, title: product?.data?.name}
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
                <Row >
                    <Box sx={{background:"#FFFFFF"}}>
                        <img src={product?.data?.imageUrl} style={{maxWidth: "256px"}}/>
                    </Box>
                    <Box flexGrow={1} display="flex" flexDirection="column" gap="16px">
                        <TextField value={product.data.name} disabled={!isEditing}/>
                        <TextField value={product.data.manufacturer} disabled={!isEditing}/>
                        <TextField value={product.data.type} disabled={!isEditing}/>
                        <TextField value={product.data.description} disabled={!isEditing}/>
                    </Box>
                </Row>
                <Row justifyContent="end" gap="4px">
                    <Button onClick={() => setIsEditing(!isEditing)}>EDIT</Button>
                    <Button onClick={() => setConfirmationModalOpen(true)}>DELETE</Button>
                </Row>
                <Row>
                    <InventoryDataList onClickAddInventoryItem={() => setAddInventoryItemModalOpen(true)} dtoIn={{productId: product?._id}}/>
                </Row>
                <Modal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)} sx={{justifySelf: "center", alignSelf: "center"}}>
                    <Paper sx={{maxWidth: "256px", }}>
                        <Box padding="16px" display="flex" flexDirection="column" gap="16px">
                            <Typography component="p" variant="p">you sure you want to delete this product?</Typography>
                            <Typography component="p" variant="p">It will delete all the items in your inventory as well.</Typography>
                            <Box display="flex" flexDirection="row" justifyContent="end">
                                <Button>Delete</Button>
                                <Button onClick={() => setConfirmationModalOpen(false)}>Cancel</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Modal>
                <CreateInventoryItemModal open={addInventoryItemModalOpen} onClose={() => setAddInventoryItemModalOpen(false)} dtoIn={{productId: product?.data?._id, code: product?.data?.code}}/>
            </Container>
        </>
    }
}

export default ProductDetailRoute