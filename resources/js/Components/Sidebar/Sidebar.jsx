import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { menuItems } from "./menuItemsData";
import { LogOut } from "lucide-react";
import ApplicationLogo from "../ApplicationLogo";

const Sidebar = () => {
    const { url } = usePage();
    return (
        <aside
            className={
                "sticky top-0 z-30 h-screen w-64 bg-gray-100 dark:bg-black border-r border-gray-300 dark:border-[#232323] transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col translate-x-0 min-h-screen"
            }
        >
            {/* Logo Section */}
            <div className="flex h-16 items-center border-b border-gray-300 dark:border-[#232323] px-6 bg-gray-100 dark:bg-black">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                </Link>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 p-4 overflow-y-auto scroll-smooth">
                {menuItems.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h4 className="text-xs font-semibold font-Poppins text-gray-900 dark:text-gray-300 uppercase tracking-wider mb-3">
                            {section.heading}
                        </h4>
                        <div className="space-y-1">
                            {section.items.map((item, index) => {
                                const isActive = url === item.path;
                                return (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className={`w-full justify-start gap-2 text-sm font-Poppins hover:font-medium hover:text-white hover:bg-gray-400 dark:hover:bg-[#171C2A] dark:hover:text-[#5E8FE4] flex items-center px-4 py-2 rounded-md cursor-pointer ${
                                            isActive
                                                ? "bg-gray-400 dark:bg-[#171C2A] dark:text-[#5E8FE4] font-medium text-white"
                                                : "bg-transparent dark:text-white text-gray-900 font-normal"
                                        }`}
                                    >
                                        <item.icon size={18} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Logout Footer */}
            <div className="p-4 border-t border-gray-300 dark:border-[#232323]">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex hover:bg-[#C1462D] dark:bg-transparent dark:hover:bg-[#C1462D] bg-[#C1462D] border border-[#C1462D] text-[#C1462D] hover:text-white text-white dark:text-[#C1462D] dark:hover:text-white text-sm font-Poppins font-medium items-center py-2 px-4 rounded-md gap-2 w-full justify-between cursor-pointer"
                >
                    Log Out
                    <LogOut size={18} />
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
