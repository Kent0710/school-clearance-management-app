'use client'

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/actions/auth";

const SignOutButton = () => {
    return (
        <Button
            onClick={async () => {
                const res = await signOut();
                if (res.success) redirect("/login");
                toast.error(res.error);
            }}
        >
            Sign out
        </Button>
    );
};

export default SignOutButton;
