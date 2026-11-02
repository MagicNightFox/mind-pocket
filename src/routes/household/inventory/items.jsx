import TopBar from "../../../components/topbar/top-bar.jsx";
import {Box, CircularProgress, Container} from "@mui/material";
import InventoryDataList from "../../../components/household/inventory/inventory-data-list.jsx";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../../Constants.js";
import {listInventoryItems} from "../../../calls.js";
import Widget from "../../../components/widget.jsx";

const InventoryBox = (props) => {
    const {title = "other", data} = props;
    return <Widget title={title} style={{gridColumn: "span 3"}}>
        {data.map((item, index) => <Box>{JSON.stringify(item)}</Box>)}
    </Widget>
}
const ItemsRoute = (props) => {
    const breadcrumbs = [
        {link: "/inventory", title: "Household"},
        {link: "/inventory", title: "Inventory"},
        {link: "/inventory/items", title: "Items"},
    ];
    const {data: response, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.inventoryItemQueryData], queryFn: () => listInventoryItems()});
    if(isLoading) return <CircularProgress />;
    if(error) return <CircularProgress />;
    const inventories = getInventories(response.data);
    console.log(inventories);
    return <>
        <TopBar breadcrumbList={breadcrumbs} sx={{width: "100%"}}/>
        <Container maxWidth="100%" sx={{display: "grid", gridTemplateColumns: "repeat(12,1fr)"}} >
            {inventories.map((ivnentoryName, index) => (
                <InventoryBox title={ivnentoryName} data={response.data.filter((item)=>item.location===ivnentoryName)}/>
            ))}
        </Container>
    </>
}

const getInventories = (data) => {

    let inventories = [];
    data.forEach((item) => {
        if(!inventories.includes(item.location)) inventories.push(item.location);
    })
    //let inventoriesMap = {};
    // data.forEach(item => {
    //         if(!inventoriesMap[item.location]) {inventoriesMap[item.location] = []}
    //         inventoriesMap[item.location].push(item)
    //     });

    return inventories;
}

export default ItemsRoute