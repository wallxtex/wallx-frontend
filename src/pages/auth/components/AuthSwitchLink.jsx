import { Link } from 'react-router-dom';

const AuthSwitchLink = ({ prompt, linkText, to = '/', className = 'mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600' }) => {
    return (
        <div className={className}>
            {prompt}{' '}
            <Link to={to} className="text-[#d82b2b] font-semibold hover:underline">
                {linkText}
            </Link>
        </div>
    );
};

export default AuthSwitchLink;
