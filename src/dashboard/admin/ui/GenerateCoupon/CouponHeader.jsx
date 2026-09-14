import React from "react";
import { Ticket } from "lucide-react";

const CouponHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <Ticket className="w-8 h-8 text-blue-600" />
        Generate Coupons
      </h1>
      <p className="text-sm text-gray-600 mt-1">
        Create QR code tokens for scanner devices
      </p>
    </div>
  );
};

export default CouponHeader;