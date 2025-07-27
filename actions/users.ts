/*
    User related actions
*/

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSupabaseClaimsAndCheck } from "./auth";


/*
    Used for getting the role of the current authenticated user
*/
export async function getRole() {
    const supabase = await createClient();

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (!user) {
        console.error(
            "Can not get role. User is not authenticated. Redirecting to login..."
        );
        redirect("/login");
    }

    console.log("Sub: " + user.sub);

    const { data: account, error: accountError } = await supabase
        .from("account")
        .select("role")
        .eq("auth_user_id", user.sub)
        .single();

    if (accountError || !account) {
        console.error(
            "Can not get account. Every user should map to an account. Redirecting to login..."
        );
        console.error(accountError);
        redirect("/login");
    }

    const role = account.role;
    console.log(role);
    return role;
}

export async function checkUserInstitution() {
    const { supabase, user } = await getSupabaseClaimsAndCheck(true);

    const { data: account, error: accountError } = await supabase
        .from("account")
        .select("institution_id")
        .eq("auth_user_id", user.sub)
        .single();

    if (!account || accountError) {
        console.error(
            "Can not get account to check user institution: " + accountError
        );
        redirect("/login");
    }

    const userInstitution = account.institution_id;

    if (!userInstitution) return false;
    return true;
}
