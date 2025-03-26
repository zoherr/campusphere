'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from '@/utils/api';

const QrReader = dynamic(() => import('react-qr-scanner'), {
    ssr: false,
    loading: () => <p>Loading QR Scanner...</p>,
});

const QRCodeScanner = () => {
    const [scannedData, setScannedData] = useState(null);
    const [scannedCodesSet, setScannedCodesSet] = useState(new Set());
    const [qrKey, setQrKey] = useState(Date.now());  // This state will trigger remounting of QrReader

    const handleScan = async (data) => {
        if (data) {
            const qrCode = data.text;
            if (!scannedCodesSet.has(qrCode)) {
                setScannedData(qrCode);
                markAttendance(qrCode);
            }
        }
    };

    const handleError = (err) => {
        toast.error("Error scanning QR code");
    };

    const markAttendance = async (qrCode) => {
        setScannedCodesSet(prevSet => new Set(prevSet).add(qrCode));
        try {
            await api.post('/lecture/attendence', { lectureId: qrCode });
            toast.success("Attendance marked for QR Code");
        } catch (error) {
            toast.error("Error marking attendance: " + (error.response ? error.response.data.message : "Unknown error"));
        }
    };

    const handleRefresh = () => {
        setQrKey(Date.now());
    };

    return (
        <div className='pb-12'> 
            <h2 className="text-center mt-9">Scan the QR Code</h2>
            {scannedData && <p className="text-center mt-9">Last Scanned QR Code: {scannedData}</p>}

            <div className="flex justify-center rounded-2xl overflow-hidden my-10">
                <QrReader
                    key={qrKey}  // Trigger remount by changing the key
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: '80%', height: 'auto', borderRadius: "20px" }}
                    constraints={{
                        video: {
                            facingMode: 'environment'
                        }
                    }}
                />
            </div>

            <div className="text-center mt-4 text-white ">
                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-black text-white rounded"
                >
                    Refresh Camera
                </button>
            </div>
        </div>
    );
};

export default QRCodeScanner;
