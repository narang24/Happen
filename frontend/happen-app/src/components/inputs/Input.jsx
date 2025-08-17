import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";

const Input = ({ label, type, placeholder, value, onChange }) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className='flex flex-col gap-1 py-1.5 relative'>
      <label className='text-xs'>{label}</label>
      <input type={type==='password'?(isPasswordVisible?"text":"password"):type} placeholder={placeholder} value={value} onChange={({ target }) =>  onChange(target.value)} className='p-2 border-2 border-[#B7410E]/15 focus:border-[#B7410E]/70 text-[13px] rounded-lg outline-none'/>
      {type==='password' && 
      <div className='absolute right-3 bottom-24/100 cursor-pointer' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
        {isPasswordVisible?<FaEye />:<TbEyeClosed />}
      </div>
      }
    </div>
  )
}

export default Input
