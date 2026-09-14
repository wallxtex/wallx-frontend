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
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Generated QR Codes ({generatedCoupons.length})
            </h2>
            <button
              onClick={downloadAllQRCodes}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <DownloadCloud className="w-4 h-4" />
              Download All
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {generatedCoupons.map((coupon, index) => (
              <div
                key={coupon.id || index}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow duration-200 bg-gray-50"
              >
                {/* QR Code Image */}
                {coupon.qrCodeDataURL && (
                  <div className="bg-white p-2 sm:p-3 rounded-lg mb-2 sm:mb-3">
                    <img
                      src={coupon.qrCodeDataURL}
                      alt={`QR Code ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Coupon Info */}
                <div className="mb-2 sm:mb-3">
                  <p className="text-xs text-gray-500 mb-1">Coupon Code</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 font-mono break-all">
                    {coupon.code ||
                      coupon.token ||
                      coupon.id ||
                      `COUPON-${index + 1}`}
                  </p>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => downloadSingleQR(coupon, index)}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {generatedCoupons.length === 0 && !isGenerating && !error && (
        <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">
          <Ticket className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            No Coupons Generated Yet
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Enter the number of scanners above and click "Generate" to create QR
            codes.
          </p>
        </div>
      )}
    </div>
  );
};

export default CouponFooter;
