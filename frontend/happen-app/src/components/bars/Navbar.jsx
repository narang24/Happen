import React, { useState } from 'react'
import { HiOutlineLogout } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";
import { tabs } from '../../utils/constants'
import Tab from '../Tabs/Tab'

const Navbar = () => {

  const [selected, setSelected] = useState(window.location.pathname.split('/')[1] || 'Dashboard');

  return (
    <div className='hidden md:flex md:w-[13%] min-w-[180px] flex-col items-center h-full justify-between pb-3'>

      {/* Top: Logo and Navigation Tabs */}
      <div className='w-full flex flex-col items-start'>
        {/* Happen logo slightly left-aligned */}
        <div className='w-full flex justify-start items-center gap-2 mt-8 mb-2 px-5'>
          <img src='/happen-logo.jpg' alt="logo" className='h-8 w-8 rounded-full shadow-sm shrink-0' />
          <h1 className='text-[#B7410E] font-[600] text-lg'>Happen</h1>
        </div>

        {/* Tabs with more height, gap, and vertical coverage */}
        <div className='flex flex-col gap-2.5 mt-6 mb-4 w-full items-start px-3'>
          {tabs.map((item, idx) => (
            <Tab key={item.name} item={item} index={idx} selected={selected} setSelected={setSelected} isSelected={selected === item.name} />
          ))}
        </div>
      </div>

      {/* Bottom: Plan & Save card + Logout */}
      <div className='w-full flex flex-col items-center px-3 gap-3'>
        <div className='w-full bg-[#B7410E]/20 p-4 rounded-2xl'>
          <p className='font-[500] text-sm text-[#B7410E]'>Plan & Save!</p>
          <p className='text-xs my-2 text-[#B7410E]/80 leading-relaxed'>Get amazing discounts when you book your event this week.</p>
          <button className='flex items-center justify-center bg-[#B7410E] text-white p-2 rounded-full hover:bg-[#a33d12] transition-colors cursor-pointer mt-1'>
            <FaArrowRight size={11} />
          </button>
        </div>

        <button className='flex items-center gap-2.5 w-full px-4 py-3 rounded-2xl cursor-pointer text-[13px] font-[400] hover:bg-[#B7410E]/8 transition-colors text-[#B7410E]'>
          <HiOutlineLogout size={19} /> Log Out
        </button>
      </div>
    </div>
  )
}

export default Navbar
