import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import { IoLocationOutline } from 'react-icons/io5';
import { HiOutlineTrash } from "react-icons/hi2";
import { getInitials, validateEmail } from '../../utils/helper';

const EventDetails = () => {

  const [eventData, setEventData] = useState(null);
  const { id } = useParams();

  const [email, setEmail] = useState('');

  const images = ['/cardBg.png','/cardBg2.png','/cardBg3.png','/cardBg4.png','/cardBg5.png'];

  const getEvent = async () => {
  try {
    const response = await axiosInstance.get(`/api/event/get-event/${id}`);
    if(response.data) {
      setEventData(response.data);
      console.log(response.data);
    }
  } catch(error) {
    console.log('Server Error');
  }
  }

  const addEmail = () => {}

  useEffect(() => {
    getEvent();
  },[id]);

  return (
    <div className='mt-9 flex gap-5'>
      
      <div className='flex-1'>
      {eventData &&
      <div className='relative text-white p-4 rounded-2xl shadow-md hover:shadow-lg h-[50vh]'>

        <img src={images[4]} alt="bg"  className='absolute inset-0 w-full h-full object-cover rounded-2xl'/>
        
        <div className='absolute inset-0 bg-black/20 rounded-2xl'/>

        <div className='w-86/100 absolute z-10 bottom-3 flex flex-col gap-2'>

        <div className='flex justify-between items-end'>
          <div>
          <p className='text-[15px] font-semibold'>{eventData.title}</p>
          <p className='text-xs flex items-center gap-1'><IoLocationOutline className='text-[13px]'/>{eventData.location}</p>
          </div>

          <div>
          <p className='text-[13px] font-semibold'>{moment(eventData.date).format("DD MMM YYYY")}</p>
          <p className='text-[13px]'>{eventData.time.start} - {eventData.time.end}</p>
          </div>
        </div>
        </div>

      </div>
      }
      </div>

      <div className='overflow-y-auto scrollbar-hide h-[50vh] flex-1 flex flex-col p-5 bg-white rounded-2xl shadow-gray-300/50 shadow-sm hover:shadow-md'>
        <div className='flex flex-col gap-1'>
          <h3 className='font-semibold'>Invite people to your event</h3>
          <p className='text-xs text-[#B7410E]/80'>An email to accept/decline the invitation shall be sent.</p>
        </div>

        <div className='my-6 flex flex-col gap-1.5'>
          <label className='text-xs'>Invite email</label>
          <div className='flex gap-1.5'>
            <input type="text" placeholder='Enter email address' className='text-[13px] px-3 py-2 border border-[#B7410E]/20 rounded-lg flex-1 outline-none' value={email} onChange={({ target }) => setEmail(target.value)}/>
            <button className='text-white bg-[#B7410E]/90 text-[11px] px-3 py-2 rounded-lg cursor-pointer' onClick={addEmail}>Send Invite</button>
          </div>
        </div>

        <div className='flex-1 p-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide'>
          {eventData && eventData.participants.map((item, index) => (
            <div className='flex justify-between items-center'>
              <div className='flex gap-2.5 items-center'>
              <div className='bg-[#B7410E]/10 h-8 w-8 text-[17px] flex justify-center items-center rounded-full'>{getInitials(item.email)}</div>
              <p className='text-xs'>{item.email}</p>
              </div>

              <div className='flex justify-center items-center gap-3'>
                <div className={`${item.status==='Accepted'?'text-green-700 bg-green-100/80':(item.status==='Declined'?'text-red-700 bg-red-100/50':'text-yellow-500 bg-yellow-100/80')} text-[11px] py-1 px-2 rounded-md flex justify-center items-center gap-1.5`}>
                <div className={`${item.status==='Accepted'?'bg-green-700':(item.status==='Declined'?'bg-red-700':'bg-yellow-500')} h-1 w-1 rounded-full`}/>
                <p>{item.status}</p>
                </div>
                <button className='text-[15px] text-gray-900/50 hover:text-red-700 cursor-pointer'><HiOutlineTrash /></button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default EventDetails
