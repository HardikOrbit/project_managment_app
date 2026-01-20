import { useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormLayout from "@/Components/ui/FormLayout";
import PageHeadingTitle from "@/Components/ui/PageHeadingTitle";
import RedirectButton from "@/Components/ui/RedirectButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/Components/ui/form";

import TextField from "@/Components/FormFields/TextField";
import SelectField from "@/Components/FormFields/SelectField";

import { applyLaravelErrors } from "@/lib/laravelErrorsToRHF";

export default function User_AddEdit({ user = null, roles = [] }) {
    const isEdit = !!user;
    const { props } = usePage();
    const errors = props.errors || {};

    const form = useForm({
        defaultValues: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            password: "",
            role: user?.role_id?.toString(user.role_id) || "",
        },
    });

    useEffect(() => {
        applyLaravelErrors(errors, form);
    }, [errors, form]);

    const handleSubmit = (data) => {
        if (isEdit) {
            router.put(route("users.update", user.id), data);
        } else {
            router.post(route("users.store"), data);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Edit User" : "Create User"} />

            <PageHeadingTitle
                title={isEdit ? "Edit User" : "Create User"}
                className="lg:mb-7 md:mb-5 mb-3"
            />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                >
                    <FormLayout>
                        <TextField
                            form={form}
                            name="first_name"
                            label="First Name"
                            placeholder="Enter first name"
                        />

                        <TextField
                            form={form}
                            name="last_name"
                            label="Last Name"
                            placeholder="Enter last name"
                        />

                        <TextField
                            form={form}
                            name="email"
                            label="Email"
                            placeholder="Enter Email"
                            type="email"
                        />

                        <TextField
                            form={form}
                            name="password"
                            label={
                                <>
                                    Password{" "}
                                    {isEdit && (
                                        <span className="text-sm text-muted-foreground">
                                            (optional)
                                        </span>
                                    )}
                                </>
                            }
                            placeholder={isEdit ? "Optional" : "Enter password"}
                            type="password"
                        />

                        <SelectField
                            form={form}
                            name="role"
                            label="Role"
                            options={roles}
                        />
                    </FormLayout>

                    <div className="flex items-center gap-3 justify-end">
                        <RedirectButton
                            href={route("users.index")}
                            name="Back"
                        />
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {isEdit ? "Update User" : "Create User"}
                        </Button>
                    </div>
                </form>
            </Form>
        </AuthenticatedLayout>
    );
}
