import React from 'react'
import Topbar from '../bars/Topbar'
import axiosInstance from '../../utils/axiosInstance'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import moment from 'moment'
import { getInitials } from '../../utils/helper';
import EventModal from '../EventModal';

const ContentLayer = ({ setIsSidebarOpen }) => {

  const [openModal, setOpenModal] = useState(false);

  const [eventData, setEventData] = useState(null);

  const cards = ['/cardBg.png','/cardBg3.png','/cardBg2.png','/cardBg4.png','/cardBg5.png']

  const getAllEvents = async () => {
    try {
      const response = await axiosInstance.get('/api/event/get-all-events');
      if(response) {
        setEventData(response.data);
      }
    } catch(error) {
      console.log('Server Error');
    }
  }

  useEffect(() => {
    getAllEvents();
  },[])

  return (
    <div className='bg-[#FAF5E0] w-screen md:w-3/4 p-4 md:p-6 rounded-2xl flex flex-col'>
        <Topbar setIsSidebarOpen={setIsSidebarOpen} />
        <div className='flex-1 overflow-y-auto scrollbar-hide'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 p-3 pt-9'>
          <div className='flex flex-col justify-center items-center gap-2 bg-white rounded-2xl border-2 border-dashed border-[#B7410E]/60 cursor-pointer h-[40vh]' onClick={() => setOpenModal(true)}>
            <div className='bg-[#B7410E]/10 w-fit p-3 rounded-full border-2 border-dashed border-[#B7410E]'><FaPlus /></div>
            <p className='text-xs'>Create an event</p>
          </div>
          {eventData && eventData.map((item, index) => (
            <div key={index} className='relative text-white p-4 rounded-2xl shadow-md hover:shadow-lg h-[40vh]'>

              <img src={cards[index%5]} alt="bg"  className='absolute inset-0 w-full h-full object-cover rounded-2xl'/>
              
              <div className='absolute inset-0 bg-black/10 rounded-2xl'/>

              <div className='w-86/100 absolute z-10 bottom-3 flex flex-col gap-2'>

              <div className='flex justify-between items-end'>
                <div>
                <p className='text-[15px] font-semibold'>{item.title}</p>
                <p className='text-xs flex items-center gap-1'><IoLocationOutline className='text-[13px]'/>{item.location}</p>
                </div>

                <div>
                <p className='text-[13px] font-semibold'>{moment(item.date).format("DD MMM YYYY")}</p>
                {/* <p className='text-[13px]'>{item.time.start} - {item.time.end}</p> */}
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <p className='text-[11px] px-1'>Participants</p>
                <div className='flex'>
                {item.participants.slice(0,2).map((participant, idx) => (
                  <div className='h-7 w-7 bg-[#B7410E] text-white text-[11px] rounded-full flex justify-center items-center border-1 border-white/40 -ml-1.5 first:ml-0'>{getInitials(participant.email)}</div>
                ))}
                {item.participants.length>2 && 
                <div className='h-7 w-7 bg-[#B7410E] text-white text-[11px] rounded-full flex justify-center items-center border-1 border-white/40 -ml-1.5'>+{item.participants.length-2}</div>
                }
                </div>
              </div>

              </div>

            </div>
          ))}
        </div>
        </div>

        {openModal && <EventModal 
        onClose={() => setOpenModal(!openModal)}
        getAllEvents={getAllEvents}
        />}
    </div>
  )
}

export default ContentLayer
