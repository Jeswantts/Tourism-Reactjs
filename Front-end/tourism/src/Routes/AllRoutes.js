import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import FilterLocation from '../Components/FilterLocation';
import Loc from '../Components/Loc';
import Pac from '../Components/Pac';
import Ite from '../Components/Ite';
import Passenger from '../Components/Passenger';
import Hotel from '../Components/Hotel';
import Package from '../Components/Package';
import Location from '../Components/Location';
import Itinerary from '../Components/Itinerary';
import Room from '../Components/Room';
import Userlogin from '../Components/Userlogin';
import PrivateRoute from './PrivateRoute';
import Payment from '../Components/Payment';
import Profile from '../Components/Profile';
import Home from '../Components/Home';
import Register from '../Components/Register';
import Adminlogin from '../Components/Adminlogin';
import Admindash from '../Components/Admindash';
import Unauthorized from '../Components/Unauthorized';
import Agentdash from '../Components/Agentdash';
import Trans from '../Components/Trans';
import Imagegallery from '../Components/Imagegallery';

export default function AllRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/Trans' element={<Trans/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Adminlogin' element={<Adminlogin/>}/>
          <Route path='/Home' element={<Home />}/> 
          <Route path='/Login' Component={Userlogin}/>
          <Route path='/Unauthorized' element={<Unauthorized/>}/>
          <Route path='/Imagegall' element={<Imagegallery/>}/>
          <Route path='/FilterLocation' element={<FilterLocation/>}/> 
          <Route path="/Loc" element={<Loc/>} />
          <Route path="/Loc/Pac" element={<Pac/>} />
          <Route path="/Loc/Pac/:location/Itinerary/:packageId" element={<Ite />} />


          <Route path="/Loc/Pac/:location/Itinerary/:packageId/Passenger" element={<PrivateRoute roles={['user']} component={Passenger} />} />
          <Route path="/Loc/Pac/:location/Itinerary/:packageId/Passenger/Payment" element={<PrivateRoute roles={['user']} component={Payment} />} />
          <Route path="/Profile"  element={<PrivateRoute roles={['user']} component={Profile} />} />


          <Route path='/Location' element={<PrivateRoute roles={['agent']} component={Location}/>}/>
          <Route path='/Package' element={<PrivateRoute roles={['agent']} component={Package}/>}/>  
          <Route path='/Itinerary' element={<PrivateRoute roles={['agent']} component={Itinerary}/>}/>
          <Route path='/Room' element={<PrivateRoute roles={['agent']} component={Room}/>}/>
          <Route path='/Hotel' element={<PrivateRoute roles={['agent']} component={Hotel}/>}/>
          <Route path='/Agentdash' element={<PrivateRoute roles={['agent']} component={Agentdash}/>}/>
          <Route path='/Agentdash' element={<PrivateRoute roles={['agent']} component={Agentdash} />}/>


          <Route path='/Admindash' element={<PrivateRoute roles={['admin']} component={Admindash}/>}/>
        </Routes>
        </BrowserRouter>
  )
}
