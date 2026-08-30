import signupImg from '../../assets/webp/painter.webp';
import { createVerificationPage } from './utils/createVerificationPage';

const PainterVerification = createVerificationPage({
    role: 'Painter',
    title: 'Enter verification code',
    bannerImg: signupImg,
    bannerAlt: 'WallX Painter Verification Banner',
    bannerPosition: 'object-[65%_center]',
    backPath: '/painter-signup',
    defaultMobile: '8384856193',
});

export default PainterVerification;
