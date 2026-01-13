import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <CardHeader>
                <CardDescription className="text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
                <form onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-1">
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                isFocused={true}
                                placeholder="Enter your email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError message={errors.email} />
                        </div>

                        <Button disabled={processing}>
                            Email Password Reset Link
                        </Button>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
