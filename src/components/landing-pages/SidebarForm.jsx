import { useState, useEffect } from "react";
import logo from "../../assets/webp/wallx_final.webp";

const SidebarForm = ({ isOpen, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Prevent background scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Sidebar Form Details:", data);
    setShowSuccess(true);
    e.target.reset();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-[200] w-full sm:w-[400px] md:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 sm:p-6 relative min-h-full flex flex-col">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {showSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
              <p className="text-gray-600 mb-8">Your enquiry has been submitted successfully.</p>
              <button 
                onClick={() => {
                  setShowSuccess(false);
                  onClose();
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 sm:py-4 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
              
              <div className="flex flex-col justify-center py-4 sm:py-6">
                <div className="flex justify-center mb-6 mt-4">
                  <img src={logo} alt="WallX Logo" className="h-10 sm:h-12 w-auto object-contain" />
                </div>
                <div className="mb-6 text-center">
                  <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-2">Let our experts help you!</h2>
                  <p className="text-gray-600 text-[10px] sm:text-xs">Please fill out the form below and our team will get back to you.</p>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <input type="text" name="name" required pattern="[A-Za-z ]+" title="Only letters and spaces are allowed" onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ''); }} placeholder="Enter your name" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-sm" />
                  <input type="email" name="email" required pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.in)$" title="Please enter a valid @gmail.com or .in email address" placeholder="Enter your Email" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-sm" />
                  <input type="tel" name="mobile" required pattern="[0-9]{10}" maxLength="10" title="Please enter exactly 10 digits" onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ''); }} placeholder="Enter mobile number" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-sm" />
                  <input type="text" name="address" required pattern="[A-Za-z0-9 ]+" title="Only letters, numbers, and spaces are allowed" onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, ''); }} placeholder="Enter your Address" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-sm" />
                  <textarea name="query" placeholder="Enter your query or comment (optional)" rows="3" onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, ''); }} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-sm resize-none"></textarea>
                </div>

                <div className="mt-5">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 mb-3">I am a: <span className="text-red-600">*</span></p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-red-300 transition-all">
                      <input type="radio" required name="user_type" value="painter" className="w-3 h-3 text-red-600 focus:ring-red-500" />
                      <span className="text-xs font-medium text-gray-900">Painter</span>
                    </label>
                    <label className="flex-1 flex items-center gap-2 cursor-pointer p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-red-300 transition-all">
                      <input type="radio" required name="user_type" value="dealer" className="w-3 h-3 text-red-600 focus:ring-red-500" />
                      <span className="text-xs font-medium text-gray-900">Dealer</span>
                    </label>
                    <label className="flex-1 flex items-center gap-2 cursor-pointer p-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-red-300 transition-all">
                      <input type="radio" required name="user_type" value="customer" className="w-3 h-3 text-red-600 focus:ring-red-500" />
                      <span className="text-xs font-medium text-gray-900">Customer</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_25px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2">
                  Book FREE Site Visit <span className="text-lg leading-none">&rarr;</span>
                </button>

                <p className="text-[9px] sm:text-[10px] text-gray-500 leading-relaxed mt-3 text-center">
                  By proceeding, I authorize WallX and its authorized contractors/partners to contact me via WhatsApp, phone calls, SMS and e-mail and I agree to the <a href="#" className="text-blue-600 font-medium hover:underline">Terms &amp; Conditions</a> and <a href="#" className="text-blue-600 font-medium hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarForm;
