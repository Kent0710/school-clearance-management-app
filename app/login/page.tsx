import AuthForm from "@/components/auth-form";
import { createClient } from "@/lib/supabase/server";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";

const LoginPage = async () => {
    const supabase = await createClient();
    const {data} = await supabase.auth.getClaims();
    if (data?.claims) {
        redirect('/home')
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="grid md:grid-cols-2 flex-1 min-h-0 p-4">
                <div className="flex items-center justify-center">
                    <AuthForm />
                </div>

                <section className="flex justify-center flex-col items-center md:items-baseline space-y-4 text-center md:text-left">
                    <h1 className="text-3xl font-bold">
                        {" "}
                        School Clearance Management System{" "}
                    </h1>
                    <p>
                        {" "}
                        A web based school clearanance management system to
                        streamline students clearance completion, manage through
                        role system in one place.{" "}
                    </p>
                    <small className="text-muted-foreground font-semibold ">Features include:</small>
                    <ul className="space-y-2 ">
                        <FeatureItem text="File Uploads" />
                        <FeatureItem text="PDF generation & download" />
                        <FeatureItem text="User roles" />
                        <FeatureItem text="Status tracking" />
                        <FeatureItem text="Notifications & mailing" />
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default LoginPage;

interface FeatureItemProps {
    text: string;
}
const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => {
    return (
        <li className="flex items-center gap-2 text-sm font-semibold">
            <Check className="bg-black text-white rounded-full p-0.5" size={17} />
            {text}
        </li>
    );
};
