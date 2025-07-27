import { Button } from "@/components/ui/button";
import { GraduationCap, Lock, UserCog } from "lucide-react";
import Link from "next/link";

const AppHeader = async () => {
    return (
        <header className="px-10 py-3 text-xs flex justify-between items-center text-[#0D2D8C] bg-[#F2BD1D] shadow-md ">
            {/* Left Side  */}
            <section className="flex items-center space-x-4">
                <GraduationCap
                    className="bg-white/30 p-1.5 border rounded-lg"
                    size={37}
                />
                <div>
                    <p className="font-bold">
                        {" "}
                        School Clearance Management System{" "}
                    </p>
                    <p className="text-muted-foreground font-semibold">
                        {" "}
                        Welcome back, Bullpup!{" "}
                    </p>
                </div>
            </section>

            {/* Right Side  */}
            <section className="flex space-x-2 items-center">
                <Link href={"/account"}>
                    <Button
                        variant={"outline"}
                        className=" bg-yellow-100/50 hover:bg-yellow-100/50 hover:shadow-md"
                        size={"sm"}
                    >
                        <UserCog />
                        Bullpup Name
                    </Button>
                </Link>
                <AdminButton />
            </section>
        </header>
    );
};

export default AppHeader;

const AdminButton = async () => {
    // const role = await getRole();

    return (
        <Link href={"/admin"}>
            <Button
                size={"sm"}
                variant={"outline"}
                className=" bg-yellow-100/50 hover:bg-yellow-100/50 hover:shadow-md"
            >
                <Lock />
                Admin dashboard
            </Button>
        </Link>
    );
};
