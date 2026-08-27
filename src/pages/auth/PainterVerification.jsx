import React from 'react';
import { useLocation } from 'react-router-dom';
import signupImg from '../../assets/webp/painter.webp';
import { AuthVerification } from './components';

const PainterVerification = () => {
    const location = useLocation();
    const mobile = location.state?.mobile || '8384856193';

    const handleVerify = (fullOtp) => {
        console.log('Verifying Painter OTP:', fullOtp, { mobile });
        // Handle painter verification API or next steps
    };

    return (
        <AuthVerification
            title="Enter verification code"
            mobile={mobile}
            bannerImg={signupImg}
            bannerAlt="WallX Painter Verification Banner"
            bannerPosition="object-[65%_center]"
            backPath="/painter-signup"
            onVerify={handleVerify}
            role="Painter"
        />
    );
};

export default PainterVerification;
