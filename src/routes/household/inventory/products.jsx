import TopBar from "../../../components/topbar/top-bar.jsx";
import {Box, CircularProgress, Container} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../../Constants.js";
import {listProducts} from "../../../calls.js";
import {useViewport} from "../../../context/ViewportContext.jsx";
import {useProducts} from "../../../components/providers/product-provider.jsx";
const ProductBox = ({data}) => {
    return <Box borderRadius="16px" padding="8px" textAlign="center" display="flex" flexDirection="column" gap="8px" style={{backgroundColor: "white"}}>
        <img src={data.imageUrl} style={{maxHeight: "128px", alignSelf: "center", justifySelf: "center"}} />
        {data.name}
        <Box display="flex" justifyContent="space-evenly">
            <Box sx={{opacity: 0.5}}>--</Box>
            <Box>--</Box>
            <Box sx={{opacity: 0.5}}>--</Box>
        </Box>
    </Box>
}

const ProductsRoute = (props) => {
    const breadcrumbs = [
        {link: "/inventory", title: "Household"},
        {link: "/inventory", title: "Inventory"},
        {link: "/inventory/products", title: "Products"},
    ];
    const {viewport} = useViewport();
    const cols = getViewportColumnCount(viewport)

    const {data: products, error, isLoading} = useProducts();
    if(isLoading){
        return <CircularProgress/>;
    }
    if(error){
        return <></>;
    }
    else return <>
        <TopBar breadcrumbList={breadcrumbs} sx={{width: "100%"}}/>
        <Container maxWidth="100%" sx={{display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "16px"}} >
            {products?.data.map((product, index) => (<ProductBox key={index} data={product}/>))}
        </Container>
    </>
}

const getViewportColumnCount = (viewport) => {
    switch (viewport){
        case "pc": return 8
        case "tablet": return 4
        default: return 1
    }
}

export default ProductsRoute