
import {useNavigate} from "react-router";
import {formatDate} from "../../../helper-component.js";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import CustomToolbar from "../../material-overrides/custom-toolbar.jsx";
import {useQuery} from "@tanstack/react-query";
import {QUERY_KEYS} from "../../../Constants.js";
import {listProducts} from "../../../calls.js";
const columns = [
    { field: "imageUrl", headerName: "Image", width: 32, renderCell: (params) => (<Box> <img src={params.value} width="32px"/></Box>) },
    { field: "_id", headerName: "Id", width: 16 },
    { field: "code", headerName: "EAN", width: 16 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "description", headerName: "Description", width: 180 },
    { field: "manufacturer", headerName: "Manufacturer", width: 120 },
    { field: "createdAt", headerName: "Created", width: 120, valueGetter: (value) => formatDate(value) },
    { field: "updatedAt", headerName: "Updated", width: 120, valueGetter: (value) => formatDate(value) }
];

const ProductDataList = (props) => {
    const {onClickAddProduct, dtoIn} = props;
    const navigate = useNavigate();
    const {data: products, error, isLoading} = useQuery({queryKey:[QUERY_KEYS.productQueryData, dtoIn], queryFn: () => listProducts(dtoIn)});
    if(isLoading){
        return <CircularProgress/>;
    }
    if(error){
        return <></>;
    }
    else return <DataGrid
        loading={isLoading}
        rows={products.data}
        columns={columns}
        initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
            sorting: {
                sortModel: [{ field: "createdAt", sort: "desc" }],
            },
            columns: {
                columnVisibilityModel: {
                    // Hide columns status and traderName, the other columns will remain visible
                    _id: false,
                    code: false
                },
            }
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5, 10, 20]}
        onRowClick={(params) => {
            navigate("/inventory/product/" + params.id);
        }}
        disableRowSelectionOnClick
        showToolbar
        slots={{ toolbar: () => CustomToolbar({onClick: () => {onClickAddProduct()}, title: "Products"}) }}
    />
}


export default ProductDataList;