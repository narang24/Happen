import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../utils/axiosInstance'
import { CiCalendar } from 'react-icons/ci'
import { IoLocationOutline } from 'react-icons/io5'
import { FiClock } from 'react-icons/fi'
import { getInitials } from '../../../utils/helper'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const Schedule = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [pastEvents, setPastEvents] = useState([])
  const navigate = useNavigate()
  const images = ['/cardBg.png', '/cardBg2.png', '/cardBg3.png', '/cardBg4.png', '/cardBg5.png']

  const getSchedule = async () => {
    try {
      const response = await axiosInstance.get('/api/event/get-recent-scheduled')
      if (response.data) {
        setUpcomingEvents(response.data.scheduledEvents || [])
        setPastEvents(response.data.recentEvents || [])
      }
    } catch (error) {
      console.log('Server Error', error)
    }
  }

  useEffect(() => { getSchedule() }, [])

  const EventCard = ({ item, index }) => (
    <div
      className='flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-[#B7410E]/5 transition-all duration-200'
      onClick={() => navigate(`/Events/get-event/${item._id}`)}
    >
      <img src={images[index % 5]} alt='pic' className='h-14 w-14 md:h-16 md:w-16 rounded-xl shrink-0 object-cover' />
      <div className='flex flex-1 flex-col gap-0.5 min-w-0'>
        <p className='text-sm md:text-[15px] font-semibold truncate'>{item.title}</p>
        <p className='text-[11px] md:text-xs text-[#B7410E]/70 flex items-center gap-1 truncate'>
          <IoLocationOutline size={13} />{item.location}
        </p>
        <p className='text-[11px] md:text-xs text-[#B7410E]/70 flex items-center gap-1'>
          <CiCalendar size={13} />{moment(item.date).format('DD MMM YYYY')}
        </p>
      </div>
      <div className='flex shrink-0'>
        {item.participants?.slice(0, 2).map((p, idx) => (
          <div key={idx} className='h-6 w-6 bg-[#B7410E] text-white text-[10px] rounded-full flex justify-center items-center border border-white/40 -ml-1.5 first:ml-0'>
            {getInitials(p.email)}
          </div>
        ))}
        {item.participants?.length > 2 && (
          <div className='h-6 w-6 bg-[#B7410E]/70 text-white text-[10px] rounded-full flex justify-center items-center border border-white/40 -ml-1.5'>
            +{item.participants.length - 2}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className='flex flex-1 flex-col md:flex-row gap-5 mt-6 overflow-y-auto scrollbar-hide'>

      {/* Upcoming Schedule */}
      <div className='h-[50vh] flex-1 p-4 md:p-5 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md flex flex-col'>
        <div className='mb-3 flex justify-between items-center shrink-0'>
          <div className='flex flex-col gap-0.5 md:gap-1.5'>
            <h3 className='text-[15px] md:text-[17px] font-semibold'>Upcoming Schedule</h3>
            <p className='text-[11px] md:text-xs text-[#B7410E]/70'>{upcomingEvents.length} event{upcomingEvents.length !== 1 ? 's' : ''} ahead</p>
          </div>
          <span className='flex items-center gap-1 text-[11px] text-[#B7410E]/70 bg-[#B7410E]/8 px-3 py-1.5 rounded-full'>
            <FiClock size={12} /> Upcoming
          </span>
        </div>

        <div className='flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide'>
          {upcomingEvents.length === 0 ? (
            <div className='flex-1 flex flex-col justify-center items-center text-[#B7410E]/40 gap-2'>
              <FiClock size={32} />
              <p className='text-sm'>No upcoming events</p>
            </div>
          ) : (
            upcomingEvents.map((item, index) => (
              <EventCard key={item._id || index} item={item} index={index} />
            ))
          )}
        </div>
      </div>

      {/* Past Schedule */}
      <div className='h-[50vh] flex-1 p-4 md:p-5 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md flex flex-col'>
        <div className='mb-3 flex justify-between items-center shrink-0'>
          <div className='flex flex-col gap-0.5 md:gap-1.5'>
            <h3 className='text-[15px] md:text-[17px] font-semibold'>Past Schedule</h3>
            <p className='text-[11px] md:text-xs text-[#B7410E]/70'>{pastEvents.length} event{pastEvents.length !== 1 ? 's' : ''} completed</p>
          </div>
          <span className='flex items-center gap-1 text-[11px] text-[#B7410E]/70 bg-[#B7410E]/8 px-3 py-1.5 rounded-full'>
            <CiCalendar size={13} /> History
          </span>
        </div>

        <div className='flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide'>
          {pastEvents.length === 0 ? (
            <div className='flex-1 flex flex-col justify-center items-center text-[#B7410E]/40 gap-2'>
              <CiCalendar size={32} />
              <p className='text-sm'>No past events</p>
            </div>
          ) : (
            pastEvents.map((item, index) => (
              <div key={item._id || index} className='flex items-center gap-4 p-3 rounded-xl opacity-70 hover:opacity-100 cursor-pointer hover:bg-[#B7410E]/5 transition-all duration-200' onClick={() => navigate(`/Events/get-event/${item._id}`)}>
                <img src={images[index % 5]} alt='pic' className='h-14 w-14 md:h-16 md:w-16 rounded-xl shrink-0 object-cover grayscale' />
                <div className='flex flex-1 flex-col gap-0.5 min-w-0'>
                  <p className='text-sm md:text-[15px] font-semibold truncate'>{item.title}</p>
                  <p className='text-[11px] md:text-xs text-[#B7410E]/70 flex items-center gap-1 truncate'>
                    <IoLocationOutline size={13} />{item.location}
                  </p>
                  <p className='text-[11px] md:text-xs text-[#B7410E]/70 flex items-center gap-1'>
                    <CiCalendar size={13} />{moment(item.date).format('DD MMM YYYY')}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default Schedule
