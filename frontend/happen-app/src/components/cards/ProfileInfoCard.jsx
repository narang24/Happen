import React, { useContext, useEffect, useState } from 'react'
import { getInitials } from '../../utils/helper';
import { UserContext } from '../../utils/userContext';
import { FaChevronDown } from "react-icons/fa6";

const ProfileInfoCard = () => {

    const userData = useContext(UserContext);

    if (!userData) return null;

    return (
        <div className='w-full flex items-center justify-between p-3 bg-white border border-[#B7410E]/10 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer'>
            <div className='flex items-center gap-2.5 text-[#B7410E] min-w-0'>
                {userData.profileImageUrl ? (
                    <img src={userData.profileImageUrl} alt="profile-photo" className='h-9 w-9 rounded-full shrink-0 object-cover'/>
                ) : (
                    <div className='h-9 w-9 rounded-full bg-[#B7410E]/10 text-[#B7410E] flex justify-center items-center font-semibold shrink-0 text-xs'>
                        {getInitials(userData.username)}
                    </div>
                )}
                <div className='min-w-0 flex-1'>
                    <p className='text-[13px] font-semibold truncate leading-tight'>{userData.username}</p>
                    <p className='text-[11px] text-[#B7410E]/70 truncate leading-tight'>{userData.email}</p>
                </div>
            </div>
            <button className='text-xs text-[#B7410E] shrink-0 p-1.5 hover:bg-[#B7410E]/10 rounded-lg cursor-pointer transition-colors'>
                <FaChevronDown />
            </button>
        </div>
    )
}

export default ProfileInfoCard
