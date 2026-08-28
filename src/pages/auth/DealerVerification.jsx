import dealerBannerImg from '../../assets/webp/dealer.webp';
import { createVerificationPage } from './utils/createVerificationPage';

const DealerVerification = createVerificationPage({
    role: 'Dealer',
    title: 'Dealer Verification',
    bannerImg: dealerBannerImg,
    bannerAlt: 'WallX Dealer Verification Banner',
    bannerPosition: 'object-center',
    backPath: '/dealer-signup',
    defaultMobile: '9876543210',
});

export default DealerVerification;
