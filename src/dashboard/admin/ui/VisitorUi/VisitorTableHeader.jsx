import React from "react";

const VisitorTableHeader = () => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider align-top">
          Visitor Name
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider align-top">
          Type
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider align-top">
          Phone
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider align-top">
          Address
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider align-top">
          Enquiry
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider align-top">
          Visit Date
        </th>
      </tr>
    </thead>
  );
};

export default VisitorTableHeader;
