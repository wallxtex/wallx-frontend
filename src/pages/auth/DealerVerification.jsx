import React from 'react';
import { useLocation } from 'react-router-dom';
import dealerBannerImg from '../../assets/webp/dealer.webp';
import { AuthVerification } from './components';

const DealerVerification = () => {
    const location = useLocation();
    const mobile = location.state?.mobile || '9876543210';
    const email = location.state?.email || '';
    const dealerName = location.state?.dealerName || '';

    const handleVerify = (fullOtp) => {
        console.log('Verifying Dealer OTP:', fullOtp, { mobile, email, dealerName });
        // Handle dealer verification API or next steps
    };

    return (
        <AuthVerification
            title="Dealer Verification"
            mobile={mobile}
            bannerImg={dealerBannerImg}
            bannerAlt="WallX Dealer Verification Banner"
            bannerPosition="object-center"
            backPath="/dealer-signup"
            onVerify={handleVerify}
            role="Dealer"
        />
    );
};

export default DealerVerification;
