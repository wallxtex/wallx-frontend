

const SCHEME_KEYS = [
  'id', 'title', 'tag', 'badge', 'badgeColor', 'cashback',
  'description', 'validity', 'highlight', 'minRequirement',
  'category', 'features'
];

const createScheme = (raw) => {
  const scheme = {};
  SCHEME_KEYS.forEach((key, i) => {
    scheme[key] = raw[i];
  });
  return scheme;
};

const SCHEMES_RAW_DATA = [
  [
    "scheme-1",
    "Standard QR Cash Benefit",
    "Guaranteed Payout",
    "Active",
    "bg-emerald-500 text-white",
    "₹90 Flat per Bucket / Bag",
    "Scan the silver tamper-proof QR code on every WallX Luxury Texture bucket or bag and receive flat ₹90 instant cash directly transferred to your bank/UPI in 5 seconds.",
    "Standard Ongoing Offer",
    "Flat ₹90 Instant UPI / Bank Credit per Unit",
    "1 Bucket / Bag Scan",
    "cashback",
    [
      "Flat ₹90 guaranteed cash on every single bucket or bag",
      "Instant transfer to Google Pay, PhonePe, Paytm, or Bank NEFT",
      "Real-time SMS & WhatsApp transaction slip",
      "No ceiling or redemption limit per painter",
    ]
  ],
  [
    "scheme-2",
    "Contractor 100-Bag Milestone Bonus",
    "Mega Milestone",
    "High Reward",
    "bg-[#d82b2b] text-white",
    "₹15,000 Mega Cash Bonus",
    "Scan 100 buckets or bags within 90 days to earn an extra ₹15,000 mega bonus in addition to the standard ₹90 cash per unit (Total ₹24,000+).",
    "Valid for Q3 & Q4 2026",
    "₹90/Unit Cash + ₹15,000 Milestone Bonus",
    "100 Units Scanned",
    "milestone",
    [
      "Earn ₹9,000 standard cash + ₹15,000 bonus = ₹24,000 Total",
      "Free onsite technical certification by WallX experts",
      "VIP invitation to WallX Annual Star Painter Gala",
      "Priority customer texture leads in your local area",
    ]
  ],
  [
    "scheme-3",
    "First Scan Welcome Gift for New Painters",
    "New Painter Offer",
    "Welcome Gift",
    "bg-blue-600 text-white",
    "₹90 + ₹250 Welcome Bonus",
    "New to WallX? Register your mobile number, scan your first bucket or bag, and receive ₹90 instant cash plus a ₹250 first-time welcome bonus.",
    "Ongoing for all new registrations",
    "₹340 Total Earning on 1st Scan",
    "First-time Registered Painters",
    "cashback",
    [
      "Instant mobile OTP & Aadhaar verification",
      "Welcome starter kit mailed to your doorstep",
      "Free accidental insurance coverage of ₹2,00,000",
      "Dedicated relationship manager support",
    ]
  ],
  [
    "scheme-4",
    "Painter Mitra Referral Bonus",
    "Referral Bonus",
    "Unlimited",
    "bg-teal-600 text-white",
    "₹500 per Active Painter Friend",
    "Refer fellow painter friends to WallX Mitra. Receive ₹500 direct bank cash when your friend registers and scans their first 3 buckets or bags.",
    "Permanent Offer",
    "Earn unlimited referral cash rewards",
    "Refer via unique link/code",
    "referral",
    [
      "Share referral link via WhatsApp in one click",
      "Bonus credited automatically upon friend's 3rd scan",
      "No ceiling limit on how many friends you can refer",
      "Leaderboard bonus for top referrers each month",
    ]
  ]
];

export const PAINTER_SCHEMES = SCHEMES_RAW_DATA.map(createScheme);

export const REDEEM_STEPS = [
  {
    stepNumber: "01",
    title: "Purchase WallX Buckets or Bags",
    subtitle: "Buy any WallX Luxury Texture coating bucket or bag from your authorized local dealer.",
    icon: "bucket",
  },
  {
    stepNumber: "02",
    title: "Scratch & Scan QR Code",
    subtitle: "Scratch the tamper-proof silver QR coupon under the lid or bag seal using your smartphone.",
    icon: "qr",
  },
  {
    stepNumber: "03",
    title: "Instant ₹90 UPI / Bank Credit",
    subtitle: "Receive flat ₹90 per unit transferred directly into your UPI ID / Bank account within 5 seconds!",
    icon: "cash",
  },
];

export const PAINTER_STATS = {
  activePainters: "14,850+",
  totalCashDisbursed: "₹ 3.82 Cr+",
  ratePerUnit: "₹90 / Bucket or Bag",
  averageDailyEarnings: "₹ 1,350 (15 scans)",
  citiesCovered: "120+ Cities",
  instantPayoutRate: "99.9%",
};
