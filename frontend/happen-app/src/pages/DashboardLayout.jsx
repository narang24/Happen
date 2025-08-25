import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/bars/Sidebar'
import ContentLayer from '../components/Layers/ContentLayer'
import { UserContext } from '../utils/userContext';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../components/bars/Navbar';
import Topbar from '../components/bars/Topbar';

const DashboardLayout = () => {

  const [userData, setUserData] = useState(null);
  
  const getUser = async () => {
      try {
          const response = await axiosInstance.get('/api/auth/get-user');
          if(response && response.data)
          setUserData(response.data);
      } catch(error) {
          console.log('Server Error',error);
      }
  }
  
  useEffect(() => {
    getUser();
  },[])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='px-3 py-3 md:px-0 md:py-5 flex text-[#B7410E] h-[100vh]'>
      <UserContext.Provider value={userData}>
        <Navbar />
        <div className='bg-[#FAF5E0] w-screen md:w-60/100 p-4 md:p-6 rounded-2xl flex flex-col'>
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />
        <Outlet />
        </div>
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      </UserContext.Provider>
    </div>
  )
}

export default DashboardLayout
