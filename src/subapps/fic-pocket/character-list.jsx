
import {Link, useNavigate} from "react-router";
import {useState} from "react";
import {formatDate} from "../../helper-component.js";
import {DataGrid, ToolbarButton, Toolbar} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {createCharacter, listCharacters} from "../../calls.js";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Alert, CircularProgress, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import CustomToolbar from "../../components/material-overrides/custom-toolbar.jsx";
import GppBadIcon from '@mui/icons-material/GppBad';
const columns = [
  { field: "name", headerName: "Name", width: 300 },
  { field: "origin", headerName: "Origin", width: 200 },
  { field: "genre", headerName: "Genre", width: 180 },
  { field: "series", headerName: "Series", width: 180 },
  { field: "simpedSince", headerName: "Simping since", width: 120, valueGetter: (value) => formatDate(value) },
  { field: "fanficsRead", headerName: "Fanfictions read", width: 120 },
  { field: "createdAt", headerName: "Created", width: 120, valueGetter: (value) => formatDate(value) },
  { field: "updatedAt", headerName: "Updated", width: 120, valueGetter: (value) => formatDate(value) }
];

const CharacterDataList = () => {

  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const {data: characters, error, isLoading} = useQuery({queryKey:["characterData"], queryFn: listCharacters});
  async function Submit(data){
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: createCharacter,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['characterData'] })
    },
  })
  if(isLoading){
    return <CircularProgress/>;
  }
  if(error){
    return <></>;
  }
   else return (<>
      <Box sx={{ height: "99vh"}}>
        <DataGrid
          loading={isLoading}
          rows={characters.data}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
            sorting: {
              sortModel: [{ field: "simpedSince", sort: "desc" }],
            }
          }}
          pageSizeOptions={[5, 10, 20]}
          onRowClick={(params) => {
            navigate("/character/" + params.id);
          }}
          disableRowSelectionOnClick
          showToolbar
          slots={{ toolbar: () => CustomToolbar({redirect: "/character/add", title: "Characters"}) }}
        />
      </Box>
  </>)
}


export default CharacterDataList;