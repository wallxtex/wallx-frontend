import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  const navigate = useNavigate();
  const hasScanned = useRef(false);
  const [scanStatus, setScanStatus] = useState("scanning"); // 'scanning', 'success', 'error'

  useEffect(() => {
    let isMounted = true;
    let scanner = null;

    const initScanner = async () => {

      await new Promise(resolve => setTimeout(resolve, 100));
      if (!isMounted) return;

      scanner = new Html5Qrcode("qr-reader");

      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          async (decodedText) => {
            if (hasScanned.current) return;
            
            console.log("QR Data:", decodedText);

            try {
              const url = new URL(decodedText.trim());
              const uniqueCode = url.searchParams.get("code");
              
              if (uniqueCode) {
                hasScanned.current = true;
                setScanStatus("success");
                
                try {
                  if (scanner) await scanner.stop();
                } catch (e) {
                  console.warn("Error stopping scanner", e);
                }

                setTimeout(() => {
                  navigate(`/painter/redeem?code=${encodeURIComponent(uniqueCode)}`);
                }, 600);
              } else {
                throw new Error("Missing code parameter");
              }
            } catch {
              // Not a valid URL or missing code param
              setScanStatus("error");
              
              // Reset back to scanning after 2 seconds
              setTimeout(() => {
                if (isMounted && !hasScanned.current) {
                  setScanStatus("scanning");
                }
              }, 2000);
            }
          },
          () => { /* Ignore */ }
        );


        if (!isMounted && scanner && scanner.isScanning) {
          await scanner.stop();
          scanner.clear();
        }
      } catch (error) {
        if (isMounted) console.error("Unable to start QR scanner:", error);
      }
    };

    initScanner();

    return () => {
      isMounted = false;
      if (scanner && scanner.isScanning) {
        scanner.stop().then(() => scanner.clear()).catch(e => console.warn("Cleanup error", e));
      }
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#121212] text-white p-5 box-border relative overflow-hidden">
      <div className="absolute top-12 w-full text-center px-4 z-20">
        <h2 className="text-3xl font-semibold m-0 text-white tracking-tight">Scan QR Code</h2>
        <p className="text-sm text-[#a0a0a0] mt-3">Align the code inside the frame to redeem.</p>
      </div>

      {/* Main scanner container */}
      <div className={`w-[250px] h-[250px] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] border relative z-10 mt-4 bg-black flex justify-center items-center transition-colors duration-300 ${scanStatus === 'error' ? 'border-red-500' : 'border-white/10'}`}>

        {/* Raw Video Feed with Native Library UI */}
        <div id="qr-reader" className="w-full h-full [&_video]:!object-cover" />

        {/* Scanning Line Overlay */}
        {scanStatus === 'scanning' && (
          <div className="absolute z-20 w-[250px] h-[250px] pointer-events-none">
            <div className="absolute left-0 w-full h-[2px] bg-green-500 animate-[scan_2.5s_ease-in-out_infinite] shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
          </div>
        )}
      </div>

      <div className="absolute bottom-12 w-full text-center z-20">
        <div className="inline-flex items-center justify-center gap-3 bg-[#2a2a2a]/80 backdrop-blur-md px-5 py-3 rounded-full border border-white/5 shadow-lg">
          <span className={`w-2.5 h-2.5 rounded-full transition-colors ${
            {
              'success': 'bg-green-500',
              'error': 'bg-red-500'
            }[scanStatus] || 'bg-blue-500 animate-[pulse_1.5s_infinite]'
          }`}></span>
          <p className="text-[0.9rem] font-medium text-[#e0e0e0] m-0">
            {{
              'success': "Code Verified!",
              'error': "Invalid QR Code"
            }[scanStatus] || "Looking for a valid Wallx code"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
