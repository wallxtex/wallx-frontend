const AuthHeader = ({ title, subtitle, description, className = 'mb-3 sm:mb-4 lg:mb-4 xl:mb-5' }) => {
    return (
        <div className={className}>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-1 sm:mb-2 lg:mb-3">
                {title}
            </h1>
            {subtitle && (
                <p className="text-[#d82b2b] font-semibold text-xs sm:text-sm lg:text-base mb-1">
                    {subtitle}
                </p>
            )}
            {description && (
                <p className="text-gray-500 text-xs sm:text-sm lg:text-sm leading-tight">
                    {description}
                </p>
            )}
        </div>
    );
};

export default AuthHeader;
