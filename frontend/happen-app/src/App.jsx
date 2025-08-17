import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<LandingPage />} />
          <Route path='/forgot-password' exact element={<ResetPassword />} />
          <Route path='/dashboard' exact element={<Dashboard />}>
          
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
