import Header from "@/Components/Header/Header";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { ThemeProvider } from "@/Context/ThemeContext";
import { usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="flex">
                    <Sidebar />

                    <div className="flex flex-col flex-grow">
                        <Header user={user} />
                        <main className="flex-grow bg-gray-100 dark:bg-black p-8">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}
