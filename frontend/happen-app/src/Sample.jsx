import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaEnvelope, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaUserCheck, 
  FaUserTimes, 
  FaUser, 
  FaChevronLeft, 
  FaFilter, 
  FaSearch, 
  FaTimes 
} from 'react-icons/fa';

const Sample = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'details'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newInviteEmail, setNewInviteEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    invitees: []
  });
  const [tempInviteEmail, setTempInviteEmail] = useState('');

  // Sample data
  const recentEvents = [
    {
      id: 1,
      title: 'Tech Conference 2025',
      date: '2025-08-20',
      time: '9:00 AM - 6:00 PM',
      location: 'Convention Center, Delhi',
      description: 'Annual technology conference featuring the latest innovations and industry trends.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      attendees: 150,
      invitees: [
        { email: 'john.doe@example.com', status: 'accepted', name: 'John Doe' },
        { email: 'jane.smith@example.com', status: 'declined', name: 'Jane Smith' },
        { email: 'mike.wilson@example.com', status: 'accepted', name: 'Mike Wilson' }
      ]
    },
    {
      id: 2,
      title: 'Workshop: AI & Machine Learning',
      date: '2025-08-15',
      time: '2:00 PM - 5:00 PM',
      location: 'Tech Hub, Bangalore',
      description: 'Hands-on workshop covering fundamentals of AI and machine learning applications.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
      attendees: 75,
      invitees: [
        { email: 'sarah.jones@example.com', status: 'accepted', name: 'Sarah Jones' },
        { email: 'david.brown@example.com', status: 'pending', name: 'David Brown' }
      ]
    }
  ];

  const scheduledEvents = [
    {
      id: 3,
      title: 'Product Launch Event',
      date: '2025-09-15',
      time: '11:00 AM - 2:00 PM',
      location: 'Corporate Headquarters, Mumbai',
      description: 'Exciting product launch event showcasing our latest innovations and market solutions.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
      attendees: 200,
      invitees: [
        { email: 'alex.kumar@example.com', status: 'accepted', name: 'Alex Kumar' },
        { email: 'priya.sharma@example.com', status: 'pending', name: 'Priya Sharma' },
        { email: 'rahul.singh@example.com', status: 'declined', name: 'Rahul Singh' },
        { email: 'lisa.martin@example.com', status: 'accepted', name: 'Lisa Martin' }
      ]
    },
    {
      id: 4,
      title: 'Annual Team Retreat',
      date: '2025-10-05',
      time: '10:00 AM - 8:00 PM',
      location: 'Mountain Resort, Shimla',
      description: 'Annual team building retreat with activities, workshops, and networking sessions.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400',
      attendees: 85,
      invitees: [
        { email: 'team.lead@example.com', status: 'accepted', name: 'Team Lead' },
        { email: 'hr.manager@example.com', status: 'accepted', name: 'HR Manager' }
      ]
    },
    {
      id: 5,
      title: 'Client Presentation',
      date: '2025-09-28',
      time: '3:00 PM - 5:00 PM',
      location: 'Client Office, Gurgaon',
      description: 'Important client presentation for our new project proposal and strategic partnership.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400',
      attendees: 12,
      invitees: [
        { email: 'client.director@example.com', status: 'pending', name: 'Client Director' },
        { email: 'project.manager@example.com', status: 'accepted', name: 'Project Manager' }
      ]
    }
  ];

  const allEvents = [...recentEvents, ...scheduledEvents];

  const filteredRecentEvents = recentEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredScheduledEvents = scheduledEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setCurrentView('details');
  };

  const Modal = ({ show, title, children, onClose }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const EventForm = ({ isEdit = false }) => (
    <div className="space-y-6">
      {/* Event Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Enter event title"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time *
          </label>
          <input
            type="text"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            placeholder="e.g., 10:00 AM - 2:00 PM"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location *
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          placeholder="Enter event location"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Describe your event..."
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Image URL
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {/* Invitees Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Invite People
        </label>
        
        {/* Add Invitee */}
        <div className="flex space-x-3 mb-4">
          <input
            type="email"
            value={tempInviteEmail}
            onChange={(e) => setTempInviteEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddInvitee}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Invitees List */}
        {formData.invitees.length > 0 && (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {formData.invitees.map((invitee, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-orange-600">
                      {invitee.name?.charAt(0).toUpperCase() || invitee.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{invitee.name || invitee.email.split('@')[0]}</p>
                    <p className="text-sm text-gray-600">{invitee.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveInvitee(index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4">
        <button
          onClick={closeModal}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => handleFormSubmit(isEdit)}
          className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          {isEdit ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </div>
  );

  const DeleteConfirmation = () => (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <FaTrash className="w-8 h-8 text-red-600" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Event</h3>
        <p className="text-gray-600">
          Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone.
        </p>
      </div>
      <div className="flex space-x-4 pt-4">
        <button
          onClick={closeModal}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Delete logic here
            setShowDeleteModal(false);
            setCurrentView('list');
          }}
          className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Event
        </button>
      </div>
    </div>
  );

  const handleCreateEvent = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: '',
      invitees: []
    });
    setShowCreateModal(true);
  };

  const handleEditEvent = () => {
    setFormData({
      title: selectedEvent.title,
      date: selectedEvent.date,
      time: selectedEvent.time,
      location: selectedEvent.location,
      description: selectedEvent.description,
      image: selectedEvent.image,
      invitees: selectedEvent.invitees
    });
    setShowEditModal(true);
  };

  const handleDeleteEvent = () => {
    setShowDeleteModal(true);
  };

  const handleFormSubmit = (isEdit = false) => {
    if (isEdit) {
      // Update existing event logic
      setSelectedEvent({
        ...selectedEvent,
        ...formData
      });
      setShowEditModal(false);
    } else {
      // Create new event logic
      const newEvent = {
        id: Date.now(),
        ...formData,
        attendees: formData.invitees.length
      };
      setShowCreateModal(false);
    }
  };

  const handleAddInvitee = () => {
    if (tempInviteEmail) {
      const newInvitee = {
        email: tempInviteEmail,
        name: tempInviteEmail.split('@')[0],
        status: 'pending'
      };
      setFormData({
        ...formData,
        invitees: [...formData.invitees, newInvitee]
      });
      setTempInviteEmail('');
    }
  };

  const handleRemoveInvitee = (index) => {
    const updatedInvitees = formData.invitees.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      invitees: updatedInvitees
    });
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setTempInviteEmail('');
  };

  const handleSendInvite = () => {
    if (newInviteEmail && selectedEvent) {
      const newInvitee = {
        email: newInviteEmail,
        status: 'pending',
        name: newInviteEmail.split('@')[0]
      };
      
      setSelectedEvent({
        ...selectedEvent,
        invitees: [...selectedEvent.invitees, newInvitee]
      });
      setNewInviteEmail('');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <FaUserCheck className="w-4 h-4 text-green-600" />;
      case 'declined':
        return <FaUserTimes className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <FaUser className="w-4 h-4 text-yellow-600" />;
      default:
        return <FaUser className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const EventCard = ({ event, isRecent = false }) => (
    <div 
      onClick={() => handleEventClick(event)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-orange-200 group"
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${isRecent ? 'bg-gray-900 text-white' : 'bg-orange-500 text-white'}`}>
            {isRecent ? 'Completed' : 'Upcoming'}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FaCalendarAlt className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaClock className="w-4 h-4 mr-2" />
            {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaUsers className="w-4 h-4 mr-2" />
            {event.attendees} attendees
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {event.description}
        </p>
      </div>
    </div>
  );

  const InvitationPreview = ({ event }) => (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-dashed border-orange-200">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCalendarAlt className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Invited!</h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              {event.title}
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center text-gray-700">
              <FaCalendarAlt className="w-5 h-5 mr-3 text-orange-600" />
              <span className="font-medium">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <div className="flex items-center justify-center text-gray-700">
              <FaClock className="w-5 h-5 mr-3 text-orange-600" />
              <span className="font-medium">{event.time}</span>
            </div>
            
            <div className="flex items-center justify-center text-gray-700">
              <FaMapMarkerAlt className="w-5 h-5 mr-3 text-orange-600" />
              <span className="font-medium">{event.location}</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {event.description}
            </p>
          </div>
          
          <div className="pt-4 flex space-x-3">
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Accept
            </button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'details' && selectedEvent) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('list')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h1>
                <p className="text-gray-600">Event Details & Management</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={handleEditEvent}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit Event</span>
              </button>
              <button 
                onClick={handleDeleteEvent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <FaTrash className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Invitation Preview */}
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Invitation Preview</h2>
                <p className="text-gray-600">This is how your invitation will appear to recipients</p>
              </div>
              <InvitationPreview event={selectedEvent} />
            </div>

            {/* Right Column - Event Management */}
            <div className="space-y-6">
              {/* Send New Invitation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaEnvelope className="w-5 h-5 mr-2 text-orange-600" />
                  Send New Invitation
                </h3>
                
                <div className="flex space-x-3">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={newInviteEmail}
                    onChange={(e) => setNewInviteEmail(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendInvite}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Send Invite
                  </button>
                </div>
              </div>

              {/* Invitation Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUsers className="w-5 h-5 mr-2 text-orange-600" />
                  Invitation Status ({selectedEvent.invitees.length} invitees)
                </h3>
                
                <div className="space-y-3">
                  {selectedEvent.invitees.map((invitee, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-orange-600">
                            {invitee.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{invitee.name}</p>
                          <p className="text-sm text-gray-600">{invitee.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invitee.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invitee.status)}`}>
                          {invitee.status.charAt(0).toUpperCase() + invitee.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedEvent.invitees.filter(i => i.status === 'accepted').length}
                      </div>
                      <div className="text-xs text-gray-600">Accepted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {selectedEvent.invitees.filter(i => i.status === 'pending').length}
                      </div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {selectedEvent.invitees.filter(i => i.status === 'declined').length}
                      </div>
                      <div className="text-xs text-gray-600">Declined</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FaCalendarAlt className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Date & Time</p>
                      <p className="text-gray-600">
                        {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-gray-600">{selectedEvent.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">{selectedEvent.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <FaUsers className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Expected Attendees</p>
                      <p className="text-gray-600">{selectedEvent.attendees} people</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-medium text-gray-900 mb-2">Description</p>
                  <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
              <p className="text-gray-600">Manage your events, invitations, and attendees</p>
            </div>
            
            <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 shadow-sm" onClick={handleCreateEvent}>
              <FaPlus className="w-5 h-5" />
              <span>Create Event</span>
            </button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <FaSearch className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <FaFilter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Recent Events */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Recent Events</h2>
            <span className="text-sm text-gray-500">{filteredRecentEvents.length} events found</span>
          </div>
          
          {filteredRecentEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No recent events found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecentEvents.map((event) => (
                <EventCard key={event.id} event={event} isRecent={true} />
              ))}
            </div>
          )}
        </div>

        {/* Scheduled Events */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Scheduled Events</h2>
            <span className="text-sm text-gray-500">{filteredScheduledEvents.length} events found</span>
          </div>
          
          {filteredScheduledEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No scheduled events found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScheduledEvents.map((event) => (
                <EventCard key={event.id} event={event} isRecent={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sample;