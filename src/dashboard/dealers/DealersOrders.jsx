import { motion } from "motion/react";
import { Package, Search, Calendar, CheckCircle2, Clock, Truck, ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";
import { useState } from "react";

// Generate more mock data for pagination
const generateMockOrders = () => {
  const statuses = ["Delivered", "In Transit", "Processing"];
  const products = ["Luxury Emulsion", "Premium Texture", "Primer Base", "Mixed Batch", "Exterior Weatherproof"];
  const orders = [];
  
  for (let i = 1; i <= 150; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const units = Math.floor(Math.random() * 200) + 20;
    const total = units * 3000;
    
    // Generate dates working backwards from today
    const date = new Date(2026, 8, 15);
    date.setDate(date.getDate() - i * 2);
    const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    orders.push({
      id: `ORD-2026-${8000 + i}`,
      date: dateStr,
      status: status,
      items: `${units} Units (${product})`,
      total: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total),
    });
  }
  return orders;
};

const MOCK_ORDERS = generateMockOrders();

const DealersOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = () => {
    setIsExporting(true);
    
    // Simulate API delay for loading state
    setTimeout(() => {
      const headers = ["Order ID", "Date", "Status", "Items", "Total Amount"];
      const csvData = [
        headers.join(","),
        ...currentOrders.map(order => 
          `"${order.id}","${order.date}","${order.status}","${order.items}","${order.total}"`
        )
      ].join("\n");

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `wallx_orders_${new Date().getTime()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(false);
    }, 800);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2, border: "border-emerald-200" };
      case "In Transit":
        return { color: "text-blue-600", bg: "bg-blue-50", icon: Truck, border: "border-blue-200" };
      case "Processing":
        return { color: "text-amber-600", bg: "bg-amber-50", icon: Clock, border: "border-amber-200" };
      default:
        return { color: "text-gray-600", bg: "bg-gray-50", icon: Package, border: "border-gray-200" };
    }
  };

  const filteredOrders = MOCK_ORDERS.filter(o => o.id.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col pb-12 sm:pb-16">
      {/* Page Heading */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black">
            Purchase Orders
          </h1>
          <p className="text-sm text-gray-500 font-medium" style={{ fontFamily: "'Noto Sans Devanagari', system-ui, sans-serif" }}>
            खरीद आदेश
          </p>
        </div>

        {/* Search & Export */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b] sm:text-sm transition-all shadow-sm"
              placeholder="Search Order ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          <button
            onClick={handleExportCSV}
            disabled={isExporting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            ) : (
              <Download className="w-4 h-4 text-gray-500" />
            )}
            <span className="text-sm">{isExporting ? "Exporting..." : "Export CSV"}</span>
          </button>
        </div>
      </div>

      {/* Orders List Container */}
      <div className="pb-6">
        
        {/* MOBILE VIEW: Cards */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {currentOrders.map((order, idx) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={order.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Order Info Left */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${statusConfig.bg} ${statusConfig.border}`}>
                    <Package className={`w-6 h-6 ${statusConfig.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                      {order.id}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{order.items}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] sm:text-xs font-medium text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {order.date}
                    </div>
                  </div>
                </div>

                {/* Order Info Right */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                  <div className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                    {order.total}
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-0 sm:mt-2 ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}>
                    <StatusIcon className="w-3 h-3" />
                    {order.status}
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Empty State Mobile */}
          {currentOrders.length === 0 && (
            <div className="p-8 text-center text-gray-500 font-medium bg-white rounded-2xl border border-gray-100">
              No orders found matching your search.
            </div>
          )}
        </div>

        {/* DESKTOP VIEW: Table */}
        <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, idx) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    key={order.id} 
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{order.id}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {order.date}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-700">{order.items}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}>
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="font-black text-gray-900">{order.total}</div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          
          {/* Empty State Desktop */}
          {currentOrders.length === 0 && (
            <div className="p-8 text-center text-gray-500 font-medium">
              No orders found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredOrders.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of <span className="font-medium text-gray-900">{filteredOrders.length}</span> results
            </p>
            
            {/* Items Per Page Dropdown */}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
              <span className="text-sm text-gray-500 hidden sm:inline whitespace-nowrap">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="block w-full py-1.5 pl-2 pr-6 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#d82b2b] focus:border-[#d82b2b] text-gray-700 cursor-pointer shadow-sm"
              >
                {[10, 25, 50, 100].map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-gray-700 px-2 sm:px-4">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealersOrders;
