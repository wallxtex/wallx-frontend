import React from "react";
import { Download, Ticket, DownloadCloud } from "lucide-react";

const CouponFooter = ({
  generatedCoupons,
  isGenerating,
  error,
  downloadSingleQR,
  downloadAllQRCodes,
}) => {
  return (
    <div>
      {generatedCoupons.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Generated QR Codes ({generatedCoupons.length})
            </h2>
            <button
              onClick={downloadAllQRCodes}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <DownloadCloud className="w-4 h-4" />
              Download All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {generatedCoupons.map((coupon, index) => (
              <div
                key={coupon.id || index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gray-50"
              >
                {/* QR Code Image */}
                {coupon.qrCodeDataURL && (
                  <div className="bg-white p-3 rounded-lg mb-3">
                    <img
                      src={coupon.qrCodeDataURL}
                      alt={`QR Code ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Coupon Info */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Coupon Code</p>
                  <p className="text-sm font-bold text-gray-900 font-mono break-all">
                    {coupon.code ||
                      coupon.token ||
                      coupon.id ||
                      `COUPON-${index + 1}`}
                  </p>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => downloadSingleQR(coupon, index)}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {generatedCoupons.length === 0 && !isGenerating && !error && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Coupons Generated Yet
          </h3>
          <p className="text-sm text-gray-600">
            Enter the number of scanners above and click "Generate" to create QR
            codes.
          </p>
        </div>
      )}
    </div>
  );
};

export default CouponFooter;
