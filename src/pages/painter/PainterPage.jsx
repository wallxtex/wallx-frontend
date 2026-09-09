import { useEffect } from 'react';
import PainterSchemes from './component/PainterSchemes';
import TopPaintersLeaderboard from './component/TopPaintersLeaderboard';
import RedeemQRGuide from './component/RedeemQRGuide';
import PainterPerks from './component/PainterPerks';
import PainterCTA from './component/PainterCTA';
import FooterSection from '../../components/landing-pages/FooterSection';

const PainterPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <PainterSchemes />
      <TopPaintersLeaderboard />
      <RedeemQRGuide />
      <PainterPerks />
      <PainterCTA />
    </main>
  );
};

export default PainterPage;
