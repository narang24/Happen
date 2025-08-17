import React, { useState } from 'react'
import Headbar from '../components/bars/headbar'
import {stats, steps} from '../utils/constants'
import { IoLogoInstagram, IoPlay } from "react-icons/io5";
import StepCards from '../components/cards/StepCards';
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import Modal from '../components/Modal';

const LandingPage = () => {

  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState('signup');
  
  return (
    <div className='bg-[#FAF5E0]'>
      <Headbar openModal={openModal} setOpenModal={setOpenModal}/>

      {/* Hero Section */}
      <div className='flex justify-between px-12 pt-12'>

        <div className='w-1/2 pt-28'>
        <h3 className='text-5xl my-7 text-[#B7410E] font-semibold'>Plan. Invite. Celebrate. <span className='block my-4'>All in One Place.</span></h3>
        <p className='text-sm my-5 text-[#E68B67]'>Happen makes event planning effortless — create events, send invitations, get RSVPs, and send reminders automatically.</p>
        
        <div className='flex items-center gap-8 my-10'>
        <button className='text-xs px-6 py-3 bg-[#B7410E] text-white rounded-lg cursor-pointer' onClick={() => setOpenModal(true)}>Get Started</button>
        <button className='flex justify-center items-center gap-1.5 text-[#B7410E] text-xs cursor-pointer'><span className='bg-[#B7410E] text-white text-xs p-1.5 rounded-full flex justify-center items-center'><IoPlay/></span>See how it works!</button>
        </div>
        </div>


        <div className='flex flex-1 justify-between items-center pt-7'>
          <img src="/landing-page-phtot.png" alt="photo" className='h-74/100'/>
          <div className=''>
          {stats.map((item,index) => (
            <div key={index} className='mb-10'>
              <h3 className='text-3xl font-semibold text-[#B7410E]'>{item.value}</h3>
              <p className='text-xs text-[#E68B67]'>{item.name}</p>
            </div>
          ))}
          </div>
        </div>

      </div>

      {/* <div className='flex gap-5 pt-10'>
        <div className='w-1/3 px-12 py-10'>
          <h3 className='text-3xl font-semibold text-[#B7410E] mb-4'>Stay Organized, Keep Everyone in the Loop</h3>
          <p className='text-xs text-[#E68B67] w-4/5'>Effortlessly track RSVPs and send timely reminders so your events run smoothly every time.</p>
          <div className='my-5 flex flex-col gap-2'>
          <p className='text-[13px] flex items-center gap-2 text-[#B7410E]'><span><IoCheckmarkCircle size={17}/></span>Create any type of event in minutes</p>
          <p className='text-[13px] flex items-center gap-2 text-[#B7410E]'><span><IoCheckmarkCircle size={17}/></span>Guests RSVP directly from their email</p>
          <p className='text-[13px] flex items-center gap-2 text-[#B7410E]'><span><IoCheckmarkCircle size={17}/></span>Automatic reminders keep everyone on time</p>
          </div>
        </div>
        <div className='flex-1 h-fit bg-[#86C7D6]/30 rounded-l-xl px-6 py-5'>
          <h3 className='text-[#087167] text-xl font-semibold text-right mb-5 tracking-wide'>How it works?</h3>
          <div className='flex gap-5 text-[#087167]'>
            {steps.map((item, index) => (
              <StepCards item={item} index={index}/>
            ))}
          </div>
        </div>
      </div> */}

      {/* How it works? */}
      <div className='px-12 py-10 pt-0'>
          <h3 className='text-center py-10 text-[#B7410E] text-[19px] font-semibold'>How it works?</h3>
          <div className='flex gap-12 '>
          {steps.map((item, index) => (
            <div key={index} className='w-1/3 flex gap-4 items-center p-8 bg-[#86C7D6]/20 text-[#087167] rounded-xl shadow-sm hover:shadow-md shadow-gray-300/60'>
              <p className='text-[15px] text-[#087167]/75 font-semibold'>{item.num}</p>
              <img src={item.img} alt="step1" className='h-20'/>
              <div className='flex flex-col gap-2 items-end'>
                <h3 className='font-semibold text-[16px]'>{item.title}</h3>
                <p className='w-3/4 text-xs text-right'>{item.description}</p>
              </div>
            </div>
          ))}
          </div>
      </div>

      {/* Why Choose Us? */}
      <div className='px-12 py-10'>
        <h3 className='text-center py-10 text-[#B7410E] text-[19px] font-semibold'>Why Choose Us?</h3>
        <div className='flex justify-between items-center py-4 px-10'>
          <img src="/whyHappen.png" alt="whyHappen-photo" className='w-37/100'/>
          <div className='w-60/100'>
            <h3 className='text-3xl font-semibold text-[#B7410E] mb-4'>Stay Organized, Keep Everyone in the Loop</h3>
            <p className='text-xs text-[#E68B67] w-4/5'>Effortlessly track RSVPs and send timely reminders so your events run smoothly every time.</p>
            <div className='my-5 flex flex-col gap-2'>
            <p className='text-[13px] flex items-center gap-2 text-[#B7410E]'><span><IoCheckmarkCircle size={17}/></span>Hassle-Free RSVPs – Guests can confirm attendance with a single click—no account creation, no app download, no confusion.</p>
            <p className='text-[13px] flex items-center gap-2 text-[#B7410E]'><span><IoCheckmarkCircle size={17}/></span>Automatic Email Reminders – Send friendly, timely reminders so no one forgets your event, increasing turnout effortlessly.</p>
            <p className='text-[13px] flex items-center gap-2 text-[#B7410E]'><span><IoCheckmarkCircle size={17}/></span>All-in-One Dashboard – Create events, manage invitations, and monitor RSVPs in one simple, accessible dashboard.</p>
            <p className='text-[13px] flex items-center gap-2 text-[#B7410E]'><span><IoCheckmarkCircle size={17}/></span>Instant Updates – Any RSVP changes are reflected in real time, so you always know your latest guest count.</p>
            <p className='text-[13px] flex items-center gap-2 text-[#B7410E]'><span><IoCheckmarkCircle size={17}/></span>Professional & Personal – Perfect for business meetings, weddings, birthdays, or any gathering where attendance matters.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='mt-17 p-7 pb-4 bg-[#B7410E] flex flex-col gap-7.5 justify-center items-center text-[#FAF5E0]'>
          <div className='flex gap-5 text-xl'>
            <IoLogoInstagram className='cursor-pointer hover:text-[#FAF5E0]/50 transition-all'/>
            <FaFacebook className='cursor-pointer hover:text-[#FAF5E0]/50 transition-all'/>
            <FaTwitter className='cursor-pointer hover:text-[#FAF5E0]/50 transition-all'/>
            <FaYoutube className='cursor-pointer hover:text-[#FAF5E0]/50 transition-all'/>
          </div>
          <div className='flex flex-col items-center gap-5'>
            <div className='flex flex-col items-center gap-6'>
                <p className='text-[13px]'>Make it HAPPEN — because great moments deserve great planning.</p>
                <div className='flex items-center gap-2'>
                <img src='/happen-logo.jpg' alt="logo" className='h-6 w-6 rounded-full'/>
                <p className='text-[13px]'>Happen</p>
                </div>
            </div>
          <p className='text-[11px] opacity-80'>© 2025 Happen. Designed & Developed by <span className='hover:underline cursor-pointer'>Vanshika Narang</span>. All rights reserved.</p>
          </div>
      </div>


    {openModal && <Modal type={type} setType={setType} onClose={() => setOpenModal(!openModal)} />}

    </div>
  )
}

export default LandingPage
