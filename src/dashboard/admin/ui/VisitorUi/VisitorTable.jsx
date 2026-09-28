import React from "react";
import VisitorTableHeader from "./VisitorTableHeader";
import VisitorTableRow from "./VisitorTableRow";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

const VisitorTable = ({
  visitors,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[150px]" /> {/* Name */}
            <col className="w-[120px]" /> {/* Type */}
            <col className="w-[140px]" /> {/* Phone */}
            <col className="w-[250px]" /> {/* Address */}
            <col className="w-[300px]" /> {/* Enquiry */}
            <col className="w-[140px]" /> {/* Visit Date */}
          </colgroup>
          <VisitorTableHeader />
          <tbody className="divide-y divide-gray-200">
            {visitors.length > 0 ? (
              visitors.map((visitor, index) => (
                <VisitorTableRow
                  key={visitor.id}
                  visitor={visitor}
                  index={index}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default VisitorTable;
