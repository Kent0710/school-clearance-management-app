/*
    Used by OfficeTaskContainer component
    Form to send a notice to an office that an office task was already accomplished but is not reflecting
*/

"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

import { alreadyAccomplishedFormSchema } from "@/types/formSchemaTypes";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

interface AlreadyAccomplishedFormProps {
    taskId: string;
}
const AlreadyAccomplishedForm: React.FC<AlreadyAccomplishedFormProps> = ({
    taskId,
}) => {
    const form = useForm<z.infer<typeof alreadyAccomplishedFormSchema>>({
        resolver: zodResolver(alreadyAccomplishedFormSchema),
        defaultValues: {
            message: "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof alreadyAccomplishedFormSchema>
    ) => {
        console.log(values + taskId);
    };

    return (
        <Dialog>
            <DialogTrigger className="text-blue-500 underline">
                Click here
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Already accomplished?</DialogTitle>
                    <DialogDescription>
                        Tell the office that you already accomplished this task
                        for clearance. Add a message (optional) or directly send
                        this notice.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Message (Optional) </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Type your message here..."
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit"> Send notice </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AlreadyAccomplishedForm;
