import React, { useEffect, useState } from 'react'
import Sidebar from '../components/bars/Sidebar'
import ContentLayer from '../components/Layers/ContentLayer'
import { UserContext } from '../utils/userContext';
import axiosInstance from '../utils/axiosInstance';

const Dashboard = () => {

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

  return (
    <div className='p-3 md:p-5 flex text-[#B7410E] h-[100vh]'>
      <UserContext.Provider value={userData}>
        <ContentLayer/>
        <Sidebar/>
      </UserContext.Provider>
    </div>
  )
}

export default Dashboard
