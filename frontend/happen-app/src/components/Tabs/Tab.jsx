import React, { useState } from 'react'
import { TbHomeFilled } from "react-icons/tb";
import { BsCalendarCheckFill, BsEnvelopeFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Tab = ({ item, index, selected, setSelected, isSelected }) => {

    const navigate = useNavigate();

    const icons = [TbHomeFilled, BsCalendarCheckFill, BsEnvelopeFill, FaUserFriends];

    const IconComponent = icons[index];

    return (
        <div className={`flex items-center gap-4 px-9 py-5 rounded-2xl ${isSelected?'bg-[#B7410E] text-white shadow-lg':'text-[#B7410E]'} cursor-pointer`} onClick={() => {navigate(`/${item.name}`); setSelected(item.name);}}>
        <IconComponent  className='text-lg'/>
        <p className='text-[13px]'>{item.name}</p>
        </div>
    )
}

export default Tab
