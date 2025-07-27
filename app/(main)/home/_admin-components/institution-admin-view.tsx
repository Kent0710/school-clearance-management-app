import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ArrowRight,
    Building,
    Check,
    Lock,
    Mail,
    Plus,
    Settings2,
} from "lucide-react";
import Link from "next/link";
import CreateOfficeDialog from "./create-office-dialog";
import { getInstitutionOffices } from "@/actions/institution";
import { Suspense } from "react";

const InstitutionAdminView = () => {
    return (
        <div>
            <header className="flex items-center justify-between pb-4 mb-4 border-b">
                <section className="flex items-center space-x-2">
                    <Building />
                    <div>
                        <h1 className="text-xl font-bold"> NU Lipa </h1>
                        <p className="text-sm font-medium text-muted-foreground">
                            {" "}
                            Manage your institution, offices, and students
                            clearence{" "}
                        </p>
                    </div>
                </section>
                <section className="space-x-2">
                    <Link href={"/admin/settings/institution/1"}>
                        <Button>
                            <Lock /> Settings
                        </Button>
                    </Link>
                    <Link href={"#"}>
                        <Button>
                            <Mail /> Mails
                        </Button>
                    </Link>
                </section>
            </header>
            <main className="space-y-4">
                <Suspense fallback={<p> Loading... </p>}>
                    <Offices />
                </Suspense>
            </main>
        </div>
    );
};

export default InstitutionAdminView;

const Offices = async () => {
    const { offices } = await getInstitutionOffices();

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium ">
                        {" "}
                        Institution offices{" "}
                    </h2>
                    <p className="text-sm text-muted-foreground font-semibold">
                        {" "}
                        List of the offices under this institution.{" "}
                    </p>
                </div>
                <CreateOfficeDialog />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {offices.map((office) => (
                    <OfficeCard name={office.name} key={office.name} />
                ))}
            </div>
        </section>
    );
};

interface OfficeCardProps {
    name: string;
}
const OfficeCard: React.FC<OfficeCardProps> = ({ name }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                    Head: <strong> Namikazii nakiri </strong>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Button size={"sm"}>
                        {" "}
                        Dashboard <ArrowRight />{" "}
                    </Button>
                    <Button size={"sm"} variant={"secondary"}>
                        <Settings2 />
                    </Button>
                    <Button size={"sm"} variant={"secondary"}>
                        <Mail />
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex space-x-2 items-center  text-muted-foreground">
                    {" "}
                    <Check size={15} />
                    <small className="font-medium">
                        12/14 cleared students.{" "}
                    </small>
                </div>
            </CardFooter>
        </Card>
    );
};
