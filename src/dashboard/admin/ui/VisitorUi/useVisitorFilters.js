import { useState, useMemo, useEffect } from "react";

const useVisitorFilters = (visitors, itemsPerPage = 10) => {
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate counts
  const counts = useMemo(() => {
    return {
      all: visitors.length,
      painters: visitors.filter((v) => v.type === "Painter").length,
      dealers: visitors.filter((v) => v.type === "Dealer").length,
    };
  }, [visitors]);

  // Filter logic
  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) => {
      // Type filter
      const typeMatch = selectedType === "All" || visitor.type === selectedType;

      // Search filter (name, phone, email)
      const searchMatch =
        searchQuery === "" ||
        visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.phone.includes(searchQuery) ||
        visitor.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Date filter
      const dateMatch =
        selectedDate === "" || visitor.visitDate === selectedDate;

      return typeMatch && searchMatch && dateMatch;
    });
  }, [visitors, selectedType, searchQuery, selectedDate]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);
  const paginatedVisitors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVisitors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVisitors, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, searchQuery, selectedDate]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDate("");
  };

  return {
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
  };
};

export default useVisitorFilters;
