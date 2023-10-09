import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackAbout from './BackAbout';
import BackView from './BackView';
import BackAppointmentSuccess from './BackAppoinmentSuccess';
import BackServiceMapingEcommerce from './BackServiceMapingEcommerce';
import BackServiceMedical from './BackServiceMedical';
import BackFooter from './BackFooter';
import BackPatientReviews from './BackPatientReviews';
import BackHomePage from './BackHomePage';
import BackendHealing from './BackendHealing';

const BackendDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  useEffect(() => {
    // You should have a function or mechanism to check if admin is logged in.
    // For this example, I'm using a simple flag.
    const checkAdminLoginStatus = () => {
      // You can implement your own logic here to check if the admin is logged in.
      // For now, I'm using a flag to simulate the logged-in status.
      const isAdminLoggedIn = true; // Replace with your actual authentication check
      setIsAdminLoggedIn(isAdminLoggedIn);
    };

    checkAdminLoginStatus();
  }, [location]);

  // Function to handle content selection
  const handleContentSelect = (contentName) => {
    setActiveContent(contentName);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For now, just navigate to "/backHome" as an example
    navigate("/backend");
  };

  return (
    <div className="container">
      {isAdminLoggedIn ? (
        <div className=''>
          <div className="row justify-content-around p-3">
          <button className="btn " onClick={() => handleContentSelect('BackHomePage')}>Home Banner</button>
            <button className="btn " onClick={() => handleContentSelect('BackAbout')}>About</button>
            <button className="btn" onClick={() => handleContentSelect('BackFooter')}>Footer</button>
            <button className="btn" onClick={() => handleContentSelect('BackPatientReviews')}>Patient Review</button>
            <button className="btn" onClick={() => handleContentSelect('BackServiceMedical')}>ServiceMedical</button>
            <button className="btn" onClick={() => handleContentSelect('BackServiceMapingEcommerce')}>Maping Services</button>
            <button className="btn" onClick={() => handleContentSelect('BackendHealing')}>Healing Touch</button>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            {/* Add more links/buttons for other routes as needed */}
          </div>
          <div  className="row justify-content-around">
          <button className="btn" onClick={() => handleContentSelect('BackView')}>Enquiry</button>
          <button className="btn" onClick={() => handleContentSelect('BackAppointmentSuccess')}>Booking Appointments</button>

          </div>
      <h3 className="text-center ">Welcome to Eikon BackEnd </h3>

          <div>
            {activeContent === 'BackAbout' && <BackAbout />}
            {activeContent === 'BackView' && <BackView />}
            {activeContent === 'BackFooter' && <BackFooter />}
            {activeContent === 'BackPatientReviews' && <BackPatientReviews />}
            {activeContent === 'BackServiceMedical' && <BackServiceMedical />}
            {activeContent === 'BackServiceMapingEcommerce' && <BackServiceMapingEcommerce />}
            {activeContent === 'BackAppointmentSuccess' && <BackAppointmentSuccess />}
            {activeContent === 'BackHomePage' && <BackHomePage />}
            {activeContent === 'BackendHealing' && <BackendHealing/>}


          </div>
        </div>
      ) : (
        <p>Please log in as an admin to access the dashboard.</p>
      )}
    </div>
  );
};

export default BackendDashboard;
