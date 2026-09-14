import { Users, PaintBucket, Store } from "lucide-react";

export const createFilterCards = (counts) => [
  {
    id: "All",
    label: "All Visitors",
    count: counts.all,
    icon: Users,
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    textColor: "text-blue-700",
  },
  {
    id: "Painter",
    label: "Painters",
    count: counts.painters,
    icon: PaintBucket,
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-500",
    textColor: "text-orange-700",
  },
  {
    id: "Dealer",
    label: "Dealers",
    count: counts.dealers,
    icon: Store,
    color: "green",
    gradient: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
    textColor: "text-green-700",
  },
];
