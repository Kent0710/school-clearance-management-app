"use client";

import { joinInstitutionFormSchema } from "@/types/formSchemaTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { joinInstitution } from "@/actions/institution";
import { toast } from "sonner";

const JoinInstitutionForm = () => {
    const form = useForm<z.infer<typeof joinInstitutionFormSchema>>({
        resolver: zodResolver(joinInstitutionFormSchema),
        defaultValues: {
            joinCode: "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof joinInstitutionFormSchema>
    ) => {
        toast.loading("Joining institution...");
        const res = await joinInstitution(values);
        toast.dismiss();
        if (res.success) {
            toast.success("Institution joined.");
            return;
        }
        toast.error("Failed to join institution. " + res.error.toString());
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="joinCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Institution Join Code </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter join code here..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" asChild>
                    <DialogClose> Join institution </DialogClose>
                </Button>
            </form>
        </Form>
    );
};

export default JoinInstitutionForm;
