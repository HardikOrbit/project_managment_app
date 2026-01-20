import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/Components/ui/form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/Components/ui/select";

export default function SelectField({ form, name, label, options = [] }) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={`Select ${label}`} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.id}
                                    value={String(option.id)}
                                >
                                    {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
