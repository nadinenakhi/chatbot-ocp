import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/side_bar';
import { Outlet } from 'react-router-dom';
import AddTicket from './AddTicket';
import ChatInterface from '../../chatbot/chatbot_page';
import MyTicket from './Mytickets';
function AdminDashboard() {
  return (
        <div>
              <Sidebar />
              <div className="container-fluid" style={{  marginLeft: '220px', // This pushes the content to the right
          padding: '20px',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
           width:'83%'}}>
      
          <Routes>
            {/* Default redirect to /dashboard/home */}
            <Route path="/" element={<Navigate to="myTicket" replace />} />
            <Route path="add-ticket" element={<AddTicket />} />
            <Route path="chatbot" element={<ChatInterface />} />
            <Route path="myTicket" element={<MyTicket />} />
          </Routes>
          {/* OR alternatively, use <Outlet /> with a parent Route in App */}
        </div>
      </div>
   
  );
}
export default AdminDashboard;