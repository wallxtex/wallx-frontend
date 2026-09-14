import React from "react";
import { Ticket } from "lucide-react";

const CouponHeader = () => {
  return (
    <div className="mb-4 sm:mb-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
        <Ticket className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
        Generate Coupons
      </h1>
      <p className="text-xs sm:text-sm text-gray-600 mt-1">
        Create QR code tokens for scanner devices
      </p>
    </div>
  );
};

export default CouponHeader;