import {
    LayoutDashboard,
    Store,
    PaintBucket,
    Ticket,
    MessageSquareMore,
} from "lucide-react";

export const adminMenu = [
    {
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Dealer",
        path: "/admin/dealer-page",
        icon: Store,
    },
    {
        label: "Painter",
        path: "/admin/painter-page",
        icon: PaintBucket,
    },
    {
        label: "Generate Coupons",
        path: "/admin/generate-coupon",
        icon: Ticket,
    },
    {
        label: "Visit Enquires",
        path: "/admin/visit-enquiry",
        icon: MessageSquareMore,
    },
];
