import { useRef } from "react";
import { Shield, Palette, Hammer, Home } from "lucide-react";
import { useSectionAnimation } from "./useSectionAnimation";

const benefits = [
  {
    id: "moisture",
    icon: Shield,
    title: "Moisture Protection",
    description: "Helps safeguard walls against dampness and seepage.",
  },
  {
    id: "rustic",
    icon: Palette,
    title: "Rustic Finish",
    description: "Creates authentic textures with depth and character.",
  },
  {
    id: "durable",
    icon: Hammer,
    title: "Durable Surface",
    description: "Made for long-lasting performance in demanding environments.",
  },
  {
    id: "space",
    icon: Home,
    title: "Designed for Every Space",
    description:
      "Residential, commercial, hospitality and architectural applications.",
  },
];

export default function SecondSection() {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const sectionRef = useSectionAnimation(titleRef, cardsRef);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="w-full h-auto min-h-screen flex items-center justify-center py-16 md:py-24 lg:py-32">
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Header Container - Centered */}
          <div className="w-full flex flex-col items-center justify-center text-center mb-12 md:mb-16 lg:mb-24">
            {/* Heading */}
            <h2
              ref={titleRef}
              className="w-full max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black leading-tight mb-4 md:mb-6 lg:mb-8"
            >
              Rustic by Design.
              <br />
              <span className="text-orange-500">Protective</span> by Nature.
            </h2>

            {/* Description */}
            <p
              className="w-full max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed"
            >
              WallX is a premium rustic wall-finish solution designed to
              transform ordinary surfaces into textured, character-rich walls
              while providing an added layer of protection against moisture and
              seepage.
            </p>
          </div>

          {/* Cards Grid - Centered and Responsive */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-8 auto-rows-fr">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  ref={(el) => {
                    if (el && !cardsRef.current.includes(el)) {
                      cardsRef.current.push(el);
                    }
                  }}
                  className="group w-full h-full bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-6 sm:p-7 md:p-8 lg:p-10 flex flex-col items-center justify-start text-center transition-all duration-300 hover:shadow-lg border border-gray-100 min-h-64 sm:min-h-72 md:min-h-80 lg:min-h-80"
                >
                  {/* Icon Container - Centered */}
                  <div className="w-full flex justify-center mb-5 md:mb-6 lg:mb-7">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center bg-orange-50 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 group-hover:bg-orange-100">
                      <Icon
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-orange-500"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Card Content - Centered */}
                  <h3 className="w-full text-sm sm:text-base md:text-lg lg:text-lg font-bold text-black mb-2 md:mb-3 leading-tight">
                    {benefit.title}
                  </h3>

                  <p className="w-full text-xs sm:text-sm md:text-sm lg:text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
