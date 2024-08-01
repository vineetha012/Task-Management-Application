

import React from 'react';
import { useDrag } from 'react-dnd';
import styles from './taskList.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useCustomNavigate } from '../../../reduxStore/hooks/hooks';
import { useDeleteTaskMutation } from '../../../services/task';
import { toast } from 'react-toastify';
const ItemTypes = {
    TASK: 'task',
};
interface Task {
    id: string;
    title: string;
    description: string;
    status:string,
    priority: string;
    deadline: string;
}

interface TaskProps {
    task: Task;
    index: number;
    columnId: string;
    moveTask: any;
    coltitle:any;
}

const Task: React.FC<TaskProps> = ({ task, coltitle, index, columnId, moveTask }) => {
    console.log(columnId)
    const navigate=useCustomNavigate()
    const [deleteTaskApi, { isLoading: deleteTaskApiIsLoading }] = useDeleteTaskMutation()
    const [{ isDragging }, ref] = useDrag({
        type: ItemTypes.TASK,
        item: { task, index, columnId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const deleteTask=async(id:string)=>{
        await deleteTaskApi(id).unwrap()
            .then((payload: any) => {
                toast.success(payload?.message || 'Task deleted successfully')
            }).catch((error) => toast.error(error?.data?.error?.message || 'Failed to delete task'))
    }
    return (
        <div
            ref={ref}
            className={`${styles.taskCard} ${isDragging ? styles.dragging : ''}`}
        >
            <div className={styles.taskHeader}>
                <h3 className={styles.taskTitle}>{task.title}</h3>
                <div className={styles.iconContainer}>
                    <FaTrash
                        className={styles.deleteIcon}
                        onClick={() => deleteTask(task.id)}
                    />
                </div>
            </div>
            {/* {task.description && <p className={styles.taskDescription}>{task.description}</p>} */}
            <div className={styles.taskDetails}>
                {task.status && <span className={styles[task.status == 'completed' ? 'complete-status' : task.status == 'inprogress' ? 'inprogress-status' : task.status == 'to-do' ? 'to-do-status':'under-review-status']}><span>Status:</span> {coltitle}</span>}
                {task.priority && <span className={styles.taskPriority}><span>Priority:</span> {task.priority}</span>}
            </div>
            {task.deadline && <span className={styles.taskDeadline}><span>Deadline:</span> {new Date(task.deadline).toLocaleDateString()}</span>}

        </div>
    );
};

export default Task;
