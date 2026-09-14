import React from "react";
import {
  PaintBucket,
  Store,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  MapPin,
} from "lucide-react";

const VisitorTableRow = ({ visitor, index }) => {
  return (
    <tr
      className={`hover:bg-blue-50 transition-colors ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-semibold text-gray-900">{visitor.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            visitor.type === "Painter"
              ? "bg-orange-100 text-orange-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {visitor.type === "Painter" ? (
            <PaintBucket className="w-3 h-3" />
          ) : (
            <Store className="w-3 h-3" />
          )}
          {visitor.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Phone className="w-4 h-4 text-gray-400" />
          {visitor.phone}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Mail className="w-4 h-4 text-gray-400" />
          {visitor.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400" />
          {new Date(visitor.visitDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            visitor.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {visitor.status === "Active" ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <XCircle className="w-3 h-3" />
          )}
          {visitor.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          {visitor.location}
        </div>
      </td>
    </tr>
  );
};

export default VisitorTableRow;
