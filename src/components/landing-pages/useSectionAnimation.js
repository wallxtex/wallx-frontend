import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { createScrollTimeline } from '../../utils/common/animationUtils';

gsap.registerPlugin(ScrollTrigger);

export const useSectionAnimation = (headerRef, extraRef) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [headerRef.current];
      if (extraRef?.current) {
        if (Array.isArray(extraRef.current)) {
          targets.push(...extraRef.current);
        } else {
          targets.push(extraRef.current);
        }
      }
      gsap.set(targets, { opacity: 0, y: 30 });

      const tl = createScrollTimeline(sectionRef.current);
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      if (extraRef?.current) {
        tl.to(
          extraRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.4'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [headerRef, extraRef]);

  return sectionRef;
};

export default useSectionAnimation;
