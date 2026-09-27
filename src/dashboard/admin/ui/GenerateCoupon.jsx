import React, { useState, useEffect } from "react";
import CouponStats from "./GenerateCoupon/CouponStats";
import GenerateForm from "./GenerateCoupon/GenerateForm";
import AlertMessage from "./GenerateCoupon/AlertMessage";
import CouponBatchesList from "./GenerateCoupon/CouponBatchesList";
import { getCouponStats, generateCoupons as generateCouponsApi, getCouponBatches, downloadCouponBatchPdf } from "../../../services/admin/admin.services";

const GenerateCoupon = () => {
  const [scannerCount, setScannerCount] = useState("");
  const [amount, setAmount] = useState("");
  const [validityDate, setValidityDate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCoupons, setGeneratedCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [stats, setStats] = useState({});
  const [batches, setBatches] = useState([]);
  const [isFetchingBatches, setIsFetchingBatches] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsFetchingBatches(true);
    try {
      const [statsRes, batchesRes] = await Promise.all([
        getCouponStats(),
        getCouponBatches()
      ]);
      
      if (statsRes.success) {
        setStats(statsRes.data.data || statsRes.data);
      }
      if (batchesRes.success) {
        setBatches(batchesRes.data.data || batchesRes.data.batches || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsFetchingBatches(false);
    }
  };

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

    const validityDays = Math.ceil((new Date(validityDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (validityDays <= 0) {
      setError("Validity date must be in the future");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccess(null);
    setGeneratedCoupons([]);

    try {
      // Call backend API
      const response = await generateCouponsApi({
        quantity: count,
        amount: Number(amount),
        validityDays,
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to generate coupons");
      }

      // Assuming backend returns: { success: true, data: [{ id, token, code }, ...] }
      // Wait, the backend generateCoupons returns batch info, but doesn't return the list of individual coupons!
      // To show QRs immediately, we'd need to fetch the newly generated batch's coupons.
      // But instead of doing that, let's just show success and refresh the batch list.
      setSuccess(`Successfully generated ${count} coupon(s)!`);
      setScannerCount(""); 
      setAmount("");
      setValidityDate("");
      
      // Refresh the table
      fetchData();
    } catch (err) {
      console.error("Error generating coupons:", err);
      setError(err.message || "Failed to generate coupons. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async (batchId) => {
    try {
      const response = await downloadCouponBatchPdf(batchId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `coupon-batch-${batchId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download PDF", err);
      setError("Failed to download PDF");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">

      <CouponStats stats={stats} />

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

      <CouponBatchesList 
        batches={batches}
        isLoading={isFetchingBatches}
        onDownloadPDF={handleDownloadPDF}
      />
    </div>
  );
};

export default GenerateCoupon;

