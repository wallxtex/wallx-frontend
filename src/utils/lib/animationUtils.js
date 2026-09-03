import gsap from 'gsap';

export const createScrollTimeline = (triggerElement, start = 'top 70%') => {
  return gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start,
      toggleActions: 'play none none reverse',
    },
  });
};
