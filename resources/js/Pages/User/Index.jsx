import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import DataTable from "@/Components/DataTable/DataTable";
import TableCell from "@/Components/DataTable/TableCell";
import PageHeadingTitle from "@/Components/ui/PageHeadingTitle";
import RedirectButton from "@/Components/ui/RedirectButton";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function User_index({ data, can }) {
    const deleteUser = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("users.destroy", id));
        }
    };
    return (
        <AuthenticatedLayout>
            <Head title="All Users" />

            <div className="lg:mb-7 md:mb-5 mb-3 flex items-center gap-3 justify-between">
                <PageHeadingTitle title="Users" />
                <RedirectButton href={route("users.create")} name="Add User" />
            </div>

            <DataTable
                id="users-table"
                ordering={true}
                head={
                    <>
                        <TableCell as="th">First Name</TableCell>
                        <TableCell as="th">Last Name</TableCell>
                        <TableCell as="th">Email</TableCell>
                        <TableCell as="th">Role</TableCell>
                        <TableCell as="th">Actions</TableCell>
                    </>
                }
            >
                {data.map((user) => (
                    <tr key={user.id}>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role?.name}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {can.edit && (
                                    <Link href={route("users.edit", user.id)}>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                )}

                                {can.delete && (
                                    <Button
                                        // size="icon"
                                        className="p-0 bg-transparent hover:bg-transparent shadow-none rounded-0"
                                        variant="destructive"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </TableCell>
                    </tr>
                ))}
            </DataTable>
        </AuthenticatedLayout>
    );
}
