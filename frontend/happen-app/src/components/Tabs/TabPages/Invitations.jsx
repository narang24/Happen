import React, { useEffect, useState } from 'react'
import EventModal from '../../EventModal'
import { FiSliders } from "react-icons/fi";
import axiosInstance from '../../../utils/axiosInstance';
import { IoLocationOutline } from "react-icons/io5";
import moment from 'moment';
import { getInitials } from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import InvitationCard from '../../cards/InvitationCard';
import InvitationCard2 from '../../cards/InvitationCard2';

const Invitations = () => {
  const [pendingInvitations, setPendingInvitations] = useState([]);
  const [respondedInvitations, setRespondedInvitations] = useState([]);

  const getPendingResponded = async () => {
    try {
      const response = await axiosInstance.get('/api/invitation/get-pending-responded');
      if(response.data) {
        setPendingInvitations(response.data.pendingInvitations);
        setRespondedInvitations(response.data.respondedInvitations);
      }
    } catch(error) {
      console.log('Server Error', error);
    }
  }

  useEffect(() => {
    getPendingResponded();
  },[])

  return (
    <div className='flex flex-1 flex-col gap-5 mt-9 overflow-y-auto scrollbar-hide'>
      
      <div className='p-4 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md'>
      <h3 className='text-[15px] md:text-[16px] font-semibold'>Pending Invitations</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {pendingInvitations && pendingInvitations.map((item, index) => (
        <InvitationCard invitation={item}/>
        ))}
      </div>

      <div className='p-4 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md'>
      <h3 className='text-[15px] md:text-[16px] font-semibold'>Responded Invitations</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {respondedInvitations && respondedInvitations.map((item, index) => (
        <InvitationCard invitation={item}/>
        ))}
      </div>

      {/* <div className='max-h-[70vh] p-4 md:p-5 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md'>

      <div className='mb-3 flex justify-between items-center'>
        <div className='flex flex-col md:gap-1.5'>
          <h3 className='text-[15px] md:text-[17px] font-semibold'>Responded Invitations</h3>
          <p className='text-[11px] md:text-xs text-[#B7410E]/70'>{respondedInvitations.length || 0} Invitations Found</p>
        </div>
        <button className='flex justify-center items-center gap-1 md:gap-2 text-[11px] md:text-xs border border-[#B7410E]/50 text-[#B7410E]/80 px-2 md:px-3 py-2 md:py-2.5 rounded-xl cursor-pointer'><FiSliders/> Filters</button>
      </div>

      <div className='h-85/100 md:h-83/100 flex flex-col gap-1 md:gap-2 overflow-y-auto scrollbar-hide'>
        {respondedInvitations && respondedInvitations.map((item,index) => (
          <div>
            
          </div>
        ))}
      </div>

      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {respondedInvitations && respondedInvitations.map((item, index) => (
        <InvitationCard invitation={item}/>
        ))}
      </div> */}

    </div>
  )
}

export default Invitations