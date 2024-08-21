import { useEffect, useState } from "react";
import { useCustomNavigate } from "../../../reduxStore/hooks/hooks";
import { useDrop } from "react-dnd";
import styles from './taskList.module.css';
import { ItemTypes, TaskType } from "./taskController";
import { PATH } from "../../../constants/path";
import Task from "./taskCard";
import TaskForm from "../taskPopup";
import { CiSquarePlus } from "react-icons/ci";

interface Column {
    id: string;
    title: string;
    tasks: TaskType[];
}

const Column: React.FC<{ tasksListApiIsLoading: boolean, column: Column; moveTask: any }> = ({ tasksListApiIsLoading, column, moveTask }) => {
    const navigate = useCustomNavigate();
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [currentCol, setCurrentCol] = useState<string>('');

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (draggedItem: { task: TaskType; index: number; columnId: string }) => {
            if (draggedItem.columnId !== column.id) {
                moveTask(draggedItem, { columnId: column.id });
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const handleCloseTaskForm = () => {
        navigate(PATH.TASKLIST);
        setShowTaskForm(false);
        setCurrentCol('');
    };

    const handleShowTaskForm = () => {
        setShowTaskForm(true);
    };
    useEffect(() => {
        console.log('child')
    }, [])
    return (
        <div ref={drop} className={`${styles.column} ${isOver ? styles.over : ''}`}>
            <div className={styles.columnTitleContainer}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                
                <CiSquarePlus className={styles.addTaskIcon} onClick={() => {
                    setCurrentCol(column.id);
                    handleShowTaskForm();
                }} />

            </div>
            <div className={styles["card-container"]}>
                {
                    // !tasksListApiIsLoading ? 
                    column.tasks.map((task: any, index: any) => (
                        <Task key={task.id} task={task} index={index} coltitle={column.title} columnId={column.id} moveTask={moveTask} />
                    ))
                    //  : <CardLoader />
                }
            </div>
           
            <TaskForm setCurrentCol={setCurrentCol} handleShowTaskForm={handleShowTaskForm} currentCol={currentCol} handleCloseTaskForm={handleCloseTaskForm} showTaskForm={showTaskForm} />
        </div>
    );
};

export default Column