import { IoFlashOutline, IoCallOutline, IoQrCodeOutline } from 'react-icons/io5';
import SharedCTA from '../../../common/components/Shared/SharedCTA';

const PainterCTA = () => {
  return (
    <SharedCTA
      icon={<IoQrCodeOutline />}
      title="Ready to Start Earning with WallX?"
      description="Join thousands of painters across India earning flat ₹90 instant cash on every texture bucket or bag. Simple 2-minute mobile signup."
      primaryBtnText="Register as Painter Mitra Now"
      primaryBtnIcon={<IoFlashOutline />}
      primaryBtnLink="/painter-signup"
      secondaryBtnText="Toll Free: 1800-WALLX-HELP"
      secondaryBtnIcon={<IoCallOutline className="text-emerald-400" />}
      secondaryBtnLink="tel:18001239255"
      footerNote="* Instant cash redemption requires a valid UPI ID / bank account linked with registered mobile number."
    />
  );
};

export default PainterCTA;
