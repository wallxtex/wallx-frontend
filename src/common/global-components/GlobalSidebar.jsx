import { cn } from "../../utils/common/util";
import { useState, useEffect, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
// import { painterMenu } from "./data/PainterSidebarMenus";

// ============================================================================
// CONTEXT & PROVIDER
// ============================================================================

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Below this width we treat the sidebar as a mobile drawer/overlay.
// 768px+ (tablet + desktop) gets the persistent collapsible sidebar.
const MOBILE_BREAKPOINT = 768;

const SidebarProvider = ({ children, animate = true }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const applyMobile = (matches) => {
      setIsMobile(matches);
      // Sidebar starts open on tablet/desktop, closed (drawer) on mobile.
      setOpen(!matches);
    };

    applyMobile(mobileQuery.matches);

    const handleMobileChange = (e) => applyMobile(e.matches);

    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        open,
        setOpen,
        animate,
        isMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// ============================================================================
// DESKTOP / TABLET SIDEBAR
// ============================================================================

const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, animate, toggleSidebar } = useSidebar();

  let sidebarWidth = "280px";
  if (animate) {
    sidebarWidth = open ? "280px" : "88px";
  }

  return (
    <motion.div
      className={cn(
        "hidden md:flex md:flex-col md:relative h-[calc(100vh-80px)] bg-white border-r border-gray-200 shadow-sm overflow-hidden shrink-0",
        className,
      )}
      animate={{ width: sidebarWidth }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      {...props}
    >
      {/* Desktop/Tablet toggle button */}
      <div
        className={cn(
          "flex items-center px-2 pt-4 pb-2",
          open ? "justify-end" : "justify-center",
        )}
      >
        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors duration-200"
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {children}
    </motion.div>
  );
};

// ============================================================================
// MOBILE SIDEBAR
// ============================================================================
const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className="md:hidden fixed left-3 z-[60]"
        style={{
          top: "calc(env(safe-area-inset-top, 0px) + 40px)",
          transform: "translateY(-50%)",
        }}
      >
        <motion.button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Sidebar"
        >
          {open ? (
            <X className="w-5 h-5 text-black" />
          ) : (
            <Menu className="w-5 h-5 text-black" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />

            {/* Mobile Sidebar Drawer */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "fixed left-0 w-72 bg-white border-r border-gray-200 shadow-lg z-40 flex flex-col overflow-y-auto md:hidden",
                className,
              )}
              style={{
                top: "calc(env(safe-area-inset-top, 0px) + 80px)",
                height: "calc(100vh - env(safe-area-inset-top, 0px) - 80px)",
              }}
              {...props}
            >
              {/* Close Button */}
              <div className="flex justify-end p-4 border-b border-gray-100">
                <motion.button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close Sidebar"
                >
                  <X className="w-5 h-5 text-black" />
                </motion.button>
              </div>

              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================================
// SIDEBAR BODY
// ============================================================================

const SidebarBody = ({ children }) => {
  return (
    <>
      <DesktopSidebar>{children}</DesktopSidebar>
      <MobileSidebar>{children}</MobileSidebar>
    </>
  );
};

// ============================================================================
// SIDEBAR LINK
// ============================================================================

const SidebarLink = ({ item }) => {
  const { open, setOpen, isMobile } = useSidebar();
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);

  useEffect(() => {
    if (hasSubItems && item.subItems.some((sub) => pathname === sub.path)) {
      setIsExpanded(true);
    }
  }, [pathname, hasSubItems, item]);

  // Is active if the main path matches OR any subItem path matches
  const isActive = hasSubItems
    ? pathname === item.path ||
      item.subItems.some((sub) => pathname === sub.path)
    : pathname === item.path;

  const IconComponent = item.icon;

  const handleLinkClick = (e) => {
    if (hasSubItems) {
      if (!item.path) {
        e.preventDefault();
      }
      setIsExpanded(!isExpanded);
    } else {
      if (isMobile) setOpen(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={open ? { x: 4 } : { x: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          to={item.path || "#"}
          onClick={handleLinkClick}
          className={cn(
            "flex items-center gap-3 px-3 py-3 mx-2 rounded-lg font-medium text-sm transition-all duration-200 group relative",
            open ? "justify-start" : "justify-center",
            isActive
              ? "bg-[#d82b2b]/10 text-[#ff5c5c]"
              : "text-gray-700 hover:bg-gray-50 hover:text-black",
          )}
        >
          {/* Active Indicator Bar */}
          {isActive && open && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#d82b2b] rounded-r-lg"
              transition={{ duration: 0.2 }}
            />
          )}

          {/* Icon */}
          <motion.div
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex-shrink-0 transition-colors duration-200",
              isActive
                ? "text-[#ff5c5c]"
                : "text-gray-500 group-hover:text-black",
            )}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>

          {/* Label & Chevron */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between flex-1 overflow-hidden whitespace-nowrap"
              >
                <span className="truncate">{item.label}</span>
                {hasSubItems && (
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>

      {/* Sub Items */}
      <AnimatePresence>
        {hasSubItems && isExpanded && open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden flex flex-col gap-1 ml-9 mt-1 mr-2"
          >
            {item.subItems.map((sub) => {
              const isSubActive = pathname === sub.path;
              return (
                <Link
                  key={sub.path}
                  to={sub.path}
                  onClick={() => {
                    if (isMobile) setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200",
                    isSubActive
                      ? "bg-[#d82b2b]/10 text-[#ff5c5c]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black",
                  )}
                >
                  {/* Subtle dot for sub-item */}
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full flex-shrink-0",
                      isSubActive ? "bg-[#d82b2b]" : "bg-gray-300",
                    )}
                  />
                  <span className="truncate">{sub.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================================
// SIDEBAR FOOTER (USER PROFILE)
// ============================================================================

const SidebarFooter = () => {
  const { open } = useSidebar();

  return (
    <motion.div className="mt-auto border-t border-gray-100 px-2 py-4">
      <div
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group",
          !open && "justify-center",
        )}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
          JD
        </div>

        {/* User Info - Show only when open */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-w-0 flex items-center gap-2"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-black truncate">Sagar</p>
                <p className="text-xs text-gray-500 truncate">Painter</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 rounded hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN SIDEBAR COMPONENT
// ============================================================================

const GlobalSidebar = ({ Menu }) => {
  return (
    <SidebarProvider animate={true}>
      <SidebarBody>
        {/* Navigation Menu */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {Menu?.map((item) => (
            <SidebarLink key={item.path} item={item} />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <SidebarFooter />
      </SidebarBody>
    </SidebarProvider>
  );
};

export default GlobalSidebar;
