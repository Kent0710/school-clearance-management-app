import React from "react";

interface DescriptionProps {
    children: React.ReactNode;
    className?: string;
}
const Description: React.FC<DescriptionProps> = ({ children, className }) => {
    return (
        <p className={`text-sm text-muted-foreground font-medium ${className}`}>
            {" "}
            {children}{" "}
        </p>
    );
};

export default Description;
