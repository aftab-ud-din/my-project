import React from 'react'
import{Routes, Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home';
import Bus from '../pages/Bus';
import BusDetails from '../pages/BusDetails';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import BusSearchResultList from '../pages/BusSearchResultList';
import ThankYou from '../pages/ThankYou';
import ChatBot from '../pages/ChatBot';
import About from '../pages/About';
import Profile from '../pages/Profile';
import Track from '../pages/Track'
import Vendor from '../pages/Vendor';
import VendorTour from '../pages/VendorTour'
import Admin from '../Admin/Admin';


const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/bus' element={<Bus />} />
        <Route path='/bus/:id' element={<BusDetails />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/tours/:id' element={<TourDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/track' element={<Track />} />
        <Route path='/vendor' element={<Vendor />} />
        <Route path='/vendor-tour' element={<VendorTour />} />
        <Route path='/chatbot' element={<ChatBot />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/bus/search' element={<BusSearchResultList />} />
        <Route path='/tours/search' element={<SearchResultList />} />
        <Route path='/admin' element={<Admin />} />

    </Routes>
  );
};

export default Routers