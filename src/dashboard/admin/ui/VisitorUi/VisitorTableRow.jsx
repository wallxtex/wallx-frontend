import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const VisitorTableRow = ({ visitor, index }) => {
  const [expandedAddress, setExpandedAddress] = useState(false);
  const [expandedEnquiry, setExpandedEnquiry] = useState(false);

  // Function to get type badge style
  const getTypeBadge = (type) => {
    const typeUpper = type.toUpperCase();
    switch (typeUpper) {
      case "PAINTER":
        return "bg-orange-100 text-orange-700";
      case "DEALER":
        return "bg-green-100 text-green-700";
      case "CUSTOMER":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const typeBadgeClass = getTypeBadge(visitor.type);

  // Function to truncate text
  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const shouldShowReadMore = (text, maxLength = 50) => {
    return text.length > maxLength;
  };

  return (
    <tr
      className={`hover:bg-blue-50 transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      {/* Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-semibold text-gray-900">{visitor.name}</div>
      </td>

      {/* Type */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${typeBadgeClass}`}
        >
          {visitor.type}
        </span>
      </td>

      {/* Phone */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">
          {visitor.phone}
        </div>
      </td>

      {/* Address */}
      <td className="px-6 py-4 align-top">
        <div className="text-sm text-gray-700 min-w-[200px] max-w-xs">
          <div className="flex-1 min-w-0">
            <p className={`break-words ${expandedAddress ? "" : "line-clamp-2"}`}>
              {visitor.address}
            </p>
            {shouldShowReadMore(visitor.address) && (
              <button
                onClick={() => setExpandedAddress(!expandedAddress)}
                className="text-blue-600 hover:text-blue-800 font-medium mt-1 inline-flex items-center gap-1 text-xs whitespace-nowrap"
              >
                {expandedAddress ? (
                  <>
                    Read Less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </td>

      {/* Enquiry */}
      <td className="px-6 py-4 align-top">
        <div className="text-sm text-gray-700 min-w-[250px] max-w-md">
          <div className="flex-1 min-w-0">
            <p className={`break-words ${expandedEnquiry ? "" : "line-clamp-2"}`}>
              {visitor.enquiry}
            </p>
            {shouldShowReadMore(visitor.enquiry) && (
              <button
                onClick={() => setExpandedEnquiry(!expandedEnquiry)}
                className="text-blue-600 hover:text-blue-800 font-medium mt-1 inline-flex items-center gap-1 text-xs whitespace-nowrap"
              >
                {expandedEnquiry ? (
                  <>
                    Read Less <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </td>

      {/* Visit Date */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-700">
          {new Date(visitor.visitDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </td>
    </tr>
  );
};

export default VisitorTableRow;
