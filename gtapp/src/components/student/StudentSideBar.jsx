import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { HomeOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { School as SchoolIcon, Schedule as ScheduleIcon, LibraryBooks as LibraryBooksIcon, Assignment as AssignmentIcon, Assessment as AssessmentIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';

const StudentSideBar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <HomeOutlined />, path: "/student/dashboard" },
    { name: "Personal Study Schedule", icon: <ScheduleIcon />, path: "/student/schedule" },
    { name: "List Course", icon: <SchoolIcon />, path: "/student/courses" },
    { name: "Documents / Exercises", icon: <LibraryBooksIcon />, path: "/student/documents" },
    { name: "Test Scores / Teacher Comments", icon: <AssessmentIcon />, path: "/student/scores-comments" },
    { name: "Settings and profile", icon: <SettingOutlined />, path: "/student/settings" },
  ];

  const logout = () => {
    // Handle logout logic (redirect/login clear session etc.)
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-[#2B3A72] shadow-lg">
      <div className="flex items-center px-6 py-8 border-b border-[#3B4A82]">
        <div className="flex items-center space-x-3">
          <div className="bg-[#2B3A72] rounded-lg p-2 flex items-center justify-center">
            <img src={logo} className="object-contain rounded-md w-16 h-16 p-2" alt="Logo" />
          </div>
          <span className="text-xl font-bold text-white">GrowTalents</span>
        </div>
      </div>

      <nav className="flex flex-col flex-grow px-4 py-6 space-y-1">
        {menuItems.map(({ name, icon, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={ `flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out group ${active ? 'bg-yellow-400 text-[#ffffff] shadow-md' : 'text-white hover:bg-[#3B4A82] hover:text-yellow-400'} `}>
              <span className={`text-lg transition-colors duration-200 ${ active ? 'text-[#ffffff]' : 'text-white group-hover:text-yellow-400' }`}>{icon}</span>
              <span className="font-medium">{name}</span>
            </Link>
          );
        })}

        <div className="px-4 pb-6">
          <button
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out group">
            <ExitToAppIcon className="text-lg group-hover:text-white" />
            <span>Log out</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default StudentSideBar;
