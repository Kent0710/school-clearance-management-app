import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import JoinInstitutionForm from "./join-institution-form";

const JoinInstitutionDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <div>
                            <p className="text-xl text-center font-bold">
                                {" "}
                                Looks like you do not have any institution yet.{" "}
                            </p>
                            <p className="text-sm text-center text-muted-foreground font-semibold">
                                {" "}
                                Join one by clicking the button below.{" "}
                            </p>
                        </div>
                        <Button> Join institution </Button>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Join an existing institution</DialogTitle>
                    <DialogDescription>
                        Get the
                        <strong> institution code </strong>
                        from your institution admins.
                    </DialogDescription>
                </DialogHeader>
                <JoinInstitutionForm />
            </DialogContent>
        </Dialog>
    );
};

export default JoinInstitutionDialog;
