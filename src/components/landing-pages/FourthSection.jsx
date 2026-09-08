import { useRef, useState } from "react";
import { IoChevronDown as ChevronDown } from "react-icons/io5";
import fullWidthVideo from "../../assets/see_provide_me_a_video_where_w.mp4";
import { useSectionAnimation } from "./useSectionAnimation";

const FourthSection = () => {
  const headerRef = useRef(null);
  const faqsRef = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const faqs = [
    {
      question: "What is WallX and how does it work?",
      answer:
        "WallX is a premium rustic wall-finish solution designed to transform ordinary surfaces into textured, character-rich walls while providing protection against moisture and seepage. Simply apply it to your walls following our application guide for professional results.",
    },
    {
      question: "Is WallX suitable for all types of walls?",
      answer:
        "WallX works excellently on most interior and exterior surfaces including cement, plaster, and brick walls. It's ideal for both residential and commercial applications. We recommend consulting our experts for specific surface conditions.",
    },
    {
      question: "How long does a WallX application last?",
      answer:
        "With proper application and maintenance, WallX finishes typically last 8-10 years. The longevity depends on environmental factors, humidity levels, and wall maintenance. Our premium coating offers enhanced durability.",
    },
    {
      question: "What makes WallX different from other wall finishes?",
      answer:
        "WallX combines aesthetic appeal with functional protection. Our unique formula provides authentic rustic textures while offering superior moisture resistance and seepage protection. It's crafted for longevity and visual beauty.",
    },
    {
      question: "Can I apply WallX myself or do I need a professional?",
      answer:
        "While WallX can be applied by experienced DIY enthusiasts, we highly recommend professional application for optimal results. Our certified painters ensure perfect texture, uniform coverage, and maximum durability.",
    },
    {
      question: "What is your warranty coverage?",
      answer:
        "WallX comes with a comprehensive warranty covering material defects and application quality. Coverage varies by product type and application method. Contact our team for detailed warranty terms and conditions.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section className="w-full bg-white pt-16 md:pt-24 lg:pt-32">
      <div className="w-full h-auto flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-4xl">
          {/* Section Header - Centered */}
          <div
            ref={headerRef}
            className="w-full text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-tight mb-4 md:mb-6 lg:mb-8">
              Frequently Asked <span className="text-red-500">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about WallX and our services.
            </p>
          </div>

          {/* FAQs Container - Centered */}
          <div className="w-full space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 mb-12 md:mb-16 lg:mb-20">
            {faqs.map((faq, index) => (
              <div
                key={`faq-${index}`}
                ref={(el) => {
                  if (el) faqsRef.current[index] = el;
                }}
                className="w-full bg-white rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-gray-200 hover:border-red-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 lg:p-8 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black leading-tight">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-red-500 shrink-0 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Answer - Smooth Expansion */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? "max-h-full" : "max-h-0"
                    }`}
                >
                  <div className="px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-8 border-t border-gray-200 bg-gray-50">
                    <p className="text-xs sm:text-sm md:text-base lg:text-base text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Width Video Section with Form Overlay */}
      <div className="relative w-full flex items-center justify-center py-8 sm:py-12 md:py-0 md:block md:h-[60vh] lg:h-[65vh] mt-12 md:mt-16 lg:mt-20 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover block z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={fullWidthVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Form */}
        <div className="relative md:absolute md:top-1/2 w-[calc(100%-2rem)] sm:w-[450px] md:right-12 lg:right-24 md:-translate-y-1/2 md:w-[500px] lg:w-[550px] xl:w-[600px] bg-white/75 backdrop-blur-md shadow-2xl border border-white/50 z-10 rounded-none overflow-hidden mx-auto md:mx-0 md:ml-auto">

          {/* Top Contact Banner */}
          <div className="w-full bg-white/40 py-1.5 sm:py-3 px-4 sm:px-6 flex justify-center items-center border-b border-gray-200/50">
            <span className="text-gray-700 text-xs sm:text-base font-medium flex items-center gap-1.5 sm:gap-2">
              Call us for Services
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span className="text-green-600 font-bold">1800-209-XXXX</span>
            </span>
          </div>

          <div className="p-2.5 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Let our experts help you!</h2>
            <form className="flex flex-col gap-2 sm:gap-3" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());
              console.log("Form Details:", data);
              setShowSuccessModal(true);
              e.target.reset();
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <input type="text" name="name" required pattern="[A-Za-z ]+" title="Only letters and spaces are allowed" onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, ''); }} placeholder="Enter your name" className="w-full bg-white border border-gray-300 rounded-sm px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-all shadow-sm" />
                <input type="email" name="email" required pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|[a-zA-Z0-9.-]+\.in)$" title="Please enter a valid @gmail.com or .in email address" placeholder="Enter your Email" className="w-full bg-white border border-gray-300 rounded-sm px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-all shadow-sm" />
                <input type="tel" name="mobile" required pattern="[0-9]{10}" maxLength="10" title="Please enter exactly 10 digits" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} placeholder="Enter mobile number" className="w-full bg-white border border-gray-300 rounded-sm px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-all shadow-sm" />
                <input type="text" name="address" required pattern="[A-Za-z0-9 ]+" title="Only letters, numbers, and spaces are allowed" onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, ''); }} placeholder="Enter your Address" className="w-full bg-white border border-gray-300 rounded-sm px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-all shadow-sm" />
              </div>
              
              <textarea name="query" placeholder="Enter your query or comment (optional)" rows="2" onInput={(e) => { e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, ''); }} className="w-full bg-white border border-gray-300 rounded-sm px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-gray-500 transition-all shadow-sm resize-none"></textarea>

              <div className="mt-0.5 sm:mt-1">
                <p className="text-[11px] sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2">I am a: <span className="text-red-600">*</span></p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                    <input type="radio" required name="user_type" value="painter" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 focus:ring-red-500 bg-white border-gray-300" />
                    <span className="text-[11px] sm:text-sm font-medium text-gray-900">Painter</span>
                  </label>
                  <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                    <input type="radio" required name="user_type" value="dealer" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 focus:ring-red-500 bg-white border-gray-300" />
                    <span className="text-[11px] sm:text-sm font-medium text-gray-900">Dealer</span>
                  </label>
                  <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
                    <input type="radio" required name="user_type" value="customer" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 focus:ring-red-500 bg-white border-gray-300" />
                    <span className="text-[11px] sm:text-sm font-medium text-gray-900">Customer</span>
                  </label>
                </div>
              </div>

              <p className="text-[8px] sm:text-[10px] text-gray-600 leading-tight sm:leading-relaxed mt-0.5 sm:mt-1">
                By proceeding, I authorize WallX and its authorized contractors/partners to contact me via WhatsApp, phone calls, SMS and e-mail and I agree to the <a href="#" className="text-blue-600 font-medium hover:underline">Terms &amp; Conditions</a> and <a href="#" className="text-blue-600 font-medium hover:underline">Privacy Policy</a>.
              </p>

              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base py-2 sm:py-3 rounded-sm transition-all duration-300 transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_12px_25px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 mt-1 sm:mt-2">
                Book FREE Site Visit <span className="text-lg leading-none">&rarr;</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 md:p-12 max-w-md md:max-w-lg w-full text-center shadow-2xl transform transition-all">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">Thank You!</h3>
            <p className="text-base sm:text-lg text-gray-600">
              Your enquiry has been submitted successfully. Our team will get back to you shortly!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FourthSection;
