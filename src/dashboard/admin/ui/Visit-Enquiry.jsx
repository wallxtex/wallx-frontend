import React, { useState, useEffect } from "react";
import { getEnquiries, getEnquiryStats } from "../../../services/publicforms/Enquiry";
import PageHeader from "./VisitorUi/PageHeader";
import FilterCards from "./VisitorUi/FilterCards";
import SearchFilters from "./VisitorUi/SearchFilters";
import VisitorTable from "./VisitorUi/VisitorTable";
import { createFilterCards } from "./VisitorUi/filterCardsConfig";

const VisitEnquiry = () => {
  const itemsPerPage = 10;

  // State for enquiries and stats
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    dealers: 0,
    painters: 0,
    customers: 0,
  });
  const [loading, setLoading] = useState(true);
  
  // State for filters and pagination
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch stats
      const statsResult = await getEnquiryStats();
      console.log("Stats Result:", statsResult); // Debug log
      if (statsResult.success) {
        // Handle the correct data structure: statsResult.data contains the response
        const statsData = statsResult.data?.data || statsResult.data;
        console.log("Stats Data:", statsData); // Debug log
        setStats({
          totalEnquiries: statsData.totalEnquiries || 0,
          dealers: statsData.dealers || 0,
          painters: statsData.painters || 0,
          customers: statsData.customers || 0,
        });
      }

      // Fetch all enquiries (adjust limit if needed)
      const enquiriesResult = await getEnquiries(1, 1000);
      console.log("Enquiries Result:", enquiriesResult); // Debug log
      if (enquiriesResult.success) {
        // Handle both possible data structures
        const enquiriesData = enquiriesResult.data?.data?.enquiries || 
                             enquiriesResult.data?.enquiries || 
                             [];
        console.log("Enquiries Data:", enquiriesData); // Debug log
        
        // Transform backend data to match frontend format
        const transformedEnquiries = enquiriesData.map((enquiry) => ({
          id: enquiry._id,
          name: enquiry.name || "N/A",
          type: enquiry.role || "CUSTOMER", // DEALER, PAINTER, CUSTOMER
          phone: enquiry.mobile || "N/A",
          address: enquiry.address || "N/A",
          enquiry: enquiry.enquiry || "No message",
          visitDate: enquiry.date || enquiry.createdAt || new Date().toISOString(),
        }));
        setEnquiries(transformedEnquiries);
      }
    } catch (error) {
      console.error("Failed to fetch enquiry data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter enquiries
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesType =
      selectedType.toLowerCase() === "all" || 
      enquiry.type.toLowerCase() === selectedType.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.phone.includes(searchQuery) ||
      enquiry.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.enquiry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      selectedDate === "" ||
      new Date(enquiry.visitDate).toISOString().split("T")[0] === selectedDate;
    return matchesType && matchesSearch && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Counts for filter cards
  const counts = {
    all: stats.totalEnquiries,
    painter: stats.painters,
    dealer: stats.dealers,
    customer: stats.customers,
  };

  const filterCards = createFilterCards(counts);

  // Clear filters
  const clearFilters = () => {
    setSelectedType("All");
    setSearchQuery("");
    setSelectedDate("");
    setCurrentPage(1);
  };

  // Export to CSV function
  // Export to CSV function
  const exportToCSV = () => {
    if (filteredEnquiries.length === 0) {
      alert("No data to export");
      return;
    }

    // CSV Headers
    const headers = ["Name", "Type", "Phone", "Address", "Enquiry", "Visit Date"];
    
    // CSV Rows
    const rows = filteredEnquiries.map(enquiry => [
      enquiry.name,
      enquiry.type,
      enquiry.phone,
      enquiry.address,
      enquiry.enquiry,
      new Date(enquiry.visitDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
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
    const filterType = selectedType.toLowerCase() === "all" ? "All-Visitors" : selectedType;
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d82b2b] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

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
        filteredCount={filteredEnquiries.length}
        onClearFilters={clearFilters}
        onExport={exportToCSV}
        selectedType={selectedType}
      />
      <VisitorTable
        visitors={paginatedEnquiries}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredEnquiries.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default VisitEnquiry;
