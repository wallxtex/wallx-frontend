export const BASE_QR_CASH_PER_UNIT = 90; // ₹90 per bucket or bag

const createPainter = ([
  rank,
  id,
  name,
  phoneMasked,
  city,
  state,
  bucketsScanned,
  tier,
  monthlyGrowth,
  badgeColor,
  avatarBg,
  avatarInitials,
  joinedYear,
  recentReward,
  specialty
]) => ({
  rank,
  id,
  name,
  phoneMasked,
  city,
  state,
  bucketsScanned,
  totalRedeemedAmount: bucketsScanned * BASE_QR_CASH_PER_UNIT,
  tier,
  monthlyGrowth,
  badgeColor,
  avatarBg,
  avatarInitials,
  joinedYear,
  recentReward,
  specialty,
  verified: true,
});

const PAINTERS_RAW_DATA = [
  [
    1, "p-01", "Rameshwar Sharma", "+91 98765 •••••", "Jaipur", "Rajasthan",
    2050, "Diamond Crown", "+24%", "from-amber-400 to-yellow-600",
    "bg-amber-100 text-amber-800 border-amber-300", "RS", "2023",
    "Royal Enfield 350 Milestone", "Luxury Italian Stucco & Venetian Finishes"
  ],
  [
    2, "p-02", "Suresh Kumar Yadav", "+91 94140 •••••", "Lucknow", "Uttar Pradesh",
    1720, "Diamond", "+18%", "from-slate-300 to-slate-500",
    "bg-slate-100 text-slate-800 border-slate-300", "SY", "2023",
    "Smart TV + Gold Coin 10g", "Rustic Stone & Microcement Coating"
  ],
  [
    3, "p-03", "Manoj Chaurasia", "+91 98291 •••••", "Indore", "Madhya Pradesh",
    1510, "Platinum", "+15%", "from-amber-600 to-amber-800",
    "bg-orange-100 text-orange-800 border-orange-300", "MC", "2024",
    "Pro Spray Gun Kit + ₹10K Bonus", "Metallic Velvet & Granite Textures"
  ],
  [
    4, "p-04", "Gurpreet Singh", "+91 98150 •••••", "Ludhiana", "Punjab",
    1320, "Platinum", "+12%", "from-gray-700 to-gray-900",
    "bg-red-50 text-[#d82b2b] border-red-200", "GS", "2023",
    "Smartphone + Toolkit Set", "Exterior Weather Armor & Marmorino"
  ],
  [
    5, "p-05", "Anand Verma", "+91 97920 •••••", "Varanasi", "Uttar Pradesh",
    1100, "Gold Plus", "+20%", "from-yellow-500 to-amber-600",
    "bg-amber-50 text-amber-700 border-amber-200", "AV", "2024",
    "₹8,000 Direct Bank Bonus", "Heritage Textured Lime Plaster"
  ],
  [
    6, "p-06", "Babu Lal Meena", "+91 96024 •••••", "Kota", "Rajasthan",
    980, "Gold", "+9%", "from-yellow-500 to-amber-600",
    "bg-yellow-50 text-yellow-800 border-yellow-200", "BM", "2024",
    "Airless Spray Machine Subsidy", "Rough-Cast & Flake Finishes"
  ],
  [
    7, "p-07", "Deepak Prajapati", "+91 99360 •••••", "Patna", "Bihar",
    850, "Gold", "+14%", "from-yellow-500 to-amber-600",
    "bg-blue-50 text-blue-700 border-blue-200", "DP", "2024",
    "Safety Kit & Premium Brushes", "Textured Wall Putty & Basecoats"
  ],
  [
    8, "p-08", "Mukesh Saini", "+91 94600 •••••", "Chandigarh", "Punjab",
    730, "Silver Elite", "+8%", "from-gray-400 to-gray-600",
    "bg-slate-100 text-slate-700 border-slate-300", "MS", "2025",
    "₹5,000 Festive Gift Voucher", "Concrete Look & Industrial Finishes"
  ],
  [
    9, "p-09", "Kailash Chand Joshi", "+91 98280 •••••", "Dehradun", "Uttarakhand",
    610, "Silver Elite", "+11%", "from-gray-400 to-gray-600",
    "bg-emerald-50 text-emerald-700 border-emerald-200", "KJ", "2025",
    "WallX Branded Uniform & Bag", "High-Build Textured Acrylics"
  ],
  [
    10, "p-10", "Mohammad Irfan", "+91 97190 •••••", "Agra", "Uttar Pradesh",
    540, "Silver", "+16%", "from-gray-400 to-gray-600",
    "bg-purple-50 text-purple-700 border-purple-200", "MI", "2025",
    "Digital Bluetooth Speaker + T-shirt", "Sand Finish & Travertino Textures"
  ],
];

