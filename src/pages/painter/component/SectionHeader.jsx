export const SectionHeader = ({
  badgeIcon,
  badgeText,
  title,
  description,
  badgeClass = 'bg-red-50 border-red-200 text-[#d82b2b]'
}) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs sm:text-sm font-semibold mb-3 ${badgeClass}`}>
        {badgeIcon}
        <span>{badgeText}</span>
      </div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-base sm:text-lg text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
