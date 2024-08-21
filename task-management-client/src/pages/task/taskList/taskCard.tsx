

import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import styles from './taskList.module.css';
import { useCustomNavigate } from '../../../reduxStore/hooks/hooks';
import { useDeleteTaskMutation } from '../../../services/task';
import { toast } from 'react-toastify';
import { TaskType } from './taskController';
 import { RiDeleteBin5Line } from "react-icons/ri";

const ItemTypes = {
    TASK: 'task',
};


interface TaskProps {
    task: TaskType;
    index: number;
    columnId: string;
    moveTask: any;
    coltitle:any;
}

const Task: React.FC<TaskProps> = ({ task, coltitle, index, columnId, moveTask }) => {
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
    useEffect(() => {
        console.log('card')
    }, [])
    return (
        <div
            ref={ref}
            title='Drag the task to change the status'
            className={`${styles.taskCard} ${isDragging ? styles.dragging : ''}`}
        >
            <div className={styles.taskHeader}>
                <div className={styles.taskTitle}>Task : {task.title}</div>
                <div className={styles.iconContainer}>
                    <RiDeleteBin5Line className={styles.deleteIcon} onClick={() => deleteTask(task.id)} />

                </div>
            </div>
            <div className={styles.taskDetails}>
                {task.priority && <span className={styles.taskPriority}><span>Priority:</span> {task.priority}</span>}
                {task.deadline && <span className={styles.taskDeadline}><span>Deadline:</span> {new Date(task.deadline).toLocaleDateString()}</span>}
            </div>

        </div>
    );
};

export default Task;
