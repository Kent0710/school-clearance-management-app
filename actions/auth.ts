"use server";

import { createClient } from "@/lib/supabase/server";
import { authFormSchema } from "@/types/formSchemaTypes";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createAccount(values: z.infer<typeof authFormSchema>) {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase.auth.signUp({
            email: values.username + "@gmail.com",
            password: values.password,
        });

        if (error || !data.user) {
            return {
                success: false,
                error: error,
            };
        }

        // Create account on the public table of account (not on the auth)
        const { error: insertAccountError } = await supabase
            .from("account")
            .insert({
                username: values.username,
                role: values.role,
                auth_user_id: data.user.id,
            });

        if (insertAccountError) {
            console.error(
                "Error on creating account in public table.",
                +insertAccountError.message
            );
            await supabase.auth.signOut();
        }

        return {
            success: true,
            error: "",
        };
    } catch (err) {
        console.error(err);
        throw new Error(
            "Server error on creating account. See console for more information."
        );
    }
}

export async function login(values: z.infer<typeof authFormSchema>) {
    const supabase = await createClient();

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: values.username + "@gmail.com",
            password: values.password,
        });

        if (error) {
            return {
                success: false,
                error: "Invalid login credentials.",
            };
        }

        return {
            success: true,
            error: "",
        };
    } catch (err) {
        console.error("ERR at server auth.ts, ACTION: logging in." + err);
        throw new Error("Server error on logging in. Refresh and try again.");
    }
}

export async function signOut() {
    const supabase = await createClient();

    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return {
                success: false,
                error: "Failed to sign out." + error,
            };
        }

        return {
            success: true,
            error: "",
        };
    } catch (err) {
        console.error(err);
        throw new Error("Server error on signing out.");
    }
}

export async function getSupabaseClaimsAndCheck(includeUser: boolean = false) {
    const supabase = await createClient();

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (!user) {
        console.error(
            "Can not get claims. User is not authenticated. Redirecting to login..."
        );
        redirect("/login");
    }

    if (includeUser) {
        return { supabase, user };
    }

    return {supabase}
}

export async function getAccount() {
    const { supabase, user } = await getSupabaseClaimsAndCheck(true);
    const { data: account, error: accountError } = await supabase
        .from("account")
        .select("*")
        .eq("auth_user_id", user!.sub)
        .single();

    if (!account || accountError) {
        console.error(
            `No account found. ERR: ${accountError}. Redirecting to login...`
        );
        redirect("/login");
    }

    return { supabase, account };
}
