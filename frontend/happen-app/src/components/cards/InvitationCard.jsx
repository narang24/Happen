import React, { useState } from 'react'
import { getInitials } from '../../utils/helper';
import { FaRegEnvelope } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import moment from 'moment';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const InvitationCard = ({ invitation }) => {
    
    const [status, setStatus] = useState(invitation.status);

    const updateInvitation = async(value) => {
        try {
            const response = await axiosInstance.post(`/api/invitation/update-invitation/${invitation._id}`, { status: value });
            if(response.data) {
                value==='Accepted'?toast.success("Invitation Accepted"):toast.success("Invitation Declined");
            }
        } catch(error) {
            console.log('Error updating status');
        }
    }

  return (
    <div className='max-h-[50vh] p-4 bg-white rounded-2xl shadow-gray-300/50 shadow-sm hover:shadow-md'>
        
        <div className='flex gap-4 items-center text-[15px] font-semibold border-b-2 border-[#B7410E]/15 px-3 pt-0.5 pb-3.5'>
            <FaRegEnvelope size={20}/>
            {invitation.eventId.title}
        </div>

        <div className='my-2 flex gap-2 items-center'>
        {invitation.inviterId.profileImageUrl?
        <img src={invitation.inviterId.profileImageUrl} className='h-11 w-11 rounded-full border-4 border-white shadow-md'/>
        :
        <div className='text-[#B7410E] bg-[#B7410E]/10 h-11 w-11 rounded-full border-4 border-white shadow-md flex items-center justify-center'>{getInitials(invitation.inviterId.username)}</div>}
        <div>
            <p className='text-[13px] font-semibold'>{invitation.inviterId.username}</p>
            <p className='text-xs'>{invitation.inviterId.email}</p>
        </div>
        </div>
            
        <div className='flex flex-col gap-1 my-7 justify-center items-center'>
            <p className='text-xs my-0.5'>invites you to join the event</p>
            <p className='text-sm font-semibold flex items-center gap-1 text-red-700'><FaMapPin/> <span className='text-[#B7410E]'>{invitation.eventId.location}</span></p>
            <p className='text-sm font-semibold'>🗓️ {moment(invitation.date).format("DD MMM YYYY")}</p>
        </div>

      
        {status==='Pending'?
        <div className='flex w-full items-center gap-3 mt-10'>
            <button className='flex-1 text-sm text-green-700 bg-green-200/50 hover:bg-green-200/85 rounded-md cursor-pointer px-3 py-2' onClick={() => {setStatus('Accepted'); updateInvitation('Accepted');}}>Accept</button>
            <button className='flex-1 text-sm text-red-700 bg-red-200/50 hover:bg-red-200/85 rounded-md cursor-pointer px-3 py-2' onClick={() => {setStatus('Declined'); updateInvitation('Declined');}}>Decline</button>
        </div>
        :
        <div className='mt-10'>
            {status==='Accepted'?
            <div className='flex-1 text-sm text-green-700 bg-green-200/50 hover:bg-green-200/85 rounded-lg px-3 py-2 text-center'>{status}</div>
            :
            <div className='flex-1 text-sm text-red-700 bg-red-200/50 hover:bg-red-200/85 rounded-lg px-3 py-2 text-center'>{status}</div>}
        </div>}
    </div>
  )
}

export default InvitationCard
