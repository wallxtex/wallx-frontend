import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Plus, Search, Calendar, Package, Wallet, Banknote, CreditCard, Check, X, MapPin, Phone, Mail, Store, TrendingUp, Activity } from 'lucide-react';
import { formatCurrency } from '../../../utils/helpers/constants/formatCurrency';
import { toast } from 'react-toastify';

const PAYMENT_STATUS_COLORS = {
  'Paid': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Partial': 'bg-blue-100 text-blue-800 border-blue-200',
  'Pending': 'bg-amber-100 text-amber-800 border-amber-200'
};

const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    receivedDate: '2026-09-15',
    products: 'Premium Emulsion (20L), Wall Putty (5kg)',
    quantity: 2,
    totalValue: 45000,
    amountPaid: 45000,
    remainingAmount: 0,
    paymentStatus: 'Paid',
    lastPaymentDate: '2026-09-15',
  },
  {
    id: 'ORD-002',
    receivedDate: '2026-09-10',
    products: 'Exterior Primer (10L)',
    quantity: 1,
    totalValue: 12000,
    amountPaid: 6000,
    remainingAmount: 6000,
    paymentStatus: 'Partial',
    lastPaymentDate: '2026-09-12',
  },
  {
    id: 'ORD-003',
    receivedDate: '2026-09-05',
    products: 'Enamel Gloss (1L)',
    quantity: 20,
    totalValue: 8000,
    amountPaid: 0,
    remainingAmount: 8000,
    paymentStatus: 'Pending',
    lastPaymentDate: '-',
  }
];

const DealerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dealer = location.state?.dealer || { 
    name: `Dealer #${id}`, 
    shopName: 'Unknown Shop', 
    mobile: 'N/A', 
    email: 'N/A', 
    location: 'N/A',
    state: 'N/A', 
    pinCode: 'N/A',
    area: 'N/A'
  };

  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Record Payment State
  const [recordPaymentModalOpen, setRecordPaymentModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  // New Order Form State
  const [newOrder, setNewOrder] = useState({
    products: '',
    quantity: '',
    totalValue: '',
    amountPaid: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newOrder.products || !newOrder.quantity || !newOrder.totalValue) {
      toast.error('Please fill in required fields');
      return;
    }

    const total = Number(newOrder.totalValue);
    const qty = Number(newOrder.quantity);
    const paid = Number(newOrder.amountPaid) || 0;
    const remaining = total - paid;
    let status = 'Pending';
    if (paid >= total) status = 'Paid';
    else if (paid > 0) status = 'Partial';

    const orderEntry = {
      id: `ORD-00${orders.length + 1}`,
      receivedDate: new Date().toISOString().split('T')[0],
      products: newOrder.products,
      quantity: qty,
      totalValue: total,
      amountPaid: paid,
      remainingAmount: remaining,
      paymentStatus: status,
      lastPaymentDate: paid > 0 ? new Date().toISOString().split('T')[0] : '-',
    };

    setOrders([orderEntry, ...orders]);
    setIsModalOpen(false);
    setNewOrder({ products: '', quantity: '', totalValue: '', amountPaid: '' });
    toast.success('New order created successfully!');
  };

  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    const amount = Number(paymentAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (amount > selectedOrder.remainingAmount) {
      toast.error('Payment cannot exceed remaining amount');
      return;
    }

    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrder.id) {
        const newPaid = order.amountPaid + amount;
        const newRemaining = order.totalValue - newPaid;
        let status = 'Pending';
        if (newPaid >= order.totalValue) status = 'Paid';
        else if (newPaid > 0) status = 'Partial';
        
        return {
          ...order,
          amountPaid: newPaid,
          remainingAmount: newRemaining,
          paymentStatus: status,
          lastPaymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    setRecordPaymentModalOpen(false);
    setSelectedOrder(null);
    setPaymentAmount('');
    toast.success('Payment recorded successfully!');
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.products.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate Metrics
  const totalOrderValue = orders.reduce((sum, order) => sum + order.totalValue, 0);
  const totalAmountPaid = orders.reduce((sum, order) => sum + order.amountPaid, 0);
  const amountLeftToPay = orders.reduce((sum, order) => sum + order.remainingAmount, 0);
  
  // Find latest payment date
  const paymentDates = orders.map(o => o.lastPaymentDate).filter(d => d !== '-').sort();
  const lastPaymentDate = paymentDates.length > 0 ? paymentDates[paymentDates.length - 1] : 'N/A';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col pb-12 sm:pb-16 min-h-screen bg-[#fafafa]">
      
      {/* Header & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <motion.button 
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/dealer-page')}
            className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 text-gray-700 transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex flex-wrap items-center gap-2">
              Dealer Profile
              <span className="bg-[#d82b2b]/10 text-[#d82b2b] text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-bold">Active</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage dealer performance, orders, and financials.</p>
          </div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        {/* Dealer Identity Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d82b2b]/10 to-transparent rounded-bl-[100px] -z-0 transition-transform duration-500 group-hover:scale-110" />
          
          <div className="relative z-10 flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#d82b2b] to-[#ff5e5e] text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-[#d82b2b]/30 mb-4 transform -rotate-3 transition-transform duration-300 group-hover:rotate-0">
              {dealer.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{dealer.name}</h2>
            <p className="text-sm font-medium text-[#d82b2b] mt-1 flex items-center justify-center gap-1.5">
              <Store className="w-4 h-4" />
              {dealer.shopName}
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
              <Phone className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{dealer.mobile}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
              <Mail className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
                <p className="text-sm font-semibold text-gray-800 truncate">{dealer.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Address</p>
                <p className="text-sm font-semibold text-gray-800 leading-snug">
                  {dealer.area && `${dealer.area}, `}{dealer.location || dealer.city}, {dealer.state} - {dealer.pinCode}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Financial Metrics Grid */}
        <motion.div variants={itemVariants} className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.15)] transition-all group relative overflow-hidden">
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
             <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <Activity className="w-5 h-5 text-gray-300" />
             </div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 relative z-10">Total Order Value</p>
             <h3 className="text-3xl font-black text-gray-900 tracking-tight relative z-10">{formatCurrency(totalOrderValue)}</h3>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-6 shadow-[0_8px_30px_-12px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.5)] transition-all group relative overflow-hidden text-white">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px] -z-0 transition-transform duration-500 group-hover:scale-110" />
             <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
                <TrendingUp className="w-5 h-5 text-white/50" />
             </div>
             <p className="text-sm font-bold text-white/80 uppercase tracking-wider mb-1 relative z-10">Total Amount Paid</p>
             <h3 className="text-3xl font-black text-white tracking-tight relative z-10">{formatCurrency(totalAmountPaid)}</h3>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_-12px_rgba(245,158,11,0.15)] transition-all group relative overflow-hidden">
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />
             <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Banknote className="w-6 h-6" />
                </div>
             </div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 relative z-10">Amount Left to Pay</p>
             <h3 className="text-3xl font-black text-amber-600 tracking-tight relative z-10">{formatCurrency(amountLeftToPay)}</h3>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.15)] transition-all group relative overflow-hidden">
             <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
             <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
             </div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 relative z-10">Last Payment Date</p>
             <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight relative z-10 mt-1">{lastPaymentDate}</h3>
          </div>
        </motion.div>
      </motion.div>

      {/* Order History Section */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] overflow-hidden"
      >
        <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white">
          <div className="w-full">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Order History</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Review past orders and track pending payments.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search products or IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b] bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-[#d82b2b] hover:bg-[#b92525] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap transition-colors shadow-md shadow-[#d82b2b]/20"
            >
              <Plus className="w-4 h-4" />
              New Order
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-500 font-bold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4">Qty</th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4">Amount Paid</th>
                <th className="px-6 py-4">Remaining</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 font-medium">{order.receivedDate}</td>
                  <td className="px-6 py-4">
                    <span className="truncate max-w-[180px] inline-block font-medium" title={order.products}>{order.products}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700 bg-gray-50/50">{order.quantity}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(order.totalValue)}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600 bg-emerald-50/30">{formatCurrency(order.amountPaid)}</td>
                  <td className="px-6 py-4 font-bold text-amber-600 bg-amber-50/30">{formatCurrency(order.remainingAmount)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      PAYMENT_STATUS_COLORS[order.paymentStatus] || 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button type="button" 
                      onClick={() => {
                        setSelectedOrder(order);
                        setPaymentAmount('');
                        setRecordPaymentModalOpen(true);
                      }} 
                      disabled={order.paymentStatus === 'Paid'}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        order.paymentStatus === 'Paid' 
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed opacity-50'
                          : 'text-emerald-600 hover:text-emerald-50 hover:bg-emerald-600 border border-emerald-200 hover:border-transparent'
                      }`}
                    >
                      Record Payment
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search className="w-10 h-10 mb-3 opacity-50" />
                      <p className="text-base font-medium text-gray-500">No orders found.</p>
                      <p className="text-sm mt-1">Try adjusting your search criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Create New Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 shrink-0">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#d82b2b]/10 text-[#d82b2b] flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  New Order
                </h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreateOrder} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Products / Items *</label>
                  <textarea 
                    name="products"
                    value={newOrder.products}
                    onChange={handleInputChange}
                    placeholder="e.g. Premium Emulsion (20L)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b] resize-none h-24 bg-gray-50 hover:bg-white transition-colors"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Quantity *</label>
                    <input 
                      type="number" 
                      name="quantity"
                      value={newOrder.quantity}
                      onChange={handleInputChange}
                      placeholder="e.g. 5"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b] bg-gray-50 hover:bg-white transition-colors"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Total Value (₹) *</label>
                    <input 
                      type="number" 
                      name="totalValue"
                      value={newOrder.totalValue}
                      onChange={handleInputChange}
                      placeholder="e.g. 50000"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b] bg-gray-50 hover:bg-white transition-colors"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Amount Paid Initially (₹)</label>
                  <input 
                    type="number" 
                    name="amountPaid"
                    value={newOrder.amountPaid}
                    onChange={handleInputChange}
                    placeholder="e.g. 10000 (Optional)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b] bg-gray-50 hover:bg-white transition-colors"
                    min="0"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 flex items-center justify-center gap-2 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 flex items-center justify-center gap-2 rounded-xl bg-[#d82b2b] text-white font-bold text-sm hover:bg-[#b92525] shadow-md shadow-[#d82b2b]/20 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    Save Order
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Record Payment Modal */}
      <AnimatePresence>
        {recordPaymentModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 shrink-0">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Banknote className="w-4 h-4" />
                  </div>
                  Record Payment
                </h2>
                <button type="button" 
                  onClick={() => {
                    setRecordPaymentModalOpen(false);
                    setSelectedOrder(null);
                  }} 
                  className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 sm:p-6 bg-emerald-50/50 border-b border-emerald-100 overflow-y-auto">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Order {selectedOrder.id}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Value</p>
                    <p className="text-base font-semibold text-gray-900">{formatCurrency(selectedOrder.totalValue)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Remaining to Pay</p>
                    <p className="text-2xl font-black text-amber-600">{formatCurrency(selectedOrder.remainingAmount)}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleRecordPaymentSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Amount (₹) *</label>
                  <input 
                    type="number" 
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder={`Max ${selectedOrder.remainingAmount}`}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50 hover:bg-white transition-colors"
                    required
                    min="1"
                    max={selectedOrder.remainingAmount}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setRecordPaymentModalOpen(false);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 py-3 flex items-center justify-center gap-2 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    Confirm
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DealerDetails;
