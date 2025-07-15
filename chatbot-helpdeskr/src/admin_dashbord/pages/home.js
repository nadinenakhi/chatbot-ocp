import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid} from 'recharts';


function Home() {
  const [ticketStats, setTicketStats] = useState({ total: 0, open: 0, urgent:0, pending:0, closed: 0, low:0,normal:0 });

  const baseBoxStyle = {
  padding: '5px',
  borderRadius: '8px',
  width: '250px',
  height: '80px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
};
const COLORS = ['#fc9191ff', '#fde393ff', '#a8f08bff'];
const styles = {
  total: { ...baseBoxStyle, backgroundColor: '#e0f7fa' },
  open: { ...baseBoxStyle, backgroundColor: '#e8f5e9' },
  pending: { ...baseBoxStyle, backgroundColor: '#fffde7' },
  urgent: { ...baseBoxStyle, backgroundColor: '#ffebee' }
};

  useEffect(() => {
    const fetchTicketCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ticket-count', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTicketStats(response.data);
      } catch (error) {
        console.error('Failed to fetch ticket count:', error);
      }
    };

    fetchTicketCount();
     }, []);
     const chartData = [
    { name: 'Open', value: ticketStats.open },
    { name: 'Pending', value: ticketStats.pending },
    { name: 'Closed', value: ticketStats.closed }
  ];

  const urgencyChartData = [
  { name: 'Low', value: ticketStats.low },
  { name: 'Normal', value: ticketStats.normal },
  { name: 'Urgent', value: ticketStats.urgent }
];

  return (
        
              
    <div className="container-fluid rounded" style={{  
          backgroundColor: 'white',
          minHeight: '100vh', 
          paddingTop: '40px'}}>      
      <div style={{display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'}}>
        <div style={styles.total}>
        <p className='fw-medium'>Total Tickets</p>
        <p className='fw-bolder'>{ticketStats.total}</p>
      </div>
      
      <div style={styles.open}>
    <p className='fw-medium'>Open Tickets</p>
    <p className='fw-bolder'>{ticketStats.open}</p>
  </div>
  
  <div style={styles.pending}>
    <p className='fw-medium'>Pending tickets</p>
    <p className='fw-bolder'>{ticketStats.pending}</p>
  </div>
  <div style={styles.urgent}>
    <p className='fw-medium'>Urgent Tickets</p>
    <p className='fw-bolder'>{ticketStats.urgent}</p>
  </div>
  </div>
  <div style={{display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'}}>
      
      <div style={{ width: '100%', maxWidth: '500px', height: '300px' }}>
        <h5>Ticket Status Overview</h5>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: '100%', maxWidth: '600px', height: '300px' }}>
        <h5>Tickets by Urgency</h5>
        <ResponsiveContainer>
          <BarChart data={urgencyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis allowDecimals={false} />
  <Tooltip />
  <Bar dataKey="value" barSize={40}>
  <Cell fill="#90caf9" /> 
  <Cell fill="#ffe082" /> 
  <Cell fill="#ef5350" /> 
</Bar>

</BarChart>

        </ResponsiveContainer>
    </div> </div>
      <button onClick={() => {
  localStorage.clear();
  window.location.reload(); // Reset app
}}>Logout</button>
<Outlet />
              </div>
           
  );
}
export default Home;