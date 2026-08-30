import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import beforeImage from '../../../assets/webp/2.jpeg'
import afterImage from '../../../assets/webp/3.jpeg'

gsap.registerPlugin(ScrollTrigger)

const BeforeAfter = () => {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const sliderRef = useRef(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([containerRef.current], { opacity: 0, y: 30 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSliderChange = (e) => {
    const rect = sliderRef.current?.parentElement.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX ? e.clientX - rect.left : e.touches?.[0]?.clientX - rect.left
    const newPosition = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, newPosition)))
  }

  const handleMouseDown = () => setIsDragging(true)

  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e) => handleSliderChange(e)
    const handleEnd = () => setIsDragging(false)

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleEnd)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging])

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 lg:py-24 bg-white"
    >
      <div className="max-w-screen-2xl w-11/12 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            See the Difference.
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            From visible rust damage to a cleaner, protected surface.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div
          ref={containerRef}
          className="w-full max-w-4xl mx-auto"
        >
          <div
            ref={sliderRef}
            className="relative w-full overflow-hidden rounded-xl shadow-2xl cursor-col-resize select-none"
            onClick={handleSliderChange}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            style={{
              aspectRatio: '16 / 9',
            }}
          >
            {/* After Image (Background) */}
            <img
              src={afterImage}
              alt="After rust treatment - restored surface"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before Image (Overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                width: `${sliderPosition}%`,
              }}
            >
              <img
                src={beforeImage}
                alt="Before rust treatment - damaged surface"
                className="w-screen h-full object-cover"
                style={{
                  width: 'calc(100% / var(--slider-position, 0.5))',
                }}
              />
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{
                left: `${sliderPosition}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-0.5 h-4 bg-gray-400" />
                  <div className="w-0.5 h-4 bg-gray-400" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg font-semibold text-sm">
              BEFORE
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg font-semibold text-sm">
              AFTER
            </div>
          </div>

          {/* Info Text */}
          <p className="text-center text-gray-600 mt-6 text-sm lg:text-base">
            Drag the slider to compare before and after rust treatment
          </p>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
