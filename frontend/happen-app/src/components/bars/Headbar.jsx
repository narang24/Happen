import React from 'react'

const Headbar = ({ openModal, setOpenModal}) => {

  return (
    <div className='fixed w-full flex justify-between items-center px-9 py-7 bg-[#FAF5E0]'>
        <div className='flex justify-center items-center gap-3'>
            <img src='/happen-logo.jpg' alt="logo" className='h-8 w-8 rounded-full'/>
            <h1 className='text-[#B7410E] font-[500] text-[17px]'>Happen</h1>
        </div>
        <button className='text-xs px-4.5 py-3 bg-[#B7410E] text-white rounded-lg cursor-pointer drop-shadow-md' onClick={() => setOpenModal(true)}>SignUp/Login</button>    
    </div>
  )
}

export default Headbar
