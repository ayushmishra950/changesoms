

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';


const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start closed
  const [activeSidebar, setActiveSidebar] = useState<string>("");
  const [taskSubPage, setTaskSubPage] = useState<string>("");
  const [taskName, setTaskName] = useState<string>("");
  const [jobName, setJobName] = useState<string>("");
  const [jobSubPage, setJobSubPage] = useState<string>("");

  const toggleSidebar = () => { setSidebarOpen(!sidebarOpen); };

  return (
    <div className={`transition-all duration-300 flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
      {/* Sidebar only renders when open */}
      <Sidebar
        setTaskName={setTaskName}
        setJobName={setJobName}
        isOpen={sidebarOpen}
        setActiveSidebar={setActiveSidebar}
        setTaskSubPage={setTaskSubPage}
        setJobSubPage={setJobSubPage}
        onToggle={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        <Header
          activeSidebar={activeSidebar}
          taskName={taskName}
          taskSubPage={taskSubPage}
          jobName={jobName}
          jobSubPage={jobSubPage}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
