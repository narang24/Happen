import React from 'react'
import { BiSolidParty } from "react-icons/bi";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

const StepCards = ({ index, item }) => {

  const icons = [BiSolidParty,FaEnvelope,FaBell];
  let IconComponent = icons[index];

  return (
    <div key={index} className='w-1/3 flex justify-center p-5 bg-white rounded-xl'>
        <p className='text-3xl font-semibold font-mono'>{item.num}</p>
        <div className='flex flex-col items-end'>
        <IconComponent size={24}/>
        <p className='font-semibold py-2'>{item.title}</p>
        <p className='text-xs w-7/10 text-right'>{item.description}</p>
        </div>
    </div>
  )
}

export default StepCards
