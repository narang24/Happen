import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TbHomeFilled } from "react-icons/tb";
import { BsCalendarCheckFill, BsEnvelopeFill } from "react-icons/bs";
import { FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import { tabs } from '../../utils/constants'

const icons = [TbHomeFilled, BsCalendarCheckFill, BsEnvelopeFill, FaUserFriends, FaCalendarAlt];

const BottomNav = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(window.location.pathname.split('/')[1] || 'Dashboard');

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white border-t border-[#B7410E]/10 flex justify-around items-center px-2 py-2 safe-area-pb'>
      {tabs.map((item, idx) => {
        const IconComponent = icons[idx];
        const isActive = selected === item.name;
        return (
          <button
            key={item.name}
            onClick={() => { navigate(`/${item.name}`); setSelected(item.name); }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#B7410E] bg-[#B7410E]/10'
                : 'text-[#B7410E]/40'
            }`}
          >
            <IconComponent size={20} />
            <span className='text-[10px] font-medium'>{item.name}</span>
          </button>
        );
      })}
    </nav>
  )
}

export default BottomNav
