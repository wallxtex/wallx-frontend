import React from "react";

const VisitorTableHeader = () => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
          Visitor Name
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
          Type
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
          Phone
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
          Visit Date
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
          Location
        </th>
      </tr>
    </thead>
  );
};

export default VisitorTableHeader;
