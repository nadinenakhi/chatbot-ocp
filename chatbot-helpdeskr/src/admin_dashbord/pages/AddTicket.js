import React, { useState } from 'react';
import axios from 'axios';

function AddTicket() {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type: '',
    service: '',
    urgence: 'normal'
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.post('http://127.0.0.1:8000/api/tickets', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStatus('✅ Ticket successfully created');
      setFormData({
        titre: '',
        description: '',
        type: '',
        service: '',
        urgence: ''
      });
    } catch (err) {
      console.error(err);
      setStatus('❌ Error creating ticket');
    }
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <div className="text-end text-danger fw-bold mb-2">
        If you have a problem creating a ticket, please contact the chatbot.
      </div>
      <h3 className="mb-3">Add New Ticket</h3>
      {status && <div className="alert alert-info">{status}</div>}
      <form onSubmit={handleSubmit}>
             <div className="mb-3">
            <label className='fs-5'>Title </label>
            <label className='fs-5' style={{ color:'red' }}>*</label>
            <input
              className="form-control"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
            /></div>
            <div className="mb-3">
            <label className='fs-5'>Service </label>
            <label className='fs-5' style={{ color:'red' }}>*</label>
            <select
              className="form-select"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select Service</option>
              <option value="IT" >IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Logistics">Logistics</option>
              <option value="Security">Security</option>
            </select>
            </div>
             <div className="mb-3">
            <label className='fs-5'>Type</label>
            <label className='fs-5'style={{ color:'red' }}>*</label>
            <select
              className="form-select"
              name="type"
              value={formData.urgence}
              onChange={handleChange}
              required
            >
              <option value="hardware_issue">hardware_issue</option>
              <option value="software_issue">software_issue</option>
              <option value="network_issue">network_issue</option>
              <option value="account_issue">account_issue</option>
              <option value="email_issue">email_issue</option>
              <option value="printer_issue">printer_issue</option>
              <option value="phone_issue">phone_issue</option>
              <option value="other_issue">other_issue</option>
            </select>
            </div>
             <div className="mb-3">
            <label className='fs-5' >Urgency </label>
            <label className='fs-5' style={{ color:'red' }}>*</label>
            <select
              className="form-select"
              name="urgence"
              value={formData.urgence}
              onChange={handleChange}
              required
            >
              <option value="normal">Normal</option>
              <option value="élevée">Urgent</option>
              <option value="faible">Critical</option>
            </select>
            </div>
          <div className="mb-3">
          <label className='fs-5'>Description </label>
          <label className='fs-5' style={{ color:'red' }}>*</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
         <div  className="d-grid gap-2 col-2 mx-auto">
        <button type="submit" className="btn btn-success">Create Ticket</button></div>
      </form>
    </div>
  );
}

export default AddTicket;
