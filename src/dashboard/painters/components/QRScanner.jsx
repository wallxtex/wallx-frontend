import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";

const rewardsBgStyle = {
    backgroundColor: '#f3f4f6',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M25 10l3 9h10l-8 6 3 9-8-6-8 6 3-9-8-6h10z' /%3E%3Ccircle cx='75' cy='40' r='8' /%3E%3Ccircle cx='75' cy='40' r='5' fill-opacity='0.02' /%3E%3Cpath d='M15 60h10v5h-10zM17 65h6v10h-6zM12 75h16v3h-16z' /%3E%3Cpath d='M70 80l5-10 5 10-5 10z' /%3E%3C/g%3E%3C/svg%3E")`
};

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
              const expectedDomain = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
              
              // Validate that the domain matches our deployed frontend URL exactly
              if (url.origin !== new URL(expectedDomain).origin) {
                throw new Error("Invalid domain");
              }

              hasScanned.current = true;
              setScanStatus("success");
              
              try {
                if (scanner) await scanner.stop();
              } catch (e) {
                console.warn("Error stopping scanner", e);
              }

              setTimeout(() => {
                window.location.href = url.href;
              }, 600);
            } catch (error) {
              // Not a valid URL or missing code param
              console.debug("Invalid QR Data:", error);
              setScanStatus("error");
              
              // Reset back to scanning after 2 seconds
              setTimeout(() => {
                if (isMounted && !hasScanned.current) {
                  setScanStatus("scanning");
                }
              }, 2000);
            }
          },
          (errorMessage) => { console.debug("QR Scan error:", errorMessage); }
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] sm:min-h-screen text-gray-900 p-5 box-border relative overflow-hidden" style={rewardsBgStyle}>
      <div className="absolute top-12 w-full text-center px-4 z-20">
        <h2 className="text-3xl font-semibold m-0 text-gray-900 tracking-tight">Scan QR Code</h2>
        <p className="text-sm text-gray-500 mt-3">Align the code inside the frame to redeem.</p>
      </div>

      {/* Main scanner container */}
      <div className={`w-[250px] h-[250px] rounded-3xl overflow-hidden shadow-lg border relative z-10 mt-4 bg-gray-200 flex justify-center items-center transition-colors duration-300 ${scanStatus === 'error' ? 'border-red-500' : 'border-gray-300'}`}>

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
        <div className="inline-flex items-center justify-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full border border-gray-200 shadow-md">
          <span className={`w-2.5 h-2.5 rounded-full transition-colors ${
            {
              'success': 'bg-green-500',
              'error': 'bg-red-500'
            }[scanStatus] || 'bg-blue-500 animate-[pulse_1.5s_infinite]'
          }`}></span>
          <p className="text-[0.9rem] font-medium text-gray-700 m-0">
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
