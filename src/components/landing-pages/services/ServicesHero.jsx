import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronRight } from 'lucide-react'
import heroImage from '../../../assets/webp/1.jpeg'

const ServicesHero = () => {
  const eyebrowRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const ctaContainerRef = useRef(null)
  const imageRef = useRef(null)
  const trustRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([eyebrowRef.current, headingRef.current, descriptionRef.current, ctaContainerRef.current, trustRef.current], {
        opacity: 0,
      })
      gsap.set(headingRef.current, { y: 30 })
      gsap.set(descriptionRef.current, { y: 20 })
      gsap.set(ctaContainerRef.current, { y: 20 })
      gsap.set(trustRef.current, { y: 10 })
      gsap.set(imageRef.current, { scale: 0.96, opacity: 0 })

      // Create timeline
      const tl = gsap.timeline({
        delay: 0.2,
      })

      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0)
        .to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.1)
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.2)
        .to(ctaContainerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.3)
        .to(trustRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.4)
        .to(imageRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
        }, 0.15)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white pt-20 pb-12 lg:pb-20">
      <div className="max-w-screen-2xl w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-xs lg:text-sm font-semibold uppercase tracking-widest text-[#d82b2b]">
                RUST TREATMENT & PROTECTION
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6"
            >
              Stop Rust Before It Damages Your Walls.
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 max-w-lg"
            >
              Advanced rust treatment and protective coating solutions designed to restore affected surfaces and help prevent recurring rust damage.
            </p>

            {/* CTAs */}
            <div
              ref={ctaContainerRef}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button className="px-8 py-4 bg-[#d82b2b] text-white font-semibold rounded-lg hover:bg-[#c41f1f] transition-colors duration-300 flex items-center justify-center gap-2 group">
                Get Rust Treatment
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2">
                Talk to an Expert
              </button>
            </div>

            {/* Trust Statement */}
            <div
              ref={trustRef}
              className="text-sm text-gray-600 font-medium flex flex-col sm:flex-row gap-1 sm:gap-4"
            >
              <span>✓ Professional Surface Treatment</span>
              <span className="hidden sm:block">•</span>
              <span>✓ Protective Coating</span>
              <span className="hidden sm:block">•</span>
              <span>✓ Long-Lasting Finish</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              ref={imageRef}
              className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={heroImage}
                alt="Rust-affected wall surface - professional treatment"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          </div>
        </div>

        {/* Mobile Hero Image */}
        <div className="mt-12 lg:hidden rounded-xl overflow-hidden shadow-xl">
          <img
            src={heroImage}
            alt="Rust-affected wall surface - professional treatment"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default ServicesHero
