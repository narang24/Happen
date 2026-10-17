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
      if (response.data) {
        setPendingInvitations(response.data.pendingInvitations || []);
        setRespondedInvitations(response.data.respondedInvitations || []);
      }
    } catch (error) {
      console.log('Server Error', error);
    }
  }

  useEffect(() => {
    getPendingResponded();
  }, [])

  return (
    <div className='flex flex-1 flex-col gap-5 mt-9 overflow-y-auto scrollbar-hide pb-6'>
      
      <div className='p-4 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md'>
        <h3 className='text-[15px] md:text-[16px] font-semibold'>Pending Invitations</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {pendingInvitations && pendingInvitations.map((item, index) => (
          <InvitationCard key={item._id || index} invitation={item} />
        ))}
      </div>

      <div className='p-4 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md'>
        <h3 className='text-[15px] md:text-[16px] font-semibold'>Responded Invitations</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {respondedInvitations && respondedInvitations.map((item, index) => (
          <InvitationCard key={item._id || index} invitation={item} />
        ))}
      </div>

    </div>
  )
}

export default Invitations
