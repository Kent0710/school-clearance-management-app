"use client";

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
import { authFormSchema } from "@/types/formSchemaTypes";
import { useState } from "react";
import { createAccount, login } from "@/actions/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const authMethods = {
    login: {
        key: "login",
        description: "Login to your existing account.",
        action: login,
        buttonText: "Login",
        switchText: "Create account",
        successMessage: "Logged in.",
    },
    createAccount: {
        key: "createAccount",
        description: "Create a new account.",
        action: createAccount,
        buttonText: "Create account",
        switchText: "Login",
        successMessage: "Account created.",
    },
} as const;

const AuthForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [authMethod, setAuthMethod] =
        useState<keyof typeof authMethods>("login");

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            username: "",
            password: "",
            role: "student",
        },
    });

    const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
        setIsLoading(true);
        const res = await authMethods[authMethod].action(values);
        if (!res.success) {
            setIsLoading(false);
            toast.error(res.error?.toString());
            return;
        }
        toast.success(authMethods[authMethod].successMessage);
        redirect("/home");
    };

    const toggleMethod = () => {
        setAuthMethod((prev) => (prev === "login" ? "createAccount" : "login"));
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="shadow-md border p-10 rounded-lg my-10 md:my-0 w-full md:w-[80%] lg:w-[70%] space-y-6"
            >
                <div className="text-center">
                    <p className="text-2xl font-bold"> SCMS </p>
                    <p className="text-sm text-muted-foreground">
                        {authMethods[authMethod].description}
                    </p>
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter password"
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <div className="flex space-x-2">
                                {["student", "unassigned_admin"].map(
                                    (value) => (
                                        <Button
                                            key={value}
                                            type="button"
                                            className={`flex-1 bg-white border text-black hover:bg-white border-dashed ${
                                                field.value === value &&
                                                "border-blue-500"
                                            }`}
                                            onClick={() =>
                                                field.onChange(value)
                                            }
                                        >
                                            {value === "student"
                                                ? "Student"
                                                : "Unassigned Admin"}
                                        </Button>
                                    )
                                )}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col space-y-2">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <>{authMethods[authMethod].buttonText}</>
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant={"secondary"}
                        onClick={toggleMethod}
                        disabled={isLoading}
                    >
                        {authMethods[authMethod].switchText}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AuthForm;
