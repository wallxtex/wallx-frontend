const FormField = ({ label, error, className = '', children }) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-[11px] sm:text-[12px] lg:text-[12px] xl:text-[13px] font-semibold uppercase tracking-wider text-gray-600 mb-2 lg:mb-2.5 xl:mb-3">
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
