import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';

const DeleteModal = ({ onClose, deleteEvent, }) => {

  const [checked, setChecked] = useState(false);
  const checkAndDelete = () => {
    if(!checked) return;
    onClose(); 
    deleteEvent();
  };

  return (
    <div className='fixed z-10 inset-0 bg-black/50 flex justify-center items-center overflow-y-auto'>
      <div className='w-8/10 md:w-1/3 min-h-1/4 md:min-h-1/5 bg-white rounded-2xl shadow-lg shadow-gray-700/50 overflow-y-auto'>
        <div className='flex items-center justify-between px-4.5 py-3'>
          <h3 className='text-[16px] font-semibold flex gap-1.5'><MdOutlineDeleteOutline size={22}/><span>Delete Event</span></h3>
          <button className='cursor-pointer hover:bg-[#B7410E]/10 rounded-md p-1' onClick={onClose}><IoClose size={20}/></button>
        </div>
        <div className='text-[13px] p-4 flex flex-col gap-3 border-y-2 border-[#B7410E]/10'>
          <p className=''>Are you sure you want to delete this active event?</p>
          <p className='text-red-700'>Kindly note that this action cannot be undone after confirmation</p>
          <div className='flex gap-2 items-center text-[13px]'>
          <input type="checkbox" className='accent-[#B7410E] h-3.5 w-3.5' onChange={() => setChecked(!checked)}/>
          <p>I understand that all invitations pertaining to the event shall be withdrawn</p>
          </div>
        </div>
        <div className='flex justify-end p-4 gap-3'>
          <button className='text-xs font-[600] px-4 py-2 border border-[#B7410E]/25 hover:bg-[#B7410E]/10 rounded-lg cursor-pointer' onClick={onClose}>Cancel</button>
          <button className='text-xs px-4 py-2 rounded-lg cursor-pointer bg-[#B7410E] hover:bg-[#B7410E]/89 text-white' onClick={checkAndDelete}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
