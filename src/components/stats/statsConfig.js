import { Store, PaintBucket, Ticket, MessageSquareMore } from "lucide-react";

export const statsConfig = [
  {
    key: "totalPainters",
    label: "Total Painters",
    icon: PaintBucket,
    accentColor: "orange",
  },
  {
    key: "totalDealers",
    label: "Total Dealers",
    icon: Store,
    accentColor: "blue",
  },
  {
    key: "totalCoupons",
    label: "Generate Coupons",
    icon: Ticket,
    accentColor: "green",
  },
  {
    key: "totalVisitEnquiries",
    label: "Visit Enquiries",
    icon: MessageSquareMore,
    accentColor: "purple",
  },
];
