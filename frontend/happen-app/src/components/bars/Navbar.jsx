import React, { useState } from 'react'
import { HiOutlineLogout } from "react-icons/hi";
import { tabs } from '../../utils/constants'
import Tab from '../Tabs/Tab'

const Navbar = () => {

  const [selected, setSelected] = useState(window.location.pathname.split('/')[1]||'Dashboard');

  return (
    <div className='hidden md:flex w-15/100 flex-col items-center'>
      <div className='flex md:justify-center items-center gap-1.5 md:gap-2 p-4'>
          <img src='/happen-logo.jpg' alt="logo" className='h-9 w-9 rounded-full'/>
          <h1 className='text-[#B7410E] font-[500] text-lg'>Happen</h1>
      </div>

      <div className='flex flex-col gap-3.5 my-10'>
        {tabs.map((item, idx) => (
        <Tab item={item} index={idx} selected={selected} setSelected={setSelected} isSelected={selected===item.name}/>
        ))}
      </div>

      <button className='flex items-center gap-2 text-[13px] font-[410] text-[#B7410E]/85 hover:bg-[#B7410E]/10 px-12 py-3 rounded-xl absolute bottom-5 cursor-pointer'><HiOutlineLogout size={20}/> Log Out</button>
    </div>
  )
}

export default Navbar
