import React from 'react'
import ProfileInfoCard from '../cards/ProfileInfoCard'
import { DayPicker } from "react-day-picker";
import { useState } from 'react';
import { CiCalendar } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import "react-day-picker/dist/style.css";
import moment from 'moment';
import { getInitials } from '../../utils/helper';

const Sidebar = () => {
  const [range, setRange] = useState(null);
  
  const data = [
    {img:'/cardBg.png', title: 'Seminar', date: '2025-08-28', participants: ['r@gmail.com','l@gmail.com','m@gmail.com']},
    {img:'/cardBg2.png', title: 'Birthday', date: '2025-09-24', participants: ['k@gmail.com','s@gmail.com','p@gmail.com','l@gmail.com']},
    {img:'/cardBg5.png', title: 'Meet Up', date: '2025-10-03', participants: ['v@gmail.com','j@gmail.com','n@gmail.com']},
    {img:'/cardBg4.png', title: 'Reunion', date: '2025-10-09', participants: ['p@gmail.com','k@gmail.com']},
  ]

  return (
    <div className='hidden h-[100vh] md:inline fixed right-5 w-1/4 px-4 py-2 pr-0'>
      <ProfileInfoCard/>
      {/* <div className='p-5 bg-[#FAF5E0] rounded-xl m-5 mr-2'>
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          styles={{
            day: { borderRadius: 0 },
            day_range_start: { borderRadius: "50% 0 0 50%" },
            day_range_end: { borderRadius: "0 50% 50% 0" },
            day_selected: { backgroundColor: "white", color: "white" },
          }}
        />
      </div> */}

      <div className='flex flex-col flex-1 p-5 rounded-xl m-3 mr-0'>
        <div className='flex justify-between items-center'>
          <h3 className='font-semibold'>Your Schedule</h3>
          <div className='hover:bg-[#B7410E]/10 p-2 rounded-xl cursor-pointer'><BsThreeDots className='text-[15px]'/></div>
        </div>
        <div className='py-5 flex flex-col gap-5'>
          {data.map((item, index) => (
            <div className='bg-white border border-[#B7410E]/15 flex gap-5 p-4 rounded-xl'>
              <img src={item.img} alt="pic" className='h-18 w-18 rounded-xl' />
              <div className='text-sm flex flex-col gap-1'>
                <p className='font-semibold'>{item.title}</p>
                <p className='text-xs text-[#B7410E]/80 flex justify-center gap-1'><CiCalendar className='text-[15px]'/>{moment(item.date).format("DD MMM YYYY")}</p>
                <div className='flex'>
                  {item.participants.slice(0,2).map((participant, idx) => (
                    <div className='h-6 w-6 bg-[#B7410E] text-white text-[11px] rounded-full flex justify-center items-center border-1 border-white/40 -ml-1.5 first:ml-0'>{getInitials(participant)}</div>
                  ))}
                  {item.participants.length>2 && 
                  <div className='h-6 w-6 bg-[#B7410E] text-white text-[11px] rounded-full flex justify-center items-center border-1 border-white/40 -ml-1.5'>+{item.participants.length-2}</div>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Sidebar
