import { Outlet, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PublicNavbar from "../common/Navbar";
import FooterSection from "../components/landing-pages/FooterSection";
import SidebarForm from "../components/landing-pages/SidebarForm";

export default function PublicLayouts() {
  const bottomMarkerRef = useRef(null);
  const location = useLocation();
  const [showBottomBanner, setShowBottomBanner] = useState(true);
  const [userDismissedBanner, setUserDismissedBanner] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    // If you want the banner to re-appear when the user changes routes, uncomment the next line:
    // setUserDismissedBanner(false);
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!userDismissedBanner) {
          setShowBottomBanner(!entry.isIntersecting);
        }
      },
      { threshold: 0 }
    );

    if (bottomMarkerRef.current) {
      observer.observe(bottomMarkerRef.current);
    }

    return () => observer.disconnect();
  }, [userDismissedBanner]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <PublicNavbar />
      <main className="grow pt-0 bg-[#F5F9FD]">
        <Outlet />
      </main>
      
      {/* Bottom Marker placed just above footer */}
      <div ref={bottomMarkerRef} className="h-10 w-full bg-transparent absolute bottom-[300px] pointer-events-none" />
      
      <FooterSection />

      {/* Sticky Bottom Banner */}
      {showBottomBanner && !userDismissedBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-[100] px-4 py-3 sm:py-4 flex items-center justify-center animate-[slideUp_0.5s_ease-out]">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 sm:px-12 py-2.5 sm:py-3 rounded-full shadow-sm transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Need Help?
          </button>
          
          <button 
            onClick={() => {
              setUserDismissedBanner(true);
              setShowBottomBanner(false);
            }}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-colors focus:outline-none"
            aria-label="Close banner"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Sidebar Form */}
      <SidebarForm isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
