import React from 'react'
import ProfileInfoCard from '../cards/ProfileInfoCard'
import { useState } from 'react';
import { CiCalendar } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import moment from 'moment';
import { getInitials } from '../../utils/helper';
import DayPicker from '../day-picker/DayPicker';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const data = [
    { img: '/cardBg.png', title: 'Seminar', date: '2025-08-28', participants: ['r@gmail.com', 'l@gmail.com', 'm@gmail.com'] },
    { img: '/cardBg2.png', title: 'Birthday', date: '2025-09-24', participants: ['k@gmail.com', 's@gmail.com', 'p@gmail.com', 'l@gmail.com'] },
    { img: '/cardBg5.png', title: 'Meet Up', date: '2025-10-03', participants: ['v@gmail.com', 'j@gmail.com', 'n@gmail.com'] },
    { img: '/cardBg4.png', title: 'Reunion', date: '2025-10-09', participants: ['p@gmail.com', 'k@gmail.com'] },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div className='fixed inset-0 bg-black/30 z-40 md:hidden' onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className={`
        fixed right-0 top-0 h-full z-50 bg-white overflow-y-auto
        transition-transform duration-300 ease-in-out
        w-[85vw] sm:w-72
        md:static md:w-[22%] md:min-w-[240px] md:translate-x-0 md:z-auto md:overflow-y-auto md:py-2 md:pr-0
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        md:flex md:flex-col
      `}>
        <button className='inline md:hidden bg-[#B7410E]/10 p-1.5 rounded-md m-3' onClick={() => setIsSidebarOpen(false)}><IoMdClose /></button>
        
        {/* Profile Info Card spanning identical width as calendar */}
        <div className='px-4 pt-3 pb-1 w-full'>
          <ProfileInfoCard />
        </div>

        {/* DayPicker Calendar */}
        <div className='px-4 pt-2 pb-0 w-full'>
          <DayPicker />
        </div>

        {/* Schedule List */}
        <div className='flex flex-col flex-1 px-4 pt-4 pb-4'>
          <div className='flex justify-between items-center mb-3'>
            <h3 className='font-semibold text-[14px] text-[#B7410E]'>Your Schedule</h3>
            <div className='hover:bg-[#B7410E]/10 p-1.5 rounded-xl cursor-pointer text-[#B7410E]'><BsThreeDots className='text-[15px]' /></div>
          </div>
          <div className='flex flex-col gap-3'>
            {data.map((item, index) => (
              <div className='bg-white border border-[#B7410E]/15 flex items-center gap-3 p-2.5 rounded-xl hover:shadow-sm transition-shadow' key={index}>
                <img src={item.img} alt="pic" className='h-14 w-14 rounded-xl shrink-0 object-cover' />
                <div className='text-sm flex flex-col gap-0.5 min-w-0 flex-1'>
                  <p className='font-semibold text-[13px] text-[#B7410E] truncate'>{item.title}</p>
                  <p className='text-[11px] text-[#B7410E]/80 flex items-center gap-1'><CiCalendar className='text-[13px] shrink-0' />{moment(item.date).format("DD MMM YYYY")}</p>
                  <div className='flex mt-0.5'>
                    {item.participants.slice(0, 2).map((participant, idx) => (
                      <div key={idx} className='h-5 w-5 bg-[#B7410E] text-white text-[9px] rounded-full flex justify-center items-center border border-white/40 -ml-1.5 first:ml-0'>{getInitials(participant)}</div>
                    ))}
                    {item.participants.length > 2 &&
                      <div className='h-5 w-5 bg-[#B7410E] text-white text-[9px] rounded-full flex justify-center items-center border border-white/40 -ml-1.5'>+{item.participants.length - 2}</div>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default Sidebar
