import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/bars/Sidebar'
import { UserContext } from '../utils/userContext';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../components/bars/Navbar';
import Topbar from '../components/bars/Topbar';
import BottomNav from '../components/bars/BottomNav';

const DashboardLayout = () => {

  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get('/api/auth/get-user');
      if (response && response.data)
        setUserData(response.data);
    } catch (error) {
      console.log('Server Error', error);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex h-[100dvh] overflow-hidden text-[#B7410E] bg-white'>
      <UserContext.Provider value={userData}>
        {/* Left sidebar nav — desktop only */}
        <Navbar />

        {/* Main content area */}
        <div className='flex-1 flex flex-col overflow-hidden md:py-5 md:px-3'>
          <div className='flex-1 bg-[#FFF0F3] mx-3 md:mx-0 my-3 md:my-0 rounded-2xl flex flex-col overflow-hidden'>
            <Topbar setIsSidebarOpen={setIsSidebarOpen} />
            <div className='flex-1 overflow-y-auto pb-16 md:pb-0 px-4 md:px-6'>
              <Outlet />
            </div>
          </div>
        </div>

        {/* Right sidebar — desktop fixed, mobile drawer */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Bottom nav — mobile only */}
        <BottomNav />
      </UserContext.Provider>
    </div>
  )
}

export default DashboardLayout
