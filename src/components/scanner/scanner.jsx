import {useRef, useState} from "react";
import {Html5Qrcode, Html5QrcodeSupportedFormats} from "html5-qrcode";
import {Button} from "@mui/material";
import {Stop} from "@mui/icons-material";

const Scanner = (props) => {
    const {onSuccess, state} = props;
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
        {isScanning ? <Button onClick={StopScanning}>STOP SCANNING</Button> : <Button onClick={StartScanning}>START SCANNING</Button> }
        <div id="reader" style={{ width: '100%' }}></div>
    </>
}

export default Scanner