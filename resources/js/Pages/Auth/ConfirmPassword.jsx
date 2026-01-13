import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <CardHeader>
                <CardTitle>Confirm password</CardTitle>
                <CardDescription>
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="flex flex-col gap-1">
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    isFocused={true}
                                    placeholder="Enter Password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Button className="w-full" disabled={processing}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </GuestLayout>
    );
}
