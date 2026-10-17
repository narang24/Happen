import React, { useState } from 'react'
import { FaUserFriends, FaUserPlus } from 'react-icons/fa'
import { IoPersonOutline } from 'react-icons/io5'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { getInitials } from '../../../utils/helper'

// Placeholder data — replace with API calls when backend is ready
const MOCK_FRIENDS = [
  { _id: '1', username: 'Alex Johnson', email: 'alex@example.com', mutualEvents: 3 },
  { _id: '2', username: 'Priya Sharma', email: 'priya@example.com', mutualEvents: 5 },
  { _id: '3', username: 'Carlos Rivera', email: 'carlos@example.com', mutualEvents: 1 },
  { _id: '4', username: 'Mei Zhang', email: 'mei@example.com', mutualEvents: 7 },
]

const MOCK_REQUESTS = [
  { _id: '5', username: 'Jamie Lee', email: 'jamie@example.com' },
  { _id: '6', username: 'Sam Patel', email: 'sam@example.com' },
]

const avatarColors = ['bg-[#B7410E]', 'bg-[#c0522a]', 'bg-[#8b2e09]', 'bg-[#d4632e]', 'bg-[#a33d12]']

const Friends = () => {
  const [friends, setFriends] = useState(MOCK_FRIENDS)
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const [searchQuery, setSearchQuery] = useState('')

  const acceptRequest = (id) => {
    const req = requests.find(r => r._id === id)
    if (req) {
      setFriends(prev => [...prev, { ...req, mutualEvents: 0 }])
      setRequests(prev => prev.filter(r => r._id !== id))
    }
  }

  const declineRequest = (id) => {
    setRequests(prev => prev.filter(r => r._id !== id))
  }

  const filteredFriends = friends.filter(f =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='flex flex-1 flex-col md:flex-row gap-5 mt-6 overflow-y-auto scrollbar-hide'>

      {/* My Friends */}
      <div className='h-[50vh] flex-1 p-4 md:p-5 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md flex flex-col'>
        <div className='mb-3 flex justify-between items-center shrink-0'>
          <div className='flex flex-col gap-0.5 md:gap-1.5'>
            <h3 className='text-[15px] md:text-[17px] font-semibold'>My Friends</h3>
            <p className='text-[11px] md:text-xs text-[#B7410E]/70'>{friends.length} connection{friends.length !== 1 ? 's' : ''}</p>
          </div>
          <button className='flex items-center gap-1.5 text-[11px] md:text-xs bg-[#B7410E] text-white px-3 py-2 rounded-xl cursor-pointer hover:bg-[#a33d12] transition-colors'>
            <HiOutlineUserAdd size={13} /> Add Friend
          </button>
        </div>

        {/* Search */}
        <div className='mb-2 shrink-0'>
          <input
            type='text'
            placeholder='Search friends...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full text-xs px-3 py-2 border border-[#B7410E]/15 rounded-lg outline-none text-[#B7410E] placeholder:text-[#B7410E]/40'
          />
        </div>

        <div className='flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-hide'>
          {filteredFriends.length === 0 ? (
            <div className='flex-1 flex flex-col justify-center items-center text-[#B7410E]/40 gap-2'>
              <FaUserFriends size={32} />
              <p className='text-sm'>No friends found</p>
            </div>
          ) : (
            filteredFriends.map((friend, index) => (
              <div key={friend._id} className='flex items-center gap-3 p-3 rounded-xl hover:bg-[#B7410E]/5 cursor-pointer transition-all duration-200'>
                <div className={`h-10 w-10 shrink-0 ${avatarColors[index % avatarColors.length]} text-white text-sm rounded-full flex justify-center items-center font-semibold`}>
                  {getInitials(friend.email)}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-semibold truncate'>{friend.username}</p>
                  <p className='text-[11px] text-[#B7410E]/60 truncate'>{friend.email}</p>
                </div>
                <div className='text-right shrink-0'>
                  <p className='text-[10px] text-[#B7410E]/50'>{friend.mutualEvents} mutual</p>
                  <p className='text-[10px] text-[#B7410E]/50'>events</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Friend Requests */}
      <div className='h-[50vh] flex-1 p-4 md:p-5 bg-white rounded-xl shadow-gray-300/50 shadow-sm hover:shadow-md flex flex-col'>
        <div className='mb-3 flex justify-between items-center shrink-0'>
          <div className='flex flex-col gap-0.5 md:gap-1.5'>
            <h3 className='text-[15px] md:text-[17px] font-semibold'>Friend Requests</h3>
            <p className='text-[11px] md:text-xs text-[#B7410E]/70'>{requests.length} pending</p>
          </div>
          {requests.length > 0 && (
            <span className='h-5 w-5 bg-[#B7410E] text-white text-[10px] rounded-full flex items-center justify-center font-semibold'>
              {requests.length}
            </span>
          )}
        </div>

        <div className='flex-1 flex flex-col gap-2 overflow-y-auto scrollbar-hide'>
          {requests.length === 0 ? (
            <div className='flex-1 flex flex-col justify-center items-center text-[#B7410E]/40 gap-2'>
              <FaUserPlus size={32} />
              <p className='text-sm'>No pending requests</p>
            </div>
          ) : (
            requests.map((req, index) => (
              <div key={req._id} className='flex items-center gap-3 p-3 rounded-xl border border-[#B7410E]/8 bg-[#FFF8F6]'>
                <div className={`h-10 w-10 shrink-0 ${avatarColors[index % avatarColors.length]} text-white text-sm rounded-full flex justify-center items-center font-semibold`}>
                  {getInitials(req.email)}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-semibold truncate'>{req.username}</p>
                  <p className='text-[11px] text-[#B7410E]/60 truncate'>{req.email}</p>
                </div>
                <div className='flex gap-2 shrink-0'>
                  <button
                    onClick={() => acceptRequest(req._id)}
                    className='text-[11px] bg-[#B7410E] text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#a33d12] transition-colors'
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineRequest(req._id)}
                    className='text-[11px] border border-[#B7410E]/30 text-[#B7410E]/70 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#B7410E]/8 transition-colors'
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}

export default Friends
