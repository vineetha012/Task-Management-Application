import React, { useLayoutEffect } from 'react';
import TaskList from './taskList';
import { useCustomNavigate } from '../../reduxStore/hooks/hooks';
import { PATH } from '../../constants/path';

const Dashboard: React.FC = () => {
    const navigate = useCustomNavigate()
    useLayoutEffect(() => {
        const token = localStorage.getItem("app-token")
        if (!token) {
            navigate(PATH.LOGIN)
        }
    }, [])
    return (
        <div >
            <TaskList />
        </div>
    );
};

export default Dashboard;