import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoTimeOutline, IoCheckmarkCircle, IoGiftOutline, IoArrowForward } from 'react-icons/io5';
import SectionHeader from './SectionHeader';
import SharedSection from './SharedSection';

const getGridContainerClass = (count) => {
  if (count === 1) return 'flex justify-center';
  if (count === 2) return 'max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8';
  return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8';
};

const SharedSchemes = ({
  id,
  className = "bg-[#fafafa]",
  headerProps,
  categories,
  schemes,
  contactBannerProps,
  modalTermsHeader = "Offer Terms & Eligibility:",
  modalCtaText = "Register & Start Earning",
  modalCtaLink = "/painter-signup"
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const filteredSchemes = activeCategory === 'all'
    ? schemes
    : schemes.filter(s => s.category === activeCategory);

  return (
    <SharedSection id={id} className={className}>
      <SectionHeader {...headerProps} />

      {/* Category Filter Tabs */}
      {categories && categories.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#d82b2b] text-white shadow-md shadow-red-500/25 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Schemes Grid */}
      <div className={`mt-10 ${getGridContainerClass(filteredSchemes.length)}`}>
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className={`group bg-white rounded-2xl border border-gray-200/80 hover:border-red-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
              filteredSchemes.length === 1 ? 'w-full max-w-md' : ''
            }`}
          >
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${scheme.badgeColor}`}>
                  {scheme.badge}
                </span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                  {scheme.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#d82b2b] transition-colors leading-snug">
                {scheme.title}
              </h3>

              <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-100/80">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Earning Benefit
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-[#d82b2b] mt-0.5 flex items-center gap-1.5">
                  <IoGiftOutline className="text-amber-600" />
                  {scheme.cashback}
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                {scheme.description}
              </p>
            </div>

            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <IoTimeOutline className="text-gray-400 text-sm" />
                <span>{scheme.validity}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScheme(scheme)}
                className="text-xs font-semibold text-[#d82b2b] hover:text-[#b82222] inline-flex items-center gap-1 cursor-pointer transition-transform group-hover:translate-x-1"
              >
                View Details & Terms
                <IoArrowForward className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Special Banner Note */}
      {contactBannerProps && (
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#d82b2b] flex items-center justify-center text-white text-2xl shrink-0 shadow-md">
              {contactBannerProps.icon}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{contactBannerProps.title}</h4>
              <p className="text-sm text-gray-300">
                {contactBannerProps.description}
              </p>
            </div>
          </div>
          <Link
            to={contactBannerProps.linkUrl}
            className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-[#d82b2b] hover:bg-[#b82222] text-white text-sm font-semibold transition-all shrink-0"
          >
            {contactBannerProps.linkText}
          </Link>
        </div>
      )}

      {/* Modal for Scheme Details */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${selectedScheme.badgeColor}`}>
                  {selectedScheme.badge}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2">{selectedScheme.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScheme(null)}
                className="text-gray-400 hover:text-gray-700 text-2xl font-semibold leading-none p-1.5 cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-xs font-semibold text-gray-600">Reward Earning Potential</div>
              <div className="text-xl font-bold text-[#d82b2b] mt-1">{selectedScheme.cashback}</div>
              <div className="text-xs text-gray-500 mt-0.5">{selectedScheme.highlight}</div>
            </div>

            <div className="mt-5 space-y-3">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{modalTermsHeader}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {selectedScheme.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <IoCheckmarkCircle className="text-emerald-500 text-base shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                to={modalCtaLink}
                className="w-full block text-center py-3 bg-[#d82b2b] hover:bg-[#b82222] text-white rounded-xl text-sm font-semibold shadow-md shadow-red-500/20 hover:shadow-lg transition-all"
                onClick={() => setSelectedScheme(null)}
              >
                {modalCtaText}
              </Link>
            </div>
          </div>
        </div>
      )}
    </SharedSection>
  );
};

export default SharedSchemes;
