import React, { useMemo, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './taskList.module.css';
import { useEditTaskMutation, useGetTasksListQuery } from '../../../services/task';
import Task from './taskCard';
import { FaPlus } from 'react-icons/fa';
import TaskForm from '../taskPopup';
import { boolean } from 'joi';
import { useCustomNavigate } from '../../../reduxStore/hooks/hooks';
import { PATH } from '../../../constants/path';
import { toast } from 'react-toastify';
import Loader from '../../../components/loader';

const ItemTypes = {
    TASK: 'task',
};



interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

const Column: React.FC<{ column: Column; moveTask: any }> = ({ column, moveTask }) => {
    const navigate = useCustomNavigate();
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [currentCol, setCurrentCol] = useState<string>('');

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (draggedItem: { task: Task; index: number; columnId: string }) => {
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

    return (
        <div ref={drop} className={`${styles.column} ${isOver ? styles.over : ''}`}>
            <div className={styles.columnTitleContainer}>
                <h3 className={styles.columnTitle}>{column.title}</h3>
                <FaPlus className={styles.addTaskIcon} onClick={() => {
                    setCurrentCol(column.id);
                    // navigate(`/task-list/add-task`);
                    handleShowTaskForm();
                }} />
            </div>
            {column.tasks.map((task: any, index: any) => (
                <Task key={task.id} task={task} index={index} columnId={column.id} moveTask={moveTask} />
            ))}
            <TaskForm setCurrentCol={setCurrentCol} handleShowTaskForm={handleShowTaskForm} currentCol={currentCol} handleCloseTaskForm={handleCloseTaskForm} showTaskForm={showTaskForm} />
        </div>
    );
};


const TaskList: React.FC = () => {
    const { data: tasksList, isLoading: tasksListApiIsLoading, isError: tasksListApiIsError } = useGetTasksListQuery()
    const [editTaskApi, { isLoading: editTaskApiIsLoading }] = useEditTaskMutation()
    const navigate = useCustomNavigate()
    const formatReponse = (tasksList: any) => {

    }
    useMemo(() => formatReponse(tasksList), tasksList)

    const moveTask = async (from: { task: Task; index: number; columnId: string }, to: { columnId: string }) => {
        console.log(from.task, from.columnId, to.columnId)
        const taskObj = {
            title: from.task.title,
            description: from.task.description,
            priority: from.task.priority,
            status: to.columnId,
            deadline: from.task.deadline,
        }
        const id = from.task.id
        await editTaskApi({ id: id, task: taskObj }).unwrap()
            .then((payload: any) => {
                toast.success(payload?.message || 'status updated successfully')
            })

            .catch((error: any) => toast.error(error?.data?.error?.message || 'failed to update status.'))

    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.board}>
                {tasksListApiIsLoading || editTaskApiIsLoading ? <Loader />
                    : !tasksListApiIsError? tasksList?.data?.map((column: any) => (
                        <Column key={column.id} column={column} moveTask={moveTask} />
                    )) : <div className={styles.apiError}>Api Error</div>}
            </div>
        </DndProvider>
    );
};

export default TaskList;
