const FormField = ({ label, error, className = '', children }) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-[0.7rem] sm:text-xs lg:text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1 lg:mb-1.5">
                    {label}
                </label>
            )}
            {children}
            {error && (
                <p className="mt-1 text-xs text-[#d82b2b] leading-tight">{error}</p>
            )}
        </div>
    );
};

export default FormField;
