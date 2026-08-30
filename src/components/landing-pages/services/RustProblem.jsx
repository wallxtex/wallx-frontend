import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AlertCircle, Zap, Droplets, RotateCw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const RustProblem = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      cardsRef.current.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 30 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      icon: AlertCircle,
      title: "Rust Stains",
      description:
        "Persistent rust marks can leave walls looking damaged and neglected.",
      id: 0,
    },
    {
      icon: Zap,
      title: "Surface Damage",
      description:
        "Corrosion can affect surrounding concrete and surface finishes.",
      id: 1,
    },
    {
      icon: Droplets,
      title: "Moisture Exposure",
      description:
        "Moisture can accelerate corrosion and recurring surface problems.",
      id: 2,
    },
    {
      icon: RotateCw,
      title: "Recurring Rust",
      description:
        "Without proper treatment, rust-related staining can return over time.",
      id: 3,
    },
  ];

  return (
    <section ref={sectionRef} className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-screen-2xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Rust Doesn't Just Affect Appearance.
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Rust stains, corrosion and moisture can gradually damage the
            appearance and integrity of your walls and surrounding surfaces.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardsRef.current[card.id] = el;
                }}
                className="p-6 lg:p-8 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                    <Icon size={24} className="text-[#d82b2b]" />
                  </div>
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RustProblem;
