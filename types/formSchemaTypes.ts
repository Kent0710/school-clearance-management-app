import {z} from 'zod'

export const authFormSchema = z.object({
    username : z.string().min(2).max(50),
    password : z.string().min(6).max(50),
    role : z.enum(['student', 'unassigned_admin'])
})

export const alreadyAccomplishedFormSchema = z.object({
    message : z.string().optional(),
})

export const joinInstitutionFormSchema = z.object({
    joinCode : z.string(),
})

export const applyInstitutionAdminFormSchema = z.object({
    institution_join_code : z.string(),
})

export const applyOfficeAdminFormSchema = z.object({
    institution_join_code : z.string(),
    office_join_code : z.string(),
})

export const createOfficeFormSchema = z.object({
    officeName : z.string(),
})