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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
