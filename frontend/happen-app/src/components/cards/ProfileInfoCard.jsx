import React, { useContext, useEffect, useState } from 'react'
import { getInitials } from '../../utils/helper';
import { UserContext } from '../../utils/userContext';
import { FaChevronDown } from "react-icons/fa6";

const ProfileInfoCard = () => {

    const userData = useContext(UserContext);

    return (
        <div>
        {userData && 
        <div className='flex justify-center items-center gap-5'>
            <div className='flex justify-center items-center gap-3 text-[#B7410E] p-2'>
            {userData.profileImageUrl?
            <img src={userData.profileImageUrl} alt="profile-photo" className='h-9 w-9 rounded-full'/>
            :
            <div className='h-9 w-9 rounded-full bg-[#B7410E]/10 text-[#B7410E] flex justify-center items-center font-semibold'>{getInitials(userData.username)}</div>
            }
            <div>
                <p className='text-[13px] font-semibold'>{userData.username}</p>
                <p className='text-xs text-[#B7410E]/70'>{userData.email}</p>
            </div>
            </div>
            <button className='text-xs text-[#B7410E] cursor-pointer hover:bg-[#B7410E]/10 p-1.5 rounded-lg'><FaChevronDown/></button>
        </div>}
        </div>
    )
}

export default ProfileInfoCard
