import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import moment from 'moment';
import { IoLocationOutline } from 'react-icons/io5';
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";
import { getInitials, validateEmail } from '../../utils/helper';
import EventModal from '../EventModal';
import toast from 'react-hot-toast';
import DeleteModal from '../deleteModal';

const EventDetails = () => {

  const navigate = useNavigate();

  const [selectDelete, setSelectDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [eventData, setEventData] = useState(null);
  const { id } = useParams();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const images = ['/cardBg.png', '/cardBg2.png', '/cardBg3.png', '/cardBg4.png', '/cardBg5.png'];

  const getEvent = async () => {
    try {
      const response = await axiosInstance.get(`/api/event/get-event/${id}`);
      if (response.data) {
        setEventData(response.data);
        setError("");
      }
    } catch (error) {
      console.log('Server Error');
    }
  }

  const deleteEvent = async () => {
    try {
      const response = await axiosInstance.delete(`/api/event/delete-event/${id}`);
      if (response.data && response.data.message) {
        toast.success(response.data.message, {
          duration: 700
        });
        navigate('/Events');
      }
    } catch (error) {
      console.log('Server Error');
    }
  }

  const editEvent = async () => {

    if (email) eventData.participants = [...eventData.participants, { email, status: 'Pending' }];

    try {
      const response = await axiosInstance.put(`/api/event/edit-event/${id}`, {
        title: eventData.title,
        time: eventData.time,
        date: eventData.date,
        location: eventData.location,
        description: eventData.description,
        participants: eventData.participants
      });
      if (response.data) {
        console.log('Participant added successfully!');
      }
    } catch (error) {
      console.log('Server Error');
    }
  }

  const sendInvite = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }
    const validEmail = validateEmail(email);
    if (!validEmail) {
      setError('Invalid Email Address');
      return;
    }
    if (eventData.participants.some(p => p.email === email)) {
      setError('Email Address already invited');
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/api/event/get-event/${id}/invite`, { email });
      if (response.data) {
        editEvent();
        toast.success(response.data.message, {
          duration: 700,
        });
        setLoading(false);
        setTimeout(() => {
          getEvent();
          setEmail('');
        }, 300);
      }
    } catch (error) {
      console.log("Server Error");
    }

  }

  const deleteEmail = (item) => {
    try {
      eventData.participants = eventData.participants.filter((i) => i.email !== item.email);
      setEmail("");
      editEvent();
      toast.success('Invitation withdrawn successfully', {
        duration: 1000
      })
      getEvent();
    } catch (error) {
      console.log('Error deleting email');
    }
  }

  useEffect(() => {
    getEvent();
  }, [id]);

  return (
    <div className='flex flex-1 overflow-y-auto flex-col mt-9'>

      <div className='flex justify-between items-center mb-5'>
        <button className='flex items-center gap-2 text-xs px-4 py-3 border border-[#B7410E]/20 rounded-lg cursor-pointer font-semibold' onClick={() => navigate('/Events')}><IoMdArrowRoundBack className='text-[15px]' /> Back</button>
        <div className='flex items-center gap-3'>
          <button className='flex items-center gap-2 bg-[#B7410E]/90 text-white text-xs px-4 py-3 rounded-lg cursor-pointer' onClick={() => setOpenModal(true)}><TbEdit className='text-[15px]' /> Edit</button>
          <button className='flex items-center gap-2 text-xs px-4 py-3 border border-[#B7410E]/20 rounded-lg cursor-pointer font-semibold' onClick={() => { setSelectDelete(true); }}><MdDelete className='text-[15px]' /> Delete</button>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-5 overflow-y-auto'>

        <div className='md:w-2/5'>
          {eventData &&
            <div className='relative text-white p-4 rounded-2xl shadow-md hover:shadow-lg h-[50vh]'>

              <img src={images[4]} alt="bg" className='absolute inset-0 w-full h-full object-cover rounded-2xl' />

              <div className='absolute inset-0 bg-black/20 rounded-2xl' />

              <div className='w-86/100 absolute z-10 bottom-3 flex flex-col gap-2'>

                <div className='flex justify-between items-end'>
                  <div>
                    <p className='text-[15px] font-semibold'>{eventData.title}</p>
                    <p className='text-xs flex items-center gap-1'><IoLocationOutline className='text-[13px]' />{eventData.location}</p>
                  </div>

                  <div>
                    <p className='text-[13px] font-semibold'>{moment(eventData.date).format("DD MMM YYYY")}</p>
                    {/* <p className='text-[13px]'>{eventData.time.start} - {eventData.time.end}</p> */}
                  </div>
                </div>
              </div>

            </div>
          }
        </div>

        <div className='overflow-y-auto scrollbar-hide h-[50vh] flex-1 flex flex-col p-5 bg-white rounded-2xl shadow-gray-300/50 shadow-sm hover:shadow-md'>
          <div className='flex flex-col gap-1'>
            <h3 className='font-semibold'>Invite people to your event</h3>
            <p className='text-xs text-[#B7410E]/80'>An email to accept/decline the invitation shall be sent.</p>
          </div>

          <div className='my-6 flex flex-col gap-1.5'>
            <label className='text-xs'>Invite email</label>
            <div className='flex gap-1.5'>
              <input type="text" placeholder='Enter email address' className='text-[13px] px-3 py-2 border border-[#B7410E]/20 rounded-lg flex-1 outline-none' value={email} onChange={({ target }) => setEmail(target.value)} />
              <button className='text-white bg-[#B7410E]/90 text-[11px] px-3 py-2 rounded-lg cursor-pointer' onClick={sendInvite}>{loading ? "Sending" : "Send Invite"}</button>
            </div>
            {error && <p className='text-[11px] text-red-700 px-1'>*{error}</p>}
          </div>

          <div className='flex-1 p-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide'>
            {eventData && eventData.participants.map((item, index) => (
              <div className='flex justify-between items-center'>
                <div className='flex gap-2.5 items-center'>
                  <div className='bg-[#B7410E]/10 h-8 w-8 text-[17px] flex justify-center items-center rounded-full'>{getInitials(item.email)}</div>
                  <p className='text-xs'>{item.email}</p>
                </div>

                <div className='flex justify-center items-center gap-3'>
                  <div className={`${item.status === 'Accepted' ? 'text-green-700 bg-green-100/80' : (item.status === 'Declined' ? 'text-red-700 bg-red-100/50' : 'text-yellow-500 bg-yellow-100/80')} text-[11px] py-1 px-2 rounded-md flex justify-center items-center gap-1.5`}>
                    <div className={`${item.status === 'Accepted' ? 'bg-green-700' : (item.status === 'Declined' ? 'bg-red-700' : 'bg-yellow-500')} h-1 w-1 rounded-full`} />
                    <p>{item.status}</p>
                  </div>
                  <button className='text-[15px] text-gray-900/50 hover:text-red-700 cursor-pointer' onClick={() => deleteEmail(item)}><HiOutlineTrash /></button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {openModal && <EventModal
        type='Edit'
        getAllEvents={null}
        eventData={eventData}
        getEvent={getEvent}
        onClose={() => setOpenModal(!openModal)}
      />}

      {selectDelete && <DeleteModal
        onClose={() => setSelectDelete(!selectDelete)}
        deleteEvent={deleteEvent}
      />}
    </div>
  )
}

export default EventDetails
