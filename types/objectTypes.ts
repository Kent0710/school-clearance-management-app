export interface OfficeTasksType {
    id : string;
    taskName : string;
    taskDescription : string;
    taskStatus : string;
    taskDueDate : string;
    allowOnlineSubmission : boolean;
    type: "link" | "file";
}