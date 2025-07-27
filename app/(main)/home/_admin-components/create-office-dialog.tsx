"use client";

import { Loader2, Plus } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createOfficeFormSchema } from "@/types/formSchemaTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createOffice } from "@/actions/office";
import { toast } from "sonner";

const CreateOfficeDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    {" "}
                    <Plus size={15} /> Create new office
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new office</DialogTitle>
                    <DialogDescription>
                        Give your new office a name and set a head later.
                    </DialogDescription>
                </DialogHeader>
                <CreateOfficeForm />
            </DialogContent>
        </Dialog>
    );
};

export default CreateOfficeDialog;

const CreateOfficeForm = () => {
    const form = useForm<z.infer<typeof createOfficeFormSchema>>({
        resolver: zodResolver(createOfficeFormSchema),
        defaultValues: {
            officeName: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof createOfficeFormSchema>) => {
        toast.loading("Creating office...");

        const res = await createOffice(values);
        
        toast.dismiss();

        if (!res.success) {
            toast.error(res.error);
            return;
        } 
        toast.success("Office created.");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="officeName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Office name </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter office name..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogClose asChild>
                    <Button type="submit" className="w-full">
                        Create office
                    </Button>
                </DialogClose>
            </form>
        </Form>
    );
};
