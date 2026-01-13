import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Team() {
    return (
        <AuthenticatedLayout>
            <Head title="Team" />

             <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-[#171717]">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    Team page
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
