import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import img1 from '../../../assets/webp/4.jpeg'
import img2 from '../../../assets/webp/5.jpeg'
import img3 from '../../../assets/webp/6.jpeg'

gsap.registerPlugin(ScrollTrigger)

const ApplicationAreas = () => {
  const sectionRef = useRef(null)
  const imagesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRef.current.forEach((img) => {
        gsap.set(img, { opacity: 0, scale: 0.95 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(imagesRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const areas = [
    {
      title: 'Exterior Walls',
      image: img1,
      id: 0,
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Balconies',
      image: img2,
      id: 1,
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Metal Railings',
      image: img3,
      id: 2,
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Window / Grill Areas',
      image: img1,
      id: 3,
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Concrete Surfaces',
      image: img2,
      id: 4,
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Commercial / Industrial',
      image: img3,
      id: 5,
      size: 'col-span-1 row-span-1',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24 bg-white"
    >
      <div className="max-w-screen-2xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Where Rust Treatment Matters Most
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Protect and restore surfaces commonly exposed to moisture, metal corrosion and environmental conditions.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {areas.map((area) => (
            <div
              key={area.id}
              ref={(el) => {
                imagesRef.current[area.id] = el
              }}
              className="group relative overflow-hidden rounded-lg"
              style={{
                aspectRatio: '1 / 1',
              }}
            >
              <img
                src={area.image}
                alt={area.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              {/* Text */}
              <div className="absolute inset-0 flex items-end p-4 lg:p-6">
                <h3 className="text-white font-semibold text-base lg:text-lg">
                  {area.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ApplicationAreas
