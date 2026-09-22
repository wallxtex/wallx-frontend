import React, { useState } from "react";
import QRCode from "qrcode";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import CouponStats from "./GenerateCoupon/CouponStats";
import GenerateForm from "./GenerateCoupon/GenerateForm";
import AlertMessage from "./GenerateCoupon/AlertMessage";
import CouponFooter from "./GenerateCoupon/CouponFooter";
import PrivateApi from "../../../utils/apis/privateApi";

// coupone
const GenerateCoupon = () => {
  const [scannerCount, setScannerCount] = useState("");
  const [amount, setAmount] = useState("");
  const [validityDate, setValidityDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCoupons, setGeneratedCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Generate QR code as data URL
  const generateQRCodeDataURL = async (text) => {
    try {
      const dataURL = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
      return dataURL;
    } catch (err) {
      console.error("Error generating QR code:", err);
      return null;
    }
  };

  // Handle coupon generation
  const handleGenerateCoupons = async () => {
    // Validation
    const count = parseInt(scannerCount, 10);
    if (!scannerCount || count <= 0 || isNaN(count)) {
      setError("Please enter a valid number of scanners (minimum 1)");
      return;
    }
    
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!validityDate) {
      setError("Please select a validity date");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(null);
    setGeneratedCoupons([]);

    try {
      // Call backend API
      const response = await PrivateApi.post("/api/coupons/generate", {
        scannerCount: count,
        amount: Number(amount),
        validityDate,
      });

      // Assuming backend returns: { success: true, data: [{ id, token, code }, ...] }
      const coupons = response.data.data || response.data.coupons || [];

      // Generate QR codes for each coupon
      const couponsWithQR = await Promise.all(
        coupons.map(async (coupon) => {
          const qrCodeDataURL = await generateQRCodeDataURL(
            coupon.token || coupon.code || coupon.id,
          );
          return {
            ...coupon,
            qrCodeDataURL,
          };
        }),
      );

      setGeneratedCoupons(couponsWithQR);
      setSuccess(`Successfully generated ${couponsWithQR.length} coupon(s)!`);
      setScannerCount(""); // Reset input
    } catch (err) {
      console.error("Error generating coupons:", err);
      setError(
        err.response?.data?.message ||
          "Failed to generate coupons. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Download individual QR code
  const downloadSingleQR = (coupon, index) => {
    if (!coupon.qrCodeDataURL) return;

    const link = document.createElement("a");
    link.href = coupon.qrCodeDataURL;
    link.download = `coupon-${coupon.code || coupon.id || index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download all QR codes as ZIP
  const downloadAllQRCodes = async () => {
    if (generatedCoupons.length === 0) return;

    try {
      const zip = new JSZip();
      const folder = zip.folder("qr-codes");

      // Add each QR code to the ZIP
      generatedCoupons.forEach((coupon, index) => {
        if (coupon.qrCodeDataURL) {
          // Convert data URL to blob
          const base64Data = coupon.qrCodeDataURL.split(",")[1];
          folder.file(
            `coupon-${coupon.code || coupon.id || index + 1}.png`,
            base64Data,
            { base64: true },
          );
        }
      });

      // Generate ZIP file and trigger download
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `coupons-${Date.now()}.zip`);
    } catch (err) {
      console.error("Error creating ZIP:", err);
      setError("Failed to download all QR codes. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">

      <CouponStats />

      <GenerateForm
        scannerCount={scannerCount}
        setScannerCount={setScannerCount}
        amount={amount}
        setAmount={setAmount}
        validityDate={validityDate}
        setValidityDate={setValidityDate}
        isGenerating={isGenerating}
        handleGenerateCoupons={handleGenerateCoupons}
      />

      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={success} />

      <CouponFooter
        generatedCoupons={generatedCoupons}
        isGenerating={isGenerating}
        error={error}
        downloadSingleQR={downloadSingleQR}
        downloadAllQRCodes={downloadAllQRCodes}
      />
    </div>
  );
};

export default GenerateCoupon;
