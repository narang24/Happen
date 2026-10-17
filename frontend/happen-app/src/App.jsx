import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { Toaster } from 'react-hot-toast'
import ResetPassword from './pages/ResetPassword'
import DashboardLayout from './pages/DashboardLayout'
import Dashboard from './components/Tabs/TabPages/Dashboard'
import Invitations from './components/Tabs/TabPages/Invitations'
import Friends from './components/Tabs/TabPages/Friends'
import Schedule from './components/Tabs/TabPages/Schedule'
import Events from './components/Tabs/TabPages/Events'
import EventDetails from './components/Layers/EventDetails'
import Sample from './Sample'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<LandingPage />} />
          <Route path='/forgot-password' exact element={<ResetPassword />} />
          <Route element={<DashboardLayout />}>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/Events' element={<Events/>}/>
            <Route path='/Events/get-event/:id' element={<EventDetails />}/>
            <Route path='/Invitations' element={<Invitations/>}/>
            <Route path='/Friends' element={<Friends/>}/>
            <Route path='/Schedule' element={<Schedule/>}/>
          </Route>
          <Route path='/sample' exact element={<Sample/>}/>
        </Routes>
      </Router>

      <Toaster
      position="top-center"
      reverseOrder={false}
      />

    </div>
  )
}

export default App
