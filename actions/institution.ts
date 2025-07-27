"use server";

import { z } from "zod";
import {
    applyInstitutionAdminFormSchema,
    joinInstitutionFormSchema,
} from "@/types/formSchemaTypes";
import { getAccount, getSupabaseClaimsAndCheck } from "./auth";
import { revalidatePath } from "next/cache";

export async function joinInstitution(
    values: z.infer<typeof joinInstitutionFormSchema>
) {
    const { supabase, account } = await getAccount();

    const { data: institution, error: institutionError } = await supabase
        .from("institution")
        .select("id")
        .eq("join_code", values.joinCode)
        .single();

    if (!institution) {
        return {
            success: false,
            error: "Invalid join code.",
        };
    }

    if (institutionError) {
        console.error(
            "Can not join institution as institution was not found. ERR: " +
                institutionError
        );
        return {
            success: false,
            error: "Something went wrong. Try again. ",
        };
    }

    const institutionId = institution.id;
    const { error: accountError } = await supabase
        .from("account")
        .update({ institution_id: institutionId })
        .eq("id", account.id);

    if (accountError) {
        console.error(
            "Can not join institution on account references. ERR: " +
                accountError.message
        );
        return {
            success: false,
            error: "Something went wrong. Try again.",
        };
    }

    revalidatePath("/home");
    return {
        success: true,
        error: "",
    };
}

export async function applyAsInstitutionAdmin(
    values: z.infer<typeof applyInstitutionAdminFormSchema>
) {
    const { supabase, account } = await getAccount();
    const accountId = account.id;

    const { error: insertApplicationError } = await supabase
        .from("admin_application")
        .insert({
            account_id: accountId,
            office_id: null,
            type: "institution",
            institution_join_code: values.institution_join_code,
        });

    if (insertApplicationError) {
        console.error(
            "Failed to apply as institution admin. ERR: " +
                insertApplicationError.message
        );
        return {
            success: false,
            error: "Can not apply for institution admin. Try again.",
        };
    }

    return {
        success: true,
        error: "",
    };
}

export async function getInstitutionOffices() {
    const { supabase, account } = await getAccount();
    const institutionId = account.institution_id;

    const { data: offices, error: officesError } = await supabase
        .from("office")
        .select("*")
        .eq("institution_id", institutionId);

    if (officesError) {
        console.error("Can not get offices for this institution");
        return {
            success: false,
            error: "Something went wrong on displaying offices. Please refresh.",
            offices: [],
        };
    }

    return {
        success: true,
        error: "",
        offices: offices,
    };
}

export async function getInstitutionAdminApplicants(adminJoinCode: string) {
    const { supabase } = await getSupabaseClaimsAndCheck();
    const { data: applicants, error: applicantsError } = await supabase
        .from("admin_application")
        .select(
            `
            id, type,
            account:account_id (
              username
            )
        `
        )
        .eq("institution_join_code", adminJoinCode);

    if (applicantsError) {
        console.error(
            "Can not get admin applicants due to an error. ERR: " +
                applicantsError.message
        );
        return {
            success: false,
            error: "Something went wrong when getting applicants. Please refresh.",
            applicants: [],
        };
    }

    return {
        success: true,
        error: "",
        applicants: applicants.map((a) => ({
            id: a.id,
            type: a.type,
            username: a.account.username,
        })),
    };
}

export async function getInstitutionData() {
    const { supabase, account } = await getAccount();
    const institutionId = account.institution_id;

    const { data: institution, error: institutionError } = await supabase
        .from("institution")
        .select("*")
        .eq("id", institutionId)
        .single();

    if (institutionError) {
        console.error(
            "Can not get institution data. ERR: " + institutionError.message
        );
        return {
            success: false,
            error: "Something went wrong when displaying institution data. Please refresh.",
            institution: null,
        };
    }

    if (!institution) {
        console.error("No institution was found with this id.");
        return {
            success: false,
            error: "Something went wrong when displaying institution data. Please refresh.",
            institution: null,
        };
    }

    return {
        success: true,
        error: "",
        institution: institution,
    };
}

// TODO: GET THE INSTITUION ID FROM THE PARAMS
export async function acceptAsInstitutionAdmin(applicationId: string) {
    const { supabase, account } = await getAccount();
    const institutionId = account.institution_id;

    const { data: application, error: applicationError } = await supabase
        .from("admin_application")
        .select()
        .eq("id", applicationId)
        .single();

    if (applicationError || !application) {
        console.error(
            "Failed to fetch applicant. ERR: " + applicationError?.message
        );
        return {
            success: false,
            error: "Applicant was not found or something went wrong.",
        };
    }

    const { error: insertInstitutionAdminError } = await supabase
        .from("institution_admin")
        .insert({
            account_id: application.account_id,
            institution_id: institutionId,
        });

    if (insertInstitutionAdminError) {
        console.error(
            "Failed to insert into institution_admin. ERR: " +
                insertInstitutionAdminError.message
        );
        return {
            success: false,
            error:
                insertInstitutionAdminError.code === "23505"
                    ? "User already an admin. Please refresh."
                    : "Something went wrong. Please try again.",
        };
    }

    const { error: deleteError } = await supabase
        .from("admin_application")
        .delete()
        .eq("id", applicationId);

    if (deleteError) {
        // Compensating action: rollback institution_admin insert
        console.error(
            "Failed to delete admin_application. Rolling back institution_admin insert..."
        );

        const { error: rollbackError } = await supabase
            .from("institution_admin")
            .delete()
            .eq("account_id", application.account_id)
            .eq("institution_id", institutionId);

        if (rollbackError) {
            console.error(
                "Rollback failed. Manual intervention may be required. ERR: " +
                    rollbackError.message
            );
        }

        return {
            success: false,
            error: "Something went wrong during cleanup. Please try again.",
        };
    }

    revalidatePath("/admin/settings/institution/[institutionId ]");

    return {
        success: true,
        error: "",
    };
}

export async function getInstitutionAdmins(institutionId: string) {
    const { supabase } = await getSupabaseClaimsAndCheck();

    const { data: admins, error } = await supabase
        .from("institution_admin")
        .select(
            `
                account:account_id ( username )
            `
        )
        .eq("institution_id", institutionId);

    if (error) {
        console.error("Can not get institution admins. ERR: " + error.message);
        return {
            success : false,
            error : 'Can not get admins. Please refresh.',
            admins : [],
        }
    };

    const formattedAdmins = admins.map(a => ({
        username : a.account.username
    }))

    return {
        success : true,
        error : '',
        admins : formattedAdmins,
    }
}
