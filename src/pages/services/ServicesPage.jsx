import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { services } from "../../constants/services";
import FooterSection from "../../components/landing-pages/FooterSection";
import SharedCTA from "../../common/components/Shared/SharedCTA";
import {
  IoBusinessOutline,
  IoCallOutline,
  IoFlashOutline,
} from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

function ServicesPage() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

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
    <div className="w-full bg-white">
      {/* Services Section */}
      <section
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
                className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-gray-300"
              >
                {/* Image */}
                <div className="aspect-square w-full overflow-hidden bg-gray-100">
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

                  {service.description && (
                    <p className="text-xs sm:text-sm text-gray-600">
                      {service.description}
                    </p>
                  )}

                  <span className="mt-auto inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    Learn more
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
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

    </div>
  );
}

export default ServicesPage;
