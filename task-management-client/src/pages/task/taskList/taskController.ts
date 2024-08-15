export const ItemTypes = {
    TASK: 'task',
};
 
export interface TaskType {
    id: string;
    title: string;
    description: string;
    status: string,
    priority: string;
    deadline: string;
}
export const initialTaskColumn = [
    {
        id: "to-do",
        title: "To Do",
        tasks: []
    },
    {
        id: "inprogress",
        title: "In Progress",
        tasks: []
    },
    {
        id: "under-review",
        title: "Under Review",
        tasks: []
    },
    {
        id: "completed",
        title: "Completed",
        tasks: []
    }
]
