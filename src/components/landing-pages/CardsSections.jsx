import { cardImages } from "../../constants/cardData"
import { useEffect, useRef } from "react"

const CardsSections = () => {
  const cardsRef = useRef([])

  useEffect(() => {
    const currentCards = cardsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    currentCards.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  return (
    <div className="w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-12 md:mb-16 lg:mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-3 md:mb-4">
            Your Walls Deserve More Than Just <span className="text-red-600">Paint</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-lg mt-4 md:mt-6 max-w-2xl mx-auto leading-relaxed">
            Transform your space with our premium wallpaper collection
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {cardImages.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group opacity-0 h-full"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-black/40 transition-all duration-500 h-64 sm:h-72 md:h-80 lg:h-96 cursor-pointer transform hover:-translate-y-2">
                {/* Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 sm:p-5 md:p-6">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-base sm:text-lg md:text-xl font-bold">
                      {card.title}
                    </h3>
                    <p className="text-gray-200 text-xs sm:text-sm mt-2">
                      Explore this collection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default CardsSections