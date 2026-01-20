import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";

export default function TextField({
    form,
    name,
    label,
    placeholder,
    type = "text",
}) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
