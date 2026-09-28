export const SharedSection = ({ id, className = '', children }) => (
  <section id={id} className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 ${className}`}>
    <div className="w-full max-w-[1536px] mx-auto">
      {children}
    </div>
  </section>
);

export default SharedSection;
