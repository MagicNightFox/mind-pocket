
import {useNavigate} from "react-router";
import {formatDate} from "../../../helper-component.js";
import {DataGrid} from "@mui/x-data-grid";
import {
    listInventoryItems, listProducts,
} from "../../../calls.js";
import {useQuery} from "@tanstack/react-query";
import {CircularProgress} from "@mui/material";
import CustomToolbar from "../../material-overrides/custom-toolbar.jsx";
import {QUERY_KEYS} from "../../../Constants.js";


const InventoryDataList = (props) => {
    const {onClickAddInventoryItem, dtoIn} = props
    const navigate = useNavigate();
    const {data: products, productError, productIsLoading} = useQuery({queryKey:[QUERY_KEYS.productQueryData], queryFn: () => listProducts()});
    const {data: inventoryItems, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.inventoryItemQueryData, dtoIn], queryFn: () => listInventoryItems(dtoIn)});

    if(isLoading || productIsLoading){
        return <CircularProgress/>;
    }
    if(error || productError){
        return <>Oops</>;
    }
    else {
        const columns = [
            { field: "productId", headerName: "Product", width: 200, valueGetter: (value) => products?.data.find((el) => el._id === value).name },
            { field: "expirationDate", headerName: "Expires by", width: 180 },
            { field: "purchaseDate", headerName: "Bought on", width: 180 },
            { field: "location", headerName: "Storage", width: 180 },
            { field: "createdAt", headerName: "Created", width: 120, valueGetter: (value) => formatDate(value) },
            { field: "updatedAt", headerName: "Updated", width: 120, valueGetter: (value) => formatDate(value) }
        ];
        return <DataGrid
            loading={isLoading}
            rows={inventoryItems?.data}
            columns={columns}
            initialState={{
                pagination: {paginationModel: {pageSize: 10}},
                sorting: {
                    sortModel: [{field: "expirationDate", sort: "desc"}],
                },
                pinnedColumns: {left: ['name']}
            }}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10, 20]}
            onRowClick={(params) => {
                navigate("/inventory/item/" + params.id);
            }}
            disableRowSelectionOnClick
            showToolbar
            slots={{
                toolbar: () => CustomToolbar({
                    onClick: () => {
                        onClickAddInventoryItem()
                    }, title: "Inventory Items"
                })
            }}
        />
    }
}


export default InventoryDataList;