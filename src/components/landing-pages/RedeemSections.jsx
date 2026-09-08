import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import video from '../../assets/redeem_new_video.mp4';
import { ArrowUpRight } from 'lucide-react';
import { benefitSections } from '../../constants/benefitSection';

gsap.registerPlugin(ScrollTrigger);

const RedeemSections = () => {
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const benefitsRef = useRef([]);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
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
      );
    }

    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.9 },
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
      );
    }

    benefitsRef.current.forEach((benefit, index) => {
      if (benefit) {
        gsap.fromTo(
          benefit,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
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
        );
      }
    });

    return () => {
      // Safe cleanup without breaking strict mode
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto">

        {/* Hero Section: Video & CTA combined */}
        <div
          ref={headingRef}
          className="w-full flex flex-col lg:flex-row overflow-hidden rounded-2xl md:rounded-3xl mb-16 md:mb-24 lg:mb-32 bg-red-50"
        >
          {/* Left Side: Video */}
          <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-auto min-h-[400px]">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Right Side: Content & CTA */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center items-start text-gray-900">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              Benefits of Our Redeem Program
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-8 max-w-xl leading-relaxed">
              Join thousands of satisfied customers who are enjoying exclusive rewards and special privileges. Transform your shopping experience with our premium redemption program.
            </p>
            <button className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 bg-red-600 text-white font-bold text-sm md:text-base lg:text-lg rounded-xl hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Start Redeeming Now
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Realigned "Everything a home needs" Grid Section */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">

          {/* Left Content */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center pt-4 lg:pt-8 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-[#222222] mb-4 sm:mb-6 leading-[1.2] sm:leading-[1.1] tracking-tight">
              Turn Every Opportunity <br className="hidden sm:block" /> Into a Reward
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-sm leading-relaxed mx-auto lg:mx-0">
              Join our scheme to unlock exclusive rewards, exciting benefits, and seamless fast redemption.
            </p>
          </div>

          {/* Right Content - Cards Grid */}
          <div className="w-full lg:w-[60%] grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {benefitSections.map((benefit, index) => (
              <div
                key={index}
                ref={(el) => (benefitsRef.current[index] = el)}
                className="group flex flex-col sm:flex-row items-center justify-center sm:justify-between p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-red-50 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-red-200"
              >
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-5 w-full text-center sm:text-left">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-2 sm:p-3">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 pr-0 sm:pr-2">
                    <h3 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 leading-tight sm:leading-snug mb-0.5 sm:mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-[9px] sm:text-xs md:text-sm text-gray-600 leading-tight sm:leading-relaxed line-clamp-2">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default RedeemSections;
