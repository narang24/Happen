import React from 'react'
import { getInitials } from '../../utils/helper';
import { FaRegEnvelope } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import moment from 'moment';

const InvitationCard2 = ({ invitation }) => {
  return (
    <div className='max-h-[50vh] p-4 bg-white rounded-2xl shadow-gray-300/50 shadow-sm hover:shadow-md'>

        <div className='flex gap-2 items-center'>
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
            <p className='text-xs text-center'>invites you to join the event</p>
            <p className='font-semibold my-3'>{invitation.eventId.title}</p>
            <p className='text-sm font-[500] flex items-center gap-1 text-red-700'><FaMapPin/> <span className='text-[#B7410E]'>{invitation.eventId.location}</span></p>
            <p className='text-sm font-[500]'>🗓️ {moment(invitation.date).format("DD MMM YYYY")}</p>
        </div>

      
        <div className='flex w-full items-center gap-3 mt-10'>
            <button className='flex-1 text-sm text-green-700 bg-green-200/50 hover:bg-green-200/85 rounded-md cursor-pointer px-3 py-2'>Accept</button>
            <button className='flex-1 text-sm text-red-700 bg-red-200/50 hover:bg-red-200/85 rounded-md cursor-pointer px-3 py-2'>Decline</button>
        </div>
    </div>
  )
}

export default InvitationCard2
