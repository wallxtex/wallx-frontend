import React from "react";
import { Users } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Users className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Visit Enquiries
          </h1>
          <p className="text-sm font-medium text-gray-600 mt-0.5">
            Manage and track visitor details
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
