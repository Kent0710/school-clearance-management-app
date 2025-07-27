import SignOutButton from "@/components/sign-out-button";
import { createClient } from "@/lib/supabase/server";

const AccountPage = async () => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();

    return (
        <div>
            <pre>{JSON.stringify(data?.claims.email)}</pre>
            This is the account page
            <SignOutButton />
        </div>
    );
};

export default AccountPage;
