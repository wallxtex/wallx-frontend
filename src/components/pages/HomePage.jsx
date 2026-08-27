import React from "react";
import HeroSectionVideo from "../landing-pages/HeroSectionVideo";
import SecondSection from "../landing-pages/SecondSection";
import ThirdSection from "../landing-pages/ThirdSection";
import FourthSection from "../landing-pages/FourthSection";

const HomePage = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero-page */}
      <section className="w-full h-full">
        <HeroSectionVideo />
      </section>
      {/* Second Section */}
       <section className="w-full h-full">
        <SecondSection />
      </section> 
      
      {/* third section */}
      <ThirdSection/>
      {/* fourthsection */}
      <FourthSection/>
      {/* footer */}

    </div>
  );
};
export default HomePage;
