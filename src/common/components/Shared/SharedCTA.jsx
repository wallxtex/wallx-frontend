import { Link } from 'react-router-dom';
import SharedSection from './SharedSection';

const SharedCTA = ({
  icon,
  title,
  description,
  primaryBtnText,
  primaryBtnIcon,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnIcon,
  secondaryBtnLink,
  footerNote
}) => {
  return (
    <SharedSection className="bg-white text-gray-900 relative overflow-hidden border-t border-gray-100">
      {/* Glow gradient blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#d82b2b] rounded-full blur-[100px]" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 text-[#d82b2b] flex items-center justify-center text-3xl mx-auto shadow-sm mb-6">
          {icon}
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={primaryBtnLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#d82b2b] hover:bg-[#b82222] text-white font-bold text-base shadow-xl shadow-red-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {primaryBtnIcon && <span className="text-xl">{primaryBtnIcon}</span>}
            {primaryBtnText}
          </Link>
          <a
            href={secondaryBtnLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-medium text-base transition-all"
          >
            {secondaryBtnIcon && <span className="text-xl">{secondaryBtnIcon}</span>}
            {secondaryBtnText}
          </a>
        </div>

        {footerNote && (
          <p className="mt-6 text-xs text-gray-500">
            {footerNote}
          </p>
        )}
      </div>
    </SharedSection>
  );
};

export default SharedCTA;
