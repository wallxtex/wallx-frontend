import HeroSectionVideo from "../landing-pages/HeroSectionVideo";
import SecondSection from "../landing-pages/SecondSection";
import ThirdSection from "../landing-pages/ThirdSection";
import FourthSection from "../landing-pages/FourthSection";
import FooterSection from "../landing-pages/FooterSection";
import RedeemSections from "../landing-pages/RedeemSections";
import CardsSections from "../landing-pages/CardsSections";

const HomePage = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="w-full">
        <HeroSectionVideo />
      </section>

      {/* Second Section */}
      <section className="w-full">
        <SecondSection />
      </section>

      {/* Cards Section */}
      <section className="w-full">
        <CardsSections />
      </section>

      {/* Third Section */}
      <section className="w-full">
        <ThirdSection />
      </section>

      {/* Redeem Section */}
      <section className="w-full">
        <RedeemSections />
      </section>

      {/* Fourth Section */}
      <section className="w-full">
        <FourthSection />
      </section>

      {/* Footer Section */}
      <section className="w-full">
        <FooterSection />
      </section>
    </div>
  );
};
export default HomePage;
