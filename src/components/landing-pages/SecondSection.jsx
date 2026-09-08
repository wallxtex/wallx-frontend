import { useRef } from "react";
import skinCellIcon from "../../assets/webp/skin-cell.webp";
import crossIcon from "../../assets/webp/cross.webp";
import constructionIcon from "../../assets/webp/construction.webp";
import layoutIcon from "../../assets/webp/layout.webp";
import { useSectionAnimation } from "./useSectionAnimation";

const benefits = [
  {
    id: "moisture",
    title: "Moisture Protection",
    description: "Helps safeguard walls against dampness and seepage.",
    icon: skinCellIcon,
  },
  {
    id: "rustic",
    title: "Premium Finish",
    description: "Creates authentic textures with depth and character.",
    icon: crossIcon,
  },
  {
    id: "durable",
    title: "Durable Surface",
    description: "Made for long-lasting performance in demanding environments.",
    icon: constructionIcon,
  },
  {
    id: "space",
    title: "Designed for Every Space",
    description:
      "Residential, commercial, hospitality and architectural applications.",
    icon: layoutIcon,
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
              Designed for beauty
              <br />
              Engineered for <span className="text-red-500">Protection</span>
            </h2>

            {/* Description */}
            <p
              className="w-full max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed"
            >
              WallX offers premium surface solutions designed to elevate
              interiors and exteriors with high-end style and lasting performance.
            </p>
          </div>

          {/* Cards Grid - Centered and Responsive */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-10 lg:gap-12 auto-rows-fr">
            {benefits.map((benefit, index) => {
              return (
                <div
                  key={benefit.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="w-full h-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] transition-all duration-300 border border-gray-100 hover:border-red-500 opacity-0"
                >
                  <img
                    src={benefit.icon}
                    alt={benefit.title}
                    className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain mb-3 sm:mb-6 transition-transform duration-300 hover:scale-105"
                  />

                  {/* Card Content - Centered */}
                  <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1 sm:mb-3 leading-tight">
                    {benefit.title}
                  </h3>

                  <p className="text-[10px] sm:text-base text-gray-600 leading-snug sm:leading-relaxed">
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
