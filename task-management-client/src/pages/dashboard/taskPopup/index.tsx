import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { checkErrorstask, emptytaskErrorMessages, taskFieldErrorValidation, taskInfoInitialState, taskIntrface } from './taskController';
import { useAppDispatch, useAppSelector, useCustomNavigate } from '../../../reduxStore/hooks/hooks';
import { doValidateTaskTitle } from '../../../utils/errorsHandler'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import { useCreateTaskMutation } from '../../../services/task';
import { toast } from 'react-toastify';
import './task.css'
interface TaskFormProps {
    currentCol: string;
    setCurrentCol: any,
    handleCloseTaskForm: () => void,
    showTaskForm: boolean,
    handleShowTaskForm: () => void
}


const TaskForm: React.FC<TaskFormProps> = ({ setCurrentCol, currentCol, handleCloseTaskForm, showTaskForm, handleShowTaskForm }) => {
    const [createTaskApi, { isLoading: createTaskApiIsLoading }] = useCreateTaskMutation()
    const dispatch: any = useAppDispatch();
    const location = useLocation();
    const { type, edit } = useParams();
    const { taskTitleErrMessage } = useAppSelector((state:any) => state.errorMessageReducer);
    const navigate = useCustomNavigate();
    const [taskInfo, setTaskInfo] = useState<taskIntrface>(taskInfoInitialState);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (checkErrorstask(dispatch, taskInfo)) {
            const task: any = {
                ...taskInfo,status:currentCol, deadline: formatDate(taskInfo.deadline)
            }
            console.log(task)
            await createTaskApi(task).unwrap()
                .then((payload: any) => {
                    handleCloseTaskForm();
                    navigate(PATH.TASKLIST)
                    emptytaskErrorMessages(dispatch)
                    setTaskInfo(taskInfoInitialState)
                    toast.success(payload?.message || 'Created task successfully')
                }).catch((error: any) => toast.error(error?.data?.error?.message || 'Failed to create task'))
        }


    };
    const formatDate = (date: Date | null) => {
        if (date) {
            const year = date.getFullYear();
            const month = (`0${date.getMonth() + 1}`).slice(-2);
            const day = (`0${date.getDate()}`).slice(-2);
            return `${year}-${month}-${day}`;
        }
        return null
    };


    
    console.log(currentCol)
    const getTaskInfo = (event: any) => {
        const { name, value } = event.target;
        console.log(name)
        if (name == 'status') {
            setCurrentCol(value)
        } else {
            setTaskInfo((prevState) => ({
                ...prevState,
                [name]: value.trim(),
            }));
        }
        taskFieldErrorValidation(event, dispatch);
    };

    console.log(taskInfo)
    useEffect(() => {
        // if (type === 'edit-task') {
        //     handleShowTaskForm();
        // } else if (type === 'add-task') {
        //     if (currentCol === '') {
        //         handleCloseTaskForm();
        //     } else {
        //         handleShowTaskForm();
        //     }
        // }
        return () => {
            setTaskInfo(taskInfoInitialState);
            emptytaskErrorMessages(dispatch)
        };
    }, []);

    return (
        <Modal show={showTaskForm} onHide={()=>{
            handleCloseTaskForm()
            emptytaskErrorMessages(dispatch)
            setTaskInfo(taskInfoInitialState);

            }}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='form-group' controlId="formTaskTitle">
                        <Form.Label>Title*</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task title"
                            value={taskInfo.title}
                            name='title'
                            onBlur={(event) => doValidateTaskTitle(event.target.value, dispatch)}
                            onChange={getTaskInfo}
                        />
                        {taskTitleErrMessage && <div className='error-message'>{taskTitleErrMessage}</div>}
                        
                    </Form.Group>
                    <Form.Group className='form-group' controlId="formTaskStatus">
                        <Form.Label>Status*</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={currentCol} // Use currentCol here
                            onChange={getTaskInfo}
                        >
                            <option value="to-do">To-do</option>
                            <option value="inprogress">In Progress</option>
                            <option value="under-review">Under Review</option>
                            <option value="completed">Completed</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='form-group' controlId="formTaskPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control
                            as="select"
                            name="priority"
                            value={taskInfo.priority}
                            onChange={getTaskInfo}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='form-group'  controlId="formTaskDeadline">
                        <Form.Label>Deadline</Form.Label>
                        <DatePicker
                            className="form-control"
                            selected={taskInfo.deadline}
                            onChange={(date) => setTaskInfo(prevState => ({ ...prevState, deadline: date }))}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a deadline"

                        />
                    </Form.Group>
                    <Form.Group className='form-group' controlId="formTaskDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter task description (optional)"
                            value={taskInfo.description}
                            name="description"
                            onChange={getTaskInfo}
                        />
                    </Form.Group>
                    <div className='addtask-btn-container'>
                        <Button className='addtask-btn' variant="primary" type="submit">
                            {createTaskApiIsLoading ? 'Loading...' : 'Add Task'}
                        </Button>
                    </div>
                    
                </Form>
            </Modal.Body>
        </Modal>
    );
};



export default TaskForm;
