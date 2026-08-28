import { useRef, useState } from "react";
import { IoChevronDown as ChevronDown } from "react-icons/io5";
import { useSectionAnimation } from "./useSectionAnimation";

const FourthSection = () => {
  const headerRef = useRef(null);
  const faqsRef = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const sectionRef = useSectionAnimation(headerRef, faqsRef);

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
    <section ref={sectionRef} className="w-full bg-white py-20 md:py-32 lg:py-48">
      <div className="w-full h-auto flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-4xl">
          {/* Section Header - Centered */}
          <div
            ref={headerRef}
            className="w-full text-center mb-16 md:mb-20 lg:mb-24"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight mb-6 md:mb-8">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about WallX and our services.
            </p>
          </div>

          {/* FAQs Container - Centered */}
          <div className="w-full space-y-4 md:space-y-5 lg:space-y-6 mb-16 md:mb-20 lg:mb-24">
            {faqs.map((faq, index) => (
              <div
                key={`faq-${index}`}
                ref={(el) => {
                  if (el) faqsRef.current[index] = el;
                }}
                className="w-full bg-white rounded-2xl md:rounded-3xl border border-gray-200 hover:border-orange-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 p-6 md:p-8 lg:p-10 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-black leading-tight">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-orange-500 shrink-0 transition-transform duration-300 ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer - Smooth Expansion */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedIndex === index ? "max-h-full" : "max-h-0"
                  }`}
                >
                  <div className="px-6 md:px-8 lg:px-10 py-6 md:py-8 lg:py-10 border-t border-gray-200 bg-gray-50">
                    <p className="text-sm md:text-base lg:text-base text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section - Centered */}
          <div className="w-full p-8 md:p-10 lg:p-14 bg-linear-to-br from-orange-50 to-orange-100 rounded-3xl md:rounded-4xl border border-orange-200 text-center shadow-sm">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-black mb-4 md:mb-6 lg:mb-8">
              Still have questions?
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8 md:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
              Can't find the answer you're looking for? Our support team is here to help you.
            </p>
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 md:py-4 lg:py-4 px-8 md:px-10 lg:px-12 rounded-2xl md:rounded-2xl lg:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
