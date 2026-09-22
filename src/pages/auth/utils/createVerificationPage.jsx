import { useLocation } from 'react-router-dom';
import AuthVerification from '../components/AuthVerification';

export const createVerificationPage = (config) => {
    const VerificationComponent = () => {
        const location = useLocation();
        const state = location.state || {};
        const mobile = state.mobile || config.defaultMobile;

        // Use the hook if provided, otherwise use the static onVerify
        const verifyHandler = config.useVerificationHook 
            ? config.useVerificationHook() 
            : config.onVerify;

        const handleVerify = (fullOtp) => {
            console.log(`Verifying ${config.role} OTP:`, fullOtp, state);
            if (verifyHandler) {
                verifyHandler(fullOtp, state);
            }
        };
        return (
            <AuthVerification
                title={config.title}
                mobile={mobile}
                bannerImg={config.bannerImg}
                bannerAlt={config.bannerAlt}
                bannerPosition={config.bannerPosition}
                backPath={config.backPath}
                onVerify={handleVerify}
                role={config.role}
            />
        );
    };

    VerificationComponent.displayName = `${config.role}VerificationPage`;
    return VerificationComponent;
};

export default createVerificationPage;
