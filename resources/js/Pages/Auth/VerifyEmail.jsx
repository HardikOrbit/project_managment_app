import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <CardHeader>
                <CardTitle>Verify Email</CardTitle>
                <CardDescription>
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {status === "verification-link-sent" && (
                    <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="flex flex-col gap-1 justify-center text-center">
                        <Button disabled={processing}>
                            Resend Verification Email
                        </Button>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
