/*
    Used in page headers to return to a specific page
    
    @params href - the URL destination of the redirection
*/

import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
    href : string;
    text : string;
}
const BackButton : React.FC<BackButtonProps> = ({
    href,
    text,
}) => {
    return (
        <Link href={href}>
            <Button variant={'outline'} className="mb-4 ">
                <ChevronLeft /> {text}
            </Button>
        </Link>
    )
};

export default BackButton;