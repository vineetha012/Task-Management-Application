import React, { Suspense } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/index'
import SignUp from './pages/auth/signUp/index'
// const LayOut = React.lazy(() => import('./layouts/index'))
import ToastNotification from './components/toast/toastNotification';
import Layout from './layouts';
import { PATH } from './constants/path';
const Dashboard = React.lazy(() => import('./pages/dashboard/index'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<>loading...</>}>
        <ToastNotification />
        <Routes>
          <Route path='*' element={<>not found</>} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.SIGNUP} element={<SignUp />} />
          <Route element={<Layout />}>
            <Route path={PATH.TASK_SCREEN_TYPE} element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;
