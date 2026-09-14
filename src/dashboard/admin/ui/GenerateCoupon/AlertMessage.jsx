import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const AlertMessage = ({ type, message }) => {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className={`${
        isError ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
      } border rounded-lg p-4 mb-6 flex items-start gap-3`}
    >
      {isError ? (
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <h3
          className={`text-sm font-semibold ${
            isError ? "text-red-800" : "text-green-800"
          }`}
        >
          {isError ? "Error" : "Success"}
        </h3>
        <p
          className={`text-sm ${
            isError ? "text-red-700" : "text-green-700"
          } mt-1`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default AlertMessage;
