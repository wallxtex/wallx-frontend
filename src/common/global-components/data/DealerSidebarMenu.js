import {
    LayoutDashboard,
    User,
    Wrench,
} from "lucide-react";

export const dealerMenu = [
    {
        label: "Dashboard",
        path: "/dealer/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Orders",
        path: "/dealer/orders",
        icon: User,
    },
    {
        label: "Settings",
        path: "/dealer/settings",
        icon: Wrench,
    },
];
