import React, { useMemo } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './taskList.module.css';
import { useEditTaskMutation, useGetTasksListQuery } from '../../../services/task';
import { toast } from 'react-toastify';
import Loader from '../../../components/loaders/screenLoader';
import Column from './taskColumn';
import { initialTaskColumn, TaskType } from './taskController';

const TaskList: React.FC = () => {
    const { data: tasksList, isFetching: tasksListApiIsLoading, isError: tasksListApiIsError } = useGetTasksListQuery()
    const [editTaskApi, { isLoading: editTaskApiIsLoading }] = useEditTaskMutation()

    const formatReponse = (tasksList: any) => {
        if (Array.isArray(tasksList?.data)) {
            initialTaskColumn.forEach(columnData => {
                const category = tasksList?.data?.find((cat: any) => cat.id === columnData.id)
                if (category) {
                    columnData.tasks = category.tasks;
                }
            });
            return initialTaskColumn
        }
        return initialTaskColumn
    }

    const taskListResponse = useMemo(() => formatReponse(tasksList), [tasksList])

    const moveTask = async (from: { task: TaskType; index: number; columnId: string }, to: { columnId: string }) => {
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
            }).catch((error: any) => toast.error(error?.data?.error?.message || 'failed to update status.'))
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.board}>
                {editTaskApiIsLoading || tasksListApiIsLoading && <Loader />}
                {// tasksListApiIsLoading ? <Loader />:
                    !tasksListApiIsError ?
                        taskListResponse?.map((column: any) => (
                            <Column tasksListApiIsLoading={tasksListApiIsLoading} key={column.id} column={column} moveTask={moveTask} />
                        ))
                        : <div className={styles.apiError}>Api Error</div>
                }

            </div>
        </DndProvider>
    );
};

export default TaskList;
