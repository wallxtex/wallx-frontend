import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import video from '../../assets/reddem.mp4'
import { benefitSections } from '../../constants/benefitSection'

gsap.registerPlugin(ScrollTrigger)

const RedeemSections = () => {
  const videoRef = useRef(null)
  const headingRef = useRef(null)
  const benefitsRef = useRef([])
  const containerRef = useRef(null)

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Video animation
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 85%',
            end: 'top 15%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Benefits cards staggered animation
    benefitsRef.current.forEach((benefit, index) => {
      if (benefit) {
        gsap.fromTo(
          benefit,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: benefit,
              start: 'top 85%',
              end: 'top 15%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Hover animation for each benefit card
        const card = benefit.querySelector('.benefit-card')
        if (card) {
          benefit.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              boxShadow: '0 20px 40px rgba(234, 88, 12, 0.3)',
              duration: 0.3,
              ease: 'power2.out',
            })
          })
          benefit.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              duration: 0.3,
              ease: 'power2.out',
            })
          })
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Heading Section */}
        <div
          ref={headingRef}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-3 md:mb-4 lg:mb-6 leading-tight">
            Benefits of Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">Redeem Program</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Join thousands of satisfied customers who are enjoying exclusive rewards and special privileges. Transform your shopping experience with our premium redemption program.
          </p>
        </div>

        {/* Main Content - Video in Center */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div
            ref={videoRef}
            className="relative group mx-auto max-w-4xl"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-orange-500/20 to-transparent rounded-lg sm:rounded-2xl md:rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
            
            {/* Video Container */}
            <div className="relative rounded-lg sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl group-hover:shadow-orange-500/50 transition-shadow duration-300 aspect-video">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Benefits Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20">
          {benefitSections.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => (benefitsRef.current[index] = el)}
            >
              <div className="benefit-card h-full p-5 sm:p-6 md:p-7 lg:p-8 bg-white rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-transparent hover:border-orange-500 shadow-lg transition-all duration-300">
                {/* Icon */}
                <div className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-5 transition-transform duration-300 hover:scale-110">
                  {benefit.icon}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 transition-colors duration-300 hover:text-orange-600 leading-snug">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center gap-2 text-orange-600 font-semibold text-sm opacity-0 transition-all duration-300 hover:opacity-100 hover:translate-x-2">
                  <span>Learn more</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="inline-block px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3 lg:py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-sm sm:text-base md:text-base lg:text-lg rounded-lg sm:rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all duration-300">
            Start Redeeming Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default RedeemSections
