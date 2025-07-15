import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaPlus, FaClock, FaTags } from 'react-icons/fa';

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/my-tickets', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTickets(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des tickets :', err);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    ticket?.titre?.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === '' || ticket?.statut?.toLowerCase() === statusFilter.toLowerCase())
  );

  return (
    <div className="container-fluid rounded" style={{  
      backgroundColor: 'white',
      minHeight: '100vh', 
      paddingTop: '40px'}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🎫 My Tickets</h2>
        
      </div>

      <div className="d-flex mb-4 gap-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="regler">Closed</option>
          <option value="en_attente">En attente</option>
        </select>
      </div>

      <div className="row">
        {filteredTickets.map(ticket => (
          <div className="col-md-4 mb-4" key={ticket.id}>
            <div className="card h-100 shadow-sm p-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="badge bg-light text-dark text-capitalize">
                  {ticket.statut}
                </span>
                <span className={`badge text-capitalize bg-${
                  ticket.urgence === 'élevée' ? 'danger' :
                  ticket.urgence === 'normal' ? 'warning' :
                  'secondary'
                }`}>
                  {ticket.urgence}
                </span>
              </div>

              <h5>{ticket.titre}</h5>
              <p className="text-muted small">{ticket.description}</p>

              <div className="text-muted mt-auto small">
                <div><FaClock className="me-1" /> Created: {new Date(ticket.created_at).toLocaleDateString()}</div>
                <div><FaTags className="me-1" /> {ticket.type} | {ticket.service}</div>
              </div>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="text-center text-muted mt-5">No tickets found.</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
