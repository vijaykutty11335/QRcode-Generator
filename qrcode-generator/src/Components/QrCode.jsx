import { useState } from 'react';
import '../index.css';

const QrCode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("")
    const [qrSize, setQrSize] = useState("")

    async function generateQR() {
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
            console.error("Error in genearting QR Code", error)
        } finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        fetch(img).then((Response) => Response.blob()).then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "QRcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
            .catch((error) => {
                console.error("Error in genearting QR Code", error)
            });
    }

    const handleClear = () => {
        setQrData("");
        setQrSize("");
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            generateQR(e);
        }
    }
    return (
        <>
            <div className='app-container'>
                <h1>QR CODE GENERATOR</h1>
                {loading && <p>Please Wait...</p>}
                {img && <img src={img} className="qr-image" />}
                <div>
                    <label htmlFor='dataInput' className='input-label'>
                        Data for QR Code:
                    </label>
                    <input type='text' id='dataInput' placeholder='Enter data for QR Code' value={qrData} onChange={(e) => setQrData(e.target.value)} onKeyDown={handleKeyDown} />

                    <label htmlFor='sizeInput' className='input-label'>
                        Image size (e.g : 150):
                    </label>
                    <input type='text' id='sizeInput' placeholder='Enter Image Size' value={qrSize} onChange={(e) => setQrSize(e.target.value)} onKeyDown={handleKeyDown} />
                    <button className='generate-btn' onClick={generateQR} disabled={loading}>Generate QR Code</button>
                    <button className='download-btn' onClick={downloadQR}>Download QR Code</button>
                    <button className='clear-btn' onClick={handleClear}>Clear</button>
                </div>
            </div>
        </>
    )
}

export default QrCode;