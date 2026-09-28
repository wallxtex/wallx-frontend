import { useEffect } from 'react';
import PainterSchemes from './component/PainterSchemes';
import TopPaintersLeaderboard from './component/TopPaintersLeaderboard';
import RedeemQRGuide from './component/RedeemQRGuide';
import PainterPerks from './component/PainterPerks';
import PainterCTA from './component/PainterCTA';

const PainterPageComponent = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <PainterSchemes />
      <TopPaintersLeaderboard />
      <RedeemQRGuide />j
      <PainterPerks />
      <PainterCTA />
    </main>
  );
};

export default PainterPageComponent;
