const StudentInfoSummary = () => {
    const infos = [
        {
            label : "Student ID",
            value : "2025-123456"
        },
           {
            label : "Section",
            value : "12STEM2302"
        },
           {
            label : "Class",
            value : "Grade 12"
        },
           {
            label : "Department",
            value : "Science"
        },
    ]

    return (
        <div className="grid grid-cols-4 gap-4">
            {infos.map((info) => (
                <StudentInfoContainer 
                    key={info.label}
                    label={info.label}
                    value={info.value}
                />
            ))}
        </div>
    )
};

export default StudentInfoSummary;

interface StudentInfoContainerProps {
    label : string;
    value : string;
}
const StudentInfoContainer : React.FC<StudentInfoContainerProps> = ({
    label,
    value
}) => {
    return (
        <div className="border bg-yellow-100/10 flex items-center justify-center flex-col py-8 rounded-lg">
            <small className="text-muted-foreground font-bold"> {label} </small>
            <p className="text-xl font-bold"> {value} </p>
        </div>
    )
};
