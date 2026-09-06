import {Box, Button, IconButton, Modal, Paper, TextField} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createProduct} from "../../../calls.js";
import {QUERY_KEYS} from "../../../Constants.js";
import {CheckOutlined, CloseOutlined, QrCodeScannerOutlined} from "@mui/icons-material";
import {useState} from "react";
import Scanner from "../../scanner/scanner.jsx";

const CreateProductModal = (props) => {
    const {open, onClose} = props;
    const [eanValue, setEanValue] = useState(null);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.productQueryData] })
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
                <form onSubmit={handleSubmit} id="product-create-form">
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
                            fullWidth
                        />
                        <IconButton> <QrCodeScannerOutlined/> </IconButton>

                    </Box>
                    <Scanner onSuccess={(code) => setEanValue(code)} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="type"
                        name="type"
                        label="Type"
                        type="text"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="manufacturer"
                        name="manufacturer"
                        label="Manufacturer"
                        type="text"
                        variant="outlined"
                        fullWidth
                    />
                </form>
                <Box alignSelf="end" >
                    <IconButton type="submit" form="product-create-form" ><CheckOutlined color="success"/></IconButton>
                    <IconButton onClick={onClose}><CloseOutlined color="error"/></IconButton>
                </Box>

            </Box>
        </Paper>
    </Modal>
}

export default CreateProductModal