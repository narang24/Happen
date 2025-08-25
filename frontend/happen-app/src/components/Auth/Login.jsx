import React from 'react'
import { IoMdClose } from "react-icons/io";
import Input from '../inputs/input';
import { useState } from 'react';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
 
const Login = ({ setType, onClose }) => {

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email || !password) {
      setError('All fields are required');
      return;
    }

    const isEmailValid = validateEmail(email);

    if(!isEmailValid) {
      setError('Invalid email address');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/login',{
        email,
        password
      });

      if(response.data && response.data.message) {
        localStorage.setItem('token',response.data.token);
        onClose();
        toast.success(response.data.message);
        navigate('/Dashboard');
      }

    } catch(error) {
      console.log('Server Error');
    }
  }

  const forgotPassword = async () => {

    if(!forgotPasswordEmail) {
      setForgotPasswordError('Email is required');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/forgot-password',{
        email: forgotPasswordEmail,
      })

      if(response.data && response.data.message) {
        toast.success(response.data.message);
      }

    } catch(error) {
      console.log('Server Error');
    }
  }

  return (
    <div className='max-h-8/10 w-3/10 bg-white text-[#B7410E] rounded-xl shadow-md'>

      {isForgotPassword?
      <div>
    
        <div className='border-b-2 border-[#B7410E]/10 px-5 py-4 flex justify-between items-center'>
            <div>
            <h3 className='font-semibold text-lg'>Reset your password</h3>
            <p className='text-[13px] text-[#B7410E]/85'>Enter your email to continue</p>
            </div>
        </div>

        <div className='px-5 pt-10'>
            <Input label='Email' type='email' placeholder='you@example.com' value={forgotPasswordEmail} onChange={(value) => setForgotPasswordEmail(value)}/>
        </div>

        {forgotPasswordError && <p className='text-[11px] text-red-700 px-6 pt-1.5'>*{forgotPasswordError}</p>}

        <div className='mx-5 mt-4'>
            <button className='w-full text-[13px] bg-[#B7410E] text-white p-2.5 rounded-lg cursor-pointer' onClick={forgotPassword}>Send Email</button>
        </div>

        <p className='text-xs text-center p-5'>Remember password? <span className='text-[13px] font-semibold hover:underline cursor-pointer' onClick={() => {setType('login'); setIsForgotPassword(!isForgotPassword)}}>Login</span></p>

      </div>
      :
      <div>
    
        <div className='border-b-2 border-[#B7410E]/10 px-5 py-4 flex justify-between items-center'>
            <div>
            <h3 className='font-semibold text-lg'>Log in to your account</h3>
            <p className='text-[13px] text-[#B7410E]/85'>Welcome back, you've been missed</p>
            </div>
            <button className='text-lg bg-[#B7410E]/5 p-1.5 rounded-md hover:bg-[#B7410E] hover:text-white cursor-pointer' onClick={onClose}><IoMdClose /></button>
        </div>

        <div className='px-5 pt-10'>
            <Input label='Email' type='email' placeholder='you@example.com' value={email} onChange={(value) => setEmail(value)}/>
            <Input label='Password' type='password' placeholder='••••••••••' value={password} onChange={(value) => setPassword(value)}/>
        </div>

        <div className={`w-full px-6 pt-1.5 pb-3.5 flex ${error?'justify-between':'justify-end'} items-center`}>
          {error && <p className='text-[11px] text-red-700'>*{error}</p>}
          <button className='text-[12px] hover:underline cursor-pointer' onClick={() => setIsForgotPassword(!isForgotPassword)}>Forgot Password?</button>
        </div>


        <div className='mx-5'>
            <button className='w-full text-[13px] bg-[#B7410E] text-white p-2.5 rounded-lg cursor-pointer' onClick={handleLogin}>Log In</button>
        </div>

        <p className='text-xs text-center p-5'>Don't have an account? <span className='text-[13px] font-semibold hover:underline cursor-pointer' onClick={() => setType('signup')}>Sign Up</span></p>

      </div>}

    </div>
  )
}

export default Login
