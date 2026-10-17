import React, { useContext } from 'react'
import { UserContext } from '../../utils/userContext'
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Topbar = ({ setIsSidebarOpen }) => {

  const userData = useContext(UserContext);

  return (
    <div className='bg-[#FFF0F3] px-4 pt-4 pb-3 flex justify-between items-center shrink-0'>

      <div className='flex items-center gap-3'>
        {/* Logo — mobile only */}
        <div className='flex md:hidden items-center gap-1.5'>
          <img src='/happen-logo.jpg' alt="logo" className='h-8 w-8 rounded-full' />
          <h1 className='text-[#B7410E] font-[500] text-[17px]'>Happen</h1>
        </div>

        {/* Greeting — desktop only */}
        <div className='hidden md:flex flex-col gap-0.5'>
          <p className='text-[#B7410E] font-[500] text-[17px]'>Hello, {userData?.username || "User"}! 👋</p>
          <p className='text-[11px] text-[#B7410E]/70'>Welcome back and make it happen</p>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {/* Search — desktop */}
        <div className='hidden bg-white md:flex justify-center items-center gap-3 px-4 py-2 rounded-3xl'>
          <FiSearch className='text-[#B7410E]/80 text-xl' />
          <input type="text" placeholder="Search Events.." className='w-[12rem] text-[12px] outline-none text-[#B7410E]' />
        </div>

        {/* Menu button — mobile only, opens right sidebar */}
        <button className='flex md:hidden bg-[#B7410E]/90 text-white p-1.5 rounded-md' onClick={() => setIsSidebarOpen(true)}>
          <HiOutlineMenuAlt3 size={18} />
        </button>
      </div>

    </div>
  )
}

export default Topbar