export const TOP_PAINTERS_DATA = PAINTERS_RAW_DATA.map(createPainter);

export const PAINTER_SCHEMES = [
  {
    id: "scheme-1",
    title: "Standard QR Cash Benefit",
    tag: "Guaranteed Payout",
    badge: "Active",
    badgeColor: "bg-emerald-500 text-white",
    cashback: "₹90 Flat per Bucket / Bag",
    description: "Scan the silver tamper-proof QR code on every WallX Luxury Texture bucket or bag and receive flat ₹90 instant cash directly transferred to your bank/UPI in 5 seconds.",
    validity: "Standard Ongoing Offer",
    highlight: "Flat ₹90 Instant UPI / Bank Credit per Unit",
    minRequirement: "1 Bucket / Bag Scan",
    category: "cashback",
    features: [
      "Flat ₹90 guaranteed cash on every single bucket or bag",
      "Instant transfer to Google Pay, PhonePe, Paytm, or Bank NEFT",
      "Real-time SMS & WhatsApp transaction slip",
      "No ceiling or redemption limit per painter",
    ],
  },
  {
    id: "scheme-2",
    title: "Contractor 100-Bag Milestone Bonus",
    tag: "Mega Milestone",
    badge: "High Reward",
    badgeColor: "bg-[#d82b2b] text-white",
    cashback: "₹15,000 Mega Cash Bonus",
    description: "Scan 100 buckets or bags within 90 days to earn an extra ₹15,000 mega bonus in addition to the standard ₹90 cash per unit (Total ₹24,000+).",
    validity: "Valid for Q3 & Q4 2026",
    highlight: "₹90/Unit Cash + ₹15,000 Milestone Bonus",
    minRequirement: "100 Units Scanned",
    category: "milestone",
    features: [
      "Earn ₹9,000 standard cash + ₹15,000 bonus = ₹24,000 Total",
      "Free onsite technical certification by WallX experts",
      "VIP invitation to WallX Annual Star Painter Gala",
      "Priority customer texture leads in your local area",
    ],
  },
  {
    id: "scheme-3",
    title: "First Scan Welcome Gift for New Painters",
    tag: "New Painter Offer",
    badge: "Welcome Gift",
    badgeColor: "bg-blue-600 text-white",
    cashback: "₹90 + ₹250 Welcome Bonus",
    description: "New to WallX? Register your mobile number, scan your first bucket or bag, and receive ₹90 instant cash plus a ₹250 first-time welcome bonus.",
    validity: "Ongoing for all new registrations",
    highlight: "₹340 Total Earning on 1st Scan",
    minRequirement: "First-time Registered Painters",
    category: "cashback",
    features: [
      "Instant mobile OTP & Aadhaar verification",
      "Welcome starter kit mailed to your doorstep",
      "Free accidental insurance coverage of ₹2,00,000",
      "Dedicated relationship manager support",
    ],
  },
  {
    id: "scheme-4",
    title: "Painter Mitra Referral Bonus",
    tag: "Referral Bonus",
    badge: "Unlimited",
    badgeColor: "bg-teal-600 text-white",
    cashback: "₹500 per Active Painter Friend",
    description: "Refer fellow painter friends to WallX Mitra. Receive ₹500 direct bank cash when your friend registers and scans their first 3 buckets or bags.",
    validity: "Permanent Offer",
    highlight: "Earn unlimited referral cash rewards",
    minRequirement: "Refer via unique link/code",
    category: "referral",
    features: [
      "Share referral link via WhatsApp in one click",
      "Bonus credited automatically upon friend's 3rd scan",
      "No ceiling limit on how many friends you can refer",
      "Leaderboard bonus for top referrers each month",
    ],
  },
];

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
