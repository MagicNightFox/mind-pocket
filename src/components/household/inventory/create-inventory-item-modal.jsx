import {Box, IconButton, Modal, Paper, TextField} from "@mui/material";
import {CheckOutlined, CloseOutlined, QrCodeScannerOutlined} from "@mui/icons-material";
import Scanner from "../../scanner/scanner.jsx";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createInventoryItem} from "../../../calls.js";
import {QUERY_KEYS} from "../../../Constants.js";

const CreateInventoryItemModal = (props) => {
    const {open, onClose, dtoIn} = props;
    const [eanValue, setEanValue] = useState(dtoIn?.code);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createInventoryItem,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.inventoryItemQueryData] })
        },
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        mutation.mutate(formJson);
        onClose();
    }
    return <Modal open={open} onClose={onClose} sx={{justifySelf: "center", alignSelf: "center"}}>
        <Paper sx={{padding: "16px", maxWidth: "256px"}}>
            <Box display="flex" flexDirection="column" justifyItems="center" gap="16px">
                <form onSubmit={handleSubmit} id="inventoryItem-create-form">
                    <Box display="flex" flexDirection="row">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="code"
                            name="code"
                            label="EAN"
                            value={eanValue}
                            onChange={e => setEanValue(e.target.value)}
                            type="text"
                            variant="outlined"
                            disabled={dtoIn?.code}
                            fullWidth
                        />
                        { !dtoIn?.code && <IconButton> <QrCodeScannerOutlined/> </IconButton>}

                    </Box>
                    { !dtoIn?.code && <Scanner onSuccess={(code) => setEanValue(code)}/>}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="expirationDate"
                        name="expirationDate"
                        label="Expires By"
                        type="date"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="purchaseDate"
                        name="purchaseDate"
                        label="Purchased on"
                        type="date"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="location"
                        name="location"
                        label="Location"
                        type="text"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        name="amount"
                        label="Amount"
                        type="number"
                        variant="outlined"
                        fullWidth
                    />
                </form>
                <Box alignSelf="end" >
                    <IconButton type="submit" form="inventoryItem-create-form" ><CheckOutlined color="success"/></IconButton>
                    <IconButton onClick={onClose}><CloseOutlined color="error"/></IconButton>
                </Box>

            </Box>
        </Paper>
    </Modal>
}

export default CreateInventoryItemModal