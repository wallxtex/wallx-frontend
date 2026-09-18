import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { services } from "../../constants/services";
import FooterSection from "../../components/landing-pages/FooterSection";
import SharedCTA from "../../common/components/Shared/SharedCTA";
import SidebarForm from "../../components/landing-pages/SidebarForm";
import servicesVideo from "../../assets/services-video.mp4";
import {
  IoBusinessOutline,
  IoCallOutline,
  IoFlashOutline,
} from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

function ServicesPage() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    let ctx;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const initAnimations = () => {
      ctx = gsap.context(() => {
        if (prefersReducedMotion) {
          gsap.set(
            [
              "[data-services-eyebrow]",
              "[data-services-heading]",
              "[data-services-subheading]",
              "[data-service-card]",
            ],
            { opacity: 1, y: 0, clearProps: "all" },
          );
          return;
        }

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        headerTl
          .from("[data-services-eyebrow]", {
            opacity: 0,
            y: 15,
            duration: 0.6,
            ease: "power2.out",
          })
          .from(
            "[data-services-heading]",
            { opacity: 0, y: 15, duration: 0.6, ease: "power2.out" },
            "-=0.45",
          )
          .from(
            "[data-services-subheading]",
            { opacity: 0, y: 15, duration: 0.6, ease: "power2.out" },
            "-=0.45",
          );

        gsap.from("[data-service-card]", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "opacity,transform",
        });
      }, sectionRef);
    };

    const images = containerRef.current
      ? containerRef.current.querySelectorAll("img")
      : [];

    if (images.length === 0) {
      initAnimations();
    } else {
      let settledCount = 0;
      const onSettle = () => {
        settledCount += 1;
        if (settledCount === images.length) initAnimations();
      };
      images.forEach((img) => {
        if (img.complete) {
          onSettle();
        } else {
          img.addEventListener("load", onSettle);
          img.addEventListener("error", onSettle);
        }
      });
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="w-full bg-white flex flex-col">
      {/* Hero Video Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[400px] overflow-hidden bg-gray-900 flex items-center justify-center border-b border-gray-100">
        {/* Video Background */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          src={servicesVideo}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl w-11/12 mx-auto flex flex-col items-center md:items-start text-center md:text-left animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-6 drop-shadow-md">
            Protecting Walls, Elevating Spaces
          </h1>
          <p className="text-xs sm:text-base md:text-xl text-gray-200 max-w-3xl leading-relaxed drop-shadow-sm px-2 md:px-0">
            Expert rust protection solutions paired with thoughtful interior design — safeguarding your walls while transforming your spaces.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services-grid"
        ref={sectionRef}
        className="w-full px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-left">
            <p
              data-services-eyebrow
              className="mb-2 sm:mb-3 block text-xs font-semibold uppercase tracking-wider text-gray-600"
            >
              Our Services
            </p>
            <h2
              data-services-heading
              className="mb-3 sm:mb-4 md:mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900"
            >
              Protection That Goes Beyond the Surface.
            </h2>
            <p
              data-services-subheading
              className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed"
            >
              Professional rust treatment and protective coating solutions
              designed to restore affected surfaces and provide lasting
              protection.
            </p>
          </div>

          {/* Services Grid */}
          <div
            ref={containerRef}
            className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
          >
            {services.map((service) => (
              <div
                key={service.id}
                data-service-card
                onClick={() => setActiveCardId(activeCardId === service.id ? null : service.id)}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-gray-300 h-full max-w-[320px] mx-auto sm:max-w-none w-full"
              >
                {/* Image */}
                <div className="h-48 sm:h-auto sm:aspect-square w-full overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-2 px-4 sm:px-5 py-4 sm:py-5">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>

                  <span className="mt-auto inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700 transition-colors">
                    Learn more
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>

                {/* Hover Overlay (Slides from Right to Left) */}
                <div className={`absolute inset-0 bg-white/98 backdrop-blur-md p-4 sm:p-6 flex flex-col transition-transform duration-700 ease-in-out z-10 border border-gray-200 ${activeCardId === service.id ? 'translate-x-0' : 'translate-x-full lg:group-hover:translate-x-0'}`}>
                  <div className="flex flex-col h-full items-center text-center">
                    <div className="flex-1 flex flex-col justify-center items-center w-full overflow-y-auto">
                      <h3 className="text-sm sm:text-lg font-bold text-gray-900 uppercase tracking-wider mb-2 sm:mb-4 leading-snug">{service.title}</h3>

                      <p className="text-gray-600 text-[11px] sm:text-sm leading-tight sm:leading-relaxed px-1">
                        {service.description || "Premium quality service for your walls."}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSidebarOpen(true);
                      }}
                      className="w-full py-2 sm:py-3 border border-[#d82b2b] text-[#d82b2b] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#d82b2b] hover:text-white transition-colors duration-300 mt-2 sm:mt-4 shrink-0"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SharedCTA
        icon={<IoBusinessOutline />}
        title="Ready to Partner with WallX?"
        description="Join India's fastest-growing premium texture coating network. Enjoy exclusive dealer margins, credit terms, and dedicated marketing support."
        primaryBtnText="Register as Dealer"
        primaryBtnIcon={<IoFlashOutline />}
        primaryBtnLink="/dealer-signup"
        secondaryBtnText="Dealer Support: 1800-WALLX-B2B"
        secondaryBtnIcon={<IoCallOutline className="text-emerald-400" />}
        secondaryBtnLink="tel:18001239255"
        footerNote="* Minimum initial order volume requirements apply for new authorized dealerships."
      />

      <SidebarForm isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}

export default ServicesPage;
