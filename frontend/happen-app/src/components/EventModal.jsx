import React from 'react'
import EventInput from './inputs/EventInput';
import { useState } from 'react';
import ParticipantAdder from './inputs/ParticipantAdder';
import { IoClose } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const EventModal = ({ type, getAllEvents, eventData, getEvent, onClose }) => {

    const [title, setTitle] = useState(eventData?.title || "");
    const [time, setTime] = useState(eventData?.time.start || "");
    const [date, setDate] = useState(eventData?.date ? moment(eventData.date).format("YYYY-MM-DD") : "");
    const [location, setLocation] = useState(eventData?.location || "");
    const [description, setDescription] = useState(eventData?.description || "");
    const [participants, setParticipants] = useState(eventData?.participants || []);

    const [error, setError] = useState("");

    const removeParticipant = (value) => {
        setParticipants(participants.filter((item)=>item.email!==value))
    }

    const [clear, setClear] = useState(false);
    const clearFields = () => {
        setTitle("");
        setDate("");
        setLocation("");
        setDescription("");
        setParticipants([]);
        setError("");
        setClear(true);
    }

    const addEvent = async () => {
        if(!title || !date || !location) {
            setError('Title, Date and Location are necessary');
            return;
        }
        if(participants.length===0) {
            setError('At least one participant is required');
            return;
        }

        try {
            const response = await axiosInstance.post('/api/event/add-event',{
                title,
                date,
                time,
                location,
                description,
                participants,
            });
            if(response.data && response.data.message) {
                toast.success(response.data.message,{
                    duration: 700
                });
                setTimeout(() => {
                    getAllEvents();
                    onClose();
                    clearFields();
                },300)
            }
        } catch(error) {
            console.log('Server Error');
        }
    }

    const { id } = useParams();
    const editEvent = async () => {
        if(!title || !date || !location) {
            setError('Title, Date and Location are necessary');
            return;
        }
        if(participants.length===0) {
            setError('At least one participant is required');
            return;
        }

        try {
            const response = await axiosInstance.put(`/api/event/edit-event/${id}`,{
                title,
                time,
                date,
                location,
                description,
                participants
            });
            if(response.data && response.data.message) {
                toast.success(response.data.message,{
                    duration: 700
                });
                setTimeout(() => {
                    getEvent();
                    onClose();
                    clearFields();
                },300)
            }

        } catch(error) {
            console.log('Server Error');
        }
    }

  return (
    <div className='fixed z-10 inset-0 bg-black/50 flex justify-center items-center overflow-y-auto'>
        <div className='w-8/10 md:w-1/3 max-h-85/100 md:max-h-9/10 bg-white rounded-2xl shadow-lg shadow-gray-700/50 overflow-y-auto'>

            <div className='p-3.5 md:p-5 border-b-1 border-[#B7410E]/10 flex justify-between items-center'>
            <div className='flex flex-col md:gap-1'>
                <h3 className='text-[15px] md:text-lg font-semibold'>{type} your Event</h3>
                <p className='text-[11px] md:text-[13px] text-[#B7410E]/80'>Fill in your event details</p>
            </div>
            <button className='p-1 md:p-1.5 md:text-[19px] border-1 border-[#B7410E]/20 text-[#B7410E]/90 rounded-lg cursor-pointer hover:text-white hover:bg-[#B7410E]/90' onClick={onClose}><IoMdClose/></button>
            </div>

            <div className='p-4 md:p-5 flex flex-col gap-3 w-full'>
                <div className='flex md:flex-row flex-col gap-3 md:gap-5'>
                <EventInput label="Event Title" type="text" placeholder="Seminar" value={title} setValue={setTitle} />
                <EventInput label="Date" type="date" placeholder="" value={date} setValue={setDate} />
                </div>
                <EventInput label="Location" type="text" placeholder="Connaught Place" value={location} setValue={setLocation} />
                <div className='flex flex-col gap-1 w-full '>
                    <label className='text-xs md:text-[13px] font-[500]'>Describe your event</label>
                    <textarea rows="6" label="Describe your event" type="text" placeholder="A knowledge-sharing session bringing together experts and learners to explore new ideas." value={description} onChange={({ target }) => setDescription(target.value)} 
                    className='text-xs md:text-[13px] px-2 md:px-3 py-2 border-1 border-[#B7410E]/15 rounded-lg outline-none'
                    /> 
                </div>
                <ParticipantAdder label="Add Participants" type="email" placeholder="johndoe@example.com" participants={participants} setParticipants={setParticipants} setError={setError} clear={clear}/>
            </div>

            {participants.length>0 && 
            <div className='flex flex-wrap gap-3 px-5'>
            {participants.map((item,index) => (
                <div className='text-[10px] md:text-[11px] bg-[#B7410E]/10 w-fit px-1.5 py-1 rounded-md flex justify-center items-center gap-1'>{item.email} <IoClose className='cursor-pointer text-[12px] md:text-sm' onClick={() => removeParticipant(item.email)}/></div>
            ))}
            </div>
            }

            <div className='p-4 md:p-5 gap-2 md:gap-3 flex justify-end'>
                <button className='text-[11px] md:text-xs font-[600] px-4 py-2 md:py-3 border border-[#B7410E]/15 rounded-lg cursor-pointer' onClick={clearFields}>Clear</button>
                <button className='text-[10px] md:text-[11px] px-3 py-2.5 rounded-lg cursor-pointer bg-[#B7410E] text-white' onClick={type==='Create'?addEvent:editEvent}>{type==='Create'?'Save and Create':'Save and Update'}</button>
            </div>

        </div>
    </div>
  )
}

export default EventModal
