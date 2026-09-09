import { IoTrophy, IoRibbonOutline, IoLocationOutline, IoCheckmarkCircle, IoStar } from 'react-icons/io5';

const createRunnerUpPodium = ({ order, cardBg, crownBg, crownIcon, badgeClass, badgeLabel, boxBg, borderDivider }) => ({
  order,
  cardBg,
  crownBg,
  crownIcon,
  badgeClass,
  badgeIcon: <IoRibbonOutline />,
  badgeLabel,
  avatarClass: 'w-10 h-10 sm:w-20 sm:h-20 border-2 text-[10px] sm:text-2xl font-bold',
  nameSize: 'text-[9px] sm:text-xl font-bold leading-tight',
  boxBg,
  boxLabel: 'text-[7px] sm:text-xs text-gray-500 font-semibold',
  cashColor: 'text-gray-900 text-xs sm:text-2xl font-extrabold',
  borderDivider,
  hasMilestone: false,
});

const PODIUM_CONFIG = {
  1: {
    order: 'order-2 transform -translate-y-2 sm:-translate-y-4 shadow-2xl z-10',
    cardBg: 'bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 border-2 border-amber-400',
    crownBg: 'bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 border-2 sm:border-4 border-white shadow-xl text-amber-950 text-xl sm:text-3xl',
    crownIcon: <IoTrophy className="text-amber-900 drop-shadow w-4 h-4 sm:w-auto sm:h-auto" />,
    badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/30 font-extrabold',
    badgeIcon: <IoStar className="text-white text-[8px] sm:text-xs hidden sm:block" />,
    badgeLabel: '1st Champion',
    avatarClass: 'w-14 h-14 sm:w-24 sm:h-24 border-2 sm:border-4 ring-2 sm:ring-4 ring-amber-100 text-sm sm:text-3xl font-black',
    nameSize: 'text-[11px] sm:text-2xl font-extrabold leading-tight',
    boxBg: 'bg-gradient-to-br from-amber-100/90 to-yellow-50 border border-amber-300/80 shadow-sm',
    boxLabel: 'text-amber-900 font-bold text-[7px] sm:text-xs',
    cashColor: 'text-[#d82b2b] text-sm sm:text-3xl font-black',
    borderDivider: 'border-amber-200 text-amber-950',
    hasMilestone: true,
  },
  2: createRunnerUpPodium({
    order: 'order-1 shadow-md',
    cardBg: 'bg-gradient-to-b from-slate-50 to-white border border-slate-200',
    crownBg: 'bg-gradient-to-tr from-slate-400 to-slate-200 border border-white shadow-md text-slate-800 text-sm sm:text-2xl font-black',
    crownIcon: '2',
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-300 font-bold',
    badgeLabel: '2nd Position',
    boxBg: 'bg-slate-100/80 border border-slate-200',
    borderDivider: 'border-slate-200 text-gray-600',
  }),
  3: createRunnerUpPodium({
    order: 'order-3 shadow-md',
    cardBg: 'bg-gradient-to-b from-orange-50/60 to-white border border-orange-200',
    crownBg: 'bg-gradient-to-tr from-amber-700 to-orange-400 border border-white shadow-md text-white text-sm sm:text-2xl font-black',
    crownIcon: '3',
    badgeClass: 'bg-orange-100 text-orange-800 border border-orange-300 font-bold',
    badgeLabel: '3rd Position',
    boxBg: 'bg-orange-50/70 border border-orange-200',
    borderDivider: 'border-orange-200 text-gray-600',
  }),
};

const PodiumCard = ({ person, metricsConfig }) => {
  const cfg = PODIUM_CONFIG[person.rank];
  if (!cfg) return null;

  const nameParts = person.name.split(' ');
  const lastWord = nameParts.length > 1 ? nameParts.pop() : '';
  const firstWords = nameParts.join(' ');

  return (
    <div className={`${cfg.order} ${cfg.cardBg} rounded-xl sm:rounded-3xl p-2 sm:p-6 hover:shadow-xl transition-all duration-300 relative text-center flex flex-col items-center`}>
      <div className={`w-8 h-8 sm:w-14 sm:h-14 -mt-6 sm:-mt-12 rounded-lg sm:rounded-2xl flex items-center justify-center ${cfg.crownBg}`}>
        {cfg.crownIcon}
      </div>

      <span className={`mt-2 sm:mt-3 inline-flex items-center gap-1 px-1.5 sm:px-3 py-0.5 rounded-full text-[8px] sm:text-xs ${cfg.badgeClass}`}>
        {cfg.badgeIcon} {cfg.badgeLabel} {person.tier && <span className="hidden sm:inline">• {person.tier}</span>}
      </span>

      <div className={`mt-2 sm:mt-4 rounded-full ${person.avatarBg} flex items-center justify-center shadow-inner ${cfg.avatarClass}`}>
        {person.avatarInitials}
      </div>

      <div className={`mt-1.5 sm:mt-3 text-gray-900 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 ${cfg.nameSize}`}>
        <div className="text-center">
          {lastWord ? (
            <>
              <span className="block sm:inline">{firstWords}</span>
              <span className="block sm:inline sm:ml-1">{lastWord}</span>
            </>
          ) : (
            <span>{person.name}</span>
          )}
        </div>
        {person.verified && <IoCheckmarkCircle className="text-blue-500 text-[10px] sm:text-base flex-shrink-0 mt-0.5 sm:mt-0" title="Verified" />}
      </div>

      <div className="mt-0.5 sm:mt-1 flex items-center justify-center gap-0.5 sm:gap-1 text-[7px] sm:text-xs text-gray-500 font-medium">
        <IoLocationOutline className="text-gray-400 text-[8px] sm:text-sm" />
        <span className="truncate max-w-[70px] sm:max-w-full">{person.city}</span><span className="hidden sm:inline">, {person.state}</span>
      </div>

      <div className={`mt-2 sm:mt-5 w-full rounded-lg sm:rounded-2xl p-1.5 sm:p-4 ${cfg.boxBg}`}>
        <div className={`text-[6px] sm:text-xs uppercase tracking-wide leading-tight ${cfg.boxLabel}`}>
          {metricsConfig.primaryLabel}
        </div>
        <div className={`mt-0 sm:mt-0.5 ${cfg.cashColor}`}>
          {metricsConfig.formatPrimary ? metricsConfig.formatPrimary(person[metricsConfig.primaryKey]) : person[metricsConfig.primaryKey]}
        </div>
        <div className={`mt-1 sm:mt-2 pt-1 sm:pt-2 border-t text-center text-[7px] sm:text-xs ${cfg.borderDivider}`}>
          <span className="hidden sm:inline">{metricsConfig.secondaryLabel}: </span><strong>{metricsConfig.formatSecondary ? metricsConfig.formatSecondary(person[metricsConfig.secondaryKey]) : person[metricsConfig.secondaryKey]}</strong>
        </div>
      </div>

      {cfg.hasMilestone && person.recentReward && (
        <div className="mt-1.5 sm:mt-4 p-1 sm:p-2 rounded-md sm:rounded-xl bg-amber-50 text-amber-900 text-[6px] sm:text-xs font-semibold border border-amber-200/60 w-full whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="hidden sm:inline">🎁 Milestone: </span>{person.recentReward}
        </div>
      )}
    </div>
  );
};

export default PodiumCard;
