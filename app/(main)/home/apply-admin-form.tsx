"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    applyInstitutionAdminFormSchema,
    applyOfficeAdminFormSchema,
} from "@/types/formSchemaTypes";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { applyAsInstitutionAdmin } from "@/actions/institution";
import { toast } from "sonner";

export const ApplyInstitutionAdminForm = () => {
    const form = useForm<z.infer<typeof applyInstitutionAdminFormSchema>>({
        resolver: zodResolver(applyInstitutionAdminFormSchema),
        defaultValues: {
            institution_join_code: "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof applyInstitutionAdminFormSchema>
    ) => {
        toast.loading("Sending institution admin application...")
        const res = await applyAsInstitutionAdmin(values);
        toast.dismiss();
        if (res.success) {
            toast.success("Institution admin application sent.")
        };
        toast.error(res.error);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 my-4"
            >
                <FormField
                    control={form.control}
                    name="institution_join_code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Institution admin join code </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter admin join code..."
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription> This is the specific institution join code. Each institution has a unique join code. </FormDescription>
                        </FormItem>
                    )}
                />
                <Button type="submit"> Apply as institution admin </Button>
            </form>
        </Form>
    );
};

export const ApplyOfficeAdminForm = () => {
    const form = useForm<z.infer<typeof applyOfficeAdminFormSchema>>({
        resolver: zodResolver(applyOfficeAdminFormSchema),
        defaultValues: {
            office_join_code: "",
            institution_join_code: "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof applyOfficeAdminFormSchema>
    ) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 my-4"
            >
                <FormField
                    control={form.control}
                    name="institution_join_code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Institution admin join code </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter admin join code..."
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription> This is the specific institution join code. Each institution has a unique join code. </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="office_join_code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Office admin join code </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter admin join code..."
                                />
                            </FormControl>
                            <FormMessage />
                            <FormDescription> This is the specific office join code. Each office has a unique join code. </FormDescription>
                        </FormItem>
                    )}
                />
                <Button type="submit"> Apply as office admin </Button>
            </form>
        </Form>
    );
};
