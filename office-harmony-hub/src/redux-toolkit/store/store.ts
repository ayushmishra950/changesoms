import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../slice/allPage/companySlice";
import userReducer from "../slice/allPage/userSlice";
import settingReducer from "../slice/allPage/settingSlice";
import attendanceReducer from "../slice/allPage/attendanceSlice";
import leaveReducer from "../slice/allPage/leaveSlice";
import payrollReducer from "../slice/allPage/payrollSlice";
import departmentReducer from "../slice/allPage/departmentSlice";
import expenseReducer from "../slice/allPage/expenseSlice";
import reportReducer from "../slice/allPage/reportSlice";
import dashboardReducer from "../slice/allPage/dashboardSlice";

// Only Task Reducers 
import projectReducer from "../slice/task/projectSlice";
import managerReducer from "../slice/task/taskManagerSlice";
import overdueTaskReducer from "../slice/task/overdueTaskSlice";
import taskReducer from "../slice/task/taskSlice";
import subTaskReducer from "../slice/task/subTaskSlice";
import taskDashboardReducer from "../slice/task/dashboardSlice";

// job-portal k liye
import roleReducer from "../slice/job-portal/roleSlice";
import candidateReducer from "../slice/job-portal/candidateSlice";

export const store = configureStore({
    reducer: {
        company: companyReducer,
        user: userReducer,
        setting: settingReducer,
        attendance: attendanceReducer,
        leave: leaveReducer,
        payroll: payrollReducer,
        department: departmentReducer,
        expense: expenseReducer,
        report: reportReducer,
        dashboard: dashboardReducer,
        // Task Reducers
        project: projectReducer,
        manager: managerReducer,
        overdueTask: overdueTaskReducer,
        task: taskReducer,
        subTask: subTaskReducer,
        taskDashboard: taskDashboardReducer,

        // job-portal k liye
        role: roleReducer,
        candidate: candidateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;