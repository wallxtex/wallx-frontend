import { motion } from "motion/react";
import { Package, Search, Calendar, ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getDealerOrders } from "../../services/dealers/dealers.services";
import { formatCurrency } from "../../utils/helpers/constants/formatCurrency";
//dealer order
const DealersOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getDealerOrders();
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (error) {
        console.error("Error fetching dealer orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleExportCSV = () => {
    setIsExporting(true);
    
    setTimeout(() => {
      const headers = ["Order ID", "Date", "Product Name", "Quantity", "Price", "Amount", "Amount Received", "Remaining Amount"];
      const csvData = [
        headers.join(","),
        ...currentOrders.map(order => 
          `"${order._id || order.id}","${new Date(order.date).toLocaleDateString('en-GB')}","${order.productName}","${order.quantity}","${order.price}","${order.amount}","${order.amountReceived}","${order.amount - order.amountReceived}"`
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

  const filteredOrders = orders.filter(o => 
    (o._id && o._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (o.productName && o.productName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col pb-12 sm:pb-16">
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
              placeholder="Search Orders..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          <button
            onClick={handleExportCSV}
            disabled={isExporting || orders.length === 0}
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

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#d82b2b]" />
        </div>
      ) : (
        <>
          {/* Orders List Container */}
          <div className="pb-6">
            
            {/* MOBILE VIEW: Cards */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {currentOrders.map((order, idx) => {
                const remainingAmount = order.amount - (order.amountReceived || 0);

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={order._id || idx}
                    className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all flex flex-col gap-4"
                  >
                    <div className="flex items-start gap-4 justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-3 rounded-xl border bg-gray-50 border-gray-200">
                          <Package className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 truncate max-w-[200px]">
                            {order.productName}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(order.date).toLocaleDateString('en-GB')}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">ID: {order._id}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Quantity</p>
                        <p className="font-semibold text-gray-900">{order.quantity}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Price</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(order.price)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Total Amount</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(order.amount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Received</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(order.amountReceived || 0)}</p>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-gray-50">
                        <p className="text-gray-500 text-xs">Remaining Amount</p>
                        <p className={`font-bold text-lg ${remainingAmount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {formatCurrency(remainingAmount)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Empty State Mobile */}
              {currentOrders.length === 0 && (
                <div className="p-8 text-center text-gray-500 font-medium bg-white rounded-2xl border border-gray-100">
                  No orders found.
                </div>
              )}
            </div>

            {/* DESKTOP VIEW: Table */}
            <div className="hidden lg:block bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Quantity</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Price</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Total Amount</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Received</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right bg-gray-50/80">Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order, idx) => {
                      const remainingAmount = order.amount - (order.amountReceived || 0);
                      return (
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.02 }}
                          key={order._id || idx} 
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="font-mono text-xs text-gray-500 truncate max-w-[120px]" title={order._id}>{order._id}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(order.date).toLocaleDateString('en-GB')}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm font-bold text-gray-900">{order.productName}</div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="text-sm font-medium text-gray-700">{order.quantity}</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="text-sm text-gray-700">{formatCurrency(order.price)}</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="font-bold text-gray-900">{formatCurrency(order.amount)}</div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="text-sm text-gray-700">{formatCurrency(order.amountReceived || 0)}</div>
                          </td>
                          <td className="py-4 px-6 text-right bg-gray-50/30">
                            <div className={`font-bold ${remainingAmount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {formatCurrency(remainingAmount)}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Empty State Desktop */}
              {currentOrders.length === 0 && (
                <div className="p-8 text-center text-gray-500 font-medium">
                  No orders found.
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
        </>
      )}
    </div>
  );
};

export default DealersOrders;
