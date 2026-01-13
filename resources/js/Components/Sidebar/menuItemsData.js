import {
    LayoutDashboard,
    Users,
    Settings,
    Mail,
    Calendar,
    Zap,
    MessageSquare,
    ClipboardList,
} from "lucide-react";

export const menuItems = [
    {
        heading: "MAIN MENU",
        items: [
            { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { path: "/about", label: "Calendar", icon: Calendar },
            { path: "/team", label: "Teams", icon: Users },
            { path: "/activity", label: "Activity", icon: Zap },
            { path: "/message", label: "Message", icon: MessageSquare },
            { path: "/report", label: "Report", icon: ClipboardList },
            { path: "/contact", label: "Contact", icon: Mail },
        ],
    },
    {
        heading: "ACCOUNT",
        items: [
            { path: "/settings", label: "Settings", icon: Settings },
            {
                path: "/user_management",
                label: "User Management",
                icon: Users,
            },
        ],
    },
];
