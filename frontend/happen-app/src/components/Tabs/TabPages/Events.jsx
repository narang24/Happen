import React, { useEffect, useState } from 'react'
import EventModal from '../../EventModal'
import { FiSliders } from "react-icons/fi";
import axiosInstance from '../../../utils/axiosInstance';
import { IoLocationOutline } from "react-icons/io5";
import moment from 'moment';
import { getInitials } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [scheduledEvents, setScheduledEvents] = useState([]);

  const navigate = useNavigate();

  const images = ['/cardBg.png','/cardBg2.png','/cardBg3.png','/cardBg4.png','/cardBg5.png'];

  const getRecentScheduled = async () => {
    try {
      const response = await axiosInstance.get('/api/event/get-recent-scheduled');
      if(response.data) {
        setRecentEvents(response.data.recentEvents);
        setScheduledEvents(response.data.scheduledEvents);
      }
    } catch(error) {
      console.log('Server Error', error);
    }
  }

  useEffect(() => {
    getRecentScheduled();
  },[])

  return (
    <div className='flex flex-1 flex-col md:flex-row gap-5 mt-9 overflow-y-auto scrollbar-hide'>
      
      <div className='h-[50vh] flex-1 p-4 md:p-5 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md'>

      <div className='mb-3 flex justify-between items-center'>
        <div className='flex flex-col md:gap-1.5'>
          <h3 className='text-[15px] md:text-[17px] font-semibold'>Recent Events</h3>
          <p className='text-[11px] md:text-xs text-[#B7410E]/70'>{recentEvents.length || 0} Events Found</p>
        </div>
        <button className='flex justify-center items-center gap-1 md:gap-2 text-[11px] md:text-xs border border-[#B7410E]/50 text-[#B7410E]/80 px-2 md:px-3 py-2 md:py-2.5 rounded-xl cursor-pointer'><FiSliders/> Filters</button>
      </div>

      <div className='h-85/100 md:h-83/100 flex flex-col gap-1 md:gap-2 overflow-y-auto scrollbar-hide'>
        {recentEvents && recentEvents.map((item,index) => (
          <div className='flex justify-center items-center gap-5 p-3 rounded-xl cursor-pointer hover:bg-[#B7410E]/6' key={index} onClick={() => navigate(`/Events/get-event/${item._id}`)}>
            <img src={images[index%5]} alt="pic" className='h-16 md:h-18 w-16 md:w-18 rounded-xl' />
            <div className='flex flex-1 flex-col justify-evenly'>
              <p className='text-sm md:text-[15px] font-semibold'>{item.title}</p>
              <p className='text-[11px] md:text-xs text-[#B7410E]/80 flex gap-0.5 md:gap-1'><IoLocationOutline className='text-[15px]'/>{item.location}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[11px] md:text-xs text-[#B7410E]/80 font-semibold'>{moment(item.date).format("DD MMM YYYY")}</p>
              <div className='flex'>
                {item.participants.slice(0,2).map((participant, idx) => (
                  <div className='h-6 w-6 bg-[#B7410E] text-white text-[10px] md:text-[11px] rounded-full flex justify-center items-center border-1 border-white/40 -ml-1.5 first:ml-0' key={idx}>{getInitials(participant.email)}</div>
                ))}
                {item.participants.length>2 && 
                <div className='h-6 w-6 bg-[#B7410E] text-white text-[10px] md:text-[11px] rounded-full flex justify-center items-center border-1 border-white/40 -ml-1.5'>+{item.participants.length-2}</div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      </div>
      <div className='h-[50vh] flex-1 p-4 md:p-5 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md'>

      <div className='mb-3 flex justify-between items-center'>
        <div className='flex flex-col md:gap-1.5'>
          <h3 className='text-[15px] md:text-[17px] font-semibold'>Scheduled Events</h3>
          <p className='text-[11px] md:text-xs text-[#B7410E]/70'>{scheduledEvents.length || 0} Events Found</p>
        </div>
        <button className='flex justify-center items-center gap-1 md:gap-2 text-[11px] md:text-xs border border-[#B7410E]/50 text-[#B7410E]/80 px-2 md:px-3 py-2 md:py-2.5 rounded-xl cursor-pointer'><FiSliders/> Filters</button>
      </div>

      <div className='h-85/100 md:h-83/100 flex flex-col gap-1 md:gap-2 overflow-y-auto scrollbar-hide'>
        {scheduledEvents && scheduledEvents.map((item,index) => (
          <div className='flex justify-center items-center gap-5 p-3 rounded-xl cursor-pointer hover:bg-[#B7410E]/6' key={index} onClick={() => navigate(`/Events/get-event/${item._id}`)}>
            <img src={images[index%5]} alt="pic" className='h-16 md:h-18 w-16 md:w-18 rounded-xl' />
            <div className='flex flex-1 flex-col justify-evenly'>
              <p className='text-sm md:text-[15px] font-semibold'>{item.title}</p>
              <p className='text-[11px] md:text-xs text-[#B7410E]/80 flex gap-0.5 md:gap-1'><IoLocationOutline className='text-[15px]'/>{item.location}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-[11px] md:text-xs text-[#B7410E]/80 font-semibold'>{moment(item.date).format("DD MMM YYYY")}</p>
              <div className='flex'>
                {item.participants.slice(0,2).map((participant, idx) => (
                  <div className='h-6 w-6 bg-[#B7410E] text-white text-[10px] md:text-[11px] rounded-full flex justify-center items-center border-1 border-white/40 -ml-1.5 first:ml-0' key={idx}>{getInitials(participant.email)}</div>
                ))}
                {item.participants.length>2 && 
                <div className='h-6 w-6 bg-[#B7410E] text-white text-[10px] md:text-[11px] rounded-full flex justify-center items-center border-1 border-white/40 -ml-1.5'>+{item.participants.length-2}</div>
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

export default Events