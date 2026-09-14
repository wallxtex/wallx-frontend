import React from "react";
import { Users } from "lucide-react";

const EmptyState = () => {
  return (
    <tr>
      <td colSpan="7" className="px-6 py-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <Users className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No Visitors Found
          </h3>
          <p className="text-sm text-gray-600">
            Try adjusting your filters or search criteria
          </p>
        </div>
      </td>
    </tr>
  );
};

export default EmptyState;
