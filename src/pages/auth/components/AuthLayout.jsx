import AuthBanner from './AuthBanner';
import AuthBackButton from './AuthBackButton';

const AuthLayout = ({
    bannerImg,
    bannerAlt = 'Auth Banner',
    bannerPosition = 'object-center',
    maxWidth = 'max-w-[460px] xl:max-w-[480px]',
    backPath = '/',
    children
}) => {

    return (
        <div className="h-[100dvh] max-h-[100dvh] overflow-hidden bg-white flex flex-col md:flex-row">
            <AuthBanner
                image={bannerImg}
                alt={bannerAlt}
                objectPosition={bannerPosition}
            />

            <div className="w-full md:w-1/2 h-full flex flex-col relative px-6 sm:px-12 md:px-12 xl:px-20 py-4 sm:py-6 md:py-8 overflow-y-auto">
                <div className="w-full shrink-0 flex justify-start">
                    <AuthBackButton
                        to={backPath}
                        className="-ml-2 w-fit z-10"
                    />
                </div>
                
                <div className={`w-full ${maxWidth} mx-auto my-auto pt-2 pb-4`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
