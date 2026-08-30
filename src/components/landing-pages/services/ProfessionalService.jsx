import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { CheckCircle2 } from 'lucide-react'
import painterImage from '../../../assets/webp/painter.webp'

gsap.registerPlugin(ScrollTrigger)

const ProfessionalService = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const pointsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([imageRef.current, contentRef.current], { opacity: 0 })
      gsap.set(imageRef.current, { x: -50 })
      gsap.set(contentRef.current, { x: 50 })

      pointsRef.current.forEach((point) => {
        gsap.set(point, { opacity: 0, x: 20 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(imageRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, 0)
        .to(contentRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.1)
        .to(pointsRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }, 0.3)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const points = [
    'Proper Surface Preparation',
    'Professional Application',
    'Consistent Final Finish',
  ]

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24 bg-gray-50"
    >
      <div className="max-w-screen-2xl w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src={painterImage}
              alt="Professional painter applying protective coating to wall"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="order-1 lg:order-2"
          >
            {/* Eyebrow */}
            <p className="text-xs lg:text-sm font-semibold uppercase tracking-widest text-[#d82b2b] mb-4">
              PROFESSIONAL APPLICATION
            </p>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Protection Starts With Proper Preparation.
            </h2>

            {/* Description */}
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8">
              Proper surface preparation and application play a critical role in achieving a durable and consistent wall finish.
            </p>

            {/* Points */}
            <div className="space-y-4 mb-8">
              {points.map((point, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    pointsRef.current[index] = el
                  }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={24} className="text-[#d82b2b] flex-shrink-0" />
                  <span className="text-base lg:text-lg text-gray-700 font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="px-8 py-4 bg-[#d82b2b] text-white font-semibold rounded-lg hover:bg-[#c41f1f] transition-colors duration-300">
              Find a WALLX Painter
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfessionalService
