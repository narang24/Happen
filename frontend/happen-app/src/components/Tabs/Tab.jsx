import React, { useState } from 'react'
import { TbHomeFilled } from "react-icons/tb";
import { BsCalendarCheckFill, BsEnvelopeFill } from "react-icons/bs";
import { FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Tab = ({ item, index, selected, setSelected, isSelected }) => {

  const navigate = useNavigate();

  const icons = [TbHomeFilled, BsCalendarCheckFill, BsEnvelopeFill, FaUserFriends, FaCalendarAlt];

  const IconComponent = icons[index] || TbHomeFilled;

  return (
    <div 
      className={`flex items-center gap-3.5 w-full px-4.5 py-4 rounded-2xl ${isSelected ? 'bg-[#B7410E] text-white shadow-md' : 'text-[#B7410E] hover:bg-[#B7410E]/8'} cursor-pointer transition-all duration-200 text-left`} 
      onClick={() => { navigate(`/${item.name}`); setSelected(item.name); }}
    >
      <IconComponent className='text-[18px] shrink-0' />
      <p className='text-[13px]'>{item.name}</p>
    </div>
  )
}

export default Tab
