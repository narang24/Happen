import React, { useState } from 'react'
import Input from '../components/inputs/input';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [newConfirmPassword, setNewConfirmPassword] = useState('');

    const [newPasswordError, setNewPasswordError] = useState('');

    const navigate = useNavigate();

    const changePassword = async () => {
        if(!newPassword || !newConfirmPassword) {
            setNewPasswordError('All fields are required');
            return;
        }

        const validatePassword = newPassword===newConfirmPassword;
        if(!validatePassword) {
            setNewPasswordError("Passwords don't match");
            return;
        }

        const token = new URLSearchParams(location.search).get('token');

        if(!token) {
            setNewPasswordError("No token found!");
            return;
        }

        try {
            const response = await axiosInstance.post('/api/auth/reset-password',{
                token,
                password: newPassword
            });

            if(response.data && response.data.message) {
                toast.success(response.data.message);
                navigate('/');
            }

        } catch(error) {
            console.log('Server Error');
        }
    }

  return (
    <div className='flex h-screen justify-center items-center bg-black/20'>
      <div className='max-h-8/10 md:w-3/10 bg-white text-[#B7410E] rounded-xl shadow-md'>
    
        <div className='border-b-2 border-[#B7410E]/10 px-5 py-4 flex justify-between items-center'>
            <div>
            <h3 className='font-semibold text-lg'>Change your password</h3>
            <p className='text-[13px] text-[#B7410E]/85'>Your new password must be different</p>
            </div>
        </div>

        <div className='px-5 pt-10'>
            <Input label='New password' type='text' placeholder='Must be 6 characters' value={newPassword} onChange={(value) => setNewPassword(value)}/>
            <Input label='Confirm new password' type='text' placeholder='Please confirm password' value={newConfirmPassword} onChange={(value) => setNewConfirmPassword(value)}/>
        </div>

        {newPasswordError && <p className='text-[11px] text-red-700 px-6 pt-1.5'>*{newPasswordError}</p>}

        <div className='m-5'>
            <button className='w-full text-[13px] bg-[#B7410E] text-white p-2.5 rounded-lg cursor-pointer' onClick={changePassword}>Change password</button>
        </div>

        {/* <p className='text-xs text-center p-5'>Remember password? <span className='text-[13px] font-semibold hover:underline cursor-pointer' onClick={() => {}}>Login</span></p> */}

      </div>
    </div>
  )
}

export default ResetPassword
