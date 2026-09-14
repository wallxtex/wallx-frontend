import React from "react";
import { mockVisitors } from "../../admin/ui/data/MockDataOfVisitor";
import PageHeader from "./VisitorUi/PageHeader";
import FilterCards from "./VisitorUi/FilterCards";
import SearchFilters from "./VisitorUi/SearchFilters";
import VisitorTable from "./VisitorUi/VisitorTable";
import useVisitorFilters from "./VisitorUi/useVisitorFilters";
import { createFilterCards } from "./VisitorUi/filterCardsConfig";

const VisitEnquiry = () => {
  const itemsPerPage = 10;

  const {
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    currentPage,
    setCurrentPage,
    counts,
    filteredVisitors,
    paginatedVisitors,
    totalPages,
    clearFilters,
  } = useVisitorFilters(mockVisitors, itemsPerPage);

  const filterCards = createFilterCards(counts);

  // Export to CSV function
  const exportToCSV = () => {
    if (filteredVisitors.length === 0) {
      alert("No data to export");
      return;
    }

    // CSV Headers
    const headers = ["Name", "Type", "Phone", "Email", "Visit Date", "Status", "Location"];
    
    // CSV Rows
    const rows = filteredVisitors.map(visitor => [
      visitor.name,
      visitor.type,
      visitor.phone,
      visitor.email,
      new Date(visitor.visitDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      visitor.status,
      visitor.location
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    // Generate filename based on filter with correct date format
    const filterType = selectedType === "all" ? "All-Visitors" : selectedType;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const filename = `${filterType}-${timestamp}.csv`;
    
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <PageHeader />
      <FilterCards
        filterCards={filterCards}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        filteredCount={filteredVisitors.length}
        onClearFilters={clearFilters}
        onExport={exportToCSV}
        selectedType={selectedType}
      />
      <VisitorTable
        visitors={paginatedVisitors}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredVisitors.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default VisitEnquiry;
