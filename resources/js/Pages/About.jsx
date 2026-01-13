import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <Head title="About Page" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-[#171717]">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    About page
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
