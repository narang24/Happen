import React from 'react'

const EventInput = ({ label, type, placeholder, value, setValue, }) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      <label className='text-xs md:text-[13px] font-[500]'>{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={({target}) => setValue(target.value)} className='text-xs md:text-[13px] px-2 md:px-3 py-2 md:py-2 border-1 border-[#B7410E]/15 rounded-lg outline-none'/>
    </div>
  )
}

export default EventInput
