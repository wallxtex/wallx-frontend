import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Shield, Droplets, Lock, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ProtectionBenefits = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 30 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const benefits = [
    {
      number: '01',
      icon: Shield,
      title: 'Rust Treatment',
      description: 'Helps address existing rust-affected areas.',
      id: 0,
    },
    {
      number: '02',
      icon: Droplets,
      title: 'Moisture Protection',
      description: 'Helps reduce moisture-related surface problems.',
      id: 1,
    },
    {
      number: '03',
      icon: Lock,
      title: 'Surface Protection',
      description: 'Creates a protective layer over treated surfaces.',
      id: 2,
    },
    {
      number: '04',
      icon: Sparkles,
      title: 'Premium Finish',
      description: 'Restores the appearance of the treated area with a refined finish.',
      id: 3,
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24 bg-gray-50"
    >
      <div className="max-w-screen-2xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Treat. Protect. Restore.
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            WallX combines surface treatment and protective finishing to help restore the appearance of affected surfaces.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.id}
                ref={(el) => {
                  cardsRef.current[benefit.id] = el
                }}
                className="p-6 lg:p-8 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div>
                    <p className="text-4xl font-bold text-[#d82b2b] mb-3">
                      {benefit.number}
                    </p>
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-[#d82b2b]" />
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProtectionBenefits
