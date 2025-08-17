import React from 'react'
import { useState } from 'react'
import { validateEmail } from '../../utils/helper';
import { useEffect } from 'react';

const ParticipantAdder = ({ label, type, placeholder, participants, setParticipants, setError, clear}) => {

    const [value, setValue] = useState("");

    const addParticipant = () => {
        if(value.trim()==="")
            return;
        const isValidEmail = validateEmail(value);
        if(!isValidEmail) {
            setError('Invalid participant email');
            return;
        }
        setParticipants([...participants,{email:value.trim(), status:'pending'}]);
        setValue("");
        setError("");
    }

    useEffect(() => {
        if(clear && value!=="")
            setValue("");
    },[])

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label className='text-xs md:text-[13px] font-[500]'>{label}</label>
      <div className='flex gap-1.5 md:gap-2.5'>
        <input type={type} placeholder={placeholder} value={value} onChange={({ target }) => setValue(target.value)} className='flex-1 text-xs md:text-[13px] px-2 md:px-3 py-2 border-1 border-[#B7410E]/15 rounded-lg outline-none'/>
        <button className='text-[11px] md:text-xs bg-[#B7410E] rounded-lg text-white px-4 py-2 cursor-pointer' onClick={addParticipant}>Add</button>
      </div>
    </div>
  )
}

export default ParticipantAdder
