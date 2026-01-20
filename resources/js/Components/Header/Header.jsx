import { Link } from "@inertiajs/react";
import React, { useContext, useState } from "react";
import { Menu, Search, Sun, Moon, Bell } from "lucide-react";
import { Button } from "@headlessui/react";
import { ThemeContext } from "@/Context/ThemeContext";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import Modal from "../Modal";

const Header = ({ user }) => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b text-white bg-gray-100 dark:bg-black px-6 border-b border-gray-300 dark:border-[#232323]">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-black dark:text-white"
                >
                    <Menu size={18} />
                </Button>
                <div className="flex-1 max-w-lg mx-auto relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#252525] dark:text-slate-200" />
                    <Input
                        type="search"
                        placeholder="Search something..."
                        className="pl-9 h-9 w-full rounded-full border-[#a1a1a1] dark:border-none focus-visible:ring-0 dark:focus-visible:ring-1 dark:bg-[#252525] text-[#252525] placeholder:text-[#252525] dark:text-white dark:placeholder:text-slate-200"
                    />
                </div>
                <div className="flex items-center gap-4 ml-auto">
                    {/* Light/Dark button */}
                    <Button
                        onClick={toggleDarkMode}
                        variant="icon_header"
                        size="icon"
                        className="cursor-pointer bg-white shadow-sm dark:bg-[#252525] rounded-full p-2 flex justify-center items-center focus:ring-[#252525]"
                    >
                        {isDarkMode ? (
                            <Sun
                                size={18}
                                className="dark:text-white text-black"
                            />
                        ) : (
                            <Moon
                                size={18}
                                className="dark:text-white text-black"
                            />
                        )}
                    </Button>

                    {/* Notification Button */}
                    <Button
                        onClick={() => setShowModal(true)}
                        variant="icon_header"
                        size="icon"
                        className="bg-white shadow-sm dark:bg-[#252525] rounded-full p-2 flex justify-center items-center relative"
                    >
                        <Badge className="p-1 max-w-5 max-h-4 text-[10px] flex items-center justify-center absolute -top-[6px] -right-0 border dark:border-black bg-[#CA4522] text-white">
                            9
                        </Badge>
                        <Bell
                            size={18}
                            className="dark:text-white text-black"
                        />
                    </Button>

                    {/* User Profile */}
                    <div className="flex h-8 w-8 rounded-full overflow-hidden">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("profile.edit")}
                                        className="h-full w-full flex justify-center items-center bg-indigo-500"
                                    >
                                        {user.email?.charAt(0).toUpperCase()}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Profile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </header>

            <Modal
                show={showModal}
                maxWidth="2xl"
                closeable={true}
                onClose={() => setShowModal(false)}
            >
                <div className="p-6">
                    <h2 className="text-lg font-semibold">Modal Title</h2>

                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                        This is the modal content.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => setShowModal(false)}
                            className="rounded bg-gray-200 px-4 py-2 dark:bg-gray-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Header;
