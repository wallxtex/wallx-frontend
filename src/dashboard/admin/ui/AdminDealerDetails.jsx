import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Plus, Search, Calendar, Package, Wallet, Banknote, CreditCard, Check, X, MapPin, Phone, Mail, Store } from 'lucide-react';
// import { formatCurrency } from '../../../utils/helpers/formatCurrency';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../../utils/helpers/constants/formatCurrency';

const PAYMENT_STATUS_COLORS = {
  'Paid': 'bg-emerald-100 text-emerald-800',
  'Partial': 'bg-blue-100 text-blue-800'
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

const AdminDealerDetails = () => {
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col pb-12 sm:pb-16 min-h-screen bg-gray-50/50">
      
      {/* Header & Back Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <button type="button" 
          onClick={() => navigate('/admin/dealer-page')}
          className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{dealer.name} <span className="text-gray-400 font-medium ml-2">({dealer.shopName})</span></h1>
          <p className="text-sm text-gray-500">View detailed metrics and manage order history.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <Package className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Total Order Value</span>
          </div>
          <div className="text-2xl font-black text-gray-900">{formatCurrency(totalOrderValue)}</div>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-3 text-emerald-700">
            <Wallet className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Total Amount Paid</span>
          </div>
          <div className="text-2xl font-black text-emerald-600">{formatCurrency(totalAmountPaid)}</div>
        </div>
        <div className="bg-amber-50 rounded-xl border border-amber-100 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-3 text-amber-700">
            <Banknote className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Amount Left to Pay</span>
          </div>
          <div className="text-2xl font-black text-amber-600">{formatCurrency(amountLeftToPay)}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-3 text-gray-500">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Last Payment Date</span>
          </div>
          <div className="text-2xl font-black text-gray-900">{lastPaymentDate}</div>
        </div>
      </div>

      {/* Dealer Info Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Dealer Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3 text-gray-600">
            <Phone className="w-4 h-4 mt-0.5 text-[#d82b2b]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Mobile Number</p>
              <p className="text-sm font-semibold text-gray-900">{dealer.mobile}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-gray-600">
            <Mail className="w-4 h-4 mt-0.5 text-[#d82b2b]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Email Address</p>
              <p className="text-sm font-semibold text-gray-900">{dealer.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-gray-600">
            <Store className="w-4 h-4 mt-0.5 text-[#d82b2b]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Shop / Business</p>
              <p className="text-sm font-semibold text-gray-900">{dealer.shopName}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-gray-600">
            <MapPin className="w-4 h-4 mt-0.5 text-[#d82b2b]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-0.5">Location</p>
              <p className="text-sm font-semibold text-gray-900 leading-tight">
                {dealer.area && `${dealer.area}, `}{dealer.location || dealer.city}, {dealer.state} <br/> {dealer.pinCode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Table Header */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Dealer Order History</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b]"
              />
            </div>
            <button type="button" 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#d82b2b] hover:bg-[#b92525] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Order
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Received Date</th>
                <th className="px-6 py-4">Product / Items</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Total Order Value</th>
                <th className="px-6 py-4">Amount Paid</th>
                <th className="px-6 py-4">Remaining Amount</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4">Last Payment Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.receivedDate}</td>
                  <td className="px-6 py-4">
                    <span className="truncate max-w-[200px] inline-block" title={order.products}>{order.products}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{order.quantity}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{formatCurrency(order.totalValue)}</td>
                  <td className="px-6 py-4 text-emerald-600 font-medium">{formatCurrency(order.amountPaid)}</td>
                  <td className="px-6 py-4 text-amber-600 font-medium">{formatCurrency(order.remainingAmount)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      PAYMENT_STATUS_COLORS[order.paymentStatus] || 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{order.lastPaymentDate}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button type="button" 
                        onClick={() => {
                          setSelectedOrder(order);
                          setPaymentAmount('');
                          setRecordPaymentModalOpen(true);
                        }} 
                        disabled={order.paymentStatus === 'Paid'}
                        className={`text-xs font-semibold px-2 py-1 rounded transition-colors border ${
                          order.paymentStatus === 'Paid' 
                            ? 'text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed'
                            : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 border-emerald-200'
                        }`}
                      >
                        Record Payment
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#d82b2b]" />
                  Create New Order
                </h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreateOrder} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Products / Items *</label>
                  <textarea 
                    name="products"
                    value={newOrder.products}
                    onChange={handleInputChange}
                    placeholder="e.g. Premium Emulsion (20L)"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b] resize-none h-20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Quantity *</label>
                  <input 
                    type="number" 
                    name="quantity"
                    value={newOrder.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g. 5"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b]"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Total Order Value (₹) *</label>
                  <input 
                    type="number" 
                    name="totalValue"
                    value={newOrder.totalValue}
                    onChange={handleInputChange}
                    placeholder="e.g. 50000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b]"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Amount Paid Initially (₹)</label>
                  <input 
                    type="number" 
                    name="amountPaid"
                    value={newOrder.amountPaid}
                    onChange={handleInputChange}
                    placeholder="e.g. 10000 (Optional)"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d82b2b]/20 focus:border-[#d82b2b]"
                    min="0"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-[#d82b2b] text-white font-semibold text-sm hover:bg-[#b92525] shadow-sm transition-colors"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  Record Payment
                </h2>
                <button type="button" 
                  onClick={() => {
                    setRecordPaymentModalOpen(false);
                    setSelectedOrder(null);
                  }} 
                  className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 bg-gray-50 border-b border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Recording payment for Order <span className="font-bold text-gray-900">{selectedOrder.id}</span></p>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Value</p>
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(selectedOrder.totalValue)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Remaining</p>
                    <p className="text-lg font-black text-amber-600">{formatCurrency(selectedOrder.remainingAmount)}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleRecordPaymentSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Payment Amount (₹) *</label>
                  <input 
                    type="number" 
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder={`Max ${selectedOrder.remainingAmount}`}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
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
                    className="flex-1 py-2.5 flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-sm transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Confirm Payment
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

export default AdminDealerDetails;
