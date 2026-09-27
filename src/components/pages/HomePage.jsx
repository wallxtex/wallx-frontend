import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSectionVideo from "../landing-pages/HeroSectionVideo";
import SecondSection from "../landing-pages/SecondSection";
import ThirdSection from "../landing-pages/ThirdSection";
import FourthSection from "../landing-pages/FourthSection";
import RedeemSections from "../landing-pages/RedeemSections";
import CardsSections from "../landing-pages/CardsSections";
import { getCurrentToken, getRoleFromToken } from "../../utils/common/tokenUtils";
import { ROLE_HOME_ROUTES } from "../../utils/common/roles";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has an active token
    const token = getCurrentToken();
    
    if (token) {
      // Get user role from token
      const role = getRoleFromToken(token);
      
      if (role && ROLE_HOME_ROUTES[role]) {
        // Redirect to the appropriate dashboard
        navigate(ROLE_HOME_ROUTES[role], { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="w-full overflow-hidden relative">
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
    </div>
  );
};
export default HomePage;
