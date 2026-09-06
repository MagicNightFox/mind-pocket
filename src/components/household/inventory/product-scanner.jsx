import {useRef, useState} from "react";
import {Html5Qrcode, Html5QrcodeSupportedFormats} from "html5-qrcode";
import {Button, IconButton} from "@mui/material";
import {QrCodeScannerOutlined, Stop} from "@mui/icons-material";

const ProductScanner = (props) => {
    const {onSuccess} = props;
    const [scannedData, setScannedData] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef(null);
    const StartScanning = () => {
        if (isScanning) return;

        // Initialize only when the button is clicked (the div now exists!)
        if (!scannerRef.current) {
            scannerRef.current = new Html5Qrcode("reader");
        }
        scannerRef.current.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 300, height: 150 }, // Rectangular box is better for EAN
                formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13]
            },
            (decodedText, decodedResult) => {
                // Success callback
                setScannedData(decodedText);
                onSuccess(decodedText);
                scannerRef.current.stop();
                scannerRef.current.clear();
                setIsScanning(false);
            },
            (errorMessage) => {
                // Silent parsing errors or camera warnings
            }
        ).catch((err) => {
            // Permission or hardware errors
        });
        setIsScanning(true);
    }

    const StopScanning = async () => {
        if (scannerRef.current && isScanning) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
                setIsScanning(false);
            } catch (err) {
                console.error("Failed to stop scanner:", err);
            }
        }
    }
    return <>
        <IconButton onClick={StartScanning}> <QrCodeScannerOutlined/> </IconButton>
        <div id="reader" style={{ width: '100%' }}></div>
    </>
}

export default ProductScanner