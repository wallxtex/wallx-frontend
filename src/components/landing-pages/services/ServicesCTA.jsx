import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import ctaBg from '../../../assets/webp/wallx_final.webp'

gsap.registerPlugin(ScrollTrigger)

const ServicesCTA = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([contentRef.current, headingRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      })

      buttonsRef.current.forEach((btn) => {
        gsap.set(btn, { opacity: 0, y: 20 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, 0)
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.1)
        .to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }, 0.2)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 lg:py-28 relative overflow-hidden bg-white"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-gray-950/70" />

      {/* Content */}
      <div
        ref={contentRef}
        className="max-w-screen-2xl w-11/12 mx-auto relative z-10 text-center"
      >
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Don't Let Rust Take Over Your Walls.
        </h2>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-lg lg:text-xl text-gray-100 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Get your rust-affected surfaces inspected, treated and protected with WALLX.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-start">
          <button
            ref={(el) => {
              buttonsRef.current[0] = el
            }}
            className="px-8 py-4 bg-[#d82b2b] text-white font-semibold rounded-lg hover:bg-[#c41f1f] transition-colors duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto"
          >
            Get Rust Treatment
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            ref={(el) => {
              buttonsRef.current[1] = el
            }}
            className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 w-full sm:w-auto"
          >
            Find a Painter
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServicesCTA
