import React from 'react'
import { IoMdClose } from "react-icons/io";
import { LuUser, LuUpload } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import Input from '../inputs/input';
import { useState } from 'react';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
 
const Signup = ({ setType, onClose }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const uploadImage = async (url, file) => {
    try {
      const formData = new FormData();
      formData.append('file',file);
      const response = await axiosInstance.post(url, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      return response.data;
    } catch(error) {
      console.log('Error uploading image');
    }
  }

  const handleSignup = async () => {

    if(!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    const isEmailValid = validateEmail(email);

    if(!isEmailValid) {
      setError('Invalid email address');
      return;
    }

    try {

      let fileUrl = "";
      if(file && typeof file !== 'string') {
        const res = await uploadImage('/upload',file);
        fileUrl = res.fileUrl;
      }

      const response = await axiosInstance.post('/api/auth/signup',{
        username,
        email,
        password,
        profileImageUrl: fileUrl,
      });

      if(response.data && response.data.message) {
        localStorage.setItem('token',response.data.token);
        onClose();
        toast.success(response.data.message);
        if(response.data.user.isVerified) {
          navigate('/Dashboard');
        }
      }

    } catch(error) {
      console.log('Server Error')
    }
    
  }

  return (
    <div className='max-h-90/100 w-3/10 bg-white text-[#B7410E] rounded-xl shadow-md'>
    
        <div className='border-b-2 border-[#B7410E]/10 px-5 py-4 flex justify-between items-center'>
            <div>
            <h3 className='font-semibold text-lg'>Create a profile</h3>
            <p className='text-[13px] text-[#B7410E]/85'>Get started by creating your account</p>
            </div>
            <button className='text-lg bg-[#B7410E]/5 p-1.5 rounded-md hover:bg-[#B7410E] hover:text-white cursor-pointer' onClick={onClose}><IoMdClose /></button>
        </div>

        <div className='w-full flex flex-col gap-3 justify-center items-center py-10'>
        <input type="file" id="fileInput" className='hidden' onChange={(e) => setFile(e.target.files[0])}/>
        <button className={`h-[62px] w-[62px] bg-[#B7410E]/10 ${file?'p-0':'p-5.5'} text-lg rounded-full flex justify-center items-center cursor-pointer relative`} onClick={() => document.getElementById('fileInput').click()}>
        
        {(typeof file === 'string' || (file && typeof file === 'object' && file.type && file.type.startsWith('image/')))?
        <img src={ typeof file === 'string'? file : URL.createObjectURL(file) } className='h-full w-full object-cover rounded-full'/>
        :
        <LuUser />
        }

        {file?
        <div className='absolute right-0 bottom-0 text-xs bg-[#B7410E] text-white p-1.5 rounded-full' onClick={() => setFile(null)}><MdDelete /></div>
        :
        <div className='absolute right-0 bottom-0 text-xs bg-[#B7410E] text-white p-1.5 rounded-full'><LuUpload /></div>
        }
        
        </button>
        <p className='text-xs'>Profile Picture</p>
        </div>

        <div className='px-5 '>
            <Input label='Username' type='text' placeholder='John Doe' value={username} onChange={(value) => setUsername(value)}/>
            <Input label='Email' type='email' placeholder='you@example.com' value={email} onChange={(value) => setEmail(value)}/>
            <Input label='Password' type='password' placeholder='Must be at least 6 characters' value={password} onChange={(value) => setPassword(value)}/>
        </div>

        {error && <p className='text-[11px] text-red-700 px-6 pt-1.5'>*{error}</p>}

        <div className='mx-5 mt-4'>
            <button className='w-full text-[13px] bg-[#B7410E] text-white p-2.5 rounded-lg cursor-pointer' onClick={handleSignup}>Sign Up</button>
        </div>

        <p className='text-xs text-center p-5'>Already have an account? <span className='text-[13px] font-semibold hover:underline cursor-pointer' onClick={() => setType('login')}>Sign in</span></p>

    </div>
  )
}

export default Signup
