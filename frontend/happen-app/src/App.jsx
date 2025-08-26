import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { Toaster } from 'react-hot-toast'
import ResetPassword from './pages/ResetPassword'
import DashboardLayout from './pages/DashboardLayout'
import Dashboard from './components/Tabs/TabPages/Dashboard'
import Invitations from './components/Tabs/TabPages/Invitations'
import Friends from './components/Tabs/TabPages/Friends'
import Events from './components/Tabs/TabPages/Events'
import EventDetails from './components/Layers/EventDetails'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<LandingPage />} />
          <Route path='/forgot-password' exact element={<ResetPassword />} />
          <Route path='/' exact element={<DashboardLayout />}>
            <Route path='/Dashboard' exact element={<Dashboard/>}/>
            <Route path='/Events' exact element={<Events/>}/>
            <Route path='/Events/get-event/:id' exact element={<EventDetails />}/>
            <Route path='/Invitations' exact element={<Invitations/>}/>
            <Route path='/Friends' exact element={<Friends/>}/>
          </Route>
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
