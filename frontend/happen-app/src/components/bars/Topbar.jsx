import React, { useContext } from 'react'
import { UserContext } from '../../utils/userContext'
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Topbar = ({ setIsSidebarOpen }) => {

  const userData = useContext(UserContext);
    
  return (
    <div className='bg-[#FAF5E0] pb-3 flex justify-between'>

      <div className='w-full md:w-auto flex justify-between md:justify-center items-center gap-2 md:gap-16'>
      <div className='flex md:hidden md:justify-center items-center gap-1.5 md:gap-3'>
          <img src='/happen-logo.jpg' alt="logo" className='h-8 w-8 rounded-full'/>
          <h1 className='text-[#B7410E] font-[500] text-[17px]'>Happen</h1>
      </div>

      {/* greetings */}
      <div className='flex flex-col items-end md:items-start gap-1 text-right md:text-left'>
        <div className='inline md:hidden bg-[#B7410E]/90 text-white text-sm p-1 rounded-md' onClick={() => setIsSidebarOpen(true)}><HiOutlineMenuAlt3 /></div>
        <p className='hidden md:inline text-[#B7410E] font-[500] text-[15px] md:text-[17px]'>Hello, {userData?.username || "User"}! 👋</p>
        <p className='hidden md:inline text-[11px] md:text-xs text-[#B7410E]/70 w-4/5 md:w-full '>Welcome back and make it happen</p>
      </div>
      </div>

      <div className='hidden bg-white md:flex justify-center items-center gap-3 px-4 rounded-3xl'>
        <FiSearch className='text-[#B7410E]/80 text-xl'/>
        <input type="text" placeholder="Search Events.." className='w-[12rem] text-[12px] outline-none text-[#B7410E]'/>
      </div>

    </div>
  )
}

export default Topbar
