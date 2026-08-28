const DEALER_SCHEMES_RAW = [
  [
    "dealer-scheme-1", "volume", "High Reward", "bg-emerald-500 text-white", "Bulk Purchase",
    "Volume Purchase Multiplier", "Up to 15% Additional Discount",
    "Unlock up to 15% extra discount on top of base margins when you order 500+ luxury texture buckets in a single billing cycle.",
    "Valid for Q3 & Q4 2026", "15% Extra Margin on 500+ Units",
    [
      "Direct adjustment in billing invoice",
      "Priority dispatch for large orders",
      "Dedicated account manager",
      "Free marketing collaterals and branding"
    ]
  ],
  [
    "dealer-scheme-2", "milestone", "Mega Milestone", "bg-[#d82b2b] text-white", "Annual Target",
    "International Dealer Trip", "Free Trip to Dubai",
    "Achieve an annual sales target of ₹50 Lakhs and secure an all-expenses-paid 4N/5D trip to Dubai for you and your spouse.",
    "Valid for FY 2026-2027", "All-Expenses-Paid Dubai Trip",
    [
      "5-Star accommodation and flights included",
      "Gala dinner with WallX leadership",
      "Networking with top national dealers",
      "Special factory tour in UAE"
    ]
  ],
  [
    "dealer-scheme-3", "new", "Welcome Gift", "bg-blue-600 text-white", "New Partner",
    "New Dealer Starter Kit", "Free Display Unit + Samples",
    "Partner with WallX and place your first order of 50 units to receive a premium showroom display stand and a complete shade card kit.",
    "Ongoing for all new dealers", "Premium Showroom Display",
    [
      "Free premium metal display stand",
      "Complete set of luxury texture shade cards",
      "Training session for staff",
      "Store branding and glow sign board"
    ]
  ]
];

const SCHEME_KEYS = [
  'id', 'category', 'badge', 'badgeColor', 'tag', 'title', 'cashback',
  'description', 'validity', 'highlight', 'features'
];

export const DEALER_SCHEMES = DEALER_SCHEMES_RAW.map(raw => {
  const scheme = {};
  SCHEME_KEYS.forEach((key, i) => {
    scheme[key] = raw[i];
  });
  return scheme;
});

const TOP_DEALERS_RAW = [
  ["d-01", 1, "Sharma Traders", "Jaipur", "Rajasthan", 490, "Diamond Crown", "bg-amber-100 text-amber-800 border-amber-300", "ST", "Dubai Trip Winner"],
  ["d-02", 2, "Yadav Paints & Hardware", "Lucknow", "Uttar Pradesh", 450, "Diamond", "bg-slate-100 text-slate-800 border-slate-300", "YP", "Goa Trip Winner"],
  ["d-03", 3, "Chaurasia Building Materials", "Indore", "Madhya Pradesh", 420, "Platinum", "bg-orange-100 text-orange-800 border-orange-300", "CB", "Smart TV"],
  ["d-04", 4, "Singh Colors", "Ludhiana", "Punjab", 380, "Platinum", "bg-red-50 text-[#d82b2b] border-red-200", "SC", null],
  ["d-05", 5, "Verma Paint House", "Varanasi", "Uttar Pradesh", 350, "Gold Plus", "bg-amber-50 text-amber-700 border-amber-200", "VP", null],
  ["d-06", 6, "Gupta Enterprises", "Patna", "Bihar", 310, "Gold Plus", "bg-yellow-50 text-yellow-800 border-yellow-200", "GE", null],
  ["d-07", 7, "Agrawal Hardware", "Surat", "Gujarat", 280, "Gold", "bg-blue-50 text-blue-700 border-blue-200", "AH", null],
  ["d-08", 8, "Reddy Paint Agency", "Hyderabad", "Telangana", 240, "Silver Elite", "bg-slate-100 text-slate-700 border-slate-300", "RP", null],
  ["d-09", 9, "Das Paints & Co.", "Kolkata", "West Bengal", 190, "Silver Elite", "bg-emerald-50 text-emerald-700 border-emerald-200", "DP", null],
  ["d-10", 10, "Jain Colors", "Pune", "Maharashtra", 120, "Silver", "bg-purple-50 text-purple-700 border-purple-200", "JC", null]
];

const DEALER_KEYS = [
  'id', 'rank', 'name', 'city', 'state', 'bucketsOrdered', 'tier', 'avatarBg', 'avatarInitials', 'recentReward'
];

export const TOP_DEALERS_DATA = TOP_DEALERS_RAW.map(raw => {
  const dealer = {};
  DEALER_KEYS.forEach((key, i) => {
    dealer[key] = raw[i];
  });
  dealer.verified = true;
  dealer.totalBonusEarned = dealer.bucketsOrdered * 150;
  return dealer;
});
