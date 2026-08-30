import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Microscope, Wrench, Beaker, Shield, Palette } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TreatmentProcess = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left" });
      stepsRef.current.forEach((step) => {
        gsap.set(step, { opacity: 0, y: 20 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate line
      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        0,
      );

      // Animate steps
      stepsRef.current.forEach((step, index) => {
        tl.to(
          step,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          0.1 + index * 0.1
        )
      })
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: "01",
      icon: Microscope,
      title: "Rust Inspection",
      description:
        "Identify rust-affected areas and determine the condition of the surface.",
      id: 0,
    },
    {
      number: "02",
      icon: Wrench,
      title: "Surface Preparation",
      description: "Clean and prepare the affected area before treatment.",
      id: 1,
    },
    {
      number: "03",
      icon: Beaker,
      title: "Rust Treatment",
      description:
        "Treat the affected surface using the appropriate rust-control solution.",
      id: 2,
    },
    {
      number: "04",
      icon: Shield,
      title: "Protective Coating",
      description:
        "Apply a protective layer designed to help protect the treated surface.",
      id: 3,
    },
    {
      number: "05",
      icon: Palette,
      title: "Final Finish",
      description: "Complete the surface with a clean, premium WALLX finish.",
      id: 4,
    },
  ];

  return (
    <section ref={sectionRef} className="w-full py-16 lg:py-24 bg-gray-50">
      <div className="max-w-screen-2xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            From Rust-Affected to Restored.
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Our systematic treatment process helps prepare, treat and protect
            affected surfaces for a cleaner and more durable finish.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute top-12 left-0 right-0 h-1 bg-gray-200"
              style={{ zIndex: 0 }}
            >
              <div ref={lineRef} className="h-full bg-[#d82b2b]" />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    ref={(el) => {
                      stepsRef.current[step.id] = el;
                    }}
                    className="flex flex-col items-center"
                  >
                    {/* Step Circle */}
                    <div className="w-24 h-24 bg-white border-4 border-[#d82b2b] rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <div className="text-center">
                        <Icon
                          size={32}
                          className="text-[#d82b2b] mx-auto mb-1"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#d82b2b] mb-2">
                        {step.number}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200 md:left-8">
              <div
                ref={lineRef}
                className="w-full bg-[#d82b2b] origin-top"
                style={{ height: "0%" }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    ref={(el) => {
                      stepsRef.current[step.id] = el;
                    }}
                    className="flex gap-6 md:gap-8 pl-20 md:pl-24"
                  >
                    {/* Circle */}
                    <div className="absolute left-0 md:left-1 w-14 h-14 md:w-16 md:h-16 bg-white border-4 border-[#d82b2b] rounded-full flex items-center justify-center shadow-lg -ml-7 md:-ml-8">
                      <Icon size={24} className="text-[#d82b2b]" />
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-[#d82b2b] mb-1">
                        {step.number}
                      </p>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentProcess;
