import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import AddNewTodo from '../Pages/AddTodo/AddNewTodo'
import Profile from '../Pages/Profile/Profile'
import PrivateRoute from './PrivateRoute'
import Register from '../Pages/Register/Register'
import AboutCard from '../Pages/About/AboutCard'
import ContactUsCompliment from './ContactUs/ContactUsCompliment'

const Router = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/addtodo" element={<AddNewTodo />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="" element={<PrivateRoute/>}  />
          <Route path="/about" element={<AboutCard/>} /> 
          <Route path='/contact' element={<ContactUsCompliment/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default Router