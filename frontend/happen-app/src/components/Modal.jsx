import React from 'react'
import Signup from './Auth/Signup';
import Login from './Auth/Login';

const Modal = ({ type, setType, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black/45 flex justify-center items-center overflow-y-auto'>

      {type==='signup'?<Signup onClose={onClose} setType={setType} />:<Login onClose={onClose} setType={setType} />}

    </div>
  )
}

export default Modal
